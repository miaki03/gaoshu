// Build the site: content/*.md -> dist/
// Zero runtime framework. Markdown via marked, math via KaTeX (rendered at build time).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import katex from 'katex';

const ROOT = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');
const ROOT_DIR = path.resolve(ROOT, '..');
// 允许用环境变量覆盖，供子路径回归测试使用（scripts/check-base.mjs）
const OUT = process.env.GS_OUT ? path.resolve(ROOT_DIR, process.env.GS_OUT) : path.join(ROOT_DIR, 'dist');
const CONTENT = path.join(ROOT_DIR, 'content');
const site = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'site.json'), 'utf8'));
const BASE = ((process.env.GS_BASE ?? site.base) || '').replace(/\/$/, '');

const warn = [];
const warnOnce = (m) => { if (!warn.includes(m)) warn.push(m); };

/* ---------------- front matter ---------------- */
function parseFrontMatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const i = line.indexOf(':');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    } else if (/^".*"$/.test(val) || /^'.*'$/.test(val)) {
      data[key] = val.slice(1, -1);
    } else {
      data[key] = val;
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

/* ---------------- math ---------------- */
function renderMath(tex, display) {
  try {
    return katex.renderToString(tex, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      trust: false,
      output: 'html',
    });
  } catch (e) {
    warnOnce('KaTeX 渲染失败: ' + tex.slice(0, 60));
    return `<code class="math-error">${escapeHtml(tex)}</code>`;
  }
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function protectMath(src) {
  const store = [];
  let text = src;
  // escaped dollar
  text = text.replace(/\\\$/g, '\u0001ESC_DOLLAR\u0001');
  // code fences & inline code must not be touched
  const blocks = [];
  text = text.replace(/```[\s\S]*?```/g, (m) => {
    blocks.push(m);
    return `\u0001CODEBLOCK${blocks.length - 1}\u0001`;
  });
  const inline = [];
  text = text.replace(/`[^`\n]+`/g, (m) => {
    inline.push(m);
    return `\u0001INLINECODE${inline.length - 1}\u0001`;
  });

  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (m, tex) => {
    store.push({ tex, display: true });
    return `\n\nMATHBLOCK${store.length - 1}END\n\n`;
  });
  text = text.replace(/\\\[([\s\S]+?)\\\]/g, (m, tex) => {
    store.push({ tex, display: true });
    return `\n\nMATHBLOCK${store.length - 1}END\n\n`;
  });
  text = text.replace(/(^|[^\\$])\$([^$\n]+?)\$/g, (m, pre, tex) => {
    store.push({ tex, display: false });
    return `${pre}MATHINLINE${store.length - 1}END`;
  });
  text = text.replace(/\\\(([\s\S]+?)\\\)/g, (m, tex) => {
    store.push({ tex, display: false });
    return `MATHINLINE${store.length - 1}END`;
  });

  inline.forEach((m, i) => { text = text.replace(`\u0001INLINECODE${i}\u0001`, m); });
  blocks.forEach((m, i) => { text = text.replace(`\u0001CODEBLOCK${i}\u0001`, m); });
  text = text.replace(/\u0001ESC_DOLLAR\u0001/g, '\\$');
  return { text, store };
}

function restoreMath(html, store) {
  html = html.replace(/<p>MATHBLOCK(\d+)END<\/p>/g, (m, i) => {
    const s = store[+i];
    return `<div class="math-display">${renderMath(s.tex, true)}</div>`;
  });
  html = html.replace(/MATHBLOCK(\d+)END/g, (m, i) => {
    const s = store[+i];
    return `<div class="math-display">${renderMath(s.tex, true)}</div>`;
  });
  html = html.replace(/MATHINLINE(\d+)END/g, (m, i) => {
    const s = store[+i];
    return `<span class="math-inline">${renderMath(s.tex, false)}</span>`;
  });
  return html;
}

/* ---------------- ::: blocks ---------------- */
const BLOCK_KIND = {
  problem: { cls: 'problem', label: '练' },
  ans: { cls: 'answer', label: '答' },
  trap: { cls: 'callout trap', label: '易错' },
  conv: { cls: 'callout conv', label: '约定' },
  practice: { cls: 'callout practice', label: '实践' },
  exam: { cls: 'callout exam', label: '真题' },
  key: { cls: 'callout key', label: '重点' },
  why: { cls: 'callout why', label: '为什么' },
};

function expandBlocks(src) {
  const out = [];
  const stack = [];
  for (const line of src.split(/\r?\n/)) {
    const open = /^:::(\w+)\s*(.*)$/.exec(line);
    if (open && open[1] !== '') {
      const kind = open[1];
      const cfg = BLOCK_KIND[kind];
      if (!cfg) { out.push(line); continue; }
      const attrs = {};
      for (const m of open[2].matchAll(/([\w-]+)=("([^"]*)"|'([^']*)'|(\S+))/g)) {
        attrs[m[1]] = m[3] ?? m[4] ?? m[5] ?? '';
      }
      const label = attrs.title || cfg.label;
      let extra = '';
      if (kind === 'problem') {
        const bits = [];
        if (attrs.id) bits.push(`<span class="p-id">${escapeHtml(attrs.id)}</span>`);
        if (attrs.level) bits.push(`<span class="p-level">${escapeHtml(attrs.level)}</span>`);
        if (attrs.source) bits.push(`<span class="p-src">${escapeHtml(attrs.source)}</span>`);
        extra = bits.join('');
      }
      if (kind === 'ans') {
        out.push(`<details class="g-block ans"><summary class="g-head"><span class="g-label">${escapeHtml(label)}</span><span class="g-hint">点开</span></summary>`);
        out.push('');
        out.push('<div class="g-body">');
        stack.push('</div></details>');
      } else {
        const anchor = kind === 'problem' && attrs.id ? ` id="p-${escapeHtml(attrs.id)}"` : '';
        out.push(`<div class="g-block ${cfg.cls}"${anchor}><div class="g-head"><span class="g-label">${escapeHtml(label)}</span>${extra}</div>`);
        out.push('');
        out.push('<div class="g-body">');
        stack.push('</div></div>');
      }
      out.push('');
      continue;
    }
    if (/^:::\s*$/.test(line)) {
      if (stack.length) { out.push(''); out.push(stack.pop()); out.push(''); continue; }
      out.push(line);
      continue;
    }
    out.push(line);
  }
  while (stack.length) { out.push(''); out.push(stack.pop()); }
  return out.join('\n');
}

/* ---------------- markdown ---------------- */
function inlineMd(text) {
  if (!text) return '';
  const { text: protectedText, store } = protectMath(String(text));
  const html = marked.parseInline(protectedText, { gfm: true, breaks: false, mangle: false });
  return restoreMath(html, store);
}

function slugifyHeading(text, i) {
  const t = text.replace(/<[^>]+>/g, '').trim();
  const ascii = t.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '');
  return ascii ? `h-${ascii.slice(0, 40)}-${i}` : `h-${i}`;
}

function plainMath(tex) {
  const s = String(tex)
    .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, '($1)/($2)')
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, '√($1)')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}\\^_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return s || '式';
}

function mdToHtml(body) {
  const { text, store } = protectMath(body);
  const expanded = expandBlocks(text);
  let html = marked.parse(expanded, { gfm: true, breaks: true, mangle: false, headerIds: false });

  // 标题：先还原数学再取 id 与目录文本，但正文里保留占位符交给后一步渲染成 KaTeX
  const toc = [];
  let i = 0;
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
    i += 1;
    const plain = inner
      .replace(/MATHINLINE(\d+)END/g, (mm, k) => plainMath(store[+k].tex))
      .replace(/MATHBLOCK\d+END/g, '')
      .replace(/<[^>]+>/g, '');
    const id = slugifyHeading(plain, i);
    toc.push({ level: +lvl, id, text: plain.trim() });
    return `<h${lvl} id="${id}">${inner}<a class="anchor" href="#${id}" aria-hidden="true">#</a></h${lvl}>`;
  });
  html = restoreMath(html, store);
  // 再兜底一次：标题里可能残留占位符（已在上面替换，这里只处理极端情况）
  html = html.replace(/MATHINLINE(\d+)END/g, (m, k) => {
    const s = store[+k];
    return s ? `<span class="math-inline">${renderMath(s.tex, false)}</span>` : '';
  });
  // wrap tables
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { html, toc };
}

/* ---------------- content loading ---------------- */
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const pages = [];
for (const file of walk(CONTENT)) {
  const raw = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
  const { data, body } = parseFrontMatter(raw);
  const slug = data.slug || path.basename(file, '.md');
  pages.push({ ...data, slug, file: path.relative(ROOT_DIR, file).replace(/\\/g, '/'), body, order: Number(data.order || 0) });
}

// validate
const seen = new Map();
for (const p of pages) {
  if (seen.has(p.slug)) warn.push(`slug 重复: ${p.slug} (${p.file} 与 ${seen.get(p.slug)})`);
  seen.set(p.slug, p.file);
  if (p.part && !site.parts.find((x) => x.id === p.part)) warn.push(`${p.file}: part ${p.part} 未在 site.json 定义`);
  if (p.chapter && p.part) {
    const part = site.parts.find((x) => x.id === p.part);
    if (part && !part.chapters.find((c) => c.id === p.chapter)) warn.push(`${p.file}: chapter ${p.chapter} 未在 ${p.part} 定义`);
  }
}

const home = pages.find((p) => p.type === 'home') || { body: '', title: '首页' };
const sections = pages.filter((p) => p.type !== 'home' && p.part);

// build nav tree
const nav = site.parts.map((part) => {
  const chapters = part.chapters.map((ch) => {
    const items = sections
      .filter((p) => p.part === part.id && p.chapter === ch.id)
      .sort((a, b) => a.order - b.order);
    return { ...ch, items };
  });
  return { ...part, chapters, count: chapters.reduce((n, c) => n + c.items.length, 0) };
});

/* ---------------- layout ---------------- */
const url = (p) => `${BASE}/${p}/`;

function sidebar(activeSlug) {
  return nav
    .filter((part) => part.count > 0)
    .map((part) => {
      const chs = part.chapters.filter((c) => c.items.length > 0).map((ch) => {
        const items = ch.items.map((it) => {
          const badge = it.stars ? `<span class="stars s${it.stars}" title="考点重要度 ${it.stars}/3">${'●'.repeat(+it.stars)}</span>` : '';
          return `<li><a class="nav-item${it.slug === activeSlug ? ' active' : ''}" href="${url('s/' + it.slug)}" data-slug="${it.slug}">
            <span class="tick" aria-hidden="true"></span><span class="nav-title">${escapeHtml(it.title)}</span>${badge}</a></li>`;
        }).join('');
        return `<div class="nav-chapter"><div class="nav-chapter-title">${escapeHtml(ch.title)}</div><ul class="nav-list">${items}</ul></div>`;
      }).join('');
      return `<div class="nav-part"><div class="nav-part-title">${escapeHtml(part.title)}</div>${chs}</div>`;
    }).join('');
}

function shell({ title, body, activeSlug = '', toc = [], className = '', desc = '' }) {
  const tocHtml = toc.length
    ? `<nav class="toc" aria-label="本页目录"><div class="toc-title">本页</div><ul>${toc
        .map((t) => `<li class="lvl${t.level}"><a href="#${t.id}">${escapeHtml(t.text)}</a></li>`)
        .join('')}</ul></nav>`
    : '';
  const docTitle = title && title !== site.title ? `${title} · ${site.title}` : site.title;
  return `<!doctype html>
<html lang="zh-CN" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(docTitle)}</title>
<meta name="description" content="${escapeHtml(desc || site.subtitle)}">
<link rel="stylesheet" href="${BASE}/assets/katex/katex.min.css">
<link rel="stylesheet" href="${BASE}/assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>∫</text></svg>">
<script>try{var t=localStorage.getItem('gs.theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body data-exam="${escapeHtml(site.examDate || '')}" data-base="${BASE}">
<a class="skip" href="#main">跳到正文</a>
<header class="topbar">
  <button class="icon-btn only-mobile" id="menuBtn" aria-label="菜单">☰</button>
  <a class="brand" href="${BASE}/">
    <span class="brand-mark">∫</span>
    <span class="brand-text"><strong>${escapeHtml(site.title)}</strong><em>${escapeHtml(site.subtitle)}</em></span>
  </a>
  <div class="topbar-actions">
    <button class="icon-btn" id="searchBtn" aria-label="搜索"><span aria-hidden="true">🔍</span><kbd>Ctrl K</kbd></button>
    <a class="icon-btn" href="${url('progress')}" aria-label="进度">📊</a>
    <button class="icon-btn" id="themeBtn" aria-label="切换主题">◐</button>
  </div>
</header>
<div class="layout">
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-inner">
      <div class="cram-box" id="countdown"></div>
      ${sidebar(activeSlug)}
      <div class="nav-foot">
        <a href="${url('progress')}">我的进度</a>
        <a href="${url('errors')}">错题本</a>
        <a href="${url('about')}">关于与来源</a>
      </div>
    </div>
  </aside>
  <main class="main" id="main">
    <article class="article ${className}">
      ${body}
    </article>
    ${tocHtml}
  </main>
</div>
<div class="search-modal" id="searchModal" hidden>
  <div class="search-box">
    <input id="searchInput" type="search" placeholder="搜索考点、公式、题型…（例如：间断点、等价无穷小、隐函数）" autocomplete="off">
    <div class="search-results" id="searchResults"></div>
  </div>
</div>
<script src="${BASE}/assets/app.js"></script>
</body>
</html>`;
}

/* ---------------- section page ---------------- */
const ordered = sections.filter((p) => p.type === 'section').sort((a, b) => {
  const pa = site.parts.findIndex((x) => x.id === a.part);
  const pb = site.parts.findIndex((x) => x.id === b.part);
  if (pa !== pb) return pa - pb;
  const ca = nav[pa].chapters.findIndex((c) => c.id === a.chapter);
  const cb = nav[pb].chapters.findIndex((c) => c.id === b.chapter);
  if (ca !== cb) return ca - cb;
  return a.order - b.order;
});

function starRow(p) {
  const bits = [];
  if (p.stars) bits.push(`<span class="meta-item"><span class="stars s${p.stars}">${'★'.repeat(+p.stars)}${'☆'.repeat(3 - +p.stars)}</span> 考点重要度</span>`);
  if (p.minutes) bits.push(`<span class="meta-item">⏱ ${p.minutes} 分钟</span>`);
  if (p.exam && p.exam.length) bits.push(`<span class="meta-item">📅 真题出现：${p.exam.join('、')}</span>`);
  return bits.length ? `<div class="page-meta">${bits.join('')}</div>` : '';
}

const written = [];
for (const p of sections) {
  const { html, toc } = mdToHtml(p.body);
  const idx = ordered.indexOf(p);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;
  const isSection = p.type === 'section';
  const body = `
  <header class="page-head">
    <div class="crumbs">${crumbsFor(p)}</div>
    <h1>${escapeHtml(p.title)}</h1>
    ${p.summary ? `<p class="lede">${inlineMd(p.summary)}</p>` : ''}
    ${starRow(p)}
  </header>
  <div class="page-body">${html}</div>
  ${isSection ? `<div class="complete-bar" data-slug="${p.slug}">
    <span class="cb-label">这节掌握到什么程度？</span>
    <div class="cb-btns">
      <button data-level="0">未看</button>
      <button data-level="1">看过</button>
      <button data-level="2">会做</button>
      <button data-level="3">熟练</button>
    </div>
    <span class="cb-state"></span>
  </div>` : ''}
  <nav class="pager">
    ${prev ? `<a class="prev" href="${url('s/' + prev.slug)}"><span>← 上一节</span><strong>${escapeHtml(prev.title)}</strong></a>` : '<span></span>'}
    ${next ? `<a class="next" href="${url('s/' + next.slug)}"><span>下一节 →</span><strong>${escapeHtml(next.title)}</strong></a>` : '<span></span>'}
  </nav>`;
  written.push({ p, html: shell({ title: p.title, body, activeSlug: p.slug, toc, desc: p.summary || p.title }) });
}

function crumbsFor(p) {
  const part = site.parts.find((x) => x.id === p.part);
  const ch = part && part.chapters.find((c) => c.id === p.chapter);
  const bits = [];
  if (part) bits.push(`<a href="${url('p/' + part.id)}">${escapeHtml(part.title)}</a>`);
  if (ch) bits.push(`<a href="${url('c/' + ch.id)}">${escapeHtml(ch.title)}</a>`);
  return bits.join('<span>/</span>');
}

/* ---------------- write pages ---------------- */
// 正文里手写的站内链接是 /s/xxx 这种根绝对路径；部署到子路径时统一补 BASE 前缀。
// 只处理单个 "/" 开头（排除 //外域、已带 BASE 的、纯锚点）。
function prefixLinks(html) {
  if (!BASE) return html;
  const rest = BASE.slice(1).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp('((?:href|src)=")/(?!\\/|' + rest + '(?:/|"|#|\\?))', 'g');
  return html.replace(re, `$1${BASE}/`);
}

function rmrf(dir) { if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true }); }
rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
const write = (rel, html) => {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, prefixLinks(html));
};

for (const { p, html } of written) write(path.join('s', p.slug, 'index.html'), html);

/* home */
const { html: homeHtml, toc: homeToc } = mdToHtml(home.body);
const firstTask = ordered[0];
write('index.html', shell({
  title: site.title,
  body: homeHtml,
  activeSlug: '',
  className: 'home',
  desc: site.subtitle,
}));

/* part pages */
for (const part of nav) {
  if (!part.count) continue;
  const chs = part.chapters.filter((c) => c.items.length).map((ch) => `
    <section class="ch-card">
      <h3><a href="${url('c/' + ch.id)}">${escapeHtml(ch.title)}</a></h3>
      <p>${escapeHtml(ch.desc || '')}</p>
      <ul>${ch.items.map((it) => `<li><a href="${url('s/' + it.slug)}">${escapeHtml(it.title)}</a>${it.summary ? `<span class="muted">${inlineMd(it.summary)}</span>` : ''}</li>`).join('')}</ul>
    </section>`).join('');
  write(path.join('p', part.id, 'index.html'), shell({
    title: part.title,
    activeSlug: '',
    body: `<header class="page-head"><div class="crumbs"><a href="${BASE}/">主页</a></div><h1>${escapeHtml(part.title)}</h1><p class="lede">${escapeHtml(part.lead || '')}</p></header><div class="page-body">${chs}</div>`,
  }));
}

/* chapter pages */
const kbProblems = (() => {
  const dir = path.join(ROOT_DIR, 'kb');
  const out = [];
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('problems') && name.endsWith('.json')) {
        try { out.push(...JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'))); } catch { /* 忽略坏文件，check.mjs 会报 */ }
      }
    }
  }
  return out;
})();
const problemById = new Map(kbProblems.filter((p) => p && p.id).map((p) => [p.id, p]));
const pageTitleBySlug = new Map(pages.map((p) => [p.slug, p.title]));
const bySlugTitle = (slug) => pageTitleBySlug.get(slug) || slug;

for (const part of nav) {
  for (const ch of part.chapters) {
    if (!ch.items.length) continue;
    const list = ch.items.map((it, i) => `
      <li class="sec-row">
        <span class="sec-idx">${i + 1}</span>
        <div><a href="${url('s/' + it.slug)}">${escapeHtml(it.title)}</a>
        ${it.summary ? `<p class="muted">${inlineMd(it.summary)}</p>` : ''}</div>
        ${it.minutes ? `<span class="sec-min">${it.minutes}′</span>` : ''}
      </li>`).join('');

    const goals = (ch.goals || []).length
      ? `<section class="ch-block"><h2>读完能做什么</h2><ol class="goal-list">${ch.goals
          .map((g) => `<li>${escapeHtml(g)}</li>`).join('')}</ol></section>`
      : '';

    const glossary = (ch.glossary || []).length
      ? `<section class="ch-block"><h2>本章术语表</h2><div class="table-wrap"><table><tbody>${ch.glossary
          .map((g) => `<tr><th style="width:8rem">${escapeHtml(g.t)}</th><td>${escapeHtml(g.d)}</td></tr>`).join('')}</tbody></table></div></section>`
      : '';

    const selfCheck = (ch.selfCheck || []).length
      ? `<section class="ch-block"><h2>自检 3 题</h2><p class="muted">做完这三题再往下走。点题号直接跳到题目。</p><ol class="goal-list">${ch.selfCheck
          .map((pid) => {
            const pr = problemById.get(pid);
            const target = pr && pr.page ? `${url('s/' + pr.page)}#p-${encodeURIComponent(pid)}` : null;
            return target
              ? `<li><a href="${target}">${escapeHtml(pid)}</a> <span class="muted">→ ${escapeHtml(bySlugTitle(pr.page))}</span></li>`
              : `<li class="muted">${escapeHtml(pid)}</li>`;
          })
          .join('')}</ol></section>`
      : '';

    const handsOn = ch.handsOn
      ? `<section class="ch-block"><h2>动手</h2><p>${escapeHtml(ch.handsOn)}</p></section>`
      : '';

    write(path.join('c', ch.id, 'index.html'), shell({
      title: ch.title,
      activeSlug: '',
      body: `<header class="page-head"><div class="crumbs"><a href="${BASE}/">主页</a><span>/</span><a href="${url('p/' + part.id)}">${escapeHtml(part.title)}</a></div><h1>${escapeHtml(ch.title)}</h1><p class="lede">${escapeHtml(ch.desc || '')}</p></header>${goals}<section class="ch-block"><h2>${ch.items.length} 节</h2><ol class="sec-list">${list}</ol></section>${glossary}${selfCheck}${handsOn}`,
    }));
  }
}

/* progress + errors (client rendered) */
write('progress/index.html', shell({
  title: '我的进度',
  activeSlug: '',
  body: `<header class="page-head"><h1>我的进度</h1><p class="lede">数据只存在这台设备的浏览器里，不会上传。换设备请用「导出」。</p></header>
  <div class="page-body">
    <div class="progress-toolbar">
      <button class="btn" id="exportBtn">导出进度</button>
      <button class="btn" id="importBtn">导入进度</button>
      <button class="btn ghost" id="resetBtn">清空</button>
      <input type="file" id="importFile" accept="application/json" hidden>
    </div>
    <noscript><p class="callout-note">这个页面靠浏览器脚本读取本机进度。你的浏览器关闭了 JavaScript，所以这里没有内容——但正文和题目答案不受影响，照常可以读。</p></noscript>
    <div id="progressTable"></div>
  </div>`,
}));

write('errors/index.html', shell({
  title: '错题本',
  activeSlug: '',
  body: `<header class="page-head"><h1>错题本</h1><p class="lede">在题目卡片上点「记错」就会收进这里。考前只看这个。</p></header>
  <div class="page-body"><noscript><p class="callout-note">错题本存在本机浏览器里，需要 JavaScript。关闭脚本时这里为空，但原题不受影响。</p></noscript><div id="errorList"></div></div>`,
}));

/* about */
const aboutPage = pages.find((p) => p.slug === 'about');
if (aboutPage) {
  const { html, toc } = mdToHtml(aboutPage.body);
  write('about/index.html', shell({ title: aboutPage.title, body: `<header class="page-head"><h1>${escapeHtml(aboutPage.title)}</h1></header><div class="page-body">${html}</div>`, toc }));
}

/* search index + manifest */
const index = ordered.concat(sections.filter((p) => p.type !== 'section' && p.type !== 'home')).map((p) => {
  const text = p.body
    .replace(/:::.*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`|\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1200);
  return { t: p.title, u: url('s/' + p.slug), d: p.summary || '', b: text, p: p.part };
});
write('search.json', JSON.stringify(index));
write('manifest.json', JSON.stringify(ordered.map((p) => {
  const part = site.parts.find((x) => x.id === p.part);
  const ch = part && part.chapters.find((c) => c.id === p.chapter);
  return { slug: p.slug, title: p.title, url: url('s/' + p.slug), part: p.part, chapter: p.chapter, ctitle: ch ? ch.title : p.chapter };
})));

/* 404 */
write('404.html', shell({
  title: '页面不存在',
  body: `<header class="page-head"><h1>没有这个页面</h1><p class="lede">链接可能改了。回到 <a href="${BASE}/">主页</a> 或按 Ctrl K 搜索。</p></header>`,
}));

/* assets */
fs.cpSync(path.join(ROOT_DIR, 'assets'), path.join(OUT, 'assets'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets', 'katex'), { recursive: true });
const katexCss = path.join(ROOT_DIR, 'node_modules', 'katex', 'dist', 'katex.min.css');
fs.copyFileSync(katexCss, path.join(OUT, 'assets', 'katex', 'katex.min.css'));
fs.cpSync(path.join(ROOT_DIR, 'node_modules', 'katex', 'dist', 'fonts'), path.join(OUT, 'assets', 'katex', 'fonts'), { recursive: true });

/* ---------------- report ---------------- */
console.log(`\n构建完成: ${OUT}`);
console.log(`  页面 ${written.length} · 搜索条目 ${index.length} · 章节 ${nav.reduce((n, p) => n + p.chapters.length, 0)}`);

// 内部链接与锚点校验：不只看 href="/…"，也看相对链接、#锚点、以及 JSON 里的 URL。
const allFiles = [];
(function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? w(p) : allFiles.push(p); } })(OUT);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));
const rel = (f) => path.relative(OUT, f).replace(/\\/g, '/');

// 预扫描所有 html 的 id，供锚点校验
const idsByFile = new Map();
for (const f of htmlFiles) {
  const h = fs.readFileSync(f, 'utf8');
  idsByFile.set(rel(f), new Set([...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const isExternal = (u) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u);
const isDirLike = (p) => p === '' || p.endsWith('/') || !/\.[a-z0-9]+$/i.test(p);
const warnLinks = [];

function resolveTarget(fromFile, urlPath) {
  // urlPath 已去掉 query/fragment，且已剥掉 BASE
  let p = urlPath;
  if (!p.startsWith('/')) {
    const dir = path.posix.dirname('/' + rel(fromFile));
    p = path.posix.normalize(dir + '/' + p);
  }
  p = p.replace(/^\/+/, '');
  if (isDirLike(p)) p = path.posix.join(p, 'index.html');
  return p;
}

for (const f of htmlFiles) {
  const h = fs.readFileSync(f, 'utf8');
  const from = rel(f);
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let raw = m[1];
    if (!raw || isExternal(raw) || raw.startsWith('#')) continue;
    let target = raw;
    try { target = decodeURIComponent(raw); } catch { /* 保留原样 */ }
    const hashAt = target.indexOf('#');
    const fragment = hashAt >= 0 ? target.slice(hashAt + 1) : '';
    let pathPart = hashAt >= 0 ? target.slice(0, hashAt) : target;
    const qAt = pathPart.indexOf('?');
    if (qAt >= 0) pathPart = pathPart.slice(0, qAt);

    if (!pathPart) {
      // 纯锚点
      if (fragment && !idsByFile.get(from)?.has(fragment)) {
        warnLinks.push(`坏锚点 #${fragment} ← ${from}`);
      }
      continue;
    }
    if (BASE && pathPart.startsWith(BASE + '/')) pathPart = pathPart.slice(BASE.length);
    else if (BASE && pathPart === BASE) pathPart = '/';

    const targetRel = resolveTarget(f, pathPart);
    const abs = path.join(OUT, targetRel);
    if (!fs.existsSync(abs)) {
      warnLinks.push(`坏链接 ${raw} ← ${from}`);
      continue;
    }
    if (fragment && targetRel.endsWith('.html')) {
      const ids = idsByFile.get(targetRel);
      if (ids && !ids.has(fragment)) warnLinks.push(`坏锚点 ${raw} ← ${from}`);
    }
  }
}

// JSON 里的 URL（search.json / manifest.json）
for (const name of ['search.json', 'manifest.json']) {
  const p = path.join(OUT, name);
  if (!fs.existsSync(p)) continue;
  let arr;
  try { arr = JSON.parse(fs.readFileSync(p, 'utf8')); } catch { warn.push(`${name} 不是合法 JSON`); continue; }
  for (const item of arr) {
    const u = item.u || item.url;
    if (!u) continue;
    let pathPart = u;
    if (BASE && pathPart.startsWith(BASE + '/')) pathPart = pathPart.slice(BASE.length);
    const targetRel = resolveTarget(p, pathPart);
    if (!fs.existsSync(path.join(OUT, targetRel))) warnLinks.push(`坏链接 ${u} ← ${name}`);
  }
}

warn.push(...warnLinks);
const broken = warnLinks.length;

if (warn.length) {
  console.log(`\n⚠ ${warn.length} 条警告:`);
  [...new Set(warn)].slice(0, 40).forEach((w) => console.log('  - ' + w));
  if (warn.length > 40) console.log(`  … 另有 ${warn.length - 40} 条`);
} else {
  console.log(`  ✓ 无警告：${htmlFiles.length} 个页面的链接与锚点全部有效`);
}
if (process.argv.includes('--strict') && warn.length) {
  console.log('\n--strict: 有警告即以失败退出');
  process.exit(1);
}
