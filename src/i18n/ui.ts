import type { Lang } from '../lib/site';

export const ui = {
  en: {
    htmlLang: 'en',
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    features: 'Features',
    guide: 'Client guide',
    relay: 'Relay',
    otherLanguage: '中文',
    otherLang: 'zh-CN',
    download: 'Download ↗',
    footerTagline: 'WINDOWS CLIENT · DALAMUD PLUGIN',
    footerProject: 'Project & releases',
    footerSource: 'Website source',
    footerLegal: 'FINAL FANTASY XIV is a trademark of Square Enix. Independent community project. Demo messages are fictional.',
  },
  zh: {
    htmlLang: 'zh-CN',
    skip: '跳到正文',
    navLabel: '主导航',
    features: '功能一览',
    guide: '客户端指南',
    relay: '自建中继',
    otherLanguage: 'English',
    otherLang: 'en',
    download: '下载 ↗',
    footerTagline: 'Windows 客户端 · Dalamud 插件',
    footerProject: '项目与发布',
    footerSource: '网站源码',
    footerLegal: 'FINAL FANTASY XIV 是 Square Enix 的商标。本项目与 Square Enix 无关联，示意消息均为虚构。',
  },
} satisfies Record<Lang, Record<string, string>>;
