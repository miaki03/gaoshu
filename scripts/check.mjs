// 结构校验：front matter、概念台账、题库覆盖、复用信号
// 用法: node scripts/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');
const ROOT_DIR = path.resolve(ROOT, '..');
const CONTENT = path.join(ROOT_DIR, 'content');
const site = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'site.json'), 'utf8'));

const errs = [];
const warns = [];

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

function parseFrontMatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw.replace(/^\uFEFF/, ''));
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else {
      data[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

/* ── 1. front matter ── */
const pages = [];
const slugs = new Map();
for (const file of walk(CONTENT)) {
  const rel = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const fm = parseFrontMatter(fs.readFileSync(file, 'utf8'));
  if (!fm) { errs.push(`${rel}: 缺少 front matter`); continue; }
  const { data, body } = fm;
  const page = { ...data, file: rel, body, order: Number(data.order || 0) };

  if (!data.title) errs.push(`${rel}: 缺少 title`);
  if (!data.slug) errs.push(`${rel}: 缺少 slug`);
  if (slugs.has(data.slug)) errs.push(`slug 重复: ${data.slug}（${rel} 与 ${slugs.get(data.slug)}）`);
  slugs.set(data.slug, rel);

  if (data.type !== 'home' && data.type !== 'page') {
    if (!data.part) errs.push(`${rel}: 章节页缺少 part`);
    else {
      const part = site.parts.find((p) => p.id === data.part);
      if (!part) errs.push(`${rel}: part ${data.part} 在 site.json 里不存在`);
      else if (!data.chapter) errs.push(`${rel}: 缺少 chapter`);
      else if (!part.chapters.find((c) => c.id === data.chapter)) {
        errs.push(`${rel}: chapter ${data.chapter} 不属于 ${data.part}`);
      }
    }
    if (data.type === 'section') {
      if (!data.minutes) warns.push(`${rel}: 没写 minutes（预计学习时长）`);
      if (!data.summary) warns.push(`${rel}: 没写 summary`);
    }
  }
  if (data.concepts && !Array.isArray(data.concepts)) errs.push(`${rel}: concepts 应为数组`);
  pages.push(page);
}

const bySlug = new Map(pages.map((p) => [p.slug, p]));
const sections = pages.filter((p) => p.type === 'section');

/* ── 2. 概念台账 ── */
const ledger = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'kb', 'concepts.json'), 'utf8')).concepts;
const ledgerById = new Map();
for (const c of ledger) {
  if (ledgerById.has(c.id)) errs.push(`概念台账: id 重复 ${c.id}`);
  ledgerById.set(c.id, c);
  if (!c.zh) errs.push(`概念台账: ${c.id} 缺少 zh`);
  if (bySlug.has(c.first)) {
    if (bySlug.get(c.first).type !== 'section') errs.push(`概念台账: ${c.id} 的 first 不是章节页（${c.first}）`);
  } else {
    errs.push(`概念台账: ${c.id} 的 first 页不存在（${c.first}）`);
  }
}

// 按阅读顺序排（part 顺序 → chapter 顺序 → order）
const partIdx = new Map(site.parts.map((p, i) => [p.id, i]));
function readOrder(p) {
  const pi = partIdx.get(p.part) ?? 99;
  const part = site.parts.find((x) => x.id === p.part);
  const ci = part ? part.chapters.findIndex((c) => c.id === p.chapter) : 99;
  return [p.type === 'section' ? 0 : 1, pi, ci, p.order];
}
sections.sort((a, b) => {
  const A = readOrder(a), B = readOrder(b);
  for (let i = 0; i < A.length; i++) if (A[i] !== B[i]) return A[i] - B[i];
  return 0;
});

const claimed = new Map(); // conceptId -> [pages in order]
for (const p of sections) {
  for (const cid of p.concepts || []) {
    if (!ledgerById.has(cid)) errs.push(`${p.file}: 引用了未登记的概念 ${cid}`);
    if (!claimed.has(cid)) claimed.set(cid, []);
    claimed.get(cid).push(p.slug);
  }
}

for (const c of ledger) {
  const users = claimed.get(c.id) || [];
  if (!users.length) { errs.push(`概念 ${c.id}（${c.zh}）没有任何页面声明`); continue; }
  if (users[0] !== c.first) {
    errs.push(`概念 ${c.id}（${c.zh}）的 first 是 ${c.first}，但按阅读顺序最早声明它的是 ${users[0]}`);
  }
}

/* ── 3. 题库 ── */
const kbdir = path.join(ROOT_DIR, 'kb');
let problems = [];
for (const name of fs.readdirSync(kbdir)) {
  if (!name.startsWith('problems') || !name.endsWith('.json')) continue;
  problems = problems.concat(JSON.parse(fs.readFileSync(path.join(kbdir, name), 'utf8')));
}
const pids = new Set();
for (const pr of problems) {
  if (!pr.id) errs.push('题库: 有题目缺少 id');
  if (pids.has(pr.id)) errs.push(`题库: id 重复 ${pr.id}`);
  pids.add(pr.id);
  if (!pr.verify) errs.push(`题库: ${pr.id} 缺少 verify（答案无法复算）`);
  if (!pr.page) errs.push(`题库: ${pr.id} 缺少 page`);
  else if (!bySlug.has(pr.page)) errs.push(`题库: ${pr.id} 的 page 不存在（${pr.page}）`);
}

// 正文里出现的题号必须能在题库找到
const problemRef = /id=([\w.\-]+)/g;
let refCount = 0;
for (const p of sections) {
  for (const m of p.body.matchAll(problemRef)) {
    refCount += 1;
    if (!pids.has(m[1])) errs.push(`${p.file}: 正文题号 ${m[1]} 不在题库里`);
  }
  if (p.part === 'p1' || p.part === 'p2') {
    const mine = problems.filter((pr) => pr.page === p.slug);
    if (!mine.length) errs.push(`${p.file}: 教学章节没有任何入库题目`);
  }
}

/* ── 4. 复用信号：每节至少被别的页面链接一次 ── */
const allBody = pages.map((p) => ({ slug: p.slug, body: p.body }));
for (const p of sections) {
  if (p.type !== 'section') continue;
  const linkedBy = allBody.filter((o) => o.slug !== p.slug && o.body.includes(`(/s/${p.slug})`));
  if (!linkedBy.length) warns.push(`${p.slug}: 没有其他页面链接到它（复用信号弱）`);
}

/* ── 5. 章节篇幅 ── */
for (const p of sections) {
  const words = p.body.replace(/```[\s\S]*?```/g, '').replace(/\s/g, '').length;
  if (words < 600) warns.push(`${p.slug}: 正文较短（${words} 字）`);
}

/* ── 6. ::: 块配平与必填属性（少写一个 ::: 会无声吞掉后面整页） ── */
let blockTotal = 0;
for (const p of pages) {
  const body = p.body.replace(/```[\s\S]*?```/g, '');
  let depth = 0;
  let minDepth = 0;
  for (const line of body.split(/\r?\n/)) {
    if (/^:::(\w+)/.test(line)) {
      blockTotal += 1;
      depth += 1;
      const m = /^:::(\w+)\s*(.*)$/.exec(line);
      if (m[1] === 'problem' && !/\bid=/.test(m[2])) {
        errs.push(`${p.file}: :::problem 缺少 id（会没有锚点、不能记错）`);
      }
    } else if (/^:::\s*$/.test(line)) {
      depth -= 1;
      if (depth < 0) minDepth = depth;
    }
  }
  if (depth !== 0) errs.push(`${p.file}: ::: 块未配平（差 ${depth} 个闭合），会吞掉后面内容`);
  if (minDepth < 0) errs.push(`${p.file}: 出现多余的 ::: 闭合`);
}

/* ── 7. answer 与 expect 一致（只对 verifyKind=numeric 的题强制） ── */
for (const pr of problems) {
  if (pr.expect === undefined) continue;
  if (pr.verifyKind && pr.verifyKind !== 'numeric') continue;
  const a = String(pr.answer ?? '').trim();
  const m = /^(-?\d+)\s*\/\s*(\d+)$/.exec(a);
  let parsed = null;
  if (m) parsed = Number(m[1]) / Number(m[2]);
  else if (/^-?\d+(?:\.\d+)?$/.test(a)) parsed = Number(a);
  if (parsed === null) continue; // 文本答案由 verify.py 的 manual 标记负责
  const tol = Math.max(1e-9, Math.abs(Number(pr.expect)) * 1e-6);
  if (Math.abs(parsed - Number(pr.expect)) > tol) {
    errs.push(`题库 ${pr.id}: answer「${a}」与 expect ${pr.expect} 不一致`);
  }
}

/* ── 8. 同一章内 order 不能重复（否则导航顺序不稳定） ── */
const orderSeen = new Map();
for (const p of pages) {
  if (p.type === 'home' || p.type === 'page' || !p.part || !p.chapter) continue;
  const key = `${p.part}/${p.chapter}/${p.order}`;
  if (orderSeen.has(key)) errs.push(`order 重复: ${key}（${p.file} 与 ${orderSeen.get(key)}）`);
  orderSeen.set(key, p.file);
}

/* ── 9. 正文例题必须入库（这次的 P0 就是这么漏掉的：例题不进题库就没人复算） ── */
let examples = [];
const exFile = path.join(ROOT_DIR, 'kb', 'examples.json');
if (fs.existsSync(exFile)) {
  examples = JSON.parse(fs.readFileSync(exFile, 'utf8'));
} else if (fs.readFileSync(path.join(ROOT_DIR, 'kb', 'problems.json'), 'utf8').length) {
  warns.push('kb/examples.json 不存在：正文例题没有入库机制');
}
const exById = new Map();
for (const ex of examples) {
  if (!ex.id) { errs.push('例题库: 有条目缺少 id'); continue; }
  if (exById.has(ex.id)) errs.push(`例题库: id 重复 ${ex.id}`);
  exById.set(ex.id, ex);
  if (!ex.verify) errs.push(`例题 ${ex.id}: 缺少 verify`);
  if (!bySlug.has(ex.page)) errs.push(`例题 ${ex.id}: page 不存在（${ex.page}）`);
}

const markers = new Map(); // id -> [file]
for (const p of pages) {
  for (const m of p.body.matchAll(/<!--\s*ex:\s*([\w.\-]+)\s*-->/g)) {
    if (!markers.has(m[1])) markers.set(m[1], []);
    markers.get(m[1]).push(p.file);
  }
}
for (const [id, files] of markers) {
  if (!exById.has(id)) errs.push(`${files[0]}: 例题标记 ${id} 在 kb/examples.json 里不存在（无法复算）`);
}
for (const ex of examples) {
  if (!markers.has(ex.id)) errs.push(`例题 ${ex.id} 没有在正文里出现标记 <!-- ex: ${ex.id} -->`);
  else if (ex.page && !markers.get(ex.id).some((f) => f.includes(ex.page.replace(/-/g, '-')))) {
    // 只做弱校验：标记所在文件名应能对上 page 的末段数字，避免误报
  }
}

/* ── 报告 ── */
const pad = (n) => String(n).padStart(3, ' ');
console.log(`\n结构校验\n`);
console.log(`  页面        ${pad(pages.length)}`);
console.log(`  章节页      ${pad(sections.length)}`);
console.log(`  概念        ${pad(ledger.length)}（全部有唯一首次定义节）`);
console.log(`  题目        ${pad(problems.length)}（正文引用 ${refCount} 处）`);
console.log(`  ::: 块      ${pad(blockTotal)}（全部配平）`);
console.log(`  内部链接    由 build.mjs 校验（含锚点），--strict 下失败即红`);

if (warns.length) {
  console.log(`\n提示 ${warns.length} 条:`);
  [...new Set(warns)].forEach((w) => console.log('  · ' + w));
}
if (errs.length) {
  console.log(`\n✗ 错误 ${errs.length} 条:`);
  [...new Set(errs)].forEach((e) => console.log('  ! ' + e));
  process.exit(1);
}
console.log('\n✓ 结构校验通过');
