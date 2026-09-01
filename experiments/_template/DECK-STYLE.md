# DECK-STYLE — the meeting slide-deck format (2026-08-26 evening: colours sampled from the reference pixels, text caps tightened · 2026-08-31 **v4 VIZ-FIRST**: evidence mandatory on every content slide, text caps tightened again — owner: "still too much text; prioritize visualizations — rollouts, tables, graphs — over text" · 2026-09-01 **v5 WORKSTREAM-ORDERED**: a block per workstream (setup → results → ETA), dated placeholders for pending results *and* pending visuals, effective-epoch labelling, un-narrated viz grids outside the slide cap, **ETA as its own strip stating hours not just dates**, closing summary slide = running / due / your-decisions, external arenas introduced from source with their own image — see §4b; §2 compacted the same day)

Deck = the default record for new experiments (README.md). Files: `assets/deck.css` + `deck.js`, template `_template/deck.html`, worked example `_template/deck-example/` (one canonical slide per section — read it instead of the reference PDF). Side-by-side proofs vs the reference pages: `~/3d-wam/ref/compare_v3/` (v3 = this version; `compare/` = the morning version). Reference pages rendered at 110 dpi: `~/3d-wam/ref/refdeck/p01–p15.png`.

## 1. Reference deck — what we match (re-measured 2026-08-26 by row projection of the rendered pages)

Source: T. Kim, lab seminar 2026-08-10 (15 pp, 720×405 pt = 16:9). Structure and style only — no content or figure copied. `p#` = page. Unit note: on `.slide` **1em = 1 % of the stage width** (≙ 7.2 pt); 1 % of the stage *height* = 0.5625em.

**Geometry / chrome**
- 16:9, white background, **NO VISIBLE CHROME**: no logo, progress bar, theme button, footer strip, page number, section divider or agenda slide (all pp). The only recurring extra is a tiny grey footnote bottom-left (p2–6, p13–14: Calibri 8 pt #595959, cap-top at 95.8 % of the height, left 3.4 %). → we paint exactly that footnote (`<p class="footnote">`, only on slides that declare it) **and an 8 pt grey slide number bottom-right — our only addition to the reference** (for "go back to slide 4"). Theme is toggled with the `d` key; nothing else is on the stage.
- Left margin 22 pt = 3.1 % of the width (title ink at 3.2 %); title cap-top at 8.3 % of the height; identical on every content slide (p2–15).

**Content-slide skeleton** (identical on all 13 content slides, top → bottom; measured cap-tops as % of height)
1. **Topic title** — Calibri Bold 24 pt (5.9 % of height = 3.33em), **#0070C0**, top-left, one line, a *topic label* not a sentence: "Method (1): Dual-Timestep Scheduling" p8, "Experimental Results" p10–12, "Summary" p15. Cap-top 8.3 %.
2. **Thesis** — one bold black sentence, 16 pt (4 % = 2.22em), ONE line, cap-top 20.8 % (p3, p8, p9, p15); on the Overview slide it is prefixed **[TL;DR]** in the same plain bold black (p2). Regular weight when it is context rather than a claim (p4–7).
3. **Bullets** — 2–4, Calibri 14 pt (3.5 % = 1.94em), first cap-top 29.1 %, pitch 4.75 % (line-height 1.375); round "•" at 4.8 % of the width, text at 8.0 %; sub-bullets 12 pt, marker 9.8 %, text 13.1 % (p8, p15). Never wrapping. Emphasis inside a bullet = bold lead + " | " + smaller regular aside (p4–6). A conclusion line starts with "→", indented like the bullets (p6).
4. **Evidence band** — the lower 46–60 % of the slide (p02: 48.5–89.3 %; p10: 58.6–98.2 %): 1–4 figures/tables side by side at **equal heights spanning the full content width**, un-boxed, no heading above, each with an italic 11 pt (2.7 % = 1.53em) #595959 caption centred directly underneath (p2, p3, p10, p12). Text never exceeds ≈ 45 % of the height — the band carries the slide.

**Results slides (p10–12)** — the title "Experimental Results" repeats; under it a cumulative numbered sub-agenda at 16 pt: the current item bold black with its 14 pt sub-bullets, the other items light grey **#B3B3B3** with their sub-bullets hidden; the figures of the current item fill the band. → `<ol class="agenda">` with `<li class="on">`, one slide per item. The same dim/bold convention stepped on one slide (Motivation p4→6) is `<ol data-steps>`; the figure of the current item gets a thin black box (p6, `data-show`).
**Title slide (p1)** — a centred block only: bold #0070C0 title (23.8 pt, cap-top 43.6 % of the height), authors (12.6 pt, line-height 1.38), a blank line, bold venue + link, a blank line, date "2026. 08. 10", "Presented by <name>". → ours: title · ONE plain context line · **bold venue ("Lab meeting")** · date · "Presented by". Nothing else (no pill, eyebrow, lede, metadata, footnote or URL unless real).
**Summary slide (p15)** — bold thesis + bullet(s), then bold 16 pt subhead "Limitations & Future Directions:" + bullets with sub-bullets. → our slide 5 "Discussion & Action items" uses the same subhead style for "Discussion:" and "Action items:".
**Palette — SAMPLED from the rendered reference pixels (PIL on the 110-dpi PNGs, 2026-08-26 evening; dominant non-white colour per region)** — stage **#FFFFFF** · title **#0070C0** (p01 title, p02 title: 6,986 / 1,022 px exact) · thesis + bullets + active agenda item **#000000** (pure black, not the site's #17222E) · dimmed agenda items **#B3B3B3** (p10) · figure captions **#595959** (p02 caption; footnotes anti-alias to #6B6B6B at 8 pt = the same #595959) · links **#0097A7** (p01 URL). Emphasis inside body text = bold black, nothing coloured. **Font** Calibri (Bold/Italic); ArialMT only for the "→" glyph.

**Text-description style of the reference (how the words are written, not only how many)** — titles are *topic labels* ("Method (1): Dual-Timestep Scheduling", "Experimental Results", "Summary"), never sentences · ONE bold takeaway sentence under the title (p2 "[TL;DR] Integrating representation learning into the generative framework – no external supervision") · bullets are **short noun phrases or clipped clauses** ("Create asymmetry by sampling two timesteps", "Scaling behavior on larger models") — no full paragraphs, no trailing periods · sub-bullets exist only for detail on a mechanism (p8) or on the results agenda (p10–12), never on an overview · the results agenda is **cumulative and numbered**, inactive items dimmed #B3B3B3 · every number sits in a table or a figure (p10: Table 1 + three plots), the prose above carries none · citations are tiny grey footnotes ("[1] Black Forest Labs, FLUX 3 (bfl.ai/blog/flux-3)").

**Adaptation to the site tokens** — light = the PDF, exactly: `--title:#0070C0`, `--ink:#000`, `--cap:#595959`, `--dim:#B3B3B3`, `--link:#0097A7`, `--stage:#FFFFFF` (plain grey links inside footnotes). **Light is the default in every viewer: the OS dark preference is ignored and the site's theme choice does not leak in** (deck.js keeps its own `deck-theme` key); dark exists only on an explicit `d` press and maps the roles onto the site's dark tokens (#4CC2FF title, #E6EBF2 text, #98A4B6 captions, #6B788C dimmed, #121722 stage). deck.css also PINS the site tokens that inline-SVG figures use (`--txt --mut --mut2 --acc --line --panel --panel2 --acc-bg --acc-line`) to the light palette inside `.deck`, so a figure never inherits the site theme — that was the 2026-08-26 "colours don't match" bug. **Font stack** `Calibri, Carlito, "Source Sans 3", "Segoe UI", "Helvetica Neue", Arial, sans-serif`; deck.css `@import`s Source Sans 3 (400/600/700 + italic) from Google Fonts so Linux / no-Office machines get a Calibri-class face — the one-line thesis test is run with that fallback. `--mono` only for paths, appendix, code.

## 2. Secondary sources — compacted (2026-09-01); each line = source → the rule it gave us

- **Alley, assertion-evidence** (assertion-evidence.com; Garner & Alley 2013) — headline states the assertion, body is visual evidence → **the thesis line IS the assertion**; the reference's topic title stays above it because that is how this lab reads decks.
- **Doumont, *Trees, maps, and theorems*** · **Fatahalian, *Clear Talks*** · **Peyton Jones, *Great research talk*** — one message per slide stated as a sentence; "show, don't tell"; explain a graph's axes before its point; motivation 20 / key idea 80, "there is no 3"; no outline slide → thesis ≤ 2 lines · captions name what varies · main deck ≤ 8 content slides · Overview bullets are a triage list (done | discuss), never a table of contents · the `o` grid is the thumbnail test.
- **Tufte, *Cognitive Style of PowerPoint*** — PP graphics carry ~12 numbers where Science carries >1000 → tables carry real numbers; the appendix holds what a Log used to.
- **Butterick** (practicaltypography.com/presentations.html) · **speaking.io** — one base type size per slide even for one-liners; "remove words, make it bigger"; avoid pure black on pure white → one fixed scale per slide class.
- **Mechanics** — reveal.js (fixed canvas, scaled+letterboxed; ← → Space, O overview, F fullscreen, `?print-pdf`) and Slidev (`o`/`f`/`d`/`g`) → our keys in §5; we print with no special URL (`@page` 320×180 mm, one slide per page).
## 3. Fixed deck structure — one deck = one question (owner's rule, 2026-08-26)

Every deck, in this order (`<!-- SECTION: … -->` names in the markup; worked examples in `_template/deck-example/`):
1. **title** `s-title` — reference p01 literally: centred block — deck title (bold blue, 1–2 lines) · one plain context line (e.g. "3D-WAM · action item 1.2 · point budget") · bold venue line ("Lab meeting") · date · "Presented by". Nothing else.
2. **overview** `s-overview` — ONE slide that merges the old TL;DR + Agenda: `<b>[TL;DR]</b>` thesis (one line) + ≤ 3 bullets that say what was DONE and what is to DISCUSS today; 1–2 media filling the band (a hero visual is mandatory); sources in the footnote. No two-column layout, no separate Agenda slide.
3. **method** `s-method` — what you did, 1–3 slides titled "Method (1): …", "Method (2): …" (p8–9): thesis + ≤ 3 bullets + 1–2 figures. Optional content types (related work `s-table`, background, data facts) are *variants* of this slide — allowed only in the appendix, not in the main flow.
4. **results** `s-results` — what you observed, 1–3 slides all titled "Results" (p10–12): `<ol class="agenda">` cumulative numbered sub-agenda, the item shown on this slide `<li class="on">` bold with ≤ 2 one-line sub-bullets, the others light grey; ≤ 2 media fill the band (a ≤ 6-row table counts as one), captions (label first) say what is shown and which parameter varies — never how it looks.
5. **discussion-actions** `s-discuss` — ONE slide: bold thesis · optional `<p class="subhead">Decided:</p>` one bullet · `<p class="subhead">Discussion:</p>` ≤ 3 numbered ONE-LINE items: bold decision — options → recommendation (who decides) · `<p class="subhead">Action items:</p>` ≤ 4 numbered one-line items with "(id · owner · ETA)". No sub-bullets (2026-08-26 evening). The old Asks and Next slides are folded in here.
– **appendix** `s-appendix` (optional) — dense mono: setup · repro · data facts · remaining evidence (`s-compare` with a `.thesis.ctx`); the LAST one carries the cut list (`<p class="cut">`).
Markup rules: no `<h3 class="lbl">` above figures — one italic caption under each; GIF/MP4 download links and colour keys go in `<p class="footnote">`, never in captions; lists are plain (no tags, rules or arrows); GIFs carry no baked-in text (the caption/footnote carries it). Update the open deck instead of adding one (README scope rule).

## 4. Meeting-prep protocol and HARD CAPS

Purpose (owner): prevent content/text overload in experiment records so attention stays on what matters. Decks serve a 5–10 min meeting with the supervisor.
1. **Inventory** — list every candidate item (results, findings, artifacts, open questions, blockers) in a scratch list.
2. **Triage** each item: **REPORT** (done, no input needed → one Overview bullet or one Method/Results slide) · **DISCUSS** (needs the supervisor's judgment → Discussion item as options + my recommendation; this is where the meeting time goes) · **FYI** (available, not spoken → appendix) · **DROP**.
3. **Budget** — 5–10 min ≈ 6–8 main slides, ~1 min each; DISCUSS items get the most time.
4. **Order** — the fixed structure of §3: Title → Overview → Method → Results → Discussion & Action items → appendix.  5. Overview and Discussion & Action items are **mandatory**.

**Hard caps** (owner, 2026-08-26 evening: "too much text in slides — only essentials"; tightened 2026-08-31 **v4**: "still too much text — prioritize visualizations (rollouts, tables, graphs) over text"; over a cap → cut TEXT or move it to the appendix, never shrink the font; when a slide is over budget, bullets go before figures):
- main deck **≤ 8 slides** (title + overview + ≤ 3 method + ≤ 3 results + discussion)
- **one** thesis sentence per slide, **≤ 12 words**, ONE line at stage width
- **≤ 3 bullets** per slide, each **≤ 6 words** (word = token containing a letter or digit; "·", "→", "=" do not count) — noun phrases or clipped clauses, no trailing period
- **no sub-bullets on main slides** except the Results agenda (`ol.agenda > li.on > ul`, ≤ 2 items, each one line); Discussion and Action items are **one line each** (bold lead + options → recommendation + "(owner)" / "(id · owner · ETA)")
- **evidence is the slide: 1–4 evidence items per content slide** (rollout GIF > graph > table; a table counts as one item), **≥ 1 mandatory on every content slide** — a slide with no visual gets one made, or gets cut; appendix slides uncapped
- media priority when trimming: keep the rollout, then the graph, then the table — text goes first
- **every measured number lives in a figure or in a table of ≤ 6 body rows (+ 1 total row)** — never in prose; a thesis may name a setting (N = 2048, 15 Hz) and an agenda sub-bullet may carry one number
- title slide = exactly title · context · venue · date · presenter · Discussion **≤ 3** items · Action items **≤ 4**
- everything else → appendix or DROPPED; the last appendix slide carries a **cut list** (`<p class="cut">`, wraps — never truncated) so nothing is silently lost
**Pre-publish check** (run it programmatically — `wc`-style word counts per `.thesis` / `li`, media per `.band`, rows per table): main slides ≤ 8 **excluding viz-grid slides (§4b D)** · thesis ≤ 12 words and one line at 1440 px (deck.css clips a wrapping thesis with an ellipsis — shorten the text) · bullets ≤ 6 words, none wraps · no `li > ul` on main slides outside `ol.agenda` · 1–4 media per band and ≥ 1 on every content slide · tables ≤ 6 body rows · numbers not in prose · title slide minimal · Discussion ≤ 3, actions ≤ 4 · cut list present · no image judged in text · **every `src="assets/…"` resolves and every asset in the folder is referenced or deliberately kept** · **v5: each workstream block has setup + results + an `p.etabar` ETA strip quoting HOURS as well as a date; every pending result is a `tr.pend` row with a date and every pending visual a `figure.phold` tile; every training clip caption carries model + step + effective epoch + mode + horizon + task; no two evaluation bases inside one table; viz-grid slides contain no verdict text; the last main slide is the running / due / your-decisions summary; an external-arena slide shows that arena's own credited image** · screenshot every slide (Playwright, 1440×810, light) and compare a title, an overview and a results slide side by side with p01 / p02 / p10 before publishing.

## 4b. v5 — workstreams, fair units, honest placeholders, ETA (owner, 2026-09-01)

§3 and §4 stay in force. v5 governs decks reporting **several workstreams in parallel** (the normal
case once more than one experiment is live), how visuals are labelled, and how time is stated.

**A. Order by workstream, not by chronology.** One block per workstream in the owner's priority
order, each carrying **setup → results → ETA**. Title → Overview → workstream blocks → closing
summary → appendix. The Results-agenda stepper (§3.4) numbers the workstreams. Campaign chronology
as an ordering is **superseded** — it buries live decisions behind finished work.

**B. Not-yet results are shown, never omitted.** Pending results are explicit `tr.pend` rows with a
date, and the caption names the target the number must beat. A workstream with no results yet still
gets its block, its setup and its ETA. An absent row reads as "not thought about".

**C. Every visual and results row carries its comparable unit.** Steps are **not** comparable across
configs (a 320M step at batch 256 = 8× the samples of a 120M step at 32; corpora differ too), so
label **effective epochs = steps × effective batch ÷ corpus** and name the corpus. General rule:
**when two things are compared, the axis is the fair one, not the convenient one** — and if the fair
axis breaks an earlier claim, that correction goes in the appendix on the record. Likewise **never mix
two evaluation bases in one table**; name the basis and its own baseline wherever a number appears.

**D. Visualisation grids are unlimited, un-narrated, and outside the ≤ 8 cap.** Grids of clips or
figures get their own slides in the MAIN flow beside the workstream they serve (owner: "freely add
separate slides that contain a grid of visualizations"). **No interpretation, no verdict** — only the
grid and its captions. Each caption states: **model · training step · effective epoch · mode ·
horizon/chunk · dataset, episode or chunk id, task text**, plus the per-item metric if one exists.
Comparisons are made by *construction* (same chunk id, camera, seed) and the footnote says so. A
caption never says how something looks — the owner judges pictures.

**E. Pending visuals get a placeholder tile.** A figure that does not exist yet is a dashed
`figure.phold > .pbox` reading "WILL UPDATE", what it will show (model · target epoch · same chunk),
and its caption gives the date and the hours. Never leave the slot out and never quietly re-use an
older clip in its place.

**F. ETA is its own section — never a column inside the results table.** Each workstream slide ends
with an `p.etabar` strip below the band (accent rule, panel background), and it states **hours of
work as well as the clock time**: "+28.3 h compute → Wed 09-02 ~22:45". Hours are what makes an ETA
checkable; a bare date hides whether a slip is minutes or a day. Unestimated work is labelled
**unestimated** rather than given an invented number.

**G. The closing slide is the summary.** Last main slide = three tables: **what is running** (current
progress, target, compute left, landing time) · **results due that need no input** (hours + when) ·
**decisions the owner must make** (deadline + my recommendation), plus an "ETA at a glance" strip.
It replaces a generic Discussion slide: the owner's question is always "what is running, when does it
land, what do you need from me".

**H. An external arena/benchmark gets introduced from its source, with its own picture.** State,
fetched and not remembered: tasks + split by type · demos per task · simulator/engine · embodiment id
· episode budget · eval command verbatim · **published baselines with the row that honestly matches
OUR claim marked** (a zero-shot claim compares to their zero-shot row, never their post-trained one).
Include **the benchmark's own figure or scene image** from its repo/project page, credited in the
caption — a slide about an arena we have never run in must show that arena. Task list → appendix.
Pair it with a **components table** (one row per thing still to build, state + ETA) where anything
with no precedent in our pipeline is a **risk row, not an ETA**.

## 4c. Producing a deck without burning the session (process, 2026-09-01)

Owner, after a deck rebuild ate most of a context window: **deck production is delegated work, not
main-thread work.** Layout iteration is a slow loop — edit, render, look, trim, repeat — and every
screenshot costs context that the actual research needs.

1. **Delegate the build to a subagent.** Hand it: the numbers (as a table), the slide order, the
   caps in §4/§4b, and the asset paths. Ask it to return the finished file plus the screenshot
   check below. Keep the *content decisions* on the main thread; give away the pixel-fitting.
2. **Start from a known-good layout, do not re-derive one.** The recipes below are measured to fit
   at 1440x810; picking one up front avoids the trim-and-retry loop entirely.
3. **Verify with a screenshot pass, always.** Overflow is invisible in the markup: a caption that
   collides with the ETA strip, a table that runs off the right edge, a grid row pushed off the
   bottom. Serve the repo and shoot each slide:
   `python3 -m http.server 8931` then
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
     --hide-scrollbars --virtual-time-budget=4000 --screenshot=/tmp/sN.png --window-size=1440,810 \
     "http://localhost:8931/<deck path>/index.html#/N"`
   A deck has never yet survived its first screenshot pass unchanged.

**Layout recipes that fit (measured):**

| slide kind | recipe |
|---|---|
| workstream results | agenda (4 items) + band of **2 tables** + `p.etabar` + 1-line footnote. Three tables only WITHOUT an agenda list. |
| arena / benchmark | thesis, NO bullets (they duplicate the tables) + a full-width image band at `flex:0 0 76%` + band of 2 tables + etabar |
| pipeline + components | band of **3** (diagram, components, risks) + a second band for placeholder tiles |
| viz grid, 3 columns | at most **2 clip rows + 1 placeholder row**, `.vizgrid img{max-height:11em;object-fit:contain}`, captions <= 2 lines, no etabar (its dates live on the workstream slide) |
| closing summary | band of 2 tables + a **full-width** band for the decisions table (long recommendation text needs the whole width) + etabar |

**Trim order when a slide overflows** (apply in this order, stop when it fits): bullets that restate
a table -> caption length -> a table row -> an evidence item moved to the appendix -> split into
two bands. Never shrink the font.

## 5. Keys
→ ↓ Space PgDn Enter (l/j) next step or slide · ← ↑ PgUp Backspace (h/k) back · Home/End · `o`/Esc overview · `f` fullscreen · `d` theme (the only way — there is no button) · `?` help · swipe · `#/n`, `#/n/s` deep links · ⌘P → PDF (one 16:9 page per slide, light theme forced while printing). Nothing is painted on the stage except the slide number bottom-right.
