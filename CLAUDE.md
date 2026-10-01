# beomjun02.github.io

Beomjun's personal site, served by GitHub Pages from `main`.

- Root (`index.html`, `stylesheet.css`, `assets/`, `images/`) is the academic portfolio — do not restyle or restructure it.
- **Publications order** (sihyun.me convention): newest first — accepted papers by venue date (conference month), preprints/tech reports by arXiv date. Venue line = `NeurIPS 2026` etc.; oral/spotlight → `<span class="paper-badge">Oral Presentation</span>` on its own line under the venue, followed by ` (N/submissions=X.XX%)` (count of that tier / valid main-track submissions, 2 decimals; only from official numbers). "Selected" tab mirrors this order (`data-selected="1"`).
- **News**: one entry per paper — arXiv OR acceptance, never both. On acceptance, replace the paper's arXiv entry with the acceptance entry, dated by the decision month.
- `daily-news/` is written by the daily-news automation — leave it alone.
- **`experiments/` and `projects/` were moved out on 2026-10-01** to the PRIVATE repo `git@github.com:beomjun02/lab-notebook.git` (same paths, full history) and scrubbed from this repo's history. Never add them back here — this repo is public. Lab-notebook decks/logs go to `lab-notebook`; its `experiments/README.md` is the contract.
- `.nojekyll` must stay — the site is plain HTML.
- Public repo: no credentials, no double-blind-violating material.
- Deploy = commit + push to `main` (SSH remote; this machine's `gh` CLI is logged into a different account — use plain git). Pages goes live in ~1 minute.
