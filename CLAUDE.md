# beomjun02.github.io

Beomjun's personal site, served by GitHub Pages from `main`.

- Root (`index.html`, `stylesheet.css`, `assets/`, `images/`) is the academic portfolio — do not restyle or restructure it.
- `daily-news/` is written by the daily-news automation — leave it alone.
- `experiments/` is the lab notebook. **Before adding or editing anything there, read `experiments/README.md`** — it is the contract (structure, template, logs.json registry, media rules). New logs start from `experiments/_template/log.html`; all styling comes from `experiments/assets/lab.css` — never redefine tokens per-page.
- `.nojekyll` must stay — the site is plain HTML and `_`-prefixed dirs (e.g. `experiments/_template/`) must be served.
- Every experiments page keeps `<meta name="robots" content="noindex">`. Public repo: no credentials, no double-blind-violating material.
- Deploy = commit + push to `main` (SSH remote; this machine's `gh` CLI is logged into a different account — use plain git). Pages goes live in ~1 minute.
