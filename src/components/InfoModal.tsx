import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../data/site';

interface InfoModalProps {
  lang: Language;
  modal: { title: string; body: string } | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ lang, modal, onClose }) => {
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, onClose]);

  if (!modal) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[460px] rounded-[3px] border border-[#DEC088]/30 bg-[#0D0C0B] p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id="info-modal-title"
            className="font-display text-base font-bold tracking-[0.04em] text-[#EDE0C4] uppercase"
          >
            {modal.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'ar' ? 'إغلاق' : 'Fermer'}
            className="text-[#9E978C] transition-colors hover:text-[#DEC088]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-[13.5px] leading-[1.72] text-[#A9A296]">{modal.body}</p>
        <button
          type="button"
          onClick={onClose}
          className="btn-gold mt-6 w-full rounded-[2px] py-2.5 text-xs font-semibold tracking-[0.06em] uppercase"
        >
          {lang === 'ar' ? 'إغلاق' : 'Fermer'}
        </button>
      </div>
    </div>
  );
};
