# AGENTS.md — 在本仓库工作的约定

## 这个仓库是什么

一套面向单人自学的高等数学 A-1 教材站。同时服务两个目标：

1. **期中冲刺**（短期）：本校期中只考第一、二章（大纲写明 48% + 45% + 综合 7%，90 分钟），所以有一层"背多分"内容——考点地图、公式速查卡、题型模板、真题；
2. **长期学习**（贯穿全学期）：按节组织的正文，每节是 15–25 分钟的交付原子。

仓库：`git@github.com:miaki03/gaoshu.git`。线上站尚未绑定域名。

**方法论在 [`PLAYBOOK.md`](PLAYBOOK.md)**（学科无关版）：Part（能力阶层）→ 章（验收单位）→ 节（15–25 分钟交付）。**每节四件套：锚点结果 / 机制 / 速查 / 题。** 这份文件只给 agent 用，不进站点。

## 环境事实（省去重复勘探，2026-11 实测）

| 项 | 事实 |
| --- | --- |
| 宿主 | Windows 11，DSH 沙箱 workspace-write（只有 `E:\gaoshu` 可写） |
| Node | v24.20，可用；`marked` 与 `katex` 已装在本仓库 |
| Python | `C:\Python314\python.exe`（3.14），**只有标准库可用** |
| Hugo | **不可用**：Windows 侧没装，WSL 被沙箱挡住（`Wsl/E_ACCESSDENIED`） |
| 构建 | 自己写的 `scripts/build.mjs`，零前端框架 |
| pip | 装包会失败（pip 的临时目录权限被沙箱拒），**不要试图 pip install**，一律用标准库 |
| 代理 | `HTTPS_PROXY=http://127.0.0.1:7890`（Node 的 `fetch` 要配 `NODE_USE_ENV_PROXY=1`） |
| git push | 22 端口不通，需走 443：`connect.exe -H 127.0.0.1:7890 %h %p`；且在沙箱内 git spawn ssh 会因命名管道被拒（`couldn't create signal pipe`），**push 必须用 danger-full-access 提权一次** |
| 截图 | Edge headless 也被沙箱挡住（mojo 命名管道），**无法截图自检**，只能靠结构与链接校验 |
| 素材格式 | 期中卷的公式是 **MathType OLE + WMF 图片**（不在文本里），文本提取会得到 `【EQ:rIdN】` 占位 |

### 两个必须记住的坑

- **PowerShell 5.1 的 `Set-Content -Encoding utf8` 会写 BOM**，会把 front matter 的 `---` 变成 `\ufeff---`，导致整页不参与构建。改文件用
  `[System.IO.File]::WriteAllText($p, $t, (New-Object System.Text.UTF8Encoding($false)))`。
- **`$home` 是 PowerShell 只读自动变量**，用 `$homePath` 之类。

## 命令

```bash
node scripts/build.mjs      # 构建到 dist/，并校验所有内部链接
node scripts/check.mjs      # 结构校验：front matter / 概念台账 / 题库 / 复用信号
python scripts/verify.py    # 复算题库里每一道题的答案
node scripts/serve.mjs      # 本地预览 http://127.0.0.1:4173/
```

**提交前三个都跑，全绿再提交。**

## 每轮工作协议

1. 读 `content/00-start/02-cram-plan.md` 与 `content/00-start/01-exam-map.md`，确认现在该写哪一块；
2. 只领取**一节**，不顺手改别的；
3. 开写前先确认这节的**锚点结果**能写出来——写不出来说明这节不该存在；
4. 按四件套顺序写：锚点 → 机制 → 速查 → 题；
5. 题目**先入题库**（`kb/problems*.json`），写 `verify` 字段，跑 `python scripts/verify.py` 确认答案对，再写进正文；
6. 若引入新概念，登记到 `kb/concepts.json`（每个概念只能有一个首次定义节），并在该节 front matter 的 `concepts:` 里声明；
7. 跑 `node scripts/check.mjs`，失败修到通过；
8. 一项目一次提交，提交信息用 `feat:` / `fix:` / `docs:` 前缀并写明节号。

## 数学正确性是硬要求

**任何数值答案都必须有 `verify` 字段**，否则 `check.mjs` 会报错。原因：只靠人写答案早晚错一处，而学生没法判断是哪一处错了。

`verify` 是一段 Python 表达式，可用 `scripts/verify.py` 提供的一组工具：

| 工具 | 用途 |
| --- | --- |
| `lim(f, target, side='both'\|'left'\|'right')` | 数值极限（Richardson 外推），`target` 可为数字或 `'inf'` |
| `d1(f, x)` / `d2(f, x)` | 一阶 / 二阶数值导数 |
| `integ(f, a, b)` | 复合 Simpson 数值积分 |
| `solve(f, lo, hi)` | 二分法解 `f(y)=0`，用于隐函数题 |
| `F(1,3)` | 精确分数 |
| `tol` 字段 | 单题容差（默认 `1e-6`），靠数值微分求出的答案要放宽到 `1e-3` |

**振荡型极限**（如 `sin(1/x)`、`x·cos(1/x)`）不能用 `lim`——外推会失效。改用不等式界验证：
`float(max(abs(h*sin(1/h)) for h in [...]) <= ...)`。

## 目录约定

```
content/00-start/     期中冲刺层（考点地图、公式卡、题型手册、真题）
content/10-limit/     第一章 函数与极限（7 节）
content/20-derivative/第二章 导数与微分（8 节）
content/30-future/    期中之后的路线（正文待写）
content/99-meta/      关于页（不参与导航）
kb/problems.json      章节题库
kb/problems-papers.json 真题题库
kb/concepts.json      概念台账（每个概念唯一首次定义节）
specs/                各章的节表（不进站点）
assets/               CSS / JS / 下载用的原始资料
scripts/              build.mjs / check.mjs / verify.py / serve.mjs
site.json             站点配置：Part 与章的定义、考试日期
dist/                 构建产物（.gitignore）
.tmp/                 临时脚本与素材提取（.gitignore）
```

## 写作约定

- **保姆级、原理优先、禁用比喻。** 不假设读者会去搜索，每个术语首次出现时当场定义。
- 五种内容块（正文里用 `:::kind` 写）：
  `:::problem`（题目卡片，必须带 `id`）、`:::ans`（折叠答案）、`:::trap`（易错）、`:::key`（重点）、`:::conv`（约定）、`:::practice`（实践）。
- 标题层级：正文用 `##`，子标题用 `###`；不要用 `#`（页面标题由 front matter 生成）。
- 题目编号：章节题 `1.5-02`（第 1 章第 5 节第 2 题）；真题 `2025-S3`（2025 年解答题 3）。
- front matter 字段：`title / slug / part / chapter / order / type / minutes / stars / summary / exam / concepts`。
  `type` 取 `section`（默认，进导航）、`home`（首页）、`page`（独立页，如 about）。

## 禁区

- **不改 `site.json` 里的 Part / 章 id**（会打断所有链接）；加内容只在已有 chapter 下加节。
- **不把第一章、第二章的内容提前挪到冲刺层**：冲刺层是模板与真题，学习层是推导，两层职责不同。
- **不在期中范围内写第三章之后的正文**：那属于"期末续学"，只维护路线图。
- **不引入前端框架**：当前是零框架静态站，加 Vue/React 会让构建链变复杂且没必要。
- **不提交 `dist/`、`node_modules/`、`.tmp/`**。
- 不转载其他学校的题目；本校真题可以用，但要保留原件下载链接。

## 已知局限（不要假装解决）

1. 真题只完整转录了 2025–2026 一份；其余三年给逐题考点清单 + 原卷下载（原卷公式是嵌入对象，手工转录有出错风险）。
2. 数值复算对振荡型极限不适用，这类题用界验证，强度弱于解析证明。
3. 难度标注"易 / 中 / 难"是主观判断，参考大纲的难度系数分布，不是官方标注。
4. 站点没有服务端，进度与错题本只存在浏览器 `localStorage`。

## 素材提取工具（在 `.tmp/`，不提交）

如果将来要转录其它年份的真题公式：

```bash
python .tmp/eqdump.py <docx路径>       # 抽出每个 rId 对应的公式图片 + index.json
# 再用 .tmp/montage.ps1 拼成网格图（6 列 × 30 个/张），直接看图转录
```

`.tmp/extract.py` 抽 docx 文本（带 `【EQ:rIdN】` 占位），`.tmp/doc97.py` 抽 Word 97 `.doc`（自写 OLE + 分片表解析器）。
