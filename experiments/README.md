# experiments/ — lab notebook

Served at `https://beomjun02.github.io/experiments/`. Contract for any agent adding content. Deploy = commit + push to `main` (live in ~1 min).

## Two formats — pick by job

| | **Log** (default) | **Presentation** |
|---|---|---|
| For | every experiment record | project hubs, milestone showcases |
| Template | `_template/log.html` | `_template/presentation.html` |
| Styling | `assets/lab.css` + `lab.js` | `assets/present.css` + `present.js` |
| Character | data-first, verdict-first | editorial, hero + story |

Both are light/dark (follow the viewer, toggle persists, shared across formats). All styling comes from the shared CSS — never redefine tokens per page.

## Structure

```
experiments/
├── index.html        dashboard: Ongoing (latest per project) + Archive (month-grouped)
├── logs.json         registry — one entry per log; drives both dashboard sections
├── assets/           lab.css|js (Log) · present.css|js (Presentation)
├── _template/        log.html · presentation.html
└── <project>/
    ├── index.html    hub (Presentation format)
    ├── assets/
    └── logs/YYYY-MM-DD-<slug>/   one log: index.html + its own assets/
```

## Add a log

1. `mkdir -p <project>/logs/YYYY-MM-DD-<slug>/assets`
2. Copy `_template/log.html` → `index.html`; fill ALL-CAPS placeholders; uncomment optional blocks; delete unused sections. House rules are in the template's header comment.
3. Media into the log's own `assets/`: H.264 mp4 ≤5 MB + poster jpg; stills ≤500 KB, `loading="lazy"` below the fold.
4. Append one entry to `logs.json` (schema in the file).
5. Refresh static fallbacks in `experiments/index.html`: Archive `<li>` (≤10 entries) + the project card's `.latest` link.

New project: hub `index.html` + `logs/`, register in `logs.json` `projects`, add a static card in `experiments/index.html`.

## Rules

- `<meta name="robots" content="noindex">` on every page. Public repo — no credentials, nothing double-blind-sensitive.
- Absolute asset paths (`/experiments/assets/…`).
- Real numbers only; provisional ones say so in the caption.
- Charts: one measure = one hue with direct labels; never dual-axis; ok/warn/bad reserved for status, never for series.
