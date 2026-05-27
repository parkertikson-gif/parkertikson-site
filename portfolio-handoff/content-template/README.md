# Content gathering — folder template

Use this folder structure when gathering content for each course.

## For featured courses (the ones with full deep-dive pages)

```
content-bundle/
  data-environment-society/          ← slug folder per course
    deliverable.ipynb                ← the actual final project
    syllabus.pdf                     ← optional, for download link
    notes.md                         ← see template below
    images/                          ← optional: charts, screenshots, diagrams
      results-table.png
      pipeline-diagram.svg
```

### `notes.md` template

Copy this into each featured course's notes file and fill in:

```markdown
---
code: ERG 244
title: Data, Environment & Society
term: Fall 2024
units: 4
grade: A
deliverable: Notebook + report
role: Team of 4
teammates: [Xiaoxi Cui, Brooke Eichenlaub, Phillip Healy]
tags: [ml, policy]
---

## What was the course about?
One or two sentences on the course's focus and approach.

## What was the final project?
A few sentences describing the project — what problem, what approach, what you found.

## What did I do specifically?
1–2 sentences on your role in the team. Be specific.

## What's the headline?
A 6–10 word title that captures the project's *meaning*, not its tooling.
e.g. "Predicting where California's grid will buckle next."

## Reflection (optional)
1–2 sentences on what surprised you, what you'd redo, or what you learned.
This is the part where personality shows.
```

Once you have these notes, point Claude Code at the bundle and ask it to draft the course's markdown file using the structure in `BRIEF.md` §6 and matching `mocks/course.html`.

## For non-featured courses (index entries only)

These don't need a folder — just an entry in a single shared file:

```
content-bundle/
  masters-index-only.md
```

```markdown
---
courses:
  - code: STAT 215A
    title: Applied Statistics
    term: Fall 2024
    units: 4
    grade: A−
    deliverable: Lab portfolio
    deck: One-line description of what you did.
    tags: [ml]
    featured: false

  - code: PUBPOL 251
    title: Climate Policy & Politics
    term: Fall 2024
    ...
---
```

Five minutes per course. They show up on the masters index page; clicking them either goes nowhere (linkless) or to a tiny stub page. No deep-dive needed.

## Tags vocabulary

Keep tags consistent so the filter pills work. Suggested set:

- `ml` — machine learning, modeling
- `causal` — causal inference, experimental design
- `gis` — geospatial, mapping
- `policy` — policy analysis, regulation
- `markets` — energy markets, economics

Add new ones only if needed. Fewer pills = better UX.
