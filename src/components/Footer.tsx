import React, { useMemo, useState } from 'react';
import { ArrowRight, Phone, Search, Smartphone } from 'lucide-react';
import {
  ALL_SERVICES,
  formatPrice,
  Language,
  RoutePath,
  SITE_CONFIG,
  t,
} from '../data/site';
import { BrandMark } from './BrandMark';

interface FooterProps {
  lang: Language;
  onNavigate: (path: RoutePath) => void;
  onBookClick: (serviceId?: string) => void;
  onOpenInfoModal: (title: string, body: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onBookClick,
  onOpenInfoModal,
}) => {
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_SERVICES.filter(
      (s) =>
        s.title.fr.toLowerCase().includes(q) ||
        s.title.ar.toLowerCase().includes(q) ||
        s.summary.fr.toLowerCase().includes(q) ||
        s.summary.ar.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [query]);

  return (
    <footer className="relative border-t border-white/10 bg-[#050505] text-[#D8D0C4]">
      <div className="mx-auto max-w-[1380px] px-5 pb-10 pt-14 sm:px-8 lg:px-12 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand Crest + Phone + App Store Badges */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <BrandMark lang={lang} onClick={() => onNavigate('/')} />
              <p className="mt-4 text-[12.5px] leading-[1.65] text-[#8E877D]">
                {t(SITE_CONFIG.brand.address, lang)}
              </p>
              <a
                href={SITE_CONFIG.brand.phoneHref}
                className="mt-2.5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#DEC088] transition-colors hover:text-[#F4DA9F]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span dir="ltr">{SITE_CONFIG.brand.phoneDisplay}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  onOpenInfoModal(
                    lang === 'ar'
                      ? 'تطبيق عزيز باربر شوب — Android'
                      : 'Application Aziz Barber Shop — Android',
                    lang === 'ar'
                      ? `التطبيق قيد الإعداد. يمكنك حجز موعدك مباشرة عبر الموقع أو الاتصال بنا على ${SITE_CONFIG.brand.phoneDisplay}.`
                      : `L'application mobile Aziz Barber Shop arrive bientôt. Réservez directement en ligne ou appelez-nous au ${SITE_CONFIG.brand.phoneDisplay}.`
                  )
                }
                className="inline-flex items-center gap-2 rounded-[3px] border border-white/20 bg-[#0D0C0B] px-3 py-1.5 text-start transition-colors hover:border-[#DEC088]/70"
              >
                <Smartphone className="h-4 w-4 text-[#DEC088]" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[8px] tracking-[0.06em] text-[#9E978C] uppercase">
                    {lang === 'ar' ? 'قريباً على' : 'Disponible sur'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#EDE0C4]">Google Play</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onOpenInfoModal(
                    lang === 'ar'
                      ? 'تطبيق عزيز باربر شوب — iOS'
                      : 'Application Aziz Barber Shop — iOS',
                    lang === 'ar'
                      ? `التطبيق قيد الإعداد. يمكنك حجز موعدك مباشرة عبر الموقع أو الاتصال بنا على ${SITE_CONFIG.brand.phoneDisplay}.`
                      : `L'application iOS Aziz Barber Shop arrive bientôt. Réservez directement en ligne ou appelez-nous au ${SITE_CONFIG.brand.phoneDisplay}.`
                  )
                }
                className="inline-flex items-center gap-2 rounded-[3px] border border-white/20 bg-[#0D0C0B] px-3 py-1.5 text-start transition-colors hover:border-[#DEC088]/70"
              >
                <Smartphone className="h-4 w-4 text-[#DEC088]" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[8px] tracking-[0.06em] text-[#9E978C] uppercase">
                    {lang === 'ar' ? 'قريباً على' : 'Télécharger sur'}
                  </span>
                  <span className="text-[11px] font-semibold text-[#EDE0C4]">App Store</span>
                </span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-[13.5px] font-semibold tracking-[0.04em] text-[#F2ECE0]">
              {t(SITE_CONFIG.footer.navTitle, lang)}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#9E978C]">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.path)}
                    className="transition-colors hover:text-[#DEC088]"
                  >
                    {t(link.label, lang)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Service Search + Social Icons */}
          <div className="lg:col-span-4">
            <h3 className="text-[13.5px] font-semibold tracking-[0.04em] text-[#F2ECE0]">
              {t(SITE_CONFIG.footer.contactTitle, lang)}
            </h3>

            <div className="relative mt-4 max-w-[320px]">
              <label htmlFor="footer-service-search" className="sr-only">
                {t(SITE_CONFIG.footer.searchPlaceholder, lang)}
              </label>
              <input
                id="footer-service-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                placeholder={t(SITE_CONFIG.footer.searchPlaceholder, lang)}
                className="w-full rounded-[2px] border border-white/25 bg-[#0C0B0A] py-2.5 ps-3.5 pe-10 text-[12.5px] text-[#EDE0C4] placeholder-[#7B756C] transition-colors focus:border-[#DEC088] focus:outline-none"
              />
              <Search
                className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A49D92]"
                aria-hidden="true"
              />

              {searchFocused && query.trim().length > 0 && (
                <div className="absolute bottom-full inset-x-0 z-30 mb-2 overflow-hidden rounded-[3px] border border-[#DEC088]/30 bg-[#11100E] shadow-2xl">
                  {matches.length > 0 ? (
                    <ul>
                      {matches.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onMouseDown={() => {
                              setQuery('');
                              onBookClick(item.id);
                            }}
                            className="flex w-full items-center justify-between px-3.5 py-2.5 text-start text-[12px] transition-colors hover:bg-[#DEC088]/12"
                          >
                            <span className="font-medium text-[#EDE0C4]">
                              {t(item.title, lang)}
                            </span>
                            <span className="text-[11px] font-semibold text-[#DEC088]">
                              {formatPrice(item.priceDa, lang)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-3.5 py-2.5 text-[12px] text-[#8E877D]">
                      {t(SITE_CONFIG.footer.noResults, lang)}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center gap-3">
              {[
                {
                  name: 'Facebook',
                  svg: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M13.5 9H16V6h-2.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.35l.65-3H13v-1.5c0-.28.22-.5.5-.5Z" />
                    </svg>
                  ),
                },
                {
                  name: 'X',
                  svg: (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  name: 'Instagram',
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-none stroke-current"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={() =>
                    onOpenInfoModal(
                      `${t(SITE_CONFIG.brand.name, lang)} — ${social.name}`,
                      lang === 'ar'
                        ? `تابع صالون عزيز باربر شوب على ${social.name} أو اتصل بنا مباشرة على ${SITE_CONFIG.brand.phoneDisplay}.`
                        : `Suivez Aziz Barber Shop sur ${social.name} ou appelez directement le salon au ${SITE_CONFIG.brand.phoneDisplay}.`
                    )
                  }
                  aria-label={social.name}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE0C4] text-[#080706] transition-all duration-200 hover:scale-105 hover:bg-[#DEC088]"
                >
                  {social.svg}
                </button>
              ))}
            </div>
          </div>

          {/* Column 4: Book Appointment CTA */}
          <div className="lg:col-span-3">
            <h3 className="text-[13.5px] font-semibold tracking-[0.04em] text-[#F2ECE0]">
              {t(SITE_CONFIG.footer.bookingTitle, lang)}
            </h3>
            <p className="mt-3.5 text-[12.5px] leading-[1.68] text-[#9E978C]">
              {t(SITE_CONFIG.footer.bookingBlurb, lang)}
            </p>
            <button
              type="button"
              onClick={() => onBookClick()}
              className="btn-gold group mt-5 inline-flex items-center gap-2.5 rounded-[2px] px-6 py-2.5 text-[12.5px] font-semibold tracking-[0.03em]"
            >
              <span>{t(SITE_CONFIG.navCta, lang)}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 border-t border-white/10 pt-7 text-center text-[11.5px] text-[#7D766C]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>{t(SITE_CONFIG.brand.copyright, lang)}</span>
            {SITE_CONFIG.footer.legalLinks.map((item) => (
              <React.Fragment key={item.id}>
                <span aria-hidden="true" className="text-white/20">
                  |
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInfoModal(
                      t(item.label, lang),
                      lang === 'ar'
                        ? `يمكن تعديل أو إلغاء الموعد قبل ساعتين على الأقل عبر الاتصال بـ ${SITE_CONFIG.brand.phoneDisplay}.`
                        : `Les rendez-vous peuvent être modifiés ou annulés jusqu'à 2 heures à l'avance en appelant Aziz Barber Shop au ${SITE_CONFIG.brand.phoneDisplay}.`
                    )
                  }
                  className="transition-colors hover:text-[#DEC088]"
                >
                  {t(item.label, lang)}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
