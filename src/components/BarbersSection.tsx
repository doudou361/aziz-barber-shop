import React from 'react';
import { Language, MASTER_BARBERS, t } from '../data/site';

interface BarberCardsProps {
  lang: Language;
  onBookClick: (serviceId?: string, barberId?: string) => void;
}

export const BarberCards: React.FC<BarberCardsProps> = ({ lang, onBookClick }) => (
  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
    {MASTER_BARBERS.map((barber) => (
      <article key={barber.id} className="overflow-hidden rounded-[3px] border border-white/10 bg-[#0E0D0C]">
        <img
          src={barber.image}
          alt={lang === 'ar' ? 'صورة توضيحية لحلّاق' : 'Portrait illustratif d’un barbier'}
          loading="lazy"
          className="h-64 w-full object-cover object-top"
        />
        <div className="p-6">
          <p className="mb-2 text-xs text-[#BEB7AA]">{lang === 'ar' ? 'صورة توضيحية' : 'Portrait illustratif'}</p>
          <span className="text-[10.5px] tracking-[0.14em] text-[#DEC088] uppercase">{t(barber.role, lang)}</span>
          <h3 className="font-display mt-1 text-xl font-bold text-[#EDE0C4]">{lang === 'ar' ? barber.nameAr : barber.name}</h3>
          <p className="mt-2 text-xs text-[#9E978C]">{t(barber.experience, lang)}</p>
          <p className="mt-2.5 text-[13px] leading-[1.6] text-[#BEB7AA]">{t(barber.specialty, lang)}</p>
          <button
            type="button"
            onClick={() => onBookClick(undefined, barber.id)}
            className="mt-5 w-full rounded-[2px] border border-[#DEC088]/45 py-2.5 text-xs font-semibold tracking-[0.05em] text-[#EDE0C4] uppercase transition-colors hover:bg-[#DEC088] hover:text-[#080706]"
          >
            {lang === 'ar' ? `احجز مع ${barber.nameAr}` : `Réserver avec ${barber.name}`}
          </button>
        </div>
      </article>
    ))}
  </div>
);

export const BarbersSection: React.FC<BarberCardsProps> = ({ lang, onBookClick }) => (
  <section id="barbers" className="border-t border-white/8 bg-[#070606] py-24 sm:py-28">
    <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
      <p className="text-[11px] font-medium tracking-[0.22em] text-[#DEC088] uppercase">{lang === 'ar' ? 'فريقنا' : "L'ÉQUIPE"}</p>
      <h2 className="font-display mt-2 text-2xl font-bold text-[#EDE0C4] uppercase sm:text-3xl">{lang === 'ar' ? 'حلّاقونا' : 'Nos barbiers'}</h2>
      <BarberCards lang={lang} onBookClick={onBookClick} />
    </div>
  </section>
);
