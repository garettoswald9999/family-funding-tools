// Amounts: verified on official sources 2026-10-14 (see funding pages). "Up to" maximums only.
function buildChecklist(a,pd){var o=[];function add(t,u,w,amt){o.push({t:t,u:u,w:w,amt:amt||0,prog:(u.indexOf('funding/')===0||u.indexOf('provinces/')===0)&&u!=='funding/dtc/back-pay.html'})}
var pv=(a.prov||'bc').toLowerCase();if(pv!=='bc')return buildOther(a,pv,pd,o,add);
if(a.dtc!=='y')add('Apply for the Disability Tax Credit (Form T2201): open the DTC Playbook','funding/dtc/index.html','It opens the door to the Child Disability Benefit, RDSP grants and bonds, and BC\'s new supplement. You may be able to claim up to 10 years back.');
add('Make sure you get the Canada Child Benefit and BC Family Benefit, and file taxes every year','funding/ccb-bc-family-benefit.html','Even with no income. BC Family Benefit: up to $1,750/yr for a first child.'+(a.age==='u6'?' CCB: up to $8,157/yr per child under 6.':''),1750+(a.age==='u6'?8157:0));
if(a.dtc==='y'){add('Already approved? Claim back pay for past years','funding/dtc/back-pay.html','DTC adjustments up to 10 years, Child Disability Benefit for past years, RDSP carry-forward.');add('Check you are getting the Child Disability Benefit','funding/child-disability-benefit.html','Up to $3,480/yr. Automatic with the CCB once the DTC is approved.',3480);add('Open an RDSP and ask for the grant and bond','funding/rdsp.html','Low-income families can get a bond of up to $1,000/yr with no deposit.',1000)}
else{add('After DTC approval: Child Disability Benefit','funding/child-disability-benefit.html','Up to $3,480/yr.',3480);add('After DTC approval: RDSP bond','funding/rdsp.html','Up to $1,000/yr for low-income families, no deposit needed.',1000)}
if(a.asd==='y')add('Apply for BC Autism Funding before March 2027','funding/autism-funding-2027.html',a.age==='u6'?'Under 6: up to $22,000/yr. Program ends March 31, 2027; read what replaces it.':'Ages 6–18: up to $6,000/yr. Program ends March 31, 2027; read what replaces it.',a.age==='u6'?22000:6000);
else if(a.age!=='17h')add('Ask about the new BC Children and Youth Disability Benefit (needs-based, any diagnosis)','funding/autism-funding-2027.html','$6,500 or up to $17,000/yr, depending on need.');
if(a.adl==='y'&&a.age!=='17h')add('Apply for At Home Program Medical Benefits','funding/at-home-program.html','Equipment, supplies and therapies for kids dependent in 3 of 4 daily activities.');
if(a.fn==='y'){add('Make a Jordan\'s Principle request for unmet needs','funding/jordans-principle.html','Call 1-855-572-4453 (24/7).');if(a.res==='y')add('Talk to your band office about On-reserve Income Assistance and Assisted Living','funding/first-nations-supports.html','')}
if(a.age==='17h')add('Start the adult PWD designation application now (from 17½)','funding/pwd-designation.html','');
if(a.ia==='y')add('Know about crisis supplements for emergencies','funding/crisis-supplements.html','');
if(a.rent==='y'&&a.ia==='n')add('Check BC Housing Rental Assistance Program (RAP)','funding/rental-assistance.html','Household income $60,000 or less with a child.');
add('Browse tools and services, including Speakboard AAC','directory/index.html','');return o}
function buildOther(a,pv,pd,o,add){
if(a.dtc!=='y')add('Apply for the Disability Tax Credit (Form T2201): open the DTC Playbook','funding/dtc/index.html','It opens the door to the Child Disability Benefit and RDSP money. You may be able to claim up to 10 years back.');
add('Make sure you get the Canada Child Benefit, and file taxes every year','funding/ccb-bc-family-benefit.html','Even with no income.'+(a.age==='u6'?' Up to $8,157 a year per child under 6.':''),a.age==='u6'?8157:0);
if(a.dtc==='y'){add('Already approved? Claim back pay for past years','funding/dtc/back-pay.html','DTC changes up to 10 years back, Child Disability Benefit for past years, and RDSP money for past years.');add('Check you are getting the Child Disability Benefit','funding/child-disability-benefit.html','Up to $3,480 a year. It starts by itself with the Canada Child Benefit once the DTC is approved.',3480);add('Open an RDSP and ask for the grant and bond','funding/rdsp.html','Families with low income can get a bond of up to $1,000 a year with no deposit.',1000)}
else{add('After DTC approval: Child Disability Benefit','funding/child-disability-benefit.html','Up to $3,480 a year.',3480);add('After DTC approval: RDSP bond','funding/rdsp.html','Up to $1,000 a year for families with low income. No deposit needed.',1000)}
var P=(pd&&pd[pv])?pd[pv].programs:[];
P.forEach(function(x){var c=x.cat;if(x.slug==='jordans-principle')return;
 if(c==='autism'&&a.asd!=='y')return;if(c==='disability-income'&&a.age!=='17h'&&a.ia!=='y')return;if(c==='housing'&&a.rent!=='y')return;
 add(x.nickname,x.url,x.amount,0)});
if(!P.length)add('See programs where you live','provinces/'+pv+'/index.html','');
if(a.fn==='y')add('Make a Jordan\'s Principle request for things your child needs','funding/jordans-principle.html','Call 1-855-572-4453 (any time, day or night).');
add('Browse tools and services, including Speakboard AAC','directory/index.html','');o.provNote=true;return o}
function summarize(list){var n=0,t=0;list.forEach(function(i){if(i.prog)n++;t+=i.amt});return{count:n,total:t}}
if(typeof document!=='undefined'){var f=document.getElementById('quiz');if(f)f.addEventListener('submit',function(e){e.preventDefault();var a={};new FormData(f).forEach(function(v,k){a[k]=v});if(a.prov&&a.prov!=='bc'&&!window.FFPROVDATA&&window.FFProv){window.FFProv.load(function(){show(a)});return}show(a)});function show(a){var list=buildChecklist(a,window.FFPROVDATA),s=summarize(list);
document.getElementById('sum-count').textContent='You may qualify for up to '+s.count+' programs.';
document.getElementById('sum-money').textContent=s.total?'Up to $'+s.total.toLocaleString('en-CA')+' a year':'';
document.getElementById('sum-note').textContent=s.total?'This is the most you could get from programs with set yearly amounts. What you really get depends on your income, approvals and your child\'s needs. Programs with no set amount (like Jordan\'s Principle) are not counted.'+(list.provNote?' Provincial amounts are not added in. Check each one.':''):'';
var ol=document.getElementById('checklist');ol.innerHTML='';list.forEach(function(i){var li=document.createElement('li'),l=document.createElement('a');l.href=i.u;l.textContent=i.t;li.appendChild(l);if(i.w){li.appendChild(document.createElement('br'));li.appendChild(document.createTextNode(i.w))}ol.appendChild(li)});
var r=document.getElementById('result');r.hidden=false;r.scrollIntoView({behavior:'smooth'});var h=document.getElementById('sum-count');h.tabIndex=-1;h.focus({preventScroll:true})}}
if(typeof module!=='undefined')module.exports={buildChecklist:buildChecklist,summarize:summarize};
