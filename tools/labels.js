#!/usr/bin/env node
/*
 * tools/labels.js — ラベルとリンクの管理（検索・予定ラベル一覧・改名・名前付き参照の番号化・進捗表示）
 *
 *   node tools/labels.js status [フォルダ]         フォルダ構成とページ数（執筆の進捗）を表示
 *   node tools/labels.js find <語>                  ラベル名・表示名に <語> を含むラベルを一覧（定義済み／予定）
 *   node tools/labels.js planned [接頭辞]           未執筆の予定ラベル（表示名・参照元）を一覧
 *   node tools/labels.js uses <ラベル>              そのラベルを参照している箇所（ファイル:行）を一覧
 *   node tools/labels.js rename <旧> <新> [--dry]   ラベルを改名し、全ページの定義・参照を張り替える
 *   node tools/labels.js activate [接頭辞] [--apply]
 *        \ref[表示名]{ラベル} のうち、ラベルがもう定義済みのものを一覧。--apply で \ref{ラベル}（番号表示）に置き換える
 *
 * labels.json はビルドで作られる台帳なので、rename / activate の後は必ず node tools/build.js を実行する。
 */
'use strict';
var fs = require('fs');
var path = require('path');
var ROOT = path.resolve(__dirname, '..');
var SKIP = { vendor: 1, tools: 1, node_modules: 1, assets: 1 };
var LABEL_CH = '[A-Za-z0-9:_.\\-]';

function pages() {
  var out = [];
  (function walk(dir, depth) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
      if (e.name[0] === '.' || e.name[0] === '_') return;
      var abs = path.join(dir, e.name);
      if (e.isDirectory()) { if (!(depth === 0 && SKIP[e.name])) walk(abs, depth + 1); }
      else if (depth > 0 && /\.html$/.test(e.name) && e.name !== 'index.html') out.push(abs);
    });
  })(ROOT, 0);
  return out.sort();
}
function rel(p) { return path.relative(ROOT, p).split(path.sep).join('/'); }
function ledger() {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'labels.json'), 'utf8')).labels || {}; }
  catch (e) { console.error('labels.json がありません。先に node tools/build.js を実行してください。'); process.exit(1); }
}
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function has(flag) { return process.argv.indexOf(flag) >= 0; }
var args = process.argv.slice(2).filter(function (a) { return a.indexOf('--') !== 0; });
var cmd = args[0];

// ラベル L が現れるすべての形（定義 {#L …}、\label{L}、各種 \ref、restate の ref="L"）
function patterns(L) {
  var e = esc(L), end = '(?!' + LABEL_CH + ')';
  return [
    new RegExp('(\\{[^}\\n]*#)' + e + end, 'g'),                                   // {#L ...}
    new RegExp('(\\\\label\\{)' + e + '(?=\\})', 'g'),                               // \label{L}
    new RegExp('(\\\\(?:ref|eqref|nameref|fullref|numref)(?:\\[[^\\]\\n]*\\])?\\{)' + e + '(?=\\})', 'g'),
    new RegExp('(ref=")' + e + '(?=")', 'g')                                        // restate
  ];
}

if (cmd === 'status') {
  var base = path.join(ROOT, args[1] || '');
  (function walk(dir, depth) {
    var meta = {}; try { meta = JSON.parse(fs.readFileSync(path.join(dir, '_meta.json'), 'utf8')); } catch (e) {}
    var ents = fs.readdirSync(dir, { withFileTypes: true }).filter(function (e) { return e.name[0] !== '.' && e.name[0] !== '_'; })
      .sort(function (a, b) { return a.name.localeCompare(b.name, 'en', { numeric: true }); });
    var files = ents.filter(function (e) { return e.isFile() && /^\d.*\.html$/.test(e.name); });
    if (dir !== ROOT) console.log(new Array(depth).join('  ') + path.basename(dir) + '  「' + (meta.title || '') + '」 abbr=' + (meta.abbr || '') + '  ページ ' + files.length);
    files.forEach(function (f) {
      var src = fs.readFileSync(path.join(dir, f.name), 'utf8');
      var m = /^#\s+([^{\n]+?)\s*(?:\{#([^\s}]+)[^}\n]*\})?\s*$/m.exec(src.replace(/^[\s\S]*?id="source">/, ''));
      console.log(new Array(depth + 1).join('  ') + '- ' + f.name + '  ' + (m ? m[1] + (m[2] ? '  [' + m[2] + ']' : '') : ''));
    });
    ents.forEach(function (e) { if (e.isDirectory() && !(dir === ROOT && SKIP[e.name])) walk(path.join(dir, e.name), depth + 1); });
  })(base, 0);
} else if (cmd === 'find') {
  var q = (args[1] || '').toLowerCase(), L = ledger();
  Object.keys(L).sort().forEach(function (k) {
    var v = L[k];
    if (k.toLowerCase().indexOf(q) < 0 && String(v.title || '').toLowerCase().indexOf(q) < 0) return;
    console.log((v.status === 'defined' ? '定義 ' : '予定 ') + k + '  ' + (v.type || '') + ' ' + (v.num || '') + '  「' + (v.title || '') + '」  ' +
      (v.page || ('参照元: ' + (v.referencedFrom || []).join(', '))));
  });
} else if (cmd === 'planned') {
  var pre = args[1] || '', L2 = ledger(), n = 0;
  Object.keys(L2).sort().forEach(function (k) {
    var v = L2[k];
    if (v.status !== 'planned' || k.indexOf(pre) !== 0) return;
    n++; console.log(k + '  「' + (v.title || '（表示名なし）') + '」  ← ' + (v.referencedFrom || []).join(', '));
  });
  console.log('予定ラベル ' + n + ' 件');
} else if (cmd === 'uses') {
  var lab = args[1]; if (!lab) { console.error('ラベルを指定してください'); process.exit(1); }
  var pats = patterns(lab);
  pages().forEach(function (p) {
    fs.readFileSync(p, 'utf8').split('\n').forEach(function (ln, i) {
      if (pats.some(function (re) { re.lastIndex = 0; return re.test(ln); })) console.log(rel(p) + ':' + (i + 1) + ': ' + ln.trim().slice(0, 140));
    });
  });
} else if (cmd === 'rename') {
  var from = args[1], to = args[2], dry = has('--dry');
  if (!from || !to) { console.error('使い方: node tools/labels.js rename <旧ラベル> <新ラベル> [--dry]'); process.exit(1); }
  if (!new RegExp('^' + LABEL_CH + '+$').test(to)) { console.error('新ラベルに使えない文字があります'); process.exit(1); }
  var L3 = ledger();
  if (L3[to] && L3[to].status === 'defined') { console.error('新ラベル ' + to + ' は既に定義されています（' + L3[to].page + '）。中止しました。'); process.exit(1); }
  var total = 0;
  pages().forEach(function (p) {
    var s = fs.readFileSync(p, 'utf8'), c = 0;
    patterns(from).forEach(function (re) { s = s.replace(re, function (_, pre) { c++; return pre + to; }); });
    if (c) { total += c; console.log((dry ? '[dry] ' : '') + rel(p) + ': ' + c + ' 箇所'); if (!dry) fs.writeFileSync(p, s); }
  });
  // 手で追加した予定ラベル（manual）も改名
  var lp = path.join(ROOT, 'labels.json'), J = JSON.parse(fs.readFileSync(lp, 'utf8'));
  if (J.labels[from] && J.labels[from].manual) { if (!dry) { J.labels[to] = J.labels[from]; delete J.labels[from]; fs.writeFileSync(lp, JSON.stringify(J, null, 2) + '\n'); } console.log('labels.json の手動予定ラベルも改名'); }
  console.log((dry ? '（試行）' : '') + '合計 ' + total + ' 箇所。' + (dry ? '' : '次に node tools/build.js を実行してください。'));
} else if (cmd === 'activate') {
  var pre2 = args[1] || '', apply = has('--apply'), L4 = ledger(), cnt = 0;
  var re = new RegExp('\\\\ref\\[([^\\]\\n]*)\\]\\{(' + LABEL_CH + '+)\\}', 'g');
  pages().forEach(function (p) {
    var s = fs.readFileSync(p, 'utf8'), c = 0;
    var t = s.replace(re, function (all, text, lab) {
      var v = L4[lab];
      if (!v || v.status !== 'defined' || lab.indexOf(pre2) !== 0) return all;
      c++; cnt++;
      if (!apply) console.log(rel(p) + ': \\ref[' + text + ']{' + lab + '} → ' + v.type + ' ' + (v.num || '') + '「' + (v.title || '') + '」');
      return '\\ref{' + lab + '}';
    });
    if (apply && c) { fs.writeFileSync(p, t); console.log(rel(p) + ': ' + c + ' 箇所を番号表示に変更'); }
  });
  console.log(cnt + ' 件' + (apply ? '変更。次に node tools/build.js を実行してください。' : '（--apply で置き換え。文中で名前が必要な箇所は手で \\nameref / \\fullref に直す）'));
} else {
  console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0]);
}
