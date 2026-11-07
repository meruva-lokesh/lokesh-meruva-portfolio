// Astro builds this portfolio into plain static HTML/CSS (no framework code is shipped to visitors).
// "file" format keeps the original page addresses: /writing/<name>.html and /404.html.
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";

export default defineConfig({
  site: "https://lokesh-meruva-portfolio.vercel.app",
  build: { format: "file" },
  markdown: {
    processor: satteri({ features: { smartPunctuation: false } }), // keep quotes and apostrophes exactly as written in the posts
  },
});
