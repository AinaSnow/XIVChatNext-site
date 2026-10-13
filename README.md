# XIVChat Next website

Product site for [XIVChat Next](https://github.com/AinaSnow/XIVChatNext), published at <https://ainasnow.github.io/XIVChatNext-site/>. Built with [Astro](https://astro.build/) as a static site with no client-side JavaScript.

## Develop

Requires Node.js 22.12 or newer.

```powershell
npm ci
npm run dev      # http://localhost:4321/XIVChatNext-site/
npm run build    # writes dist/
npm run preview  # serves dist/
```

## Layout

| Path | Purpose |
| --- | --- |
| `src/pages/` | One file per published page. English at the root, Simplified Chinese under `zh/`. URLs match the earlier hand-written site (`guide.html`, `zh/index.html`). |
| `src/layouts/Base.astro` | Shared head, header, language switch, `hreflang` links and footer. |
| `src/components/Home.astro` | Home page markup for both languages. |
| `src/i18n/` | Interface strings (`ui.ts`) and home page copy (`home.ts`) for each language. |
| `src/content/pages/` | Guide and relay page bodies. |
| `src/data/release.json` | Current release tag, desktop and plugin versions, and desktop asset name. |
| `src/styles/global.css` | Site stylesheet. |
| `public/` | Files copied as-is, such as the logo. |

Copy can use `{desktop}`, `{plugin}`, `{tag}` and `{releasePage}`; they are filled from `src/data/release.json`, so a release only needs that file and the "what's new" sentence in `home.ts` updated.

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`, which builds the site and deploys `dist/` to GitHub Pages. `dist/` is generated and not committed.
