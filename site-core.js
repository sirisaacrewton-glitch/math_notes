/*
 * site-core.js — ページ原稿（Markdown + 数式 + 定理環境）の解析・番号付け・描画の中核。
 * ブラウザ（site.js）とビルドスクリプト（tools/build.js）が同じコードを使うので、
 * 定理番号はどちらで計算しても一致する。
 *
 * 原稿の書式は AUTHORING.md を参照。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MathCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var MATH_OPEN = '', MATH_CLOSE = '';
  var REF_OPEN = '', REF_CLOSE = '';
  var DISPLAY_ENVS = ['equation', 'equation*', 'align', 'align*', 'gather', 'gather*',
    'multline', 'multline*', 'eqnarray', 'eqnarray*', 'alignat', 'alignat*', 'CD'];
  var REF_CMDS = ['ref', 'eqref', 'nameref', 'numref', 'fullref'];

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------------ *
   * 属性 {#label .cls keywords="..."} の解析
   * ------------------------------------------------------------------ */
  var ATTR_RE = /\s*(\{(?:#|\.|[A-Za-z_-]+=)(?:[^{}"]|"[^"]*")*\})\s*$/;
  function parseAttrs(s) {
    var out = { label: null, classes: [], keywords: '' };
    if (!s) return out;
    s = s.replace(/^\{|\}$/g, '');
    var re = /#([^\s#.{}="]+)|\.([A-Za-z0-9_-]+)|([A-Za-z_-]+)="([^"]*)"/g, m;
    while ((m = re.exec(s))) {
      if (m[1]) out.label = m[1];
      else if (m[2]) out.classes.push(m[2]);
      else if (m[3]) out[m[3]] = m[4];
    }
    return out;
  }
  function splitTitleAttrs(rest) {
    var m = ATTR_RE.exec(rest || '');
    if (!m) return { title: (rest || '').trim(), attrs: parseAttrs('') };
    return { title: rest.slice(0, m.index).trim(), attrs: parseAttrs(m[1]) };
  }

  /* ------------------------------------------------------------------ *
   * ブロック構造の解析
   *   ::: theorem タイトル {#label keywords="..."}
   *   本文
   *   :::
   * ------------------------------------------------------------------ */
  var OPEN_RE = /^\s{0,3}(:{3,})\s*([A-Za-z]+)\b\s*(.*?)\s*$/;
  var CLOSE_RE = /^\s{0,3}:{3,}\s*$/;
  var FENCE_RE = /^\s{0,3}(```+|~~~+)/;

  function parseBlocks(src) {
    src = String(src || '').replace(/\r\n?/g, '\n');
    var lines = src.split('\n');
    var rootNode = { kind: 'root', children: [], rawLines: [] };
    var stack = [rootNode];
    var page = { title: '', label: null, keywords: '' };
    var mdBuf = [];
    var inFence = null;
    var titleFound = false;

    function top() { return stack[stack.length - 1]; }
    function flush() {
      if (mdBuf.length) {
        var text = mdBuf.join('\n');
        if (text.trim()) top().children.push({ kind: 'md', text: text });
        mdBuf = [];
      }
    }
    function pushRaw(line) {
      for (var i = 1; i < stack.length; i++) stack[i].rawLines.push(line);
    }

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      var fm = FENCE_RE.exec(line);
      if (inFence) {
        if (fm && fm[1].charAt(0) === inFence.charAt(0) && fm[1].length >= inFence.length &&
            /^\s*(```+|~~~+)\s*$/.test(line)) inFence = null;
        mdBuf.push(line); pushRaw(line); continue;
      }
      if (fm) { inFence = fm[1]; mdBuf.push(line); pushRaw(line); continue; }

      if (!titleFound && stack.length === 1) {
        var tm = /^#\s+(.+?)\s*$/.exec(line);
        if (tm) {
          var ta = splitTitleAttrs(tm[1]);
          page.title = ta.title; page.label = ta.attrs.label; page.keywords = ta.attrs.keywords || '';
          titleFound = true; continue;
        }
      }
      var om = OPEN_RE.exec(line);
      if (om) {
        flush();
        var sp = splitTitleAttrs(om[3]);
        pushRaw(line);
        var node = {
          kind: 'env', type: om[2].toLowerCase(), title: sp.title,
          label: sp.attrs.label, keywords: sp.attrs.keywords || '',
          attrs: sp.attrs, children: [], rawLines: [], line: i + 1
        };
        top().children.push(node);
        stack.push(node);
        continue;
      }
      if (CLOSE_RE.test(line) && stack.length > 1) {
        flush();
        var closed = stack.pop();
        closed.raw = closed.rawLines.join('\n');
        delete closed.rawLines;
        pushRaw(line);
        continue;
      }
      mdBuf.push(line); pushRaw(line);
    }
    flush();
    var unclosed = [];
    while (stack.length > 1) {
      var n = stack.pop(); n.raw = n.rawLines.join('\n'); delete n.rawLines; unclosed.push(n);
    }
    return { page: page, children: rootNode.children, unclosed: unclosed };
  }

  /* ------------------------------------------------------------------ *
   * 数式・参照の抽出（Markdown に壊されないよう退避する）
   * ------------------------------------------------------------------ */
  function findClosing(s, from, token) {
    var i = from;
    while (i < s.length) {
      var j = s.indexOf(token, i);
      if (j < 0) return -1;
      // 直前のバックスラッシュの個数が奇数ならエスケープ
      var k = j - 1, bs = 0;
      while (k >= 0 && s.charAt(k) === '\\') { bs++; k--; }
      if (bs % 2 === 0 || token.charAt(0) === '\\') return j;
      i = j + 1;
    }
    return -1;
  }

  function extractMath(text) {
    var maths = [], refs = [], index = [], out = '';
    var s = String(text), i = 0, n = s.length;
    var lineStart = true;
    while (i < n) {
      var c = s.charAt(i);
      // コードブロック
      if (lineStart) {
        var fm = /^\s{0,3}(```+|~~~+)[^\n]*\n?/.exec(s.slice(i));
        if (fm) {
          var fence = fm[1];
          var endRe = new RegExp('\\n\\s{0,3}' + fence.charAt(0).replace(/[~`]/, '\\$&') + '{' + fence.length + ',}\\s*(\\n|$)');
          var rest = s.slice(i + fm[0].length - 1);
          var em = endRe.exec(rest);
          var endIdx = em ? i + fm[0].length - 1 + em.index + em[0].length : n;
          out += s.slice(i, endIdx); i = endIdx; lineStart = true; continue;
        }
      }
      lineStart = false;
      if (c === '\n') { out += c; i++; lineStart = true; continue; }
      // インラインコード
      if (c === '`') {
        var m = /^`+/.exec(s.slice(i))[0];
        var close = s.indexOf(m, i + m.length);
        if (close > 0) { out += s.slice(i, close + m.length); i = close + m.length; continue; }
        out += m; i += m.length; continue;
      }
      if (c === '\\') {
        var nx = s.charAt(i + 1);
        if (nx === '$') { out += '\\$'; i += 2; continue; }
        if (nx === '[' || nx === '(') {
          var tok = nx === '[' ? '\\]' : '\\)';
          var e = s.indexOf(tok, i + 2);
          if (e > 0) {
            pushMath(s.slice(i + 2, e), nx === '[');
            i = e + 2; continue;
          }
        }
        var bm = /^\\begin\{([A-Za-z*]+)\}/.exec(s.slice(i, i + 40));
        if (bm && DISPLAY_ENVS.indexOf(bm[1]) >= 0) {
          var endTok = '\\end{' + bm[1] + '}';
          var e2 = s.indexOf(endTok, i);
          if (e2 > 0) { pushMath(s.slice(i, e2 + endTok.length), true); i = e2 + endTok.length; continue; }
        }
        var im = /^\\index\{([^{}]+)\}/.exec(s.slice(i, i + 200));
        if (im) {
          var parts = im[1].split('|');
          index.push({ term: parts[0].trim(), reading: (parts[1] || '').trim() });
          i += im[0].length; continue;
        }
        var rm = /^\\(ref|eqref|nameref|numref|fullref)(?:\[([^\]]*)\])?\{([^{}]+)\}/.exec(s.slice(i, i + 300));
        if (rm) {
          refs.push({ cmd: rm[1], label: rm[3].trim(), text: rm[2] != null ? rm[2].trim() : null });
          out += REF_OPEN + (refs.length - 1) + REF_CLOSE;
          i += rm[0].length; continue;
        }
        out += c + nx; i += 2; continue;
      }
      if (c === '$') {
        if (s.charAt(i + 1) === '$') {
          var e3 = findClosing(s, i + 2, '$$');
          if (e3 > 0) { pushMath(s.slice(i + 2, e3), true); i = e3 + 2; continue; }
          out += '$$'; i += 2; continue;
        }
        var e4 = findClosing(s, i + 1, '$');
        // 空行をまたぐインライン数式は認めない
        if (e4 > 0 && !/\n\s*\n/.test(s.slice(i + 1, e4))) {
          pushMath(s.slice(i + 1, e4), false); i = e4 + 1; continue;
        }
        out += '$'; i++; continue;
      }
      out += c; i++;
    }
    return { text: out, maths: maths, refs: refs, index: index };

    function pushMath(tex, display) {
      var label = null;
      if (display) {
        var lm = /\\label\{([^{}]+)\}/.exec(tex);
        if (lm) { label = lm[1].trim(); tex = tex.replace(lm[0], ''); }
      }
      maths.push({ tex: tex, display: display, label: label });
      out += MATH_OPEN + (maths.length - 1) + MATH_CLOSE;
    }
  }

  /* ------------------------------------------------------------------ *
   * 番号付け：ページ内の番号付き環境と \label 付きディスプレイ数式に
   * 共通のカウンタ「節番号.通し番号」を振る
   * ------------------------------------------------------------------ */
  var HEADING_LABEL_RE = /^\s{0,3}(#{2,6})\s+(.*?)\s*\{#([^\s{}]+)\}\s*$/;

  function numberTree(parsed, secnum, envs) {
    var counter = 0, labels = [], byLabel = {};
    function walk(nodes, parentEnv, inAttached) {
      var lastNumbered = null;
      nodes.forEach(function (node) {
        if (node.kind === 'md') {
          var ex = node._ex || (node._ex = extractMath(node.text));
          ex.maths.forEach(function (m) {
            if (m.label) {
              counter++;
              m.num = secnum ? secnum + '.' + counter : String(counter);
              labels.push({ label: m.label, type: 'equation', num: m.num, title: '', tex: m.tex, env: parentEnv });
            }
          });
          // 見出しラベル
          var inF = false;
          node.text.split('\n').forEach(function (ln) {
            if (FENCE_RE.test(ln)) inF = !inF;
            if (inF) return;
            var hm = HEADING_LABEL_RE.exec(ln);
            if (hm) labels.push({ label: hm[3], type: 'section', num: '', title: hm[2], level: hm[1].length });
          });
        } else if (node.kind === 'env') {
          while (envs[node.type] && envs[node.type].alias) node.type = envs[node.type].alias;
          var def = envs[node.type] || { num: false };
          if (node.type === 'restate') {
            // 同じページの先に述べた主張を、同じ番号で再掲する
            var tl = (node.attrs && node.attrs.ref) || node.title;
            node.target = byLabel[tl] || null;
            node.targetLabel = tl;
            if (node.target) lastNumbered = node.target;
            return;
          }
          if (def.num && !inAttached) {
            counter++;
            node.num = secnum ? secnum + '.' + counter : String(counter);
            lastNumbered = node;
          } else if (def.attached) {
            node.of = lastNumbered || parentEnv;
          }
          if (node.label) {
            byLabel[node.label] = node;
            labels.push({ label: node.label, type: node.type, num: node.num || '', title: node.title,
              keywords: node.keywords, node: node });
          }
          var nextParent = (def.num && !inAttached) ? node : (def.attached ? (node.of || parentEnv) : parentEnv);
          walk(node.children, nextParent, inAttached || !!def.attached);
        }
      });
    }
    walk(parsed.children, null, false);
    return labels;
  }

  /* ------------------------------------------------------------------ *
   * 検索用テキスト処理
   * ------------------------------------------------------------------ */
  function stripMarkdown(s) {
    return String(s)
      .replace(/^\s{0,3}:{3,}.*$/gm, ' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, ' ')
      .replace(/[*_]{1,3}(\S[^*_]*?)[*_]{1,3}/g, '$1')
      .replace(/^\s{0,3}#{1,6}\s+/gm, '')
      .replace(/\{#[^}]*\}/g, '')
      .replace(/^\s*[-+*]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '')
      .replace(/\|/g, ' ');
  }

  function normalizeText(s) {
    s = String(s || '');
    if (s.normalize) s = s.normalize('NFKC');
    return s.toLowerCase().replace(/\s+/g, ' ');
  }

  // 同義語の正規表現は作るのに時間がかかるので、同義語の表ごとに 1 回だけ作って使い回す
  var _synFor = null, _synRe = null;
  function synonymRegexes(synonyms) {
    if (_synFor !== synonyms) {
      _synFor = synonyms;
      _synRe = synonyms.map(function (p) {
        return [new RegExp(p[0].replace(/[\\{}|]/g, '\\$&') + '(?![A-Za-z])', 'g'), p[1]];
      });
    }
    return _synRe;
  }
  function normalizeTex(tex, synonyms, macros) {
    var s = String(tex || '');
    if (s.normalize) s = s.normalize('NFKC');
    // 装飾・空白の除去
    s = s.replace(/\\(left|right|big|Big|bigg|Bigg)(l|r|m)?(?![A-Za-z])/g, '')
      .replace(/\\(displaystyle|textstyle|scriptstyle|limits|nolimits)(?![A-Za-z])/g, '')
      .replace(/\\[,;:! ]/g, '').replace(/\\q?quad(?![A-Za-z])/g, '').replace(/~/g, '');
    // マクロ展開（引数なしのもののみ）
    if (macros) {
      s = s.replace(/\\[A-Za-z]+/g, function (m) {
        var v = macros[m];
        return (v && v.indexOf('#') < 0) ? v : m;
      });
    }
    // \operatorname{Hom}, \mathrm{d} などは中身だけにする
    s = s.replace(/\\(operatorname\*?|mathrm|text|textrm|textup|mbox|mathit|textit)\s*\{([^{}]*)\}/g, '$2');
    // 同義語
    if (synonyms) {
      synonymRegexes(synonyms).forEach(function (p) { s = s.replace(p[0], p[1]); });
    }
    s = s.replace(/\s+/g, '');
    // 1 文字・1 コマンドだけを囲む波括弧を外す: a_{n} -> a_n
    var prev;
    do { prev = s; s = s.replace(/\{(\\[A-Za-z]+|[^{}\\])\}/g, '$1'); } while (s !== prev);
    return s;
  }

  // 生の原稿テキストを「本文テキスト」と「数式の配列」に分ける
  function splitForSearch(raw) {
    var ex = extractMath(raw);
    var text = ex.text.replace(new RegExp(MATH_OPEN + '(\\d+)' + MATH_CLOSE, 'g'), ' ')
      .replace(new RegExp(REF_OPEN + '(\\d+)' + REF_CLOSE, 'g'), ' ');
    return { text: stripMarkdown(text), maths: ex.maths.map(function (m) { return m.tex; }) };
  }

  /* ------------------------------------------------------------------ *
   * 描画（marked と katex を注入して使う）
   * ------------------------------------------------------------------ */
  function createRenderer(opts) {
    var marked = opts.marked, katex = opts.katex, macros = opts.macros || {};
    var envs = opts.envs;
    var resolve = opts.resolveRef || function () { return null; };
    var onMathError = opts.onMathError || function () {};
    var headingCount = 0, envCount = 0;

    var mk = new marked.Marked({ gfm: true, breaks: false });
    mk.use({
      renderer: {
        heading: function (tok) {
          var html = this.parser.parseInline(tok.tokens);
          var id = null;
          var m = /\s*\{#([^\s{}]+)\}\s*$/.exec(html);
          if (m) { id = m[1]; html = html.slice(0, m.index); }
          if (!id) id = 'sec-' + (++headingCount);
          return '<h' + tok.depth + ' id="' + escapeHtml(id) + '" class="mn-h">' + html +
            '<a class="mn-anchor" href="#' + escapeHtml(id) + '" aria-label="この見出しへのリンク">#</a></h' + tok.depth + '>\n';
        },
        // コードブロック：```svg（図）と ```python（プログラムの表示）を特別に扱う
        code: function (tok) {
          var info = String(tok.lang || '').trim(), lang = info.split(/\s+/)[0].toLowerCase();
          var caption = info.slice(lang.length).trim();
          if (lang === 'svg') return figureHtml(tok.text, caption);
          if (lang === 'python' || lang === 'py') return pythonHtml(tok.text, caption);
          return false;   // それ以外は marked の既定の描画
        }
      }
    });

    // 図（インライン SVG）。原稿に書けるのは SVG の図形だけにし、スクリプトなどは取り除く。
    function sanitizeSvg(src) {
      var t = String(src);
      t = t.replace(/<\s*(script|foreignObject|iframe|object|embed|style)[\s\S]*?<\s*\/\s*\1\s*>/gi, '');
      t = t.replace(/<\s*(script|foreignObject|iframe|object|embed|style)[^>]*\/?>/gi, '');
      t = t.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
      t = t.replace(/(href|xlink:href)\s*=\s*("\s*javascript:[^"]*"|'\s*javascript:[^']*')/gi, '');
      var a = t.search(/<svg[\s>]/i), b = t.lastIndexOf('</svg>');
      if (a < 0 || b < a) return '';
      return t.slice(a, b + 6);
    }
    function figureHtml(src, caption) {
      var svg = sanitizeSvg(src);
      if (!svg) return '<pre><code>' + escapeHtml(src) + '</code></pre>';
      return '<figure class="mn-fig">' + svg + (caption ? '<figcaption>' + renderInline(caption) + '</figcaption>' : '') + '</figure>\n';
    }
    // Python 風の表示（キーワード・コメント・数の簡単な色分けだけ）
    var PY_KW = /^(for|while|if|elif|else|in|range|def|return|and|or|not|pass|break|True|False|None)$/;
    function pythonHtml(src, caption) {
      var out = '', re = /(#[^\n]*)|([A-Za-z_][A-Za-z_0-9]*)|(\d+)|([\s\S])/g, m;
      while ((m = re.exec(src))) {
        if (m[1]) out += '<span class="mn-tok-com">' + escapeHtml(m[1]) + '</span>';
        else if (m[2]) out += PY_KW.test(m[2]) ? '<span class="mn-tok-kw">' + m[2] + '</span>' : escapeHtml(m[2]);
        else if (m[3]) out += '<span class="mn-tok-num">' + m[3] + '</span>';
        else out += escapeHtml(m[4]);
      }
      return '<figure class="mn-code">' + (caption ? '<figcaption>' + renderInline(caption) + '</figcaption>' : '') +
        '<pre class="mn-code-py"><code>' + out.replace(/\n$/, '') + '</code></pre></figure>\n';
    }

    function renderTex(m) {
      var tex = m.tex;
      if (m.display && m.num) tex = tex + '\\tag{' + m.num + '}';
      try {
        var html = katex.renderToString(tex, {
          displayMode: m.display, throwOnError: true, macros: Object.assign({}, macros),
          strict: 'ignore', trust: false
        });
        if (m.display && m.label) html = '<span class="mn-eq-anchor" id="' + escapeHtml(m.label) + '"></span>' + html;
        return html;
      } catch (err) {
        onMathError(err, m);
        return '<span class="mn-math-error" title="' + escapeHtml(err.message) + '">' + escapeHtml(tex) + '</span>';
      }
    }

    function renderRef(r) {
      var info = resolve(r.label, r);
      if (!info) {
        if (r.text) return '<span class="mn-xref-planned" data-label="' + escapeHtml(r.label) + '" title="未執筆（ラベル ' + escapeHtml(r.label) + '）">' + renderInline(r.text) + '</span>';
        return '<span class="mn-ref-missing" title="未定義のラベル">??' + escapeHtml(r.label) + '</span>';
      }
      if (info.planned) {
        return '<span class="mn-xref-planned" data-label="' + escapeHtml(r.label) + '" title="未執筆（ラベル ' + escapeHtml(r.label) + '）。書かれると自動でリンクになります">' +
          renderInline(r.text || info.title || r.label) + '</span>';
      }
      var text;
      var tname = info.typeName || '';
      if (r.cmd === 'eqref') text = '(' + info.num + ')';
      else if (r.cmd === 'numref') text = info.num || info.title;
      else if (r.cmd === 'nameref') text = info.title || (tname + ' ' + info.num);
      else if (r.cmd === 'fullref') text = (info.prefix || '') + tname + ' ' + info.num + (info.title ? '（' + info.title + '）' : '');
      else if (r.text) text = r.text;
      else if (!info.num && info.type !== 'equation' && info.type !== 'section' && info.type !== 'page') text = info.title || tname;
      else {
        if (info.type === 'equation') text = '(' + info.num + ')';
        else if (info.type === 'section' || info.type === 'page') text = info.title;
        else text = (info.prefix || '') + tname + ' ' + info.num;
      }
      var titleHtml = /[$\\]/.test(text) ? renderInline(text) : escapeHtml(text);
      return '<a class="mn-xref' + (info.external ? ' mn-xref--ext' : '') +
        '" data-type="' + escapeHtml(info.type) + '" href="' + escapeHtml(info.href) + '" data-label="' + escapeHtml(r.label) + '">' + titleHtml + '</a>';
    }

    function restore(html, ex) {
      html = html.replace(new RegExp(MATH_OPEN + '(\\d+)' + MATH_CLOSE, 'g'), function (_, k) {
        return renderTex(ex.maths[+k]);
      });
      html = html.replace(new RegExp(REF_OPEN + '(\\d+)' + REF_CLOSE, 'g'), function (_, k) {
        return renderRef(ex.refs[+k]);
      });
      return html;
    }

    var SHORT = { yes: ['mn-yes', '○', '成り立つ'], no: ['mn-no', '×', '成り立たない'], partial: ['mn-partial', '△', '条件付き'], open: ['mn-partial', '?', '未解決'] };
    function shortcodes(t) {
      return t.replace(/:(yes|no|partial|open):/g, function (_, k) {
        var d = SHORT[k]; return '<span class="' + d[0] + '" title="' + d[2] + '">' + d[1] + '</span>';
      });
    }
    function renderMarkdown(text, ex) {
      ex = ex || extractMath(text);
      return restore(mk.parse(shortcodes(ex.text)), ex);
    }
    function renderInline(text) {
      var ex = extractMath(text);
      return restore(mk.parseInline(shortcodes(ex.text)), ex);
    }

    function envHead(node, def) {
      var h = '<span class="mn-env-name">' + escapeHtml(def.name) +
        (node.num ? ' <span class="mn-env-num">' + escapeHtml(node.num) + '</span>' : '') + '</span>';
      if (node.title) h += ' <span class="mn-env-title">（' + renderInline(node.title) + '）</span>';
      else if (def.attached && !def.minor && node.type !== 'hypcheck' && node.of && node.of.num) {
        var ofDef = envs[node.of.type] || { name: '' };
        h += ' <span class="mn-env-of">（' + escapeHtml(ofDef.name + ' ' + node.of.num) + '）</span>';
      }
      if (!def.fold) h += '.';
      return h;
    }

    // 「意図・直感」は直前の定義・定理などの枠の中に入れて表示する
    function renderNodes(nodes) {
      var out = [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.kind === 'env' && node.type !== 'restate' && !(envs[node.type] || {}).attached) {
          var intu = [];
          while (i + 1 < nodes.length && nodes[i + 1].kind === 'env' && nodes[i + 1].type === 'intuition') intu.push(nodes[++i]);
          node._intu = intu;
        }
        out.push(renderOne(node));
      }
      return out.join('');
    }
    function renderOne(node) {
      {
        if (node.kind === 'md') return renderMarkdown(node.text, node._ex);
        var def = envs[node.type] || { name: node.type, num: false, kind: 'rem' };
        envCount++;
        if (node.type === 'restate') {
          var t = node.target;
          if (!t) return '<div class="mn-env" data-kind="rem"><span class="mn-ref-missing">再掲の対象ラベル ??' + escapeHtml(node.targetLabel || '') + '</span></div>';
          var tdef = envs[t.type] || def;
          var saveH = headingCount, saveE = envCount;
          var tbody = renderNodes(t.children);
          headingCount = saveH; envCount = saveE;
          return '<div class="mn-env mn-restate" id="restate-' + escapeHtml(t.label || '') + '" data-env="' + escapeHtml(t.type) + '" data-kind="' + escapeHtml(tdef.kind) + '">' +
            '<div class="mn-env-head">' + envHead(t, tdef) + ' <span class="mn-restate-tag">再掲</span>' +
            (t.label ? ' <a class="mn-restate-back" href="#' + escapeHtml(t.label) + '">最初の主張へ ↑</a>' : '') + '</div>' +
            '<div class="mn-env-body">' + tbody + '</div></div>\n';
        }
        var id = ' id="' + escapeHtml(node.label || ('env-' + envCount)) + '"';
        var cls = 'mn-env' + (node.attrs && node.attrs.classes.length ? ' ' + node.attrs.classes.map(function (c) { return 'mn-u-' + escapeHtml(c); }).join(' ') : '');
        var labelChip = node.label ? '<button class="mn-label" data-copy="\\ref{' + escapeHtml(node.label) +
          '}" title="クリックで \\ref{' + escapeHtml(node.label) + '} をコピー">' + escapeHtml(node.label) + '</button>' : '';
        var kids = node.children, tail = [];
        if (node.type === 'proof') {
          // 末尾の「前提条件の使用箇所」は ∎ の後ろに置く
          while (kids.length && kids[kids.length - 1].kind === 'env' && kids[kids.length - 1].type === 'hypcheck') {
            tail.unshift(kids[kids.length - 1]); kids = kids.slice(0, -1);
          }
        }
        var body = renderNodes(kids);
        if (node.type === 'proof') {
          if (/<\/p>\s*$/.test(body)) body = body.replace(/<\/p>\s*$/, '<span class="mn-qed" aria-label="証明終わり">∎</span></p>\n');
          else body += '<p class="mn-qed-line"><span class="mn-qed" aria-label="証明終わり">∎</span></p>';
          body += renderNodes(tail);
        }
        var attrs = id + ' data-env="' + escapeHtml(node.type) + '" data-kind="' + escapeHtml(def.kind) + '"' + (def.minor ? ' data-minor="1"' : '');
        var back = node.label ? '<div class="mn-backrefs" data-for="' + escapeHtml(node.label) + '"></div>' : '';
        if (node._intu && node._intu.length) back = '<div class="mn-env-inner">' + node._intu.map(renderOne).join('') + '</div>' + back;
        if (def.fold) {
          return '<details class="' + cls + ' mn-fold"' + attrs + '>' +
            '<summary class="mn-env-head">' + envHead(node, def) + '<span class="mn-fold-hint" aria-hidden="true"></span>' + labelChip + '</summary>' +
            '<div class="mn-env-body">' + body + '</div>' + back + '</details>\n';
        }
        return '<div class="' + cls + '"' + attrs + '>' +
          '<div class="mn-env-head">' + envHead(node, def) + labelChip + '</div>' +
          '<div class="mn-env-body">' + body + '</div>' + back + '</div>\n';
      }
    }

    return {
      renderNodes: renderNodes, renderMarkdown: renderMarkdown, renderInline: renderInline,
      renderTex: renderTex, resetCounters: function () { headingCount = 0; envCount = 0; }
    };
  }

  return {
    parseBlocks: parseBlocks, extractMath: extractMath, numberTree: numberTree,
    createRenderer: createRenderer, splitForSearch: splitForSearch,
    normalizeText: normalizeText, normalizeTex: normalizeTex, stripMarkdown: stripMarkdown,
    escapeHtml: escapeHtml, REF_CMDS: REF_CMDS,
    MATH_OPEN: MATH_OPEN, MATH_CLOSE: MATH_CLOSE
  };
});
