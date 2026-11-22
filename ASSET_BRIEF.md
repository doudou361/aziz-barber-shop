# Asset Inventory, Sources & Custom Generation Brief

All visual assets live under `public/assets/` (optimized `.webp` web copies) with untouched source originals preserved under `public/assets/originals/`.

## 1. Current Web Assets (Verified & Studio-Graded)

| Web Asset (`public/assets/`) | Role in Website | Original Source (`public/assets/originals/`) | Status |
|---|---|---|---|
| `hero-chair.webp` | Section 1 Hero — leather barber chair over warm obsidian salon bokeh | Unsplash `photo-1512690459411-b9245aed614b` + `photo-1773904215697-e6c21fc27ac2` | Finished (Studio-graded) |
| `chair-studio.webp` | Section 3 Services — solo dark-lit barber chair on obsidian stage | Unsplash `photo-1512690459411-b9245aed614b` | Finished (Studio-graded) |
| `experience-chair.webp` | Section 5 Premium Grooming Experience — warm amber barbershop interior | Unsplash `photo-1773904215697-e6c21fc27ac2` | Finished (Studio-graded) |
| `halo-chair.webp` | Section 6 Climactic Halo CTA — ebony chair staged for animated neon halo | Unsplash `photo-1512690459411-b9245aed614b` + `photo-1773904215697-e6c21fc27ac2` | Finished (Studio-graded) |
| `service-haircut.webp` | Section 3 Card 1 (`HAIRCUT`) — monochrome precision fade portrait | Unsplash `photo-1599351431202-1e0f0137899a` | Finished (Studio-graded) |
| `service-beard.webp` | Section 3 Card 2 (`BEARD SCULPTING`) — monochrome scissor beard sculpt | Unsplash `photo-1517832606299-7ae9b720a186` | Finished (Studio-graded) |
| `service-styling.webp` | Section 3 Card 3 (`PREMIUM STYLING`) — warm champagne backlit styling | Unsplash `photo-1503951914875-452162b0f3f1` | Finished (Studio-graded) |
| `atelier-tools.webp` | Inferred `/experience` & `/about` — luxury flat-lay grooming tools | Unsplash `photo-1621605815971-fbc98d665033` | Finished (Studio-graded) |
| `atelier-interior.webp` | Inferred `/about` — black & gold architectural barbershop interior | Unsplash `photo-1773904215697-e6c21fc27ac2` | Finished (Studio-graded) |
| `atelier-shave.webp` | Inferred `/services` — hot towel straight-razor ritual | Unsplash `photo-1761148438883-e34e0289a214` | Finished (Studio-graded) |
| `atelier-cut.webp` | Inferred `/services` — bespoke scissor-over-comb session | Unsplash `photo-1520338661084-680395057c93` | Finished (Studio-graded) |
| Interactive 3D PBR WebGL Instruments (`src/three/groomingModels.ts`) | Section 2 Floating 5-Tool Kit, Section 4 Articulated Chrome Shears, Sections 3/5/6 Orbiting Clipper, Shears & Elixir Bottle | Procedural Three.js PBR studio chrome, anodized obsidian, and amber glass with custom softbox HDRI reflections | Finished (Real-time interactive 3D motion) |

---

## 2. Optional Custom AI Generation Prompts (For When Quota Resets / Brand Swaps)

AI image generation (`gemini-3.1-flash-image`) was temporarily rate-limited (`429 QUOTA_EXHAUSTED`) during initial build. If you wish to swap any graded studio photograph with bespoke AI renders or your own studio photography, drop replacement files into `public/assets/` using the exact filenames above or update `src/data/site.ts`.

### Prompt A — `hero-chair.webp` (16:9)
> Commercial architectural editorial photograph of an ultra-luxury men's barbershop interior. On the right half (55%–92%), a classic tufted matte-black leather and brushed-brass barber chair angled three-quarters left, lit by warm champagne rim lighting. Soft shallow depth-of-field bokeh of dark walnut shelving, glowing amber vertical LED wall sconces, and backlit glass apothecary bottles behind it. Left 45% fades smoothly into pure obsidian black (`#060505`) for clean typography placement. Zero text, zero logos.

### Prompt B — `halo-chair.webp` (16:9)
> Matching dark luxury barbershop scene with the exact same tufted black-leather and brushed-brass barber chair positioned on the right half (55%–90%), framed directly in front of a large luminous circular warm-champagne-gold neon halo ring floating vertically behind the headrest, casting soft amber bloom and golden specular highlights onto the leather and dark floor. Left 45% fades smoothly to `#050505`. Zero text.

### Prompt C — Service Portraits (`service-haircut.webp`, `service-beard.webp`, `service-styling.webp`, 4:5)
> High-contrast dark studio three-quarter editorial portrait of a sharply groomed gentleman against deep charcoal-black (`#0D0C0B`) fading to `#11100E` at the bottom: (1) razor-clean skin fade in crisp monochrome silver rim light, (2) sculpted tailored beard in dramatic black-and-white studio contrast, (3) classic-modern textured styling backlit with a warm champagne-gold (`#DEC088`) aura. Zero text.

## Generated team illustrations

`barber-portrait-1.jpg`, `barber-portrait-2.jpg`, and `barber-portrait-3.jpg` are optimized copies of fictional portraits generated with the built-in image tool from the user's warm salon image as a style reference. They are labeled “Portrait illustratif” on the site and are not verified likenesses of Aziz, Youcef, or Mohamed. The editable source prompts and original generated PNGs are retained in the local project's `public/assets/ASSET_NOTES.md` and `public/assets/generated-originals/`.
