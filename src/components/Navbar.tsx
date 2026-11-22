import React, { useEffect, useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { Language, RoutePath, SITE_CONFIG, t } from '../data/site';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  lang: Language;
  onToggleLanguage: () => void;
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
  onBookClick: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLanguage,
  currentPath,
  onNavigate,
  onBookClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (path: RoutePath) => {
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#070606]/92 backdrop-blur-md border-b border-[#DEC088]/12 py-3.5'
          : 'bg-gradient-to-b from-[#060505]/92 via-[#060505]/55 to-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1380px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <BrandMark lang={lang} onClick={() => handleLink('/')} />

        {/* Center 4-link editorial nav */}
        <nav
          aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Navigation principale'}
          className="hidden lg:flex items-center gap-7 xl:gap-10"
        >
          {SITE_CONFIG.navLinks.map((item) => {
            const active = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleLink(item.path)}
                aria-current={active ? 'page' : undefined}
                className={`relative whitespace-nowrap text-[13.5px] font-medium tracking-[0.03em] transition-colors ${
                  active
                    ? 'text-[#EDE0C4]'
                    : 'text-[#BDB6AA] hover:text-[#EDE0C4]'
                }`}
              >
                {t(item.label, lang)}
                {active && (
                  <span className="absolute -bottom-1.5 inset-x-0 h-[1.5px] bg-[#DEC088]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Top-right Booking CTA + French/Arabic Switcher Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onBookClick()}
            className="whitespace-nowrap rounded-[2px] border border-[#DEC088]/55 bg-[#080706]/45 px-5 py-2 text-[12.5px] font-medium tracking-[0.03em] text-[#EDE0C4] transition-all duration-200 hover:border-[#DEC088] hover:bg-[#DEC088] hover:text-[#080706]"
          >
            {t(SITE_CONFIG.navCta, lang)}
          </button>

          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={
              lang === 'fr'
                ? 'Passer en langue arabe'
                : 'التبديل إلى اللغة الفرنسية'
            }
            className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-[2px] border border-white/20 bg-[#11100E]/85 px-3.5 py-2 text-[12.5px] font-semibold text-[#DEC088] transition-all duration-200 hover:border-[#DEC088] hover:bg-[#DEC088]/15"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
          </button>
        </div>

        {/* Mobile / Tablet Right Controls: Language Switcher + Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={
              lang === 'fr'
                ? 'Passer en langue arabe'
                : 'التبديل إلى اللغة الفرنسية'
            }
            className="inline-flex h-10 items-center gap-1.5 rounded border border-[#DEC088]/35 bg-[#11100E] px-3 text-xs font-semibold text-[#DEC088]"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === 'fr' ? 'العربية' : 'FR'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-[#DEC088]/30 text-[#EDE0C4]"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet slide-down drawer */}
      {mobileOpen && (
        <div className="border-t border-[#DEC088]/15 bg-[#070606]/98 px-6 pb-7 pt-5 lg:hidden">
          <nav aria-label="Menu mobile" className="flex flex-col gap-4">
            {SITE_CONFIG.navLinks.map((item) => {
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleLink(item.path)}
                  className={`flex items-center justify-between py-2 text-start font-display text-sm font-semibold tracking-[0.08em] uppercase ${
                    active ? 'text-[#DEC088]' : 'text-[#D6CFC2]'
                  }`}
                >
                  <span>{t(item.label, lang)}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-[#DEC088]" />}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onBookClick();
              }}
              className="btn-gold mt-2 w-full rounded-[2px] py-3.5 text-center text-xs font-semibold tracking-[0.08em] uppercase"
            >
              {t(SITE_CONFIG.navCta, lang)}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
