---
section: "personal-website-build"
title: "首页门户：封面页与最近更新聚合"
description: "学习如何把静态首页升级为封面式入口，并自动聚合博客、学习笔记和项目更新。"
date: 2026-07-05 06:24
published: true
tags:
  - Astro
  - Content Collections
  - CSS Scroll Snap
  - 信息架构
media:
  images: []
  videos: []
  audios: []
---

## 目标

首页不一定只承担“欢迎语”的功能。对于个人网站来说，它更适合成为一个门户：第一屏负责建立站点气质，第二屏负责把最近内容清楚地带出来。

这次首页被拆成两屏：

- 第一屏是封面页，保留个人站点的入口感。
- 第二屏是最近更新门户，用三列展示博客、学习内容和项目更新。
- 学习与项目不展示分区名，而是直接展示具体帖子标题，点击进入详情页。

## 内容读取方式

首页使用已有的内容读取工具：

```ts
const blogPosts = (await getPublishedEntries('blog')).slice(0, 5);
const studyNotes = (await getPublishedEntries('study')).slice(0, 5);
const projectUpdates = (await getPublishedEntries('projects')).slice(0, 5);
```

这样做的好处是首页不需要手动维护列表。CMS 中新增文章后，只要重新构建，首页就会自动读取最新内容。

## 分区内容如何跳转

学习和项目更新都属于“分区内帖子”，所以链接需要包含分区 slug：

```ts
getSectionedEntryPath('projects', entry)
```

最终路径类似：

```text
/projects/personal-website-build/homepage-portal-guide/
```

## 翻页式滚动

首页使用 `scroll-snap` 做轻量的卡片式翻页体验：

```css
html {
  scroll-snap-type: y proximity;
}

.home-page {
  min-height: 100vh;
  scroll-snap-align: start;
}
```

`proximity` 比 `mandatory` 更温和，用户滚动时有翻页感，但不会过度抢夺滚动控制权。

## 实践要点

首页门户的关键不是视觉复杂，而是信息优先级清楚：

- 第一屏只说“这里是什么”。
- 第二屏回答“现在有什么新内容”。
- 列表项直接进入详情页，减少中间层。

这让首页从静态欢迎页变成真正能承接内容系统的入口。
