# Git-based CMS 使用说明

这个站点现在使用 Decap CMS + Astro Content Collections 管理内容。

## 入口

- 本地或线上访问：`/admin/`
- CMS 配置文件：`public/admin/config.yml`
- 内容目录：`src/content`
- 上传媒体目录：`public/uploads`

## 内容类型

CMS 里有三类内容：

- 博客：保存到 `src/content/blog`
- 学习笔记：保存到 `src/content/study`
- 项目：保存到 `src/content/projects`

每篇内容都是 Markdown 文件，文件头部包含标题、简介、日期、标签、封面图和媒体字段。

## 发布逻辑

这是静态网站，所以“发布”不是直接写数据库，而是：

1. 在 CMS 后台编辑内容。
2. CMS 把 Markdown 和媒体文件提交到 Git 仓库。
3. 部署平台检测到 Git 更新后重新构建网站。
4. 新内容出现在博客、笔记或项目页面中。

## 本地开发

Decap CMS 已启用 `local_backend: true`。本地编辑时通常需要单独启动 Decap 的本地代理：

```bash
npx decap-server
```

然后按项目约定启动 Astro：

```bash
astro dev --background
```

访问 `http://localhost:4321/admin/` 即可打开后台。

## 当前生产环境

当前仓库和部署方式：

- GitHub 仓库：`Kanade-0721/my-website`
- 分支：`main`
- 部署平台：Netlify
- 编辑者：只有你自己

`public/admin/config.yml` 使用 Netlify Git Gateway：

```yaml
backend:
  name: git-gateway
  branch: main
```

上线后还需要在 Netlify 后台完成一次设置：

1. 打开这个站点的 Netlify 项目。
2. 启用 Identity。
3. 启用 Git Gateway，并连接到 GitHub 仓库 `Kanade-0721/my-website`。
4. 邀请你的邮箱成为 Identity 用户。
5. 访问线上 `/admin/`，用邀请邮箱登录。

如果以后不用 Netlify，而是改成别的平台直连 GitHub，需要把后台配置改成 GitHub backend，例如：

```yaml
backend:
  name: github
  repo: Kanade-0721/my-website
  branch: main
```

同时还需要配置对应平台的登录授权。
