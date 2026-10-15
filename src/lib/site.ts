import data from '../data/release.json';

export type Lang = 'en' | 'zh';

export const repo = 'https://github.com/AinaSnow/XIVChatNext';
export const siteRepo = 'https://github.com/AinaSnow/XIVChatNext-site';
export const pluginRepository = 'https://raw.githubusercontent.com/AinaSnow/FFXIV-Dalamud-Plugins/main/pluginmaster.json';

/** Latest stable desktop ZIP and plugin package, refreshed by `npm run sync`. */
export const downloads = data;
export const release = { tag: data.desktop.tag, desktop: data.desktop.version, plugin: data.plugin.version };
export const releasePage = `${repo}/releases/tag/${data.desktop.tag}`;
/** The installer when the release has one, otherwise the portable ZIP. */
export const desktopDownload = data.desktop.installer?.url ?? data.desktop.url;
export const pluginDownload = data.plugin.url;

export function megabytes(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

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
