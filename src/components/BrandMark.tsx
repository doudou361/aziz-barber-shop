import React from 'react';
import { Language, SITE_CONFIG, t } from '../data/site';

interface BrandMarkProps {
  lang: Language;
  compact?: boolean;
  onClick?: () => void;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  lang,
  compact = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-3 text-start focus-visible:outline-none"
      aria-label={`${t(SITE_CONFIG.brand.name, lang)} — ${t(SITE_CONFIG.brand.subname, lang)}`}
    >
      {/* Hexagonal Gold Crest Emblem matching reference top-left & footer mark */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 44 48"
          className="h-9 w-9 transition-transform duration-300 group-hover:scale-105"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M22 2.5L40 12.8V35.2L22 45.5L4 35.2V12.8L22 2.5Z"
            stroke="#DEC088"
            strokeWidth="1.6"
          />
          <path
            d="M22 6.8L36.2 15V33L22 41.2L7.8 33V15L22 6.8Z"
            stroke="#DEC088"
            strokeOpacity="0.4"
            strokeWidth="0.9"
          />
          <path
            d="M15.5 16.5L28.5 31.5M28.5 16.5L15.5 31.5"
            stroke="#EDE0C4"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="22" cy="24" r="2.2" fill="#DEC088" />
          <circle cx="15" cy="32" r="2.3" stroke="#DEC088" strokeWidth="1.2" />
          <circle cx="29" cy="32" r="2.3" stroke="#DEC088" strokeWidth="1.2" />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[13px] sm:text-[14px] font-bold tracking-[0.14em] text-[#EDE0C4] transition-colors group-hover:text-[#F4DA9F]">
          {t(SITE_CONFIG.brand.name, lang)}
        </span>
        {!compact && (
          <span className="mt-1 flex items-center gap-2 text-[9px] font-medium tracking-[0.22em] text-[#A49D92]">
            <span className="h-[1px] w-3 bg-[#DEC088]/50" />
            {t(SITE_CONFIG.brand.subname, lang)}
            <span className="h-[1px] w-3 bg-[#DEC088]/50" />
          </span>
        )}
      </span>
    </button>
  );
};
