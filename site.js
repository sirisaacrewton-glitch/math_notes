/*
 * site.js — ページの描画・ナビゲーション・相互参照プレビュー・広告枠
 *
 * DOM 構造（CSS はすべて mn- 接頭辞のクラスと data 属性だけを対象にする）:
 *   .mn-app[data-nav=hidden|pinned|open]
 *     header.mn-topbar
 *     div.mn-layout
 *       nav.mn-drawer        … 分類ツリー（ハンバーガーで開閉）
 *       div.mn-scrim         … オーバーレイ時の背景
 *       main.mn-main         … パンくず・本文・ページ送り・広告枠
 *       aside.mn-rail        … 目次・広告枠（広い画面のみ）
 */
(function () {
  'use strict';
  var C = window.MATH_CONFIG, Core = window.MathCore;
  var IDX = window.MATH_INDEX || { tree: { c: [] }, pages: [], labels: {}, entries: [], backrefs: {} };
  var body = document.body;
  var ROOT = body.getAttribute('data-root') || '';
  var PAGE = body.getAttribute('data-page') || '';
  var KIND = body.getAttribute('data-kind') || 'page';
  var pageIdx = -1;
  IDX.pages.forEach(function (p, i) { if (p.path === PAGE) pageIdx = i; });
  var PG = IDX.pages[pageIdx] || null;
  var esc = Core.escapeHtml;
  var WIDE = window.matchMedia ? matchMedia('(min-width: 1100px)') : { matches: true, addListener: function () {} };
  var PHONE = window.matchMedia ? matchMedia('(max-width: 640px)') : { matches: false };

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
  }
  function typeName(t) {
    if (t === 'equation') return '式';
    if (t === 'section') return '節';
    if (t === 'page') return 'ページ';
    return (C.ENVIRONMENTS[t] || { name: t }).name;
  }

  /* ---------- 参照の解決 ---------- */
  var localLabels = {};
  function resolveRef(label) {
    var L = localLabels[label];
    if (L) return { type: L.type, num: L.num, title: L.title, typeName: typeName(L.type), href: '#' + label, prefix: '', external: false };
    var G = IDX.labels[label];
    if (!G) {
      var P = IDX.planned && IDX.planned[label];
      return P ? { planned: true, title: P.ti, type: 'planned' } : null;
    }
    var pg = IDX.pages[G.p];
    var same = G.p === pageIdx;
    return {
      type: G.t, num: G.n, title: G.t === 'page' ? pg.title : G.ti, typeName: typeName(G.t),
      href: same ? '#' + label : ROOT + pg.path + (G.t === 'page' ? '' : '#' + label),
      prefix: (!PG || pg.dir !== PG.dir) ? pg.subj + ' ' : '', external: !same
    };
  }
  var renderer = Core.createRenderer({
    marked: window.marked, katex: window.katex, macros: C.KATEX_MACROS, envs: C.ENVIRONMENTS,
    resolveRef: resolveRef,
    onMathError: function (err, m) { if (window.console) console.warn('KaTeX:', err.message, m.tex); }
  });

  /* ---------- レイアウト ---------- */
  function buildLayout() {
    var src = document.getElementById('source');
    var text = src ? src.textContent : '';
    var app = document.createElement('div');
    app.className = 'mn-app';
    app.innerHTML =
      '<a class="mn-skip" href="#mn-main">本文へ移動</a>' +
      '<header class="mn-topbar">' +
        '<button type="button" class="mn-iconbtn mn-nav-toggle" aria-controls="mn-drawer" aria-expanded="false" title="分類メニュー">' +
          '<span class="mn-burger" aria-hidden="true"><span></span><span></span><span></span></span><span class="mn-vh">分類メニュー</span></button>' +
        '<a class="mn-brand" href="' + ROOT + 'index.html">' + esc(C.SITE_TITLE) + '</a>' +
        '<button type="button" class="mn-search-trigger" aria-label="検索">' +
          '<span class="mn-search-trigger-icon"><svg class="mn-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></span><span class="mn-search-trigger-text">定理・用語・数式を検索</span><kbd>/</kbd></button>' +
        '<button type="button" class="mn-iconbtn mn-theme-toggle" title="ライト/ダーク切替" aria-label="ライト/ダーク切替">' +
          '<span aria-hidden="true">◐</span></button>' +
      '</header>' +
      '<div class="mn-layout">' +
        '<nav class="mn-drawer" id="mn-drawer" aria-label="分類">' +
          '<div class="mn-drawer-head"><span class="mn-drawer-title">分類</span>' +
          '<button type="button" class="mn-iconbtn mn-drawer-close" aria-label="メニューを閉じる">✕</button></div>' +
          '<div class="mn-quick"><a href="' + ROOT + 'index.html">ホーム</a><a href="' + ROOT + 'glossary.html">用語索引</a><a href="' + ROOT + 'search.html">詳しい検索</a></div>' +
          '<div class="mn-tree"></div></nav>' +
        '<div class="mn-scrim" aria-hidden="true"></div>' +
        '<main class="mn-main" id="mn-main" tabindex="-1">' +
          '<div class="mn-crumbs"></div>' +
          '<nav class="mn-pager-top" aria-label="前後のページ（上）"></nav>' +
          '<div class="mn-ad" data-ad-slot="top" hidden></div>' +
          '<article class="mn-article"></article>' +
          '<div class="mn-ad" data-ad-slot="bottom" hidden></div>' +
          '<nav class="mn-pager" aria-label="前後のページ"></nav>' +
          '<footer class="mn-footer">' + esc(C.SITE_TITLE) + (IDX.built ? ' ・ 索引更新 ' + esc(IDX.built.slice(0, 10)) : '') + '</footer>' +
        '</main>' +
        '<aside class="mn-rail" aria-label="このページの目次">' +
          '<div class="mn-toc"></div>' +
          '<div class="mn-ad" data-ad-slot="rail" hidden></div>' +
        '</aside>' +
      '</div>' +
      '<div class="mn-popover" role="tooltip" hidden></div>';
    body.appendChild(app);
    return { text: text, app: app };
  }

  /* ---------- ナビゲーション（分類ツリー） ---------- */
  var app;
  function navState() { return app.getAttribute('data-nav'); }
  function setNav(state) {
    app.setAttribute('data-nav', state);
    var open = state === 'open' || state === 'pinned';
    app.querySelector('.mn-nav-toggle').setAttribute('aria-expanded', open);
    document.documentElement.classList.toggle('mn-lock', state === 'open' && !WIDE.matches);
  }
  function initNav() {
    var pinned = store('mn-nav-pinned') === '1';
    setNav(WIDE.matches && pinned ? 'pinned' : 'hidden');
    app.querySelector('.mn-nav-toggle').addEventListener('click', function () {
      if (WIDE.matches) {
        // 広い画面：左カラムとして表示／非表示を切り替え、状態を記憶
        var next = navState() === 'pinned' ? 'hidden' : 'pinned';
        store('mn-nav-pinned', next === 'pinned' ? '1' : '0');
        setNav(next);
      } else {
        setNav(navState() === 'open' ? 'hidden' : 'open');
        if (navState() === 'open') app.querySelector('.mn-drawer-close').focus();
      }
    });
    app.querySelector('.mn-drawer-close').addEventListener('click', function () {
      if (WIDE.matches) store('mn-nav-pinned', '0');
      setNav('hidden');
    });
    app.querySelector('.mn-scrim').addEventListener('click', function () { setNav('hidden'); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && navState() === 'open') setNav('hidden'); });
    var onChange = function () { setNav(WIDE.matches && store('mn-nav-pinned') === '1' ? 'pinned' : 'hidden'); };
    if (WIDE.addEventListener) WIDE.addEventListener('change', onChange); else WIDE.addListener(onChange);
  }

  // 行の左の ▸ ボタン（線で描いたシェブロン）。メニューバーと分野ピッカーで共通の形
  var CHEVRON = '<svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function hasPages(n) { return (n.c || []).some(function (c) { return c.k !== 'd' || hasPages(c); }); }
  function findDir(p) {
    var hit = null;
    (function walk(n) { (n.c || []).forEach(function (c) { if (hit || c.k !== 'd') return; if (c.path === p) hit = c; else if (p.indexOf(c.path) === 0) walk(c); }); })(IDX.tree || { c: [] });
    return hit;
  }
  // 表示用の見出しで束ねた第 2 階層 → その見出し（パンくずで第 1 階層の代わりに出す）
  var VIRT = {};
  (IDX.groups || []).forEach(function (g) { g.items.forEach(function (it) { if (it.v) it.paths.forEach(function (p) { VIRT[p] = it; }); }); });
  function renderTree(el) {
    // 表示の約束：ページのないフォルダは出さない。solo のフォルダ（親の唯一の子）は飛ばして中身を同じ深さに出す。
    // 第 1 階層はトップの _meta.json の groups（大分野）ごとに見出しを付けて並べる。
    function node(n, depth) {
      var html = '';
      (n.c || []).forEach(function (c) {
        if (c.k === 'd' && !hasPages(c)) return;
        if (c.k === 'd' && c.s) { html += node(c, depth); return; }
        if (c.k === 'd') {
          // c.x：別の場所にあるフォルダの写し（_meta.json の "also"）。開いた状態にはせず、印を付ける
          var here = !c.x && PAGE.indexOf(c.path) === 0, empty = !hasPages(c), kids = (c.c || []).length > 0;
          html += '<details class="mn-tree-dir' + (empty ? ' is-empty' : '') + (c.x ? ' is-also' : '') + '" data-depth="' + depth + '"' + (here ? ' open' : '') + '>' +
            '<summary tabindex="-1">' +
              (kids ? '<button type="button" class="mn-tree-toggle" aria-expanded="' + here + '" aria-label="' + esc(c.title) + ' を展開">' + CHEVRON + '</button>'
                    : '<span class="mn-tree-spacer" aria-hidden="true"></span>') +
              '<a class="mn-tree-link" href="' + ROOT + c.path + 'index.html"' + (PAGE === c.path + 'index.html' ? ' aria-current="page"' : '') +
                (empty ? ' title="まだページがありません"' : (c.x ? ' title="別の分野にある系列（関連として表示）"' : '')) + '>' + esc(c.title) + '</a></summary>' +
            '<div class="mn-tree-children">' + node(c, depth + 1) + '</div></details>';
        } else {
          var p = IDX.pages[c.i];
          html += '<a class="mn-tree-page" href="' + ROOT + p.path + '"' + (p.path === PAGE ? ' aria-current="page"' : '') + '>' +
            '<span class="mn-tree-spacer" aria-hidden="true"></span>' +
            '<span class="mn-tree-sec">' + p.sec + '</span><span class="mn-tree-title">' + renderer.renderInline(p.title) + '</span></a>';
        }
      });
      return html;
    }
    var T = IDX.tree || { c: [] };
    if (IDX.groups) {
      var out = '';
      IDX.groups.forEach(function (g) {
        var inner = '';
        g.items.forEach(function (it) {
          var dirs = it.paths.map(findDir).filter(Boolean);
          if (!it.v) { inner += node({ c: dirs }, 0); return; }
          // 表示用の見出し（例：18 のうち 18A・18B を「圏論」として見せる）
          var kids = node({ c: dirs.length === 1 ? dirs[0].c : dirs }, 1);
          if (!kids) return;
          var here = it.paths.some(function (p) { return PAGE.indexOf(p) === 0; });
          inner += '<details class="mn-tree-dir" data-depth="0"' + (here ? ' open' : '') + '><summary tabindex="-1">' +
            '<button type="button" class="mn-tree-toggle" aria-expanded="' + here + '" aria-label="' + esc(it.title) + ' を展開">' + CHEVRON + '</button>' +
            '<a class="mn-tree-link" href="' + ROOT + it.href + '">' + esc(it.title) + '</a></summary>' +
            '<div class="mn-tree-children">' + kids + '</div></details>';
        });
        if (inner) out += '<div class="mn-tree-group">' + esc(g.title) + '</div>' + inner;
      });
      el.innerHTML = out;
    } else el.innerHTML = node(T, 0);
    el.addEventListener('click', function (ev) {
      var t = ev.target.closest('.mn-tree-toggle');
      var sum = ev.target.closest('summary');
      if (!t) { if (sum && !ev.target.closest('a')) ev.preventDefault(); return; }   // 行の余白では開閉しない
      ev.preventDefault();
      var d = t.closest('details'), want = d._anim ? !d._target : !d.open;
      t.setAttribute('aria-expanded', want);
      if (REDUCED || !Element.prototype.animate) d.open = want; else animateDetails(d, want);
    });
    el.addEventListener('toggle', function (ev) {
      var d = ev.target, t = d.querySelector && d.querySelector(':scope > summary > .mn-tree-toggle');
      if (t && !d._anim) t.setAttribute('aria-expanded', d.open);
    }, true);
  }

  function renderCrumbs(el) {
    if (KIND === 'home') { el.remove(); return; }
    var crumbs = PG ? PG.crumbs : null;
    if (!crumbs) {
      var segs = PAGE.split('/').slice(0, -1), acc = '';
      crumbs = [];
      (function find(n, i) {
        (n.c || []).forEach(function (c) {
          if (c.k === 'd' && c.path === acc + segs[i] + '/') { crumbs.push({ title: c.title, path: c.path, s: c.s }); acc = c.path; if (i + 1 < segs.length) find(c, i + 1); }
        });
      })(IDX.tree || { c: [] }, 0);
      crumbs = crumbs.slice(0, -1);
    }
    // 表示用の見出しで束ねられた第 2 階層の上の第 1 階層は、その見出しに置き換える
    crumbs = crumbs.map(function (c, i) {
      var nx = crumbs[i + 1], v = nx && VIRT[nx.path];
      return v && i === 0 ? { title: v.title, path: v.href.replace(/index\.html$/, ''), s: 0 } : c;
    });
    var parts = ['<a href="' + ROOT + 'index.html">ホーム</a>'].concat(crumbs.filter(function (c) { return !c.s; }).map(function (c) {
      return '<a href="' + ROOT + c.path + 'index.html">' + esc(c.title) + '</a>';
    }));
    el.innerHTML = '<ol>' + parts.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ol>';
    el.setAttribute('aria-label', 'パンくずリスト');
  }

  /* ---------- 本文 ---------- */
  function renderArticle(el, text) {
    var parsed = Core.parseBlocks(text);
    var sec = PG ? String(PG.sec) : '';
    Core.numberTree(parsed, sec, C.ENVIRONMENTS).forEach(function (L) { localLabels[L.label] = L; });
    if (parsed.page.label) localLabels[parsed.page.label] = { type: 'page', num: '', title: parsed.page.title };
    renderer.resetCounters();
    var title = parsed.page.title || document.title;
    el.innerHTML = '<header class="mn-page-head">' +
      (PG ? '<div class="mn-page-sec">' + esc(PG.subj) + ' §' + PG.sec + '</div>' : '') +
      '<h1' + (parsed.page.label ? ' id="' + esc(parsed.page.label) + '"' : '') + '>' + renderer.renderInline(title) + '</h1></header>' +
      '<div class="mn-page-tools"></div>' +
      '<div class="mn-toc-inline"></div>' +
      '<div class="mn-prose">' + renderer.renderNodes(parsed.children) + '</div>';
    if (KIND === 'search' && window.MathSearch) {
      var box = document.createElement('div'); box.className = 'mn-search-page';
      el.appendChild(box); window.MathSearch.renderSearchPage(box);
    }
    el.setAttribute('data-kind', KIND);
    return parsed;
  }

  /* 証明・一般化などの折りたたみ。「すべて開く」の状態はブラウザに記憶 */
  function initFolds(article) {
    var folds = article.querySelectorAll('.mn-prose details.mn-fold');
    var tools = article.querySelector('.mn-page-tools');
    if (!folds.length) { tools.remove(); return; }
    var openAll = store('mn-open-folds') === '1';
    tools.innerHTML = '<button type="button" class="mn-textbtn mn-fold-all"></button>';
    var btn = tools.querySelector('button');
    function apply(v) {
      folds.forEach(function (d) { d.open = v; });
      btn.textContent = v ? '証明・補足をすべて閉じる' : '証明・補足をすべて開く';
      btn.setAttribute('aria-pressed', v);
    }
    apply(openAll);
    btn.addEventListener('click', function () { openAll = !openAll; store('mn-open-folds', openAll ? '1' : '0'); apply(openAll); });
  }

  function fillBackrefs(root) {
    root.querySelectorAll('.mn-backrefs[data-for]').forEach(function (div) {
      var list = IDX.backrefs[div.getAttribute('data-for')];
      if (!list || !list.length) { div.remove(); return; }
      var items = list.map(function (b) {
        var pg = IDX.pages[b[0]];
        var href = (b[0] === pageIdx ? '' : ROOT + pg.path) + (b[1] ? '#' + b[1] : '');
        var prefix = (!PG || pg.dir !== PG.dir) ? pg.subj + ' ' : '';
        var txt = b[2] ? prefix + typeName(b[2]) + ' ' + b[3] : prefix + '§' + pg.sec + ' ' + pg.title;
        return '<a class="mn-xref" href="' + esc(href || '#') + '"' + (b[1] ? ' data-label="' + esc(b[1]) + '"' : '') + '>' + renderer.renderInline(txt) + '</a>';
      });
      div.innerHTML = '<details><summary>この結果を参照している箇所（' + items.length + '）</summary><p>' + items.join('、') + '</p></details>';
    });
  }

  function buildToc(rail, inline, article) {
    var hs = article.querySelectorAll('.mn-prose h2.mn-h, .mn-prose h3.mn-h');
    if (hs.length < 2) { rail.remove(); inline.remove(); return; }
    var items = '';
    hs.forEach(function (h) {
      var clone = h.cloneNode(true); var a = clone.querySelector('.mn-anchor'); if (a) a.remove();
      items += '<li data-level="' + h.tagName.slice(1) + '"><a href="#' + esc(h.id) + '">' + clone.innerHTML + '</a></li>';
    });
    rail.innerHTML = '<div class="mn-toc-title">このページの内容</div><ol>' + items + '</ol>';
    inline.innerHTML = '<details><summary>このページの内容</summary><ol>' + items + '</ol></details>';
    var links = rail.querySelectorAll('a');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (ents) {
        ents.forEach(function (en) {
          if (en.isIntersecting) links.forEach(function (l) {
            if (l.getAttribute('href') === '#' + en.target.id) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-10% 0px -80% 0px' });
      hs.forEach(function (h) { obs.observe(h); });
    }
  }

  function buildPager(el) {
    if (pageIdx < 0) { el.remove(); return; }
    var prev = IDX.pages[pageIdx - 1], next = IDX.pages[pageIdx + 1];
    function link(p, rel, label) {
      if (!p) return '<span class="mn-pager-gap"></span>';
      return '<a class="mn-pager-link" rel="' + rel + '" href="' + ROOT + p.path + '"><span class="mn-pager-dir">' + label + '</span>' +
        '<span class="mn-pager-sub">' + esc(p.subj) + ' §' + p.sec + '</span><span class="mn-pager-title">' + renderer.renderInline(p.title) + '</span></a>';
    }
    el.innerHTML = link(prev, 'prev', '← 前へ') + link(next, 'next', '次へ →');
  }

  function buildPagerTop(el) {
    if (!el) return;
    if (pageIdx < 0) { el.remove(); return; }
    var prev = IDX.pages[pageIdx - 1], next = IDX.pages[pageIdx + 1];
    function link(p, rel, label) {
      if (!p) return '<span class="mn-pager-top-gap"></span>';
      return '<a class="mn-pager-top-link" rel="' + rel + '" href="' + ROOT + p.path + '" title="' + esc(p.subj) + ' §' + p.sec + '">' +
        (rel === 'prev' ? '← ' : '') + '<span class="mn-pager-top-title">' + renderer.renderInline(p.title) + '</span>' + (rel === 'next' ? ' →' : '') + '</a>';
    }
    el.innerHTML = link(prev, 'prev') + link(next, 'next');
  }

  /* ---------- 広告枠 ---------- */
  function fillSlot(slot, html, minH) {
    if (!html) return;
    slot.removeAttribute('hidden');
    slot.style.minHeight = (minH || 0) + 'px';
    slot.innerHTML = '<div class="mn-ad-label">広告</div><div class="mn-ad-body"></div>';
    var bodyEl = slot.querySelector('.mn-ad-body');
    var tmp = document.createElement('div'); tmp.innerHTML = html;
    [].slice.call(tmp.childNodes).forEach(function (n) {
      if (n.nodeName === 'SCRIPT') {
        var s = document.createElement('script');
        [].slice.call(n.attributes).forEach(function (a) { s.setAttribute(a.name, a.value); });
        s.text = n.text; bodyEl.appendChild(s);
      } else bodyEl.appendChild(n);
    });
  }
  function initAds(article) {
    var A = C.ADS || {};
    if (!A.enabled) return;
    var slots = A.slots || {}, mh = A.minHeight || {};
    ['top', 'bottom', 'rail'].forEach(function (k) {
      var el = app.querySelector('[data-ad-slot="' + k + '"]');
      if (el) fillSlot(el, slots[k], mh[k]);
    });
    if (slots.inArticle && KIND === 'page') {
      var every = A.inArticleEvery || 3;
      var hs = article.querySelectorAll('.mn-prose > h2.mn-h');
      for (var i = every; i < hs.length; i += every) {
        var slot = document.createElement('div');
        slot.className = 'mn-ad'; slot.setAttribute('data-ad-slot', 'inArticle');
        hs[i].parentNode.insertBefore(slot, hs[i]);
        fillSlot(slot, slots.inArticle, mh.inArticle);
      }
    }
  }

  /* ---------- 参照プレビュー ---------- */
  var pop, popTimer, hideTimer, popFor = null;
  function previewHtml(label) {
    var L = localLabels[label], G = IDX.labels[label];
    var info = resolveRef(label);
    if (!info) return null;
    var isNamed = info.type === 'section' || info.type === 'page';
    var head = '<div class="mn-pv-head"><span class="mn-pv-kind">' + esc((info.prefix || '') + info.typeName + (info.num ? ' ' + info.num : '')) + '</span>' +
      (info.title ? ' <span class="mn-pv-title">' + renderer.renderInline(info.title) + '</span>' : '') +
      '<a class="mn-pv-go" href="' + esc(info.href) + '">開く →</a></div>';
    var bodyHtml = '';
    if (L && info.type !== 'page') {
      var target = document.getElementById(label);
      if (target) {
        if (info.type === 'equation') bodyHtml = target.nextElementSibling ? target.nextElementSibling.outerHTML : '';
        else if (info.type === 'section') {
          var sib = target.nextElementSibling, n = 0;
          while (sib && n < 2 && !/^H[1-6]$/.test(sib.tagName)) { bodyHtml += sib.outerHTML; sib = sib.nextElementSibling; n++; }
        } else { var b = target.querySelector('.mn-env-body'); bodyHtml = b ? b.innerHTML : ''; }
      }
    } else if (G) {
      var pg = IDX.pages[G.p];
      if (G.t === 'equation') bodyHtml = renderer.renderTex({ tex: G.tex, display: true, num: G.n });
      else if (G.e != null && !(IDX.entries && IDX.entries.length) && window.MathEntries) {
        // 本文の索引がまだ読み込まれていない：読み込み後に表示し直す
        bodyHtml = '<p class="mn-pv-loading">読み込み中…</p>';
        var want = label;
        window.MathEntries.load(function () { if (popFor && popFor.getAttribute('data-label') === want) showPop(popFor); });
      }
      else if (G.e != null && IDX.entries[G.e]) bodyHtml = renderer.renderNodes(Core.parseBlocks(IDX.entries[G.e].x || '').children);
      else if (isNamed) {
        for (var i = 0; i < IDX.entries.length; i++) {
          var e = IDX.entries[i];
          if (e.p === G.p && (G.t === 'page' ? e.t === 'page' : e.l === label)) { bodyHtml = renderer.renderMarkdown((e.x || '').slice(0, 900)); break; }
        }
      }
      head = head.replace('</div>', '<div class="mn-pv-where">' + esc(pg.subj) + ' §' + pg.sec + ' ' + esc(pg.title) + '</div></div>');
    }
    return head + '<div class="mn-pv-body mn-prose">' + bodyHtml + '</div>';
  }
  function showPop(a) {
    var html = previewHtml(a.getAttribute('data-label'));
    if (!html) return;
    popFor = a;
    pop.innerHTML = html;
    pop.querySelectorAll('[id]').forEach(function (x) { x.removeAttribute('id'); });
    pop.removeAttribute('hidden');
    if (PHONE.matches) { pop.classList.add('is-sheet'); pop.style.cssText = ''; return; }
    pop.classList.remove('is-sheet');
    var r = a.getBoundingClientRect();
    var pw = Math.min(560, window.innerWidth - 24);
    pop.style.width = pw + 'px';
    pop.style.left = Math.min(Math.max(12, r.left), window.innerWidth - pw - 12) + 'px';
    var ph = pop.offsetHeight, top = r.bottom + 8;
    if (top + ph > window.innerHeight - 8 && r.top - ph - 8 > 8) top = r.top - ph - 8;
    pop.style.top = Math.max(8, top) + 'px';
  }
  function hidePop() { pop.setAttribute('hidden', ''); popFor = null; }
  function initPopovers() {
    pop = app.querySelector('.mn-popover');
    var touch = false;
    document.addEventListener('touchstart', function () { touch = true; }, { passive: true });
    document.addEventListener('mouseover', function (ev) {
      if (touch || !ev.target.closest) return;
      var a = ev.target.closest('a.mn-xref[data-label]');
      if (a && !pop.contains(a)) { clearTimeout(hideTimer); clearTimeout(popTimer); popTimer = setTimeout(function () { showPop(a); }, 220); }
      else if (ev.target.closest('.mn-popover')) clearTimeout(hideTimer);
    });
    document.addEventListener('mouseout', function (ev) {
      if (touch || !ev.target.closest) return;
      if (ev.target.closest('a.mn-xref[data-label]') || ev.target.closest('.mn-popover')) { clearTimeout(popTimer); hideTimer = setTimeout(hidePop, 260); }
    });
    // タッチ端末：1 回目のタップでプレビュー、「開く」で移動
    document.addEventListener('click', function (ev) {
      if (!ev.target.closest) return;
      var a = ev.target.closest('a.mn-xref[data-label]');
      if (a && touch && popFor !== a && !pop.contains(a)) { ev.preventDefault(); showPop(a); return; }
      if (!ev.target.closest('.mn-popover') && !a) hidePop();
    });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') hidePop(); });
    window.addEventListener('scroll', function () { if (popFor && !touch) hidePop(); }, { passive: true });
  }

  /* ---------- 折りたたみの開閉アニメーション ----------
   * <details> は標準では一瞬で開閉するので、高さを補間して滑らかにする（開くとき・閉じるとき両方）。
   * 動きを減らす設定（prefers-reduced-motion）では何もしない。 */
  var REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FOLD_SEL = 'details.mn-fold, details.mn-tree-dir, .mn-toc-inline details, .mn-backrefs details, details.mn-sform-more';
  function closedHeight(d) {
    var cs = getComputedStyle(d), sum = d.querySelector(':scope > summary');
    return sum.offsetHeight + ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
      .reduce(function (a, k) { return a + (parseFloat(cs[k]) || 0); }, 0);
  }
  function animateDetails(d, opening) {
    var start = d.getBoundingClientRect().height;      // 途中で逆向きに切り替えても、今の高さから続ける
    if (d._anim) { d._anim.cancel(); d._anim = null; }
    d._target = opening;
    d.open = true;
    var end = opening ? d.getBoundingClientRect().height : closedHeight(d);
    var dur = Math.min(420, 220 + Math.abs(end - start) * 0.25);   // 長い証明ほど少しだけ長く（上限 0.42 秒）
    d.style.overflow = 'hidden';
    var anim = d.animate([{ height: start + 'px' }, { height: end + 'px' }], { duration: dur, easing: 'cubic-bezier(.22,.61,.36,1)' });
    d._anim = anim;
    if (opening) [].slice.call(d.children).forEach(function (c) {
      if (c.tagName !== 'SUMMARY') c.animate([{ opacity: 0, transform: 'translateY(-4px)' }, { opacity: 1, transform: 'none' }], { duration: dur, easing: 'ease-out' });
    });
    anim.onfinish = function () {
      if (d._anim !== anim) return;
      d._anim = null; d.style.overflow = '';
      d.open = opening;
    };
  }
  function initFoldAnimation() {
    if (REDUCED || !Element.prototype.animate) return;
    document.addEventListener('click', function (ev) {
      var sum = ev.target.closest && ev.target.closest('summary');
      if (!sum || ev.defaultPrevented) return;
      var d = sum.parentElement;
      if (!d || !d.matches(FOLD_SEL)) return;
      if (ev.target.closest('a, button, .mn-label')) return;   // 見出し内のリンク・ボタンはそのまま
      ev.preventDefault();
      var want = d._anim ? !d._target : !d.open;
      animateDetails(d, want);
    });
  }

  /* ---------- その他 ---------- */
  function initLabels(root) {
    root.addEventListener('click', function (ev) {
      var chip = ev.target.closest('.mn-label');
      if (!chip) return;
      ev.preventDefault();
      var done = function () { chip.classList.add('is-copied'); setTimeout(function () { chip.classList.remove('is-copied'); }, 900); };
      if (navigator.clipboard) navigator.clipboard.writeText(chip.getAttribute('data-copy')).then(done, done); else done();
    });
  }
  function initTheme() {
    app.querySelector('.mn-theme-toggle').addEventListener('click', function () {
      var cur = document.documentElement.dataset.theme ||
        (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      store('mn-theme', next);
    });
  }
  function flashTarget() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!el) return;
    for (var p = el; p; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true;
    el.scrollIntoView({ block: 'start' });
    var box = el.classList.contains('mn-eq-anchor') ? el.nextElementSibling : el;
    if (box) { box.classList.remove('is-flash'); void box.offsetWidth; box.classList.add('is-flash'); }
    if (navState() === 'open') setNav('hidden');
  }

  /* 検索結果から移動してきたとき、ページ内の該当箇所をすべて目立たせる（約 2.5 秒） */
  function applySearchHighlight(article) {
    var data = null;
    try { data = JSON.parse(sessionStorage.getItem('mn-hl') || 'null'); sessionStorage.removeItem('mn-hl'); } catch (e) {}
    if (!data || Date.now() - data.t > 60000 || !window.MathSearch) return;
    var prose = article.querySelector('.mn-prose') || article;
    var marks = [];
    var re = data.terms && data.terms.length ? window.MathSearch.termRegex(data.terms, data.cs) : null;
    if (re) {
      var walker = document.createTreeWalker(prose, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          for (var p = n.parentNode; p && p !== prose; p = p.parentNode) {
            if (p.classList && (p.classList.contains('katex') || p.classList.contains('mn-label'))) return NodeFilter.FILTER_REJECT;
            if (p.tagName === 'SCRIPT' || p.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function (n) {
        re.lastIndex = 0;
        if (!re.test(n.nodeValue)) return;
        re.lastIndex = 0;
        var frag = document.createDocumentFragment(), text = n.nodeValue, last = 0, m;
        while ((m = re.exec(text))) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          var mk = document.createElement('mark'); mk.className = 'mn-hl'; mk.textContent = m[0];
          frag.appendChild(mk); marks.push(mk);
          last = m.index + m[0].length;
          if (!m[0].length) re.lastIndex++;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        n.parentNode.replaceChild(frag, n);
      });
    }
    (data.tex || []).forEach(function (t) {
      if (!t) return;
      prose.querySelectorAll('annotation[encoding="application/x-tex"]').forEach(function (an) {
        if (window.MathSearch.normTex(an.textContent).indexOf(t) >= 0) {
          var k = an.closest('.katex'); if (k) { k.classList.add('mn-hl-math'); marks.push(k); }
        }
      });
    });
    if (!marks.length) return;
    // 折りたたみの中にあるものも見えるように開く
    marks.forEach(function (mk) { for (var p = mk.parentElement; p && p !== prose; p = p.parentElement) if (p.tagName === 'DETAILS') p.open = true; });
    if (!location.hash) marks[0].scrollIntoView({ block: 'center' });
    setTimeout(function () { marks.forEach(function (mk) { mk.classList.add('is-fading'); }); }, 2500);
    setTimeout(function () {
      marks.forEach(function (mk) {
        if (mk.tagName === 'MARK') { var t = document.createTextNode(mk.textContent); mk.parentNode.replaceChild(t, mk); }
        else mk.classList.remove('mn-hl-math', 'is-fading');
      });
      prose.normalize();
    }, 3600);
  }

  function main() {
    var L = buildLayout();
    app = L.app;
    var article = app.querySelector('.mn-article');
    var parsed = renderArticle(article, L.text);
    document.title = (parsed.page.title || '') + ' | ' + C.SITE_TITLE;
    renderTree(app.querySelector('.mn-tree'));
    renderCrumbs(app.querySelector('.mn-crumbs'));
    fillBackrefs(article);
    initFolds(article);
    buildToc(app.querySelector('.mn-toc'), article.querySelector('.mn-toc-inline'), article);
    buildPager(app.querySelector('.mn-pager'));
    buildPagerTop(app.querySelector('.mn-pager-top'));
    initNav();
    initPopovers();
    initLabels(article);
    initFoldAnimation();
    initTheme();
    initAds(article);
    var railAd = app.querySelector('.mn-rail [data-ad-slot]');
    if (!app.querySelector('.mn-rail .mn-toc') && (!railAd || railAd.hasAttribute('hidden'))) app.classList.add('mn-no-rail');
    app.querySelector('.mn-search-trigger').addEventListener('click', function () { window.MathSearch && window.MathSearch.open(); });
    window.addEventListener('hashchange', function () { applySearchHighlight(article); flashTarget(); });
    // 同じページ内の結果へ移動したとき（ハッシュが変わらない場合を含む）に search.js から呼ばれる
    window.MathSiteRefresh = function () { applySearchHighlight(article); flashTarget(); };
    setTimeout(function () { applySearchHighlight(article); flashTarget(); }, 0);
    if (!window.MATH_INDEX) article.insertAdjacentHTML('afterbegin', '<div class="mn-warn">site-index.js が見つかりません。<code>node tools/build.js</code> を実行してください。</div>');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', main); else main();
})();
