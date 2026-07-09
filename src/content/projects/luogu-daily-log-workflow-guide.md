---
section: "personal-website-build"
title: "洛谷每日刷题日志工作流：从本地脚本到题面解析"
description: "记录如何为个人网站加入洛谷刷题记录生成器，包括每日博客追加、题面抓取、标签解析、代码读取、公式渲染与本地构建同步流程。"
date: 2026-07-10 00:08
published: true
tags:
  - Node.js
  - Markdown
  - 洛谷
  - MathJax
  - 自动化脚本
media:
  images: []
  videos: []
  audios: []
---

## 功能目标

这次新增的是一个面向日常刷题的本地工作流：运行一条命令后，将当天在洛谷完成的题目追加到同一篇博客中。

设计目标不是“一题一篇”，而是“每日一篇”：

- 同一天的刷题记录集中到 `YYYY-MM-DD-luogu-daily.md`。
- 每道题保留题号、题名、状态、语言、标签、题面、思路、代码和复盘。
- 同一道题重复运行时覆盖旧记录，避免重复追加。
- 生成内容仍然是普通 Markdown，可以继续在 CMS 或本地编辑。

## 本地 CLI 脚本

核心入口是 `scripts/luogu-daily.mjs`，并在 `package.json` 中暴露命令：

```bash
npm run luogu:add
```

脚本使用 Node.js 标准库完成交互输入、文件读取与 Markdown 写入：

- `readline/promises`：提供命令行交互。
- `fs`：读取代码文件、读取旧博客、写入新博客。
- `fetch`：请求洛谷题目页。
- `Buffer`：把长题面编码进隐藏元数据，避免 Markdown 注释被破坏。

## 每日博客追加机制

脚本会根据当前日期定位目标文件：

```text
src/content/blog/2026-07-10-luogu-daily.md
```

如果当天没有日志，就创建一篇新的博客；如果已经存在，就读取旧内容并追加或更新题目。

为了让脚本能够稳定更新同一道题，每道题前面会写入一段隐藏元数据：

```md
<!-- LUOGU_DAILY_ITEM {...} -->
```

可见正文用于阅读，隐藏元数据用于下次运行时重新生成概览表和题目块。

## 题面抓取策略

洛谷题目页的结构可能随前端变化而变化，所以脚本采用多层兜底：

1. 优先请求 `?_contentOnly=1`。
2. 尝试读取页面注入数据。
3. 根据用户定位的 XPath 抓取渲染区域。
4. 最后按 `h2` 标题块提取题面内容。

目前题面正文的关键 XPath 是：

```text
/html/body/div/div[4]/div/main/div/div/div[2]
```

题目标签的 XPath 是：

```text
/html/body/div/div[4]/div/main/div/div/div[1]/div[2]/h3
```

这种方式不是简单地复制整个页面，而是尽量只取题目正文区域和标签区域，减少无关 UI 文本混入。

## HTML 转 Markdown

洛谷题面中会包含标题、段落、列表、样例代码块和公式。脚本会把 HTML 转成适合博客详情页显示的 Markdown：

- `h2 / h3 / h4` 转成 Markdown 标题。
- `li` 转成列表项。
- `pre` 转成代码块。
- 多余空行会被压缩。
- 题面内部标题会降级为 `####`，保证它们比 `### 题目原文` 小。

例如题面会整理成：

```md
### 题目原文

#### 题目描述

...

#### 输入格式

...

#### 输出格式

...
```

## 数学公式渲染

洛谷题面经常包含 `$...$` 和 `$$...$$` 形式的数学公式。

由于当前环境无法联网安装 `remark-math` 和 `rehype-katex`，本次先采用浏览器端 MathJax：

```html
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
```

同时在全局样式中为 `mjx-container` 增加横向滚动，避免长公式撑破移动端正文宽度。

后续如果允许安装依赖，可以把公式渲染迁移到构建期 KaTeX，这样页面加载时不依赖 CDN。

## 代码文件读取

脚本支持读取本地代码文件，例如：

```text
C:\Users\Kanade\Desktop\Untitled-1.py
```

也兼容带引号的 Windows 路径：

```text
"C:\Users\Kanade\Desktop\Untitled-1.py"
```

读取后会自动放入 Markdown 代码块，并根据语言字段选择代码块标识：

```md
```python
...
```
```

默认语言已经调整为 `Python`。

## 构建与同步

本地构建仍然使用：

```bash
npm run build
```

构建通过后，网站会生成包含新刷题日志的静态页面。

自动同步到 Git 仓库这一步目前还没有接进 `npm run luogu:add`，因为本地环境对 `.git/index.lock` 写入有权限限制。更稳的设计是后续新增单独命令：

```bash
npm run sync
```

负责执行：

```text
build -> git add -> git commit -> git pull --rebase -> git push
```

这样可以把“记录刷题”和“发布网站”分成两个动作，避免测试记录时误提交。

## 本次技术收获

这次功能把个人网站从“内容展示”推进到“本地内容生产工具”：

- Astro 负责静态页面生成。
- Markdown 继续作为内容存储格式。
- Node.js CLI 负责把日常行为转成结构化博客。
- HTML/XPath 解析用于从外部页面提取题面和标签。
- MathJax 解决算法题公式显示。
- Git-based 工作流继续承担发布链路。

它的价值不只是记录刷题，而是把一个重复行为变成可沉淀、可复盘、可搜索的个人知识库。
