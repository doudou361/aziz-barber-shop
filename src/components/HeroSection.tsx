import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Language, SITE_CONFIG, t } from '../data/site';

interface HeroSectionProps {
  lang: Language;
  onBookClick: () => void;
  onExploreServices: () => void;
  onScrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onBookClick,
  onExploreServices,
  onScrollToSection,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, prefersReduced ? 1.02 : 1.09]);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', prefersReduced ? '0%' : '-10%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, prefersReduced ? 1 : 0.15]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#060505] pt-24 pb-16"
    >
      {/* Full-bleed luxury barber chair backdrop; mirrors cleanly in RTL Arabic so text never collides with chair */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src={SITE_CONFIG.hero.image}
          alt={t(SITE_CONFIG.brand.name, lang)}
          className={`h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-right ${
            lang === 'ar' ? '-scale-x-100' : ''
          }`}
          fetchPriority="high"
        />
        <div
          className={`absolute top-[18%] h-[360px] w-[360px] rounded-full opacity-25 blur-[110px] ${
            lang === 'ar' ? 'left-[10%]' : 'right-[10%]'
          }`}
          style={{ background: 'radial-gradient(circle, #E5B96B 0%, transparent 72%)' }}
        />
        <div className="hero-left-fade absolute inset-0" />
        <div className="hero-vertical-fade absolute inset-0" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="max-w-[680px]"
        >
          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase"
          >
            {t(SITE_CONFIG.hero.eyebrow, lang)}
          </motion.p>

          <motion.h1
            initial={prefersReduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-4 text-[clamp(2.05rem,4.1vw,3.75rem)] font-bold leading-[1.08] tracking-[0.025em] text-[#EDE0C4] uppercase"
          >
            <span className="block sm:whitespace-nowrap">
              {t(SITE_CONFIG.hero.headlineLine1, lang)}
            </span>
            <span className="block">{t(SITE_CONFIG.hero.headlineLine2, lang)}</span>
          </motion.h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[460px] text-[14.5px] sm:text-[15.5px] leading-[1.72] text-[#A9A296]"
          >
            {t(SITE_CONFIG.hero.description, lang)}
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-6 sm:gap-7"
          >
            <button
              type="button"
              onClick={onBookClick}
              className="btn-gold rounded-[2px] px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em]"
            >
              {t(SITE_CONFIG.hero.primaryCta, lang)}
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-[#E5DDD0] transition-colors hover:text-[#DEC088]"
            >
              <span>{t(SITE_CONFIG.hero.secondaryCta, lang)}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom circular scroll indicator & section index rail */}
      <div className="absolute bottom-7 inset-x-0 z-10 mx-auto flex max-w-[1380px] items-end justify-between px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => onScrollToSection('signature-experience')}
          className="group inline-flex items-center gap-3.5 text-start text-[12px] tracking-[0.04em] text-[#9E978C] transition-colors hover:text-[#EDE0C4]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#DEC088] group-hover:bg-[#DEC088]/10">
            <ChevronDown className="h-4 w-4 text-[#EDE0C4] transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          <span>{t(SITE_CONFIG.hero.scrollLabel, lang)}</span>
        </button>

        <div className="hidden sm:flex flex-col items-end gap-2.5" aria-label="Navigation rapide">
          {[
            { id: 'hero', num: '01' },
            { id: 'pricing-table', num: '07' },
          ].map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onScrollToSection(item.id)}
              className="group flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] text-[#9E978C] transition-colors hover:text-[#DEC088]"
            >
              <span>{item.num}</span>
              <span
                className={`h-[1px] transition-all ${
                  idx === 0
                    ? 'w-8 bg-[#DEC088]'
                    : 'w-5 bg-white/30 group-hover:w-8 group-hover:bg-[#DEC088]'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
