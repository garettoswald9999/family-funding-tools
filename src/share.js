(function(){document.querySelectorAll('.share').forEach(function(s){var url=s.dataset.url,text=s.dataset.text,u=encodeURIComponent(url),t=encodeURIComponent(text),out=s.querySelector('.share-out');
var L={x:'https://twitter.com/intent/tweet?text='+t+'&url='+u,fb:'https://www.facebook.com/sharer/sharer.php?u='+u,wa:'https://wa.me/?text='+t+'%20'+u,sms:'sms:?&body='+t+'%20'+u};
s.querySelectorAll('[data-net]').forEach(function(a){a.href=L[a.dataset.net]});
function copy(){var done=function(){out.textContent='Link copied. Paste it anywhere.'};if(navigator.clipboard)navigator.clipboard.writeText(url).then(done,function(){out.textContent=url});else out.textContent=url}
s.querySelector('.share-copy').addEventListener('click',copy);
s.querySelector('.share-native').addEventListener('click',function(){if(navigator.share)navigator.share({title:document.title,text:text,url:url}).catch(function(){});else copy()});});})();
