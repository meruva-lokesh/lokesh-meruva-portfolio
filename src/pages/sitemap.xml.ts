// Builds /sitemap.xml from the home page and every post, so new posts are listed automatically.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("writing")).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.order - b.data.order);
  const urls = [
    { loc: `${site.url}/`, lastmod: site.updated },
    ...posts.map((p) => ({ loc: `${site.url}/writing/${p.id}.html`, lastmod: p.data.date.toISOString().slice(0, 10) })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
