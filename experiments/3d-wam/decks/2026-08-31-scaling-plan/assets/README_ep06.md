# 6-epoch evals — x10_sharpa and ciou_0p1 (ICLR27, 2026-09-03 22:30 KST)

Basis: stratified human val, 96 chunks × 5 datasets = 480 (ICLR27 corpus has no hot3d). i5@110k (rlwrld, 576 basis) is restricted to the same 5 datasets here (480 of its 576 chunks). ADE/zero in cm. Effective epochs: 110,996 steps × 32 / 591,977 = 6.00.

## Human basis per arm

| arm | scope | n | cos | cos_hand | ADE | zero | Acc5 % | zAcc5 % |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| i5_nohot3d @110k (6.0 ep) | ALL | 480 | 0.301 | 0.390 | 8.74 | 8.86 | 58.9 | nan |
| i5_nohot3d @110k (6.0 ep) | taco | 96 | 0.279 | 0.312 | 4.74 | 4.47 | 66.9 | nan |
| i5_nohot3d @110k (6.0 ep) | arctic | 96 | 0.313 | 0.351 | 10.35 | 9.34 | 47.8 | nan |
| i5_nohot3d @110k (6.0 ep) | dexycb | 96 | 0.288 | 0.494 | 8.98 | 10.04 | 56.2 | nan |
| i5_nohot3d @110k (6.0 ep) | oakink2 | 96 | 0.242 | 0.355 | 2.26 | 2.68 | 87.0 | nan |
| i5_nohot3d @110k (6.0 ep) | grab | 96 | 0.382 | 0.436 | 17.37 | 17.75 | 36.4 | nan |
| x10_sharpa @110,996 (6.0 ep) | ALL | 480 | 0.273 | 0.359 | 9.58 | 9.08 | 54.9 | 59.8 |
| x10_sharpa @110,996 (6.0 ep) | taco | 96 | 0.278 | 0.335 | 5.61 | 5.66 | 60.3 | 63.3 |
| x10_sharpa @110,996 (6.0 ep) | arctic | 96 | 0.295 | 0.326 | 11.41 | 9.34 | 43.2 | 53.6 |
| x10_sharpa @110,996 (6.0 ep) | dexycb | 96 | 0.284 | 0.475 | 8.85 | 10.04 | 56.4 | 54.3 |
| x10_sharpa @110,996 (6.0 ep) | oakink2 | 96 | 0.170 | 0.284 | 3.14 | 2.62 | 83.0 | 85.9 |
| x10_sharpa @110,996 (6.0 ep) | grab | 96 | 0.337 | 0.377 | 18.89 | 17.75 | 31.7 | 42.0 |
| ciou_0p1 @110,996 (6.0 ep) | ALL | 480 | 0.182 | 0.252 | 10.50 | 9.08 | 47.8 | 59.8 |
| ciou_0p1 @110,996 (6.0 ep) | taco | 96 | 0.117 | 0.165 | 8.10 | 5.66 | 44.9 | 63.3 |
| ciou_0p1 @110,996 (6.0 ep) | arctic | 96 | 0.198 | 0.237 | 11.26 | 9.34 | 39.8 | 53.6 |
| ciou_0p1 @110,996 (6.0 ep) | dexycb | 96 | 0.223 | 0.362 | 10.27 | 10.04 | 50.2 | 54.3 |
| ciou_0p1 @110,996 (6.0 ep) | oakink2 | 96 | 0.106 | 0.175 | 4.00 | 2.62 | 76.4 | 85.9 |
| ciou_0p1 @110,996 (6.0 ep) | grab | 96 | 0.269 | 0.321 | 18.86 | 17.75 | 27.6 | 42.0 |

## Paired deltas vs i5@110k on shared chunk keys (key = chunk index:start within the dataset, matched by (dataset,key)); 10k bootstrap, 95 % CI

| arm | shared n | Δcos | Δcos_hand | ΔADE cm (−=better) |
|---|---:|---|---|---|
| x10_sharpa | 288 | -0.023 [-0.035, -0.010] | -0.035 [-0.053, -0.016] | +0.82 [+0.55, +1.09] |
| ciou_0p1 | 288 | -0.098 [-0.119, -0.077] | -0.121 [-0.149, -0.092] | +1.23 [+0.87, +1.58] |

⚠️ the shared set = arctic + dexycb + grab (3 × 96 = 288): those datasets index identically on both clusters (identical zero values), while taco and oakink2 index differently on ICLR27 (taco zero 5.66 vs 4.47 cm; oakink2 2.62 vs 2.68), so their chunks do not pair. Paired deltas therefore cover 3 of 5 datasets. Means in the tables are unweighted per-chunk means (the JSON "ratio" fields are point-weighted and differ slightly, e.g. x10 ALL cos 0.267 there).

## x10_sharpa on the Sharpa basis (96 TACO chunks, retargeted hand)

| cos | cos_hand | ADE | zero | Acc5 % | zAcc5 % |
|---:|---:|---:|---:|---:|---:|
| 0.246 | 0.274 | 5.03 | 4.99 | 62.8 | 66.7 |

Paired human→Sharpa hand-direction gap (xeval, 192 matched (sequence,start) pairs): human cos_hand 0.320, Sharpa 0.299, gap -0.022 [-0.066, +0.023].

## ciou_0p1 contact placement (xcontact, 1 cm, same 480 chunks; z = zero-motion predictor)

| IoU | zIoU | prec | zprec | rec | zrec | pred contact frac | GT frac | z pred frac |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0.301 | 0.513 | 0.330 | 0.716 | 0.775 | 0.645 | 17.3 % | 7.4 % | 6.6 % |

Per-frame IoU decays t0→t9: 0.41, 0.37, 0.33, 0.32, 0.30, 0.29, 0.27, 0.27, 0.26, 0.25.

## Reading

- Neither arm beats the zero predictor on ADE at 6 ep on this basis (x10 9.58 vs zero 9.08; ciou_0p1 10.50 vs 9.08); i5@110k on the same 5 datasets: 8.74 vs 8.86.
- x10_sharpa (10 % Sharpa samples) sits below i5 on cosine on every dataset (paired Δcos -0.023); its Sharpa-basis ADE equals the zero predictor; human→Sharpa hand gap -0.022.
- ciou_0p1 (soft-IoU contact loss λ 0.1): paired Δcos -0.098 vs i5; contact IoU 0.30 vs zero 0.51 — it predicts contact on 17 % of hand points vs 7.4 % GT (over-prediction; precision 0.33 vs z 0.72), recall 0.77 vs 0.64.
- Pending: ciou_1p0 and ciou_0p001 (background QoS, ~40 % and ~25 % through), 320M (MLXP suspended).
## Data mix: episode-weighted (w_ep) vs uniform (ctl) — both 110,996 steps = 6.00 ep, 2×H100, same seed, same corpus index (2026-09-04 12:05 KST)

w_ep sampling mass per dataset = episode share (taco .4205, grab .2489, dexycb .1869, oakink2 .0919, arctic .0518) instead of chunk share (oakink2 .489, grab .210, taco .165, arctic .110, dexycb .025). ctl = identical recipe, uniform over chunks (human only, no contact loss, no Sharpa). Numbers are per-chunk means on the 480 basis.

| arm | scope | cos | cos_hand | ADE | zero | Acc5 % | zAcc5 % |
|---|---|---:|---:|---:|---:|---:|---:|
| ctl | ALL | 0.270 | 0.354 | 9.10 | 9.08 | 56.9 | 59.8 |
| ctl | taco | 0.267 | 0.300 | 5.58 | 5.66 | 61.9 | 63.3 |
| ctl | arctic | 0.294 | 0.335 | 10.23 | 9.34 | 48.6 | 53.6 |
| ctl | dexycb | 0.256 | 0.422 | 9.45 | 10.04 | 53.6 | 54.3 |
| ctl | oakink2 | 0.180 | 0.311 | 2.84 | 2.62 | 84.7 | 85.9 |
| ctl | grab | 0.354 | 0.400 | 17.39 | 17.75 | 35.7 | 42.0 |
| w_ep | ALL | 0.270 | 0.355 | 9.13 | 9.08 | 57.1 | 59.8 |
| w_ep | taco | 0.252 | 0.285 | 5.62 | 5.66 | 61.8 | 63.3 |
| w_ep | arctic | 0.300 | 0.346 | 10.32 | 9.34 | 49.3 | 53.6 |
| w_ep | dexycb | 0.268 | 0.438 | 9.43 | 10.04 | 54.5 | 54.3 |
| w_ep | oakink2 | 0.176 | 0.311 | 2.84 | 2.62 | 84.5 | 85.9 |
| w_ep | grab | 0.354 | 0.396 | 17.47 | 17.75 | 35.5 | 42.0 |

### Paired vs ctl on all 480 chunks (same index → every chunk pairs), 10k bootstrap 95 % CI

| arm | n | Δcos | Δcos_hand | ΔADE cm (−=better) | ΔAcc5 pp |
|---|---:|---|---|---|---|
| w_ep | 480 | +0.000 [-0.007, +0.007] | +0.001 [-0.007, +0.010] | +0.04 [-0.08, +0.16] | +0.23 [-0.32, +0.78] |
| x10_sharpa | 480 | +0.002 [-0.012, +0.017] | +0.006 [-0.014, +0.025] | +0.48 [+0.22, +0.75] | -1.97 [-3.15, -0.84] |
| ciou_0p1 | 480 | -0.088 [-0.107, -0.069] | -0.102 [-0.127, -0.078] | +1.40 [+1.10, +1.69] | -9.09 [-10.39, -7.82] |

w_ep vs ctl per dataset (Δcos / ΔADE cm):
- taco: Δcos -0.015 [-0.029, +0.002] · ΔADE +0.04 [-0.06, +0.15] cm (n=96)
- arctic: Δcos +0.006 [-0.008, +0.021] · ΔADE +0.09 [-0.27, +0.48] cm (n=96)
- dexycb: Δcos +0.012 [-0.000, +0.024] · ΔADE -0.02 [-0.22, +0.18] cm (n=96)
- oakink2: Δcos -0.003 [-0.014, +0.007] · ΔADE -0.01 [-0.12, +0.10] cm (n=96)
- grab: Δcos +0.000 [-0.021, +0.018] · ΔADE +0.08 [-0.32, +0.45] cm (n=96)

### ctl and w_ep vs the rlwrld i5 base (288 shared arctic/dexycb/grab chunks)

- ctl: Δcos -0.026 [-0.045, -0.006] · ΔADE +0.12 [-0.25, +0.51] cm (n=288)
- w_ep: Δcos -0.020 [-0.039, -0.001] · ΔADE +0.17 [-0.18, +0.55] cm (n=288)

### Reading

- ctl (ICLR27 baseline): cos 0.270, ADE 9.10 vs zero 9.08 cm, Acc5 56.9 vs z 59.8 %. w_ep: cos 0.270, ADE 9.13, Acc5 57.1 %.
- Paired w_ep − ctl: Δcos +0.000 [-0.007, +0.007], ΔADE +0.04 cm [-0.08, +0.16] on 480 chunks. Per dataset the sign follows the mass change: see the list above (dexycb/taco up-weighted, oakink2 down-weighted).
- ctl vs the rlwrld i5 base on 288 shared chunks: Δcos -0.026 — same recipe on two clusters; use this as the cross-cluster offset when reading the earlier x10/ciou-vs-i5 numbers.