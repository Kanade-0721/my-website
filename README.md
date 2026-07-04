# Kanade 的个人网站

这是一个基于 Astro 的个人静态网站，用于发布博客、学习笔记、项目记录和站点更新日志。

网站内容通过 Git-based CMS 管理：后台编辑内容后，会把文章保存为仓库中的 Markdown 文件，再由 Cloudflare Pages 构建并发布。

## 技术栈

- Astro
- Astro Content Collections
- Decap CMS
- GitHub OAuth
- Cloudflare Pages
- Cloudflare Pages Functions

## 本地开发

安装依赖：

```sh
npm install
```

启动开发服务器：

```sh
npm run dev
```

根据本仓库的开发约定，也可以使用 Astro 的后台模式：

```sh
npx astro dev --background
```

查看或停止后台开发服务器：

```sh
npx astro dev status
npx astro dev stop
npx astro dev logs
```

构建网站：

```sh
npm run build
```

强制刷新内容缓存并构建：

```sh
npx astro build --force
```

## 内容结构

```text
src/content/blog/              博客文章
src/content/study-sections/    笔记分区
src/content/study/             笔记更新帖
src/content/project-sections/  项目分区
src/content/projects/          项目更新帖
```

Notes 和 Projects 使用两层结构：

```text
/study/分区/帖子/
/projects/分区/帖子/
```

分区用于组织主题或项目，具体更新内容作为帖子发布在对应分区下。

## CMS 后台

后台入口：

```text
/admin/
```

CMS 配置文件：

```text
public/admin/config.yml
```

Cloudflare Pages Functions 用于处理 GitHub OAuth：

```text
functions/api/auth.js
functions/api/callback.js
```

部署时需要在 Cloudflare Pages 中配置 GitHub OAuth 环境变量：

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

## 部署

部署平台：Cloudflare Pages

推荐配置：

```text
Build command: npm run build
Output directory: dist
Production branch: main
```

## 相关文档

- [CMS 使用说明](./CMS_USAGE.md)
- [发帖指南](./POSTING_GUIDE.md)
- [Astro 文档](https://docs.astro.build)
