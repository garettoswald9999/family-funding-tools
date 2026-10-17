from PIL import Image,ImageDraw,ImageFont
F="/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf"
def font(sz,w):
    f=ImageFont.truetype(F,sz)
    try: f.set_variation_by_axes([32,w])
    except Exception:
        try: f.set_variation_by_name({700:'Bold',600:'SemiBold',400:'Regular'}[w])
        except Exception: pass
    return f
def wrap(d,text,f,maxw):
    lines=[];cur=''
    for w in text.split():
        t=(cur+' '+w).strip()
        if d.textlength(t,font=f)<=maxw: cur=t
        else: lines.append(cur);cur=w
    lines.append(cur);return lines
def make(fn,kicker,title,sub,accent=(224,179,84)):
    bg=Image.open('src/img/cheam-og.jpg').convert('RGB')
    ov=Image.new('RGBA',(1200,630));od=ImageDraw.Draw(ov)
    for y in range(630):
        a=int(115+(y/630)*125)   # darker toward bottom
        od.line([(0,y),(1200,y)],fill=(10,28,18,a))
    ov2=Image.new('RGBA',(1200,630));o2=ImageDraw.Draw(ov2)
    for x in range(800): o2.line([(x,0),(x,630)],fill=(10,28,18,int(80*(1-x/800))))
    im=Image.alpha_composite(Image.alpha_composite(bg.convert('RGBA'),ov),ov2).convert('RGB');d=ImageDraw.Draw(im)
    kf=font(30,600);d.text((80,70),kicker,font=kf,fill=accent)
    tf=font(72,700);y=122
    for ln in wrap(d,title,tf,1020): d.text((76,y),ln,font=tf,fill=(255,255,255));y+=86
    sf=font(34,400);y+=14
    for ln in wrap(d,sub,sf,1000): d.text((80,y),ln,font=sf,fill=(226,236,228));y+=46
    bf=font(28,600);label='Family Funding & Tools · Free · No login'
    d.rounded_rectangle((76,510,76+d.textlength(label,font=bf)+56,564),radius=27,fill=accent)
    d.text((104,518),label,font=bf,fill=(15,31,23))
    mf=font(24,600);m='Made in Chilliwack, BC'
    tw=d.textlength(m,font=mf); x0=1124-tw
    # simple flag mark: red-white-red bars with red square leaf stand-in omitted; text only + red bars
    d.text((x0,522),m,font=mf,fill=(238,243,238))
    im.save('src/og/'+fn,optimize=True)
make('og-home.png','For BC parents of kids with disabilities','Your child may qualify for thousands in support.','Find out in 2 minutes. Plain language, from a BC dad of a non-verbal son.')
make('og-quiz.png','Free 2-minute quiz','What can your family get?','8 quick questions. A personal checklist of BC and federal programs.')
make('og-2027.png','Heads up, BC parents','BC Autism Funding ends March 31, 2027.','Here\'s what replaces it, and what to do now.')
make('og-dtc.png','The DTC Playbook','The Disability Tax Credit, step by step.','Doctor prep sheet, fees, MP help, and how to claim up to 10 years back.')
