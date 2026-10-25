import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    // Quoted "YYYY-MM-DD" only: parsed as UTC midnight, so the rendered date never shifts with the build machine's timezone
    publishedDate: z.iso.date().transform((date) => new Date(date)),
    tags: z.array(z.string()),
    author: z.string(),
  }),
});

export const collections = { posts };
