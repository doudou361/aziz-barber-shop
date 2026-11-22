import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { Language, SITE_CONFIG, t } from '../data/site';
import { OrbitingToolsCanvas } from './OrbitingToolsCanvas';

interface HaloCtaSectionProps {
  lang: Language;
  onBookClick: () => void;
}

const HALO_MODES = [
  {
    id: 'champagne',
    label: { fr: 'Halo Champagne', ar: 'هالة شامبانيا' },
    ringColor: '#F7DC9C',
    glow: 'rgba(242, 200, 120, 0.45)',
  },
  {
    id: 'amber',
    label: { fr: 'Ambre Chaud', ar: 'عنبر دافئ' },
    ringColor: '#F0BA69',
    glow: 'rgba(229, 158, 66, 0.48)',
  },
  {
    id: 'ivory',
    label: { fr: 'Ivoire Studio', ar: 'عاجي ستوديو' },
    ringColor: '#FFF0CE',
    glow: 'rgba(255, 232, 185, 0.40)',
  },
];

export const HaloCtaSection: React.FC<HaloCtaSectionProps> = ({ lang, onBookClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [scrollProg, setScrollProg] = useState(0.5);
  const [motionPaused, setMotionPaused] = useState(false);
  const [haloModeIdx, setHaloModeIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProg(v));

  const mode = HALO_MODES[haloModeIdx];
  const isAnimating = !prefersReduced && !motionPaused;

  return (
    <section
      id="halo-cta"
      ref={sectionRef}
      className="relative flex min-h-[94svh] w-full flex-col justify-between overflow-hidden bg-[#050505] pt-24 pb-10 sm:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={SITE_CONFIG.haloCta.image}
          alt={t(SITE_CONFIG.brand.name, lang)}
          loading="lazy"
          className={`h-full w-full object-cover object-[74%_center] lg:object-right ${
            lang === 'ar' ? '-scale-x-100' : ''
          }`}
        />

        {/* Animated Circular Neon Golden Halo Ring positioned on opposite side of copy */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex h-[320px] w-[320px] sm:h-[430px] sm:w-[430px] lg:h-[490px] lg:w-[490px] items-center justify-center ${
            lang === 'ar'
              ? 'left-[-6%] sm:left-[4%] lg:left-[9%]'
              : 'right-[-6%] sm:right-[4%] lg:right-[9%]'
          }`}
          aria-hidden="true"
        >
          <motion.div
            animate={
              isAnimating
                ? { scale: [0.97, 1.04, 0.97], opacity: [0.42, 0.68, 0.42] }
                : { scale: 1, opacity: 0.5 }
            }
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-4 rounded-full blur-[54px]"
            style={{ background: `radial-gradient(circle, ${mode.glow} 0%, transparent 72%)` }}
          />

          <svg viewBox="0 0 400 400" className="relative h-full w-full overflow-visible" fill="none">
            <defs>
              <filter id="haloGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="7" result="blur1" />
                <feGaussianBlur stdDeviation="18" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.circle
              cx="200"
              cy="200"
              r="168"
              stroke={mode.ringColor}
              strokeWidth="10"
              strokeOpacity="0.28"
              filter="url(#haloGlowFilter)"
              initial={prefersReduced ? false : { pathLength: 0.15, opacity: 0.2 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.circle
              cx="200"
              cy="200"
              r="168"
              stroke="#FFF6DF"
              strokeWidth="3.2"
              filter="url(#haloGlowFilter)"
              initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.96 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>

        <div className="hero-left-fade absolute inset-0" />
        <div className="hero-vertical-fade absolute inset-0" />
      </div>

      <div className="relative z-20 mx-auto my-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
            {t(SITE_CONFIG.haloCta.eyebrow, lang)}
          </p>

          <h2 className="font-display mt-3.5 text-[clamp(2.05rem,3.9vw,3.55rem)] font-bold leading-[1.08] tracking-[0.025em] text-[#EDE0C4] uppercase">
            <span className="block sm:whitespace-nowrap">
              {t(SITE_CONFIG.haloCta.headlineLine1, lang)}
            </span>
            <span className="block">{t(SITE_CONFIG.haloCta.headlineLine2, lang)}</span>
          </h2>

          <p className="mt-5 max-w-[440px] text-[14.5px] sm:text-[15.5px] leading-[1.72] text-[#A9A296]">
            {t(SITE_CONFIG.haloCta.description, lang)}
          </p>

          <div className="mt-9">
            <button
              type="button"
              onClick={onBookClick}
              className="btn-gold group inline-flex items-center gap-3 rounded-[2px] px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em]"
            >
              <span>{t(SITE_CONFIG.haloCta.cta, lang)}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        </motion.div>

        <div className="relative hidden lg:block lg:col-span-6 lg:h-[460px]">
          <OrbitingToolsCanvas
            variant="halo"
            scrollProgress={scrollProg}
            paused={motionPaused}
            reducedMotion={prefersReduced}
          />
        </div>
      </div>

      {/* Bottom Center Ambient Controls */}
      <div className="relative z-20 mx-auto mt-10 flex flex-col items-center gap-3.5 px-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMotionPaused((p) => !p)}
            aria-label={motionPaused ? 'Reprendre l’animation' : 'Mettre en pause l’animation'}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/40 text-[#EDE0C4] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
          >
            {motionPaused ? <Play className="h-3 w-3 fill-current" /> : <Pause className="h-3 w-3" />}
          </button>

          <button
            type="button"
            onClick={() => setHaloModeIdx((i) => (i + 1) % HALO_MODES.length)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] tracking-[0.06em] text-[#CFC7BA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
          >
            <Sparkles className="h-3 w-3 text-[#DEC088]" />
            <span>{t(mode.label, lang)}</span>
          </button>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          {HALO_MODES.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setHaloModeIdx(idx)}
              aria-label={t(m.label, lang)}
              className={`h-[2.5px] rounded-full transition-all duration-300 ${
                idx === haloModeIdx ? 'w-9 bg-[#EDE0C4]' : 'w-5 bg-white/25 hover:bg-[#DEC088]/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
