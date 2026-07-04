---
section: "personal-website-build"
title: "About 页面信息面板：自动读取内容与响应式布局"
description: "学习如何让 About 页面从内容系统自动读取最近更新，并设计稳定的响应式卡片布局。"
date: 2026-07-05 05:50
published: true
tags:
  - UI
  - Astro
  - 响应式布局
media:
  images: []
  videos: []
  audios: []
---

## About 页面不只是个人简介

个人网站的 About 页面很容易变成一张静态名片。

但如果网站本身有持续更新的博客、笔记和项目，那么 About 页面也可以成为一个小型 dashboard：

- 左侧展示个人信息。
- 右侧展示最近更新的项目分区和笔记分区。
- 名片中展示更新频率日历。

这样用户进入 About 页面时，可以快速理解你是谁，以及你最近在维护什么内容。

## 自动读取最近分区

本站右侧的“近期项目”和“正在学习”不是手写内容，而是自动读取内容集合。

核心逻辑是：

1. 读取所有分区。
2. 找到每个分区下最新一篇帖子。
3. 按最新帖子日期排序。
4. 只展示前三个。

伪代码：

```ts
const sections = await getPublishedSections('projectSections');

const result = await Promise.all(
  sections.map(async (section) => {
    const entries = await getEntriesInSection('projects', section.id);
    const latestEntry = entries[0];

    return {
      name: section.data.title,
      description: latestEntry ? latestEntry.data.title : '暂无更新',
      status: formatEntryDate(latestEntry?.data.date ?? section.data.date),
      href: `/projects/${section.id}`,
    };
  }),
);
```

## 为什么展示“分区”而不是“帖子”

About 页空间有限，直接展示最近三篇帖子会偏向文章列表。

展示最近三个分区更能说明当前关注方向：

- 最近维护哪个项目。
- 最近学习哪个主题。
- 每个方向下最新更新是什么。

这比单纯展示帖子更像一个个人主页。

## 名片布局设计

左侧名片包含：

- 头像
- 姓名
- 身份
- 一句话签名
- 所在地、邮箱、爱好
- 更新频率日历
- Blog、GitHub、邮箱按钮

为了让右侧两张卡片和左侧名片高度协调，布局使用两列网格：

```css
.about-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
  align-items: stretch;
}
```

右侧卡片使用两行均分：

```css
.about-side {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
}
```

## 移动端处理

桌面端适合左右两栏，但移动端应恢复单列：

```css
@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
```

这样可以避免手机上卡片被强行拉高。

## 本站实践总结

About 页面最重要的不是放很多内容，而是让内容有层次：

- 静态身份信息说明“我是谁”。
- 自动读取的分区说明“我最近在做什么”。
- 贡献日历说明“我是否持续更新”。

这三层组合起来，页面会比单纯简历式介绍更有生命力。
