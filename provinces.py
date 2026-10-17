"""Province/territory pages + provinces.json. Only verified amounts are shown; others say 'check the official page'."""
import json,glob,re
ORDER=['bc','ab','sk','mb','on','qc','nb','ns','pe','nl','yt','nt','nu']
CHECK='Check the official page for the current amount.'
def load():
    D={}
    for f in glob.glob('data/provinces/*.json'):
        d=json.load(open(f)); D[d['code'].lower()]=d
    return D
def amount(p):
    a=p.get('amount','').strip(); v=p.get('amount_verified')
    if v is None: v=True  # BC entries copied from programs.json were verified 2026-10-14
    if not v:
        if re.search(r'\d',a): return CHECK,False
        return (a if 'check' in a.lower() else a.rstrip('.')+'. '+CHECK),False
    return a,True
GOV={'BC (MCFD)':'BC (Ministry of Children and Family Development, or MCFD)','Ontario (MCCSS)':'Ontario (Ministry of Children, Community and Social Services, or MCCSS)',
 'GNWT (Education, Culture and Employment)':'Government of the Northwest Territories (Education, Culture and Employment)','GNWT-funded, delivered by NWT Disabilities Council / Inclusion NWT':'Paid for by the Government of the Northwest Territories, run by the NWT Disabilities Council and Inclusion NWT',
 'Nova Scotia (Health / IWK)':'Nova Scotia (Health, and the IWK Health Centre)','Alberta (paid by CRA)':'Alberta (paid through the CRA)','Ontario (paid by CRA)':'Ontario (paid through the CRA)'}
def short(t,n=150):
    s=re.split(r'(?<=\.)\s',t)[0]
    return s if len(s)<=n else s[:n].rsplit(' ',1)[0]+'…'
def build(page,E,SITE,FUNDING_SLUGS):
    D=load(); out={}
    for c in ORDER:
        d=D[c]; progs=[]
        for p in d['programs']:
            url=f'funding/{p["slug"]}.html' if (p['slug'] in FUNDING_SLUGS and (c=='bc' or p['slug']=='jordans-principle')) else f'provinces/{c}/index.html#{p["slug"]}'
            a,v=amount(p)
            progs.append(dict(slug=p['slug'],nickname=p.get('nickname') or p['name'],name=p['name'],cat=p.get('category',''),what=short(p['what']),amount=a,amount_short=short(a,120) if v else a,verified=v,url=url))
        out[c]=dict(name=d['province'],checked=d['last_checked'],programs=progs)
    def ul(xs): return '<ul>'+''.join(f'<li>{E(x)}</li>' for x in xs)+'</ul>' if xs else ''
    fed=[('disability-tax-credit','Disability Tax Credit (DTC)','The key that opens most other help.'),('child-disability-benefit','Child Disability Benefit','Up to $3,480 a year per child, paid monthly once the DTC is approved.'),('rdsp','RDSP grant and bond','Free government money in a savings plan for your child.'),('ccb-bc-family-benefit','Canada Child Benefit','Monthly money for kids under 18. Up to $8,157 a year per child under 6.'),('jordans-principle',"Jordan’s Principle","Help for First Nations kids, on or off reserve.")]
    sel=''.join(f'<option value="{c}">{E(out[c]["name"])}</option>' for c in ORDER)
    for c in ORDER:
        d=D[c]; o=out[c]; name=o['name']
        fedc=''.join(f'<li class="card"><h3><a href="../../funding/{s}.html">{E(t)}</a></h3><p>{E(w)}</p></li>' for s,t,w in fed if not (s=='jordans-principle'))
        secs=''
        for p,x in zip(d['programs'],o['programs']):
            more=f'<p><a href="../../{x["url"]}">Read the full guide ›</a></p>' if x['url'].startswith('funding/') else ''
            links='<ul>'+''.join(f'<li><a href="{u}" rel="noopener">{E(t)}</a></li>' for t,u in p['links'])+'</ul>'
            badge='<span class="badge">Checked on official page</span>' if x['verified'] else '<span class="badge warn">Check the official page</span>'
            secs+=(f'<section class="prog" id="{x["slug"]}" aria-labelledby="h-{x["slug"]}"><h2 id="h-{x["slug"]}">{E(x["nickname"])}</h2><p class="gov">{E(p["name"])} · {E(GOV.get(p.get("gov",""),p.get("gov","")))}</p><p>{E(p["what"])}</p>'
                   f'<h3>How much</h3><p>{badge} {E(x["amount"])}</p>'+(f'<h3>Who can get it</h3>{ul(p["who"])}' if p.get('who') else '')+(f'<h3>How to apply</h3><ol>'+''.join(f'<li>{E(s)}</li>' for s in p['steps'])+'</ol>' if p.get('steps') else '')
                   +(f'<h3>What to have ready</h3>{ul(p["docs"])}' if p.get('docs') else '')+f'<h3>Official links</h3>{links}{more}</section>')
        toc=''.join(f'<li><a href="#{x["slug"]}">{E(x["nickname"])}</a></li>' for x in o['programs'])
        body=(f'<p class="crumb"><a href="../index.html">Provinces</a> › {E(name)}</p><h1>Help for kids with disabilities in {E(name)}</h1>'
              f'<p class="sub left">Money and support for your child from {E(name)}, plus federal programs that work everywhere in Canada. Plain language. Checked {o["checked"]}.</p>'
              f'<p class="setprov"><button type="button" class="pill" data-set-prov="{c}">Make {E(name)} my province</button> <output aria-live="polite"></output></p>'
              f'<h2>On this page</h2><ul>{toc}</ul>{secs}<h2>Federal programs (all of Canada)</h2><p>These work in every province and territory. Start with the DTC.</p><ul class="grid">{fedc}</ul>'
              f'<p class="note">Amounts marked “Check the official page” are not confirmed yet. We only show dollar amounts we checked on an official government page. This is general information, not advice.</p>'
              f'<p><a class="pill lg" href="../../quiz.html">Take the 2-minute quiz</a></p>')
        ld=[{"@context":"https://schema.org","@type":"ItemList","name":f"Disability and autism programs for kids in {name}","itemListElement":[{"@type":"ListItem","position":i+1,"name":x['nickname'],"url":SITE+'/'+(x['url'] if x['url'].startswith('funding/') else f'provinces/{c}/index.html#{x["slug"]}')} for i,x in enumerate(o['programs'])]},
            {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Provinces","item":SITE+"/provinces/"},{"@type":"ListItem","position":2,"name":name,"item":f"{SITE}/provinces/{c}/"}]}]
        page(f'provinces/{c}/index.html',f'{name}: disability and autism funding for kids (plain-language guide)',f'Plain-language guide to {name} programs for children with autism and disabilities, plus the DTC, Child Disability Benefit and RDSP. Only verified amounts shown.',body,ld)
    grid=''.join(f'<li class="card"><h3><a href="{c}/index.html" data-set-prov="{c}">{E(out[c]["name"])}</a></h3><p>{len(out[c]["programs"])} programs · checked {out[c]["checked"]}</p></li>' for c in ORDER)
    page('provinces/index.html','Pick your province: disability funding for kids across Canada','Choose your province or territory to see programs for children with autism and disabilities, plus federal programs.',
         f'<div class="head"><h1>Pick your province.</h1><p class="sub">See help for your child where you live, plus federal programs for all of Canada.</p><p><label for="pp">Your province or territory</label><select id="pp" class="prov-select">{sel}</select></p><p class="note prov-guess"></p></div><ul class="grid">{grid}</ul>')
    return out,sel
