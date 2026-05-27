# Portfolio Site — Build Brief

This document is everything Claude Code needs to build Parker Tikson's personal portfolio site. Read it once, end to end, before writing any code. The accompanying `mocks/` folder contains six finished HTML reference pages — they are the source of truth for design.

---

## 1. What we're building

A personal portfolio site with three jobs:

1. Showcase final-project work from a master's degree (and selected bachelor's work) in a way that respects the substance and isn't a Notion dump.
2. Bring a résumé to life as something better than a PDF.
3. Hint at the person behind the work — earnest, energy/policy-oriented, photography on the side.

The site should feel like a quietly considered object — editorial and technical, not a generic developer portfolio. It should demonstrate AI/code fluency by *being* well-built, not by saying it is.

---

## 2. Tech stack

**Use Astro.** Reasons:

- Content-heavy site with templated pages (one per course) is exactly Astro's wheelhouse.
- Drop a `.md` file in a folder, get a page. The content pipeline is the framework.
- Ships zero JS by default — pages will feel premium-fast.
- Image optimization is built-in via `<Image>`, which matters for the photo page.
- Free deploy to Vercel, Netlify, or Cloudflare Pages.

**Styling:** Plain CSS using the design tokens in section 4. Do not use Tailwind. The design intentionally uses a small set of CSS variables and consistent component patterns; Tailwind would clutter the markup and obscure the system.

**Interactivity:** The two pages with interactive filtering (`/resume` and `/masters`) use small vanilla JS islands. Keep them in `.astro` components with `<script>` blocks — no React unless something gets meaningfully more complex.

---

## 3. Site structure

```
/                            → Home
/about                       → About
/photo                       → Photography (loose mosaic)
/resume                      → Interactive filterable résumé
/masters                     → Master's index (8 courses, term-grouped)
/masters/[slug]              → Per-course page
/bachelors                   → Bachelor's index (same template as masters)
/bachelors/[slug]            → Per-course page (same template as course)
```

The two degree sections share the same templates. There are exactly **8 master's courses** (not 14 as in my placeholder mock — adjust accordingly). Bachelor's count to be confirmed during content gathering.

---

## 4. Design system

### Colors (lock these into a CSS variable file — `src/styles/tokens.css`)

```css
:root {
  --ink:     #161915;   /* Body text, dark UI */
  --paper:   #ffffff;   /* Page background */
  --paper-2: #f4f4f1;   /* Cards, panels, asides */
  --rule:    #1a1f1a;   /* Borders, dividers */
  --muted:   #5a6359;   /* Secondary text, metadata */
  --accent:  #1f4d3f;   /* Deep sage. Used sparingly — links on hover, active states, section markers */
}
```

Background also has subtle radial gradient tints — see any mock's `body` rule for the exact `radial-gradient` syntax. Plus a faint SVG noise overlay at `opacity: 0.5` with `mix-blend-mode: multiply`. Both add atmosphere without distraction.

### Typography (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--serif: 'Fraunces', Georgia, serif;       /* Headlines, body prose, decks */
--sans:  'Inter Tight', system-ui, sans;   /* UI, tags, buttons */
--mono:  'JetBrains Mono', ui-monospace;   /* Metadata, labels, course codes */
```

**Usage rules:**
- Headlines: Fraunces, weight 300–400, italic for emphasis (`<em>`), accent color for emphasized words
- Body prose: Fraunces 400 at ~17–19px with 1.55–1.65 line-height
- Decks/secondary copy: Fraunces 300 italic at 17–22px, in `--muted`
- Labels, metadata, course codes, tags: JetBrains Mono 11px with `letter-spacing: 0.04–0.15em`, often `text-transform: uppercase`
- Buttons and pill controls: Mono 11px, all-caps with letter-spacing

### Layout grammar

- Container: `max-width: 1180px; margin: 0 auto; padding: 0 48px;` (24px on mobile)
- Most sections use a `200px gutter | 1fr content` grid pattern — the gutter holds metadata, section tags, or dates
- Section markers: small mono-cased "§ 01 — Section Name" with `border-top: 2px solid var(--accent); padding-top: 10px;`
- Generous vertical rhythm: 56–80px between major sections, 28–48px within
- Dividers: 1px hairlines at full opacity (`border: 1px solid var(--rule)`) for major divisions, `rgba(26,31,26,0.12–0.18)` for subtle ones

### Voice

- Headlines do work — they make a claim, not just label a section
- Italicize keywords for emphasis, color them with accent
- Body copy is direct and earnest, never marketing-speak
- Metadata is mono-cased and unobtrusive
- Course pages structured around §01 Problem → §02 Approach → §03 Results → §04 So what
- Avoid emoji. Use `→`, `↗`, `↓`, `§` as decorative glyphs.

### Interaction patterns

- Hover on links: change color to `--accent`, sometimes add a subtle border or background tint
- Hover on cards/list items: shift right by 12px, add gradient background `linear-gradient(90deg, rgba(31,77,63,0.04), transparent 70%)`, reveal an arrow `↗`
- Active filter pills: `background: var(--accent); color: var(--paper)`
- Animations: subtle `rise` keyframe (`opacity 0 → 1, translateY(20px) → 0`) on key elements at page load, with staggered `animation-delay`
- All transitions ~0.2–0.3s ease

---

## 5. Page-by-page reference

The `mocks/` folder has the canonical reference for each page. Open them in a browser to see the design. Below is what each one is and where it lives.

| Mock file | Becomes | Purpose |
|---|---|---|
| `mocks/home.html` | `src/pages/index.astro` | Landing — hero, 3 featured projects, about teaser, degree nav |
| `mocks/about.html` | `src/pages/about.astro` | Earnest letter, favorites grid, /now band, contact |
| `mocks/photo.html` | `src/pages/photo.astro` | Loose mosaic gallery with lightbox |
| `mocks/resume.html` | `src/pages/resume.astro` | Filterable timeline by type & skill |
| `mocks/masters.html` | `src/pages/masters/index.astro` | Term-grouped course list with filter pills |
| `mocks/course.html` | `src/pages/masters/[slug].astro` | Per-course deep dive |

The bachelor's pages reuse the masters templates with different content.

---

## 6. Content model

This is the most important part. The whole site is driven by markdown files in a content collection. Use Astro Content Collections (`src/content/`).

### Collection: `courses`

Schema (in `src/content/config.ts`):

```ts
import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    degree: z.enum(['masters', 'bachelors']),
    code: z.string(),                // e.g. "ERG 244"
    title: z.string(),               // "Data, Environment & Society"
    term: z.string(),                // "Fall 2024"
    units: z.number().optional(),
    grade: z.string().optional(),    // "A", "A−", "P", "In progress"
    deliverable: z.string().optional(), // "Notebook + report"
    featured: z.boolean().default(false),
    tags: z.array(z.string()),       // for filter pills: ["ml", "policy"]
    role: z.string().optional(),     // "Solo" | "Team of 4" | etc.
    teammates: z.array(z.string()).optional(),
    deck: z.string(),                // 1-sentence project summary
    headline: z.string().optional(), // For featured pages: e.g. "Predicting where California's grid will buckle next."
    downloads: z.array(z.object({
      type: z.string(),              // "Notebook · .ipynb"
      label: z.string(),             // "Full project notebook"
      href: z.string(),
    })).optional(),
    pipeline: z.string().optional(), // SVG markup for data pipeline diagram (optional)
    results: z.array(z.object({
      model: z.string(),
      metrics: z.record(z.string()),
      notes: z.string(),
      winner: z.boolean().default(false),
    })).optional(),
    reflection: z.string().optional(),
    nextCourse: z.object({ slug: z.string(), title: z.string() }).optional(),
    prevCourse: z.object({ slug: z.string(), title: z.string() }).optional(),
  }),
});

export const collections = { courses };
```

Body of the markdown file = the §01 / §02 / §03 / §04 prose sections.

### Folder layout

```
src/content/courses/
  masters/
    data-environment-society.md
    causal-inference-lab.md
    ...
  bachelors/
    [slug].md
```

### Other collections

- `photos` — flat list, frontmatter has `src`, `alt`, `aspectRatio`, optional `date`
- `resume` — single content file (or several entries) with role/dates/skills
- Site-wide content (about page prose, /now updates, favorites): single MDX files in `src/content/site/`

### Content-not-yet-available strategy

When the user uploads content, follow the per-course bundle pattern we agreed on:

1. Final deliverable file (`.ipynb`, `.pdf`, `.zip`, repo URL — whatever it is)
2. Course name + term + 1-line description
3. User's role in 1–2 sentences
4. Optional: 1–2 sentences of reflection
5. Optional: syllabus PDF (for download, not display)

For featured courses, you (Claude Code) help draft the §01 Problem → §02 Approach → §03 Results → §04 So what sections by reading the deliverable. For non-featured courses, a course code, title, and one-line deck is enough — they appear on the index page only.

---

## 7. Build order

Don't build everything at once. This order minimizes throwaway work:

1. **Project setup** — `npm create astro@latest`, choose minimal template, no UI framework, install needed integrations.
2. **Tokens & base layout** — Set up `src/styles/tokens.css` with colors, fonts, base resets. Build the shared `<Layout>` component with the unified nav and footer (see mocks for exact markup).
3. **Home page** — Static, no content collection needed yet. Use placeholder content so the layout works end-to-end.
4. **Content collection setup** — Define the `courses` collection schema as above. Stub one master's course's markdown file for testing.
5. **Course page template** — Build `[slug].astro`, render from collection, verify against `mocks/course.html`.
6. **Masters index** — Render the 8 courses grouped by term, with the filter-pill JS.
7. **Resume page** — Static for v1; can become collection-driven later if useful.
8. **About page** — Static MDX.
9. **Photo page** — Use Astro's `<Image>` component. Lazy-load. Build the lightbox JS island.
10. **Bachelors** — Reuse masters templates. Should be near-zero new code.
11. **Polish pass** — Check responsive breakpoints, hover states, transitions match mocks.
12. **Deploy** — Cloudflare Pages or Vercel. Set up the domain.

---

## 8. Things that look like they'd take time but shouldn't

- **The data pipeline SVG on the course page** — it's just inline SVG. Do not try to make this dynamic or generated; it's bespoke per course. Some courses won't have one and that's fine.
- **The interactive filters** — vanilla JS, ~30 lines per page. See `mocks/resume.html` and `mocks/masters.html` for working implementations to copy.
- **The lightbox on /photo** — also vanilla JS, working implementation in `mocks/photo.html`.
- **The dark "TLDR" / "In aggregate" panels** — just a section with `background: var(--ink); color: var(--paper)`. The label is positioned absolute in the corner.

---

## 9. Things to watch out for

- **Don't add a CMS.** The user is a single author; markdown files in a Git repo are the right interface.
- **Don't add a blog** unless the user asks. Out of scope.
- **Don't add dark mode.** The design is committed to its palette; toggling would dilute it.
- **Don't auto-generate per-course pages from notebooks.** Each featured course gets a hand-curated page with the user's voice. Notebooks are downloads, not display content.
- **Image optimization on /photo matters.** With 40+ photos, unoptimized images will tank performance. Use Astro's `<Image>` with `format: 'webp'` and explicit `widths`. Lazy-load below the fold.
- **The site should pass Lighthouse with 95+ on Performance, Accessibility, Best Practices, SEO.** It has no business being slow.

---

## 10. The first prompt to give Claude Code

When the user opens this folder in Claude Code, this is roughly what to say:

> I want to build a personal portfolio site. The full design brief is in `BRIEF.md` and the six finished HTML mocks are in `mocks/`. Read both before writing any code.
>
> Start by setting up an Astro project with the design tokens, base layout (nav + footer), and the home page. Match `mocks/home.html` exactly — same fonts, same layout, same hover behavior. We'll do one page at a time and review each one before moving to the next.

That's it. The brief and mocks contain the rest.

---

## Appendix: file checklist for content gathering

When the user has gathered content for a course, you should expect to receive (per course):

```
content-bundle/
  data-environment-society/
    deliverable.ipynb          (or .pdf, .zip, etc.)
    syllabus.pdf               (optional)
    notes.txt                  (a few lines: course context, role, reflection)
    images/                    (optional: any charts, screenshots, diagrams to feature)
```

For featured courses, draft the markdown file from these sources. For non-featured courses, just create a stub markdown file with frontmatter only — the index page lists them, but they don't need a full writeup.
