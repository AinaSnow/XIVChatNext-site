import release from '../data/release.json';

export type Lang = 'en' | 'zh';

export const repo = 'https://github.com/AinaSnow/XIVChatNext';
export const siteRepo = 'https://github.com/AinaSnow/XIVChatNext-site';
export const pluginRepository = 'https://raw.githubusercontent.com/AinaSnow/FFXIV-Dalamud-Plugins/main/pluginmaster.json';

export { release };
export const releasePage = `${repo}/releases/tag/${release.tag}`;
export const desktopDownload = `${repo}/releases/download/${release.tag}/${release.desktopAsset}`;
export const pluginDownload = `${repo}/releases/download/${release.tag}/latest.zip`;

/** Site-relative URL for a page, e.g. url('zh', 'guide.html'). */
export function url(lang: Lang, page = 'index.html'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${lang === 'zh' ? 'zh/' : ''}${page}`;
}

export function asset(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path}`;
}

/** Replace {desktop}, {plugin}, {tag} and {releasePage} in copy with the current release. */
export function fill(text: string): string {
  const values: Record<string, string> = { ...release, releasePage };
  return text.replace(/\{(desktop|plugin|tag|releasePage)\}/g, (_, key: string) => values[key]);
}
