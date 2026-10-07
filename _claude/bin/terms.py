#!/usr/bin/env python3
"""訳語の確認：日本語の本の本文テキスト（_text/ の *.txt）で、候補の訳語が何回・どんな文脈で使われているかを調べる。
使い方: python3 _claude/bin/terms.py [-c 文脈の文字数] 候補1 候補2 ...
  例: python3 _claude/bin/terms.py ほとんど交わり 概素 概離散
検索対象: 環境変数 MN_WASHO（日本語の本の本棚 <和書> のパス）の _text/*.txt（booktext.sh で作ったもの）。
  MN_WASHO がなければ、このリポジトリの隣の math_books/ja/_text/*.txt を使う。
OCR 由来のテキストなので、空白や誤字で数え漏れることがある。0 件でも「使われていない」とは断定しない。"""
import glob, os, re, sys
args = sys.argv[1:]; ctx = 0
if args[:1] == ['-c']: ctx = int(args[1]); args = args[2:]
root = os.environ.get('MN_WASHO')
if not root:
    here = os.path.dirname(os.path.abspath(__file__))           # <math_notes>/_claude/bin
    root = os.path.join(here, '..', '..', '..', 'math_books', 'ja')
pat = os.path.join(root, '_text', '*.txt')
files = sorted(f for f in glob.glob(pat) if not f.endswith('.index.txt'))
if not files: print('日本語の本の _text/*.txt がありません（booktext.sh で作る）'); sys.exit(1)
texts = {f: re.sub(r'[ \t]+', '', open(f, encoding='utf-8', errors='replace').read()) for f in files}
for t in args:
    q = re.sub(r'\s+', '', t)
    print(f'== {t}')
    for f, s in texts.items():
        n = s.count(q)
        if n:
            print(f'  {n:4d}  {os.path.basename(f)}')
            if ctx:
                for m in list(re.finditer(re.escape(q), s))[:3]:
                    print('        …' + s[max(0, m.start() - ctx):m.end() + ctx].replace('\n', ' ') + '…')
