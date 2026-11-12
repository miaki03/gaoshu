# 高数 A-1 · 期中冲刺与长期学习

面向一个人的高等数学 A-1 教材站。两个用途：**把期中分数捞回来**，以及**把课真正补上**。

- 期中只考第一章、第二章（本校大纲：48% + 45% + 综合 7%，90 分钟）
- 四年真题的共同点：七八个模板就能拿到 80 分
- 所有计算题的答案都用脚本复算过（66 道）

## 站点结构

```
content/00-start/      期中冲刺：考点地图、冲刺计划、公式速查卡、题型手册、四年真题
content/10-limit/      第一章 函数与极限（7 节）
content/20-derivative/ 第二章 导数与微分（8 节）
content/30-future/     期中之后的路线图
content/99-meta/       关于与来源
```

每节 15–25 分钟，固定四件套：**锚点结果 → 机制 → 速查 → 题**。

## 本地构建

需要 Node 18+（开发时用的 v24）。

```bash
npm install
npm run build      # 构建到 dist/
npm run preview    # http://127.0.0.1:4173/
```

校验：

```bash
npm run check      # 结构：front matter / 概念台账 / 题库 / 复用信号
npm run verify     # 复算题库里每一道题的答案（需要 Python 3.8+，只用标准库）
```

## 技术选择

- **静态站，零前端框架。** `scripts/build.mjs` 读 `content/*.md`，用 `marked` 转 HTML，用 `katex` 在**构建时**把公式渲染成 HTML —— 页面不依赖任何 CDN，离线可读。
- **题目答案机器可验。** 每道数值题在 `kb/problems*.json` 里有 `verify` 字段（一段 Python 表达式），`scripts/verify.py` 会重新算一遍并与登记的答案比对。这样正文和答案不可能对不上。
- **概念台账**（`kb/concepts.json`）保证每个概念只有一个首次定义节，防止前后章定义漂移。

## 部署

产物是纯静态的 `dist/`，可以放到任何静态托管。

### Cloudflare Pages

| 配置项 | 值 |
| --- | --- |
| Framework preset | **None**（不要选 Hugo —— 这个仓库不是 Hugo 站点，选 Hugo 会去执行 `hugo` 并失败） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| 环境变量 | 不需要（若设过 `HUGO_VERSION`，删掉） |

### Cloudflare Workers（静态资源）

仓库里的 `wrangler.toml` 已声明 `[assets] directory = "./dist"`。Build command 同样设成 `npm run build`。

### GitHub Pages

`.github/workflows/pages.yml` 已就绪：推送到 `main` 会依次跑「复算题库 → 结构校验 → 构建 → 部署」。在仓库 Settings → Pages 把 Source 切成 **GitHub Actions** 即可。

### 子路径部署

如果部署在子路径（如 `https://user.github.io/gaoshu/`），把 `site.json` 里的 `"base"` 改成 `"/gaoshu"` 再构建——站内链接会自动加前缀。

## 资料

本校原始资料在 `assets/files/`（期中真题四年、答案、考核大纲、教学进度、检测题库），站点里可以下载。

期中范围、卷型、分值都来自《高等数学（A-1）考核大纲》与《教学进度》，不是猜的。

## 声明

个人学习笔记性质的自制资料，不是学校官方材料。以老师课堂讲授与官方大纲为准。
