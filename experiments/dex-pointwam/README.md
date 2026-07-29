# Dex-PointWAM → Sim (experiment page)

Static project page for the Dex-PointWAM closed-loop sim campaign (2026-07-28 → 07-29).
Home URL: `https://beomjun02.github.io/experiments/dex-pointwam/`

## Contents
- `index.html` — the page (self-contained CSS; references `assets/` relatively).
- `assets/` — `reach.mp4`, `before_rotate.mp4`, `contactgrip.mp4` (H.264, web-friendly),
  `reach.gif` / `before.gif` (compact previews), `reach_f*.jpg` (key frames).

## Deploy (into the beomjun02.github.io repo)
```bash
# from a clone of git@github.com:beomjun02/beomjun02.github.io.git
mkdir -p experiments/dex-pointwam
cp -r /sjw_alinlab2/home/beomjun/beomjun02.github.io/experiments/dex-pointwam/* experiments/dex-pointwam/
git add experiments/dex-pointwam && git commit -m "Add Dex-PointWAM sim experiment page" && git push
```
GitHub Pages serves it at `/experiments/dex-pointwam/` within a minute of the push.

## Source
Full campaign log + final report: `openarm-sim/DEXPOINTWAM_SIM_CAMPAIGN.md`.
Memory: `dexwam-closed-loop-eval`.
