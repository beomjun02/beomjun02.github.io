(function(){
  var w=document.querySelector('.feedback');if(!w)return;
  var url=w.dataset.url,user=w.dataset.user,date=w.dataset.date;
  var sel=w.querySelector('.fb-action'),val=w.querySelector('.fb-value'),
      sub=w.querySelector('.fb-submit');
  var ph={feedback:'e.g. Papers section was great / too many LLM items',
    edit_keyword:'e.g. add VLA / remove quantum computing',
    edit_watchlist:'e.g. watch Qwen3.7 release at github.com/QwenLM / unwatch Orca Hand opensource release',
    tune_interest:'e.g. more open-source hardware / not interested in simulation-only papers',
    report_bug:'e.g. wrong arXiv link on paper X / dark mode button unreadable / page not loading'};
  sel.addEventListener('change',function(){val.placeholder=ph[sel.value]||'';});
  sub.addEventListener('click',function(){
    var v=val.value.trim();if(!v)return;
    sub.disabled=true;sub.textContent='...';
    fetch(url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},
      body:JSON.stringify({user:user,date:date,action:sel.value,value:v})
    }).then(function(){
      w.innerHTML='<p class="fb-thanks">Received — takes effect tomorrow.</p>';
    }).catch(function(){
      w.innerHTML='<p class="fb-thanks">Received — thanks!</p>';
    });
  });
})();
