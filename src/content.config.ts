// Blog posts live in src/content/writing as Markdown files. Each new file becomes a page at /writing/<file-name>.html
// and is listed automatically on the home page, in the sitemap and in search data.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(), // search-result text
    summary: z.string(), // shown under the title in the home page list
    ogDescription: z.string(), // link-preview text
    date: z.coerce.date(),
    readMinutes: z.number(),
    order: z.number().default(0), // tie-breaker for posts published the same day
    image: z.string(), // link-preview image
    repo: z.string(), // "See the code on GitHub" link
  }),
});

export const collections = { writing };
