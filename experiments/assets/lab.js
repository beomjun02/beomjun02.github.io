/* lab.js — theme toggle + logs.json-driven index lists.
   Log pages only need the theme toggle; index pages add data-feed. */
(function () {
  var root = document.documentElement;

  // ── theme ──────────────────────────────────────────────────
  var saved = null;
  try { saved = localStorage.getItem('lab-theme'); } catch (e) {}
  if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-btn');
    if (!btn) return;
    function paint() { btn.textContent = currentTheme() === 'dark' ? '◐ light' : '◑ dark'; }
    paint();
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('lab-theme', next); } catch (e) {}
      paint();
    });
  });

  // ── index feeds ────────────────────────────────────────────
  // <ul class="log-feed" data-feed data-root="." data-project="dex-pointwam">
  // data-root: relative path from the page to experiments/ (where logs.json lives).
  // data-project: optional filter; omit on the dashboard to show all projects.
  document.addEventListener('DOMContentLoaded', function () {
    var feed = document.querySelector('[data-feed]');
    if (!feed || !window.fetch) return;
    var rootPath = feed.getAttribute('data-root') || '.';
    var only = feed.getAttribute('data-project');
    fetch(rootPath + '/logs.json').then(function (r) { return r.json(); }).then(function (db) {
      var logs = db.logs.filter(function (l) { return !only || l.project === only; });
      logs.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      if (!logs.length) return;
      feed.innerHTML = logs.map(function (l) {
        var proj = (db.projects[l.project] || {}).title || l.project;
        var pillClass = { done: 'ok', closed: 'warn', blocked: 'bad', failed: 'bad', running: 'acc' }[l.status] || '';
        return '<li><a href="' + rootPath + '/' + l.path + '">' +
          '<span class="ldate">' + l.date + '</span>' +
          '<span class="lmain">' + (only ? '' : '<span class="lproj">' + proj + '</span>') +
          '<span class="lt">' + l.title + '</span>' +
          '<span class="ltl">' + (l.tldr || '') + '</span></span>' +
          '<span class="pill ' + pillClass + '"><span class="dot"></span>' + l.status + '</span>' +
          '</a></li>';
      }).join('');
    }).catch(function () { /* noscript fallback links remain */ });
  });
})();
