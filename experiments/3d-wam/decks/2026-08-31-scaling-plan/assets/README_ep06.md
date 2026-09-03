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