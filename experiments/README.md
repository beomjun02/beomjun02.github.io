# experiments/ — lab notebook conventions

Experiment logs served at `https://beomjun02.github.io/experiments/`.
This file is the contract for any agent adding content here. Follow it exactly.

## Structure

```
experiments/
├── index.html            dashboard: Ongoing (latest log per project) + Archive (all logs, month-grouped)
├── logs.json             single registry — every log has one entry here
├── assets/lab.css|lab.js shared design system (tokens, components, theme toggle, feed renderer)
├── README.md             this file
├── _template/log.html    skeleton for a new log page
└── <project>/            e.g. dex-pointwam/, dex-point-policy/
    ├── index.html        project hub (story so far + its own log feed)
    ├── assets/           hub media
    └── logs/
        └── YYYY-MM-DD-<slug>/   one experiment log
            ├── index.html       the log (loads /experiments/assets/lab.css — absolute path)
            └── assets/          THIS log's media only — self-contained
```

## Adding a new experiment log

1. `mkdir -p <project>/logs/YYYY-MM-DD-<slug>/assets` — date = when the experiment ran (or ended), slug = short kebab-case.
2. Copy `_template/log.html` → `index.html` in that folder and fill it in with **real content, verdict first**. Section order: Result → Setup → Results vs baseline → Diagnosis → Timeline → Next → Artifacts & repro. Drop sections that don't apply; don't add new top-level patterns.
3. Media go in the log's own `assets/` (never reference another log's folder):
   - video: H.264 mp4, ≤ ~5 MB each, `autoplay loop muted playsinline preload="metadata"` + a `poster` jpg
   - stills: jpg/png, ≤ ~500 KB; add `loading="lazy"` below the fold
4. Append one entry to `experiments/logs.json` (schema documented in the file). Both dashboard sections — Ongoing (latest per project) and Archive (time-ordered, month-grouped) — render from it automatically.
5. Also refresh the static fallbacks in `experiments/index.html` (the no-JS view): add an Archive `<li>` for the new log (under its month header; keep only ~10 static entries) and update your project card's `.latest` link in Ongoing.

## New project

Add `<project>/index.html` (hub) + `<project>/logs/`, register it under `projects` in `logs.json`, and add a project card in `experiments/index.html`.

## Rules

- Every page: `<meta name="robots" content="noindex">` — this repo is public; logs are unlisted, not secret. Never put credentials, private data, or double-blind-violating material here.
- Design comes from `assets/lab.css` only. Page-local `<style>` is allowed for one-off tweaks, never for redefining tokens.
- Charts: single measure → one hue (accent) with direct value labels; never dual-axis; status colors (ok/warn/bad) are reserved for state, not series.
- Numbers must be real — no placeholder metrics, ever. If a number is provisional, say so in the caption.
- Deploy = commit + push to the `beomjun02.github.io` repo; Pages serves it within ~1 minute.
