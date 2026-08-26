/* deck.js — runtime for the DECK format. Vanilla, no dependencies.
   Theme uses its own 'deck-theme' localStorage key (NOT the site's
   'lab-theme'): decks open in the reference's light palette regardless of
   the site theme or the OS preference; `d` toggles dark for decks only.

   Markup contract (see _template/deck.html):
     <body class="deck-page">
     <main class="deck" data-project="…" data-deck="…" data-date="YYYY-MM-DD">
       <section class="slide s-…"> … </section>   (one per slide)
   Progressive disclosure: <ul data-steps> — one step per <li>; the current
   <li> is bold, siblings light grey (CSS). <li data-show="#id"> boxes that
   element while it is current. Any element with data-step="n" (1-based)
   appears from step n on. Steps are part of the URL: #/slide or #/slide/step.
   Keys: → ↓ Space PgDn Enter l j · ← ↑ PgUp Backspace h k · Home End ·
   o/Esc overview · f fullscreen · d theme · ? help · swipe on touch.
   Nothing visible is injected except the slide number bottom-right (.sn);
   theme is toggled with `d` only — no button, no progress bar. */
(function () {
  'use strict';
  var root = document.documentElement, KEY = 'deck-theme';   // deck-only key: the reference look (light) is the default; `d` toggles dark for decks only
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}
  function theme() {
    var t = root.getAttribute('data-theme');
    return t || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag); e.className = cls; if (html) e.innerHTML = html; return e;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var deck = document.querySelector('.deck'); if (!deck) return;
    var slides = [].slice.call(deck.querySelectorAll(':scope > .slide'));
    var N = slides.length; if (!N) return;
    var body = document.body, narrowMQ = matchMedia('(max-width: 699px)');

    // per-slide number (bottom-right, 8 pt grey — our only addition to the reference) + step count
    slides.forEach(function (s, i) {
      s.appendChild(el('div', 'sn', String(i + 1)));
      var k = s.querySelectorAll('[data-steps] > li').length;
      [].forEach.call(s.querySelectorAll('[data-step]'), function (e) {
        k = Math.max(k, parseInt(e.getAttribute('data-step'), 10) || 0);
      });
      s.steps = k;
      s.setAttribute('aria-label', 'Slide ' + (i + 1) + ' of ' + N);
    });

    // invisible mechanics: live region for screen readers + the ? help overlay
    var live = el('div', 'sr');
    live.setAttribute('aria-live', 'polite'); live.setAttribute('aria-atomic', 'true');
    var help = el('div', 'help', '<div class="card" role="dialog" aria-label="Keyboard help"><h3>Keys</h3><dl>' +
      '<dt>→ ↓ Space PgDn</dt><dd>next step / slide</dd>' +
      '<dt>← ↑ PgUp Bksp</dt><dd>previous</dd>' +
      '<dt>Home / End</dt><dd>first / last slide</dd>' +
      '<dt>o · Esc</dt><dd>overview (click a slide to jump)</dd>' +
      '<dt>f</dt><dd>fullscreen</dd><dt>d</dt><dd>light / dark theme (no button — the stage carries no chrome)</dd>' +
      '<dt>?</dt><dd>this help</dd>' +
      '<dt>#/n · #/n/s</dt><dd>deep link to slide n (step s)</dd>' +
      '<dt>⌘P</dt><dd>PDF — one 16:9 page per slide</dd></dl></div>');
    body.appendChild(live); body.appendChild(help);

    function toggleTheme() {
      var next = theme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
    }

    // state
    var cur = 0, step = 0;
    function narrow() { return narrowMQ.matches; }

    function applyStep(s) {
      var k = s.steps;
      s.classList.toggle('stepping', k > 0);
      if (!k) return;
      var items = s.querySelectorAll('[data-steps] > li');
      [].forEach.call(items, function (li, j) { li.classList.toggle('on', j === step); });
      [].forEach.call(s.querySelectorAll('.hl'), function (e) { e.classList.remove('hl'); });
      var on = items[step], sel = on && on.getAttribute('data-show');
      if (sel) [].forEach.call(s.querySelectorAll(sel), function (e) { e.classList.add('hl'); });
      [].forEach.call(s.querySelectorAll('[data-step]'), function (e) {
        e.classList.toggle('on', (parseInt(e.getAttribute('data-step'), 10) || 0) <= step + 1);
      });
    }
    function media() {
      slides.forEach(function (s, j) {
        [].forEach.call(s.querySelectorAll('video'), function (v) {
          if (j === cur && !body.classList.contains('ov')) {
            var p = v.play(); if (p && p.catch) p.catch(function () {});
          } else if (!narrow()) { v.pause(); }
        });
      });
    }
    function show(n, st) {
      n = Math.max(0, Math.min(N - 1, n));
      cur = n;
      step = Math.max(0, Math.min(Math.max(slides[n].steps - 1, 0), st || 0));
      slides.forEach(function (s, j) { s.classList.toggle('active', j === n); });
      applyStep(slides[n]);
      media();
      live.textContent = 'Slide ' + (n + 1) + ' of ' + N +
        (slides[n].steps ? ', step ' + (step + 1) + ' of ' + slides[n].steps : '');
      var h = '#/' + (n + 1) + (step ? '/' + (step + 1) : '');
      if (location.hash !== h) history.replaceState(null, '', h);
      if (narrow()) slides[n].scrollIntoView({ block: 'start' });
    }
    function next() {
      if (step < slides[cur].steps - 1) show(cur, step + 1);
      else if (cur < N - 1) show(cur + 1, 0);
    }
    function prev() {
      if (step > 0) show(cur, step - 1);
      else if (cur > 0) show(cur - 1, Math.max(slides[cur - 1].steps - 1, 0));
    }
    function fromHash() {
      var m = /^#\/(\d+)(?:\/(\d+))?/.exec(location.hash);
      show(m ? parseInt(m[1], 10) - 1 : 0, m && m[2] ? parseInt(m[2], 10) - 1 : 0);
    }

    // overview
    function overview(on) {
      body.classList.toggle('ov', on);
      if (on) slides[cur].scrollIntoView({ block: 'center' });
      else window.scrollTo(0, 0);
      media();
    }
    slides.forEach(function (s, i) {
      s.addEventListener('click', function () {
        if (body.classList.contains('ov')) { show(i, 0); overview(false); }
      });
    });

    // keyboard
    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return;
      var k = e.key, ov = body.classList.contains('ov');
      if (help.classList.contains('open') && k !== '?') { help.classList.remove('open'); e.preventDefault(); return; }
      switch (k) {
        case 'ArrowRight': case 'ArrowDown': case 'PageDown': case 'Enter': case 'l': case 'j':
          e.preventDefault(); ov ? show(Math.min(cur + 1, N - 1), 0) : next(); break;
        case ' ':
          e.preventDefault(); e.shiftKey ? prev() : next(); break;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': case 'h': case 'k':
          e.preventDefault(); ov ? show(Math.max(cur - 1, 0), 0) : prev(); break;
        case 'Home': e.preventDefault(); show(0, 0); break;
        case 'End': e.preventDefault(); show(N - 1, 0); break;
        case 'o': e.preventDefault(); overview(!ov); break;
        case 'Escape': if (ov) { e.preventDefault(); overview(false); } break;
        case 'f': e.preventDefault();
          document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen && root.requestFullscreen();
          break;
        case 'd': e.preventDefault(); toggleTheme(); break;
        case '?': e.preventDefault(); help.classList.toggle('open'); break;
      }
      if (ov && (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'ArrowDown' || k === 'ArrowUp'))
        slides[cur].scrollIntoView({ block: 'nearest' });
    });
    help.addEventListener('click', function () { help.classList.remove('open'); });

    // touch: horizontal swipe
    var tx = 0, ty = 0;
    document.addEventListener('touchstart', function (e) {
      tx = e.changedTouches[0].clientX; ty = e.changedTouches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (narrow() || body.classList.contains('ov')) return;
      var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { dx < 0 ? next() : prev(); }
    }, { passive: true });

    // print: light theme, all steps revealed (CSS), then restore
    var printTheme = null;
    window.addEventListener('beforeprint', function () {
      printTheme = root.getAttribute('data-theme'); root.setAttribute('data-theme', 'light');
    });
    window.addEventListener('afterprint', function () {
      if (printTheme) root.setAttribute('data-theme', printTheme); else root.removeAttribute('data-theme');
    });

    window.addEventListener('hashchange', fromHash);
    if (narrow()) {   // stacked mode: every slide visible, steps fully revealed
      slides.forEach(function (s) { s.classList.add('active'); });
    }
    fromHash();
  });
})();
