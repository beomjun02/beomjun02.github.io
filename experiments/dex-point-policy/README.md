# Dexterous Point Policy — ICLR 2027 (experiment page)

Working progress page for the ICLR 2027 resubmission of Dexterous Point Policy.
Home URL: `https://beomjun02.github.io/experiments/dex-point-policy/`

Reframes the NeurIPS 2026 reviews (2 / 4 / 2) into four contributions and tracks the two
already shipped: contact-label automation via a learned tactile model, and higher-DOF
dexterous hands (Wuji 20-DOF, Sharpa 22-DOF) running in Isaac Lab.

## Contents
- `index.html` — the page. Self-contained CSS + a little JS (theme toggle, scroll reveal);
  references `assets/` relatively. Light/dark theme, responsive.
- `assets/`
  - `run000_orbit_f0611.mp4`, `run000_canonical_palm.mp4`, `run000_contact.mp4` — tactile
    contact-prediction videos (H.264, autoplay/loop).
  - `tactile_orbit.gif` — compact preview of the rotating contact hand.
  - `run000_canonical_f0611.png`, `run000_canonical_f0345.png` — tactile heatmap stills.
  - `isaac_wuji_hand.png`, `isaac_sharpa_hand.png` — OpenArm + high-DOF hand renders (Isaac Lab).
  - `mujoco_wuji_hand.png` — build-check render (MuJoCo).

## Deploy (into the beomjun02.github.io repo)
```bash
# from a clone of https://github.com/beomjun02/beomjun02.github.io.git
mkdir -p experiments/dex-point-policy
cp -r /sjw_alinlab2/home/beomjun/beomjun02.github.io/experiments/dex-point-policy/* experiments/dex-point-policy/
git add experiments/dex-point-policy && git commit -m "Add DPP ICLR2027 experiment page" && git push
```
GitHub Pages serves it at `/experiments/dex-point-policy/` within ~1 minute of the push.

## Source
- Plan / direction: `DPP-ICLR2027/DIRECTION.md`, `DPP-ICLR2027/SIM-HANDSWAP-PLAN.md`
- Tactile check: `DPP-ICLR2027/tactile_check/`
- Page + assets built by the working session on 2026-07-29.
