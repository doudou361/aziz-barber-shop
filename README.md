# Aziz Barber Shop — Barber House

Custom-coded bilingual luxury barbershop website (**French default + Arabic RTL toggle**) built with React, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Features
- **Brand:** AZIZ BARBER SHOP — BARBER HOUSE (`0799 24 55 43`)
- **Bilingual FR / AR (RTL):** Defaults to French (`fr`), with an instant top-right language switcher (`العربية` / `FR`) updating copy, typography (`Cairo` for Arabic), and full RTL mirroring.
- **Algerian Pricing (`DA` / `دج`):** Complete 4-category pricing menu (*Coiffure*, *Barbe*, *Soins du visage*, *Soins capillaires*) covering all 15 prestations.
- **Multi-Step Custom Booking Modal:** Barber selection (**Aziz**, **Yacine**, **Yousef**), expandable multi-select prestations checklist with `Valider`, date & time slot picker, and **Full Name + Phone Number only** (no email field).
- **Interactive 3D & Motion:** Three.js PBR floating 5-tool grooming kit, scroll-articulated forged chrome barber shears, orbiting tools, and animated golden halo CTA.

## Local Development

```bash
npm install
npm run dev
```

## Production Build & Type Check

```bash
npm run typecheck
npm run build
npm run preview
```

## Main Editable Files
- [`src/data/site.ts`](src/data/site.ts) — Brand info, phone (`0799 24 55 43`), French/Arabic text, Algerian Dinar prices (`DA`), and barbers (`Aziz`, `Yacine`, `Yousef`).
- [`src/components/PricingSection.tsx`](src/components/PricingSection.tsx) — Interactive 4-tab Algerian pricing table.
- [`src/components/BookingModal.tsx`](src/components/BookingModal.tsx) — Multi-step reservation modal (barber selector, multi-select service checklist, date/time, full name & phone only).
- [`src/index.css`](src/index.css) — Obsidian & champagne-gold theme tokens, RTL gradient mirroring, and typography.
- [`vercel.json`](vercel.json) — SPA rewrite rules for Vercel deployment.
