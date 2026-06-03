(function(){
  var sec=document.getElementById('trending-section');if(!sec)return;
  var url=sec.dataset.url,date=sec.dataset.date;
  if(!url)return;
  var proxy='https://daily-news-api.bullbum1126.workers.dev/';
  function loadTrending(retry){
    fetch(proxy+'?action=trending')
      .then(function(r){return r.json()})
      .then(function(d){
        if(!d.items||!d.items.length){
          sec.querySelector('.trending-loading').textContent='No trending items yet.';
          return;
        }
        var ul=document.createElement('ul');
        d.items.forEach(function(it){
          var li=document.createElement('li');
          li.innerHTML='<span class="t-score">+'+it.score+'</span>'
            +'<span class="t-title"><a href="'+it.link+'">'+it.title+'</a></span>'
            +'<span class="t-voters">voted by '+it.voters.join(', ')+'</span>';
          ul.appendChild(li);
        });
        var loading=sec.querySelector('.trending-loading');
        if(loading)loading.remove();
        sec.appendChild(ul);
      }).catch(function(){
        if(retry)setTimeout(function(){loadTrending(false)},3000);
        else sec.querySelector('.trending-loading').textContent='Could not load trending.';
      });
  }
  loadTrending(true);
})();
