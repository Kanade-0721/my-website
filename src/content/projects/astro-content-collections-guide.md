---
section: "personal-website-build"
title: "Astro Content Collections：给静态网站建立内容模型"
description: "学习如何用 Astro Content Collections 管理博客、笔记、项目和分区内容。"
date: 2026-07-05 05:46
published: true
tags:
  - Astro
  - Content Collections
  - 内容建模
media:
  images: []
  videos: []
  audios: []
---

## 为什么需要内容模型

静态网站最开始通常只是一些 `.astro` 页面。页面少的时候可以直接写死内容，但一旦开始写博客、学习笔记、项目记录，就会遇到几个问题：

- 每篇内容都要手动写页面，重复工作很多。
- 标题、简介、日期、标签等字段没有统一格式。
- 列表页无法自动按照日期排序。
- CMS 很难知道应该让你填写哪些字段。

Astro Content Collections 的作用就是给 Markdown 内容建立统一的数据模型。你可以把它理解成“静态网站里的小型数据库表结构”。

## 基本结构

一个内容集合通常由两部分组成：

- `src/content.config.ts`：定义集合名称、文件位置和字段结构。
- `src/content/<collection>/`：存放这个集合的 Markdown 文件。

例如博客集合可以放在：

```text
src/content/blog/
```

项目更新可以放在：

```text
src/content/projects/
```

## 字段设计思路

本网站的基础内容字段包括：

```ts
title: string
description: string
date: Date
published: boolean
tags: string[]
cover?: string
media: {
  images: string[]
  videos: string[]
  audios: string[]
}
```

这些字段解决了几个实际问题：

- `title` 用于列表标题和详情页标题。
- `description` 用于列表摘要。
- `date` 用于排序和贡献日历统计。
- `published` 用于隐藏草稿。
- `tags` 用于以后做分类筛选。
- `media` 用于统一管理附加图片、视频和音频。

## 分区内容的特殊字段

当 Notes 和 Projects 升级为“分区 -> 帖子”结构后，每篇更新帖需要知道自己属于哪个分区，所以额外增加了：

```ts
section: string
```

例如一篇项目更新帖：

```yaml
---
section: "personal-website-build"
title: "Astro Content Collections：给静态网站建立内容模型"
date: 2026-07-05 05:46
published: true
---
```

`section` 的值对应分区文件的 slug。这样前台可以生成：

```text
/projects/personal-website-build/astro-content-collections-guide/
```

## 读取内容

Astro 提供 `getCollection()` 读取内容集合。实际项目里通常会封装一层工具函数：

```ts
const entries = await getCollection('projects', ({ data }) => data.published !== false);
entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
```

封装后的好处是：

- 所有页面都用同一个排序逻辑。
- 草稿过滤规则统一。
- 集合为空时可以优雅返回空数组。

## 常见坑

### 日期格式要能被解析

如果 CMS 保存为：

```yaml
date: 2026-07-05 05:46
```

schema 里建议使用：

```ts
z.coerce.date()
```

这样字符串会被转换为 `Date` 对象。

### 空集合会有警告

当某个集合目录没有任何 Markdown 文件时，构建时可能会出现空集合警告。这通常不是错误，只要页面逻辑能处理空数组即可。

### 修改 schema 后要强制刷新

如果内容结构变化很大，可以运行强制构建清理内容缓存：

```bash
npx astro build --force
```

## 本站实践总结

Content Collections 是整个网站内容系统的基础。它让博客、笔记、项目、分区、CMS 表单、列表页和详情页都围绕同一套数据结构运转。

对于个人网站来说，先把内容模型设计好，比先写复杂页面更重要。
