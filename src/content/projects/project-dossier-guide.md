---
section: "personal-website-build"
title: "项目技术档案：让项目分区像项目主页"
description: "学习如何把项目分区从文章集合升级为包含状态、技术栈和统计信息的项目主页。"
date: 2026-07-05 06:25
published: true
tags:
  - Astro
  - Content Collections
  - Decap CMS
  - 信息建模
media:
  images: []
  videos: []
  audios: []
---

## 为什么需要技术档案

如果 Project 只是帖子列表，它更像“文章分类”。但一个真正的项目主页应该能回答这些问题：

- 这个项目是什么？
- 使用了哪些技术？
- 最近是否还在更新？
- 当前状态是进行中、暂停还是完成？
- 这个项目已经积累了多少技术记录？

所以项目分区页被升级为“技术档案 + 技术记录列表”的结构。

## 数据模型

项目分区在原来的 `title`、`description`、`date` 基础上新增两个字段：

```ts
technologies: string[]
status: '进行中' | '暂停' | '完成'
```

`technologies` 适合记录项目技术栈，`status` 用来表达项目阶段。

## 自动计算的信息

有些字段不应该手动填写，比如：

- 最近更新时间
- 帖子数量

它们可以直接从项目下的更新帖计算：

```ts
const items = await getEntriesInSection('projects', section.id);
const latestDate = items[0]?.data.date ?? section.data.date;
```

这样项目主页会跟随内容自动变化，不容易出现“写了新帖子但统计没更新”的问题。

## CMS 编辑

Decap CMS 的项目分区表单新增：

- 使用技术：list 字段
- 项目状态：select 字段

这样项目状态和技术栈可以在后台直接维护，不需要手动改代码。

## 页面结构

项目分区页现在分为两层：

- 顶部：Technical Dossier，展示项目简介、技术栈、最近更新时间、帖子数量和状态。
- 下方：Project Updates，继续展示该项目下的技术记录。

这种结构让 Project 更像项目主页，而不是普通分类页。
