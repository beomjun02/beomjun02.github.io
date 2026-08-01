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

  // ── index rendering from logs.json ─────────────────────────
  // <div class="proj-grid" data-projects data-root=".">  latest log per project
  // <ul class="log-feed" data-feed data-root="." [data-project="slug"]>  archive
  // data-root: relative path from the page to experiments/ (where logs.json lives).
  // Static markup inside these containers is the no-JS / fetch-failed fallback.
  var PILL = { done: 'ok', closed: 'warn', blocked: 'bad', failed: 'bad', running: 'acc' };

  document.addEventListener('DOMContentLoaded', function () {
    var feed = document.querySelector('[data-feed]');
    var grid = document.querySelector('[data-projects]');
    if ((!feed && !grid) || !window.fetch) return;
    var rootPath = (feed && feed.getAttribute('data-root')) ||
                   (grid && grid.getAttribute('data-root')) || '.';

    function pill(status) {
      return '<span class="pill ' + (PILL[status] || '') + '"><span class="dot"></span>' + status + '</span>';
    }
    // A log covers ONE question and ends in a verdict; it is updated in place while
    // that question is open. Sort/display by last change.
    function eff(l) { return l.updated || l.date; }
    var NOWPILL = { active: 'acc', blocked: 'bad', idle: '' };

    fetch(rootPath + '/logs.json').then(function (r) { return r.json(); }).then(function (db) {
      var logs = db.logs.slice().sort(function (a, b) { return eff(a) < eff(b) ? 1 : -1; });

      if (grid) {
        var byProj = {};
        logs.forEach(function (l) { (byProj[l.project] = byProj[l.project] || []).push(l); });
        var slugs = Object.keys(db.projects).sort(function (a, b) {
          var da = byProj[a] ? eff(byProj[a][0]) : '', dbb = byProj[b] ? eff(byProj[b][0]) : '';
          return da < dbb ? 1 : -1;
        });
        grid.innerHTML = slugs.map(function (s) {
          var p = db.projects[s], ls = byProj[s] || [];
          // "Now" line: the project's current focus — maintained in logs.json
          // projects.<id>.now, independent of any single log.
          var now = p.now && p.now.text
            ? '<div class="now-line"><span class="pill ' + (NOWPILL[p.now.status] || '') + '">' +
              '<span class="dot"></span>now</span><span class="nt">' + p.now.text + '</span>' +
              (p.now.updated ? '<span class="nd">' + p.now.updated + '</span>' : '') + '</div>'
            : '';
          var mini = ls.slice(0, 3).map(function (l) {
            return '<a class="latest" href="' + rootPath + '/' + l.path + '">' +
              '<span class="ldate">' + eff(l) + '</span>' + pill(l.status) +
              '<span class="lt">' + l.title + '</span></a>';
          }).join('') || '<span class="latest none">no logs yet</span>';
          return '<div class="proj-card"><h3><a href="' + rootPath + '/' + p.path + '">' + p.title + '</a></h3>' +
                 '<p>' + p.tagline + '</p>' + now + '<div class="mini-feed">' + mini + '</div></div>';
        }).join('');
      }

      if (feed) {
        var only = feed.getAttribute('data-project');
        var list = logs.filter(function (l) { return !only || l.project === only; });
        if (!list.length) return;
        var out = '', lastMonth = '';
        list.forEach(function (l) {
          var m = eff(l).slice(0, 7);
          if (m !== lastMonth) { out += '<li class="month-h">' + m + '</li>'; lastMonth = m; }
          var proj = (db.projects[l.project] || {}).title || l.project;
          out += '<li><a href="' + rootPath + '/' + l.path + '">' +
            '<span class="ldate">' + eff(l) + '</span>' +
            '<span class="lmain">' + (only ? '' : '<span class="lproj">' + proj + '</span>') +
            '<span class="lt">' + l.title + '</span>' +
            '<span class="ltl">' + (l.tldr || '') + '</span></span>' +
            pill(l.status) + '</a></li>';
        });
        feed.innerHTML = out;
      }
    }).catch(function () { /* static fallback markup remains */ });
  });
})();
