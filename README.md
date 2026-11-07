# Lokesh Meruva: portfolio

Built with [Astro](https://astro.build). Astro turns the files in `src/` into plain HTML and CSS, so the live site stays as fast as a hand-written one.

## Run it on your computer

```bash
npm install        # first time only
npm run dev        # live preview at http://localhost:4321, refreshes as you edit
```

## Update the content

| To change… | Edit this |
|---|---|
| Hero text, stats, About, "What I build", projects, credentials, contact text, email and social links | `src/data/site.ts` |
| Blog posts | `src/content/writing/*.md` (one file per post) |
| Photos and project images | `public/assets/images/lokesh/` (keep the same file names) |
| Résumé | `public/assets/resume.pdf` |
| Colours, spacing, fonts | `src/styles/site.css` |
| Animations, menu, copy-email button | `src/scripts/site.js` |

**Add a project:** in `src/data/site.ts`, copy one entry in `projects` and change it. Its image needs two files in `public/assets/images/lokesh/`: `<name>.webp` and `<name>.jpg`, both 1530 x 880. Set `image: "<name>"`.

**Add a blog post:** copy any file in `src/content/writing/`, rename it (the file name becomes the address, e.g. `my-post.md` becomes `/writing/my-post.html`), then edit the details at the top and write the post in Markdown. It appears on the home page and in the sitemap by itself.

**Replace the hero photo:** keep it a transparent PNG/WebP cut-out, waist up, with the hair starting about 6% from the top and the head centred about 44% from the left. The curved "ENGINEER" is sized to fit that framing (see "Hero" in `src/styles/site.css`).

## Build and publish

```bash
npm run build      # makes the finished site in dist/
npm run preview    # check the built site locally
```

On Vercel, import the repository and keep the detected **Astro** settings (build `npm run build`, output `dist`). If the address isn't `lokesh-meruva-portfolio.vercel.app`, change `site` in `astro.config.mjs` and `url` in `src/data/site.ts` so the search and link-preview tags point to the right place.

## What's where

```
src/
  data/site.ts          home page content
  data/icons.ts         icon shapes (Phosphor + Hugging Face logo)
  content/writing/      blog posts (Markdown)
  components/           page sections: Header, Hero, Stats, About, Expertise, Work, Credentials, Writing, Contact
  layouts/Base.astro    shared <head>: SEO tags, fonts, styles
  pages/                index, 404, writing/[slug] (one page per post), sitemap.xml
  styles/site.css       all styling
  scripts/site.js       smooth scroll, menu, animations, counters, copy-email
public/                 images, résumé, robots.txt (copied to the site as-is)
_design/                sources for the generated images (not part of the site)
```
