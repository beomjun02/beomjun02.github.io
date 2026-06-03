(function(){
  var dn=document.querySelector('.daily-news');if(!dn)return;
  var user=dn.dataset.user,date=dn.dataset.date;
  var proxy='https://daily-news-api.bullbum1126.workers.dev/';
  var ALL_USERS=(dn.dataset.users||'').split(',').filter(Boolean);
  var otherUsers=ALL_USERS.filter(function(u){return u!==user;});
  var shareData={incoming:{},outgoing:{}};
  var svgIcon='<svg width="15" height="10" viewBox="-0.5 -0.5 13 9" fill="currentColor" stroke="none"><path d="M7 0 L12 4 L7 8 L7 5.5 C4 5.5, 2 6.5, 0.5 8 C0.5 4.5, 3 2.5, 7 2.5 Z"/></svg>';
  function renderShares(){
    Object.keys(shareData.outgoing).forEach(function(id){
      var btn=document.querySelector('.share-btn[data-id="'+id+'"]');
      if(btn)btn.classList.add('shared');
    });
    var notInFeed=[];
    Object.keys(shareData.incoming).forEach(function(id){
      var entry=shareData.incoming[id];
      var existing=document.querySelector('.vote-btn[data-id="'+id+'"]');
      if(existing){
        var li=existing.closest('li');
        var meta=li.querySelector('.item-meta');
        if(li.querySelector('.share-badge'))return;
        var badge=document.createElement('span');
        badge.className='share-badge';
        badge.textContent='↗︎ shared by '+entry.senders.join(', ');
        if(meta&&meta.nextSibling){meta.parentNode.insertBefore(badge,meta.nextSibling);}
        else if(meta){meta.parentNode.appendChild(badge);}
      }else{
        notInFeed.push({id:id,data:entry});
      }
    });
    var old=dn.querySelector('.shared-section');
    if(old)old.remove();
    if(notInFeed.length>0){
      var sec=document.createElement('div');
      sec.className='shared-section';
      sec.innerHTML='<h2>Shared with you</h2>';
      var ul=document.createElement('ul');
      notInFeed.forEach(function(item){
        var d=item.data;
        var li=document.createElement('li');
        li.innerHTML=
          '<div class="item-row"><span class="item-title"><a href="'+d.link+'">'+d.title+'</a></span>'
          +' <button class="vote-btn" data-id="'+item.id+'" data-link="'+d.link+'" data-title="'+d.title+'" title="upvote"><span class="tri"></span></button>'
          +' <button class="share-btn" data-id="'+item.id+'" data-link="'+d.link+'" data-title="'+d.title+'">'+svgIcon+'</button></div>'
          +'<span class="share-badge">↗︎ shared by '+d.senders.join(', ')+'</span>';
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      var fb=dn.querySelector('.feedback');
      if(fb){dn.insertBefore(sec,fb);}else{dn.appendChild(sec);}
    }
  }
  fetch(proxy+'?action=shares&user='+user+'&date='+date)
    .then(function(r){return r.json()})
    .then(function(d){if(d.status==='ok'){shareData=d;renderShares();}})
    .catch(function(){});
  var activeDropdown=null;
  function closeDropdown(){if(activeDropdown){activeDropdown.remove();activeDropdown=null;}}
  document.addEventListener('click',function(e){
    if(activeDropdown&&!e.target.closest('.share-dropdown')&&!e.target.closest('.share-btn')){closeDropdown();}
  });
  dn.addEventListener('click',function(e){
    var btn=e.target.closest('.share-btn');
    if(!btn||e.target.closest('.share-dropdown'))return;
    if(activeDropdown){closeDropdown();return;}
    var itemId=btn.dataset.id;
    var alreadySent=shareData.outgoing[itemId]||[];
    var dd=document.createElement('div');
    dd.className='share-dropdown';
    otherUsers.forEach(function(u){
      var sent=alreadySent.indexOf(u)>=0;
      var lbl=document.createElement('label');
      if(sent){lbl.style.opacity='0.5';}
      lbl.innerHTML='<input type="checkbox" value="'+u+'"'+(sent?' checked disabled':'')+
        '> '+u.charAt(0).toUpperCase()+u.slice(1);
      dd.appendChild(lbl);
    });
    var send=document.createElement('button');
    send.className='share-send';
    send.textContent='Send';
    send.addEventListener('click',function(ev){
      ev.stopPropagation();
      var checked=dd.querySelectorAll('input:checked:not(:disabled)');
      var targets=[];
      checked.forEach(function(cb){targets.push(cb.value);});
      if(targets.length){
        btn.classList.add('shared');
        if(!shareData.outgoing[itemId])shareData.outgoing[itemId]=[];
        targets.forEach(function(t){if(shareData.outgoing[itemId].indexOf(t)<0)shareData.outgoing[itemId].push(t);});
        fetch(proxy,{method:'POST',headers:{'Content-Type':'text/plain'},
          body:JSON.stringify({user:user,date:date,action:'share',
            item_id:itemId,value:btn.dataset.link,title:btn.dataset.title,
            recipients:targets})
        }).catch(function(){});
      }
      closeDropdown();
    });
    dd.appendChild(send);
    if(getComputedStyle(btn).position==='static')btn.style.position='relative';
    btn.appendChild(dd);
    activeDropdown=dd;
  });
})();
