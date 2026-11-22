import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Language, SITE_CONFIG, t } from '../data/site';
import { OrbitingToolsCanvas } from './OrbitingToolsCanvas';

interface GroomingExperienceSectionProps {
  lang: Language;
  onBookClick: () => void;
  onExploreServices: () => void;
  onScrollNext: () => void;
}

const EMBERS = [
  { left: '58%', top: '26%', size: 3, dur: '5.5s', delay: '0s' },
  { left: '66%', top: '38%', size: 2.5, dur: '6.8s', delay: '1.1s' },
  { left: '74%', top: '22%', size: 3.5, dur: '7.4s', delay: '0.5s' },
  { left: '62%', top: '62%', size: 2, dur: '6.2s', delay: '2.0s' },
  { left: '81%', top: '48%', size: 3, dur: '5.8s', delay: '1.6s' },
  { left: '71%', top: '72%', size: 2.5, dur: '7.1s', delay: '0.8s' },
];

export const GroomingExperienceSection: React.FC<GroomingExperienceSectionProps> = ({
  lang,
  onBookClick,
  onExploreServices,
  onScrollNext,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [scrollProg, setScrollProg] = useState(0.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProg(v));
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', prefersReduced ? '-6%' : '8%']);

  return (
    <section
      id="grooming-experience"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-[#060505] py-24 sm:py-28"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src={SITE_CONFIG.groomingExperience.image}
          alt={t(SITE_CONFIG.brand.name, lang)}
          loading="lazy"
          className={`h-full w-full object-cover object-[72%_center] lg:object-right ${
            lang === 'ar' ? '-scale-x-100' : ''
          }`}
        />
        <div className="hero-left-fade absolute inset-0" />
        <div className="hero-vertical-fade absolute inset-0" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {EMBERS.map((dot, idx) => (
          <span
            key={idx}
            className="ember-dot absolute rounded-full bg-[#F5D692]"
            style={
              {
                left: lang === 'ar' ? `${100 - parseInt(dot.left, 10)}%` : dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                boxShadow: '0 0 10px 2px rgba(245,214,146,0.55)',
                '--dur': dot.dur,
                '--delay': dot.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
            {t(SITE_CONFIG.groomingExperience.eyebrow, lang)}
          </p>

          <h2 className="font-display mt-3.5 text-[clamp(2rem,4.2vw,3.45rem)] font-bold leading-[1.08] tracking-[0.025em] text-[#EDE0C4] uppercase">
            <span className="block">{t(SITE_CONFIG.groomingExperience.headlineLine1, lang)}</span>
            <span className="block">{t(SITE_CONFIG.groomingExperience.headlineLine2, lang)}</span>
          </h2>

          <p className="mt-5 max-w-[450px] text-[14.5px] sm:text-[15px] leading-[1.72] text-[#A9A296]">
            {t(SITE_CONFIG.groomingExperience.description, lang)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onBookClick}
              className="btn-gold rounded-[2px] px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em]"
            >
              {t(SITE_CONFIG.groomingExperience.primaryCta, lang)}
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-[#E5DDD0] transition-colors hover:text-[#DEC088]"
            >
              <span>{t(SITE_CONFIG.groomingExperience.secondaryCta, lang)}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block lg:col-span-6 lg:h-[500px]">
          <OrbitingToolsCanvas
            variant="experience"
            scrollProgress={scrollProg}
            reducedMotion={prefersReduced}
          />
        </div>
      </div>

      <div className="absolute bottom-7 inset-x-0 z-20 mx-auto max-w-[1380px] px-5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={onScrollNext}
          className="group inline-flex items-center gap-3.5 text-[12px] tracking-[0.04em] text-[#9E978C] transition-colors hover:text-[#EDE0C4]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-[#DEC088] group-hover:bg-[#DEC088]/10">
            <ChevronDown className="h-4 w-4 text-[#EDE0C4] transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          <span>{t(SITE_CONFIG.groomingExperience.scrollLabel, lang)}</span>
        </button>
      </div>
    </section>
  );
};
