# 完全版メダル（assets/medal.svg）を作る。文字は Cinzel（SIL OFL 1.1）の字形を輪郭（path）にして埋め込む
import math, re, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

FONT, FAV, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
font = TTFont(FONT); gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font['head'].unitsPerEm
C = 256.0

def glyph_path(ch, a, b, c, d, e, f):
    pen = SVGPathPen(gs, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
    gs[cmap[ord(ch)]].draw(TransformPen(pen, (a, b, c, d, e, f)))
    return pen.getCommands()

def adv(ch): return gs[cmap[ord(ch)]].width

def arc_text(text, radius, size, track, top):
    k = size / upm
    widths = [adv(ch) * k for ch in text]
    total = sum(widths) + track * (len(text) - 1)
    ang_total = total / radius
    out = []
    # top：上の弧に左から右へ（字の上が外側）。bottom：下の弧に左から右へ（字の上が内側）
    pos = -ang_total / 2
    for ch, w in zip(text, widths):
        mid = pos + (w / 2) / radius
        if top:
            th = -math.pi / 2 + mid; rot = th + math.pi / 2
        else:
            th = math.pi / 2 - mid; rot = th - math.pi / 2
        px, py = C + radius * math.cos(th), C + radius * math.sin(th)
        cr, sr = math.cos(rot), math.sin(rot)
        # 字形座標 (x,y)（y 上向き）→ 平行移動(-w/2/k) → 拡大(k,-k) → 回転 → 平行移動(p)
        # M = T(p) R(rot) S(k,-k) T(-w/(2k),0)
        a, b = cr * k, sr * k
        c, d = sr * k, -cr * k   # (x, y) の y 成分：R・(0,-k)
        e = px + a * (-w / (2 * k)); f = py + b * (-w / (2 * k))
        out.append(glyph_path(ch, a, b, c, d, e, f))
        pos += (w + track) / radius
    return ' '.join(out)

fav = open(FAV, encoding='utf-8').read()
inf = fav[fav.index('<g stroke-linecap'):fav.rindex('</svg>')]

R_OUT, R_RIM_IN, R_DOTS, R_TXT_IN, R_INNER = 254, 238, 226, 160, 140
cap = 0.7  # Cinzel の大文字の高さ（em 比）の目安
size = 50
top = arc_text('SUMMA', R_TXT_IN + 4, size * 1.08, 12, True)
bot = arc_text('MATHEMATICA', R_TXT_IN + 4 + size * cap, size * 0.9, 7, False)

dots = []
n = 132
for i in range(n):
    t = 2 * math.pi * i / n
    dots.append('<circle cx="%.2f" cy="%.2f" r="2.1"/>' % (C + R_DOTS * math.cos(t), C + R_DOTS * math.sin(t)))

def diamond(cx, cy):
    return '<path d="M%.1f %.1fL%.1f %.1fL%.1f %.1fL%.1f %.1fZ"/>' % (cx - 13, cy, cx, cy - 6.5, cx + 13, cy, cx, cy + 6.5)
r_mid = R_TXT_IN + 4 + size * cap / 2 + 2

s = 4.6
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<!-- Summa Mathematica の完全版メダル。生成：tools/medal.py（文字は Cinzel, SIL Open Font License 1.1 の字形を輪郭にしたもの） -->
<title>Summa Mathematica</title>
<defs>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e8c3"/><stop offset=".45" stop-color="#d2ad6e"/><stop offset=".75" stop-color="#a77f42"/><stop offset="1" stop-color="#7d5d2c"/></linearGradient>
<linearGradient id="goldText" gradientUnits="userSpaceOnUse" x1="60" y1="40" x2="452" y2="472"><stop offset="0" stop-color="#f3e2b6"/><stop offset=".5" stop-color="#d6b273"/><stop offset="1" stop-color="#9c763b"/></linearGradient>
<linearGradient id="goldDark" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#f1deb0"/><stop offset="1" stop-color="#7a5a2a"/></linearGradient>
<radialGradient id="ink" cx="40%" cy="32%" r="78%"><stop offset="0" stop-color="#302d28"/><stop offset="1" stop-color="#141311"/></radialGradient>
</defs>
<circle cx="256" cy="256" r="{R_OUT}" fill="url(#gold)"/>
<circle cx="256" cy="256" r="{R_OUT - 7}" fill="none" stroke="url(#goldDark)" stroke-width="1.5" opacity=".7"/>
<circle cx="256" cy="256" r="{R_RIM_IN}" fill="url(#ink)"/>
<circle cx="256" cy="256" r="{R_RIM_IN}" fill="none" stroke="#5a431f" stroke-width="2"/>
<g fill="url(#goldText)">{''.join(dots)}</g>
<g fill="url(#goldText)"><path d="{top}"/><path d="{bot}"/>{diamond(C - r_mid, C)}{diamond(C + r_mid, C)}</g>
<circle cx="256" cy="256" r="{R_INNER}" fill="none" stroke="url(#gold)" stroke-width="6"/>
<circle cx="256" cy="256" r="{R_INNER - 5}" fill="none" stroke="#5a431f" stroke-width="1.2" opacity=".8"/>
<g transform="translate(256 256) scale({s}) translate(-32 -32.5)">{inf[inf.index('>') + 1:inf.rindex('</g>')].join(['<g stroke-linecap="round" stroke-linejoin="round">', '</g>']) if False else inf}</g>
</svg>
'''
open(OUT, 'w', encoding='utf-8').write(svg)
print('written', OUT, len(svg))
