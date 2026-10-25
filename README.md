# nikolaidokken.no — v5

Personal portfolio and blog built with [Astro](https://astro.build), deployed on Vercel.

## Development

Requires Node 24 (see `.node-version`) and pnpm.

If libvips is installed globally (e.g. `brew install vips`), sharp tries to build from source against it and the install fails. Make it use its prebuilt binary instead:

```sh
SHARP_IGNORE_GLOBAL_LIBVIPS=1 pnpm install
```

| Command      | Action                                         |
| :----------- | :--------------------------------------------- |
| `pnpm install` | Install dependencies                         |
| `pnpm dev`     | Start the dev server at `localhost:4321`     |
| `pnpm build`   | Build the site to `./dist/`                  |
| `pnpm preview` | Preview the production build                 |
| `pnpm check`   | Type-check `.astro` and `.ts` files          |

## Structure

- `src/content/posts/<post>/index.md` — blog posts (one folder per post, images alongside). Frontmatter is validated in `src/content.config.ts`; `publishedDate` must be a quoted `"YYYY-MM-DD"` string.
- `src/data/` — work experience and education shown on the about page.
- `src/components/`, `src/layouts/`, `src/pages/` — Astro components and routes.
- `src/utils/posts.ts` — shared helpers for sorting posts, tags and URLs.
- `src/assets/fonts/` — self-hosted fonts loaded through Astro's fonts API.
