#!/usr/bin/env python3
"""本文テキストから、章・節・番号付き項目（定義・定理・補題…）の行番号一覧を作る。
使い方: python3 _claude/bin/outline.py <本文.txt> [正規表現で絞り込み]
出力: "行番号: 見出し" 。記事を書くときは、この一覧で範囲を決めてから sed -n '開始,終了p' で本文のその範囲だけ読む。"""
import re, sys
path = sys.argv[1]
flt = re.compile(sys.argv[2]) if len(sys.argv) > 2 else None
pat = re.compile(r'''^\s*(
    (CHAPTER|Chapter)\s+[IVXLC0-9]+\b |
    [§~]\s*[0-9Il]{1,2}\s*\.\s+\S |
    [0-9]{1,2}\s*\.\s*[0-9]{1,2}\s*\.\s+(DEFINITION|THEOREM|LEMMA|COROLLARY|PROPOSITION|EXAMPLE|REMARK|FACT|CLAIM)\b |
    (Definition|Theorem|Lemma|Corollary|Proposition|Example|Remark|Exercise)s?\s+[0-9IVX]+(\.[0-9]+)*\b |
    EXERCISES\b |
    第\s*[0-9IVXⅠ-Ⅻ一二三四五六七八九十]+\s*章 |
    ｧ\s*[0-9]+ |
    (定義|定理|補題|系|命題|例|注意|演習問題)\s*[0-9]+\s*[.．]\s*[0-9]+
)''', re.X)
for i, ln in enumerate(open(path, encoding='utf-8', errors='replace'), 1):
    if pat.match(ln):
        s = re.sub(r'\s+', ' ', ln.strip())[:110]
        if not flt or flt.search(s):
            print(f'{i}: {s}')
