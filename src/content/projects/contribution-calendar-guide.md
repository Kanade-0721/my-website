---
section: "personal-website-build"
title: "贡献日历组件：统计网站更新频率"
description: "学习如何用内容日期生成类似 GitHub Contributions 的更新频率热力图。"
date: 2026-07-05 05:51
published: true
tags:
  - UI
  - 数据统计
  - Astro
media:
  images: []
  videos: []
  audios: []
---

## 组件目标

贡献日历用于回答一个简单问题：

> 这个网站是不是在持续更新？

它模仿 GitHub Contributions 的视觉形式，用一年中的每一天作为一个小格子，颜色深浅表示当天发布了多少篇 post。

本站统计的 post 包括：

- blog 文章
- note 更新帖
- project 更新帖

不统计分区本身，因为分区更像目录，不是内容更新。

## 数据来源

About 页面先读取所有已发布内容：

```ts
const allPosts = [
  ...(await getPublishedEntries('blog')),
  ...(await getPublishedEntries('study')),
  ...(await getPublishedEntries('projects')),
];
```

然后把每篇内容的日期归并到天：

```ts
const contributionCounts = allPosts.reduce((counts, post) => {
  const key = toDateKey(post.data.date);
  counts.set(key, (counts.get(key) ?? 0) + 1);
  return counts;
}, new Map());
```

最终得到：

```ts
[
  { date: '2026-07-05', count: 3 },
  { date: '2026-07-06', count: 1 },
]
```

## 为什么使用自然年

一开始贡献日历可以做成“最近一年滚动窗口”，但这样横轴最左边可能不是 1 月。

为了更符合直觉，本站改成当前自然年：

```text
1月 -> 12月
```

这样你看到的就是今年从年初到年末的更新分布。

## 网格生成方法

每一天都有两个位置：

- 第几周：决定横向位置。
- 星期几：决定纵向位置。

计算方式：

```ts
const week = Math.floor((index + start.getDay()) / 7) + 1;
const day = date.getDay() + 1;
```

然后用 CSS Grid 放置：

```astro
<span
  style={`grid-column: ${day.week}; grid-row: ${day.day};`}
/>
```

## 颜色等级

本站把更新数量压缩为 0 到 4 五个等级：

```ts
level: Math.min(count, 4)
```

含义是：

- 0：没有更新
- 1：少量更新
- 2：中等更新
- 3：较多更新
- 4：高频更新

这样即使某天更新很多篇，也不会破坏颜色尺度。

## 可访问性细节

每个小格子都有 `title` 和 `aria-label`：

```text
2026-07-05: 3 篇更新
```

鼠标悬停时可以看到当天更新数量，屏幕阅读器也能读出这一天的含义。

## 本站实践总结

贡献日历不是必要功能，但它很适合个人网站。

它把“我持续维护这个网站”这件事可视化了，也能反过来提醒自己保持记录习惯。
