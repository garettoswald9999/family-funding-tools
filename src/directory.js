(function(){var items=[].slice.call(document.querySelectorAll('#list .card')),chips=[].slice.call(document.querySelectorAll('.chip')),cat='';
function run(){var r=document.getElementById('f-reg').value,p=document.getElementById('f-price').value,f=document.getElementById('f-fund').checked,q=document.getElementById('f-q').value.toLowerCase(),n=0;
items.forEach(function(el){var ok=(!cat||el.dataset.cat===cat)&&(!r||el.dataset.reg===r)&&(!p||el.dataset.price===p)&&(!f||el.dataset.fund==='y')&&(!q||el.textContent.toLowerCase().indexOf(q)>-1);el.hidden=!ok;if(ok)n++});
document.getElementById('count').textContent=n+(n===1?' result':' results');}
chips.forEach(function(c){c.addEventListener('click',function(){cat=c.dataset.cat;chips.forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false')});run()})});
var qc=new URLSearchParams(location.search).get('cat');
['f-reg','f-price','f-fund','f-q'].forEach(function(i){document.getElementById(i).addEventListener('input',run)});run();if(qc!==null)chips.forEach(function(c){if(c.dataset.cat===qc)c.click()});})();
