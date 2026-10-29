import { describe, expect, it } from "vitest";

import { sanitizeRedirect } from "@/lib/account";

describe("Post-sign-in redirects", () => {
  it("only allows pages this site serves", () => {
    expect(sanitizeRedirect("/dashboard")).toBe("/dashboard");
    expect(sanitizeRedirect("/program")).toBe("/program");
    expect(sanitizeRedirect(`${window.location.origin}/faq?x=1`)).toBe("/faq");
  });

  it("rejects off-site and malformed targets", () => {
    expect(sanitizeRedirect("https://evil.example.com/dashboard")).toBeNull();
    expect(sanitizeRedirect("//evil.example.com/dashboard")).toBeNull();
    expect(sanitizeRedirect("/nowhere")).toBeNull();
    expect(sanitizeRedirect(null)).toBeNull();
  });
});
