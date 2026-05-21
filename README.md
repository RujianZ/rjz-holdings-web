# RJZ Holdings — Website

Official site for **RJZ Holdings LLC**, a Delaware-registered holding company. This is the umbrella company's own site, not any operating venture's site.

Live (eventual): `rjzholdings.com`

## Stack

- **Next.js** (App Router) + TypeScript (strict)
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`)
- **shadcn/ui** (New York style, neutral base)
- **Framer Motion** — drag physics for the ventures scroller
- **MDX** via `@next/mdx` — content lives in `/content`, not in code
- **next-themes** — dark default, light opt-in
- **Geist Sans + Geist Mono** via `next/font`

## Develop

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # production build
npm run start       # serve the production build
npm run lint
```

## Project layout

```
app/                 Routes (App Router)
  page.tsx           Home: hero + ventures scroller + journal preview + CTA
  about/             /about
  ventures/          /ventures + /ventures/[slug] (MDX-driven)
  journal/           /journal + /journal/[slug] (MDX-driven)
  contact/           /contact
  layout.tsx         Root layout (nav + footer + theme provider)
  globals.css        Design tokens (charcoal/off-white/amber)
components/          Shared React components (server by default)
  nav.tsx            Sticky top navigation
  footer.tsx
  ventures-scroller.tsx   Client — Framer Motion horizontal drag
  venture-card.tsx
  theme-provider.tsx, theme-toggle.tsx
  mono-label.tsx, section-header.tsx
  ui/                shadcn primitives
content/
  ventures/*.mdx     One file per venture (frontmatter + body)
  journal/*.mdx      One file per journal entry
lib/
  ventures.ts        Read + sort venture MDX (by `order`)
  journal.ts         Read + sort journal MDX (by `date` desc)
  utils.ts           shadcn `cn()` helper
mdx-components.tsx   Custom MDX prose styling (used by @next/mdx)
```

## Adding a new venture

1. Create `content/ventures/<slug>.mdx`.
2. Frontmatter (all required unless noted):

   ```yaml
   ---
   slug: my-venture            # must match filename
   name: "My Venture"
   monogram: M                 # 1–2 chars for the card badge
   category: "Category · Platform"
   index: "004"                # zero-padded sequence
   year: "2026—"
   description: "One-sentence pitch shown on the card."
   status: active              # active | coming-soon | archived
   order: 4                    # controls scroller + grid order
   role: "Founder"             # optional, shown on case study
   stack: [Next.js, Supabase]  # optional, shown on case study
   ---
   ```

3. Body of the MDX file becomes the **Brief** section on the case study page.
4. The card and case study route appear automatically. No code change required.

`status: coming-soon` renders a dashed placeholder card with no link.

## Adding a journal entry

1. Create `content/journal/<slug>.mdx`.
2. Frontmatter:

   ```yaml
   ---
   slug: my-entry
   title: "Entry title"
   date: "2026-06-01"          # ISO date — newest first
   description: "Shown as the subtitle and meta description."
   ---
   ```

3. The entry appears in `/journal` and at `/journal/<slug>` automatically.

## Design system

- **Default theme:** dark (charcoal `#0A0A0A` background, off-white `#F5F5F0` foreground)
- **Light mode:** opt-in via the header toggle (cream `#FAFAF7` background)
- **Accent:** warm amber `#D4A574` — used sparingly: logo dot, active nav, "Coming soon" labels, inline code underlines
- **Type:** Geist Sans for body/headings (weight 500, never 600/700). Geist Mono for labels, dates, coordinates, codes — 11px uppercase with 0.1em letter-spacing
- **Layout:** content max-width 1200px, 6rem (96px) between sections
- **Hairlines:** all dividers are 0.5px, color `var(--border)`

CSS tokens live in `app/globals.css`. shadcn variables are mapped onto the RJZ palette there too, so any shadcn primitive picks up the brand colors automatically.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo into Vercel — framework auto-detected as Next.js.
3. Bind `rjzholdings.com` (and `www.rjzholdings.com`) in **Project → Settings → Domains**.
4. No environment variables needed at this stage.

## Not yet implemented

- `/zh` Chinese locale (planned; current site is English-only)
- Subdomain stations (`app.`, `journal.`, `consulting.`) — design tokens are reusable when those come online
- Analytics / cookies / tracking — intentionally none for now
- RSS feed for the journal
- Real founder name + headshot on `/about` (placeholder copy in place)
