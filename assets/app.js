/* 站点交互：主题 / 菜单 / 倒计时 / 进度 / 错题本 / 搜索 */
(function () {
  'use strict';

  var BASE = (document.body.getAttribute('data-base') || '').replace(/\/$/, '');
  var EXAM = document.body.getAttribute('data-exam') || '';
  var LS = {
    progress: 'gs.progress',
    theme: 'gs.theme',
    errors: 'gs.errors'
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  var progress = read(LS.progress, {});
  var errors = read(LS.errors, {});

  /* ── 主题 ── */
  var order = ['auto', 'light', 'dark'];
  var labels = { auto: '跟随系统', light: '浅色', dark: '深色' };
  function applyTheme(t) {
    document.documentElement.dataset.theme = t;
    var btn = document.getElementById('themeBtn');
    if (btn) btn.title = '主题：' + labels[t];
  }
  applyTheme(read(LS.theme, 'auto'));
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = read(LS.theme, 'auto');
      var next = order[(order.indexOf(cur) + 1) % order.length];
      write(LS.theme, next);
      applyTheme(next);
    });
  }

  /* ── 移动端菜单 ── */
  var menuBtn = document.getElementById('menuBtn');
  var sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    document.addEventListener('click', function (e) {
      if (window.innerWidth > 900) return;
      if (!sidebar.contains(e.target) && e.target !== menuBtn) sidebar.classList.remove('open');
    });
  }

  /* ── 倒计时 ── */
  var cd = document.getElementById('countdown');
  var EXAM_LABEL = document.body.getAttribute('data-exam-label') || '考试';
  var EXAM_NOTE = document.body.getAttribute('data-exam-note') || '';
  function paintCountdown() {
    if (!cd) return;
    var done = Object.keys(progress).filter(function (k) { return progress[k] >= 2; }).length;
    var total = document.querySelectorAll('.nav-item').length;
    var stat = '已掌握 ' + done + ' / ' + total + ' 节';
    if (!EXAM) {
      // 日期未定：不编一个日子，只显示进度与说明
      cd.innerHTML = '<strong>' + EXAM_LABEL + '复习中</strong>' +
        '<span class="cd-sub">' + stat + (EXAM_NOTE ? ' · ' + EXAM_NOTE : '') + '</span>';
      return;
    }
    var days = Math.ceil((new Date(EXAM + 'T09:00:00') - new Date()) / 86400000);
    if (days > 0) {
      cd.innerHTML = '<strong>距' + EXAM_LABEL + '约 ' + days + ' 天</strong>' +
        '<span class="cd-sub">' + stat + (EXAM_NOTE ? ' · ' + EXAM_NOTE : '') + '</span>';
    } else if (days > -3) {
      cd.innerHTML = '<strong>' + EXAM_LABEL + '周到了</strong><span class="cd-sub">只看错题本和公式卡，别再开新内容</span>';
    } else {
      cd.innerHTML = '<strong>' + EXAM_LABEL + '已结束</strong><span class="cd-sub">' + stat + '</span>';
    }
  }
  paintCountdown();

  /* ── 进度 ── */
  function levelOf(slug) { return progress[slug] || 0; }

  function syncSidebar() {
    document.querySelectorAll('.nav-item').forEach(function (a) {
      var lv = levelOf(a.dataset.slug);
      if (lv) a.setAttribute('data-level', String(lv));
      else a.removeAttribute('data-level');
    });
  }

  var bar = document.querySelector('.complete-bar');
  if (bar) {
    var slug = bar.dataset.slug;
    var state = bar.querySelector('.cb-state');
    function paintBar() {
      var lv = levelOf(slug);
      bar.querySelectorAll('.cb-btns button').forEach(function (b) {
        b.classList.toggle('on', Number(b.dataset.level) === lv);
      });
      if (state) {
        state.textContent = ['', '看过 · 还没会做', '会做 · 考前再刷一遍', '熟练 · 可以跳过'][lv] || '';
      }
      syncSidebar();
    }
    bar.querySelectorAll('.cb-btns button').forEach(function (b) {
      b.addEventListener('click', function () {
        var lv = Number(b.dataset.level);
        if (levelOf(slug) === lv) delete progress[slug];
        else progress[slug] = lv;
        write(LS.progress, progress);
        paintBar();
        paintCountdown();
      });
    });
    paintBar();
  } else {
    syncSidebar();
  }

  /* ── 错题本：给每道题加「记错」按钮 ── */
  document.querySelectorAll('.g-block.problem').forEach(function (block) {
    var idEl = block.querySelector('.p-id');
    var id = idEl ? idEl.textContent.trim() : '';
    if (!id) return;
    var head = block.querySelector('.g-head');
    if (!head) return;
    var tools = document.createElement('div');
    tools.className = 'p-tools';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = '记错';
    if (errors[id]) btn.classList.add('on');
    btn.addEventListener('click', function () {
      if (errors[id]) { delete errors[id]; btn.classList.remove('on'); }
      else {
        var clone = block.cloneNode(true);
        clone.querySelectorAll('.p-tools, .g-block.ans, details').forEach(function (n) { n.remove(); });
        var text = (clone.querySelector('.g-body') || clone).innerText.replace(/\s+/g, ' ').trim().slice(0, 220);
        errors[id] = {
          id: id,
          text: text,
          page: document.querySelector('.page-head h1') ? document.querySelector('.page-head h1').textContent : document.title,
          url: location.pathname + '#p-' + id,
          at: new Date().toISOString().slice(0, 10)
        };
        btn.classList.add('on');
      }
      write(LS.errors, errors);
    });
    tools.appendChild(btn);
    head.appendChild(tools);
  });

  /* ── 搜索 ── */
  var modal = document.getElementById('searchModal');
  var input = document.getElementById('searchInput');
  var resultsEl = document.getElementById('searchResults');
  var searchData = null;
  var sel = 0;

  function openSearch() {
    if (!modal) return;
    modal.hidden = false;
    input.value = '';
    renderResults('');
    setTimeout(function () { input.focus(); }, 20);
    if (!searchData) {
      fetch(BASE + '/search.json').then(function (r) { return r.json(); }).then(function (d) {
        searchData = d;
        renderResults(input.value);
      }).catch(function () {});
    }
  }
  function closeSearch() { if (modal) modal.hidden = true; }

  function score(item, q) {
    var t = item.t.toLowerCase(), b = (item.d + ' ' + item.b).toLowerCase();
    var s = 0;
    if (t.indexOf(q) >= 0) s += 100 - t.indexOf(q);
    if (b.indexOf(q) >= 0) s += 30 - Math.min(29, b.indexOf(q) / 20);
    return s;
  }

  function renderResults(q) {
    if (!resultsEl) return;
    var list = [];
    if (searchData) {
      q = q.trim().toLowerCase();
      if (!q) {
        list = searchData.slice(0, 12);
      } else {
        list = searchData
          .map(function (it) { return { it: it, s: score(it, q) }; })
          .filter(function (x) { return x.s > 0; })
          .sort(function (a, b) { return b.s - a.s; })
          .slice(0, 24)
          .map(function (x) { return x.it; });
      }
    }
    if (!q && !searchData) { resultsEl.innerHTML = '<div class="sr-empty">载入索引…</div>'; return; }
    if (!list.length) {
      resultsEl.innerHTML = '<div class="sr-empty">没有匹配。试试「间断点」「等价无穷小」「切线」「隐函数」。</div>';
      return;
    }
    sel = 0;
    resultsEl.innerHTML = list.map(function (it, i) {
      return '<a class="sr-item' + (i === 0 ? ' sel' : '') + '" href="' + it.u + '">' +
        '<div class="sr-t">' + esc(it.t) + '</div>' +
        '<div class="sr-c">' + esc(it.d || '') + '</div></a>';
    }).join('');
    resultsEl.querySelectorAll('.sr-item').forEach(function (a, i) {
      a.addEventListener('mouseenter', function () { setSel(i); });
    });
  }
  function setSel(i) {
    var items = resultsEl.querySelectorAll('.sr-item');
    if (!items.length) return;
    sel = (i + items.length) % items.length;
    items.forEach(function (a, j) { a.classList.toggle('sel', j === sel); });
    items[sel].scrollIntoView({ block: 'nearest' });
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; });
  }

  var sBtn = document.getElementById('searchBtn');
  if (sBtn) sBtn.addEventListener('click', openSearch);
  if (input) {
    input.addEventListener('input', function () { renderResults(input.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSel(sel + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel(sel - 1); }
      else if (e.key === 'Enter') {
        var items = resultsEl.querySelectorAll('.sr-item');
        if (items[sel]) location.href = items[sel].href;
      } else if (e.key === 'Escape') closeSearch();
    });
  }
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  /* ── 目录高亮 ── */
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        tocLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    document.querySelectorAll('.page-body h2[id], .page-body h3[id]').forEach(function (h) { obs.observe(h); });
  }

  /* ── 进度页 ── */
  var table = document.getElementById('progressTable');
  if (table) {
    fetch(BASE + '/manifest.json').then(function (r) { return r.json(); }).then(function (items) {
      var groups = {};
      var groupTitle = {};
      items.forEach(function (it) {
        (groups[it.chapter] = groups[it.chapter] || []).push(it);
        if (!groupTitle[it.chapter]) groupTitle[it.chapter] = it.ctitle || it.chapter;
      });
      var total = items.length;
      var counts = [0, 0, 0, 0];
      items.forEach(function (it) { counts[levelOf(it.slug)]++; });
      var pct = total ? Math.round(((counts[2] + counts[3]) / total) * 100) : 0;
      var html = '<div class="bar-row"><strong style="width:6rem">总体</strong>' +
        '<div class="bar"><i style="width:' + pct + '%"></i></div>' +
        '<span class="num">' + pct + '%</span></div>' +
        '<p class="muted" style="font-size:.8rem">“会做”与“熟练”合计。未看 ' + counts[0] + ' · 看过 ' + counts[1] +
        ' · 会做 ' + counts[2] + ' · 熟练 ' + counts[3] + ' / 共 ' + total + ' 节</p>';
      Object.keys(groups).forEach(function (ch) {
        html += '<h3 style="margin-top:1.6rem">' + esc(groupTitle[ch] || ch) + '</h3>';
        groups[ch].forEach(function (it) {
          var lv = levelOf(it.slug);
          html += '<div class="bar-row"><a href="' + it.url + '" style="flex:1">' + esc(it.title) + '</a>' +
            '<div class="bar"><i class="' + (lv === 3 ? 'lv3' : '') + '" style="width:' + (lv / 3 * 100) + '%"></i></div>' +
            '<span class="num">' + ['—', '看过', '会做', '熟练'][lv] + '</span></div>';
        });
      });
      table.innerHTML = html;
    }).catch(function () { table.innerHTML = '<p class="muted">载入失败。</p>'; });

    document.getElementById('exportBtn').addEventListener('click', function () {
      var data = { progress: progress, errors: errors, exportedAt: new Date().toISOString() };
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'gaoshu-progress.json';
      a.click();
      URL.revokeObjectURL(a.href);
    });
    var file = document.getElementById('importFile');
    document.getElementById('importBtn').addEventListener('click', function () { file.click(); });
    file.addEventListener('change', function () {
      var f = file.files[0];
      if (!f) return;
      var fr = new FileReader();
      fr.onload = function () {
        try {
          var d = JSON.parse(fr.result);
          if (d.progress) { progress = d.progress; write(LS.progress, progress); }
          if (d.errors) { errors = d.errors; write(LS.errors, errors); }
          location.reload();
        } catch (e) { alert('文件格式不对'); }
      };
      fr.readAsText(f);
    });
    document.getElementById('resetBtn').addEventListener('click', function () {
      if (!confirm('清空本机上的进度与错题本？')) return;
      progress = {}; errors = {};
      write(LS.progress, progress); write(LS.errors, errors);
      location.reload();
    });
  }

  /* ── 错题本页 ── */
  var errList = document.getElementById('errorList');
  if (errList) {
    var keys = Object.keys(errors);
    if (!keys.length) {
      errList.innerHTML = '<p class="muted">还没有错题。做题时点题目卡片上的「记错」，就会收进这里。</p>';
    } else {
      errList.innerHTML = keys.map(function (k) {
        var e = errors[k];
        return '<div class="err-card"><div class="meta">' + esc(e.id) + ' · ' + esc(e.page || '') + ' · ' + esc(e.at || '') + '</div>' +
          '<blockquote>' + esc(e.text) + '</blockquote>' +
          '<a href="' + esc(e.url) + '">回到原题</a> · <button class="btn ghost" data-del="' + esc(k) + '" style="font-size:.75rem;padding:.15rem .5rem">移除</button></div>';
      }).join('');
      errList.querySelectorAll('[data-del]').forEach(function (b) {
        b.addEventListener('click', function () {
          delete errors[b.dataset.del];
          write(LS.errors, errors);
          b.closest('.err-card').remove();
        });
      });
    }
  }
})();
