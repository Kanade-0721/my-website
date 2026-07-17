---
section: "personal-website-build"
title: "Markdown 与 Typora 兼容：统一公式和正文渲染流程"
description: "记录 Astro 网站如何通过 Unified、Remark、Rehype 和 KaTeX 提升 Typora 内容的兼容性。"
date: 2026-07-18 04:00
published: true
tags:
  - Astro
  - Markdown
  - Typora
  - Remark
  - KaTeX
media:
  images: []
  videos: []
  audios: []
---

## 问题背景

同一份 Markdown 在 Typora 中显示正常，复制到静态网站后却不一定能得到相同结果。常见问题包括：

- `\(...\)` 行内公式被当成普通文字。
- `\[...\]` 块级公式无法识别。
- 中文和公式之间的空格影响解析。
- 单次换行在网页中被合并。
- 表格、任务列表、删除线或标记语法表现不一致。
- 页面加载后再用浏览器脚本处理公式，容易出现闪烁和结构变化。

问题的核心不是 CSS，而是 Typora 和网站使用了不同的 Markdown 解析规则。

## 统一到 Astro 构建阶段

网站现在使用 Astro 官方 Markdown/Remark 处理流程，并将扩展集中放在 `astro.config.mjs` 中。

渲染过程可以概括为：

```text
Markdown 原文
  -> Remark 解析 Markdown 与数学公式
  -> Rehype 转换和处理 HTML 结构
  -> KaTeX 生成公式 HTML
  -> Astro 输出静态页面
```

公式和正文在构建阶段已经转换完成，浏览器只负责显示，不需要等待额外脚本再次扫描页面。

## 使用的 Markdown 扩展

当前处理器启用了以下能力：

- GFM：表格、任务列表、删除线和自动链接等常用语法。
- `remark-breaks`：将单次换行转换为可见换行，更接近编辑器中的输入体验。
- CJK Friendly：改善中文、日文、韩文内容与强调或删除线之间的解析。
- Flexible Markers：支持更灵活的文本标记。
- Remark Math Extended：识别多种数学公式定界符。
- Rehype KaTeX：将数学语法转换成可直接显示的 HTML。

## 支持的公式写法

行内公式可以使用：

```markdown
$T(x,y,t)$
```

也可以使用 Typora 常见写法：

```markdown
\(T(x,y,t)\)
```

块级公式可以使用：

```markdown
$$
\frac{\partial T}{\partial t}=\alpha\nabla^2T
$$
```

或者：

```markdown
\[
\frac{\partial T}{\partial t}=\alpha\nabla^2T
\]
```

这样从 Typora 复制包含 `\(...\)` 或 `\[...\]` 的内容时，不需要逐个改成美元符号格式。

## 为什么从 MathJax 改为 KaTeX

早期方案是在浏览器中加载 MathJax，再扫描页面里的公式文本。它能够显示公式，但有几个缺点：

- 页面正文先显示，公式稍后才变化。
- 浏览器端脚本需要重新修改 DOM。
- Markdown 解析阶段如果已经破坏定界符，MathJax 也无法恢复。
- 每个详情页都需要承担运行时公式处理成本。

现在使用 KaTeX 在构建阶段生成公式结构，页面打开时已经是最终结果。长公式仍然通过 CSS 横向滚动保护，避免撑破手机页面。

## 中文技术文章的样式补充

解析成功只是第一步，复杂 Markdown 还需要对应样式。详情页补充了：

- 表格横向滚动和隔行背景。
- 任务列表复选框对齐。
- 多层列表间距。
- 引用块和分隔线。
- 行内代码与代码块。
- 脚注、定义列表、`details` 和 `kbd`。
- 图片、视频和 iframe 的宽度限制。
- KaTeX 块级公式的滚动保护。

这些样式只作用于详情正文，避免影响导航栏、CMS 和其他页面组件。

## 内容缓存注意事项

修改 Markdown 插件后，Astro 内容缓存可能保留旧的渲染结果。遇到配置已经修改但页面仍显示旧内容时，可以执行：

```bash
npm run astro -- sync --force
npm run build
```

强制同步后，内容集合会重新解析全部 Markdown。

## 本站实践总结

Markdown 兼容性不能只靠增加一个浏览器脚本解决。更稳定的方式是让编辑器输入习惯、Remark 解析规则、公式转换和页面样式形成同一条构建链路。

完成这次调整后，Typora 中常见的行内公式、块级公式、中文混排、表格和换行可以更稳定地进入 Astro 静态页面，也为后续继续增加 Markdown 扩展保留了统一入口。
