"""WCAG 2.x contrast check for the forest palette + hero photo overlay."""
from PIL import Image
def lum(c):
    c=[x/255 for x in c];c=[x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4 for x in c]
    return .2126*c[0]+.7152*c[1]+.0722*c[2]
def hx(h): h=h.lstrip('#');return tuple(int(h[i:i+2],16) for i in (0,2,4))
def ratio(a,b):
    la,lb=sorted([lum(a),lum(b)],reverse=True);return (la+.05)/(lb+.05)
P=[('text','#eef3ee','#0f1f17',4.5),('text on card','#eef3ee','#1a3326',4.5),('muted on bg','#b7c7bb','#0f1f17',4.5),
('muted on card','#b7c7bb','#1a3326',4.5),('muted on bg2','#b7c7bb','#13281d',4.5),('link on bg','#8fd8ad','#0f1f17',4.5),('link on card','#8fd8ad','#1a3326',4.5),
('link on footer','#8fd8ad','#0b1811',4.5),('muted on footer','#b7c7bb','#0b1811',4.5),('CTA ink on sage','#0f1f17','#b9d3c1',4.5),('CTA ink on sage hover','#0f1f17','#cde0d2',4.5),('own-app badge','#e9dfc6','#0f1f17',4.5),('dom muted on card','#b7c7bb','#1a3326',4.5),('notice label on card','#b7c7bb','#1a3326',4.5),('text on card2 (hover)','#ffffff','#21402f',4.5),
('ink on link (ghost hover)','#0f1f17','#8fd8ad',4.5),('badge','#d5f3e0','#24503a',4.5),('link on bg2 (trust strip)','#8fd8ad','#13281d',4.5),('muted on bg2 (trust strip)','#b7c7bb','#13281d',4.5),
('placeholder','#9db1a3','#13281d',4.5),('draft/callout','#f6e7bf','#3a3218',4.5),('success msg','#8fe0ad','#0b1811',4.5),('headings white on card','#ffffff','#1a3326',4.5),
('focus ring sage vs bg (non-text)','#b9d3c1','#0f1f17',3.0),('focus ring sage vs card (non-text)','#b9d3c1','#1a3326',3.0),('ghost button border vs bg (non-text)','#6a947d','#0f1f17',3.0),('input border vs bg2 (non-text)','#6a947d','#13281d',3.0),
('hero credit','#d6e2d8','#0f1f17',4.5)]
bad=0
for n,f,b,m in P:
    r=ratio(hx(f),hx(b));ok=r>=m;bad+=not ok;print(f"{'PASS' if ok else 'FAIL'} {r:5.2f}:1 (need {m}) {n} {f} on {b}")
# hero: worst case behind text (white #fff / #e3ece4) after CSS gradient overlay
im=Image.open('src/img/cheam-1600.jpg').convert('RGB');W,H=im.size
def alpha(t):  # mirrors .hero.photo::after stops 0:.70, .45:.74, 1:.97 of rgb(8,22,14)->(10,28,18)->(15,31,23)
    if t<.45: return .70+(.74-.70)*t/.45,(8,22,14)
    return .74+(.97-.74)*(t-.45)/.55,(15,31,23)
worst=99
for y in range(0,H,4):
    a,c=alpha(y/H)
    for x in range(int(W*.15),int(W*.85),4):
        p=im.getpixel((x,y));q=tuple(p[i]*(1-a)+c[i]*a for i in range(3))
        worst=min(worst,ratio((227,236,228),q))
ok=worst>=4.5;bad+=not ok
print(f"{'PASS' if ok else 'FAIL'} {worst:5.2f}:1 (need 4.5) hero sub text #e3ece4 over brightest overlaid photo pixel (object-fit may crop; this checks full image)")
print('ALL PASS' if not bad else f'{bad} FAIL')
