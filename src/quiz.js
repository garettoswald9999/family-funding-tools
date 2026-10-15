function buildChecklist(a){var o=[];function add(t,u,w){o.push({t:t,u:u,w:w})}
if(a.dtc!=='y')add('Apply for the Disability Tax Credit (Form T2201)','funding/disability-tax-credit.html','It unlocks the Child Disability Benefit, RDSP grants and bonds, and BC\'s new supplement.');
add('Make sure you get the Canada Child Benefit and BC Family Benefit, and file taxes every year','funding/ccb-bc-family-benefit.html','Even with no income.');
if(a.dtc==='y'){add('Check you are getting the Child Disability Benefit','funding/child-disability-benefit.html','It is automatic with the CCB once the DTC is approved.');add('Open an RDSP and ask for the grant and bond','funding/rdsp.html','Low-income families can get the bond with no deposit.')}
else add('After DTC approval: Child Disability Benefit and RDSP','funding/rdsp.html','');
if(a.age!=='17h')add(a.asd==='y'?'Apply for BC Autism Funding before March 2027; watch for the new Disability Benefit':'Ask about the new BC Children and Youth Disability Benefit (needs-based, any diagnosis)','funding/autism-funding.html',a.asd==='y'?(a.age==='u6'?'Under 6: up to $22,000/yr.':'Ages 6–18: up to $6,000/yr.'):'');
if(a.adl==='y'&&a.age!=='17h')add('Apply for At Home Program Medical Benefits','funding/at-home-program.html','For kids dependent in 3 of 4 daily activities.');
if(a.fn==='y'){add('Make a Jordan\'s Principle request for unmet needs','funding/jordans-principle.html','Call 1-855-572-4453 (24/7).');if(a.res==='y')add('Talk to your band office about On-reserve Income Assistance and Assisted Living','funding/first-nations-supports.html','')}
if(a.age==='17h')add('Start the adult PWD designation application now (from 17½)','funding/pwd-designation.html','');
if(a.ia==='y')add('Know about crisis supplements for emergencies','funding/crisis-supplements.html','');
if(a.rent==='y'&&a.ia==='n')add('Check BC Housing Rental Assistance Program (RAP)','funding/rental-assistance.html','Household income $60,000 or less with a child.');
add('Browse tools and services, including AAC and sensory','directory/index.html','');return o}
if(typeof document!=='undefined'){var f=document.getElementById('quiz');if(f)f.addEventListener('submit',function(e){e.preventDefault();var a={};new FormData(f).forEach(function(v,k){a[k]=v});var ol=document.getElementById('checklist');ol.innerHTML='';buildChecklist(a).forEach(function(i){var li=document.createElement('li'),l=document.createElement('a');l.href=i.u;l.textContent=i.t;li.appendChild(l);if(i.w){li.appendChild(document.createElement('br'));li.appendChild(document.createTextNode(i.w))}ol.appendChild(li)});var r=document.getElementById('result');r.hidden=false;r.querySelector('h2').focus&&r.scrollIntoView()})}
if(typeof module!=='undefined')module.exports=buildChecklist;
