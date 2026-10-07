#!/usr/bin/env python3
"""Measure rendered width of every display math block ($$...$$) in site pages.

usage: mathwidth.py SITE_ROOT page1.html [page2.html ...]
Prints blocks whose width exceeds LIMIT px (body 17px, KaTeX 1.21em).
"""
import sys, json, re, os
from playwright.sync_api import sync_playwright

LIMIT = int(os.environ.get('LIMIT', '690'))
root = sys.argv[1]
pages = sys.argv[2:]

def displays(path):
    s = open(path, encoding='utf-8').read()
    m = re.search(r'<script type="text/markdown" id="source">(.*?)</script>', s, re.S)
    src = m.group(1) if m else s
    lines = src.split('\n')
    out = []
    i = 0
    while i < len(lines):
        if lines[i].strip() == '$$':
            j = i + 1
            while j < len(lines) and lines[j].strip() != '$$':
                j += 1
            out.append((i + 1, re.sub(r'\\label\{[^}]*\}', '', '\n'.join(lines[i + 1:j]))))
            i = j
        i += 1
    return out

html = f"""<!doctype html><html><head><meta charset=utf-8>
<link rel=stylesheet href="file://{root}/vendor/katex/katex.min.css">
<script src="file://{root}/vendor/katex/katex.min.js"></script>
<script src="file://{root}/config.js"></script>
<style>body{{font-size:17px}} #box{{display:inline-block}}</style></head>
<body><span id=box></span></body></html>"""
open('/tmp/mw.html', 'w').write(html)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    pg.goto('file:///tmp/mw.html')
    pg.wait_for_timeout(300)
    pg.evaluate("document.fonts.ready")
    for path in pages:
        for ln, tex in displays(path):
            r = pg.evaluate("""(tex)=>{
              const cfg = (window.MATH_CONFIG||null);
              let macros = {};
              try { macros = Object.assign({}, (cfg||{}).KATEX_MACROS||{}); } catch(e){}
              const box=document.getElementById('box');
              try { katex.render(tex, box, {displayMode:true, throwOnError:true, macros}); }
              catch(e){ return {err:String(e)}; }
              const k=box.querySelector('.katex');
              return {w:k.getBoundingClientRect().width};
            }""", tex)
            if 'err' in r:
                print(f"ERR {path}:{ln} {r['err'][:80]}")
            elif r['w'] > LIMIT:
                print(f"WIDE {int(r['w'])}px {path}:{ln} {tex[:90]!r}")
    b.close()
