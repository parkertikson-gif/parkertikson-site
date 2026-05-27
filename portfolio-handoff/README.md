# Portfolio site — handoff package

Everything needed to build the site lives in this folder. Hand it (or a zipped copy) to Claude Code and you're off.

## What's in here

```
portfolio-handoff/
├── README.md              ← this file
├── BRIEF.md               ← the full build brief for Claude Code
├── mocks/                 ← 6 finished HTML reference pages
│   ├── home.html
│   ├── about.html
│   ├── photo.html
│   ├── resume.html
│   ├── masters.html
│   └── course.html
└── content-template/      ← the folder structure to use when gathering course content
    └── README.md
```

## Your first 30 minutes with Claude Code

1. **Install Claude Code** if you haven't (`npm install -g @anthropic-ai/claude-code`).
2. **Make a new folder** for the actual project — separate from this handoff folder. Something like `~/code/parker-site/`.
3. **Copy this whole `portfolio-handoff/` folder into it**, or keep it adjacent — doesn't matter, as long as Claude Code can read it.
4. **Open the project folder in your terminal** and run `claude`.
5. **Paste this prompt:**

   > I want to build a personal portfolio site. The full design brief is in `portfolio-handoff/BRIEF.md` and six finished HTML mocks are in `portfolio-handoff/mocks/`. Read both before writing any code.
   >
   > Start by setting up an Astro project with the design tokens, base layout (nav + footer), and the home page. Match `mocks/home.html` exactly. We'll do one page at a time and review each before moving to the next.

   That's it. The brief and mocks contain everything else Claude Code needs.

## How content gathering works once the site exists

Once the scaffolding is up and the home page works, content gathering becomes the slow part. For each master's course you want to feature in depth, you'll prepare a small bundle:

- The final deliverable file (notebook, PDF, repo link)
- Course name, term, code, units, grade
- 1–2 sentences on your role
- Optional: syllabus PDF, reflection, any charts worth featuring

Drop the bundle in a folder, point Claude Code at it, and ask it to draft the course page. You review and edit. See `content-template/README.md` for the exact folder layout.

For courses you *don't* want to feature in depth — those are just one-line entries on the master's index page. Title + course code + grade + 1-line description. Five minutes per course.

## Reminders to yourself

- You decided: 8 master's courses total, 3 featured with full pages, the other 5 are index-only entries
- Bachelor's count to be determined when you gather that content
- Palette is locked: white paper, deep sage accent, soft warm-grey panels — see BRIEF.md §4
- Resume style: interactive filterable (you picked this over the annotated narrative)
- Photo page: loose mosaic, no themes, no captions per photo

## What this site is *not*

It's not a blog. It's not a CMS-backed app. It's not a developer-tools showcase. It's a quietly considered portfolio that demonstrates how you think — through the work itself and the care evident in how it's presented.

If you find yourself or Claude Code tempted to add features beyond what's in the mocks, ask: does this make the work easier to understand, or harder? Restraint is the design.
