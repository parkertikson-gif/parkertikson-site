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

    // Index / filtering (kept for taxonomy if revived later)
    tags: z.array(z.string()).default([]),

    // Whether this course has its own /[degree]/[slug] detail page. Default true.
    hasPage: z.boolean().default(true),

    // Short, human-friendly tag list for listing pages (currently unused on the
    // simplified design; kept available)
    displayTags: z.array(z.string()).default([]),

    // One-line summary shown on listings
    deck: z.string(),

    // Long-form prose for the course page body (2-3 paragraphs)
    summary: z.string().optional(),

    // Single downloadable deliverable: file in /public/projects/<filename>
    deliverable: z.object({
      filename: z.string(),
      label: z.string().optional(),
    }).optional(),

    // SEO: <meta name="description"> on the course page. Falls back to `deck`.
    description: z.string().optional(),

    nextCourse: z.object({ slug: z.string(), title: z.string() }).optional(),
    prevCourse: z.object({ slug: z.string(), title: z.string() }).optional(),

    // ─── Deprecated (kept for later revival) ───────────────────────────
    // tldr, contribution, teammates, headline, format, discipline,
    // tools, tiers, pipeline, results, reflection, downloads
    // ─── end deprecated ────────────────────────────────────────────────
  }),
});

export const collections = { courses };
