import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CRAFT_PILLARS, Language, SITE_CONFIG, t } from '../data/site';
import { CraftShearsCanvas } from './CraftShearsCanvas';

interface CraftSectionProps {
  lang: Language;
  onBookClick: () => void;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ lang, onBookClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [pillarIdx, setPillarIdx] = useState(0);
  const [scrollProg, setScrollProg] = useState(0.5);
  const [snipSignal, setSnipSignal] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProg(v));

  const pillar = CRAFT_PILLARS[pillarIdx];

  const prevPillar = () =>
    setPillarIdx((p) => (p === 0 ? CRAFT_PILLARS.length - 1 : p - 1));
  const nextPillar = () =>
    setPillarIdx((p) => (p === CRAFT_PILLARS.length - 1 ? 0 : p + 1));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextPillar();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPillar();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      id="the-craft"
      ref={sectionRef}
      tabIndex={-1}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 45) {
          if (dx < 0) nextPillar();
          else prevPillar();
        }
        touchStartX.current = null;
      }}
      className="relative flex min-h-[96svh] w-full flex-col justify-between overflow-hidden bg-[#050505] py-24 sm:py-28"
    >
      <div
        className={`pointer-events-none absolute top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full opacity-22 blur-[125px] ${
          lang === 'ar' ? 'left-[18%]' : 'right-[18%]'
        }`}
        style={{ background: 'radial-gradient(circle, #E2BE79 0%, transparent 70%)' }}
      />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${pillar.id}-${lang}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
                {t(pillar.eyebrow, lang)}
              </p>

              <h2 className="font-display mt-3.5 text-[clamp(2.1rem,4.5vw,3.65rem)] font-bold leading-[1.06] tracking-[0.025em] text-[#EDE0C4] uppercase">
                {t(pillar.title, lang)}
              </h2>

              <p className="mt-5 max-w-[430px] text-[14.5px] leading-[1.75] text-[#A49D92]">
                {t(pillar.description, lang)}
              </p>

              <div className="mt-6 inline-flex items-center gap-3 rounded-[2px] border border-[#DEC088]/20 bg-[#100F0D] px-3.5 py-2">
                <span className="text-[10.5px] tracking-[0.12em] text-[#9E978C] uppercase">
                  {t(pillar.statLabel, lang)}
                </span>
                <span className="h-3 w-[1px] bg-[#DEC088]/30" />
                <span className="font-display text-[12px] font-bold tracking-[0.04em] text-[#DEC088]">
                  {t(pillar.statValue, lang)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="btn-gold rounded-[2px] px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em]"
            >
              {t(SITE_CONFIG.craft.cta, lang)}
            </button>

            <button
              type="button"
              onClick={() => setSnipSignal((n) => n + 1)}
              className="inline-flex items-center gap-2 rounded-[2px] border border-white/15 bg-white/[0.02] px-4 py-3 text-[12px] font-medium tracking-[0.04em] text-[#D3CCC0] transition-colors hover:border-[#DEC088]/60 hover:text-[#DEC088]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#DEC088]" />
              <span>{t(SITE_CONFIG.craft.testBtn, lang)}</span>
            </button>
          </div>
        </div>

        <div
          onClick={() => setSnipSignal((n) => n + 1)}
          className="relative h-[360px] sm:h-[460px] lg:col-span-7 lg:h-[560px]"
        >
          <CraftShearsCanvas
            scrollProgress={scrollProg}
            targetOpenDeg={pillar.bladeOpenDeg}
            targetTiltDeg={pillar.shearsTiltDeg}
            snipSignal={snipSignal}
            reducedMotion={prefersReduced}
          />
        </div>
      </div>

      {/* Bottom Center Pagination Dots */}
      <div className="relative z-10 mx-auto mt-6 flex items-center justify-center gap-5 px-5" dir="ltr">
        <button
          type="button"
          onClick={prevPillar}
          aria-label="Précédent"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#BDB6AA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Piliers du savoir-faire">
          {CRAFT_PILLARS.map((item, idx) => {
            const active = idx === pillarIdx;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={t(item.title, lang)}
                onClick={() => setPillarIdx(idx)}
                className="p-1.5 focus-visible:outline-none"
              >
                <span
                  className={`block h-[4px] rounded-full transition-all duration-300 ${
                    active
                      ? 'w-10 bg-[#EDE0C4]'
                      : 'w-[5px] bg-white/30 hover:bg-[#DEC088]/80'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={nextPillar}
          aria-label="Suivant"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#BDB6AA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
