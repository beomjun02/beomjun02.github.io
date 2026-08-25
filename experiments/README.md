# experiments/ — lab notebook

Served at `https://beomjun02.github.io/experiments/`. Contract for any agent adding content. Deploy = commit + push to `main` (live in ~1 min).

## Three formats — pick by job

| | **Deck** (default for new records, 2026-08-26) | **Log** (legacy records) | **Presentation** |
|---|---|---|---|
| For | every new experiment record — shown in the lab meeting | existing records; kept as they are | project hubs, milestone showcases |
| Template | `_template/deck.html` · worked example `_template/deck-example/` · rules `_template/DECK-STYLE.md` | `_template/log.html` | `_template/presentation.html` |
| Styling | `assets/lab.css` (tokens) + `assets/deck.css` + `deck.js` | `assets/lab.css` + `lab.js` | `assets/present.css` + `present.js` |
| Character | 16:9 slides, one message per slide, media-first, hard caps | long page, data-first, verdict-first | editorial, hero + story |

All three are light/dark (follow the viewer, toggle persists, shared across formats). All styling comes from the shared CSS — never redefine tokens per page.

### Deck grammar (full rules and the reference-deck citations: `_template/DECK-STYLE.md`)

1. **Title** — reference p01 literally: centred block — title · one plain context line · bold "Lab meeting" · date · presenter. Nothing else.
2. **Overview** — ONE slide: `[TL;DR]` thesis (one line) · ≤ 4 bullets saying what was done and what is to discuss today · 1–2 media filling the band.
3. **Method (1–3 slides)** — "Method (1): …": thesis (≤ 20 words, one line) + ≤ 3 one-line bullets + 1–2 figures with captions under them.
4. **Results (1–3 slides)** — all titled "Results": cumulative numbered sub-agenda (current item bold, others light grey) + ≤ 3 media.
5. **Discussion & Action items** — ONE slide: thesis · "Discussion:" items (options + one recommendation) · "Action items:" (owner · ETA).
6. **Appendix** (optional) — dense mono: setup · repro · data facts · content variants (related work, background); the last one ends with the cut list.
No visible chrome on the stage (no progress bar, theme button, footer); the slide number bottom-right is the only addition to the reference deck.
Main deck ≤ 8 slides. Meeting-prep protocol: inventory → triage (report / discuss / FYI / drop) → budget 5–10 min → order. Over a cap → cut, never shrink the font. GIF and H.264 MP4 embed natively; ← → / `o` overview / `f` fullscreen / `?` help; `#/n` deep links; ⌘P prints one 16:9 page per slide.

## Structure

```
experiments/
├── index.html        home: project tiles only — name + fixed thumbnail (<project>/assets/thumb.jpg)
├── logs.json         registry — one entry per record (deck or log); drives both dashboard sections
├── assets/           lab.css|js (tokens, Log) · deck.css|js (Deck) · present.css|js (Presentation)
├── _template/        deck.html · deck-example/ · DECK-STYLE.md · log.html · presentation.html
└── <project>/
    ├── index.html    hub (Presentation format); its "All logs" section lists decks and logs, newest first
    ├── assets/
    ├── decks/YYYY-MM-DD-<slug>/  one deck: index.html + its own assets/
    └── logs/YYYY-MM-DD-<slug>/   one log (legacy): index.html + its own assets/
```

## Scope — one record (deck or log) = one question, ended by a verdict

A record is a **workstream record, not a changelog entry**. The unit is a **question** (≈ one action item / one campaign): the record opens when work on the question starts, is updated in place while it is open, and closes when the question reaches a verdict (`done` / `closed` / `failed`). Duration is however long that takes — hours to ~2 weeks. If a question is still open after ~2 weeks, split it. A single fix, run, or config sweep is an update *inside* the current record (a deck refreshes its verdict, evidence and asks; a log adds a Timeline entry) — never a record of its own. Weekly summaries are **views over records, not records**: link them, don't duplicate them.

## Add a new deck

1. Check `logs.json` for an open deck (or log) on the same question — if there is one, update it (below).
2. `mkdir -p <project>/decks/YYYY-MM-DD-<slug>/assets`; copy `_template/deck.html` → `index.html`; copy slides from `_template/deck-example/` by their `<!-- SECTION: … -->` comment; fill ALL-CAPS placeholders; run the pre-publish check in the template header (caps).
3. Media into the deck's own `assets/`: H.264 mp4 ≤5 MB + poster jpg, GIF ≤3 MB; absolute paths when reusing another record's media.
4. Append one entry to `logs.json` with `"format": "deck"` (schema in the file).
5. Add the deck to the **project hub's "All logs" section**, newest first — that section is the project's full archive of decks and logs and the only place records are listed.

## Add a new log (legacy format — only when extending an existing log)

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
5. Add the log to the **project hub's "All logs" section**, newest first — the hub is the project's full time-ordered archive and the only place logs are listed. **This section is the FIRST section of the hub** (immediately after the header/hero), so clicking a project tile lands on the log list without scrolling; presentation content follows below. The home page (`experiments/index.html`) never changes when a log is added: it carries only project tiles (name + fixed thumbnail).

New project: hub `index.html` (with an "All logs" section) + `logs/` + a fixed `assets/thumb.jpg` (16:9, ≤200 KB, changed rarely), register in `logs.json` `projects`, add a tile in `experiments/index.html`.

## Project "now" line

`logs.json` → `projects.<id>.now = {text, status: active|blocked|idle, updated}` is registry metadata for the project's **current focus** (hub pages may surface it; the home page does not). Update it when the focus changes; set `status: idle` when nothing is running. A stale `now` is worse than none.

## Rules

- `<meta name="robots" content="noindex">` on every page. Public repo — no credentials, nothing double-blind-sensitive.
- Absolute asset paths (`/experiments/assets/…`).
- Real numbers only; provisional ones say so in the caption.
- Charts: one measure = one hue with direct labels; never dual-axis; ok/warn/bad reserved for status, never for series.
