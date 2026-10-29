# Embeddly — portfolio & training site

The website for **Embeddly**, an initiative by Squaroots Technology LLP. Built with
TanStack Start (React + TypeScript + Tailwind CSS), hosted with Lovable Cloud for
accounts and profile storage.

- Live site: https://embeddly.in
- Hosting guide for Vercel: [VERCEL.md](./VERCEL.md)

---

## 1. What you need installed

| Tool | Why | Get it |
| --- | --- | --- |
| **Bun** | installs packages and runs the site (this project's package manager) | https://bun.sh — `curl -fsSL https://bun.sh/install \| bash` |
| **Git** | to copy the code down | https://git-scm.com |
| **VS Code** (or any editor) | to edit the code | https://code.visualstudio.com |

Bun runs on Node 22+ under the hood, so if you already manage Node with nvm, keep it —
you only need Bun itself for the commands below.

---

## 2. Run it on your machine

```sh
# 1. Copy the code down (paste your repository address)
git clone https://github.com/<your-account>/<repo-name>.git

# 2. Go into the folder
cd <repo-name>

# 3. Install everything (one time, takes a minute)
bun install

# 4. Start the site
bun run dev
```

Bun prints a local address when it starts — open that in your browser
(`http://localhost:5173` by default). Edit any file in `src/`, save, and the page
updates on its own. Press `Ctrl+C` in the terminal to stop it.

**The site works out of the box:** the `.env` file in this repository already holds the
backend address and the public key, so sign-in and the account page work the moment the
site starts. No extra setup, no other database to create.

---

## 3. Commands

Run these from the project folder.

| Command | What it does |
| --- | --- |
| `bun run dev` | Starts the site for editing, with live reload |
| `bun run build` | Builds the production version into `.output/` |
| `bun run preview` | Serves the built version so you can check it before deploying |
| `bun run test` | Runs the automated checks (routing + account helpers) |
| `bun run lint` | Reports code-style problems |
| `bun run format` | Rewrites files into the project's standard formatting |

---

## 4. Environment variables

All in `.env` at the project root (already filled in). Nothing here is a private key —
they are the public values the browser uses.

| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Where the browser talks to for accounts |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public key the browser sends |
| `VITE_SUPABASE_PROJECT_ID` | Backend project identifier |
| `SUPABASE_URL` | Same address, used by server-side code |
| `SUPABASE_PUBLISHABLE_KEY` | Same public key, used by server-side code |
| `SUPABASE_PROJECT_ID` | Same identifier, used by server-side code |

`VITE_`-prefixed names reach the browser; the others are read only on the server.
If you deploy somewhere else (Vercel), copy these exact names and values into that
platform's environment variable settings — see [VERCEL.md](./VERCEL.md).

---

## 5. Where things live

```text
src/
  routes/            one file per page — the URL matches the file name
    index.tsx        Home            /
    about.tsx        About           /about
    program.tsx      Training        /program
    trainer.tsx      Trainer         /trainer
    experience.tsx   Experience      /experience
    faq.tsx          FAQ             /faq
    contact.tsx      Contact         /contact
    auth.tsx         Sign in / up    /auth
    reset-password.tsx               /reset-password
    _authenticated/  pages that need sign-in (/dashboard)
    api/             server endpoints (webhooks)
    sitemap[.]xml.ts                 /sitemap.xml
  components/        shared pieces: header, footer, buttons, the circular menu
  lib/               site-wide values (links, contact details) and server functions
  integrations/      generated backend clients — do not edit these by hand
  assets/            images and the Exo font
public/              favicon.png, og-image.png — served as-is
drizzle/migrations/  the database changes, as SQL, in order
```

Two files worth knowing before you change anything:

- `src/lib/site.ts` — the single place for the interest-form link, contact details,
  course name and page metadata. Change it here and every page updates.
- `src/styles.css` — the colour tokens and the circular-menu styles. Colours are defined
  once here; pages reference them by name instead of hard-coding hex values.

---

## 6. Accounts and stored data

- Sign-in: email and password, Google, and Lovable — all on `/auth`.
- Each account stores a name and phone number for the certificate, saved from
  `/dashboard`. That page is private; the interest form is separate and needs no login.
- Every "Register Your Interest" button opens the Google Form in a new tab.
- Database changes live in `drizzle/migrations/`. They are applied to the live backend
  through Lovable (ask in the chat), not by a command in this folder.

---

## 7. Putting it online

**From Lovable (simplest):** click **Publish** in the editor.

**From Vercel:** connect the project to GitHub first (**Project settings → Git**),
import that repository in Vercel, add the four variable names from section 4, then check
Google sign-in on the Vercel address before moving the domain. Full steps:
[VERCEL.md](./VERCEL.md).

---

## 8. If something doesn't work

| What you see | What to do |
| --- | --- |
| `bun: command not found` | Install Bun from https://bun.sh, then close and reopen the terminal |
| "Port in use" when starting | Something else is using that address — stop it, or the dev server will pick another port and print it |
| Blank page after a bad edit | Undo the edit; the page reloads on save. Check the terminal for the error line and file name |
| Google sign-in fails after deploying | The new address isn't allowed yet — add it to the redirect URLs in Lovable's auth settings |
| `bun install` is slow or fails | Re-run it; if it persists, delete `node_modules` and run `bun install` again |
