// Refreshes src/data/docs.json from the product repository's bilingual user guides.
// Run with `npm run sync`. Set DOCS_DIR to a local docs/user folder to preview unpublished edits.
// On failure the committed data is kept and the build continues.
import { readFile, writeFile } from 'node:fs/promises';
import { marked } from 'marked';

const repo = 'AinaSnow/XIVChatNext';
const docsBase = `https://github.com/${repo}/blob/main/docs/user/`;
const guides = { guide: 'CLIENT_GUIDE.md', relay: 'SELF_HOSTED_RELAY.md', privacy: 'PRIVACY.md' };
// Guides that have their own page on this site; other docs link to GitHub.
const pages = { 'CLIENT_GUIDE.md': 'guide.html', 'SELF_HOSTED_RELAY.md': 'relay.html', 'PRIVACY.md': 'privacy.html' };

async function load(file) {
  if (process.env.DOCS_DIR) return readFile(new URL(file, `file:///${process.env.DOCS_DIR.replace(/\\/g, '/').replace(/\/?$/, '/')}`), 'utf8');
  const response = await fetch(`https://raw.githubusercontent.com/${repo}/main/docs/user/${file}`, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
  return response.text();
}

function section(markdown, heading) {
  const match = markdown.match(new RegExp(`^## ${heading}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm'));
  if (!match) throw new Error(`Missing "## ${heading}" section`);
  return match[1].trim();
}

function rewriteLinks(markdown) {
  return markdown.replace(/\]\(([A-Z_]+\.md)(#[^)]*)?\)/g, (all, file, anchor = '') => {
    if (pages[file]) return `](${pages[file]})`;
    return `](${docsBase}${file}${anchor})`;
  });
}

try {
  const out = {};
  for (const [key, file] of Object.entries(guides)) {
    const markdown = (await load(file)).replace(/\r\n/g, '\n');
    out[key] = {};
    for (const [lang, heading] of [['en', 'English'], ['zh', '简体中文']])
      out[key][lang] = marked.parse(rewriteLinks(section(markdown, heading)));
  }
  await writeFile(new URL('../src/data/docs.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
  console.log(`Synced ${Object.keys(guides).length} guides from ${process.env.DOCS_DIR ?? 'GitHub main'}.`);
} catch (error) {
  console.warn(`Docs sync skipped, keeping committed data: ${error.message}`);
}
