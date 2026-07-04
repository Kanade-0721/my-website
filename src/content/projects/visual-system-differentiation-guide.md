---
section: "personal-website-build"
title: "视觉系统分层：减少玻璃卡片的同质化"
description: "学习如何在同一套视觉系统里，让列表页、详情页、About 和 Changelog 拥有不同页面性格。"
date: 2026-07-05 06:26
published: true
tags:
  - CSS
  - Scoped CSS
  - UI Design
  - 阅读体验
media:
  images: []
  videos: []
  audios: []
---

## 问题

玻璃卡片可以快速建立统一风格，但如果每个页面、每个区域都使用同样的玻璃卡，会带来同质化问题：

- 列表页像卡片集合，这是合理的。
- 详情页如果也是大玻璃卡，阅读时会显得有些吵。
- About 页面适合保持仪表盘感。
- Changelog 更适合时间线，而不是重复卡片。

所以这次调整的目标是：同一套视觉系统，不同页面有不同性格。

## 页面分工

最终采用的分工是：

- 列表页：保留玻璃卡片，强调入口和扫描。
- 详情页：改成安静阅读页面，减少透明叠层。
- About：保留仪表盘感，用于展示个人信息和活跃度。
- Changelog：改成时间线，强调更新过程。

## 阅读页面

详情页从 `glass-panel` 换成 `reading-panel`：

```astro
<article class="reading-panel detail-panel">
  ...
</article>
```

阅读样式重点是：

- 正文宽度收窄。
- 标题和正文层级更清楚。
- 代码块、引用、图片保持轻边界。
- 媒体区用分隔线而不是厚卡片。

## 时间线页面

Changelog 使用三列结构：

- 左侧日期。
- 中间时间线节点。
- 右侧更新内容。

核心样式是使用伪元素画出纵向轴线：

```css
.timeline::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 1px;
}
```

这样更新日志更像“演进记录”，而不是普通列表。

## 经验

视觉统一不等于所有页面长得一样。更好的做法是复用基础变量、字体、间距和颜色，但让不同页面根据任务拥有不同结构。

这次调整后，网站整体仍然统一，但列表、阅读、仪表盘和时间线各自承担了不同的体验角色。
