/*
 * search.js — サイト内検索（数式対応）
 *
 * 画面ではキーワード・分野・数式・除外語・完全一致・種類をフォームで指定する。
 * キーワード欄には上級者向けに次の書式も書ける（フォームの条件と併用可）:
 *   "語句"（完全一致）  -語（除外）  $\pi_1$（数式）  type:thm,lem  in:位相  label:set:
 */
(function () {
  'use strict';
  var C = window.MATH_CONFIG, Core = window.MathCore;
  var IDX = window.MATH_INDEX || { pages: [], entries: [], labels: {} };
  var prepared = null;

  var TYPE_WEIGHT = {
    page: 1.6, definition: 1.45, theorem: 1.45, proposition: 1.3, lemma: 1.2, corollary: 1.2,
    axiom: 1.4, fact: 1.1, construction: 1.1, example: 1.0, counterexample: 1.05, remark: 0.9,
    table: 1.1, section: 1.0, text: 0.75, proof: 0.6, hypcheck: 0.65, supplement: 0.8, intuition: 0.85, solution: 0.6, problem: 0.9,
    notation: 1.0, exercise: 0.8, summary: 0.8, equation: 1.0
  };

  function typeName(t) {
    if (t === 'page') return 'ページ';
    if (t === 'text') return '本文';
    if (t === 'section') return '節';
    if (t === 'equation') return '式';
    return (C.ENVIRONMENTS[t] || { name: t }).name;
  }

  /* 文字の正規化：全角半角（NFKC）、カタカナ→ひらがな、（区別しない場合は）小文字化 */
  function kana(s) { return s.replace(/[\u30a1-\u30f6]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0x60); }); }
  function fold(s, cs) {
    s = String(s || '');
    if (s.normalize) s = s.normalize('NFKC');
    if (!cs) s = s.toLowerCase();
    return kana(s).replace(/\s+/g, ' ');
  }
  var CUR_PAGE = (document.body && document.body.getAttribute('data-page')) || '';
  // 読み（ふりがな）→ 用語 の辞書（索引語の読みから作る）
  var READINGS = null;
  function readings() {
    if (READINGS) return READINGS;
    READINGS = [];
    var seen = {};
    IDX.entries.forEach(function (e) {
      (e.ix || []).forEach(function (x) {
        if (!x.reading || seen[x.term]) return;
        seen[x.term] = 1;
        READINGS.push({ r: fold(x.reading), term: x.term });
      });
    });
    return READINGS;
  }
  function isKanaOnly(w) { return /^[\u3041-\u309f\u30fcー]+$/.test(w); }

  function prepare() {
    if (prepared) return prepared;
    prepared = IDX.entries.map(function (e, i) {
      var pg = IDX.pages[e.p] || {};
      var sb = Core.splitForSearch(e.x || '');
      var st = Core.splitForSearch(e.ti || '');
      var crumbs = (pg.crumbs || []).map(function (c) { return c.title; }).join(' ');
      return {
        i: i, e: e, pg: pg,
        rawT: st.text + ' ' + (e.k || ''), rawB: sb.text,
        rawI: (e.ix || []).map(function (x) { return x.term + (x.reading ? ' ' + x.reading : ''); }),
        nt: fold(st.text + ' ' + (e.k || '')),
        ni: (e.ix || []).map(function (x) { return fold(x.term + (x.reading ? ' ' + x.reading : '')); }),
        nl: (e.l || '').toLowerCase(),
        nb: fold(sb.text),
        ntm: st.maths.map(norm).join('\u0001'),
        nm: sb.maths.map(norm).join('\u0001'),
        where: Core.normalizeText(crumbs + ' ' + (pg.subj || '') + ' ' + (pg.path || '') + ' ' + (pg.title || '')),
        pt: fold(pg.title || ''), rawP: pg.title || ''
      };
    });
    // 式ラベルもエントリとして追加
    Object.keys(IDX.labels).forEach(function (l) {
      var L = IDX.labels[l];
      if (L.t !== 'equation') return;
      var pg = IDX.pages[L.p] || {};
      prepared.push({
        i: -1, e: { p: L.p, t: 'equation', n: L.n, l: l, ti: '', k: '', x: '$$' + L.tex + '$$', a: l }, pg: pg,
        nt: '', ni: [], rawT: '', rawB: '', rawI: [], rawP: pg.title || '', nl: l.toLowerCase(), nb: '', ntm: '', nm: norm(L.tex),
        where: Core.normalizeText(((pg.crumbs || []).map(function (c) { return c.title; }).join(' ')) + ' ' + (pg.subj || '') + ' ' + pg.path),
        pt: fold(pg.title || '')
      });
    });
    return prepared;
  }
  function norm(t) { return Core.normalizeTex(t, C.TEX_SYNONYMS, C.KATEX_MACROS); }

  /* ---------- クエリ解析 ---------- */
  // ひらがな（またはカタカナ）だけの語は、読みが一致する索引語でも探す（例：べきしゅうごう → 冪集合）
  function addAlts(t) {
    if (t.kind !== 'text' || !t.txt || !isKanaOnly(t.txt)) return;
    var alts = [];
    readings().forEach(function (R) {
      if (R.r === t.txt || (t.txt.length >= 3 && R.r.indexOf(t.txt) === 0)) alts.push(R.term);
    });
    if (alts.length) t.alts = alts;
  }
  function parseQuery(q) {
    var out = { terms: [], neg: [], types: null, where: [], label: null, raw: q };
    var re = /(-?)(?:"([^"]+)"|\$([^$]+)\$|(\S+))/g, m;
    while ((m = re.exec(q))) {
      var neg = !!m[1], phrase = m[2], tex = m[3], word = m[4];
      if (word && !neg) {
        var fm = /^(type|t|in|label|l):(.*)$/i.exec(word);
        if (fm) {
          var key = fm[1].toLowerCase(), val = fm[2];
          if (key === 'type' || key === 't') {
            out.types = (out.types || []).concat(val.split(/[,|]/).filter(Boolean).map(function (v) {
              v = v.toLowerCase(); return C.TYPE_ALIASES[v] || C.TYPE_ALIASES[fm[2]] || v;
            }));
            if (out.types.indexOf('theorem') >= 0 && val.indexOf('!') < 0) { /* 定理のみ */ }
          } else if (key === 'in') out.where.push(Core.normalizeText(val));
          else out.label = val.toLowerCase();
          continue;
        }
      }
      var t;
      if (tex != null) t = { kind: 'tex', s: tex, tex: norm(tex) };
      else if (phrase != null) t = { kind: 'text', s: phrase, txt: fold(phrase), txtC: fold(phrase, true) };
      else {
        var texlike = /[\\^_{}]/.test(word);
        t = { kind: texlike ? 'tex' : 'text', s: word, txt: fold(word), txtC: fold(word, true), tex: norm(word) };
      }
      addAlts(t);
      (neg ? out.neg : out.terms).push(t);
    }
    return out;
  }

  function fieldsCS(r) {
    if (!r._cs) r._cs = { nt: fold(r.rawT, true), nb: fold(r.rawB, true), ni: r.rawI.map(function (x) { return fold(x, true); }), pt: fold(r.rawP, true) };
    return r._cs;
  }
  function countOcc(hay, needle) {
    if (!needle) return 0;
    var c = 0, i = hay.indexOf(needle);
    while (i >= 0 && c < 20) { c++; i = hay.indexOf(needle, i + needle.length); }
    return c;
  }

  function scoreTerm(r, t) {
    var s = 0;
    if (t.kind === 'tex') {
      if (r.ntm.indexOf(t.tex) >= 0) s += 9;
      var c = countOcc(r.nm, t.tex);
      if (c) s += 4 + Math.log(1 + c);
      if (t.txt && !/[\\^_{}]/.test(t.s)) { // 英単語を数式扱いした場合の保険
        if (r.nt.indexOf(t.txt) >= 0) s += 8;
        if (r.nb.indexOf(t.txt) >= 0) s += 1;
      }
      return s;
    }
    var cs = !!(t.cs);
    var best = scoreWord(r, cs ? t.txtC : t.txt, cs);
    (t.alts || []).forEach(function (a) { best = Math.max(best, 0.95 * scoreWord(r, fold(a, cs), cs)); });
    return best;
  }
  function scoreWord(r, w, cs) {
    if (!w) return 0;
    var s = 0, F = cs ? fieldsCS(r) : r;
    // 索引語（用語索引に載っている語）との一致を重く見る
    for (var k = 0; k < F.ni.length; k++) {
      if (F.ni[k] === w || F.ni[k].split(' ')[0] === w || F.ni[k].split(' ').slice(1).join(' ') === w) { s += 14; break; }
      if (F.ni[k].indexOf(w) >= 0) { s += 7; break; }
    }
    if (F.nt.indexOf(w) >= 0) { s += 10; if (F.nt.trim() === w) s += 6; else if (F.nt.indexOf(w) === 0) s += 2; }
    if (!cs && r.nl.indexOf(w) >= 0) s += 6;
    var cb = countOcc(F.nb, w);
    if (cb) s += 1.5 + Math.log(1 + cb);
    if (F.pt.indexOf(w) >= 0) s += 1.2;
    if (/^[a-z]{2,}$/.test(w) && (r.nm.indexOf('\\' + w) >= 0 || r.ntm.indexOf(w) >= 0)) s += 1.5;
    return s;
  }

  function filterOk(r, pq) {
    if (pq.types && pq.types.indexOf(r.e.t) < 0) return false;
    for (var i = 0; i < pq.where.length; i++) if (r.where.indexOf(pq.where[i]) < 0) return false;
    if (pq.dirs && pq.dirs.length && !pq.dirs.some(function (d) { return (r.pg.path || '').indexOf(d) === 0; })) return false;
    if (pq.label && r.nl.indexOf(pq.label) !== 0) return false;
    for (var j = 0; j < pq.neg.length; j++) if (scoreTerm(r, pq.neg[j]) > 0) return false;
    return true;
  }

  function bigrams(s) {
    var out = {}; s = s.replace(/\s+/g, '');
    for (var i = 0; i < s.length - 1; i++) out[s.substr(i, 2)] = 1;
    return out;
  }
  function dice(a, b) {
    var ka = Object.keys(a), kb = Object.keys(b); if (!ka.length || !kb.length) return 0;
    var inter = 0; ka.forEach(function (k) { if (b[k]) inter++; });
    return 2 * inter / (ka.length + kb.length);
  }

  /*
   * search(query, opts)
   *   query: 文字列（上級者向けの書式も可）または
   *          { q: キーワード, exact: 完全一致, tex: 数式, exclude: 除外語, types: [...], dirs: [フォルダのパス...] }
   */
  function buildQuery(query) {
    if (typeof query === 'string' || query == null) return parseQuery(query || '');
    var q = query.q || '';
    var pq = query.exact && q.trim() ? parseQuery('"' + q.replace(/"/g, '') + '"') : parseQuery(q);
    if (query.tex && query.tex.trim()) {
      var t = query.tex.trim().replace(/^\$+|\$+$/g, '');
      pq.terms.push({ kind: 'tex', s: t, tex: norm(t) });
    }
    (query.exclude || '').split(/[\s　]+/).filter(Boolean).forEach(function (w) {
      pq.neg.push({ kind: /[\\^_{}]/.test(w) ? 'tex' : 'text', s: w, txt: fold(w), txtC: fold(w, true), tex: norm(w) });
    });
    if (query.types && query.types.length) pq.types = (pq.types || []).concat(query.types);
    if (query.dirs && query.dirs.length) pq.dirs = query.dirs.slice();
    if (query.mode === 'any') pq.mode = 'any';
    if (query.cs) {
      pq.cs = true;
      pq.terms.concat(pq.neg).forEach(function (t) { t.cs = true; });
    }
    return pq;
  }

  function search(query, opts) {
    opts = opts || {};
    var pq = buildQuery(query);
    var rows = prepare();
    var hasFilter = pq.types || pq.where.length || pq.label || (pq.dirs && pq.dirs.length);
    if (!pq.terms.length && !hasFilter) return { results: [], pq: pq, fuzzy: false };
    var res = [];
    var anyMode = pq.mode === 'any';
    rows.forEach(function (r) {
      if (!filterOk(r, pq)) return;
      var total = 0, hits = 0;
      for (var i = 0; i < pq.terms.length; i++) {
        var s = scoreTerm(r, pq.terms[i]);
        if (s <= 0) { if (anyMode) continue; return; }
        total += s; hits++;
      }
      if (anyMode && pq.terms.length && !hits) return;
      if (anyMode) total *= 1 + hits;   // 多くの語に一致するものを上に
      if (!pq.terms.length) total = 1;
      if (r.e.l) total += 0.3;
      total *= TYPE_WEIGHT[r.e.t] || 1;
      res.push({ r: r, s: total });
    });
    var fuzzy = false;
    if (!res.length && pq.terms.length) {
      // あいまい検索（文字 bigram の Dice 係数）
      fuzzy = true;
      var qb = bigrams(pq.terms.map(function (t) { return t.txt || t.s; }).join(''));
      rows.forEach(function (r) {
        if (!filterOk(r, pq)) return;
        var d = Math.max(dice(qb, bigrams(r.nt)), 0.8 * dice(qb, bigrams(r.nl)));
        if (d > 0.34) res.push({ r: r, s: d * (TYPE_WEIGHT[r.e.t] || 1) });
      });
    }
    // 現在のページの結果を一番上に
    res.forEach(function (x) { x.here = !!CUR_PAGE && x.r.pg.path === CUR_PAGE; });
    res.sort(function (a, b) { return (b.here - a.here) || (b.s - a.s) || (a.r.e.p - b.r.e.p); });
    return { results: res.slice(0, opts.limit || 60), total: res.length, pq: pq, fuzzy: fuzzy };
  }

  /* ---------- 結果の描画 ---------- */
  var katexOpts = { throwOnError: false, macros: Object.assign({}, C.KATEX_MACROS), strict: 'ignore' };
  function tex(s, display) {
    try { return katex.renderToString(s, Object.assign({ displayMode: !!display }, katexOpts)); }
    catch (e) { return Core.escapeHtml(s); }
  }
  // 検索語を（大文字小文字の設定・ひらがな/カタカナの違い・読みの別表記を考慮して）探す正規表現
  function termRegex(terms, cs) {
    var parts = [];
    terms.forEach(function (w) {
      if (!w) return;
      var p = '';
      for (var i = 0; i < w.length; i++) {
        var c = w.charAt(i), code = w.charCodeAt(i);
        if (code >= 0x3041 && code <= 0x3096) p += '[' + c + String.fromCharCode(code + 0x60) + ']';
        else if (code >= 0x30a1 && code <= 0x30f6) p += '[' + String.fromCharCode(code - 0x60) + c + ']';
        else p += c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      parts.push(p);
    });
    if (!parts.length) return null;
    parts.sort(function (a, b) { return b.length - a.length; });
    return new RegExp('(' + parts.join('|') + ')', cs ? 'g' : 'gi');
  }
  function textTerms(pq) {
    var out = [];
    pq.terms.forEach(function (t) {
      if (t.kind !== 'text' || !t.s) return;
      out.push(t.s.normalize ? t.s.normalize('NFKC') : t.s);
      (t.alts || []).forEach(function (a) { out.push(a); });
    });
    return out;
  }
  function highlight(text, pq) {
    var html = Core.escapeHtml(text);
    var re = termRegex(textTerms(pq).map(Core.escapeHtml), !!pq.cs);
    return re ? html.replace(re, '<mark>$1</mark>') : html;
  }
  function renderInlineTitle(s, pq) {
    var ex = Core.extractMath(s || '');
    var parts = ex.text.split(/(\d+)/);
    var html = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 0) html += highlight(parts[i].replace(/\d+/g, '…'), pq);
      else html += tex(ex.maths[+parts[i]].tex, false);
    }
    return html;
  }

  function refText(label) {
    var L = IDX.labels[label];
    if (!L) return '??';
    if (L.t === 'equation') return '(' + L.n + ')';
    if (L.t === 'section' || L.t === 'page') return L.ti;
    return typeName(L.t) + ' ' + L.n;
  }

  function snippet(r, pq, budget) {
    budget = budget || 170;
    var ex = Core.extractMath(r.e.x || '');
    var text = Core.stripMarkdown(ex.text);
    var toks = [], re = /(\d+)|(\d+)/g, last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) toks.push({ k: 't', s: text.slice(last, m.index) });
      if (m[1] != null) toks.push({ k: 'm', m: ex.maths[+m[1]] });
      else toks.push({ k: 't', s: refText(ex.refs[+m[2]].label) });
      last = m.index + m[0].length;
    }
    if (last < text.length) toks.push({ k: 't', s: text.slice(last) });
    toks.forEach(function (t) { if (t.k === 't') t.s = t.s.replace(/\s+/g, ' '); });
    // 最初にヒットしたトークンを探す
    var hit = 0, found = false;
    for (var i = 0; i < toks.length && !found; i++) {
      var tk = toks[i];
      for (var j = 0; j < pq.terms.length; j++) {
        var t = pq.terms[j];
        if (tk.k === 't' && t.txt && (fold(tk.s).indexOf(t.txt) >= 0 || (t.alts || []).some(function (a) { return fold(tk.s).indexOf(fold(a)) >= 0; }))) { hit = i; found = true; break; }
        if (tk.k === 'm' && t.tex && norm(tk.m.tex).indexOf(t.tex) >= 0) { hit = i; found = true; break; }
      }
    }
    function len(t) { return t.k === 't' ? t.s.length : Math.min(60, t.m.tex.length * 0.5); }
    var from = hit, to = hit, used = len(toks[hit] || { k: 't', s: '' });
    while (used < budget && (from > 0 || to < toks.length - 1)) {
      if (from > 0 && (hit - from) < 2) { from--; used += len(toks[from]); }
      else if (to < toks.length - 1) { to++; used += len(toks[to]); }
      else if (from > 0) { from--; used += len(toks[from]); }
    }
    var html = from > 0 ? '… ' : '';
    for (var k = from; k <= to && k < toks.length; k++) {
      var tk2 = toks[k];
      if (tk2.k === 't') {
        var s = tk2.s;
        if (k === hit && s.length > budget) {
          var t0 = pq.terms[0] && pq.terms[0].txt, pos = t0 ? Math.max(0, fold(s).indexOf(t0)) : 0;
          var st = Math.max(0, pos - 50); s = (st > 0 ? '…' : '') + s.slice(st, st + budget);
        } else if (k !== hit && s.length > 90) s = (k < hit ? '…' + s.slice(-80) : s.slice(0, 80) + '…');
        html += highlight(s, pq);
      } else {
        var isHit = pq.terms.some(function (t) { return t.tex && norm(tk2.m.tex).indexOf(t.tex) >= 0; });
        var mt = tk2.m.tex.replace(/\\tag\{[^}]*\}/g, '');
        html += '<span class="mn-snip-math' + (isHit ? ' mn-hit' : '') + '">' + tex(mt.length > 260 ? mt.slice(0, 0) + '\\cdots' : mt, false) + '</span>';
      }
    }
    if (to < toks.length - 1) html += ' …';
    return html;
  }

  function resultHref(r, root) {
    var e = r.e, pg = r.pg;
    var a = e.a || e.l || '';
    return root + pg.path + (a ? '#' + a : '');
  }

  function renderResult(item, pq, root, active) {
    var r = item.r, e = r.e, pg = r.pg;
    var badge = typeName(e.t) + (e.n ? ' ' + e.n : '');
    var title;
    if (e.t === 'page') title = '§' + pg.sec + ' ' + renderInlineTitle(pg.title, pq);
    else if ((C.ENVIRONMENTS[e.t] || {}).attached && !e.ti) {
      title = e.of ? typeName(e.of.t) + ' ' + e.of.n + (e.of.ti ? '（' + renderInlineTitle(e.of.ti, pq) + '）' : '') + ' の' + typeName(e.t) : typeName(e.t);
    } else title = e.ti ? renderInlineTitle(e.ti, pq) : (e.h ? renderInlineTitle(e.h, pq) : '');
    var crumb = Core.escapeHtml(pg.subj || '') + ' › §' + pg.sec + ' ' + renderInlineTitle(pg.title || '', { terms: [] });
    return '<a class="mn-result' + (active ? ' is-active' : '') + '" href="' + Core.escapeHtml(resultHref(r, root)) + '">' +
      '<div class="mn-result-top"><span class="mn-badge" data-type="' + e.t + '">' + Core.escapeHtml(badge) + '</span>' +
      '<span class="mn-result-title">' + title + '</span>' + (item.here ? '<span class="mn-here">このページ</span>' : '') +
      (e.l ? '<span class="mn-result-label">' + Core.escapeHtml(e.l) + '</span>' : '') + '</div>' +
      '<div class="mn-result-where">' + crumb + '</div>' +
      '<div class="mn-result-snip">' + snippet(r, pq) + '</div></a>';
  }

  /* ---------- 検索フォーム（モーダルと検索ページで共通） ---------- */
  var TYPE_CHIPS = [
    ['definition', '定義'], ['theorem', '定理'], ['proposition', '命題'], ['lemma', '補題'], ['corollary', '系'],
    ['proof', '証明'], ['example', '例'], ['supplement', '補足・注意'], ['counterexample', '反例'], ['problem', '問題'],
    ['equation', '式'], ['page', 'ページ']
  ];
  function root() { return document.body.getAttribute('data-root') || ''; }

  /* ---------- 検索用の本文（search-index.js）の遅延読み込み ---------- */
  // site-index.js には本文を入れず、検索を開いたとき（またはページ表示の少し後）に読み込む。
  var entriesState = (IDX.entries && IDX.entries.length) ? 2 : 0, entriesWaiters = [];
  function loadEntries(cb) {
    if (entriesState === 2) { if (cb) cb(); return; }
    if (cb) entriesWaiters.push(cb);
    if (entriesState === 1) return;
    entriesState = 1;
    var sc = document.createElement('script');
    sc.src = root() + 'search-index.js';
    sc.onload = function () {
      var M = window.MATH_INDEX || {};
      IDX.entries = M.entries || [];
      entriesState = 2; prepared = null; READINGS = null;
      entriesWaiters.splice(0).forEach(function (f) { try { f(); } catch (e) {} });
    };
    sc.onerror = function () { entriesState = 0; };
    document.head.appendChild(sc);
  }
  function entriesReady() { return entriesState === 2; }
  window.MathEntries = { load: loadEntries, ready: entriesReady };
  // ページの表示が落ち着いてから先読みしておく
  (function prefetch() {
    var go = function () { loadEntries(); };
    if (window.requestIdleCallback) window.addEventListener('load', function () { requestIdleCallback(go, { timeout: 4000 }); });
    else window.addEventListener('load', function () { setTimeout(go, 1500); });
  })();
  var LOADING_HTML = '<div class="mn-search-empty">検索用の索引を読み込んでいます…</div>';
  // 日本語入力（IME）で変換を確定するための Enter かどうか。
  // isComposing（多くのブラウザ）、keyCode 229（Safari など）、変換確定の直後（compositionend から少しの間）を見る。
  var lastCompositionEnd = 0;
  document.addEventListener('compositionend', function () { lastCompositionEnd = Date.now(); }, true);
  function isImeEnter(ev) {
    return ev.isComposing || ev.keyCode === 229 || Date.now() - lastCompositionEnd < 80;
  }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* ---------- 分野の選択（階層メニュー） ----------
   * 広い画面：macOS のメニューのように、項目にマウスを乗せると右に子メニューが開く。
   * 狭い画面：1 階層ずつ表示し、「‹ 戻る」で上の階層へ。
   * 子をもつ分野を選ぶときは、子メニュー先頭の「〇〇 全体」を選ぶ。 */
  var DIRS = {};   // path -> {node, parent}
  (function walk(n, parent) {
    (n.c || []).forEach(function (c) { if (c.k === 'd' && !c.x) { DIRS[c.path] = { node: c, parent: parent }; walk(c, c); } });
  })(IDX.tree || { c: [] }, null);
  function hasPagesAny(n) { return (n.c || []).some(function (c) { return c.k !== 'd' || hasPagesAny(c); }); }
  function subdirs(n) { return ((n && n.c) || []).filter(function (c) { return c.k === 'd' && !c.x && hasPagesAny(c); }); }
  function dirLabel(path) {
    if (!path || !DIRS[path]) return 'すべての分野';
    var names = [], d = DIRS[path];
    while (d) { names.unshift(d.node.title); d = d.parent ? DIRS[d.parent.path] : null; }
    return names.join(' › ');
  }
  var NARROW = window.matchMedia ? matchMedia('(max-width: 640px)') : { matches: false };

  function createDirPicker(host, onChange) {
    var value = '';
    host.innerHTML = '<button type="button" class="mn-dirpick-btn" aria-haspopup="tree" aria-expanded="false">' +
      '<span class="mn-dirpick-label">すべての分野</span><span class="mn-dirpick-caret" aria-hidden="true">▾</span></button>';
    var btn = host.querySelector('button'), labelEl = host.querySelector('.mn-dirpick-label');
    var menu = document.createElement('div');
    menu.className = 'mn-menu'; menu.hidden = true;
    document.body.appendChild(menu);
    var esc = Core.escapeHtml;
    function isNarrow() { return NARROW.matches; }
    function ancestorsOf(path) {
      var chain = [], d = DIRS[path];
      while (d) { chain.unshift(d.node); d = d.parent ? DIRS[d.parent.path] : null; }
      return chain;
    }

    /* ===== 広い画面：カスケードメニュー（クリックで選択、カーソルで子を横に展開） ===== */
    var path = [], hoverTimer = null;
    function itemHtml(n, depth) {
      var kids = subdirs(n);
      var inPath = value && (value === n.path || value.indexOf(n.path) === 0);
      return '<button type="button" role="menuitem" class="mn-menu-item' + (kids.length ? ' has-sub' : '') +
        (value === n.path ? ' is-current' : (inPath ? ' is-ancestor' : '')) + (path[depth] === n ? ' is-open' : '') +
        '" data-path="' + esc(n.path) + '" data-depth="' + depth + '">' +
        '<span class="mn-menu-text">' + esc(n.title) + '</span>' + (kids.length ? '<span class="mn-menu-chev" aria-hidden="true">›</span>' : '') + '</button>';
    }
    function columnHtml(parent, depth) {
      var head = parent ? '' : '<button type="button" role="menuitem" class="mn-menu-item mn-menu-all' + (!value ? ' is-current' : '') +
        '" data-select="" data-depth="0"><span class="mn-menu-text">すべての分野</span></button><div class="mn-menu-sep"></div>';
      return '<div class="mn-menu-col" role="menu" data-depth="' + depth + '">' + head +
        subdirs(parent || IDX.tree).map(function (n) { return itemHtml(n, depth); }).join('') + '</div>';
    }
    function renderCascade() {
      var cols = [columnHtml(null, 0)];
      path.forEach(function (n, i) { cols.push(columnHtml(n, i + 1)); });
      var firstOpen = !menu.classList.contains('mn-menu--cascade');
      var fa = document.activeElement, focusPath = fa && menu.contains(fa) ? fa.getAttribute('data-path') : null;
      var prevHTML = [].slice.call(menu.querySelectorAll('.mn-menu-col')).map(function (c) { return c.getAttribute('data-key'); });
      menu.className = 'mn-menu mn-menu--cascade';
      menu.innerHTML = cols.join('');
      // 新しく開いた列だけをふわっと出す（開き直しでない列は動かさない）
      [].slice.call(menu.querySelectorAll('.mn-menu-col')).forEach(function (c, k) {
        var key = k === 0 ? 'root' : path[k - 1].path;
        c.setAttribute('data-key', key);
        if (firstOpen || prevHTML[k] !== key) c.classList.add('is-new');
      });
      layoutCascade();
      if (focusPath) { var f = menu.querySelector('.mn-menu-item[data-path="' + focusPath + '"]'); if (f) f.focus({ preventScroll: true }); }
    }
    // 子メニューは、開いた項目がその中ほどに来る高さに置く（下にだけ伸びると、斜めに動かしたとき閉じてしまうため）
    function layoutCascade() {
      var r = btn.getBoundingClientRect();
      var top0 = Math.min(r.bottom + 4, window.innerHeight - 160);
      menu.style.left = Math.max(8, r.left) + 'px'; menu.style.top = top0 + 'px'; menu.style.right = 'auto';
      var cols = [].slice.call(menu.querySelectorAll('.mn-menu-col')), x = 0, prevTop = 0;
      cols.forEach(function (c, k) {
        c.style.left = x + 'px';
        var top = 0;
        if (k > 0) {
          // 子メニューは開いた項目の高さから始め、カーソルが外れないよう項目の約半分だけ上にはみ出させる
          var it = cols[k - 1].querySelector('.is-open');
          var itTop = it ? prevTop + it.offsetTop - cols[k - 1].scrollTop : prevTop;
          var itH = it ? it.offsetHeight : 32, h = c.offsetHeight;
          top = itTop - 6 - Math.round(itH * 0.5);
          top = Math.min(top, window.innerHeight - 8 - top0 - h);  // 下にはみ出すときだけ上へずらす
          top = Math.max(top, 8 - top0);                          // 画面の上にははみ出さない
        }
        c.style.top = top + 'px';
        prevTop = top;
        x += c.offsetWidth + 4;
      });
      // 右にはみ出すなら全体を左へ
      var over = menu.getBoundingClientRect().left + x - window.innerWidth + 8;
      if (over > 0) menu.style.left = Math.max(8, parseFloat(menu.style.left) - over) + 'px';
    }
    function openSub(it) {
      var depth = +it.getAttribute('data-depth'), n = DIRS[it.getAttribute('data-path')].node;
      if (path[depth] === n && path.length === depth + 1) return;
      path = path.slice(0, depth).concat(subdirs(n).length ? [n] : []);
      renderCascade();
    }
    menu.addEventListener('mouseover', function (ev) {
      if (isNarrow()) return;
      var it = ev.target.closest('.mn-menu-item');
      if (!it) return;
      clearTimeout(hoverTimer);
      var depth = +it.getAttribute('data-depth');
      // すでに開いている子メニューへ向かって斜めに動く途中で、別の項目をかすめても切り替わらないよう少し待つ
      hoverTimer = setTimeout(function () {
        if (it.hasAttribute('data-path')) openSub(it);
        else if (path.length > depth) { path = path.slice(0, depth); renderCascade(); }
      }, path.length > depth ? 220 : 60);
    });
    menu.addEventListener('mouseleave', function () { clearTimeout(hoverTimer); });

    /* ===== 狭い画面：下に展開するツリー（左の ▸ で展開、名前で選択。同じ階層で開けるのは 1 つ） ===== */
    var openSet = {}, filterText = '';
    var CHEV = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function hasPages(n) { return (n.c || []).some(function (c) { return c.k !== 'd' || hasPages(c); }); }
    function treeRows(n, depth) {
      return subdirs(n).map(function (c) {
        var kids = subdirs(c), open = !!openSet[c.path];
        return '<div class="mn-tree-row' + (value === c.path ? ' is-current' : '') + (hasPages(c) ? '' : ' is-empty') + '" style="--depth:' + depth + '">' +
          (kids.length ? '<button type="button" class="mn-tree-exp' + (open ? ' is-open' : '') + '" data-expand="' + esc(c.path) +
            '" aria-expanded="' + open + '" aria-label="' + esc(c.title) + ' を展開">' + CHEV + '</button>'
            : '<span class="mn-tree-spacer" aria-hidden="true"></span>') +
          '<button type="button" class="mn-tree-pick" data-select="' + esc(c.path) + '">' + esc(c.title) + '</button></div>' +
          (kids.length && open ? '<div class="mn-tree-kids">' + treeRows(c, depth + 1) + '</div>' : '');
      }).join('');
    }
    function filterRows() {
      var q = fold(filterText.trim()), out = [];
      Object.keys(DIRS).forEach(function (p) {
        var t = DIRS[p].node.title;
        if (fold(t).indexOf(q) >= 0 || fold(DIRS[p].node.en || '').indexOf(q) >= 0) out.push(p);
      });
      if (!out.length) return '<div class="mn-tree-none">該当する分野がありません</div>';
      return out.map(function (p) {
        return '<div class="mn-tree-row' + (value === p ? ' is-current' : '') + '" style="--depth:0"><button type="button" class="mn-tree-pick" data-select="' + esc(p) + '">' +
          '<span class="mn-tree-path">' + esc(dirLabel(p).split(' › ').slice(0, -1).join(' › ')) + '</span>' + esc(DIRS[p].node.title) + '</button></div>';
      }).join('');
    }
    function renderTree(keepFilterFocus) {
      menu.className = 'mn-menu mn-menu--tree';
      if (!menu.querySelector('.mn-tree-filter')) {
        menu.innerHTML = '<div class="mn-tree-panel is-new"><input type="search" class="mn-tree-filter" placeholder="分野名で絞り込む" aria-label="分野名で絞り込む">' +
          '<div class="mn-tree-list"></div></div>';
        menu.querySelector('.mn-tree-filter').addEventListener('input', function (e) { filterText = e.target.value; renderTree(true); });
      }
      var list = menu.querySelector('.mn-tree-list');
      list.innerHTML = filterText.trim() ? filterRows() :
        '<div class="mn-tree-row' + (!value ? ' is-current' : '') + '" style="--depth:0"><span class="mn-tree-spacer" aria-hidden="true"></span><button type="button" class="mn-tree-pick mn-tree-all" data-select="">すべての分野</button></div>' +
        treeRows(IDX.tree, 0);
      var r = btn.getBoundingClientRect();
      menu.style.left = '8px'; menu.style.right = '8px';
      menu.style.top = (r.bottom + 4) + 'px';
      menu.style.maxHeight = Math.max(200, window.innerHeight - r.bottom - 12) + 'px';
    }
    function toggleExpand(p) {
      var n = DIRS[p].node, parent = DIRS[p].parent;
      if (openSet[p]) { Object.keys(openSet).forEach(function (k) { if (k.indexOf(p) === 0) delete openSet[k]; }); }
      else {
        // 同じ階層で開いているもの（とその子孫）を閉じる
        subdirs(parent || IDX.tree).forEach(function (sib) {
          Object.keys(openSet).forEach(function (k) { if (k.indexOf(sib.path) === 0) delete openSet[k]; });
        });
        openSet[n.path] = true;
      }
      renderTree();
      // 開いた子の一覧を下へ滑らかに展開
      var btnEl = menu.querySelector('[data-expand="' + p.replace(/"/g, '\\"') + '"]');
      if (btnEl) {   // 描き直した直後に旧状態→新状態へ切り替え、▸ の回転を見せる
        btnEl.classList.toggle('is-open', !openSet[p]); void btnEl.offsetWidth; btnEl.classList.toggle('is-open', !!openSet[p]);
      }
      var kids = btnEl && btnEl.parentNode.nextElementSibling;
      if (openSet[p] && kids && kids.classList.contains('mn-tree-kids') && kids.animate &&
          !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        var h = kids.offsetHeight;
        kids.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: Math.min(380, 200 + h * 0.3), easing: 'cubic-bezier(.22,.61,.36,1)' });
      }
    }

    /* ===== 共通 ===== */
    function open() {
      if (isNarrow()) {
        openSet = {}; filterText = '';
        if (value) ancestorsOf(value).forEach(function (n) { if (subdirs(n).length && n.path !== value) openSet[n.path] = true; });
        menu.innerHTML = '';
        menu.hidden = false; renderTree();
        var cur = menu.querySelector('.mn-tree-row.is-current');
        if (cur) cur.scrollIntoView({ block: 'center' });
      } else {
        path = value ? ancestorsOf(value).filter(function (n) { return n.path !== value && subdirs(n).length; }) : [];
        menu.className = 'mn-menu'; menu.hidden = false; renderCascade();
        var c = menu.querySelector('.is-current') || menu.querySelector('.mn-menu-item');
        if (c) c.focus({ preventScroll: true });
      }
      btn.setAttribute('aria-expanded', 'true');
    }
    function close(refocus) {
      if (menu.hidden) return;
      clearTimeout(hoverTimer);
      menu.hidden = true; btn.setAttribute('aria-expanded', 'false');
      if (refocus) btn.focus();
    }
    function select(v) {
      value = v; labelEl.textContent = dirLabel(v); btn.classList.toggle('is-set', !!v);
      close(true); onChange();
    }
    btn.addEventListener('click', function () { if (menu.hidden) open(); else close(); });
    menu.addEventListener('click', function (ev) {
      var ex = ev.target.closest('[data-expand]');
      if (ex) { toggleExpand(ex.getAttribute('data-expand')); return; }
      var pick = ev.target.closest('[data-select]');
      if (pick) { select(pick.getAttribute('data-select')); return; }
      var it = ev.target.closest('.mn-menu-item[data-path]');
      if (it) select(it.getAttribute('data-path'));   // 広い画面：クリックでその分野を選ぶ
    });
    menu.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); ev.stopPropagation(); close(true); return; }
      if (isNarrow()) return;
      var it = document.activeElement;
      if (!it || !menu.contains(it) || !it.classList.contains('mn-menu-item')) return;
      var col = it.closest('.mn-menu-col'), items = [].slice.call(col.querySelectorAll('.mn-menu-item')), i = items.indexOf(it);
      if (ev.key === 'ArrowDown') { ev.preventDefault(); items[(i + 1) % items.length].focus(); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (ev.key === 'ArrowRight' && it.classList.contains('has-sub')) {
        ev.preventDefault(); openSub(it);
        var f = menu.querySelector('.mn-menu-col:last-child .mn-menu-item'); if (f) f.focus();
      } else if (ev.key === 'ArrowLeft' && path.length) {
        ev.preventDefault(); var d = path.length - 1; path.pop(); renderCascade();
        var b = menu.querySelector('.mn-menu-col[data-depth="' + d + '"] .mn-menu-item[data-path="' + (it.closest('.mn-menu-col') ? '' : '') + '"]');
        var back = menu.querySelector('.mn-menu-col[data-depth="' + d + '"] .is-ancestor, .mn-menu-col[data-depth="' + d + '"] .mn-menu-item');
        if (back) back.focus();
      } else if (ev.key === 'Enter') { ev.preventDefault(); it.click(); }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && !menu.hidden) { ev.preventDefault(); ev.stopPropagation(); close(true); }
    }, true);
    document.addEventListener('mousedown', function (ev) { if (!menu.hidden && !menu.contains(ev.target) && !host.contains(ev.target)) close(); });
    document.addEventListener('touchstart', function (ev) { if (!menu.hidden && !menu.contains(ev.target) && !host.contains(ev.target)) close(); }, { passive: true });
    window.addEventListener('resize', function () { if (!menu.hidden) { if (isNarrow()) renderTree(); else renderCascade(); } });
    return { get: function () { return value; }, set: function (v) { value = DIRS[v] ? v : ''; labelEl.textContent = dirLabel(value); btn.classList.toggle('is-set', !!value); } };
  }

  // 「条件を指定」の開閉。モーダル（結果の表示部分が狭い）は既定で閉じ、検索ページは広い画面で既定で開く。
  // 開閉はそれぞれ別に覚える。
  function moreKey(id) { return id === 'modal' ? 'mn-sform-open-modal' : 'mn-sform-open'; }
  function moreOpen(id) {
    var s = store(moreKey(id));
    if (s != null) return s === '1';
    if (id === 'modal') return false;
    return !(window.matchMedia && matchMedia('(max-width: 640px)').matches);
  }
  function formHtml(id) {
    return '<form class="mn-sform" role="search" autocomplete="off" onsubmit="return false">' +
      '<div class="mn-sform-main">' +
        '<span class="mn-sform-icon"><svg class="mn-ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></span>' +
        '<input class="mn-sform-q" type="search" name="q" placeholder="キーワード（例：コンパクト、べきしゅうごう、Tychonoff）" aria-label="キーワード" spellcheck="false">' +
        '<button type="button" class="mn-sform-go" title="検索結果のページを開く">検索</button>' +
      '</div>' +
      '<div class="mn-sform-hint"><kbd>Enter</kbd> か「検索」で結果のページへ。↑↓ で結果を選び <kbd>Shift</kbd>+<kbd>Enter</kbd> でその項目を開く</div>' +
      '<details class="mn-sform-more" data-kind="' + id + '"' + (moreOpen(id) ? ' open' : '') + '>' +
        '<summary>条件を指定</summary>' +
        '<div class="mn-sform-grid">' +
          '<div class="mn-field"><span class="mn-field-label">分野</span><div class="mn-dirpick"></div></div>' +
          '<label class="mn-field"><span class="mn-field-label">数式を含む</span><input name="tex" type="text" placeholder="例：\\pi_1(S^1)、\\otimes" spellcheck="false"></label>' +
          '<label class="mn-field"><span class="mn-field-label">除外する語</span><input name="exclude" type="text" placeholder="スペース区切り" spellcheck="false"></label>' +
          '<div class="mn-field"><span class="mn-field-label">複数の語を入れたとき</span><div class="mn-seg" role="radiogroup">' +
            '<button type="button" class="mn-seg-btn is-on" data-mode="all" role="radio" aria-checked="true">すべて含む</button>' +
            '<button type="button" class="mn-seg-btn" data-mode="any" role="radio" aria-checked="false">いずれかを含む</button></div></div>' +
          '<div class="mn-checks"><label class="mn-check"><input type="checkbox" name="exact"> 語句を完全一致で探す</label>' +
          '<label class="mn-check"><input type="checkbox" name="cs"> 英字の大文字・小文字を区別する</label></div>' +
        '</div>' +
        '<div class="mn-tex-preview" aria-live="polite"></div>' +
        '<fieldset class="mn-chips"><legend>種類</legend>' +
          '<button type="button" class="mn-chip is-on" data-type="">すべて</button>' +
          TYPE_CHIPS.map(function (t) { return '<button type="button" class="mn-chip" data-type="' + t[0] + '" aria-pressed="false">' + t[1] + '</button>'; }).join('') +
        '</fieldset>' +
      '</details>' +
    '</form>';
  }

  // フォームを初期化し、読み取り関数などを返す
  function bindForm(form, onChange) {
    var q = form.querySelector('[name=q]'), tex = form.querySelector('[name=tex]'),
      ex = form.querySelector('[name=exclude]'), exact = form.querySelector('[name=exact]'), csBox = form.querySelector('[name=cs]'),
      pv = form.querySelector('.mn-tex-preview'),
      more = form.querySelector('.mn-sform-more');
    var chips = [].slice.call(form.querySelectorAll('.mn-chip'));
    var dir = createDirPicker(form.querySelector('.mn-dirpick'), onChange);
    var segs = [].slice.call(form.querySelectorAll('.mn-seg-btn')), mode = 'all';
    function setMode(m) {
      mode = m === 'any' ? 'any' : 'all';
      segs.forEach(function (b) { var on = b.getAttribute('data-mode') === mode; b.classList.toggle('is-on', on); b.setAttribute('aria-checked', on); });
    }
    segs.forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-mode')); onChange(); }); });
    var timer;
    function fire() { clearTimeout(timer); timer = setTimeout(onChange, 100); }
    function preview() {
      var t = tex.value.trim().replace(/^\$+|\$+$/g, '');
      pv.innerHTML = t ? '<span class="mn-tex-preview-label">プレビュー</span> ' + renderTexSafe(t) : '';
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        if (!c.getAttribute('data-type')) chips.forEach(function (x) { x.classList.toggle('is-on', x === c); x.setAttribute('aria-pressed', x === c); });
        else {
          c.classList.toggle('is-on');
          c.setAttribute('aria-pressed', c.classList.contains('is-on'));
          var any = chips.some(function (x) { return x.getAttribute('data-type') && x.classList.contains('is-on'); });
          chips[0].classList.toggle('is-on', !any);
        }
        onChange();
      });
    });
    [q, tex, ex].forEach(function (i) { i.addEventListener('input', fire); });
    tex.addEventListener('input', preview);
    exact.addEventListener('change', onChange);
    csBox.addEventListener('change', onChange);
    more.addEventListener('toggle', function () { store(moreKey(more.getAttribute('data-kind')), more.open ? '1' : '0'); });
    return {
      q: q, go: form.querySelector('.mn-sform-go'),
      read: function () {
        return {
          q: q.value, tex: tex.value, exclude: ex.value, exact: exact.checked, cs: csBox.checked, mode: mode,
          dirs: dir.get() ? [dir.get()] : [],
          types: chips.filter(function (x) { return x.getAttribute('data-type') && x.classList.contains('is-on'); })
            .map(function (x) { return x.getAttribute('data-type'); })
        };
      },
      write: function (v) {
        q.value = v.q || ''; tex.value = v.tex || ''; ex.value = v.exclude || ''; exact.checked = !!v.exact; csBox.checked = !!v.cs;
        dir.set((v.dirs && v.dirs[0]) || '');
        setMode(v.mode);
        var ts = v.types || [];
        chips.forEach(function (x) { var t = x.getAttribute('data-type'); x.classList.toggle('is-on', t ? ts.indexOf(t) >= 0 : !ts.length); });
        preview();
      },
      isEmpty: function (v) { return !(v.q.trim() || v.tex.trim() || v.types.length || v.dirs.length); }
    };
  }
  function renderTexSafe(t) {
    try { return katex.renderToString(t, { throwOnError: true, macros: Object.assign({}, C.KATEX_MACROS), strict: 'ignore' }); }
    catch (e) { return '<span class="mn-tex-preview-err">数式として解釈できません</span>'; }
  }
  function toParams(v) {
    var p = new URLSearchParams();
    if (v.q) p.set('q', v.q); if (v.tex) p.set('tex', v.tex); if (v.exclude) p.set('ex', v.exclude);
    if (v.exact) p.set('exact', '1'); if (v.types.length) p.set('type', v.types.join(','));
    if (v.dirs.length) p.set('in', v.dirs[0]);
    if (v.mode === 'any') p.set('mode', 'any');
    if (v.cs) p.set('cs', '1');
    return p.toString();
  }
  function fromParams(sp) {
    return { q: sp.get('q') || '', tex: sp.get('tex') || '', exclude: sp.get('ex') || '', exact: sp.get('exact') === '1',
      types: (sp.get('type') || '').split(',').filter(Boolean), dirs: sp.get('in') ? [sp.get('in')] : [], mode: sp.get('mode') || 'all', cs: sp.get('cs') === '1' };
  }

  var EMPTY_HELP = '<div class="mn-search-help">' +
    '<p><b>キーワード</b>に定理名や用語を入れると、定義・定理・本文と<a href="' + (document.body.getAttribute('data-root') || '') + 'glossary.html">用語索引</a>から探します。英語名（例：Tychonoff）でも見つかります。' +
    'スペースで区切って複数の語を入れられます（「すべての語を含む」か「いずれかの語を含む」を選べます）。</p>' +
    '<p><b>数式を含む</b>には LaTeX で数式を書きます（例：<code>\\pi_1(S^1)</code>）。空白や括弧の付け方、<code>\\le</code> と <code>\\leq</code> などの違いは気にしなくて大丈夫です。</p>' +
    '<p><b>種類</b>のボタンで「定理だけ」「定義だけ」のように絞り込めます（複数選択可）。</p>' +
    '<p>日本語は<b>ふりがな</b>でも探せます（例：「べきしゅうごう」で「冪集合」）。いま開いているページの結果は一番上に出ます。</p>' +
    '<p class="mn-search-kbd"><kbd>/</kbd> でどこからでも検索、<kbd>↑</kbd><kbd>↓</kbd> で選んで <kbd>Shift</kbd>+<kbd>Enter</kbd> で開きます。<kbd>Enter</kbd> か「検索」ボタンで検索結果のページに移ります（漢字変換の確定の <kbd>Enter</kbd> には反応しません）。</p></div>';

  /* ---------- 移動先で検索語を目立たせるための受け渡し ---------- */
  var lastPQ = null;
  function rememberHighlight(href) {
    if (!lastPQ) return;
    var texs = lastPQ.terms.filter(function (t) { return t.kind === 'tex'; }).map(function (t) { return t.tex; });
    try {
      sessionStorage.setItem('mn-hl', JSON.stringify({ terms: textTerms(lastPQ), tex: texs, cs: !!lastPQ.cs, t: Date.now() }));
    } catch (e) {}
  }
  function go(a) {
    if (!a) return;
    rememberHighlight();
    var href = a.getAttribute('href');
    var target = new URL(href, location.href);
    if (target.pathname === location.pathname) {
      if (target.hash === location.hash && window.MathSiteRefresh) window.MathSiteRefresh();
      else location.hash = target.hash;   // hashchange で強調される
      return;
    }
    location.href = href;
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a.mn-result');
    if (!a) return;
    rememberHighlight();
    var target = new URL(a.getAttribute('href'), location.href);
    if (target.pathname === location.pathname && target.hash === location.hash && window.MathSiteRefresh) {
      setTimeout(window.MathSiteRefresh, 0);
    }
  }, true);

  /* ---------- モーダル ---------- */
  var modal, form, list, sel = 0;
  function ensureModal() {
    if (modal) return;
    modal = document.createElement('div');
    modal.className = 'mn-search-modal';
    modal.setAttribute('hidden', '');
    modal.innerHTML = '<div class="mn-search-backdrop"></div>' +
      '<div class="mn-search-panel" role="dialog" aria-modal="true" aria-label="サイト内検索">' +
        '<div class="mn-search-head"><span class="mn-search-title">サイト内検索</span>' +
        '<button type="button" class="mn-iconbtn mn-search-close" aria-label="閉じる">✕</button></div>' +
        formHtml('modal') +
        '<div class="mn-search-results" role="listbox"></div>' +
      '</div>';
    document.body.appendChild(modal);
    list = modal.querySelector('.mn-search-results');
    form = bindForm(modal.querySelector('form'), update);
    modal.querySelector('.mn-search-backdrop').addEventListener('click', close);
    modal.querySelector('.mn-search-close').addEventListener('click', close);
    modal.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); close(); }
      else if ((ev.key === 'ArrowDown' || ev.key === 'ArrowUp') && modal.querySelector('form').contains(ev.target) &&
               !(ev.target.closest && ev.target.closest('.mn-dirpick'))) { ev.preventDefault(); move(ev.key === 'ArrowDown' ? 1 : -1); }
      else if (ev.key === 'Enter' && ev.shiftKey && !isImeEnter(ev) && modal.querySelector('form').contains(ev.target)) {
        // フォームのどこにフォーカスがあっても Shift+Enter で選んだ結果を開く
        ev.preventDefault(); go(list.querySelectorAll('.mn-result')[sel]); close();
      }
      else if (ev.key === 'Enter' && ev.target.tagName === 'INPUT') {
        if (isImeEnter(ev)) return;   // 漢字変換の確定には反応しない
        // Enter：検索結果のページへ。Shift+Enter：選択中の結果を開く
        ev.preventDefault();
        if (ev.shiftKey) { go(list.querySelectorAll('.mn-result')[sel]); close(); }
        else form.go.click();
      }
    });
    // 「検索」ボタン：入力中の条件で検索結果のページ（search.html）に移る
    form.go.addEventListener('click', function () { var p = toParams(form.read()); location.href = root() + 'search.html' + (p ? '?' + p : ''); });
    list.addEventListener('click', function (ev) { if (ev.target.closest('a')) close(); });
  }
  function move(d) {
    var items = list.querySelectorAll('.mn-result');
    if (!items.length) return;
    if (items[sel]) items[sel].classList.remove('is-active');
    sel = (sel + d + items.length) % items.length;
    items[sel].classList.add('is-active');
    items[sel].scrollIntoView({ block: 'nearest' });
  }
  function resultsHtml(out, limitNote, moreHref) {
    if (!out.results.length) return '<div class="mn-search-empty">該当する項目が見つかりませんでした。語を減らすか、条件を外してみてください。</div>';
    return '<div class="mn-search-count">' + out.total + ' 件' + (out.fuzzy ? '（完全に一致するものがないため、近い候補を表示）' : '') + '</div>' +
      out.results.map(function (it, i) { return renderResult(it, out.pq, root(), i === 0 && limitNote); }).join('') +
      (moreHref && out.total > out.results.length ? '<a class="mn-search-more" href="' + moreHref + '">検索ページで全 ' + out.total + ' 件を見る</a>' : '');
  }
  function update() {
    var v = form.read();
    sel = 0;
    if (form.isEmpty(v)) { list.innerHTML = EMPTY_HELP; return; }
    if (!entriesReady()) { list.innerHTML = LOADING_HTML; loadEntries(update); return; }
    var out = search(v, { limit: 30 });
    lastPQ = out.pq;
    list.innerHTML = resultsHtml(out, true, root() + 'search.html?' + toParams(v));
  }
  var lastFocus = null;
  function open(v) {
    ensureModal();
    lastFocus = document.activeElement;
    modal.removeAttribute('hidden');
    document.documentElement.classList.add('mn-lock');
    if (v) form.write(typeof v === 'string' ? { q: v } : v);
    update();
    setTimeout(function () { form.q.focus(); form.q.select(); }, 10);
  }
  function close() {
    if (!modal || modal.hasAttribute('hidden')) return;
    modal.setAttribute('hidden', '');
    document.documentElement.classList.remove('mn-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape' && modal && !modal.hasAttribute('hidden') && !modal.contains(ev.target)) { close(); return; }
    var t = ev.target, typing = t && (/INPUT|TEXTAREA|SELECT/.test(t.tagName) || t.isContentEditable);
    if ((ev.key === 'k' && (ev.metaKey || ev.ctrlKey)) || (ev.key === '/' && !typing)) { ev.preventDefault(); open(); }
  });

  /* ---------- 検索ページ（search.html） ---------- */
  function renderSearchPage(container) {
    container.innerHTML = formHtml('page') + '<div class="mn-search-results mn-search-results--page"></div>';
    var res = container.querySelector('.mn-search-results');
    var f = bindForm(container.querySelector('form'), run);
    f.write(fromParams(new URLSearchParams(location.search)));
    function run() {
      var v = f.read();
      if (!f.isEmpty(v) && !entriesReady()) { res.innerHTML = LOADING_HTML; loadEntries(run); return; }
      if (f.isEmpty(v)) res.innerHTML = EMPTY_HELP;
      else { var out = search(v, { limit: 300 }); lastPQ = out.pq; res.innerHTML = resultsHtml(out, false, null); }
      if (typeof psel !== 'undefined') { psel = 0; pmark(); }
      try { history.replaceState(null, '', location.pathname + (toParams(v) ? '?' + toParams(v) : '')); } catch (e) {}
    }
    run();
    f.q.focus();
    // キー操作（小窓と同じ）：フォームのどこにフォーカスがあっても
    //   ↑↓ で結果を選び、Shift+Enter で選んだ結果を開く。入力欄の Enter は検索し直す。
    var psel = 0;
    function pitems() { return res.querySelectorAll('.mn-result'); }
    function pmark() {
      var items = pitems();
      [].forEach.call(items, function (it, k) { it.classList.toggle('is-active', k === psel); });
      return items;
    }
    function pmove(d) {
      var items = pitems();
      if (!items.length) return;
      psel = (psel + d + items.length) % items.length;
      pmark();
      items[psel].scrollIntoView({ block: 'nearest' });
    }
    pmark();
    var form0 = container.querySelector('form');
    container.addEventListener('keydown', function (ev) {
      var inForm = form0.contains(ev.target);
      if (!inForm) return;
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        if (ev.target.closest && ev.target.closest('.mn-dirpick')) return;   // 分野の選択メニューは自分で↑↓を使う
        ev.preventDefault(); pmove(ev.key === 'ArrowDown' ? 1 : -1); return;
      }
      if (ev.key !== 'Enter' || isImeEnter(ev)) return;   // 漢字変換の確定には反応しない
      if (ev.shiftKey) { ev.preventDefault(); go(pitems()[psel] || pitems()[0]); return; }
      if (ev.target.tagName === 'INPUT') { ev.preventDefault(); f.go.click(); }
    });
    // 検索ページの「検索」ボタン：結果は入力に合わせて更新済みなので、検索し直して結果の先頭へ移る
    f.go.addEventListener('click', function () {
      run();
      // 検索したことが分かるように、件数の表示を一瞬強調して結果の先頭へ移る
      var c = res.querySelector('.mn-search-count');
      if (c) { c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }
      if (res.scrollIntoView) res.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  window.MathSearch = { search: search, open: open, close: close, parseQuery: parseQuery, renderSearchPage: renderSearchPage, termRegex: termRegex, normTex: norm };
})();
