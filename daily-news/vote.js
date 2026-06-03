(function(){
  var dn=document.querySelector('.daily-news');if(!dn)return;
  var url=dn.dataset.feedbackUrl,user=dn.dataset.user,date=dn.dataset.date;
  if(!url||!user)return;
  var proxy='https://daily-news-api.bullbum1126.workers.dev/';
  var myVotes={};
  fetch(proxy+'?action=votes&user='+user)
    .then(function(r){return r.json()})
    .then(function(d){
      myVotes=d.my_votes||{};
      Object.keys(myVotes).forEach(function(id){
        var b=document.querySelector('.vote-btn[data-id="'+id+'"]');
        if(b)b.classList.add('voted');
      });
    }).catch(function(){});
  dn.addEventListener('click',function(e){
    var btn=e.target.closest('.vote-btn');if(!btn)return;
    var id=btn.dataset.id,link=btn.dataset.link,source=btn.dataset.source||'',title=btn.dataset.title;
    var wasVoted=!!myVotes[id];
    if(wasVoted){delete myVotes[id];btn.classList.remove('voted');}
    else{myVotes[id]=1;btn.classList.add('voted');}
    fetch(proxy,{method:'POST',headers:{'Content-Type':'text/plain'},
      body:JSON.stringify({user:user,date:date,action:wasVoted?'unvote':'upvote',
        value:link,source:source,item_id:id,title:title})
    }).catch(function(){});
  });
})();
