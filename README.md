# XIVChat Next website

Product site for [XIVChat Next](https://github.com/AinaSnow/XIVChatNext), published at <https://ainasnow.github.io/XIVChatNext-site/>.

## Layout

The site is hand-written static HTML with no build step. Everything published lives in `dist/`:

| Path | Page |
| --- | --- |
| `dist/index.html`, `dist/zh/index.html` | Home (English / Simplified Chinese) |
| `dist/guide.html`, `dist/zh/guide.html` | Client guide |
| `dist/relay.html`, `dist/zh/relay.html` | Self-hosted relay guide |
| `dist/style.css` | Shared stylesheet |
| `dist/assets/` | Logo and images |

English and Chinese pages are separate files and must be edited together.

## Publishing

Pushing to `main` runs `.github/workflows/pages.yml`, which uploads `dist/` to GitHub Pages. To preview locally, open `dist/index.html` in a browser or serve the folder:

```powershell
python -m http.server 8000 --directory dist
```

## Release checklist

Version numbers are written into the page text. When a desktop or plugin release ships, update every occurrence in both languages:

- `index.html` and `zh/index.html`: release summary under the feature introduction.
- `guide.html` and `zh/guide.html`: release sections and upgrade notes.

Download buttons link to the GitHub Releases page, so they do not need updating.

## Planned

The site is being rebuilt with Astro so that both languages share templates, guides are generated from the product repository's `docs/user/`, and version numbers come from GitHub Releases at build time.
