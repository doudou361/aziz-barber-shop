# Reference Video Analysis

**Source File:** `src20/A website should feel like an experience, not just a page. ✨Saloon a luxury fragrance concept br.mp4`  
**Technical Metadata:** 720×1280 (9:16 vertical reel), 24.00 fps, 10.00 s duration, H.264 + HE-AAC audio.  
**Nature of Recording:** Single-shot AI-generated showcase reel filmed over-the-shoulder of a hand scrolling an HP laptop on a dark veined marble barbershop counter. The website UI shown inside the ~16:10 widescreen laptop display is a dark-luxury men's barbershop experience (note: the social media filename mentions "Saloon a luxury fragrance concept", while the actual on-screen UI is unmistakably a men's barbershop featuring barber chairs, cordless clippers, chrome shears, haircut/beard/styling service cards, and "Book Appointment" CTAs).

---

## 1. Visual Language & Design System (Directly Observed)

| Token | Observed Reference Treatment | Implemented Value |
|---|---|---|
| Primary Canvas | Deep obsidian black & warm charcoal void | `#050505` (studio stages & footer), `#080706` (barbershop interiors) |
| Card Surfaces | Dark smoked charcoal panels with thin hairline borders | `#11100E` / `rgba(223, 192, 134, 0.14)` border |
| Display Headlines | Bold geometric uppercase sans-serif in warm champagne ivory | `Montserrat` (700/800), `#EDE0C4`, tight `1.04` line-height |
| Eyebrows & Body | Tracked uppercase micro-labels; soft warm-gray editorial copy | `Plus Jakarta Sans`, `#B9B0A0` eyebrow, `#A49D92` body |
| Primary CTA Fill | Solid brushed champagne gold with obsidian ink | `#DEC088` fill, `#0D0B09` ink, `2px–4px` crisp radius |
| Secondary CTA | Outlined nav button + arrow text link (`Explore Services →`) | `1px solid rgba(223,192,134,0.5)` / warm ivory arrow link |
| Signature Glow | Warm amber backlit interior sconces & circular golden halo | `#F7DC9C` neon ring core with warm bronze radial bloom |

---

## 2. Section-by-Section Chronology & Motion Map

| Timestamp | Section | Layout & Composition | Signature Motion & Interactive Behavior |
|---|---|---|---|
| `0.0s – 1.5s` | **Persistent Top Nav + Section 1: Hero** (`PRECISION. STYLE. CONFIDENCE.`) | Fixed obsidian header: hexagonal gold crest + brand wordmark (left), 4 center nav links (`Home`, `Services`, `Experience`, `About`), outlined `Book Appointment` button (right). Hero splits left typography over obsidian fade and right tufted black-leather & brass barber chair in warm backlit bokeh. Bottom-left circular down-arrow scroll cue; bottom-right numeric section rail. | Smooth fade/rise text entrance, subtle depth parallax on chair scene, interactive section tracker (`01`–`06`), click-to-scroll cue. |
| `1.5s – 2.75s` | **Section 2: Signature Experience** (`SIGNATURE EXPERIENCE`) | Pure jet-black stage. Left copy stack + dual CTAs. Right 58% zero-gravity composition of 5 floating grooming objects: chrome cordless clipper, matte detail trimmer, carbon comb, amber apothecary beard oil bottle, folded straight razor & pomade jar. Bottom-center 4-dash progress indicator (`— ——— — —`). | Layered independent levitation, scroll-linked 3D rotation/translation & cursor depth parallax per object, interactive 4-slide kit carousel with prev/next arrows, clickable pills, keyboard arrows, and touch swipe. |
| `2.75s – 4.0s` | **Section 3: Services Trio** (`SIGNATURE EXPERIENCE` / `SERVICES`) | Left 60% displays 3 dark vertical portrait cards side-by-side (`HAIRCUT`, `BEARD SCULPTING`, `PREMIUM STYLING`) with monochrome/warm-lit editorial portraits, top-right gold pills, descriptions, and action buttons (3rd card highlighted with warm champagne wash & solid gold button). Right 40% features the illuminated barber chair with orbiting floating tools. Centered bold `SERVICES` + hairline underscore below. | Staggered card entrance on scroll; hover/click transfers active champagne-gold highlight across cards; right-side chair + orbiting tools respond to scroll & selected service; clicking card CTA opens Booking Drawer pre-filled with that service. |
| `4.0s – 5.25s` | **Section 4: The Craft** (`THE CRAFT`) | Minimalist pure-black void. Left eyebrow, bold display title, 4-line craft narrative, single gold `Book Appointment` CTA. Right 60% dominated by hero-scale polished chrome barber shears with warm specular glint on the steel bevel. Bottom-center pagination (`━━ • • •`). | **Key observed animation (4.375s → 4.875s):** The two hinged shear blades articulate (open & snip) while rotating smoothly across the stage with a sliding golden specular glint. Implemented via dual-layer pivot-locked photorealistic blades driven by scroll progress + click-to-snip / hover interaction + 4-pillar interactive switcher. |
| `5.5s – 6.75s` | **Section 5: Premium Grooming Experience** (`PREMIUM GROOMING EXPERIENCE`) | Returns to moody amber-lit barbershop interior. Left stacked copy + dual CTAs + bottom-left scroll indicator. Right barber chair framed by floating chrome clipper (lower-left) and floating shears (upper-left) with warm drifting dust motes. | Scroll-choreographed counter-parallax of clipper and shears orbiting the chair + gentle ambient float and golden atmosphere motes. |
| `7.0s – 8.75s` | **Section 6: Climactic Halo CTA** (`YOUR NEXT LOOK STARTS HERE.`) | Dramatic finale: left headline, closing copy, and `Book Appointment →` gold button. Right barber chair silhouetted in front of a glowing circular golden halo ring with floating matte-black sculptural elixir bottle near the upper-left arc. Bottom center subtle playback/ambient controls (`▸ ▸ ○`) + progress bar. | Luminous golden halo draws/ignites on scroll and breathes softly; floating bottle glides along upper arc; bottom controls allow cycling ambiance / pausing motion. |
| `8.75s – 10.0s` | **Section 7: Luxury Obsidian Footer** | Pure black 4-column grid: (1) Brand crest + Google Play & App Store badges, (2) Navigation column (`Home`, `About`, `Services`, `Experience & Rituals`, `Contact Us`), (3) `Contact Us` + dark bordered search/inquiry input with magnifier + 3 circular social icon buttons, (4) `Book Appointment` blurb + gold CTA. Centered bottom divider & legal links. | Working quick-search filter for services, interactive app preview modal, working route navigation, and direct booking trigger. |

---

## 3. Directly Visible vs. Inferred / Adapted Elements

- **Directly Visible:** Sticky header layout, 6-section vertical choreography, obsidian & champagne-gold palette, Barber Chair hero & halo scenes, floating 5-tool grooming kit, 3-card Services grid (`HAIRCUT`, `BEARD SCULPTING`, `PREMIUM STYLING`), articulating chrome shears in `THE CRAFT`, floating tools around chair in `PREMIUM GROOMING EXPERIENCE`, glowing golden halo ring in `YOUR NEXT LOOK STARTS HERE.`, and 4-column footer with app badges, search input, social icons, and CTA.
- **Cleaned / Replaced AI-Garbled Copy:** The video's AI-rendered text contained garbled brand letters (`THE DEHNENERS` / `THE BEHMENERS`), illegible body copy, and placeholder eyebrow `PREMIUM CTA`. Replaced with clean, centrally editable provisional branding (**The Gentlemen's Barber House** in `src/data/site.ts`), authentic luxury editorial copy, and `RESERVE YOUR CHAIR` eyebrow.
- **Inferred Linked Destinations (Coherent Same-Design-System Views):** Because the recording only scrolls the primary landing experience, the linked routes (`/services`, `/experience`, `/about`), the interactive multi-step **Appointment Booking Drawer** (clearly marked as a Demo Reservation Flow), and the Footer App / Legal modals were created using the identical obsidian & champagne-gold design system so every visible control works end-to-end.
- **Video-Only Recording Artifacts Excluded:** Over-the-shoulder laptop bezel, hand on trackpad, desk props, and background audio track are framing elements of the promotional reel rather than website UI and are excluded from the web viewport.
