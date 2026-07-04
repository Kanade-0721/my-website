---
section: "personal-website-build"
title: "Cloudflare Pages 部署：从静态构建到 Pages Functions"
description: "学习如何把 Astro 静态网站部署到 Cloudflare Pages，并理解 Pages 与 Workers 的区别。"
date: 2026-07-05 05:49
published: true
tags:
  - Cloudflare Pages
  - 部署
  - Astro
media:
  images: []
  videos: []
  audios: []
---

## 为什么选择 Cloudflare Pages

Astro 静态网站非常适合部署到 Cloudflare Pages。

原因是：

- 构建完成后大部分内容都是静态文件。
- Cloudflare Pages 可以从 GitHub 仓库自动构建。
- 免费额度对个人网站通常足够。
- Pages Functions 可以处理少量后端逻辑，例如 GitHub OAuth。

## Pages 和 Workers 的区别

Cloudflare Workers 是运行在边缘网络上的 JavaScript 后端环境。

Cloudflare Pages 是面向前端静态网站的部署平台。

本网站主要是 Pages 项目，但 `/functions` 目录下的函数会作为 Pages Functions 运行。你可以把它理解成：

```text
静态页面由 Pages 托管
少量 API 由 Pages Functions 处理
```

## Astro 构建配置

静态 Astro 项目一般不需要 Cloudflare adapter。

构建命令是：

```bash
npm run build
```

输出目录是：

```text
dist
```

Cloudflare Pages 项目中应配置：

```text
Build command: npm run build
Output directory: dist
```

## Pages Functions 路径规则

Cloudflare Pages 会把 `functions` 目录映射成 API 路由。

例如：

```text
functions/api/auth.js
```

会变成：

```text
/api/auth
```

这正好用于 Decap CMS 的 GitHub OAuth 登录。

## 为什么不需要数据库

网站的内容保存在 GitHub 仓库中，构建后生成静态 HTML 页面。

所以部署链路是：

```text
GitHub Markdown -> Astro build -> dist 静态文件 -> Cloudflare Pages
```

数据库、服务器和传统后台都不是必须的。

## 常见问题

### 访问 pages.dev 显示找不到页面

可能原因包括：

- 部署还没有完成。
- 项目设置里 output directory 配错。
- Cloudflare Access 把站点保护起来。
- 浏览器缓存或 DNS 状态还没更新。

### Cloudflare Access 导致无法访问

如果看到 App Launcher、Access policy 或要求联系管理员之类的信息，通常说明 Pages 项目被 Cloudflare Access 保护了。

个人网站如果不需要访问控制，应关闭相关 Access Application。

### 本地 dist 有旧页面

如果删除内容后本地构建仍出现旧页面，可能是 Astro 内容层缓存或旧 dist 文件残留。

可以用：

```bash
npx astro build --force
```

强制刷新内容层。

## 本站实践总结

Cloudflare Pages 适合这个项目，因为它把静态页面托管和少量登录 API 放在同一个部署平台里。

对于个人网站来说，优先保持静态构建，只有必要的认证逻辑才放进 Functions，会更容易维护。
