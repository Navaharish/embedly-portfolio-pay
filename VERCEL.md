# Hosting Embeddly on Vercel

## What stays unchanged

- Google sign-in already exists at `/auth`.
- Lovable Cloud continues to store accounts and each user's name and phone number.
- `/dashboard` remains a private account page. The interest form remains separate from login.
- Moving hosting does not require creating another database or copying existing users.

## Get the code: GitHub, then VS Code

1. In Lovable, open **Project settings → Git** and connect GitHub. This creates a private repository and pushes the site's code to it. Connecting needs the project owner or admin.
2. In VS Code, run **Git: Clone** (Command Palette, or `Ctrl+Shift+P` / `Cmd+Shift+P`) and paste the repository address, or run it in a terminal:
   `git clone https://github.com/<your-account>/<repo-name>.git`
3. Open the cloned folder in VS Code, then install and run it locally:
   `bun install` then `bun run dev` (Bun is the package manager this project uses; install it from bun.sh).
4. Edit locally and push with `git push`. Commits on the connected branch sync back into Lovable, so keep that branch working.
5. Alternative without GitHub: **Project settings → Git → Download codebase** gives the same source as a folder.

## Deploy the website

1. Connect this project to GitHub from **Lovable → Project settings → Git**. The connection creates a repository; connecting it requires the project owner or admin.
2. In **Vercel → Add New → Project**, import that repository.
3. Use Vercel's Lovable/TanStack Start detection where available. If configuring manually, use install command `bun install --frozen-lockfile` and build command `bun run build`. Do not select a static-only Vite deployment or set the output directory to `dist`: this application also needs server functions. Nitro produces Vercel's deployment output.
4. Add these environment variables in Vercel, using the existing project's values through a private channel. Do not commit secrets or paste them into chat:

   | Variable | Purpose |
   | --- | --- |
   | `VITE_SUPABASE_URL` | Browser connection to existing Lovable Cloud |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Public browser key |
   | `SUPABASE_URL` | Server connection to the same Lovable Cloud instance |
   | `SUPABASE_PUBLISHABLE_KEY` | Public server key |

   Set them for Production and any Preview environment you intend to test. Use the hosted backend address, not a sandbox-local address. The account page does not need an administrator key. Lovable Cloud does not expose its administrator key or database password.

5. Deploy and note the exact HTTPS deployment address. The Vite configuration selects Nitro's Vercel preset when Vercel sets `VERCEL=1`, preserving the normal Lovable target elsewhere.

## Authentication: required checks before switching traffic

1. In **Lovable → More → Users → Auth settings → Advanced**, add the Vercel address to **Redirect URLs**, ending in `/**`. Add only deployment addresses you trust; do not broadly allow all Vercel domains.
2. Set **Site URL** to the final public address when ready to switch. The existing `embeddly.in` address is already in the allowed redirect list, but a new Vercel address is not.
3. Test Google sign-in on the actual Vercel deployment. This app uses Lovable's managed OAuth helper, whose default `/~oauth` endpoints depend on Lovable's hosting proxy. A successful website deployment and an allowed redirect URL alone do not establish that these endpoints work on Vercel. External-host Google compatibility is not verified. If `/~oauth` fails, stop before switching the domain; do not replace generated authentication files or improvise proxy rewrites. A documented external-host authentication setup must be established first.
4. Verify a real sign-in, account details read, name/phone save, reload, sign-out, and denial of signed-out access to `/dashboard`. Also test email confirmation and password-reset links if keeping email sign-in.

## Move the domain last

After the Vercel deployment and Google sign-in pass the checks, add `embeddly.in` in Vercel's domain settings and apply the DNS records Vercel supplies. Do not switch DNS before authentication works. Preserve the old deployment until the new one is verified.

## Status

The source is prepared for Vercel. No Vercel project has been connected or deployed from this session. Existing authentication settings, a Vercel deployment, and Google sign-in on Vercel need final verification; no claim of a successful migration is made.

References: [Vercel's Lovable integration](https://vercel.com/docs/integrations/lovable), [Lovable external hosting guide](https://docs.lovable.dev/tips-tricks/external-deployment-hosting).