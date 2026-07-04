---
section: "personal-website-build"
title: "分区系统设计：让 Notes 和 Projects 支持项目内更新"
description: "学习如何把单层内容列表升级为分区与分区内帖子两层结构。"
date: 2026-07-05 05:47
published: true
tags:
  - Astro
  - 路由
  - 内容结构
media:
  images: []
  videos: []
  audios: []
---

## 问题背景

一开始 Notes 和 Projects 都是单层列表：

```text
/study/post-slug/
/projects/post-slug/
```

这种结构适合“每篇文章彼此独立”的情况，但不适合长期维护一个项目。

例如“个人网站搭建”本身会不断产生更新：

- 内容模型设计
- CMS 接入
- Cloudflare 部署
- 图片灯箱
- About 页面优化

如果每条都直接放在 Projects 列表里，项目页会变得像普通文章列表，而不是项目档案。

## 目标结构

更合理的结构是：

```text
/projects/
/projects/personal-website-build/
/projects/personal-website-build/astro-content-collections-guide/
```

Notes 也类似：

```text
/study/
/study/math-modeling/
/study/math-modeling/first-note/
```

这样可以先创建一个分区，再把具体更新帖放进去。

## 内容集合设计

分区本身是一个集合：

```text
src/content/project-sections/
src/content/study-sections/
```

分区内更新帖是另一个集合：

```text
src/content/projects/
src/content/study/
```

更新帖通过 `section` 字段关联分区：

```yaml
section: "personal-website-build"
```

## 前台页面设计

分区首页负责展示所有分区：

```text
/projects/
```

分区页负责展示当前分区内的所有帖子：

```text
/projects/[section]/
```

帖子详情页负责展示正文：

```text
/projects/[section]/[slug]/
```

在 Astro 中，对应的文件结构是：

```text
src/pages/projects.astro
src/pages/projects/[section].astro
src/pages/projects/[section]/[slug].astro
```

## getStaticPaths 的核心逻辑

分区页需要根据所有分区生成路径：

```ts
export async function getStaticPaths() {
  const sections = await getPublishedSections('projectSections');

  return sections.map((section) => ({
    params: { section: section.id },
    props: { section },
  }));
}
```

帖子详情页需要根据每篇帖子生成两层参数：

```ts
return projects.map((project) => ({
  params: {
    section: project.data.section,
    slug: project.id,
  },
  props: { project },
}));
```

## CMS 中如何选择分区

Decap CMS 可以用 relation 字段让更新帖选择所属分区：

```yaml
- label: "所属项目"
  name: "section"
  widget: "relation"
  collection: "project_sections"
  search_fields: ["title"]
  display_fields: ["title"]
  value_field: "{{slug}}"
```

这样编辑帖子时不需要手动输入 slug，可以从已有项目分区里选择。

## About 页如何使用分区数据

About 页右侧展示最近更新的分区时，逻辑是：

1. 读取所有分区。
2. 查询每个分区下最新一篇帖子。
3. 按最新帖子的日期排序。
4. 取前三个分区展示。

这个设计让 About 页面自动反映最近在维护什么内容。

## 本站实践总结

分区系统的关键不是路由本身，而是“内容关系”的设计。

只要分区和帖子之间的关系清晰，前台列表、详情页、CMS 表单和 About 自动展示都能围绕这一套结构自然扩展。
