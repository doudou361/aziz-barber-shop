import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Phone,
  User,
  X,
} from 'lucide-react';
import {
  ALL_SERVICES,
  formatDuration,
  formatPrice,
  Language,
  MASTER_BARBERS,
  SITE_CONFIG,
  t,
  TIME_SLOTS,
} from '../data/site';

interface BookingModalProps {
  open: boolean;
  lang: Language;
  initialServiceId?: string;
  initialBarberId?: string;
  onClose: () => void;
}

function getUpcomingDates(lang: Language, count = 6) {
  const locale = lang === 'ar' ? 'ar-DZ' : 'fr-FR';
  const dates: { key: string; day: string; dateNum: string; label: string }[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      key: d.toISOString().slice(0, 10),
      day: d.toLocaleDateString(locale, { weekday: 'short' }),
      dateNum: String(d.getDate()),
      label: d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      }),
    });
  }
  return dates;
}

const COPY = {
  eyebrow: { fr: 'RÉSERVATION PERSONNALISÉE', ar: 'حجز مخصص · صالون عزيز' },
  step1Title: { fr: 'Choix des services', ar: 'اختيار الخدمات' },
  step2Title: { fr: 'Date et horaire', ar: 'التاريخ والوقت' },
  step3Title: { fr: 'Vos coordonnées', ar: 'معلوماتك الشخصية' },
  step4Title: { fr: 'Réservation enregistrée', ar: 'تم تسجيل الحجز' },
  barberLabel: { fr: 'Choix du barbier', ar: 'اختر الحلاق' },
  anyBarber: { fr: 'Aziz Barber Shop — Premier barbier disponible', ar: 'عزيز باربر شوب — أول حلاق متاح' },
  servicesDropdownPlaceholder: { fr: 'Sélectionner vos prestations', ar: 'اختر الخدمات المطلوبة' },
  selectedCount: (n: number, lang: Language) =>
    lang === 'ar'
      ? `${n} ${n > 1 ? 'خدمات مختارة' : 'خدمة مختارة'}`
      : `${n} prestation${n > 1 ? 's' : ''} sélectionnée${n > 1 ? 's' : ''}`,
  validateList: { fr: 'Valider', ar: 'تأكيد الاختيار' },
  back: { fr: 'Retour', ar: 'رجوع' },
  continue: { fr: 'Continuer', ar: 'متابعة' },
  confirm: { fr: 'Confirmer la réservation', ar: 'تأكيد الحجز' },
  dateLabel: { fr: 'Choisissez la date', ar: 'اختر اليوم' },
  timeLabel: { fr: 'Choisissez le créneau', ar: 'اختر التوقيت' },
  fullName: { fr: 'Nom complet *', ar: 'الاسم الكامل *' },
  phone: { fr: 'Numéro de téléphone *', ar: 'رقم الهاتف *' },
  phonePlaceholder: { fr: 'Ex : 0799 24 55 43', ar: 'مثال: 0799 24 55 43' },
  notes: { fr: 'Remarque (optionnel)', ar: 'ملاحظة إضافية (اختياري)' },
  validationError: {
    fr: 'Veuillez renseigner votre nom complet et un numéro de téléphone valide.',
    ar: 'يرجى إدخال الاسم الكامل ورقم هاتف صحيح.',
  },
  demoBadge: { fr: 'APERÇU DE RÉSERVATION DÉMO', ar: 'معاينة حجز تجريبي' },
  demoNotice: {
    fr: 'Cette réservation est un aperçu interactif de démonstration. Pour une confirmation immédiate par téléphone, appelez directement le salon.',
    ar: 'هذا الحجز عبارة عن معاينة تفاعلية تجريبية. للتأكيد الفوري يرجى الاتصال مباشرة بالصالون.',
  },
  callSalon: { fr: 'Appeler le salon', ar: 'اتصل بالصالون' },
  modify: { fr: 'Modifier', ar: 'تعديل' },
  done: { fr: 'Fermer', ar: 'إغلاق' },
  summaryClient: { fr: 'Client', ar: 'العميل' },
  summaryPhone: { fr: 'Téléphone', ar: 'الهاتف' },
  summaryBarber: { fr: 'Barbier', ar: 'الحلاق' },
  summaryServices: { fr: 'Prestations', ar: 'الخدمات' },
  summaryDateTime: { fr: 'Date & Heure', ar: 'الموعد' },
  summaryDuration: { fr: 'Durée totale', ar: 'المدة الإجمالية' },
  summaryTotal: { fr: 'Total estimé', ar: 'المجموع التقديري' },
};

/**
 * Multi-step Algerian booking concierge modeled directly after booking.algerian.ref/1–3.png:
 * Step 1: Barber selector + expandable multi-select services checklist with sticky "Valider" + "Retour / Continuer"
 * Step 2: Date & time picker
 * Step 3: Full Name & Phone Number ONLY (no email field)
 * Step 4: Instant summary with Aziz Barber Shop phone 0799 24 55 43
 */
export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  lang,
  initialServiceId,
  initialBarberId,
  onClose,
}) => {
  const upcomingDates = useMemo(() => getUpcomingDates(lang, 6), [lang]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [barberId, setBarberId] = useState<string>(initialBarberId || 'aziz');
  const [barberMenuOpen, setBarberMenuOpen] = useState(false);
  const [serviceListOpen, setServiceListOpen] = useState(true);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    initialServiceId || 'coupe-adulte',
  ]);
  const [selectedDate, setSelectedDate] = useState<string>(upcomingDates[0]?.key || '');
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[2]);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [refCode, setRefCode] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setStep(1);
      setServiceListOpen(true);
      setBarberMenuOpen(false);
      setRefCode(null);
      setErrorMsg(null);
      if (initialServiceId) {
        setSelectedServiceIds([initialServiceId]);
      } else if (selectedServiceIds.length === 0) {
        setSelectedServiceIds(['coupe-adulte']);
      }
      if (initialBarberId) {
        setBarberId(initialBarberId);
      }
    }
  }, [open, initialServiceId, initialBarberId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        return prev.length === 1 ? prev : prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const chosenServices = ALL_SERVICES.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = chosenServices.reduce((sum, s) => sum + s.priceDa, 0);
  const totalMinutes = chosenServices.reduce((sum, s) => sum + s.durationMin, 0);

  const chosenBarberObj = MASTER_BARBERS.find((b) => b.id === barberId);
  const chosenBarberLabel = chosenBarberObj
    ? `${lang === 'ar' ? chosenBarberObj.nameAr : chosenBarberObj.name} — ${t(chosenBarberObj.role, lang)}`
    : t(COPY.anyBarber, lang);

  const selectedSummaryText =
    chosenServices.length === 1
      ? t(chosenServices[0].title, lang)
      : COPY.selectedCount(chosenServices.length, lang);

  const chosenDateObj = upcomingDates.find((d) => d.key === selectedDate) || upcomingDates[0];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = guestPhone.replace(/\s+/g, '');
    if (!guestName.trim() || cleanedPhone.length < 8) {
      setErrorMsg(t(COPY.validationError, lang));
      return;
    }
    setErrorMsg(null);
    setRefCode(`AZ-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep(4);
  };

  const stepTitle =
    step === 1
      ? t(COPY.step1Title, lang)
      : step === 2
        ? t(COPY.step2Title, lang)
        : step === 3
          ? t(COPY.step3Title, lang)
          : t(COPY.step4Title, lang);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92svh] w-full max-w-[640px] flex-col overflow-hidden rounded-[4px] border border-[#DEC088]/28 bg-[#0A0908] text-[#EDE0C4] shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2
                  id="booking-modal-title"
                  className="font-display text-[22px] sm:text-[26px] font-bold tracking-[0.01em] text-[#EDE0C4]"
                >
                  {stepTitle}
                </h2>
                <p className="mt-1 text-[13px] text-[#9E978C]">
                  {t(COPY.eyebrow, lang)}
                  {step < 4 && (
                    <span className="ms-2 text-[#DEC088]">
                      · {step}/3
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#BDB6AA] transition-colors hover:border-[#DEC088] hover:text-[#DEC088]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="luxury-scroll flex-1 overflow-y-auto px-6 py-5">
              {/* ── STEP 1: CHOIX DU BARBIER & SERVICES (Exact booking.algerian.ref UX!) ── */}
              {step === 1 && (
                <div className="space-y-4">
                  {/* Dropdown 1: Barber Selection (Aziz / Yacine / Yousef / First available) */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setBarberMenuOpen((o) => !o)}
                      aria-expanded={barberMenuOpen}
                      className="flex w-full items-center justify-between rounded-[2px] border border-white/25 bg-[#12110E] px-4 py-3.5 text-start text-[14px] text-[#EDE0C4] transition-colors hover:border-[#DEC088]/65"
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <User className="h-4 w-4 shrink-0 text-[#DEC088]" />
                        <span className="truncate">{chosenBarberLabel}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#A49D92] transition-transform ${
                          barberMenuOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {barberMenuOpen && (
                      <div className="mt-1 overflow-hidden rounded-[2px] border border-[#DEC088]/35 bg-[#14120F] shadow-xl">
                        {MASTER_BARBERS.map((barber) => {
                          const selected = barberId === barber.id;
                          return (
                            <button
                              key={barber.id}
                              type="button"
                              onClick={() => {
                                setBarberId(barber.id);
                                setBarberMenuOpen(false);
                              }}
                              className={`flex w-full items-center justify-between px-4 py-3 text-start text-[13.5px] transition-colors ${
                                selected
                                  ? 'bg-[#DEC088]/18 text-[#EDE0C4]'
                                  : 'text-[#C8C0B4] hover:bg-white/[0.04]'
                              }`}
                            >
                              <span>
                                <strong className="font-semibold text-[#F4ECDC]">
                                  {lang === 'ar' ? barber.nameAr : barber.name}
                                </strong>{' '}
                                <span className="text-[12px] text-[#9E978C]">
                                  — {t(barber.role, lang)}
                                </span>
                              </span>
                              {selected && <Check className="h-4 w-4 text-[#DEC088]" />}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => {
                            setBarberId('any');
                            setBarberMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between border-t border-white/10 px-4 py-3 text-start text-[13px] transition-colors ${
                            barberId === 'any'
                              ? 'bg-[#DEC088]/18 text-[#EDE0C4]'
                              : 'text-[#A49D92] hover:bg-white/[0.04]'
                          }`}
                        >
                          <span>{t(COPY.anyBarber, lang)}</span>
                          {barberId === 'any' && <Check className="h-4 w-4 text-[#DEC088]" />}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dropdown 2: Multi-Select Services Checklist Panel (matching 1.png, 2.png, 3.png) */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setServiceListOpen((o) => !o)}
                      aria-expanded={serviceListOpen}
                      className="flex w-full items-center justify-between rounded-[2px] border border-white/25 bg-[#12110E] px-4 py-3.5 text-start text-[14px] text-[#EDE0C4] transition-colors hover:border-[#DEC088]/65"
                    >
                      <span className="truncate font-medium">{selectedSummaryText}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#A49D92] transition-transform ${
                          serviceListOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {serviceListOpen && (
                      <div className="mt-1 overflow-hidden rounded-[2px] border border-white/25 bg-[#100F0D]">
                        <div className="luxury-scroll max-h-[300px] divide-y divide-white/6 overflow-y-auto">
                          {ALL_SERVICES.map((svc) => {
                            const checked = selectedServiceIds.includes(svc.id);
                            return (
                              <button
                                key={svc.id}
                                type="button"
                                onClick={() => toggleService(svc.id)}
                                className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-start transition-colors ${
                                  checked
                                    ? 'bg-[#DEC088]/18 text-[#F6EEDF]'
                                    : 'text-[#CFC8BC] hover:bg-white/[0.035]'
                                }`}
                              >
                                <span className="flex items-center gap-3.5 min-w-0">
                                  {/* Square checkbox matching booking.algerian.ref */}
                                  <span
                                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border transition-colors ${
                                      checked
                                        ? 'border-[#DEC088] bg-[#DEC088] text-[#080706]'
                                        : 'border-white/35 bg-transparent'
                                    }`}
                                  >
                                    {checked && <Check className="h-3 w-3 stroke-[3]" />}
                                  </span>
                                  <span className="truncate text-[14px] font-medium">
                                    {t(svc.title, lang)}
                                  </span>
                                </span>

                                <span className="flex shrink-0 items-center gap-3.5 text-[12.5px]">
                                  <span className="text-[#9E978C]">
                                    {formatDuration(svc.durationMin, lang)}
                                  </span>
                                  <span className="min-w-[66px] text-end font-semibold text-[#DEC088]">
                                    {formatPrice(svc.priceDa, lang)}
                                  </span>
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Sticky "Valider" bar inside dropdown matching booking.algerian.ref/3.png */}
                        <button
                          type="button"
                          onClick={() => setServiceListOpen(false)}
                          className="w-full border-t border-white/15 bg-[#161410] py-3 text-center text-[13.5px] font-semibold tracking-[0.04em] text-[#EDE0C4] transition-colors hover:bg-[#DEC088]/15 hover:text-[#DEC088]"
                        >
                          {t(COPY.validateList, lang)}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Selected services compact recap pills */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-[2px] border border-[#DEC088]/20 bg-[#12100C] px-4 py-3 text-[12.5px]">
                    <span className="text-[#B6AFA3]">
                      {formatDuration(totalMinutes, lang)} · {COPY.selectedCount(chosenServices.length, lang)}
                    </span>
                    <span className="font-display text-base font-bold text-[#DEC088]">
                      {formatPrice(totalPrice, lang)}
                    </span>
                  </div>
                </div>
              )}

              {/* ── STEP 2: DATE & TIME ── */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#DEC088] uppercase">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{t(COPY.dateLabel, lang)}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                      {upcomingDates.map((d) => {
                        const active = selectedDate === d.key;
                        return (
                          <button
                            key={d.key}
                            type="button"
                            onClick={() => setSelectedDate(d.key)}
                            className={`flex flex-col items-center rounded-[2px] border py-2.5 text-center transition-all ${
                              active
                                ? 'border-[#DEC088] bg-[#DEC088] text-[#080706]'
                                : 'border-white/15 bg-[#12110E] text-[#D2CAC0] hover:border-[#DEC088]/50'
                            }`}
                          >
                            <span className="text-[11px] font-medium capitalize">{d.day}</span>
                            <span className="font-display mt-0.5 text-base font-bold">
                              {d.dateNum}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#DEC088] uppercase">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{t(COPY.timeLabel, lang)}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        const active = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`rounded-[2px] border py-2.5 text-center text-[13px] font-semibold transition-all ${
                              active
                                ? 'border-[#DEC088] bg-[#1B1710] text-[#DEC088]'
                                : 'border-white/12 bg-[#12110E] text-[#B5AEA2] hover:border-white/30'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[2px] border border-white/10 bg-[#12110E] p-4 text-[13px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#9E978C]">{t(COPY.summaryBarber, lang)}</span>
                      <span className="font-semibold text-[#EDE0C4]">
                        {chosenBarberObj
                          ? lang === 'ar'
                            ? chosenBarberObj.nameAr
                            : chosenBarberObj.name
                          : t(COPY.anyBarber, lang)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E978C]">{t(COPY.summaryServices, lang)}</span>
                      <span className="text-end text-[#EDE0C4]">
                        {chosenServices.map((s) => t(s.shortTitle, lang)).join(' + ')}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span className="text-[#9E978C]">
                        {t(COPY.summaryTotal, lang)} ({formatDuration(totalMinutes, lang)})
                      </span>
                      <span className="font-display font-bold text-[#DEC088]">
                        {formatPrice(totalPrice, lang)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: FULL NAME & PHONE NUMBER ONLY (NO EMAIL!) ── */}
              {step === 3 && (
                <form id="aziz-booking-form" onSubmit={handleConfirm} className="space-y-4">
                  <div>
                    <label
                      htmlFor="booking-fullname"
                      className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-[#DEC088] uppercase"
                    >
                      {t(COPY.fullName, lang)}
                    </label>
                    <input
                      id="booking-fullname"
                      type="text"
                      required
                      autoComplete="name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Ex : Karim Benali'}
                      className="w-full rounded-[2px] border border-white/20 bg-[#12110E] px-4 py-3 text-[14px] text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="mb-1.5 block text-xs font-semibold tracking-[0.1em] text-[#DEC088] uppercase"
                    >
                      {t(COPY.phone, lang)}
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      dir="ltr"
                      required
                      autoComplete="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder={t(COPY.phonePlaceholder, lang)}
                      className="w-full rounded-[2px] border border-white/20 bg-[#12110E] px-4 py-3 text-[14px] text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-notes"
                      className="mb-1.5 block text-xs font-medium tracking-[0.08em] text-[#A49D92] uppercase"
                    >
                      {t(COPY.notes, lang)}
                    </label>
                    <textarea
                      id="booking-notes"
                      rows={2}
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      placeholder={
                        lang === 'ar'
                          ? 'تفضيلات القصة أو أي ملاحظة للحلاق...'
                          : 'Préférence de dégradé, barbe ou remarque...'
                      }
                      className="w-full rounded-[2px] border border-white/15 bg-[#12110E] px-4 py-2.5 text-[13.5px] text-[#EDE0C4] placeholder-[#7C766D] focus:border-[#DEC088] focus:outline-none"
                    />
                  </div>

                  {errorMsg && <p className="text-xs text-[#F2A07B]">{errorMsg}</p>}

                  {/* Recap */}
                  <div className="rounded-[2px] border border-[#DEC088]/20 bg-[#12100C] p-4 text-[12.5px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#9E978C]">{t(COPY.summaryDateTime, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">
                        {chosenDateObj?.label} · {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9E978C]">{t(COPY.summaryBarber, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">
                        {chosenBarberObj
                          ? lang === 'ar'
                            ? chosenBarberObj.nameAr
                            : chosenBarberObj.name
                          : t(COPY.anyBarber, lang)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-1.5">
                      <span className="text-[#9E978C]">{t(COPY.summaryTotal, lang)}</span>
                      <span className="font-display font-bold text-[#DEC088]">
                        {formatPrice(totalPrice, lang)}
                      </span>
                    </div>
                  </div>
                </form>
              )}

              {/* ── STEP 4: DEMO CONFIRMATION SUMMARY ── */}
              {step === 4 && refCode && (
                <div className="rounded-[3px] border border-[#DEC088]/35 bg-[#12100C] p-6">
                  <div className="flex items-center gap-2 text-[#DEC088]">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-xs font-semibold tracking-[0.14em] uppercase">
                      {t(COPY.demoBadge, lang)}
                    </span>
                  </div>
                  <h3 className="font-display mt-3 text-xl font-bold text-[#F5EFE2]">
                    #{refCode}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-[#A49D92]">
                    {t(COPY.demoNotice, lang)}
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-[13px]">
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryClient, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">{guestName}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryPhone, lang)}</span>
                      <span dir="ltr" className="font-medium text-[#EDE0C4]">
                        {guestPhone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryBarber, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">
                        {chosenBarberObj
                          ? lang === 'ar'
                            ? chosenBarberObj.nameAr
                            : chosenBarberObj.name
                          : t(COPY.anyBarber, lang)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryServices, lang)}</span>
                      <span className="text-end font-medium text-[#EDE0C4]">
                        {chosenServices.map((s) => t(s.title, lang)).join(' + ')}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryDateTime, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">
                        {chosenDateObj?.label} · {selectedTime}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-[#9E978C]">{t(COPY.summaryDuration, lang)}</span>
                      <span className="font-medium text-[#EDE0C4]">
                        {formatDuration(totalMinutes, lang)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2.5">
                      <span className="text-[#9E978C]">{t(COPY.summaryTotal, lang)}</span>
                      <span className="font-display text-lg font-bold text-[#DEC088]">
                        {formatPrice(totalPrice, lang)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={SITE_CONFIG.brand.phoneHref}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-[#DEC088]/50 bg-[#1B1710] py-2.5 text-xs font-semibold text-[#DEC088] transition-colors hover:bg-[#DEC088] hover:text-[#080706]"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{t(COPY.callSalon, lang)} :</span>
                    <span dir="ltr">{SITE_CONFIG.brand.phoneDisplay}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Bottom Dual Action Bar matching booking.algerian.ref ("Retour" + "Continuer") */}
            <div className="border-t border-white/10 bg-[#0D0C0B] px-6 py-4">
              {step === 1 && (
                <div className="grid grid-cols-12 gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="col-span-4 rounded-[2px] border border-white/25 py-3 text-[13px] font-medium text-[#BEB7AA] transition-colors hover:border-[#DEC088] hover:text-[#EDE0C4]"
                  >
                    {t(COPY.back, lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="btn-gold col-span-8 rounded-[2px] py-3 text-[13.5px] font-bold tracking-[0.04em]"
                  >
                    {t(COPY.continue, lang)}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-12 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="col-span-4 rounded-[2px] border border-white/25 py-3 text-[13px] font-medium text-[#BEB7AA] transition-colors hover:border-[#DEC088] hover:text-[#EDE0C4]"
                  >
                    {t(COPY.back, lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-gold col-span-8 rounded-[2px] py-3 text-[13.5px] font-bold tracking-[0.04em]"
                  >
                    {t(COPY.continue, lang)}
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-12 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="col-span-4 rounded-[2px] border border-white/25 py-3 text-[13px] font-medium text-[#BEB7AA] transition-colors hover:border-[#DEC088] hover:text-[#EDE0C4]"
                  >
                    {t(COPY.back, lang)}
                  </button>
                  <button
                    type="submit"
                    form="aziz-booking-form"
                    className="btn-gold col-span-8 rounded-[2px] py-3 text-[13.5px] font-bold tracking-[0.04em]"
                  >
                    {t(COPY.confirm, lang)}
                  </button>
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-[2px] border border-white/25 py-3 text-[13px] font-medium text-[#EDE0C4] hover:border-[#DEC088]"
                  >
                    {t(COPY.modify, lang)}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-gold rounded-[2px] py-3 text-[13px] font-bold"
                  >
                    {t(COPY.done, lang)}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
