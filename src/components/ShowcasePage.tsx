import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Layers,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';
import { Language, RoutePath } from '../data/site';

interface ShowcasePageProps {
  lang: Language;
  onNavigate: (path: RoutePath) => void;
}

const CONTENT_1_BOARDS = [
  {
    id: 'dark-gold-4x5',
    title: {
      fr: '01 · Instagram 4:5 — Édition Obsidienne & Or',
      ar: '01 · إنستغرام 4:5 — إصدار الأسود والذهبي',
    },
    ratio: '4:5 (2160×2700)',
    src: '/showcase/01-Instagram-Blueprint-DarkGold-4x5.webp',
    desc: {
      fr: 'Barre Instagram "SAVE FOR LATER" et double colonne complète du site.',
      ar: 'شريط إنستغرام علوي وعرض كامل للموقع في عمودين.',
    },
  },
  {
    id: 'figma-clean-4x5',
    title: {
      fr: '02 · Figma / Dribbble 4:5 — Fond Sable Champagne',
      ar: '02 · فيغما 4:5 — خلفية شامبانيا فاتحة',
    },
    ratio: '4:5 (2160×2700)',
    src: '/showcase/02-Figma-Clean-Showcase-4x5.webp',
    desc: {
      fr: 'Contraste maximal des fenêtres sombres sur fond sable clair.',
      ar: 'تباين عالٍ لواجهات الموقع الداكنة على خلفية فاتحة.',
    },
  },
  {
    id: 'bilingual-multidevice-4x5',
    title: {
      fr: '03 · Bilingue FR + AR (RTL) & Mobile + Réservation',
      ar: '03 · ثنائي اللغة (فرنسي + عربي) مع الموبايل والحجز',
    },
    ratio: '4:5 (2160×2700)',
    src: '/showcase/03-Bilingual-FR-AR-MultiDevice-4x5.webp',
    desc: {
      fr: 'Version française complète à gauche, version arabe RTL + mobile + réservation à droite.',
      ar: 'النسخة الفرنسية يساراً، والنسخة العربية والموبايل والحجز يميناً.',
    },
  },
  {
    id: 'tiktok-reels-9x16',
    title: {
      fr: '04 · TikTok / Reels / Stories — Format Vertical 9:16',
      ar: '04 · تيك توك / ريلز / ستوري — مقاس طولي 9:16',
    },
    ratio: '9:16 (2160×3840)',
    src: '/showcase/04-TikTok-Reels-Blueprint-9x16.webp',
    desc: {
      fr: 'Format plein écran vertical 9:16 conçu pour TikTok et Instagram Reels.',
      ar: 'تصميم طولي كامل 9:16 مخصص لمنصات تيك توك وإنستغرام ريلز.',
    },
  },
];

const CONTENT_2_CAROUSEL = [
  {
    id: '01-cover',
    label: '01 / 08 · Cover (Obsidian)',
    src: '/carousel/01-cover.webp',
    note: 'Aziz Barber Shop — A bilingual luxury barbershop flagship in motion.',
  },
  {
    id: '02-mobile-rtl',
    label: '02 / 08 · Mobile Arabic RTL (Off-White)',
    src: '/carousel/02-mobile-rtl.webp',
    note: 'Arabic & French on phone screens.',
  },
  {
    id: '03-signature-kit',
    label: '03 / 08 · 3D Grooming Kit (Deep Pine)',
    src: '/carousel/03-signature-kit.webp',
    note: 'Zero-gravity 3D tools with tactile motion.',
  },
  {
    id: '04-services-trio',
    label: '04 / 08 · Flagship Rituals (Off-White)',
    src: '/carousel/04-services-trio.webp',
    note: 'Flagship grooming rituals with DZD pricing pills.',
  },
  {
    id: '05-pricing-menu',
    label: '05 / 08 · Algerian Tariff Menu (Deep Pine)',
    src: '/carousel/05-pricing-menu.webp',
    note: 'Categorized tariff menu built for direct booking.',
  },
  {
    id: '06-craft-shears',
    label: '06 / 08 · Japanese Steel Shears (Off-White)',
    src: '/carousel/06-craft-shears.webp',
    note: 'Articulated Japanese steel driven by scroll.',
  },
  {
    id: '07-booking-flow',
    label: '07 / 08 · 3-Step Booking Modal (Deep Pine)',
    src: '/carousel/07-booking-flow.webp',
    note: 'Tailored 3-step booking by barber & service.',
  },
  {
    id: '08-agency-cta',
    label: '08 / 08 · IronBot Agency CTA (Obsidian)',
    src: '/carousel/08-agency-cta.webp',
    note: 'Want a tailored website like this for your brand? DM "AZIZ".',
  },
  {
    id: 'niche-cover',
    label: 'Post 2 · Separate Niche Cover',
    src: '/carousel/niche-cover.webp',
    note: "Barbershops & Men's Grooming — The digital barbershop: craft beyond appointments.",
  },
];

const IRONBOT_CAPTION = `A modern barbershop website should feel like stepping into a private grooming house, not filling out a generic form.

An independent website flagship by IronBot for Aziz Barber Shop — built for tactile storytelling and instant chair booking:

• Atmospheric hero & bilingual switch — seamless 1-tap toggle between French (LTR) and Arabic (RTL).
• Zero-gravity 3D instruments — interactive cordless clippers, apothecary oils, and scroll-articulated Japanese steel shears.
• Transparent DZD tariff menu — 15 services organized across Coiffure, Barbe, Soins du visage, and Soins capillaires.
• Zero-friction 3-step booking — choose your barber (Aziz, Yacine, or Yousef), check multiple services, and confirm with Full Name & Phone Number only.

Want a tailored website like this for your brand? Send us a DM with "AZIZ" or tap the link in our bio.

#WebDesign #BarberShopWebsite #MensGrooming #LuxuryBarbershop #3DWebDesign #EditorialDesign #IronBotAgency`;

export const ShowcasePage: React.FC<ShowcasePageProps> = ({ lang, onNavigate }) => {
  const [tab, setTab] = useState<'content2' | 'content1'>('content2');
  const [selectedBoardId, setSelectedBoardId] = useState(CONTENT_1_BOARDS[0].id);
  const [slideIdx, setSlideIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentBoard =
    CONTENT_1_BOARDS.find((b) => b.id === selectedBoardId) || CONTENT_1_BOARDS[0];
  const currentSlide = CONTENT_2_CAROUSEL[slideIdx];

  const copyCaption = () => {
    navigator.clipboard?.writeText(IRONBOT_CAPTION);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-24 text-[#EDE0C4]">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#9E978C] uppercase transition-colors hover:text-[#DEC088]"
          >
            <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            <span>{lang === 'ar' ? 'العودة إلى الموقع' : 'Retour au site'}</span>
          </button>

          {/* Content #1 vs Content #2 Switcher */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTab('content2')}
              className={`inline-flex items-center gap-2 rounded-[2px] px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-all ${
                tab === 'content2'
                  ? 'bg-[#DEC088] text-[#080706]'
                  : 'border border-white/15 bg-[#100F0D] text-[#C6BFB2] hover:border-[#DEC088]/50'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Content #2 · IronBot 8-Slide Carousel</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('content1')}
              className={`inline-flex items-center gap-2 rounded-[2px] px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-all ${
                tab === 'content1'
                  ? 'bg-[#DEC088] text-[#080706]'
                  : 'border border-white/15 bg-[#100F0D] text-[#C6BFB2] hover:border-[#DEC088]/50'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Content #1 · Figma Blueprint Boards</span>
            </button>
          </div>
        </div>

        {/* ── CONTENT #2: IRONBOT AGENCY 8-SLIDE CAROUSEL + NICHE COVER ── */}
        {tab === 'content2' && (
          <div className="mt-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#DEC088] uppercase">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>IRONBOT AGENCY · 1080×1350 (4:5 sRGB)</span>
                </span>
                <h1 className="font-display mt-2 text-[clamp(1.85rem,3.8vw,3.1rem)] font-bold leading-[1.08] text-[#EDE0C4] uppercase">
                  {lang === 'ar'
                    ? 'كاروسيل إنستغرام (8 شرائح + غلاف النيتش)'
                    : 'IronBot Agency Instagram Carousel (8 Slides + Niche Cover)'}
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={copyCaption}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 bg-[#11100E] px-4 py-2.5 text-xs font-semibold text-[#EDE0C4] hover:border-[#DEC088]"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#DEC088]" />
                  ) : (
                    <Copy className="h-4 w-4 text-[#DEC088]" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy IronBot Caption'}</span>
                </button>

                <a
                  href={currentSlide.src}
                  download={`${currentSlide.id}.webp`}
                  className="btn-gold inline-flex items-center gap-2 rounded-[2px] px-5 py-2.5 text-xs font-bold tracking-[0.04em] uppercase"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Slide</span>
                </a>
              </div>
            </div>

            <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 flex flex-col items-center justify-between rounded-[4px] border border-[#DEC088]/25 bg-[#0C0B09] p-5">
                <img
                  src={currentSlide.src}
                  alt={currentSlide.label}
                  className="max-h-[760px] w-auto rounded-[4px] object-contain shadow-2xl"
                />

                <div className="mt-5 flex items-center gap-4" dir="ltr">
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIdx((i) =>
                        i === 0 ? CONTENT_2_CAROUSEL.length - 1 : i - 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#EDE0C4] hover:border-[#DEC088]"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-semibold tracking-[0.12em] text-[#DEC088]">
                    {currentSlide.label}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSlideIdx((i) =>
                        i === CONTENT_2_CAROUSEL.length - 1 ? 0 : i + 1
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#EDE0C4] hover:border-[#DEC088]"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-[4px] border border-white/10 bg-[#0E0D0C] p-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-[#DEC088] uppercase">
                    SLIDE SELECTOR (instagram-assets/)
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2.5">
                    {CONTENT_2_CAROUSEL.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSlideIdx(idx)}
                        className={`overflow-hidden rounded-[3px] border text-start transition-all ${
                          idx === slideIdx
                            ? 'border-[#DEC088] ring-1 ring-[#DEC088]'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={s.src}
                          alt={s.label}
                          className="h-28 w-full object-cover object-top"
                        />
                        <span className="block truncate bg-[#080706] px-2 py-1 text-[10px] text-[#CFC7BA]">
                          {s.id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[3px] border border-white/10 bg-[#080706] p-4">
                  <p className="text-[11px] font-semibold tracking-[0.12em] text-[#DEC088] uppercase">
                    IronBot Agency Handover Caption (EN / FR / AR in instagram-assets/CAPTIONS_AND_SOURCE_MAP.md)
                  </p>
                  <pre className="mt-2.5 max-h-[240px] overflow-y-auto whitespace-pre-wrap font-sans text-[12px] leading-[1.6] text-[#D5CEC2]">
                    {IRONBOT_CAPTION}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTENT #1: FIGMA / DRIBBBLE 2-COLUMN BLUEPRINT BOARDS ── */}
        {tab === 'content1' && (
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CONTENT_1_BOARDS.map((b) => {
                const active = b.id === selectedBoardId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBoardId(b.id)}
                    className={`flex flex-col justify-between rounded-[3px] border p-4 text-start transition-all ${
                      active
                        ? 'border-[#DEC088] bg-[#18140E]'
                        : 'border-white/12 bg-[#0E0D0C] hover:border-[#DEC088]/40'
                    }`}
                  >
                    <div>
                      <span className="text-[10.5px] font-semibold tracking-[0.12em] text-[#DEC088] uppercase">
                        {b.ratio}
                      </span>
                      <h2 className="font-display mt-1.5 text-sm font-bold text-[#F2E9D8]">
                        {b.title[lang]}
                      </h2>
                    </div>
                    <p className="mt-2 text-[12px] leading-[1.55] text-[#9E978C]">
                      {b.desc[lang]}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center rounded-[4px] border border-[#DEC088]/25 bg-[#0C0B09] p-6">
              <img
                src={currentBoard.src}
                alt={currentBoard.title[lang]}
                className="max-h-[820px] w-auto rounded-[4px] object-contain shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
