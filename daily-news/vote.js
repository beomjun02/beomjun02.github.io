(function(){
  var dn=document.querySelector('.daily-news');if(!dn)return;

  // ── Inject vote + share buttons into item rows (chrome built client-side) ──
  // The server emits only content + data hooks (data-id/link/source/title) on
  // each .item-row; the buttons are created here so button UI changes need no
  // page re-render. Old pages (buttons baked into HTML, no data-id on the row)
  // are skipped and keep their existing buttons — fully backward compatible.
  var SHARE_SVG='<svg width="15" height="10" viewBox="-0.5 -0.5 13 9" fill="currentColor" stroke="none"><path d="M7 0 L12 4 L7 8 L7 5.5 C4 5.5, 2 6.5, 0.5 8 C0.5 4.5, 3 2.5, 7 2.5 Z"/></svg>';
  try{
    var rows=dn.querySelectorAll('.item-row[data-id]');
    for(var i=0;i<rows.length;i++){
      try{
        var row=rows[i];
        if(row.querySelector('.vote-btn'))continue; // idempotent / already present
        var id=row.getAttribute('data-id'),link=row.getAttribute('data-link'),
            source=row.getAttribute('data-source')||'',title=row.getAttribute('data-title')||'';
        var vb=document.createElement('button');
        vb.className='vote-btn';vb.title='upvote';
        vb.setAttribute('data-id',id);vb.setAttribute('data-link',link);
        vb.setAttribute('data-source',source);vb.setAttribute('data-title',title);
        vb.innerHTML='<span class="tri"></span>';
        var sb=document.createElement('button');
        sb.className='share-btn';
        sb.setAttribute('data-id',id);sb.setAttribute('data-link',link);
        sb.setAttribute('data-title',title);
        sb.innerHTML=SHARE_SVG;
        row.appendChild(document.createTextNode(' '));row.appendChild(vb);
        row.appendChild(document.createTextNode(' '));row.appendChild(sb);
      }catch(e){}
    }
  }catch(e){}

  // ── Vote behavior (event delegation; works for baked-in or injected buttons) ──
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
