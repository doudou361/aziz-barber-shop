import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ALL_SERVICES,
  formatDuration,
  formatPrice,
  Language,
  PRICING_CATEGORIES,
  PricingCategoryId,
  SITE_CONFIG,
  t,
} from '../data/site';

interface PricingSectionProps {
  lang: Language;
  onReserveService: (serviceId: string) => void;
  compactTop?: boolean;
}

/**
 * Luxury Algerian pricing table inspired by pricing.algerian.ref/pricing-example.png,
 * rendered natively in the Aziz Barber Shop obsidian & champagne-gold design system.
 */
export const PricingSection: React.FC<PricingSectionProps> = ({
  lang,
  onReserveService,
  compactTop = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<PricingCategoryId>('coiffure');
  const prefersReduced = useReducedMotion() ?? false;

  const items = ALL_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="pricing-table"
      className={`relative w-full overflow-hidden border-t border-white/8 bg-[#070606] ${
        compactTop ? 'pt-8 pb-20' : 'py-24 sm:py-28'
      }`}
    >
      {/* Subtle warm radial glow behind pricing list */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full opacity-12 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #DEC088 0%, transparent 72%)' }}
      />

      <div className="relative z-10 mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        {/* Header Split matching pricing-example.png */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] font-medium tracking-[0.26em] text-[#DEC088] uppercase">
              {t(SITE_CONFIG.pricingSection.eyebrow, lang)}
            </p>
            <h2 className="font-display mt-3 text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.06] tracking-[0.02em] text-[#EDE0C4]">
              {t(SITE_CONFIG.pricingSection.title, lang)}
            </h2>
          </div>

          <p className="max-w-[430px] text-[14.5px] sm:text-[15.5px] leading-[1.68] text-[#B5AEA2]">
            {t(SITE_CONFIG.pricingSection.subtitle, lang)}
          </p>
        </div>

        {/* 4 Underlined Category Tabs matching pricing-example.png */}
        <div
          role="tablist"
          aria-label={t(SITE_CONFIG.pricingSection.title, lang)}
          className="mt-11 flex items-center gap-6 sm:gap-9 overflow-x-auto border-b border-white/15 pb-px"
        >
          {PRICING_CATEGORIES.map((cat) => {
            const active = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative shrink-0 pb-3.5 text-[14px] sm:text-[15px] font-medium transition-colors ${
                  active
                    ? 'text-[#EDE0C4]'
                    : 'text-[#8F887D] hover:text-[#D5CEC2]'
                }`}
              >
                {t(cat.label, lang)}
                {active && (
                  <motion.span
                    layoutId="pricing-tab-underline"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#DEC088]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Horizontal Editorial Pricing Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={prefersReduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="divide-y divide-white/10"
          >
            {items.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between gap-4 py-6 transition-colors hover:bg-white/[0.015] sm:flex-row sm:items-center sm:px-3"
              >
                <div>
                  <h3 className="font-display text-[19px] sm:text-[22px] font-bold tracking-[0.01em] text-[#F2E9D6] transition-colors group-hover:text-[#DEC088]">
                    {t(service.title, lang)}
                  </h3>
                  <p className="mt-1 text-[13px] text-[#989186]">
                    {formatDuration(service.durationMin, lang)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-6 sm:justify-end sm:gap-9">
                  <span className="font-display text-[20px] sm:text-[23px] font-bold tracking-[0.02em] text-[#EDE0C4]">
                    {formatPrice(service.priceDa, lang)}
                  </span>

                  <button
                    type="button"
                    onClick={() => onReserveService(service.id)}
                    className="rounded-[2px] border border-[#DEC088]/55 bg-[#0D0C0A] px-6 py-2.5 text-[12.5px] font-semibold tracking-[0.04em] text-[#EDE0C4] transition-all duration-200 hover:border-[#DEC088] hover:bg-[#DEC088] hover:text-[#080706]"
                  >
                    {t(SITE_CONFIG.pricingSection.reserveBtn, lang)}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
