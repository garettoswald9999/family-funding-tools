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
def make(fn,kicker,title,sub,accent=(0,113,227)):
    im=Image.new('RGB',(1200,630),(245,245,247));d=ImageDraw.Draw(im)
    d.rounded_rectangle((48,48,1152,582),radius=36,fill=(255,255,255))
    kf=font(30,600);d.text((110,108),kicker,font=kf,fill=accent)
    tf=font(70,700);y=160
    for ln in wrap(d,title,tf,980): d.text((106,y),ln,font=tf,fill=(29,29,31));y+=84
    sf=font(34,400);y+=14
    for ln in wrap(d,sub,sf,980): d.text((110,y),ln,font=sf,fill=(85,85,89));y+=46
    bf=font(28,600);label='Family Funding & Tools · Free · No login'
    d.rounded_rectangle((106,486,106+d.textlength(label,font=bf)+56,540),radius=27,fill=accent)
    d.text((134,494),label,font=bf,fill=(255,255,255))
    im.save('src/og/'+fn,optimize=True)
make('og-home.png','For BC parents of kids with disabilities','Your child may qualify for thousands in support.','Find out in 2 minutes. Plain language, from a BC dad of a non-verbal son.')
make('og-quiz.png','Free 2-minute quiz','What can your family get?','8 quick questions. A personal checklist of BC and federal programs.')
make('og-2027.png','Heads up, BC parents','BC Autism Funding ends March 31, 2027.','Here\'s what replaces it, and what to do now.',accent=(0,102,204))
make('og-dtc.png','The DTC Playbook','The Disability Tax Credit, step by step.','Doctor prep sheet, fees, MP help, and how to claim up to 10 years back.')
