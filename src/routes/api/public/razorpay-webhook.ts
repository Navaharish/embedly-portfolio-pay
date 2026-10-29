import { createFileRoute } from "@tanstack/react-router";

import { COURSE_NAME } from "@/lib/site";

export const Route = createFileRoute("/api/public/razorpay-webhook")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => handleWebhook(request),
    },
  },
});

const PAID_STATUSES = new Set(["captured", "succeeded", "processed", "paid", "completed"]);

async function handleWebhook(request: Request) {
  const secret = process.env["RAZORPAY_WEBHOOK_SECRET"];
  if (!secret) {
    return json({ received: false, reason: "webhook_not_configured" }, 503);
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") ?? "";

  if (!(await signatureMatches(rawBody, secret, signature))) {
    return json({ received: false, reason: "invalid_signature" }, 401);
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ received: false, reason: "unparseable_body" }, 400);
  }

  const eventType = text(event, "event") ?? "";
  const link = path(event, "payload", "payment_link", "entity");
  const payment = path(event, "payload", "payment", "entity");
  const refund = path(event, "payload", "refund", "entity");

  const expectedLinkId = process.env["RAZORPAY_PAYMENT_LINK_ID"];
  const linkId = text(link, "id");
  if (expectedLinkId && linkId && linkId !== expectedLinkId) {
    return json({ received: true, ignored: "other_payment_link" });
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  if (eventType === "refund.processed" || eventType === "refund.created") {
    const paymentId = text(refund, "payment_id") ?? text(payment, "id");
    if (!paymentId) return json({ received: true, ignored: "no_payment_reference" });

    const { data: existing } = await supabaseAdmin
      .from("payments")
      .select("user_id")
      .eq("razorpay_payment_id", paymentId)
      .maybeSingle();

    if (!existing?.user_id) return json({ received: true, ignored: "unknown_payment" });

    await supabaseAdmin
      .from("payments")
      .update({ status: eventType === "refund.processed" ? "refunded" : "refund_pending" })
      .eq("razorpay_payment_id", paymentId);

    if (eventType === "refund.processed") {
      await supabaseAdmin
        .from("enrollments")
        .update({ status: "pending", updated_at: new Date().toISOString() })
        .eq("user_id", existing.user_id)
        .eq("course", COURSE_NAME);
    }

    return json({ received: true, refunded: true });
  }

  const paymentId = text(payment, "id") ?? text(link, "last_payment_id");
  const email = normalizeEmail(
    text(link, "customer_details", "email") ??
      text(link, "prefill", "email") ??
      text(path(event, "payload", "order", "entity"), "customer_details", "email") ??
      text(payment, "email"),
  );

  if (!paymentId || !email) {
    return json({ received: true, ignored: "missing_payment_or_email" });
  }

  // Only an account whose email was confirmed by the auth provider can claim a
  // payment, so typing someone else's address at checkout cannot unlock a seat.
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id, email")
    .eq("email", email)
    .maybeSingle();

  if (!profile?.id) {
    return json({ received: true, matched: false, reason: "no_account_for_email" });
  }

  const amountPaise =
    number(payment, "amount") ?? number(link, "amount_paid") ?? number(link, "amount");
  const status = text(payment, "status") ?? "captured";

  const { error: paymentError } = await supabaseAdmin
    .from("payments")
    .upsert(
      {
        user_id: profile.id,
        razorpay_payment_id: paymentId,
        razorpay_order_id: text(payment, "order_id") ?? text(link, "order_id") ?? null,
        razorpay_payment_link_id: linkId ?? null,
        amount_paise: amountPaise,
        currency: text(payment, "currency") ?? text(link, "currency") ?? "INR",
        method: text(payment, "method") ?? null,
        status,
        paid_at: new Date().toISOString(),
      },
      { onConflict: "razorpay_payment_id" },
    );

  if (paymentError) {
    return json({ received: false, reason: paymentError.message }, 500);
  }

  if (PAID_STATUSES.has(status.toLowerCase())) {
    await supabaseAdmin
      .from("enrollments")
      .upsert(
        {
          user_id: profile.id,
          course: COURSE_NAME,
          status: "confirmed",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,course" },
      );
  }

  return json({ received: true, matched: true });
}

async function signatureMatches(rawBody: string, secret: string, signature: string) {
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const expected = [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  if (expected.length !== signature.length) return false;

  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  }
  return difference === 0;
}

function path(source: unknown, ...keys: string[]): unknown {
  let current = source;
  for (const key of keys) current = field(current, key);
  return current;
}

function field(source: unknown, key: string): unknown {
  if (typeof source !== "object" || source === null) return undefined;
  return (source as Record<string, unknown>)[key];
}

function text(source: unknown, ...keys: string[]): string | null {
  const value = path(source, ...keys);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function number(source: unknown, ...keys: string[]): number | null {
  const value = path(source, ...keys);
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : null;
}

function normalizeEmail(value: string | null) {
  return value ? value.trim().toLowerCase() : null;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
