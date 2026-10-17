(function(){if(!window.fetch||!window.FormData)return;
document.querySelectorAll('form.ml-form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
var out=f.querySelector('output'),btn=f.querySelector('button'),em=f.querySelector('input[type=email]');
if(!em.checkValidity()){out.textContent='Please enter a valid email.';em.focus();return}
btn.disabled=true;out.textContent='Sending…';
fetch(f.action,{method:'POST',body:new FormData(f),mode:'no-cors'}).then(function(){f.classList.add('done');em.value='';out.textContent='Check your inbox to confirm.';})
.catch(function(){out.textContent='Something went wrong. Please try again.';}).then(function(){btn.disabled=false});});});})();
