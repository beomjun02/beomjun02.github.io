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

## Scope — one log = one question, ended by a verdict

A log is a **workstream record, not a changelog entry**. The unit is a **question** (≈ one action item / one campaign): the log opens when work on the question starts, accumulates dated Timeline entries while it is open, and closes when the question reaches a verdict (`done` / `closed` / `failed`). Duration is however long that takes — hours to ~2 weeks. If a question is still open after ~2 weeks, split it. A single fix, run, or config sweep is a Timeline entry *inside* the current log — never a log of its own. Weekly summaries are **views over logs, not logs**: link the logs, don't duplicate them.

**Before creating one, check `logs.json`** for a log in that project still on the same question (usually `status: running`). If there is one, update it instead:

- add a dated Timeline entry; refresh the Verdict, Results, and status pill; new media into its existing `assets/`
- extend the header `Dates` range; keep the folder name and URL unchanged
- in `logs.json` set `"updated": "YYYY-MM-DD"` and refresh `tldr` / `status` — dashboards sort by `updated` when present, so the log returns to the top

Start a new log only when the question changes, the open log reached a verdict (`done` / `closed` / `failed`), or it has run ~2 weeks.

## Add a new log

1. `mkdir -p <project>/logs/YYYY-MM-DD-<slug>/assets`
2. Copy `_template/log.html` → `index.html`; fill ALL-CAPS placeholders; uncomment optional blocks; delete unused sections. House rules are in the template's header comment.
3. Media into the log's own `assets/`: H.264 mp4 ≤5 MB + poster jpg; stills ≤500 KB, `loading="lazy"` below the fold.
4. Append one entry to `logs.json` (schema in the file).
5. Refresh static fallbacks in `experiments/index.html`: Archive `<li>` (≤10 entries) + the project card's `mini-feed` links.
6. Add the log to the **project hub's "All logs" section** (every hub carries its full per-project list; the dashboard only shows the last few).

New project: hub `index.html` (with an "All logs" section) + `logs/`, register in `logs.json` `projects` (including a `now` entry), add a static card in `experiments/index.html`.

## Project "now" line

`logs.json` → `projects.<id>.now = {text, status: active|blocked|idle, updated}` is the project's **current focus**, independent of any log — it is what the dashboard's Ongoing section leads with. Update it whenever the focus changes (sprint open/close, new directive), and set `status: idle` when nothing is running. A stale `now` is worse than none.

## Rules

- `<meta name="robots" content="noindex">` on every page. Public repo — no credentials, nothing double-blind-sensitive.
- Absolute asset paths (`/experiments/assets/…`).
- Real numbers only; provisional ones say so in the caption.
- Charts: one measure = one hue with direct labels; never dual-axis; ok/warn/bad reserved for status, never for series.
