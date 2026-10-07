/*
 * config.js — サイト全体の設定（ブラウザと tools/build.js の両方から読み込まれる）
 *
 *  - SITE_TITLE     : サイト名
 *  - ENVIRONMENTS   : 定理環境の種類（表示名・番号付けの有無・CSS クラス）
 *  - KATEX_MACROS   : 全ページ共通の KaTeX マクロ
 *  - TEX_SYNONYMS   : 検索時に同一視する TeX 表記
 *
 * ここを書き換えたら `node tools/build.js` を実行してください。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.MATH_CONFIG = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*
   * 定理環境
   *   num      : 番号を付ける
   *   kind     : 色の系統（style.css の data-kind）
   *   fold     : 折りたたみ表示（既定で閉じる）
   *   attached : 直前の番号付き環境（定義・定理・問題…）に付属するブロック。番号は付かず、
   *              その中に書いた環境にも番号は付かない
   *   minor    : 本流ではない補助的な付属ブロック（小さく控えめに表示）
   *   alias    : 別名（その環境として扱う）
   */
  var ENVIRONMENTS = {
    // ── 本流（番号付き）
    axiom:          { name: '公理', num: true,  kind: 'def' },
    definition:     { name: '定義', num: true,  kind: 'def' },
    notation:       { name: '記法', num: false, kind: 'def' },
    theorem:        { name: '定理', num: true,  kind: 'thm' },
    proposition:    { name: '命題', num: true,  kind: 'thm' },
    lemma:          { name: '補題', num: true,  kind: 'thm' },
    corollary:      { name: '系',   num: true,  kind: 'thm' },
    fact:           { name: '事実', num: true,  kind: 'fact' },
    construction:   { name: '構成', num: true,  kind: 'def' },
    counterexample: { name: '反例', num: true,  kind: 'cex' },   // 反例そのものが有名・重要なときだけ独立させる
    remark:         { name: '注意', num: true,  kind: 'rem' },
    problem:        { name: '問題', num: true,  kind: 'prob' },
    table:          { name: '表',   num: true,  kind: 'tab' },
    restate:        { name: '再掲', num: false, kind: 'thm' },    // ::: restate {ref="ラベル"}：同じ番号で主張を再掲
    summary:        { name: 'まとめ', num: false, kind: 'rem' },
    // ── 付属ブロック（番号なし・折りたたみ）
    proof:          { name: '証明', num: false, kind: 'proof', fold: true, attached: true },
    solution:       { name: '解答', num: false, kind: 'proof', fold: true, attached: true },
    hypcheck:       { name: '前提条件の使用箇所', num: false, kind: 'hyp', attached: true },   // proof の中の最後に置く
    intuition:      { name: '意図・直感', num: false, kind: 'int', fold: true, attached: true, minor: true },
    example:        { name: '例', num: false, kind: 'ex', fold: true, attached: true, minor: true },
    supplement:     { name: '補足・注意', num: false, kind: 'sup', fold: true, attached: true, minor: true },
    // ── 別名（旧い書き方との互換）
    exercise:       { alias: 'problem' },
    answer:         { alias: 'solution' },
    generalization: { alias: 'supplement' },
    variation:      { alias: 'supplement' },
    viewpoint:      { alias: 'supplement' }
  };

  // 英語の別名（検索の type: フィルタ用）
  var TYPE_ALIASES = {
    thm: 'theorem', prop: 'proposition', lem: 'lemma', cor: 'corollary',
    def: 'definition', dfn: 'definition', ex: 'example', cex: 'counterexample',
    rem: 'remark', ax: 'axiom', hyp: 'hypcheck', sup: 'supplement', prob: 'problem', sol: 'solution', int: 'intuition', gen: 'supplement', var: 'supplement', eq: 'equation', page: 'page',
    sec: 'section', '定理': 'theorem', '命題': 'proposition', '補題': 'lemma',
    '系': 'corollary', '定義': 'definition', '例': 'example', '反例': 'counterexample',
    '注意': 'remark', '公理': 'axiom', '式': 'equation', '事実': 'fact', '表': 'table',
    '記法': 'notation', '構成': 'construction', '問題': 'problem', '解答': 'solution', '補足': 'supplement', '意図': 'intuition', '証明': 'proof'
  };

  var KATEX_MACROS = {
    // 数の集合
    '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}',
    '\\R': '\\mathbb{R}', '\\C': '\\mathbb{C}', '\\F': '\\mathbb{F}',
    '\\K': '\\mathbb{K}', '\\A': '\\mathbb{A}', '\\PP': '\\mathbb{P}',
    '\\bbS': '\\mathbb{S}',
    // 圏
    '\\cat': '\\mathcal{#1}', '\\Set': '\\mathbf{Set}', '\\Grp': '\\mathbf{Grp}',
    '\\Ab': '\\mathbf{Ab}', '\\Ring': '\\mathbf{Ring}', '\\CRing': '\\mathbf{CRing}',
    '\\Top': '\\mathbf{Top}', '\\Mod': '\\mathbf{Mod}', '\\Vect': '\\mathbf{Vect}',
    '\\Cat': '\\mathbf{Cat}', '\\Ch': '\\mathbf{Ch}', '\\hTop': '\\mathbf{hTop}',
    '\\CW': '\\mathbf{CW}', '\\Field': '\\mathbf{Field}',
    '\\op': '^{\\mathrm{op}}',
    // 作用素名
    '\\Hom': '\\operatorname{Hom}', '\\End': '\\operatorname{End}',
    '\\Aut': '\\operatorname{Aut}', '\\Gal': '\\operatorname{Gal}',
    '\\Ker': '\\operatorname{Ker}', '\\Coker': '\\operatorname{Coker}',
    '\\im': '\\operatorname{Im}', '\\coker': '\\operatorname{coker}',
    '\\Spec': '\\operatorname{Spec}', '\\Frac': '\\operatorname{Frac}',
    '\\Ann': '\\operatorname{Ann}', '\\rank': '\\operatorname{rank}',
    '\\id': '\\mathrm{id}', '\\Id': '\\mathrm{Id}', '\\ord': '\\operatorname{ord}',
    '\\sgn': '\\operatorname{sgn}', '\\tr': '\\operatorname{tr}',
    '\\supp': '\\operatorname{supp}', '\\cf': '\\operatorname{cf}',
    '\\dom': '\\operatorname{dom}', '\\ran': '\\operatorname{ran}',
    '\\rk': '\\operatorname{rk}', '\\Int': '\\operatorname{Int}',
    '\\Cl': '\\operatorname{Cl}', '\\diam': '\\operatorname{diam}',
    '\\colim': '\\operatorname*{colim}', '\\Th': '\\operatorname{Th}',
    '\\Mor': '\\operatorname{Mor}', '\\Ob': '\\operatorname{Ob}',
    '\\Sym': '\\operatorname{Sym}', '\\Stab': '\\operatorname{Stab}',
    '\\Orb': '\\operatorname{Orb}', '\\Fix': '\\operatorname{Fix}',
    '\\GL': '\\mathrm{GL}', '\\SL': '\\mathrm{SL}', '\\PSL': '\\mathrm{PSL}',
    '\\Tor': '\\operatorname{Tor}', '\\Ext': '\\operatorname{Ext}',
    '\\Nil': '\\operatorname{Nil}', '\\Jac': '\\operatorname{Jac}',
    '\\chr': '\\operatorname{char}', '\\lcm': '\\operatorname{lcm}',
    '\\sd': '\\operatorname{sd}', '\\Emb': '\\operatorname{Emb}',
    '\\ZFC': '\\mathsf{ZFC}', '\\ZF': '\\mathsf{ZF}', '\\PA': '\\mathsf{PA}',
    '\\Ord': '\\mathrm{Ord}', '\\Card': '\\mathrm{Card}',
    // 記号
    '\\defeq': '\\mathrel{:=}', '\\eqdef': '\\mathrel{=:}',
    '\\inv': '^{-1}', '\\restr': '\\mathord{\\upharpoonright}_{#1}',
    '\\abs': '\\left\\lvert #1 \\right\\rvert', '\\norm': '\\left\\lVert #1 \\right\\rVert',
    '\\ang': '\\left\\langle #1 \\right\\rangle', '\\set': '\\left\\{ #1 \\right\\}',
    '\\ideal': '\\trianglelefteq', '\\iso': '\\cong',
    '\\incl': '\\hookrightarrow', '\\surj': '\\twoheadrightarrow',
    '\\bd': '\\partial', '\\dd': '\\mathrm{d}',
    '\\Godel': '\\ulcorner #1 \\urcorner'
  };

  // 検索用: 左辺の TeX 表記を右辺へ正規化してから比較する
  var TEX_SYNONYMS = [
    ['\\le', '\\leq'], ['\\ge', '\\geq'], ['\\ne', '\\neq'], ['\\to', '\\rightarrow'],
    ['\\gets', '\\leftarrow'], ['\\iff', '\\Leftrightarrow'], ['\\implies', '\\Rightarrow'],
    ['\\land', '\\wedge'], ['\\lor', '\\vee'], ['\\lnot', '\\neg'],
    ['\\cdots', '\\dots'], ['\\ldots', '\\dots'], ['\\dotsc', '\\dots'], ['\\dotsb', '\\dots'],
    ['\\varepsilon', '\\epsilon'], ['\\varphi', '\\phi'], ['\\vartheta', '\\theta'],
    ['\\lbrace', '\\{'], ['\\rbrace', '\\}'], ['\\lvert', '|'], ['\\rvert', '|'],
    ['\\vert', '|'], ['\\mid', '|'], ['\\lVert', '\\|'], ['\\rVert', '\\|'],
    ['\\colon', ':'], ['\\dfrac', '\\frac'], ['\\tfrac', '\\frac'],
    ['\\bigcup', '\\cup'], ['\\bigcap', '\\cap'], ['\\bigoplus', '\\oplus'],
    ['\\bigotimes', '\\otimes'], ['\\bigsqcup', '\\sqcup'], ['\\coprod', '\\sqcup'],
    ['\\subseteq', '\\subset'], ['\\supseteq', '\\supset'], ['\\cong', '\\iso'],
    ['\\longrightarrow', '\\rightarrow'], ['\\mapsto', '\\rightarrow'],
    ['\\emptyset', '\\varnothing']
  ];

  /*
   * 広告枠。enabled を true にし、各枠に広告タグ（HTML 文字列。<script> も可）を入れる。
   * 空文字の枠は表示されない（場所も取らない）。
   *   top       : ページ上部（パンくずの下）
   *   inArticle : 本文中（## 見出し inArticleEvery 個ごとに、その見出しの直前）
   *   bottom    : 本文の最後（ページ送りの上）
   *   rail      : 右カラム（目次の下。幅の広い画面のみ）
   * minHeight は読み込み中のレイアウトのずれを防ぐための予約高さ（px）。
   */
  var ADS = {
    enabled: false,
    inArticleEvery: 3,
    minHeight: { top: 90, inArticle: 250, bottom: 250, rail: 600 },
    slots: { top: '', inArticle: '', bottom: '', rail: '' }
  };

  return {
    ADS: ADS,
    SITE_TITLE: '数学ノート',
    SITE_SUBTITLE: '定義・定理・証明を体系的に',
    ENVIRONMENTS: ENVIRONMENTS,
    TYPE_ALIASES: TYPE_ALIASES,
    KATEX_MACROS: KATEX_MACROS,
    TEX_SYNONYMS: TEX_SYNONYMS
  };
});
