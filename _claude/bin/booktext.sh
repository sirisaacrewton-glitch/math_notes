#!/bin/bash
# 本の PDF から文字を取り出し、番号付き項目の索引を作る（Claude が本を「必要な行だけ」読むための下準備）
# 使い方: bash _claude/bin/booktext.sh "<PDF のパス>" "<出力 .txt のパス>" [開始ページ 終了ページ]
#   例: bash _claude/bin/booktext.sh "$HOME/mnt/<洋書>/<本の PDF>.pdf" "$HOME/mnt/<洋書>/_text/kunen1980.txt"
#   → kunen1980.txt（本文）と kunen1980.index.txt（章・節・定義・定理などの行番号一覧）ができる
# 出力先はサイトのフォルダの外（本棚フォルダの _text/）にする。本の本文をサイトと一緒に公開しないため。
set -e
pdf="$1"; out="$2"
[ -f "$pdf" ] || { echo "PDF がありません: $pdf"; exit 1; }
mkdir -p "$(dirname "$out")"
if [ -n "$3" ]; then timeout 170 pdftotext -layout -f "$3" -l "$4" "$pdf" "$out"; else timeout 170 pdftotext -layout "$pdf" "$out"; fi
python3 "$(dirname "$0")/outline.py" "$out" > "${out%.txt}.index.txt"
echo "本文: $out ($(wc -l < "$out") 行)"; echo "索引: ${out%.txt}.index.txt ($(wc -l < "${out%.txt}.index.txt") 行)"
