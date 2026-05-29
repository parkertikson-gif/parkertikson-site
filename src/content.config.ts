import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
  schema: z.object({
    degree: z.enum(['masters', 'bachelors']),
    code: z.string(),
    title: z.string(),
    term: z.string(),
    units: z.number().optional(),
    grade: z.string().optional(),
    deliverable: z.string().optional(),

    // Meta-strip extras (course page header)
    format: z.string().optional(),
    discipline: z.string().optional(),

    // Index / filtering
    tags: z.array(z.string()).default([]),

    // Whether this course has its own /[degree]/[slug] detail page. Default true.
    // Courses with hasPage:false appear on the index but render as non-linked rows
    // and are excluded from getStaticPaths.
    hasPage: z.boolean().default(true),

    // Short, human-friendly tag list shown on listing pages (home featured, masters index).
    // Distinct from filter `tags` (taxonomy) and `tools` (full tools-used list on the course page).
    displayTags: z.array(z.string()).default([]),

    // Role card
    contribution: z.string().optional(),
    teammates: z.array(z.object({
      name: z.string(),
      note: z.string().optional(),
    })).optional(),

    // Headlines & decks
    deck: z.string(),
    headline: z.string().optional(),

    // SEO: <meta name="description"> on the course page. Falls back to `deck` if absent.
    description: z.string().optional(),

    // TLDR / "At a glance"
    tldr: z.object({
      statement: z.string(),
      stats: z.array(z.object({
        num: z.string(),
        unit: z.string().optional(),
        label: z.string(),
      })),
    }).optional(),

    // ─── MDX-only fields ───────────────────────────────────────────
    // The following are rendered by components imported inside an .mdx body
    // (<Tools>, <Tiers>, <Pipeline>, <ResultsTable>). A .md course can populate
    // them but they won't display — the page shell doesn't render them.

    // Tools-used tag list (distinct from filter `tags`)
    tools: z.array(z.string()).optional(),

    // Bespoke tier visual
    tiers: z.array(z.object({
      level: z.enum(['low', 'med', 'high']),
      pill: z.string(),
      range: z.string(),
      qual: z.string().optional(),
      description: z.string(),
    })).optional(),

    // Inline SVG markup for the data pipeline diagram
    pipeline: z.object({
      title: z.string().default('Data pipeline'),
      svg: z.string(),
    }).optional(),

    // Results table(s). cells.length must equal columns.length - 1 (first column is `model`).
    results: z.array(z.object({
      title: z.string(),
      problemLabel: z.string().optional(),
      columns: z.array(z.object({
        label: z.string(),
        numeric: z.boolean().default(false),
      })),
      rows: z.array(z.object({
        model: z.string(),
        cells: z.array(z.string()),
        winner: z.boolean().default(false),
      })),
    })).optional(),
    // ─── end MDX-only ──────────────────────────────────────────────

    reflection: z.string().optional(),

    downloads: z.array(z.object({
      type: z.string(),
      label: z.string(),
      href: z.string(),
    })).optional(),

    nextCourse: z.object({ slug: z.string(), title: z.string() }).optional(),
    prevCourse: z.object({ slug: z.string(), title: z.string() }).optional(),
  }),
});

export const collections = { courses };
