import { createServerFn } from "@tanstack/react-start";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AccountSnapshot = {
  profile: {
    id: string;
    full_name: string | null;
    phone: string | null;
    email: string | null;
  };
};

/** Reads the signed-in student's own profile (RLS-scoped). */
export const getAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AccountSnapshot> => {
    const { supabase, userId } = context;

    const profile = await supabase
      .from("profiles")
      .select("id, full_name, phone, email")
      .eq("id", userId)
      .maybeSingle();

    if (profile.error) throw new Error(profile.error.message);

    return {
      profile: profile.data ?? { id: userId, full_name: null, phone: null, email: null },
    };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .inputValidator((input: { full_name: string; phone: string }) => input)
  .middleware([requireSupabaseAuth])
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const fullName = data.full_name.trim();
    const phone = data.phone.trim();

    if (!fullName) throw new Error("Please enter your name.");

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone: phone || null, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) throw new Error(error.message);
    return { ok: true };
  });
