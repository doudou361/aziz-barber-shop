import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { KIT_SLIDES, Language, SITE_CONFIG, t } from '../data/site';
import { SignatureKitCanvas } from './SignatureKitCanvas';

interface SignatureSectionProps {
  lang: Language;
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  lang,
  onBookClick,
  onExploreServices,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProg, setScrollProg] = useState(0.5);
  const touchStartX = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProg(v));

  const currentSlide = KIT_SLIDES[activeIndex];
  const prevSlide = () =>
    setActiveIndex((prev) => (prev === 0 ? KIT_SLIDES.length - 1 : prev - 1));
  const nextSlide = () =>
    setActiveIndex((prev) => (prev === KIT_SLIDES.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, []);

  const titleLines = t(currentSlide.title, lang).split('\n');

  return (
    <section
      id="signature-experience"
      ref={sectionRef}
      tabIndex={-1}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 45) {
          if (dx < 0) nextSlide();
          else prevSlide();
        }
        touchStartX.current = null;
      }}
      className="relative flex min-h-[96svh] w-full flex-col justify-between overflow-hidden bg-[#050505] py-24 sm:py-28"
    >
      <div
        className={`pointer-events-none absolute top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full opacity-20 blur-[130px] ${
          lang === 'ar' ? 'left-[8%]' : 'right-[8%]'
        }`}
        style={{ background: 'radial-gradient(circle, #D8B77C 0%, transparent 72%)' }}
      />

      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSlide.id}-${lang}`}
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
                {t(currentSlide.eyebrow, lang)}
              </p>

              <h2 className="font-display mt-3.5 text-[clamp(2rem,4.3vw,3.55rem)] font-bold leading-[1.08] tracking-[0.025em] text-[#EDE0C4] uppercase">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <p className="mt-5 max-w-[430px] text-[14.5px] leading-[1.72] text-[#A49D92]">
                {t(currentSlide.description, lang)}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {currentSlide.specs[lang].map((spec) => (
                  <span
                    key={spec}
                    className="rounded-[2px] border border-[#DEC088]/20 bg-[#11100E] px-2.5 py-1 text-[11px] tracking-[0.04em] text-[#CFC7BA]"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onBookClick}
              className="btn-gold rounded-[2px] px-7 py-3.5 text-[13px] font-semibold tracking-[0.03em]"
            >
              {t(SITE_CONFIG.signature.primaryCta, lang)}
            </button>

            <button
              type="button"
              onClick={onExploreServices}
              className="group inline-flex items-center gap-2.5 text-[13.5px] font-medium text-[#E5DDD0] transition-colors hover:text-[#DEC088]"
            >
              <span>{t(SITE_CONFIG.signature.secondaryCta, lang)}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </button>
          </div>
        </div>

        <div className="relative h-[360px] sm:h-[460px] lg:col-span-7 lg:h-[560px]">
          <SignatureKitCanvas
            focusTool={currentSlide.focusTool}
            scrollProgress={scrollProg}
            reducedMotion={prefersReduced}
          />
        </div>
      </div>

      {/* Bottom Carousel Indicators */}
      <div className="relative z-10 mx-auto mt-6 flex items-center justify-center gap-5 px-5" dir="ltr">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide précédent"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#BDB6AA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5" role="tablist" aria-label="Présentation des outils">
          {KIT_SLIDES.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={t(slide.title, lang).replace('\n', ' ')}
                onClick={() => setActiveIndex(idx)}
                className="group py-2 px-0.5 focus-visible:outline-none"
              >
                <span
                  className={`block h-[2.5px] rounded-full transition-all duration-300 ${
                    active
                      ? 'w-9 bg-[#EDE0C4]'
                      : 'w-5 bg-white/25 group-hover:bg-[#DEC088]/70'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide suivant"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[#BDB6AA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
