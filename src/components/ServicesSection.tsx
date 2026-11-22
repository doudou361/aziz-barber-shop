import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import {
  formatDuration,
  formatPrice,
  HERO_TRIO_SERVICES,
  Language,
  SITE_CONFIG,
  t,
} from '../data/site';
import { OrbitingToolsCanvas } from './OrbitingToolsCanvas';

interface ServicesSectionProps {
  lang: Language;
  onBookService: (serviceId: string) => void;
  onViewAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onBookService,
  onViewAllServices,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion() ?? false;
  const [activeCardId, setActiveCardId] = useState<string>('rituel-soin-barbe');
  const [scrollProg, setScrollProg] = useState(0.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => setScrollProg(v));

  return (
    <section
      id="services-showcase"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#060606] py-24 sm:py-28"
    >
      <div className="relative z-10 mx-auto my-auto grid w-full max-w-[1380px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:px-12">
        {/* 3 Side-by-Side Flagship Portrait Cards */}
        <div className="lg:col-span-8">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[540px]"
          >
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#BFB6A6] uppercase">
              {t(SITE_CONFIG.servicesSection.eyebrow, lang)}
            </p>
            <h2 className="font-display mt-3 text-[clamp(1.95rem,3.9vw,3.15rem)] font-bold leading-[1.08] tracking-[0.025em] text-[#EDE0C4] uppercase">
              <span className="block">{t(SITE_CONFIG.servicesSection.headlineLine1, lang)}</span>
              <span className="block">{t(SITE_CONFIG.servicesSection.headlineLine2, lang)}</span>
            </h2>
            <p className="mt-4 text-[14px] leading-[1.68] text-[#A49D92]">
              {t(SITE_CONFIG.servicesSection.description, lang)}
            </p>
          </motion.div>

          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {HERO_TRIO_SERVICES.map((service, index) => {
              const isHighlighted = activeCardId === service.id;
              return (
                <motion.article
                  key={service.id}
                  initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.58,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onMouseEnter={() => setActiveCardId(service.id)}
                  onFocus={() => setActiveCardId(service.id)}
                  onClick={() => setActiveCardId(service.id)}
                  className={`group relative flex min-h-[370px] sm:min-h-[390px] cursor-pointer flex-col justify-between overflow-hidden rounded-[3px] border transition-all duration-300 ${
                    isHighlighted
                      ? 'border-[#DEC088]/50 bg-[#17140F] shadow-[0_18px_46px_rgba(222,192,136,0.12)] -translate-y-1'
                      : 'border-white/10 bg-[#100F0E] hover:border-[#DEC088]/35'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0">
                    <img
                      src={service.image}
                      alt={t(service.title, lang)}
                      loading="lazy"
                      className={`h-full w-full object-cover object-top transition-transform duration-700 ${
                        isHighlighted ? 'scale-105 opacity-95' : 'scale-100 opacity-75 group-hover:scale-105'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isHighlighted
                          ? 'bg-gradient-to-b from-[#DEC088]/10 via-[#14110C]/65 to-[#12100C]/98'
                          : 'bg-gradient-to-b from-black/20 via-[#0E0D0C]/76 to-[#0D0C0B]/98'
                      }`}
                    />
                  </div>

                  {/* Algerian Dinar Price + Duration Gold Pill */}
                  <div className="relative z-10 flex justify-end p-4">
                    <span className="rounded-full bg-[#DEC088] px-3 py-1 text-[10px] font-bold tracking-[0.04em] text-[#0D0B09] shadow-sm">
                      {formatDuration(service.durationMin, lang)} · {formatPrice(service.priceDa, lang)}
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-col p-5 pt-16">
                    <h3 className="font-display text-[17px] font-bold leading-[1.2] tracking-[0.03em] text-[#F5EFE2] uppercase">
                      {t(service.title, lang)}
                    </h3>
                    <p className="mt-2.5 text-[12.5px] leading-[1.65] text-[#B7B0A4]">
                      {t(service.summary, lang)}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onBookService(service.id);
                      }}
                      className={`mt-5 w-full rounded-[2px] py-2.5 text-[12px] font-semibold tracking-[0.04em] transition-all duration-200 ${
                        isHighlighted
                          ? 'bg-[#DEC088] text-[#0D0B09] hover:bg-[#ECD29E]'
                          : 'border border-white/35 bg-black/30 text-[#EDE0C4] hover:border-[#DEC088] hover:text-[#DEC088]'
                      }`}
                    >
                      {t(SITE_CONFIG.servicesSection.bookBtn, lang)}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Side Studio Barber Chair + Orbiting Tools */}
        <div className="relative hidden lg:flex lg:col-span-4 lg:h-[540px] items-center justify-center">
          <div className="relative h-full w-full overflow-hidden">
            <img
              src={SITE_CONFIG.servicesSection.chairImage}
              alt="Fauteuil de barbier cuir noir Aziz Barber Shop"
              loading="lazy"
              className="h-full w-full object-contain object-center opacity-92"
            />
            <OrbitingToolsCanvas
              variant="services"
              scrollProgress={scrollProg}
              reducedMotion={prefersReduced}
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={onViewAllServices}
          className="group flex flex-col items-center gap-2 focus-visible:outline-none"
        >
          <span className="font-display text-[15px] sm:text-[17px] font-bold tracking-[0.18em] text-white uppercase transition-colors group-hover:text-[#DEC088]">
            {t(SITE_CONFIG.servicesSection.bottomAnchor, lang)}
          </span>
          <span className="h-[2.5px] w-12 rounded-full bg-white/90 transition-all duration-300 group-hover:w-20 group-hover:bg-[#DEC088]" />
        </button>
      </div>
    </section>
  );
};
