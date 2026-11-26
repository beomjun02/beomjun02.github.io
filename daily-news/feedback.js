(function(){
  var w=document.querySelector('.feedback');if(!w)return;
  var url=w.dataset.url,user=w.dataset.user,date=w.dataset.date;
  if(!url)return;

  // Widget options live HERE (single source of truth). Because the widget is
  // built dynamically, changing/adding an option only requires editing this
  // file — it applies to every page (past and present) with no re-render.
  var OPTS=[
    {v:'feedback',       label:'Feedback',       ph:'e.g. Papers section was great / too many LLM items'},
    {v:'edit_keyword',   label:'Edit keyword',   ph:'e.g. add VLA / remove quantum computing'},
    {v:'edit_watchlist', label:'Edit watchlist', ph:'e.g. watch Qwen3.7 release at github.com/QwenLM / unwatch Orca Hand opensource release'},
    {v:'tune_interest',  label:'Tune interest',  ph:'e.g. more open-source hardware / not interested in simulation-only papers'},
    {v:'report_bug',     label:'Report bug',     ph:'e.g. wrong arXiv link on paper X / dark mode button unreadable / page not loading'}
  ];

  // Build (or overwrite) the widget so all pages share one definition.
  var opts=OPTS.map(function(o){return '<option value="'+o.v+'">'+o.label+'</option>';}).join('');
  w.innerHTML='<div class="feedback-row">'
    +'<select class="fb-action">'+opts+'</select>'
    +'<input class="fb-value" type="text" placeholder="'+OPTS[0].ph.replace(/"/g,'&quot;')+'" maxlength="500">'
    +'<button class="fb-submit">Send</button></div>';

  var ph={};OPTS.forEach(function(o){ph[o.v]=o.ph;});
  var sel=w.querySelector('.fb-action'),val=w.querySelector('.fb-value'),sub=w.querySelector('.fb-submit');
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
