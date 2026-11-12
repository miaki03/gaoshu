// 子路径部署回归测试：以 base=/gaoshu 构建到 dist-base，断言没有漏加前缀的内部链接。
// 用法: node scripts/check-base.mjs
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = '/gaoshu';
const OUT = path.join(ROOT, 'dist-base');

// 注意：沙箱里不能给子进程接管道（child_process 默认 stdio:'pipe' 会 EPERM），
// 所以用 inherit 让输出直接进控制台，只依据退出码判断。
const run = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'build.mjs'), '--strict'], {
  cwd: ROOT,
  env: { ...process.env, GS_BASE: BASE, GS_OUT: 'dist-base' },
  stdio: 'inherit',
});
if (run.status !== 0) {
  console.error('\n✗ 子路径构建失败（--strict 未通过）');
  process.exit(1);
}

const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(OUT);

const isExternal = (u) => /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u);
const missing = [];
const relative = [];
let total = 0;
let prefixed = 0;

for (const f of htmlFiles) {
  const h = fs.readFileSync(f, 'utf8');
  const from = path.relative(OUT, f).replace(/\\/g, '/');
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (!u || isExternal(u) || u.startsWith('#')) continue;
    total += 1;
    if (u.startsWith('/')) {
      if (u.startsWith(BASE + '/') || u === BASE) prefixed += 1;
      else missing.push(`${u} ← ${from}`);
    } else {
      relative.push(`${u} ← ${from}`);
    }
  }
}

// 允许的相对路径：RSS/资源内部引用目前没有，出现即说明有地方没走 url()
const problems = [];
if (missing.length) problems.push(`${missing.length} 条根绝对路径没有加 ${BASE} 前缀，例如: ${missing.slice(0, 5).join(' | ')}`);
if (relative.length) problems.push(`${relative.length} 条相对路径（子路径下会解析错），例如: ${relative.slice(0, 5).join(' | ')}`);

// 关键资源必须能定位到
for (const asset of ['assets/style.css', 'assets/app.js', 'assets/katex/katex.min.css', 'search.json', 'manifest.json']) {
  if (!fs.existsSync(path.join(OUT, asset))) problems.push(`产物缺少 ${asset}`);
}

fs.rmSync(OUT, { recursive: true, force: true });

console.log(`\n子路径回归（base=${BASE}）`);
console.log(`  页面 ${htmlFiles.length} · href/src 共 ${total} · 带前缀 ${prefixed} · 缺前缀 ${missing.length} · 相对 ${relative.length}`);

if (problems.length) {
  console.log('\n✗ 失败:');
  problems.forEach((p) => console.log('  ! ' + p));
  process.exit(1);
}
console.log('  ✓ 通过：所有站内链接都带了 base 前缀');
