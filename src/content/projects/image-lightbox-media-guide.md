---
section: "personal-website-build"
title: "详情页图片灯箱：点击图片查看原图"
description: "学习如何在静态内容详情页中实现图片点击放大预览。"
date: 2026-07-05 05:52
published: true
tags:
  - JavaScript
  - UI
  - 媒体展示
media:
  images: []
  videos: []
  audios: []
---

## 为什么需要图片灯箱

Markdown 内容中经常会插入截图、插画或项目素材。

如果图片只在正文里按固定宽度展示，细节可能看不清。点击图片查看原图可以提升阅读体验，尤其适合：

- 技术截图
- 项目界面图
- 设计稿
- 笔记配图

## 基本结构

灯箱通常由三部分组成：

- 遮罩层
- 大图元素
- 关闭按钮

页面中可以预先放一个全局灯箱：

```html
<div id="imageLightbox" class="image-lightbox" aria-hidden="true">
  <button class="image-lightbox__close" type="button">×</button>
  <img id="imageLightboxImage" class="image-lightbox__image" alt="" />
</div>
```

这个结构放在全局 Layout 中，所有详情页都能复用。

## 监听哪些图片

并不是网站所有图片都需要放大，例如头像、logo、按钮图标就不需要。

本站只监听详情内容中的图片：

```text
.detail-panel
.detail-content
.media-section
.media-grid
```

这样可以避免误触导航栏或头像。

## 打开灯箱

点击图片时，把图片地址赋给灯箱里的大图：

```js
lightboxImage.src = image.currentSrc || image.src;
lightboxImage.alt = image.alt || '';
lightbox.classList.add('open');
document.body.classList.add('lightbox-open');
```

`currentSrc` 可以兼容响应式图片，优先拿浏览器实际加载的图片地址。

## 关闭灯箱

关闭方式可以有三种：

- 点击关闭按钮。
- 点击背景遮罩。
- 按 Escape。

关闭时要清空图片地址，并恢复页面滚动：

```js
lightbox.classList.remove('open');
document.body.classList.remove('lightbox-open');
lightboxImage.removeAttribute('src');
```

## 样式重点

遮罩层需要固定在视口上：

```css
.image-lightbox {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
}

.image-lightbox.open {
  display: flex;
}
```

大图应该完整显示，而不是裁切：

```css
.image-lightbox__image {
  max-width: 96vw;
  max-height: 90vh;
  object-fit: contain;
}
```

## 本站实践总结

图片灯箱是小功能，但能明显提升详情页体验。

实现时最重要的是控制作用范围：只让正文和媒体区图片可点击，不影响头像、导航和普通装饰图。
