# XIVChat Next website

Product site for [XIVChat Next](https://github.com/AinaSnow/XIVChatNext), published at <https://ainasnow.github.io/XIVChatNext-site/>. Built with [Astro](https://astro.build/) as a static site with no client-side JavaScript. Pages: home, download, client guide, relay guide, privacy and changelog, each in English and Simplified Chinese. Colours follow the system light or dark setting.

## Develop

Requires Node.js 22.12 or newer.

```powershell
npm ci
npm run sync     # refresh release data from GitHub
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
| `src/data/docs.json` | Client guide, relay guide and privacy page, rendered from the product repository's `docs/user/` (`CLIENT_GUIDE.md`, `SELF_HOSTED_RELAY.md`, `PRIVACY.md`). Edit those files, not this one. |
| `scripts/sync-docs.mjs` | Regenerates `docs.json` from the product repository's `main` branch. Set `DOCS_DIR` to a local `docs/user` folder to preview unpublished edits. |
| `src/data/release.json` | Latest desktop ZIP and plugin package: version, release tag, URL, size and SHA-256. |
| `src/data/releases.json` | Bilingual release notes rendered on the changelog page. |
| `scripts/sync-releases.mjs` | Regenerates both data files from public GitHub releases; keeps them unchanged if GitHub is unreachable. |
| `src/styles/global.css` | Site stylesheet. |
| `public/assets/` | Logo sizes, icons, the social card (`og.png`) and `screenshots/`. The screenshots come from the desktop WinUI suite (`site-main-en.png`, `site-main-zh.png`), which uses fictional characters. |

Copy can use `{desktop}`, `{plugin}`, `{tag}` and `{releasePage}`, filled from `src/data/release.json`. Versions, download links, checksums and the changelog update themselves; a release only needs the "what's new" sentence in `src/i18n/home.ts` reviewed.

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`, which refreshes release data, builds the site and deploys `dist/` to GitHub Pages. The workflow also runs daily, so a new XIVChat Next release appears on the site within a day without a commit here. `dist/` is generated and not committed.
