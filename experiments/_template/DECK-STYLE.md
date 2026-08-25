# DECK-STYLE — the meeting slide-deck format (2026-08-26)

Deck = the default record for new experiments (README.md). Files: `assets/deck.css` + `deck.js`, template `_template/deck.html`, worked example `_template/deck-example/` (one canonical slide per section — read it instead of the reference PDF).

## 1. Reference deck — what we match

Source: T. Kim, lab seminar 2026-08-10 (15 pp, 720×405 pt = 16:9). Structure and style only — no content or figure copied. `p#` = page.

**Geometry / chrome**
- 16:9, white background, **no chrome**: no logo, footer, page number, section divider or agenda slide (all pp). The only recurring extra is a tiny grey citation footnote bottom-left (p2–6, p13–14: Calibri 8 pt #595959 at ≈ 96 % of the height). → we keep exactly one such line (`.foot`) for data/source paths and add a same-size slide counter bottom-right.
- Left margin 22 pt = 3.1 % of the width; title top at ≈ 8 % of the height; the same on every content slide (p2–15).

**Content-slide skeleton** (identical on all 13 content slides, top → bottom)
1. **Topic title** — Calibri Bold 24 pt (3.3 % of width), Office blue #0070C0, top-left, one line, a *topic label* not a sentence: "Method (1): Dual-Timestep Scheduling" p8, "Experimental Results" p10–12, "Summary" p15.
2. **Thesis** — one bold black sentence, 16 pt (2.2 %), straight under the title (p3, p8, p9, p15); on the Overview slide it is prefixed **[TL;DR]** (p2). Regular weight when it is context rather than a claim (p4–7).
3. **Bullets** — 2–4, Calibri 14 pt (1.95 %), marker at 33 pt, text at 58 pt (indent 5 % of width), line pitch 19.3 pt (×1.38); sub-bullets 12 pt, text at 94 pt (p8, p15). Emphasis inside a bullet = bold lead + " | " + smaller regular aside (p4–6). A conclusion line starts with "→", indented like the bullets (p6).
4. **Evidence band** — the lower 45–55 % of the slide: 1–4 figures/tables side by side, full width, un-boxed, each with an italic 11 pt #595959 caption centred underneath (p2, p3, p10, p12); comparisons put the conditions side by side under short labels (p12). Text never exceeds ≈ 45 % of the height — the band carries the slide.

**Progressive disclosure, no animation** — the same slide repeated: inactive items light grey #B3B3B3, the active item bold black (Motivation p4→6); a cumulative numbered agenda 1./2./3. whose inactive items also hide their sub-bullets (p10→12); the figure belonging to the active item gets a thin black box (p6).
**Title slide** (p1) — centred block slightly above the middle: bold blue title 23.8 pt, authors 12.6 pt, bold venue line, teal link #0097A7, date "2026. 08. 10", "Presented by <name>".
**Summary slide** (p15) — bold thesis + bullet(s), then bold subhead "Limitations & Future Directions:" + bullets with sub-bullets. No appendix in the reference (we add one for what a Log's §Setup/§Artifacts held).
**Palette (measured)** — bg #FFFFFF · text #000000 · title #0070C0 · captions/footnotes #595959 · dimmed #B3B3B3 · links #0097A7. **Font** Calibri (Bold/Italic); ArialMT only for the "→" glyph.

**Adaptation to the site tokens** (light ≈ the PDF; dark = the same roles on the dark tokens; nothing redefined per page):
#0070C0 → `--acc` (#0B6E9E light / #4CC2FF dark) · #000 → `--txt` (#17222E — not pure black, see Butterick) · #595959 → `--mut` · dimmed #B3B3B3 → `opacity:.35` on `--txt` (theme-proof) · #0097A7 links → `--acc` · white → `--panel`, letterbox/page → `--bg` · thin black box → `outline` in `--txt`. Calibri → lab.css `--sans` system stack (Segoe UI / SF / Roboto — same plain humanist feel, no font load); `--mono` for paths, appendix, footers. Status pill + ok/warn/bad only for state; `--acc` for emphasis (site rule).

## 2. Secondary sources — mechanics, and the rules the reference confirms

- **Alley, assertion-evidence** (assertion-evidence.com; Garner & Alley 2013, writing.engr.psu.edu/ae_comprehension.pdf) — headline = a sentence stating the slide's assertion; body = visual evidence, not bullets; 110 students: better comprehension, fewer misconceptions, lower reported cognitive load, stronger recall a week later. → our **thesis line is the assertion**; the reference's topic title stays above it because that is how this lab reads decks.
- **Doumont, *Trees, maps, and theorems*** (principiae.be/X0100.php) — one message per slide, stated as a full sentence on ≤ 2 lines, top-left; remove everything that does not carry the message. → thesis ≤ 2 lines; no decoration, gradients, logos.
- **Fatahalian, *Tips for Giving Clear Talks*** (graphics.stanford.edu/~kayvonf/misc/cleartalktips.pdf) — "One point per slide — and the point is the title"; "Show, don't tell"; explain every results graph: axes first, then the one point; "read your slide titles in thumbnail view"; end on a positive note. → the `o` overview grid is the thumbnail test; captions name what varies.
- **Peyton Jones, *How to give a great research talk*** (microsoft.com/en-us/research/…/How-to-give-a-great-research-talk.pdf) — motivation 20 % / key idea 80 % / "there is no 3"; "you have 2 minutes"; one key idea ("if you remember nothing else, remember this"); examples over the general case; no outline slide; finish on time. → verdict on slide 2, main deck ≤ 8 slides; our Agenda is a triage list (report | discuss), not a table of contents.
- **Tufte, *The Cognitive Style of PowerPoint*** (Beautiful Evidence, 2006) — PP graphics average ≈ 12 numbers vs > 1000 in Science; "presenter-oriented, not content-oriented". → tables carry real numbers; the appendix keeps the dense facts a Log used to hold.
- **Butterick, Practical Typography → Presentations** (practicaltypography.com/presentations.html) — one base point size for every slide, even one-liners; avoid pure black on pure white. **speaking.io** (Holman, /design/typography) — "remove words, make it bigger"; high contrast; clean sans. → one fixed type scale per slide class; `--txt` not #000.
- **Mechanics** — reveal.js (revealjs.com/presentation-size, /pdf-export): a fixed canvas (960×700 default) scaled uniformly and letterboxed; ← → Space, O/Esc overview, F fullscreen, ?, hash `#/h/v`; PDF via `?print-pdf` + Chrome landscape / no margins / background graphics. Slidev (sli.dev/guide/ui): `o` overview, `f` fullscreen, `d` dark, `g` goto. → keys in §5; we print with no special URL (`@page` 320×180 mm, one slide per page).

## 3. Deck grammar for this site — one deck = one question

Section → layout class (worked examples, one per section, in `_template/deck-example/`, each headed `<!-- SECTION: … -->`):
1. **Title** `s-title` — the question · one-line verdict · status pill · date · project · presenter.
2. **Overview** `s-verdict` — thesis prefixed [TL;DR] · ≤ 4 bullets · one media.
3. **Agenda** `s-agenda` (mandatory) — two columns Report | Discuss.
4. **Evidence** — Related work `s-table` (compact comparison table) · Method `s-claim` (thesis + ≤ 3 bullets + one figure) · Results `s-compare` (numbered `data-steps` agenda, inactive items dim, 2–3 media side by side). Progressive build-up wherever the reference would repeat the slide.
5. **Next** `s-next` — numbered table: # · item · owner · ETA/status.  6. **Asks** `s-ask` (mandatory) — each ask = options + one recommendation.
7. **Appendix** `s-appendix` — dense mono: setup · repro · data facts; the last one carries the cut list. (`s-list` summary and `s-section` dividers exist for longer decks.)
Captions state what is shown and which parameter varies — never how it looks. Update the open deck instead of adding one (README scope rule).

## 4. Meeting-prep protocol and HARD CAPS

Purpose (owner): prevent content/text overload in experiment records so attention stays on what matters. Decks serve a 5–10 min meeting with the supervisor.
1. **Inventory** — list every candidate item (results, findings, artifacts, open questions, blockers) in a scratch list.
2. **Triage** each item: **REPORT** (done, no input needed → one line on Overview or one evidence slide) · **DISCUSS** (needs the supervisor's judgment → Asks slide as options + my recommendation; this is where the meeting time goes) · **FYI** (available, not spoken → appendix) · **DROP**.
3. **Budget** — 5–10 min ≈ 6–8 main slides, ~1 min each; DISCUSS items get the most time.
4. **Order** — Title → [TL;DR] → Agenda (report | discuss) → report slides → asks → next steps → appendix.  5. Agenda and Asks are **mandatory**.

**Hard caps** (not advice — over a cap, cut or move to the appendix; never shrink the font): main deck **≤ 8 slides** · **one** thesis sentence per slide, **≤ 20 words** · **≤ 4 bullets** per slide, each **≤ 1 line** at stage width · **≤ 3 media** per evidence band · Agenda **≤ 4 report + ≤ 3 discuss** · Asks **≤ 3**, each with options + **one** recommendation · everything else → appendix or DROPPED, and the last appendix slide carries a **cut list** (`<p class="cut">`, wraps — never truncated) so nothing is silently lost.
**Pre-publish check**: count main slides and media per band · count thesis words and bullets per slide · every bullet fits one line at 1440 px · Agenda and Asks within caps, each ask has options AND a recommendation · cut list present, no image judged in text · anything over → cut, never resize.

## 5. Keys
→ ↓ Space PgDn Enter (l/j) next step or slide · ← ↑ PgUp Backspace (h/k) back · Home/End · `o`/Esc overview · `f` fullscreen · `d` theme · `?` help · swipe · `#/n`, `#/n/s` deep links · ⌘P → PDF (one 16:9 page per slide, light theme forced while printing).
