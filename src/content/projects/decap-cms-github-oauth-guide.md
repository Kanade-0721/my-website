---
section: "personal-website-build"
title: "Decap CMS 与 GitHub OAuth：让静态网站拥有后台"
description: "学习 Git-based CMS 的基本原理，以及如何通过 GitHub OAuth 在 Cloudflare Pages 上登录后台。"
date: 2026-07-05 05:48
published: true
tags:
  - Decap CMS
  - GitHub OAuth
  - Cloudflare Pages
media:
  images: []
  videos: []
  audios: []
---

## Git-based CMS 是什么

传统 CMS 通常需要数据库，例如 WordPress 会把文章存进 MySQL。

Git-based CMS 的思路不同：后台编辑内容后，把内容保存成 Git 仓库里的 Markdown 文件。

本网站使用的方式是：

```text
Decap CMS 后台 -> GitHub 仓库 -> Cloudflare Pages 重新构建 -> 网站更新
```

优点是：

- 不需要数据库。
- 所有内容都有 Git 历史。
- 静态网站仍然可以部署在 Cloudflare Pages。
- 内容就是 Markdown 文件，迁移成本低。

## Decap CMS 的核心文件

后台页面：

```text
src/pages/admin.astro
```

CMS 配置：

```text
public/admin/config.yml
```

配置里最重要的是 backend：

```yaml
backend:
  name: github
  repo: Kanade-0721/my-website
  branch: main
  site_domain: https://my-website-a4a.pages.dev
  base_url: https://my-website-a4a.pages.dev
  auth_endpoint: /api/auth
```

这告诉 Decap CMS：

- 内容保存到哪个 GitHub 仓库。
- 使用哪个分支。
- OAuth 登录从哪里开始。

## 为什么需要 OAuth

Decap CMS 要帮你向 GitHub 写文件，因此需要拿到 GitHub 授权。

浏览器不能直接安全保存 GitHub Client Secret，所以需要一个后端函数完成 OAuth 交换。

在 Cloudflare Pages 中，这个后端函数放在：

```text
functions/api/auth.js
functions/api/callback.js
```

## 登录流程

完整流程是：

1. 你打开 `/admin/`。
2. Decap CMS 弹出登录窗口。
3. `/api/auth` 跳转到 GitHub 授权页。
4. GitHub 授权后回到 `/api/callback`。
5. callback 函数用 code 换取 access token。
6. callback 页面把 token 传回 CMS 主窗口。
7. CMS 使用 token 向 GitHub 创建或修改 Markdown 文件。

## Cloudflare 环境变量

OAuth 需要两个环境变量：

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

这些变量应该配置在 Cloudflare Pages 项目的环境变量里，而不是写在仓库代码中。

## 常见错误

### 本地访问 /api/auth 显示 404

Astro 本地开发服务器不会自动运行 Cloudflare Pages Functions。

所以本地 `astro dev` 下 `/api/auth` 可能不存在。OAuth 应该优先在 Cloudflare Pages 部署后的域名上测试。

### 登录窗口显示 Authentication complete 但后台没反应

这通常说明 OAuth 回调页没有正确把授权信息传回 Decap CMS 主窗口。

解决方向是确认 callback 页面使用了 Decap CMS 需要的 `postMessage` 握手逻辑。

### GitHub OAuth callback URL 不一致

GitHub OAuth App 中配置的 callback URL 必须和线上实际地址一致：

```text
https://my-website-a4a.pages.dev/api/callback
```

域名、路径、协议任何一个不一致都可能失败。

## 本站实践总结

Decap CMS 的难点不在写文章，而在认证链路。

只要 OAuth 配置打通，后续的内容管理就会变成普通的 Markdown 文件编辑流程：创建内容、保存草稿、发布、触发部署。
