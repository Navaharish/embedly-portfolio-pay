import { NAV } from "@/lib/site";

export const AUTH_TARGET_KEY = "embeddly-auth-redirect";

export type AppPath = (typeof NAV)[number]["to"] | "/dashboard";

/**
 * Only ever returns a path this site actually serves on the same origin, so a
 * crafted `?redirect=` cannot send a signed-in user off to another website.
 */
export function sanitizeRedirect(raw: string | null | undefined): AppPath | null {
  if (!raw) return null;

  let pathname = raw;
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (typeof window !== "undefined" && url.origin !== window.location.origin) return null;
      pathname = url.pathname;
    } catch {
      return null;
    }
  } else if (!raw.startsWith("/") || raw.startsWith("//")) {
    return null;
  }

  const [cleanPath = ""] = pathname.split(/[?#]/);
  pathname = cleanPath;

  const navMatch = NAV.find((item) => item.to === pathname);
  if (navMatch) return navMatch.to;
  if (pathname === "/dashboard") return "/dashboard";
  return null;
}
