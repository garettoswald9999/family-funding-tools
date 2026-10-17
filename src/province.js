// Province picker: guesses from time zone + language (no IP lookup), remembers choice in localStorage.
(function(){
var N={ab:'Alberta',bc:'British Columbia',mb:'Manitoba',nb:'New Brunswick',nl:'Newfoundland and Labrador',ns:'Nova Scotia',nt:'Northwest Territories',nu:'Nunavut',on:'Ontario',pe:'Prince Edward Island',qc:'Quebec',sk:'Saskatchewan',yt:'Yukon'};
var TZ={Vancouver:'bc',Creston:'bc',Dawson_Creek:'bc',Fort_Nelson:'bc',Edmonton:'ab',Regina:'sk',Swift_Current:'sk',Winnipeg:'mb',Toronto:'on',Nipigon:'on',Thunder_Bay:'on',Rainy_River:'on',Atikokan:'on',Montreal:'qc',Blanc_Sablon:'qc',Halifax:'ns',Glace_Bay:'ns',Moncton:'nb',St_Johns:'nl',Goose_Bay:'nl',Whitehorse:'yt',Dawson:'yt',Yellowknife:'nt',Inuvik:'nt',Iqaluit:'nu',Rankin_Inlet:'nu',Cambridge_Bay:'nu',Resolute:'nu',Pangnirtung:'nu'};
var K='ffProv';
function guess(){var tz='',lang=(navigator.language||'').toLowerCase();try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(e){}
 var c=TZ[tz.replace(/^(America|Canada)\//,'')];
 if(!c&&/^Canada\//.test(tz))c={Pacific:'bc',Mountain:'ab',Central:'mb',Eastern:'on',Atlantic:'ns',Newfoundland:'nl',Saskatchewan:'sk',Yukon:'yt'}[tz.slice(7)];
 if(c==='on'&&lang.indexOf('fr')===0)c='qc';
 return c||'bc'}
function get(){var c=null;try{c=localStorage.getItem(K)}catch(e){}return N[c]?{code:c,saved:true}:{code:guess(),saved:false}}
function set(c){if(!N[c])return;try{localStorage.setItem(K,c)}catch(e){}apply()}
var root=(document.currentScript&&document.currentScript.src||'').replace(/province\.js.*$/,'');
var data=null,waiters=[];
function load(cb){if(data)return cb(data);waiters.push(cb);if(waiters.length>1)return;fetch(root+'provinces.json').then(function(r){return r.json()}).then(function(d){data=d;window.FFPROVDATA=d;waiters.forEach(function(f){f(d)})}).catch(function(){})}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function render(box,p,d){var pr=d[p.code];if(!pr)return;var ul=box.querySelector('.prov-list');if(ul)ul.innerHTML=pr.programs.map(function(x){return '<li class="card"><h3><a href="'+root+x.url+'">'+esc(x.nickname)+'</a></h3><p>'+esc(x.what)+'</p><p class="amt'+(x.verified?'':' unv')+'">'+esc(x.amount_short||x.amount)+'</p></li>'}).join('');
 var more=box.querySelector('.prov-more');if(more){more.href=root+'provinces/'+p.code+'/index.html';more.textContent='See all '+pr.name+' programs ›'}}
function apply(){var p=get();
 document.querySelectorAll('[data-prov-name]').forEach(function(e){e.textContent=N[p.code]});
 document.querySelectorAll('[data-prov-pill]').forEach(function(a){a.querySelector('.pv').textContent=p.code.toUpperCase();a.setAttribute('aria-label','Your province: '+N[p.code]+'. Change province');a.href=root+'provinces/index.html'});
 document.querySelectorAll('select.prov-select').forEach(function(s){s.value=p.code});
 document.querySelectorAll('.prov-guess').forEach(function(e){e.textContent=p.saved?'':'We guessed this from your device’s time zone. Change it if it’s wrong.'});
 var boxes=document.querySelectorAll('.prov-box');if(boxes.length)load(function(d){boxes.forEach(function(b){render(b,p,d)})});
 document.dispatchEvent(new CustomEvent('ffprov',{detail:p.code}))}
window.FFProv={get:get,set:set,names:N,load:load,guess:guess};
document.addEventListener('change',function(e){if(e.target.classList&&e.target.classList.contains('prov-select'))set(e.target.value)});
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-set-prov]');if(b){set(b.getAttribute('data-set-prov'));var o=b.parentNode.querySelector('output');if(o)o.textContent='Saved. We’ll show '+N[b.getAttribute('data-set-prov')]+' programs first.'}});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
