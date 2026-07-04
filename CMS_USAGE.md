# Cloudflare Pages CMS 使用说明

这个站点现在使用 Astro + Decap CMS + GitHub OAuth + Cloudflare Pages Functions。

## 入口

- 线上 CMS：`https://你的 Cloudflare Pages 域名/admin/`
- CMS 配置文件：`public/admin/config.yml`
- 内容目录：`src/content`
- 上传媒体目录：`public/uploads`

## 内容类型

CMS 里有三类内容：

- 博客：保存到 `src/content/blog`
- 学习笔记：保存到 `src/content/study`
- 项目：保存到 `src/content/projects`

每篇内容都是 Markdown 文件，文件头部包含标题、简介、日期、标签、封面图和媒体字段。

## 当前生产环境

- GitHub 仓库：`Kanade-0721/my-website`
- 分支：`main`
- 部署平台：Cloudflare Pages
- CMS 登录：GitHub OAuth

`public/admin/config.yml` 使用 Decap CMS GitHub backend：

```yaml
backend:
  name: github
  repo: Kanade-0721/my-website
  branch: main
  base_url: /api
  auth_endpoint: auth
```

## Cloudflare Pages 设置

在 Cloudflare Pages 创建项目并连接 GitHub 仓库：

```text
Repository: Kanade-0721/my-website
Production branch: main
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 22.12.0 或更高
```

## GitHub OAuth App

需要在 GitHub 创建一个 OAuth App：

```text
Homepage URL:
https://你的 Cloudflare Pages 域名

Authorization callback URL:
https://你的 Cloudflare Pages 域名/api/callback
```

然后在 Cloudflare Pages 的环境变量里添加：

```text
GITHUB_OAUTH_CLIENT_ID
GITHUB_OAUTH_CLIENT_SECRET
```

这些变量由 `functions/api/auth.ts` 和 `functions/api/callback.ts` 使用，用来让 Decap CMS 登录 GitHub。

## 发布逻辑

这是静态网站，所以“发布”不是直接写数据库，而是：

1. 在 CMS 后台编辑内容。
2. Decap CMS 通过 GitHub OAuth 把 Markdown 和媒体文件提交到 GitHub。
3. Cloudflare Pages 检测到 `main` 分支更新后重新构建网站。
4. 新内容出现在博客、笔记或项目页面中。

