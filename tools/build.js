#!/usr/bin/env node
/*
 * tools/build.js — サイトのビルド & 検査
 *
 *   node tools/build.js            ビルド（ページの外枠の正規化、索引 site-index.js、各フォルダの index.html を生成）
 *   node tools/build.js --check    ビルドせずに検査のみ（ラベル重複・未定義参照・KaTeX エラー）
 *   node tools/build.js --quiet    警告の詳細を省略
 *   node tools/build.js --only 06-topology   指定フォルダ以下の問題だけ報告（ビルドは全体）
 *
 * 依存: Node.js のみ（vendor/ の KaTeX と marked を読み込む）。
 */
'use strict';
var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');
var CONFIG = require(path.join(ROOT, 'config.js'));
var Core = require(path.join(ROOT, 'site-core.js'));
var katex = require(path.join(ROOT, 'vendor/katex/katex.min.js'));
var marked = require(path.join(ROOT, 'vendor/marked.min.js'));

var args = process.argv.slice(2);
var CHECK_ONLY = args.indexOf('--check') >= 0;
var QUIET = args.indexOf('--quiet') >= 0;
var ONLY = (function () { var i = args.indexOf('--only'); return i >= 0 ? args[i + 1] : null; })();

var SKIP_DIRS = { vendor: 1, tools: 1, node_modules: 1 };
var SOURCE_RE = /<script type="text\/markdown" id="source">([\s\S]*?)<\/script>/;

function readJSON(p) { try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; } }
function posix(p) { return p.split(path.sep).join('/'); }
function stripPrefix(name) { return name.replace(/^\d+[-_]/, '').replace(/\.html$/, ''); }

/* ---------------- 1. ツリーを走査 ---------------- */
var pages = [];   // {path, abs, dir, title, sec, src}
function walkDir(absDir, relDir, depth) {
  var meta = readJSON(path.join(absDir, '_meta.json')) || {};
  var node = {
    kind: 'dir', path: relDir ? relDir + '/' : '', name: path.basename(absDir),
    title: meta.title || (relDir ? stripPrefix(path.basename(absDir)) : CONFIG.SITE_TITLE),
    abbr: meta.abbr || meta.title || stripPrefix(path.basename(absDir)),
    en: meta.en || '', description: meta.description || '', intro: meta.intro || '',
    msc: meta.msc || '', id: meta.id || '', prereq: meta.prereq || [], groups: meta.groups || null, children: []
  };
  var entries = fs.readdirSync(absDir, { withFileTypes: true })
    .filter(function (e) { return e.name.charAt(0) !== '.' && e.name.charAt(0) !== '_'; })
    .sort(function (a, b) { return a.name.localeCompare(b.name, 'en', { numeric: true }); });
  var sec = 0;
  entries.forEach(function (e) {
    var abs = path.join(absDir, e.name);
    var rel = relDir ? relDir + '/' + e.name : e.name;
    if (e.isDirectory()) {
      if (depth === 0 && SKIP_DIRS[e.name]) return;
      node.children.push(walkDir(abs, rel, depth + 1));
    } else if (depth > 0 && /\.html$/.test(e.name) && e.name !== 'index.html') {
      var html = fs.readFileSync(abs, 'utf8');
      var m = SOURCE_RE.exec(html);
      if (!m) { warn(rel, 'ページ原稿 <script type="text/markdown" id="source"> がありません（スキップ）'); return; }
      sec++;
      var pg = { path: rel, abs: abs, dirNode: node, sec: sec, src: unescapeSource(m[1]) };
      pg.idx = pages.length; pages.push(pg);
      node.children.push({ kind: 'page', idx: pg.idx });
    }
  });
  return node;
}

// 原稿内に </script> を書きたい場合は <\/script> と書く
function unescapeSource(s) { return s.replace(/^\n/, '').replace(/\s+$/, '') + '\n'; }

var problems = [];
function warn(where, msg) { problems.push({ where: where, msg: msg }); }

var tree = walkDir(ROOT, '', 0);

// 表示の簡略化：ページを直接もたず、子フォルダが 1 つだけのフォルダの、その子に solo 印を付ける。
// solo のフォルダはメニューとパンくずで飛ばす（住所・ラベル・概要ページはそのまま）。
(function markSolo(node, isRoot) {
  var subs = node.children.filter(function (c) { return c.kind === 'dir'; });
  var hasLeaf = node.children.some(function (c) { return c.kind === 'page'; });
  if (!isRoot && subs.length === 1 && !hasLeaf) subs[0].solo = true;
  subs.forEach(function (c) { markSolo(c, false); });
})(tree, true);

// 各ディレクトリに祖先情報を付ける
(function attach(node, crumbs) {
  node.crumbs = crumbs;
  node.children.forEach(function (c) {
    if (c.kind === 'dir') attach(c, crumbs.concat([c.solo ? { title: c.title, path: c.path, s: 1 } : { title: c.title, path: c.path }]));
    else pages[c.idx].crumbs = crumbs;
  });
})(tree, []);

// フォルダの id（_meta.json の "id"）→ ノード。前提知識（"prereq"）の参照先に使う
var dirById = {};
(function collect(node) {
  if (node.id) {
    if (dirById[node.id]) warn(node.path + '_meta.json', 'フォルダ id "' + node.id + '" が重複しています（' + dirById[node.id].path + ' と）');
    else dirById[node.id] = node;
  }
  node.children.forEach(function (c) { if (c.kind === 'dir') collect(c); });
})(tree);

/* ---------------- 索引語 ---------------- */
// {term, reading} の配列。env の index="用語|よみ, …"、本文中の \index{用語|よみ}、定義環境の太字
var INDEX_BOLD_TYPES = { definition: 1, notation: 1, axiom: 1, construction: 1 };
function parseIndexAttr(str) {
  return String(str || '').split(/[,、]/).map(function (t) {
    var ps = t.split('|'); return { term: ps[0].trim(), reading: (ps[1] || '').trim() };
  }).filter(function (x) { return x.term; });
}
function mdIndex(text, bold) {
  var ex = Core.extractMath(text), out = ex.index.slice();
  if (bold) {
    var re = /\*\*([^*\n]{1,40}?)\*\*/g, m;
    while ((m = re.exec(ex.text))) {
      if (/[\uE000-\uE003]/.test(m[1])) continue;
      out.push({ term: m[1].trim(), reading: '' });
    }
  }
  return out;
}
function envIndex(node) {
  var out = parseIndexAttr(node.attrs && node.attrs.index);
  var bold = !!INDEX_BOLD_TYPES[node.type];
  (function walk(ns) {
    ns.forEach(function (c) {
      if (c.kind === 'md') out = out.concat(mdIndex(c.text, bold));
      // 付属ブロック（証明など）の中の \index も親の環境に集める
      else if (c.kind === 'env' && (CONFIG.ENVIRONMENTS[c.type] || {}).attached) walk(c.children);
    });
  })(node.children);
  if (node.title && bold) out.push({ term: node.title.replace(/\$[^$]*\$/g, '').trim(), reading: '' });
  return dedupeIndex(out);
}
function dedupeIndex(arr) {
  var seen = {}, out = [];
  arr.forEach(function (x) {
    if (!x.term) return;
    if (seen[x.term]) { if (!seen[x.term].reading && x.reading) seen[x.term].reading = x.reading; return; }
    seen[x.term] = { term: x.term, reading: x.reading }; out.push(seen[x.term]);
  });
  return out;
}

/* ---------------- 2. 解析と番号付け ---------------- */
var labels = {};      // label -> {p, t, n, ti, e, tex}
var entries = [];     // 検索エントリ
function addEntry(e) { entries.push(e); return entries.length - 1; }

pages.forEach(function (pg) {
  var parsed = Core.parseBlocks(pg.src);
  pg.parsed = parsed;
  pg.title = parsed.page.title || stripPrefix(path.basename(pg.path));
  pg.keywords = parsed.page.keywords || '';
  pg.subject = pg.dirNode.abbr;
  pg.dirPath = pg.dirNode.path;
  if (!parsed.page.title) warn(pg.path, 'ページタイトル（先頭の "# タイトル" 行）がありません');
  parsed.unclosed.forEach(function (n) { warn(pg.path, '閉じられていない環境 ' + n.type + '（' + n.line + '行目）'); });

  var ls = Core.numberTree(parsed, String(pg.sec), CONFIG.ENVIRONMENTS);
  if (parsed.page.label) ls.unshift({ label: parsed.page.label, type: 'page', num: '', title: pg.title });

  // 検索エントリ: ページ
  addEntry({ p: pg.idx, t: 'page', n: '', l: parsed.page.label || '', ti: pg.title, k: pg.keywords,
    x: introText(parsed.children) });

  // 検索エントリ: 環境・地の文（a = ページ内アンカー。site-core.js の描画と同じ順序で数える）
  var heading = '', anchor = '', envOrd = 0, headCount = 0;
  (function walk(nodes, depth) {
    nodes.forEach(function (node) {
      if (node.kind === 'md') {
        splitByHeadings(node.text).forEach(function (ch) {
          if (ch.heading) {
            heading = ch.heading;
            anchor = ch.label || ('sec-' + (++headCount));
          }
          if (depth > 0) return;
          var ix = dedupeIndex(mdIndex(ch.body, false));
          if (!heading) return;   // 最初の見出しより前の導入文はページのエントリに含まれている
          if (ch.body.trim().length > 20) {
            addEntry({ p: pg.idx, t: 'text', n: '', l: ch.label || '', ti: heading, k: '', x: ch.body, a: anchor, ix: ix });
          } else if (ch.heading) {
            addEntry({ p: pg.idx, t: 'section', n: '', l: ch.label || '', ti: ch.heading, k: '', x: ch.body, a: anchor, ix: ix });
          }
        });
        return;
      }
      if (node.kind !== 'env') return;
      envOrd++;
      if (node.type === 'restate') {
        if (!node.target) warn(pg.path, '再掲の対象ラベル "' + (node.targetLabel || '') + '" がこのページの前方にありません（' + node.line + '行目）');
        return;
      }
      if (!CONFIG.ENVIRONMENTS[node.type]) warn(pg.path, '未知の環境名 "' + node.type + '"（' + node.line + '行目）');
      var of = node.of ? { n: node.of.num || '', t: node.of.type, ti: node.of.title || '', l: node.of.label || '' } : null;
      node._entry = addEntry({ p: pg.idx, t: node.type, n: node.num || '', l: node.label || '',
        ti: node.title || '', k: node.keywords || '', x: node.raw || '', of: of, h: heading,
        a: node.label || ('env-' + envOrd), ix: envIndex(node) });
      walk(node.children, depth + 1);
    });
  })(parsed.children, 0);

  ls.forEach(function (L) {
    if (!/^[A-Za-z0-9][A-Za-z0-9:._\/+-]*$/.test(L.label)) warn(pg.path, 'ラベル "' + L.label + '" に使えない文字があります（英数字と : . _ - / + のみ）');
    if (labels[L.label]) {
      var other = pages[labels[L.label].p];
      warn(pg.path, 'ラベル "' + L.label + '" が重複しています（' + other.path + ' と）');
      return;
    }
    var rec = { p: pg.idx, t: L.type, n: L.num || '', ti: L.title || '' };
    if (L.node && L.node._entry != null) rec.e = L.node._entry;
    if (L.type === 'equation') rec.tex = L.tex;
    if (L.type === 'page') rec.ti = pg.title;
    labels[L.label] = rec;
  });
});

function introText(children) {
  for (var i = 0; i < children.length; i++) {
    if (children[i].kind === 'md') {
      var t = children[i].text.split(/\n\s*#{2,6}\s/)[0];
      return t.slice(0, 1200);
    }
  }
  return '';
}

function splitByHeadings(text) {
  var out = [], cur = { heading: '', label: '', body: '' }, inF = false;
  text.split('\n').forEach(function (ln) {
    if (/^\s{0,3}(```|~~~)/.test(ln)) inF = !inF;
    var hm = !inF && /^\s{0,3}#{2,6}\s+(.*?)\s*$/.exec(ln);
    if (hm) {
      if (cur.heading || cur.body.trim()) out.push(cur);
      var lm = /\s*\{#([^\s{}]+)\}\s*$/.exec(hm[1]);
      cur = { heading: lm ? hm[1].slice(0, lm.index) : hm[1], label: lm ? lm[1] : '', body: '' };
    } else cur.body += ln + '\n';
  });
  if (cur.heading || cur.body.trim()) out.push(cur);
  return out;
}

/* ---------------- ラベル台帳（labels.json） ---------------- */
// 記事中のリンクはすべてパスではなくラベルで書く。まだ書かれていない記事への参照は
// 「予定（planned）」として台帳に載り、その記事が書かれた時点で自動的にリンクになる。
var REG_PATH = path.join(ROOT, 'labels.json');
var oldReg = (readJSON(REG_PATH) || {}).labels || {};
var planned = {};   // label -> {ti, from: {pagePath:1}}
Object.keys(oldReg).forEach(function (k) {
  if (oldReg[k].status === 'planned' && !labels[k]) planned[k] = { ti: oldReg[k].title || '', from: {}, manual: !!oldReg[k].manual };
});

/* ---------------- 3. 参照の検査と被参照リスト ---------------- */
var backrefs = {};   // label -> [[pageIdx, fromLabel, fromType, fromNum]]
var mathErrors = 0, unresolved = 0;

function typeName(t) {
  if (t === 'equation') return '式';
  if (t === 'section') return '節';
  if (t === 'page') return 'ページ';
  return (CONFIG.ENVIRONMENTS[t] || { name: t }).name;
}

pages.forEach(function (pg) {
  var currentFrom = null;
  var renderer = Core.createRenderer({
    marked: marked, katex: katex, macros: CONFIG.KATEX_MACROS, envs: CONFIG.ENVIRONMENTS,
    resolveRef: function (label, r) {
      var L = labels[label];
      if (!L) {
        var P = planned[label] || (planned[label] = { ti: '', from: {} });
        if (r && r.text && !P.ti) P.ti = r.text;
        P.from[pg.path] = 1;
        return { planned: true, title: P.ti || (r && r.text) || '', type: 'planned' };
      }
      var from = currentFrom;
      if (!(from && from.label === label)) {
        var list = (backrefs[label] = backrefs[label] || []);
        var sig = pg.idx + '|' + (from ? (from.label || from.num || '') : '');
        if (!list.some(function (b) { return b.sig === sig; })) {
          list.push({ sig: sig, v: [pg.idx, from ? (from.label || '') : '', from ? from.type : '', from ? (from.num || '') : ''] });
        }
      }
      return { type: L.t, num: L.n, title: L.ti, typeName: typeName(L.t), href: '#', prefix: '' };
    },
    onMathError: function (err, m) {
      mathErrors++;
      warn(pg.path, 'KaTeX エラー: ' + err.message.replace(/\s+/g, ' ').slice(0, 160) + '  ⟵  ' + m.tex.replace(/\s+/g, ' ').slice(0, 120));
    }
  });
  // 環境ごとに「どこから参照したか」を追跡しながら描画
  (function walk(nodes, fromEnv) {
    nodes.forEach(function (node) {
      if (node.kind === 'md') { currentFrom = fromEnv; renderer.renderMarkdown(node.text); return; }
      if (node.kind !== 'env') return;
      var def = CONFIG.ENVIRONMENTS[node.type] || {};
      var from = def.num ? node : (node.of || fromEnv);
      currentFrom = from;
      if (node.title) renderer.renderInline(node.title);
      walk(node.children, from);
    });
  })(pg.parsed.children, null);
});

Object.keys(planned).forEach(function (k) {
  var P = planned[k];
  if (!P.ti && Object.keys(P.from).length) {
    Object.keys(P.from).forEach(function (pp) {
      warn(pp, '未執筆のラベル "' + k + '" に表示名がありません。\\ref[表示名]{' + k + '} と書くか、labels.json の title を埋めてください');
    });
  }
});

/* ---------------- 用語索引 ---------------- */
var ROWS = [['あ', 'あいうえおぁぃぅぇぉゔ'], ['か', 'かきくけこがぎぐげご'], ['さ', 'さしすせそざじずぜぞ'], ['た', 'たちつてとだぢづでどっ'],
  ['な', 'なにぬねの'], ['は', 'はひふへほばびぶべぼぱぴぷぺぽ'], ['ま', 'まみむめも'], ['や', 'やゆよゃゅょ'], ['ら', 'らりるれろ'], ['わ', 'わをんゎ']];
function toHira(str) { return String(str).replace(/[\u30a1-\u30f6]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); }); }
function sortKey(t) { return toHira((t.reading || t.term).normalize('NFKC')).toLowerCase(); }
function groupOf(t) {
  var c = sortKey(t).charAt(0);
  for (var i = 0; i < ROWS.length; i++) if (ROWS[i][1].indexOf(c) >= 0) return ROWS[i][0] + '行';
  if (/[a-z]/.test(c)) return c.toUpperCase();
  if (/[\u3040-\u309f]/.test(c)) return 'その他';
  return '読み未登録';
}
var terms = {};   // term -> {term, reading, refs: [entryIdx]}
entries.forEach(function (e, i) {
  (e.ix || []).forEach(function (x) {
    var T = terms[x.term] || (terms[x.term] = { term: x.term, reading: '', refs: [] });
    if (!T.reading && x.reading) T.reading = x.reading;
    if (T.refs.indexOf(i) < 0) T.refs.push(i);
  });
});
function glossarySource() {
  var list = Object.keys(terms).map(function (k) { return terms[k]; });
  var order = ROWS.map(function (r) { return r[0] + '行'; }).concat('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), ['その他', '読み未登録']);
  var groups = {};
  list.forEach(function (t) { (groups[groupOf(t)] = groups[groupOf(t)] || []).push(t); });
  var s = '# 用語索引 {#site:glossary keywords="index, 索引, glossary"}\n\n';
  s += '定義・定理に付けられた索引語の一覧です（' + list.length + ' 語）。各項目からその用語が現れる定義・定理へ移動できます。\n\n';
  var present = order.filter(function (g) { return groups[g]; });
  if (present.length) s += '<p class="mn-gloss-jump">' + present.map(function (g) { return '<a href="#gl-' + encodeURIComponent(g) + '">' + g + '</a>'; }).join(' ') + '</p>\n\n';
  present.forEach(function (g) {
    s += '## ' + g + ' {#gl-' + encodeURIComponent(g) + '}\n\n';
    groups[g].sort(function (a, b) { return sortKey(a).localeCompare(sortKey(b), 'ja'); }).forEach(function (t) {
      var links = t.refs.map(function (i) {
        var e = entries[i], pg = pages[e.p];
        if (e.l && labels[e.l] && labels[e.l].p === e.p) return '\\fullref{' + e.l + '}';
        var txt = (e.ti || typeName(e.t)).replace(/[\[\]]/g, '');
        return '[' + pg.subject + ' §' + pg.sec + ' ' + txt + '](' + pg.path + (e.a ? '#' + e.a : '') + ')';
      });
      s += '- **' + t.term + '**' + (t.reading ? '（' + t.reading + '）' : '') + '：' + links.join('、') + '\n';
    });
    s += '\n';
  });
  if (!list.length) s += 'まだ索引語がありません。\n';
  return s;
}

var backOut = {};
Object.keys(backrefs).forEach(function (k) {
  if (backrefs[k].length) backOut[k] = backrefs[k].map(function (b) { return b.v; });
});

/* ---------------- 3.4 表示用の大分野（ルートの _meta.json の groups） ---------------- */
// codes の要素は第 1 階層の 2 桁（"03"）か、第 2 階層を束ねた表示用の見出し
// { "title": "圏論", "codes": ["18A", "18B"] }（例：18 を圏論とホモロジー代数に分けて見せる）。
// どこにも入らないフォルダは「その他」に出る。
var NAV_GROUPS = (function () {
  if (!tree.groups) return null;
  var isDir = function (c) { return c.kind === 'dir'; };
  var code = function (d) { return d.name.split('-')[0]; };
  var l1 = tree.children.filter(isDir), byCode = {}, l2ByCode = {};
  l1.forEach(function (d) { byCode[code(d)] = d; d.children.filter(isDir).forEach(function (e) { l2ByCode[code(e)] = { node: e, parent: d }; }); });
  var usedL1 = {}, usedL2 = {}, splitL1 = {};
  var item = function (title, en, d, dirs, virt) {
    return { title: title, en: en || '', d: d || '', paths: dirs.map(function (x) { return x.path; }),
      href: dirs[0].path + 'index.html', n: dirs.reduce(function (a, x) { return a + countPages(x); }, 0), v: virt ? 1 : undefined };
  };
  var groups = tree.groups.map(function (g) {
    return { title: g.title, en: g.en || '', items: g.codes.map(function (c) {
      if (typeof c === 'string') {
        var d = byCode[c]; if (!d) { warn('_meta.json', '大分野「' + g.title + '」の分類 ' + c + ' のフォルダがありません'); return null; }
        usedL1[d.path] = 1; return item(d.title, d.en, d.description, [d], false);
      }
      var ds = c.codes.map(function (k) { if (!l2ByCode[k]) warn('_meta.json', '見出し「' + c.title + '」の分類 ' + k + ' のフォルダがありません'); return l2ByCode[k]; }).filter(Boolean);
      if (!ds.length) return null;
      ds.forEach(function (x) { usedL2[x.node.path] = 1; splitL1[x.parent.path] = 1; });
      return item(c.title, c.en, c.description, ds.map(function (x) { return x.node; }), true);
    }).filter(Boolean) };
  });
  var rest = [];
  l1.forEach(function (d) {
    if (usedL1[d.path]) return;
    if (!splitL1[d.path]) { rest.push(item(d.title, d.en, d.description, [d], false)); return; }
    d.children.filter(isDir).forEach(function (e) { if (!usedL2[e.path]) rest.push(item(e.title, e.en, e.description, [e], true)); });
  });
  if (rest.length) groups.push({ title: 'その他', en: '', items: rest });
  return groups;
})();

/* ---------------- 3.5 前提知識（_meta.json の prereq）の検査 ---------------- */
// prereq の各項目: { "dir": "<フォルダ id>", "from": §番号 or ラベル, "to": §番号 or ラベル, "note": "補足" }
// from/to を省くとフォルダ全体。to を省くと from の 1 ページだけ。
function dirPages(dir) { return dir.children.filter(function (c) { return c.kind === 'page'; }).map(function (c) { return pages[c.idx]; }); }
function resolveSec(dir, v) {
  if (v == null || v === '') return null;
  if (typeof v === 'number') return { sec: v, pg: dirPages(dir).filter(function (p) { return p.sec === v; })[0] || null };
  var L = labels[v];
  if (L && pages[L.p].dirNode === dir) return { sec: pages[L.p].sec, pg: pages[L.p] };
  return undefined;
}
(function checkPrereq(node) {
  (node.prereq || []).forEach(function (it, i) {
    var where = node.path + '_meta.json';
    var d = dirById[it.dir];
    if (!d) { warn(where, '前提知識 ' + (i + 1) + ' 番目: フォルダ id "' + it.dir + '" がありません'); return; }
    ['from', 'to'].forEach(function (k) {
      if (resolveSec(d, it[k]) === undefined) warn(where, '前提知識 ' + (i + 1) + ' 番目: ' + k + ' のラベル "' + it[k] + '" が ' + d.path + ' のページにありません');
    });
  });
  node.children.forEach(function (c) { if (c.kind === 'dir') checkPrereq(c); });
})(tree);

function prereqSource(node) {
  if (!node.prereq || !node.prereq.length) return '';
  var r = relRoot(node.path + 'index.html');
  var s = '## 前提知識\n\n';
  node.prereq.forEach(function (it) {
    var d = dirById[it.dir]; if (!d) return;
    var names = d.crumbs.slice(-2).map(function (c) { return c.title; }).join(' › ');
    var line = '- [' + names + '](' + r + d.path + 'index.html)';
    var a = resolveSec(d, it.from), b = resolveSec(d, it.to);
    var secLink = function (x) { return x.pg ? '[§' + x.sec + '](' + r + x.pg.path + ')' : '§' + x.sec; };
    if (a && b && b.sec !== a.sec) {
      line += ' ' + secLink(a) + '〜' + secLink(b);
      var ts = [a, b].filter(function (x) { return x.pg; }).map(function (x) { return x.pg.title; });
      if (ts.length === 2) line += '（' + ts[0] + ' 〜 ' + ts[1] + '）';
      else if (!ts.length) line += '（未執筆）';
    } else if (a) {
      line += ' ' + secLink(a) + (a.pg ? '（' + a.pg.title + '）' : '（未執筆）');
    } else {
      var n = dirPages(d).length;
      line += n ? '（全体、' + n + ' ページ）' : '（全体、未執筆）';
    }
    if (it.note) line += '：' + it.note;
    s += line + '\n';
  });
  return s + '\n';
}

/* ---------------- 4. 出力 ---------------- */
function relRoot(relPath) {
  var depth = relPath.split('/').length - 1;
  var s = ''; for (var i = 0; i < depth; i++) s += '../'; return s;
}

function pageHtml(opts) {
  var r = opts.root;
  return '<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + Core.escapeHtml(opts.title) + ' | ' + Core.escapeHtml(CONFIG.SITE_TITLE) + '</title>\n' +
    '<link rel="stylesheet" href="' + r + 'vendor/katex/katex.min.css">\n' +
    '<link rel="stylesheet" href="' + r + 'style.css">\n' +
    '<script>try{var t=localStorage.getItem("mn-theme");if(t)document.documentElement.dataset.theme=t;}catch(e){}</script>\n' +
    '</head>\n<body data-root="' + r + '" data-page="' + Core.escapeHtml(opts.path) + '" data-kind="' + opts.kind + '">\n' +
    '<!-- ページ原稿（Markdown）。この script 要素の中だけを編集してください。外側は tools/build.js が自動生成します。 -->\n' +
    '<script type="text/markdown" id="source">\n' + opts.src.replace(/\s+$/, '') + '\n</script>\n' +
    '<noscript>このサイトの表示には JavaScript が必要です。</noscript>\n' +
    '<script src="' + r + 'vendor/katex/katex.min.js"></script>\n' +
    '<script src="' + r + 'vendor/marked.min.js"></script>\n' +
    '<script src="' + r + 'config.js"></script>\n' +
    '<script src="' + r + 'site-core.js"></script>\n' +
    '<script src="' + r + 'site-index.js"></script>\n' +
    '<script src="' + r + 'search.js"></script>\n' +
    '<script src="' + r + 'site.js"></script>\n' +
    '</body>\n</html>\n';
}

function write(abs, content) {
  var old = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : null;
  if (old !== content) fs.writeFileSync(abs, content);
}

function jsTree(node) {
  return {
    k: 'd', path: node.path, title: node.title, abbr: node.abbr, en: node.en, d: node.description,
    s: node.solo ? 1 : undefined,
    c: node.children.map(function (c) { return c.kind === 'dir' ? jsTree(c) : { k: 'p', i: c.idx }; })
  };
}

// 生成されるフォルダ概要ページの原稿
function dirSource(node) {
  var s = '# ' + node.title + (node.en ? '（' + node.en + '）' : '') + '\n\n';
  if (node.description) s += node.description + '\n\n';
  if (node.intro) s += node.intro + '\n\n';
  if (node.msc) s += '<p class="mn-msc">MSC2020: ' + Core.escapeHtml(node.msc) + '</p>\n\n';
  s += prereqSource(node);
  var subdirs = node.children.filter(function (c) { return c.kind === 'dir'; });
  var leaves = node.children.filter(function (c) { return c.kind === 'page'; });
  function card(d) {
    return '<a class="mn-card" href="' + d.name + '/index.html"><span class="mn-card-title">' + Core.escapeHtml(d.title) +
      '</span>' + (d.en ? '<span class="mn-card-en">' + Core.escapeHtml(d.en) + '</span>' : '') +
      '<span class="mn-card-desc">' + Core.escapeHtml(d.description || '') + '</span><span class="mn-card-count">' + countPages(d) + ' ページ</span></a>\n';
  }
  if (!node.path && NAV_GROUPS && subdirs.length) {
    // トップページ：大分野（サイト独自のまとまり）ごとに、ページのある分野だけカードで示す。空の分野は最後にまとめる
    var empties = [];
    NAV_GROUPS.forEach(function (g) {
      var full = g.items.filter(function (it) { return it.n > 0; });
      g.items.forEach(function (it) { if (!it.n) empties.push(it); });
      if (!full.length) return;
      s += '## ' + g.title + (g.en ? '（' + g.en + '）' : '') + '\n\n<div class="mn-cards">\n' + full.map(function (it) {
        return '<a class="mn-card" href="' + it.href + '"><span class="mn-card-title">' + Core.escapeHtml(it.title) +
          '</span>' + (it.en ? '<span class="mn-card-en">' + Core.escapeHtml(it.en) + '</span>' : '') +
          '<span class="mn-card-desc">' + Core.escapeHtml(it.d || '') + '</span><span class="mn-card-count">' + it.n + ' ページ</span></a>\n';
      }).join('') + '</div>\n\n';
    });
    if (empties.length) {
      s += '## 準備中の分野\n\n<p class="mn-empty">' + empties.map(function (it) {
        return '<a href="' + it.href + '">' + Core.escapeHtml(it.title) + '</a>';
      }).join('　') + '</p>\n\n';
    }
    subdirs = [];
  }
  if (subdirs.length) {
    s += '## 分野\n\n<div class="mn-cards">\n';
    subdirs.forEach(function (d) {
      var n = countPages(d);
      s += '<a class="mn-card" href="' + d.name + '/index.html"><span class="mn-card-title">' + Core.escapeHtml(d.title) +
        '</span>' + (d.en ? '<span class="mn-card-en">' + Core.escapeHtml(d.en) + '</span>' : '') +
        '<span class="mn-card-desc">' + Core.escapeHtml(d.description || '') + '</span><span class="mn-card-count">' + n + ' ページ</span></a>\n';
    });
    s += '</div>\n\n';
  }
  if (!subdirs.length && !leaves.length && node.path) s += '<p class="mn-empty">このフォルダにはまだページがありません。</p>\n';
  if (leaves.length) {
    s += '## 目次\n\n<ol class="mn-dirtoc">\n';
    leaves.forEach(function (c) {
      var pg = pages[c.idx];
      var main = entries.filter(function (e) {
        return e.p === pg.idx && e.l && e.ti && /^(theorem|proposition|definition|lemma|corollary)$/.test(e.t);
      }).slice(0, 12);
      s += '<li value="' + pg.sec + '"><a href="' + path.basename(pg.path) + '">§' + pg.sec + ' ' + Core.escapeHtml(pg.title) + '</a>';
      if (main.length) {
        s += '<ul class="mn-dirtoc-items">' + main.map(function (e) {
          return '<li><span class="mn-dirtoc-kind">' + typeName(e.t) + ' ' + e.n + '</span> ' +
            '<span class="mn-dirtoc-title">' + e.ti + '</span></li>';
        }).join('') + '</ul>';
      }
      s += '</li>\n';
    });
    s += '</ol>\n';
  }
  return s;
}
function countPages(node) {
  return node.children.reduce(function (a, c) { return a + (c.kind === 'page' ? 1 : countPages(c)); }, 0);
}

if (!CHECK_ONLY) {
  pages.forEach(function (pg) {
    write(pg.abs, pageHtml({ root: relRoot(pg.path), path: pg.path, title: pg.title, src: pg.src, kind: 'page' }));
  });
  (function genDirs(node) {
    var rel = node.path + 'index.html';
    write(path.join(ROOT, rel), pageHtml({ root: relRoot(rel), path: rel, title: node.title, src: dirSource(node), kind: node.path ? 'dir' : 'home' }));
    node.children.forEach(function (c) { if (c.kind === 'dir') genDirs(c); });
  })(tree);
  write(path.join(ROOT, 'glossary.html'), pageHtml({ root: '', path: 'glossary.html', title: '用語索引', src: glossarySource(), kind: 'glossary' }));
  // ラベル台帳
  var reg = {};
  Object.keys(labels).sort().forEach(function (k) {
    var L = labels[k], pg = pages[L.p];
    reg[k] = { status: 'defined', type: L.t, title: L.ti || '', num: L.n || '', page: pg.path };
  });
  Object.keys(planned).sort().forEach(function (k) {
    var P = planned[k];
    if (!Object.keys(P.from).length && !P.manual) return;   // どこからも参照されなくなった予定ラベルは消す
    reg[k] = { status: 'planned', title: P.ti || '', referencedFrom: Object.keys(P.from).sort() };
    if (P.manual) reg[k].manual = true;
  });
  write(REG_PATH, JSON.stringify({
    '説明': 'サイト全体のラベル台帳（tools/build.js が自動更新）。defined = 定義済み、planned = 参照されているが未執筆。' +
      'planned の title は未執筆のあいだリンクの代わりに表示される名前。手で planned を追加するときは "manual": true を付けると参照がなくても残る。',
    labels: reg
  }, null, 2) + '\n');
  write(path.join(ROOT, 'search.html'), pageHtml({ root: '', path: 'search.html', title: '検索', src: '# 検索\n', kind: 'search' }));

  var index = {
    built: new Date().toISOString(),
    tree: jsTree(tree),
    groups: NAV_GROUPS,
    pages: pages.map(function (pg) {
      return { path: pg.path, title: pg.title, sec: pg.sec, dir: pg.dirPath, subj: pg.subject, k: pg.keywords,
        crumbs: pg.crumbs };
    }),
    labels: labels,
    planned: Object.keys(planned).reduce(function (o, k) { o[k] = { ti: planned[k].ti }; return o; }, {}),
    backrefs: backOut,
    entries: []   // 検索用の本文は search-index.js に分けた（必要になったときに読み込む）
  };
  write(path.join(ROOT, 'site-index.js'),
    '/* 自動生成ファイル（tools/build.js）。編集しないでください。 */\nwindow.MATH_INDEX = ' + JSON.stringify(index) + ';\n');
  // 検索用の本文（大きいので、検索を開いたときやページの表示後に遅れて読み込む）
  write(path.join(ROOT, 'search-index.js'),
    '/* 自動生成ファイル（tools/build.js）。編集しないでください。 */\n' +
    '(window.MATH_INDEX = window.MATH_INDEX || {}).entries = ' + JSON.stringify(entries) + ';\n');
}

/* ---------------- 5. 報告 ---------------- */
var plannedKeys = Object.keys(planned);
if (plannedKeys.length && !QUIET) {
  console.log('\n[未執筆（予定）のラベル ' + plannedKeys.length + ' 件 — 記事が書かれると自動でリンクになります]');
  plannedKeys.sort().forEach(function (k) { console.log('  - ' + k + (planned[k].ti ? '  「' + planned[k].ti + '」' : '') + '  ← ' + Object.keys(planned[k].from).join(', ')); });
}
var shown = problems.filter(function (p) { return !ONLY || p.where.indexOf(ONLY) === 0; });
var byFile = {};
shown.forEach(function (p) { (byFile[p.where] = byFile[p.where] || []).push(p.msg); });
if (!QUIET) Object.keys(byFile).forEach(function (f) {
  console.log('\n[' + f + ']');
  byFile[f].forEach(function (m) { console.log('  - ' + m); });
});
console.log('\n' + (CHECK_ONLY ? '検査' : 'ビルド') + '完了: ' + pages.length + ' ページ, ' + Object.keys(labels).length +
  ' ラベル, ' + entries.length + ' 検索エントリ / 問題 ' + shown.length + ' 件' +
  '（未定義参照 ' + unresolved + ', KaTeX エラー ' + mathErrors + '）' + (ONLY ? ' [--only ' + ONLY + ']' : ''));
process.exitCode = shown.length ? 1 : 0;
