# 内容发布指南

## 新增文章、笔记或项目

1. 打开 `/admin/`。
2. 使用 GitHub 登录。
3. 选择“博客”“学习笔记”或“项目”。
4. 点击新建。
5. 填写标题、简介、日期、标签和正文。
6. 需要图片、视频或音频时，上传到媒体字段或在正文里引用 `/uploads/...`。
7. 保存、推进到 READY，最后发布。

发布后，CMS 会把内容保存为 Markdown 文件并提交到 GitHub。Cloudflare Pages 重新构建后，新内容会自动出现在对应页面。

当前线上发布链路是：

```text
/admin/ 编辑
=> GitHub OAuth 登录
=> Decap CMS 提交到 Kanade-0721/my-website
=> Cloudflare Pages 自动重新构建
=> 静态页面更新
```

如果你把多篇内容都推进到 READY 状态，可以在 CMS 页面左下角点击“发布所有 READY”。这个按钮只会尝试发布 READY / pending_publish 状态的内容，不会发布仍是草稿或审核中的内容。

## 字段说明

- `title`：页面标题。
- `description`：列表页和 meta 描述使用的简介。
- `date`：发布时间，用于排序和显示。
- `published`：关闭后不会显示在站点上。
- `tags`：标签列表。
- `cover`：详情页顶部封面图，可选。
- `media.images`：详情页附加图片列表。
- `media.videos`：详情页附加视频列表。
- `media.audios`：详情页附加音频列表。
- `body`：正文 Markdown。

## 文件位置

```text
src/content/blog       博客
src/content/study      学习笔记
src/content/projects   项目
public/uploads         上传媒体
```

## slug 规则

建议使用小写英文、数字和连字符，例如：

```text
my-first-post
```

文件名会成为页面地址：

```text
src/content/blog/my-first-post.md
=> /blog/my-first-post/
```

## 构建检查

修改内容或配置后，可以运行：

```bash
npm run build
```

如果本机 PowerShell 拦截 `npm`，可以使用：

```bash
npm.cmd run build
```
