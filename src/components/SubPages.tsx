import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import {
  CRAFT_PILLARS,
  KIT_SLIDES,
  Language,
  RoutePath,
  SITE_CONFIG,
  t,
} from '../data/site';
import { PricingSection } from './PricingSection';
import { BarberCards } from './BarbersSection';
import { SignatureKitCanvas } from './SignatureKitCanvas';

interface SubPageCommonProps {
  lang: Language;
  onNavigate: (path: RoutePath) => void;
  onBookClick: (serviceId?: string, barberId?: string) => void;
}

export const ServicesPage: React.FC<SubPageCommonProps> = ({
  lang,
  onNavigate,
  onBookClick,
}) => {
  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-16">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#9E978C] uppercase transition-colors hover:text-[#DEC088]"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          <span>{lang === 'ar' ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}</span>
        </button>
      </div>

      {/* Full interactive Algerian pricing table (Coiffure, Barbe, Soins du visage, Soins capillaires) */}
      <PricingSection
        lang={lang}
        onReserveService={(serviceId) => onBookClick(serviceId)}
        compactTop
      />
    </div>
  );
};

export const ExperiencePage: React.FC<SubPageCommonProps> = ({
  lang,
  onNavigate,
  onBookClick,
}) => {
  const [selectedTool, setSelectedTool] = useState<'all' | 'clipper' | 'elixir' | 'razor'>('all');

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-24">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#9E978C] uppercase transition-colors hover:text-[#DEC088]"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          <span>{lang === 'ar' ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}</span>
        </button>

        <div className="mt-6 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
              {lang === 'ar' ? 'أدوات وطقوس عزيز باربر شوب' : 'INSTRUMENTS & RITUELS BARBER HOUSE'}
            </p>
            <h1 className="font-display mt-3 text-[clamp(2rem,4.4vw,3.45rem)] font-bold leading-[1.08] text-[#EDE0C4] uppercase">
              {lang === 'ar' ? 'التجربة المميزة' : "L'EXPÉRIENCE SIGNATURE"}
            </h1>
            <p className="mt-4 text-[14.5px] leading-[1.72] text-[#A49D92]">
              {lang === 'ar'
                ? 'اكتشف أدواتنا الاحترافية بتقنية ثلاثية الأبعاد، مع طقوس البخار وعلاجات الوجه والشعر الفاخرة.'
                : 'Découvrez nos instruments de coiffure professionnels en 3D interactive, accompagnés de nos rituels de soin barbe, visage et capillaires.'}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {KIT_SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setSelectedTool(slide.focusTool)}
                  className={`rounded-[2px] px-3.5 py-2 text-[11.5px] font-semibold tracking-[0.04em] transition-all ${
                    selectedTool === slide.focusTool
                      ? 'bg-[#DEC088] text-[#080706]'
                      : 'border border-white/15 bg-[#100F0D] text-[#C5BEB1] hover:border-[#DEC088]/50'
                  }`}
                >
                  {t(slide.title, lang).replace('\n', ' ')}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onBookClick('rituel-soin-barbe')}
              className="btn-gold mt-8 inline-flex items-center gap-2.5 rounded-[2px] px-7 py-3.5 text-xs font-semibold tracking-[0.04em]"
            >
              <span>
                {lang === 'ar' ? 'احجز طقس العناية الكامل' : 'Réserver un rituel soin'}
              </span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="h-[380px] sm:h-[460px] lg:col-span-7 lg:h-[520px] rounded-[4px] border border-white/10 bg-[#080706]">
            <SignatureKitCanvas focusTool={selectedTool} scrollProgress={0.5} />
          </div>
        </div>

        {/* Craft Standards */}
        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CRAFT_PILLARS.map((p) => (
            <div
              key={p.id}
              className="rounded-[3px] border border-white/10 bg-[#0E0D0C] p-6"
            >
              <span className="text-[10px] tracking-[0.18em] text-[#DEC088] uppercase">
                {t(p.eyebrow, lang)}
              </span>
              <h2 className="font-display mt-2 text-lg font-bold text-[#EDE0C4] uppercase">
                {t(p.title, lang)}
              </h2>
              <p className="mt-3 text-[13px] leading-[1.68] text-[#A49D92]">
                {t(p.description, lang)}
              </p>
              <div className="mt-5 border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                <span className="text-[#8E877D]">{t(p.statLabel, lang)}</span>
                <span className="font-display font-bold text-[#DEC088]">
                  {t(p.statValue, lang)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Gallery */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              src: '/assets/atelier-tools.webp',
              caption: { fr: 'Instruments Pro & Soins Sélectionnés', ar: 'أدوات احترافية وعناية متخصصة' },
            },
            {
              src: '/assets/atelier-shave.webp',
              caption: { fr: 'Vapeur Chaude & Rasage au Coupe-Choux', ar: 'بخار ساخن وحلاقة تقليدية بالموس' },
            },
            {
              src: '/assets/atelier-interior.webp',
              caption: { fr: 'Cadre Élégant Aziz Barber Shop', ar: 'أجواء فاخرة في عزيز باربر شوب' },
            },
          ].map((item) => (
            <figure
              key={item.src}
              className="overflow-hidden rounded-[3px] border border-white/10 bg-[#0E0D0C]"
            >
              <img
                src={item.src}
                alt={t(item.caption, lang)}
                loading="lazy"
                className="h-60 w-full object-cover"
              />
              <figcaption className="px-4 py-3 text-xs tracking-[0.04em] text-[#B9B0A0]">
                {t(item.caption, lang)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AboutPage: React.FC<SubPageCommonProps> = ({
  lang,
  onNavigate,
  onBookClick,
}) => {
  const [contactSent, setContactSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-24">
      <div className="mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 text-xs tracking-[0.12em] text-[#9E978C] uppercase transition-colors hover:text-[#DEC088]"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          <span>{lang === 'ar' ? 'العودة إلى الرئيسية' : "Retour à l'accueil"}</span>
        </button>

        {/* Heritage Intro */}
        <div className="mt-6 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
              {lang === 'ar' ? 'قصتنا · بيت الحلاقة' : 'NOTRE MAISON · BARBER HOUSE'}
            </p>
            <h1 className="font-display mt-3 text-[clamp(2rem,4.3vw,3.45rem)] font-bold leading-[1.08] text-[#EDE0C4] uppercase">
              {lang === 'ar' ? 'الأناقة الهادئة والإتقان اليدوي.' : "L'EXCELLENCE DU GESTE AU QUOTIDIEN."}
            </h1>
            <p className="mt-5 text-[14.5px] leading-[1.78] text-[#A49D92]">
              {lang === 'ar'
                ? 'تأسس صالون عزيز باربر شوب لتقديم تجربة حلاقة رجالية تتجاوز المألوف. مع عزيز ويوسف ومحمد، نجمع بين الدقة العصرية والعناية بالوجه والشعر واللحية في أجواء راقية.'
                : 'Aziz Barber Shop — Barber House réunit Aziz, Youcef et Mohamed autour de la coiffure et des soins de la barbe, du visage et des cheveux.'}
            </p>
          </div>
          <div className="lg:col-span-6 overflow-hidden rounded-[4px] border border-white/10">
            <img
              src="/assets/atelier-interior.webp"
              alt={t(SITE_CONFIG.brand.name, lang)}
              className="h-[340px] w-full object-cover"
            />
          </div>
        </div>

        {/* Illustrative portraits; actual staff photos were not supplied. */}
        <div className="mt-20">
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#DEC088] uppercase">
            {lang === 'ar' ? 'فريقنا' : "L'ÉQUIPE"}
          </p>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#EDE0C4] uppercase">
            {lang === 'ar' ? 'الحلاقون المحترفون' : 'NOS BARBIERS'}
          </h2>

          <BarberCards lang={lang} onBookClick={onBookClick} />
        </div>

        {/* Hours, Phone (0799 24 55 43) & Contact Form (Full Name + Phone only!) */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-[3px] border border-white/10 bg-[#0E0D0C] p-7 lg:col-span-5">
            <h2 className="font-display text-lg font-bold text-[#EDE0C4] uppercase">
              {lang === 'ar' ? 'الصالون وأوقات العمل' : 'Salon & Horaires'}
            </h2>
            <div className="mt-5 space-y-3.5 text-[13.5px] text-[#B8B1A4]">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#DEC088]" />
                <span>{t(SITE_CONFIG.brand.address, lang)}</span>
              </p>
              <a
                href={SITE_CONFIG.brand.phoneHref}
                className="flex items-center gap-3 font-semibold text-[#DEC088] hover:text-[#F4DA9F]"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span dir="ltr">{SITE_CONFIG.brand.phoneDisplay}</span>
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-5 space-y-2.5 text-[13px]">
              {SITE_CONFIG.brand.hours.map((row) => (
                <div key={row.days.fr} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[#9E978C]">
                    <Clock className="h-3.5 w-3.5 text-[#DEC088]/70" />
                    {t(row.days, lang)}
                  </span>
                  <span dir="ltr" className="text-[#EDE0C4]">
                    {t(row.time, lang)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[3px] border border-white/10 bg-[#0E0D0C] p-7 lg:col-span-7">
            <h2 className="font-display text-lg font-bold text-[#EDE0C4] uppercase">
              {lang === 'ar' ? 'تواصل معنا' : 'Demande de rappel'}
            </h2>
            <p className="mt-2 text-xs text-[#9E978C]">
              {lang === 'ar'
                ? 'اترك اسمك ورقم هاتفك للتواصل معك حول المواعيد أو المناسبات الخاصة (نموذج تجريبي).'
                : 'Laissez votre nom complet et votre numéro de téléphone pour un événement privé ou une question (formulaire démo).'}
            </p>
            {contactSent ? (
              <div className="mt-6 rounded-[3px] border border-[#DEC088]/40 bg-[#16130D] p-5 text-sm text-[#EDE0C4]">
                {lang === 'ar'
                  ? `تم تسجيل طلبك التجريبي. يمكنك الاتصال مباشرة بالصالون على ${SITE_CONFIG.brand.phoneDisplay}.`
                  : `Votre demande démo a été enregistrée. Pour une réponse immédiate, appelez le ${SITE_CONFIG.brand.phoneDisplay}.`}
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                }}
                className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <input
                  required
                  type="text"
                  placeholder={lang === 'ar' ? 'الاسم الكامل *' : 'Nom complet *'}
                  className="rounded-[2px] border border-white/15 bg-[#141311] px-3.5 py-2.5 text-sm text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                />
                <input
                  required
                  type="tel"
                  dir="ltr"
                  placeholder={lang === 'ar' ? 'رقم الهاتف * (07XX XX XX XX)' : 'Numéro de téléphone *'}
                  className="rounded-[2px] border border-white/15 bg-[#141311] px-3.5 py-2.5 text-sm text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  placeholder={
                    lang === 'ar'
                      ? 'اكتب رسالتك أو استفسارك...'
                      : 'Votre message ou demande...'
                  }
                  className="sm:col-span-2 rounded-[2px] border border-white/15 bg-[#141311] px-3.5 py-2.5 text-sm text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-gold sm:col-span-2 rounded-[2px] py-3 text-xs font-semibold tracking-[0.06em] uppercase"
                >
                  {lang === 'ar' ? 'إرسال الطلب' : 'Envoyer la demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
