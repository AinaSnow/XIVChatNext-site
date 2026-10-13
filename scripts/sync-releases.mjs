// Refreshes src/data/release.json and src/data/releases.json from public GitHub releases.
// Run with `npm run sync`. On network or API failure the committed data is kept and the build continues.
import { writeFile } from 'node:fs/promises';
import { marked } from 'marked';

const repo = 'AinaSnow/XIVChatNext';
const desktopAsset = /^XIVChatNext-Desktop-v(\d+\.\d+\.\d+)-win-x64\.zip$/;
const out = new URL('../src/data/', import.meta.url);

async function fetchReleases() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'xivchatnext-site' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=50`, { headers, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  return (await response.json()).filter((r) => !r.draft && !r.prerelease);
}

const compare = (a, b) => {
  const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
};
const digest = (asset) => asset.digest?.startsWith('sha256:') ? asset.digest.slice(7) : null;
const pluginVersion = (tag) => /^\d+\.\d+\.\d+$/.test(tag) ? tag : null;

/** Split a bilingual release body at its 简体中文 and English headings (level 2 or 3). */
function splitNotes(body) {
  const zh = body.match(/^#{2,3} 简体中文\s*$([\s\S]*?)(?=^#{2,3} English\s*$|(?![\s\S]))/m);
  const en = body.match(/^#{2,3} English\s*$([\s\S]*?)(?=^#{2,3} 简体中文\s*$|(?![\s\S]))/m);
  if (!zh || !en) return null;
  // Demote headings so the page keeps one h1 and each release owns an h2.
  const html = (md) => marked.parse(md.trim().replace(/^(#{2,5}) /gm, (_, hashes) => '#'.repeat(Math.max(3, hashes.length + 1)) + ' '));
  return { zh: html(zh[1]), en: html(en[1]) };
}

try {
  const releases = await fetchReleases();
  let desktop = null, plugin = null;
  for (const release of releases) {
    for (const asset of release.assets) {
      const match = asset.name.match(desktopAsset);
      if (match && (!desktop || compare(match[1], desktop.version) > 0))
        desktop = { version: match[1], tag: release.tag_name, asset: asset.name, url: asset.browser_download_url, sha256: digest(asset), size: asset.size };
      const version = pluginVersion(release.tag_name);
      if (asset.name === 'latest.zip' && version && (!plugin || compare(version, plugin.version) > 0))
        plugin = { version, tag: release.tag_name, url: asset.browser_download_url, sha256: digest(asset), size: asset.size };
    }
  }
  if (!desktop || !plugin) throw new Error('Could not find both a desktop ZIP and a plugin latest.zip');

  const notes = releases
    .map((r) => ({ tag: r.tag_name, name: r.name || r.tag_name, date: r.published_at.slice(0, 10), page: r.html_url, notes: splitNotes(r.body ?? '') }))
    .filter((r) => r.notes)
    .map(({ notes, ...r }) => ({ ...r, ...notes }));

  await writeFile(new URL('release.json', out), JSON.stringify({ desktop, plugin }, null, 2) + '\n');
  await writeFile(new URL('releases.json', out), JSON.stringify(notes, null, 2) + '\n');
  console.log(`Synced desktop ${desktop.version} (${desktop.tag}), plugin ${plugin.version}, ${notes.length} release notes.`);
} catch (error) {
  console.warn(`Release sync skipped, keeping committed data: ${error.message}`);
}
