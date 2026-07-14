# Essential Living Chiropractic — site skeleton

Pure static HTML/CSS/JS. No build step. All internal paths are relative, so the
site works at `barestkd-cyber.github.io/essential-living-website/` and at the
root domain after DNS cutover.

## Deploy (Claude Code, when back at the machine)

1. Create repo `essential-living-website` under `barestkd-cyber`
2. Copy this folder in, commit, push
3. Enable GitHub Pages: main branch, root
4. Do NOT touch DNS yet. Every page is noindex and robots.txt blocks crawling.

## Pages (14)

- `/` — Family Chiropractor in Tyler, TX | Essential Living Chiropractic
- `/about/` — About Dr. Josh Nannen | Essential Living Chiropractic
- `/services/` — Chiropractic Services in Tyler, TX | Essential Living Chiropractic
- `/services/chiropractic-adjustments/` — Chiropractic Adjustments in Tyler, TX | Essential Living Chiropractic
- `/services/muscle-work/` — Muscle Work & Myofascial Release | Essential Living Chiropractic
- `/services/pregnancy-pediatric/` — Pregnancy & Pediatric Chiropractic in Tyler, TX | Essential Living
- `/services/brain-balancing/` — Brain Balancing | Essential Living Chiropractic, Tyler TX
- `/services/vibration-therapy/` — Vibration Therapy | Essential Living Chiropractic, Tyler TX
- `/services/supplements/` — Nutrition & Supplements | Essential Living Chiropractic, Tyler TX
- `/what-to-expect/` — What to Expect at Your First Visit | Essential Living Chiropractic
- `/new-patients/` — New Patients | Essential Living Chiropractic, Tyler TX
- `/service-areas/` — Chiropractor Serving East Texas | Essential Living Chiropractic
- `/contact/` — Contact Us | Essential Living Chiropractic, Tyler TX
- `/book/` — Request an Appointment | Essential Living Chiropractic, Tyler TX

## Redirect stubs (27, old WordPress slugs)

- `/athens-texas-chiropractor/` → `/service-areas/`
- `/book-an-appointment/` → `/book/`
- `/brain-balancing/` → `/services/brain-balancing/`
- `/bullard-texas-chiropractor/` → `/service-areas/`
- `/canton-texas-chiropractor/` → `/service-areas/`
- `/chandler-texas-chiropractor/` → `/service-areas/`
- `/chappell-hill-texas-chiropractor/` → `/service-areas/`
- `/chiro-health/` → `/services/`
- `/chiropractic-adjustment/` → `/services/chiropractic-adjustments/`
- `/chiropractic-adjustments/` → `/services/chiropractic-adjustments/`
- `/dr-josh-nannen/` → `/about/`
- `/fint-texas-chiropractor/` → `/service-areas/`
- `/jacksonville-texas-chiropractor/` → `/service-areas/`
- `/kilgore-texas-chiropractor/` → `/service-areas/`
- `/lindale-texas-chiropractor/` → `/service-areas/`
- `/longview-texas-chiropractor/` → `/service-areas/`
- `/mineola-texas-chiropractor/` → `/service-areas/`
- `/muscle-work/` → `/services/muscle-work/`
- `/noonday-texas-chiropractor/` → `/service-areas/`
- `/palestine-texas-chiropractor/` → `/service-areas/`
- `/practice-areas/` → `/services/`
- `/pregnancy-pediatric/` → `/services/pregnancy-pediatric/`
- `/rusk-texas-chiropractor/` → `/service-areas/`
- `/supplements/` → `/services/supplements/`
- `/tyler-texas-chiropractor-2/` → `/service-areas/`
- `/vibe-plate/` → `/services/vibration-therapy/`
- `/whitehouse-texas-chiropractor/` → `/service-areas/`

## Single source of truth

`assets/js/site-config.js` holds the NAP, hours, Jane intake URL, and social
links. Footer NAP, contact/new-patient/service-area NAP blocks, the New Patients
intake button (`.js-intake`), and the JSON-LD Chiropractor schema all render
from it at runtime. Noscript fallbacks carry the same NAP in plain text; keep
them in sync if the address changes.

## Request flow vs. intake (do not mix these)

Patients do **not** book their own appointments. The primary action everywhere
is **requesting an appointment** through the lead form. The office calls back to
find a time (usually within one business day).

- The lead form lives on `/book/` and `/contact/` (same markup, one `#contact-form`
  per page). Every "Request an appointment" / "Get in touch" CTA and the footer
  link point at `/book/` with a page-relative prefix — never at Jane.
- Jane (`janeIntakeUrl` in site-config.js) is **intake forms only, for patients
  who already have an appointment**. It appears in exactly one place: the
  "Already scheduled? Complete your intake forms" section on `/new-patients/`
  (the `.js-intake` button). It is never a booking or lead path.
- The request form intentionally collects **contact info only — no health
  history** — so PHI stays inside Jane and off our Supabase/Resend pipeline.
  The intake link lives on `/new-patients/` only.

## Credentials

Dr. Josh Nannen is Webster Certified through the ICPA. The certification is
surfaced site-wide: the footer "Credentials & Memberships" column, the homepage
hero trust-line and Pregnancy & Pediatric card, the About bio, the Service Areas
intro, a "Webster Certified care" section and FAQ on the Pregnancy & Pediatric
page, and the JSON-LD schema (`hasCredential`).

## Launch checklist

- [ ] Remove noindex meta from every page (grep `REMOVE AT LAUNCH`)
- [ ] Flip robots.txt from Disallow to Allow
- [ ] Add lastmod dates to sitemap.xml
- [ ] Point DNS, add CNAME file for the custom domain
- [ ] Create Supabase leads table + notify Edge Function, paste keys into site-config.js
- [ ] Confirm the request form captures contact info only (no health history) and that Jane stays intake-only on `/new-patients/`
- [ ] Confirm Dr. Josh's Webster certification is current and that his listing appears in the ICPA directory at icpa4kids.com (expecting moms verify there)
- [ ] Replace all photo placeholders, paste approved Google reviews

## Open items in the code (68)

- `index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `index.html:67` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: office or family shot, roughly 4:3</p></div>
- `index.html:76` — <!-- TODO-REVIEWS: paste 3 verbatim Google reviews below after Josh approves.
- `index.html:96` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Dr. Josh portrait, roughly 3:4</p></div>
- `index.html:118` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `index.html:137` — <!-- CONFIRM: correct chamber link and current membership -->
- `robots.txt:3` — # meta tag from every page (grep for REMOVE AT LAUNCH).
- `book/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `book/index.html:57` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `book/index.html:76` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/index.html:55` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/index.html:74` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/brain-balancing/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/brain-balancing/index.html:40` — <!-- TODO-COPY: Josh to supply 2-3 sentences describing his brain balancing approach and who it helps. Keep cl
- `services/brain-balancing/index.html:44` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Brain Balancing</p></div>
- `services/brain-balancing/index.html:60` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/brain-balancing/index.html:79` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/supplements/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/supplements/index.html:40` — <!-- TODO-COPY: Josh to confirm current supplement lines carried and any ordering details. -->
- `services/supplements/index.html:44` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Nutrition and Supplements</p></div>
- `services/supplements/index.html:60` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/supplements/index.html:79` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/muscle-work/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/muscle-work/index.html:40` — <!-- TODO-COPY: Josh to add 2-3 sentences on his specific soft-tissue approach and who benefits most. -->
- `services/muscle-work/index.html:44` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Muscle Work and Myofascial Release</p></div>
- `services/muscle-work/index.html:60` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/muscle-work/index.html:79` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/chiropractic-adjustments/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/chiropractic-adjustments/index.html:43` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Chiropractic Adjustments</p></div>
- `services/chiropractic-adjustments/index.html:59` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/chiropractic-adjustments/index.html:78` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/pregnancy-pediatric/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/pregnancy-pediatric/index.html:43` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Pregnancy and Pediatric Care</p></div>
- `services/pregnancy-pediatric/index.html:59` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/pregnancy-pediatric/index.html:78` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/vibration-therapy/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `services/vibration-therapy/index.html:40` — <!-- TODO-COPY: Josh to confirm how the vibe plate fits his care plans and add a sentence in his own words. --
- `services/vibration-therapy/index.html:44` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Vibration Therapy</p></div>
- `services/vibration-therapy/index.html:60` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `services/vibration-therapy/index.html:79` — <!-- CONFIRM: correct chamber link and current membership -->
- `assets/js/site-config.js:11` — /* CONFIRM before launch: Google Business Profile says "Oak Hill Blvd"
- `assets/js/site-config.js:24` — /* CONFIRM: old city pages used info@essentiallivingchiro.com.
- `assets/js/site-config.js:33` — CONFIRM Tuesday: old site said 8am-2pm, Google says 9am-1pm.
- `assets/js/site-config.js:65` — /* TODO phase 2: create a leads table + Resend notify Edge Function,
- `contact/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `contact/index.html:40` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `contact/index.html:41` — <div class="placeholder"><p>Map placeholder · TODO-MAP: embed Google Maps iframe at launch</p></div>
- `contact/index.html:81` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `contact/index.html:100` — <!-- CONFIRM: correct chamber link and current membership -->
- `service-areas/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `service-areas/index.html:44` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `service-areas/index.html:46` — <div class="placeholder"><p>Map placeholder · TODO-MAP: embed Google Maps iframe at launch</p></div>
- `service-areas/index.html:63` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `service-areas/index.html:82` — <!-- CONFIRM: correct chamber link and current membership -->
- `about/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `about/index.html:43` — <div class="placeholder"><p>Photo placeholder · TODO-PHOTO: Dr. Josh with Nicole and the kids</p></div>
- `about/index.html:72` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `about/index.html:91` — <!-- CONFIRM: correct chamber link and current membership -->
- `what-to-expect/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `what-to-expect/index.html:39` — <!-- CONFIRM: walk this sequence with Josh and adjust to his real flow -->
- `what-to-expect/index.html:64` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `what-to-expect/index.html:83` — <!-- CONFIRM: correct chamber link and current membership -->
- `new-patients/index.html:6` — <!-- REMOVE AT LAUNCH: noindex stays on until DNS cutover -->
- `new-patients/index.html:50` — <!-- CONFIRM with Josh: payment and insurance details, parking notes,
- `new-patients/index.html:57` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `new-patients/index.html:74` — <noscript><p>Essential Living Chiropractic<br>6649 Oak Hill Blvd, Tyler, TX 75703<br>(903) 630-5327 · office@e
- `new-patients/index.html:93` — <!-- CONFIRM: correct chamber link and current membership -->
- `services/pregnancy-pediatric/index.html:51` — <!-- CONFIRM with Josh: does he use pregnancy pillows or a drop-away table section for expecting moms? Add a sentence if so. -->
- `services/brain-balancing/index.html:49` — <!-- CONFIRM this entire section with Josh before launch. Conservative placeholder copy. -->
- `services/vibration-therapy/index.html:49` — <!-- CONFIRM specifics with Josh before launch. -->
- `services/supplements/index.html:52` — <!-- CONFIRM with Josh: current lines carried and whether patients can reorder without a visit. -->
