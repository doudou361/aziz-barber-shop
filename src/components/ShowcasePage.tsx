import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, Download, LayoutGrid, Sparkles } from 'lucide-react';
import { Language, RoutePath } from '../data/site';

interface ShowcasePageProps {
  lang: Language;
  onNavigate: (path: RoutePath) => void;
}

const BOARDS = [
  {
    id: 'dark-gold-4x5',
    title: {
      fr: '01 · Instagram 4:5 — Édition Obsidienne & Or',
      ar: '01 · إنستغرام 4:5 — إصدار الأسود والذهبي',
    },
    ratio: '4:5 (2160×2700)',
    src: '/showcase/01-Instagram-Blueprint-DarkGold-4x5.webp',
    desc: {
      fr: 'Inspiré de Content-ref/2.png : barre Instagram "SAVE FOR LATER" et double colonne complète du site.',
      ar: 'مستوحى من Content-ref/2.png: شريط إنستغرام علوي وعرض كامل للموقع في عمودين.',
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
      fr: 'Inspiré de Content-ref/3.png : contraste maximal des fenêtres sombres sur fond sable clair.',
      ar: 'مستوحى من Content-ref/3.png: تباين عالٍ لواجهات الموقع الداكنة على خلفية فاتحة.',
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
      fr: 'Inspiré de Content-ref/1.png : version française complète à gauche, version arabe RTL + mobile + réservation à droite.',
      ar: 'مستوحى من Content-ref/1.png: النسخة الفرنسية يساراً، والنسخة العربية والموبايل والحجز يميناً.',
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

const SAMPLE_CAPTION_FR = `Un site web de barber shop doit ressembler à une expérience, pas à une simple page. ✨💈

Voici le blueprint complet créé pour AZIZ BARBER SHOP — Barber House :
✦ Design sombre ultra-luxe Noir Obsidienne & Or Champagne
✦ Vitrine 3D interactive des instruments & ciseaux japonais
✦ Bilingue Français + Arabe (RTL) en un clic
✦ Grille tarifaire complète en Dinars Algériens (DA)
✦ Réservation personnalisée (Aziz, Yacine, Yousef) — Nom + Téléphone uniquement

📩 Envoyez « WEBSITE » en DM pour offrir à votre salon l'image qu'il mérite.
#BarberShopWebsite #WebDesignAlgeria #AzizBarberShop #UIUXDesign`;

export const ShowcasePage: React.FC<ShowcasePageProps> = ({ lang, onNavigate }) => {
  const [selectedId, setSelectedId] = useState(BOARDS[0].id);
  const [copied, setCopied] = useState(false);
  const current = BOARDS.find((b) => b.id === selectedId) || BOARDS[0];

  const copyCaption = () => {
    navigator.clipboard?.writeText(SAMPLE_CAPTION_FR);
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

          <span className="inline-flex items-center gap-2 rounded-full border border-[#DEC088]/35 bg-[#14110D] px-3.5 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#DEC088] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Content #1 · Instagram &amp; TikTok Blueprint Kit</span>
          </span>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[1.08] text-[#EDE0C4] uppercase">
              {lang === 'ar'
                ? 'معرض قوالب السوشيال ميديا (Content #1)'
                : 'Template Blueprint Showcase (Content #1)'}
            </h1>
            <p className="mt-3 max-w-[640px] text-[14.5px] leading-[1.7] text-[#A49D92]">
              {lang === 'ar'
                ? 'تصاميم جاهزة للنشر على إنستغرام وتيك توك مستوحاة من فيغما (Content-ref)، تجمع كل أقسام موقع عزيز باربر شوب في لوحة عرض احترافية.'
                : 'Planches haute résolution prêtes pour Instagram et TikTok (style Figma / Dribbble inspiré de Content-ref), assemblées à partir de toutes les sections du site Aziz Barber Shop.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyCaption}
              className="inline-flex items-center gap-2 rounded-[2px] border border-white/20 bg-[#11100E] px-4 py-2.5 text-xs font-semibold text-[#EDE0C4] transition-colors hover:border-[#DEC088]"
            >
              {copied ? <Check className="h-4 w-4 text-[#DEC088]" /> : <Copy className="h-4 w-4 text-[#DEC088]" />}
              <span>{copied ? 'Légende copiée !' : 'Copier la légende Instagram'}</span>
            </button>

            <a
              href={current.src}
              download={`${current.id}.webp`}
              className="btn-gold inline-flex items-center gap-2 rounded-[2px] px-5 py-2.5 text-xs font-bold tracking-[0.04em] uppercase"
            >
              <Download className="h-4 w-4" />
              <span>{lang === 'ar' ? 'تحميل التصميم' : 'Télécharger la planche'}</span>
            </a>
          </div>
        </div>

        {/* Board Selector Tabs */}
        <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BOARDS.map((b) => {
            const active = b.id === selectedId;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setSelectedId(b.id)}
                className={`flex flex-col justify-between rounded-[3px] border p-4 text-start transition-all ${
                  active
                    ? 'border-[#DEC088] bg-[#18140E] shadow-[0_12px_35px_rgba(222,192,136,0.14)]'
                    : 'border-white/12 bg-[#0E0D0C] hover:border-[#DEC088]/40'
                }`}
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-[#DEC088] uppercase">
                    <LayoutGrid className="h-3 w-3" />
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

        {/* Active Board Large Preview + All 4 Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 flex flex-col items-center rounded-[4px] border border-[#DEC088]/25 bg-[#0C0B09] p-4 sm:p-6">
            <img
              src={current.src}
              alt={current.title[lang]}
              className="max-h-[820px] w-auto rounded-[4px] object-contain shadow-2xl"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-[4px] border border-white/10 bg-[#0E0D0C] p-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#DEC088] uppercase">
                APERÇU PUBLICATION INSTAGRAM / TIKTOK
              </span>
              <h3 className="font-display mt-2 text-xl font-bold text-[#EDE0C4]">
                {current.title[lang]}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.65] text-[#A49D92]">
                {current.desc[lang]}
              </p>

              <div className="mt-5 rounded-[3px] border border-white/10 bg-[#080706] p-4">
                <p className="text-[11px] font-semibold tracking-[0.12em] text-[#DEC088] uppercase">
                  Légende prête à coller (Français / Arabe / Anglais dans Content-1-Showcase/CAPTION_KIT.md)
                </p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-[12.5px] leading-[1.65] text-[#D5CEC2]">
                  {SAMPLE_CAPTION_FR}
                </pre>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {BOARDS.map((thumb) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setSelectedId(thumb.id)}
                  className={`group overflow-hidden rounded-[3px] border transition-all ${
                    thumb.id === selectedId
                      ? 'border-[#DEC088] ring-1 ring-[#DEC088]'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.title[lang]}
                    className="h-36 w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
