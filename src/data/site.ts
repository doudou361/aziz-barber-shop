export type Language = 'fr' | 'ar';
export type RoutePath = '/' | '/services' | '/experience' | '/about' | '/showcase';
export type PricingCategoryId =
  | 'coiffure'
  | 'barbe'
  | 'soins-visage'
  | 'soins-capillaires'
  | 'tracage';

export interface BiText {
  fr: string;
  ar: string;
}

export interface ServiceItem {
  id: string;
  title: BiText;
  shortTitle: BiText;
  category: PricingCategoryId;
  durationMin: number;
  priceDa: number | null;
  summary: BiText;
  details: BiText;
  includes: { fr: string[]; ar: string[] };
  image: string;
  featured?: boolean;
  showInHeroTrio?: boolean;
}

export interface KitSlide {
  id: string;
  eyebrow: BiText;
  title: BiText;
  description: BiText;
  focusTool: 'all' | 'clipper' | 'elixir' | 'razor';
  specs: { fr: string[]; ar: string[] };
}

export interface CraftPillar {
  id: string;
  eyebrow: BiText;
  title: BiText;
  description: BiText;
  bladeOpenDeg: number;
  shearsTiltDeg: number;
  statLabel: BiText;
  statValue: BiText;
}

export interface BarberProfile {
  id: string;
  name: string;
  nameAr: string;
  role: BiText;
  experience: BiText;
  specialty: BiText;
  availability: BiText;
  image: string;
}

export function t(text: BiText, lang: Language): string {
  return text[lang];
}

export function formatPrice(priceDa: number | null, lang: Language): string {
  if (priceDa === null) return lang === 'ar' ? 'يُحدد لاحقاً' : 'À confirmer';
  const formatted = priceDa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return lang === 'ar' ? `${formatted} دج` : `${formatted} DA`;
}

export function formatSelectionPrice(items: ServiceItem[], lang: Language): string {
  const knownTotal = items.reduce((total, item) => total + (item.priceDa ?? 0), 0);
  const hasPendingPrice = items.some((item) => item.priceDa === null);
  if (!hasPendingPrice) return formatPrice(knownTotal, lang);
  if (knownTotal === 0) return formatPrice(null, lang);
  return `${formatPrice(knownTotal, lang)} + ${formatPrice(null, lang)}`;
}

export function formatDuration(minutes: number, lang: Language): string {
  return lang === 'ar' ? `${minutes} دقيقة` : `${minutes} min`;
}

export const PRICING_CATEGORIES: { id: PricingCategoryId; label: BiText }[] = [
  { id: 'coiffure', label: { fr: 'Coiffure', ar: 'الحلاقة' } },
  { id: 'barbe', label: { fr: 'Barbe', ar: 'اللحية' } },
  { id: 'soins-visage', label: { fr: 'Soins du visage', ar: 'العناية بالوجه' } },
  { id: 'soins-capillaires', label: { fr: 'Soins capillaires', ar: 'العناية بالشعر' } },
  { id: 'tracage', label: { fr: 'Traçage', ar: 'التحديد' } },
];

/**
 * CENTRALIZED SITE CONFIGURATION — AZIZ BARBER SHOP (BARBER HOUSE)
 * Edit brand info, phone number, French/Arabic copy, Algerian pricing (DA), and barbers here.
 */
export const SITE_CONFIG = {
  brand: {
    name: { fr: 'AZIZ BARBER SHOP', ar: 'عزيز باربر شوب' },
    subname: { fr: 'BARBER HOUSE', ar: 'بيت الحلاقة' },
    phoneDisplay: '0799 24 55 43',
    phoneRaw: '0799245543',
    phoneHref: 'tel:+213799245543',
    address: {
      fr: 'Alger, Algérie — Salon Aziz Barber Shop',
      ar: 'الجزائر العاصمة — صالون عزيز باربر شوب',
    },
    copyright: {
      fr: '© 2026 Aziz Barber Shop — Barber House. Tous droits réservés.',
      ar: '© 2026 عزيز باربر شوب — بيت الحلاقة. جميع الحقوق محفوظة.',
    },
    hours: [
      {
        days: { fr: 'Sam – Jeu', ar: 'السبت – الخميس' },
        time: { fr: '10:00 – 21:00', ar: '10:00 – 21:00' },
      },
      {
        days: { fr: 'Vendredi', ar: 'الجمعة' },
        time: { fr: '14:30 – 21:30', ar: '14:30 – 21:30' },
      },
    ],
  },
  navLinks: [
    { label: { fr: 'Accueil', ar: 'الرئيسية' }, path: '/' as RoutePath },
    { label: { fr: 'Tarifs & Services', ar: 'الخدمات والأسعار' }, path: '/services' as RoutePath },
    { label: { fr: 'Expérience', ar: 'التجربة' }, path: '/experience' as RoutePath },
    { label: { fr: 'À propos', ar: 'من نحن' }, path: '/about' as RoutePath },
  ],
  navCta: { fr: 'Prendre RDV', ar: 'احجز موعدك' },
  hero: {
    eyebrow: { fr: 'BARBER HOUSE · SALON HOMME PREMIUM', ar: 'بيت الحلاقة · صالون رجالي فاخر' },
    headlineLine1: { fr: 'PRÉCISION. STYLE.', ar: 'دقّة. أناقة.' },
    headlineLine2: { fr: 'CONFIANCE.', ar: 'ثقة متجدّدة.' },
    description: {
      fr: "Plus qu'une simple coupe. Une expérience complète de coiffure et de soins pensée pour l'homme moderne.",
      ar: 'أكثر من مجرد قصة شعر. تجربة عناية وحلاقة متكاملة مصممة للرجل العصري بأعلى معايير الدقة.',
    },
    primaryCta: { fr: 'Réserver votre rendez-vous', ar: 'احجز موعدك الآن' },
    secondaryCta: { fr: 'Découvrir nos tarifs', ar: 'اكتشف الأسعار والخدمات' },
    scrollLabel: { fr: 'Faites défiler pour explorer', ar: 'مرّر للأسفل للاستكشاف' },
    image: '/assets/hero-chair.webp',
  },
  signature: {
    primaryCta: { fr: 'Réserver maintenant', ar: 'احجز الآن' },
    secondaryCta: { fr: 'Voir la tarification', ar: 'استعرض الأسعار' },
  },
  servicesSection: {
    eyebrow: { fr: 'PRESTATIONS PHARES', ar: 'خدماتنا المميزة' },
    headlineLine1: { fr: 'EXPÉRIENCE', ar: 'تجربة' },
    headlineLine2: { fr: 'SIGNATURE', ar: 'استثنائية' },
    description: {
      fr: 'Chaque visite débute par un diagnostic personnalisé, une coupe architecturale et une finition soignée à la serviette chaude.',
      ar: 'تبدأ كل جلسة باستشارة مخصصة، وتشكيل دقيق يناسب ملامحك، ولمسة ختامية بالمنشفة الساخنة.',
    },
    bookBtn: { fr: 'Réserver', ar: 'احجز الخدمة' },
    bottomAnchor: { fr: 'TARIFS & SERVICES', ar: 'الخدمات والأسعار' },
    chairImage: '/assets/chair-studio.webp',
  },
  pricingSection: {
    eyebrow: { fr: 'GRILLE TARIFAIRE · DZD', ar: 'قائمة الأسعار · دينار جزائري' },
    title: { fr: 'Notre tarification', ar: 'قائمة أسعارنا' },
    subtitle: {
      fr: 'Découvrez notre liste de prestations et de tarifs pensée pour répondre au mieux à vos attentes.',
      ar: 'اكتشف قائمة خدماتنا وأسعارنا المصممة بعناية لتلبية جميع تطلعاتك بأعلى جودة.',
    },
    reserveBtn: { fr: 'Réserver', ar: 'احجز' },
  },
  craft: {
    cta: { fr: 'Prendre rendez-vous', ar: 'احجز موعدك' },
    testBtn: { fr: 'Tester la précision des lames', ar: 'جرّب حركة المقص' },
  },
  groomingExperience: {
    eyebrow: { fr: 'EXPÉRIENCE BARBER HOUSE', ar: 'تجربة عزيز باربر شوب' },
    headlineLine1: { fr: 'EXPÉRIENCE DE SOIN', ar: 'تجربة عناية' },
    headlineLine2: { fr: 'HAUT DE GAMME', ar: 'بمستوى فاخر' },
    description: {
      fr: 'Un espace élégant mêlant cuir noir, lumière ambrée chaleureuse, rituels de vapeur et savoir-faire artisanal.',
      ar: 'مساحة راقية تجمع بين الفخامة، الإضاءة الدافئة، طقوس البخار الساخن والحرفية العالية في كل تفصيل.',
    },
    primaryCta: { fr: 'Réserver votre rendez-vous', ar: 'احجز موعدك الآن' },
    secondaryCta: { fr: 'Explorer les services', ar: 'تصفح الخدمات' },
    scrollLabel: { fr: 'Réserver votre fauteuil', ar: 'احجز كرسيك الآن' },
    image: '/assets/experience-chair.webp',
  },
  haloCta: {
    eyebrow: { fr: 'RÉSERVEZ VOTRE FAUTEUIL', ar: 'احجز مقعدك الآن' },
    headlineLine1: { fr: 'VOTRE PROCHAIN STYLE', ar: 'إطلالتك القادمة' },
    headlineLine2: { fr: 'COMMENCE ICI.', ar: 'تبدأ من هنا.' },
    description: {
      fr: 'Des dégradés impeccables aux soins capillaires et barbe sur mesure, offrez-vous un moment d’excellence chez Aziz Barber Shop.',
      ar: 'من التدريج المتقن إلى تنسيق اللحية وعلاجات الشعر الفاخرة، امنح نفسك ساعة من التميز في عزيز باربر شوب.',
    },
    cta: { fr: 'Prendre rendez-vous', ar: 'احجز موعدك' },
    image: '/assets/halo-chair.webp',
  },
  footer: {
    navTitle: { fr: 'Navigation', ar: 'التنقل' },
    contactTitle: { fr: 'Contact & Recherche', ar: 'تواصل وبحث سريع' },
    bookingTitle: { fr: 'Prendre rendez-vous', ar: 'حجز موعد' },
    bookingBlurb: {
      fr: "Vivez l'art de la coiffure masculine sur mesure. Réservez votre créneau en ligne en quelques secondes.",
      ar: 'عش تجربة الحلاقة الرجالية الراقية. احجز موعدك أونلاين في ثوانٍ معدودة.',
    },
    searchPlaceholder: {
      fr: 'Rechercher une prestation...',
      ar: 'ابحث عن خدمة أو علاج...',
    },
    noResults: {
      fr: 'Aucune prestation trouvée.',
      ar: 'لم يتم العثور على خدمة مطابقة.',
    },
    legalLinks: [
      { id: 'privacy', label: { fr: 'Politique de confidentialité', ar: 'سياسة الخصوصية' } },
      { id: 'terms', label: { fr: 'Conditions générales', ar: 'الشروط والأحكام' } },
      { id: 'cancel', label: { fr: "Politique d'annulation", ar: 'سياسة الإلغاء' } },
    ],
  },
} as const;

export const KIT_SLIDES: KitSlide[] = [
  {
    id: 'full-kit',
    eyebrow: { fr: 'COLLECTION SIGNATURE', ar: 'المجموعة المميزة' },
    title: { fr: 'EXPÉRIENCE\nSIGNATURE', ar: 'تجربة\nاستثنائية' },
    description: {
      fr: 'Des instruments de précision parfaitement équilibrés et des soins capillaires sélectionnés pour un rendu impeccable.',
      ar: 'أدوات حلاقة احترافية متوازنة بدقة مع مستحضرات عناية مختارة لإطلالة متقنة تدوم طويلاً.',
    },
    focusTool: 'all',
    specs: {
      fr: ['Tondeuse Sans Fil Pro', 'Peigne Carbone Antistatique', 'Huile Barbe Botanique'],
      ar: ['ماكينة حلاقة احترافية', 'مشط كربون دقيق', 'زيت عناية طبيعي باللحية'],
    },
  },
  {
    id: 'precision-clipper',
    eyebrow: { fr: '02 · DÉGRADÉ ZÉRO', ar: '02 · تدريج متقن' },
    title: { fr: 'INSTRUMENTS\nDE PRÉCISION', ar: 'أدوات\nعالية الدقة' },
    description: {
      fr: 'Tondeuses chromées haute vitesse associées à une tondeuse de finition T-Blade pour des contours nets et fluides.',
      ar: 'ماكينات كروم عالية السرعة مع ماكينة تحديد دقيقة لتدرجات ناعمة وخطوط حادة متناسقة.',
    },
    focusTool: 'clipper',
    specs: {
      fr: ['Moteur 7 200 tr/min', 'Lames Acier DLC', 'Finition Contours Précis'],
      ar: ['محرك عالي العزم', 'شفرات فولاذية حادة', 'تحديد دقيق للحواف'],
    },
  },
  {
    id: 'apothecary-elixir',
    eyebrow: { fr: '03 · SOINS SUR MESURE', ar: '03 · عناية متكاملة' },
    title: { fr: 'SOINS VISAGE\n& CAPILLAIRES', ar: 'علاجات الوجه\nوالشعر' },
    description: {
      fr: 'Masque gold ou noir, gommage purifiant, soins au tanin, à la kératine, marin et oxygénant pour revitaliser peau et cheveux.',
      ar: 'ماسك ذهبي أو أسود، تقشير منقي، وعلاجات التانين والكيراتين والبحر والأكسجين لتجديد البشرة والشعر.',
    },
    focusTool: 'elixir',
    specs: {
      fr: ['Soin Tanin & Kératine', 'Masque Gold / Noir', 'Rituel Purifiant'],
      ar: ['علاج التانين والكيراتين', 'ماسك ذهبي وأسود', 'تنظيف وتنقية عميقة'],
    },
  },
  {
    id: 'straight-razor',
    eyebrow: { fr: '04 · RITUEL TRADITIONNEL', ar: '04 · طقس الحلاقة التقليدية' },
    title: { fr: 'RASAGE AU\nCOUPE-CHOUX', ar: 'حلاقة تقليدية\nبالموس' },
    description: {
      fr: 'Rasoir droit équilibré à la main, serviette chaude aromatique et traçage de précision au fil ou à la cire.',
      ar: 'حلاقة تقليدية متقنة بالموس مع منشفة بخار ساخنة وتحديد دقيق بالخيط والشمع.',
    },
    focusTool: 'razor',
    specs: {
      fr: ['Acier Forgé Japonais', 'Serviette Chaude Vapeur', 'Baume Apaisant'],
      ar: ['شفرات فولاذية يابانية', 'منشفة بخار دافئة', 'بلسم مهدئ للبشرة'],
    },
  },
];

/**
 * ALL 15 ALGERIAN BARBERSHOP SERVICES (Matching pricing.algerian.ref & booking.algerian.ref)
 */
export const ALL_SERVICES: ServiceItem[] = [
  // ── COIFFURE ──
  {
    id: 'coupe-adulte',
    title: { fr: 'Coupe adulte', ar: 'قصة شعر للرجال' },
    shortTitle: { fr: 'Coupe adulte', ar: 'قصة للرجال' },
    category: 'coiffure',
    durationMin: 30,
    priceDa: 1000,
    summary: {
      fr: 'Dégradé moderne ou coupe classique adaptée à votre morphologie, finition nuque au rasoir et coiffage.',
      ar: 'تدريج عصري أو قصة كلاسيكية تناسب شكل الرأس مع تنظيف الرقبة بالموس وتصفيف أنيق.',
    },
    details: {
      fr: 'Diagnostic personnalisé, coupe tondeuse et ciseaux, dégradé fluide, contours précis et finition soignée.',
      ar: 'استشارة سريعة، قصة متقنة بالماكينة والمقص، تدريج سلس وتحديد دقيق للحواف والرقبة.',
    },
    includes: {
      fr: ['Conseil visagiste', 'Dégradé ou coupe classique', 'Contours au rasoir', 'Coiffage final'],
      ar: ['استشارة لاختيار القصة', 'تدريج أو قصة كلاسيكية', 'تحديد الرقبة بالموس', 'تصفيف ختامي'],
    },
    image: '/assets/service-haircut.webp',
    showInHeroTrio: true,
  },
  {
    id: 'coupe-enfant',
    title: { fr: 'Coupe enfant (-7 ans)', ar: 'قصة أطفال (أقل من 7 سنوات)' },
    shortTitle: { fr: 'Coupe enfant', ar: 'قصة أطفال' },
    category: 'coiffure',
    durationMin: 30,
    priceDa: 700,
    summary: {
      fr: 'Coupe soignée et douce spécialement adaptée aux enfants de moins de 7 ans dans un cadre accueillant.',
      ar: 'قصة شعر لطيفة ومرتبة مخصصة للأطفال دون 7 سنوات بأسلوب مريح وعناية خاصة.',
    },
    details: {
      fr: 'Accueil patient et attentif pour une coupe propre, équilibrée et facile à coiffer au quotidien.',
      ar: 'تعامل صبور ومريح مع الأطفال لضمان قصة نظيفة ومتناسقة وسهلة التصفيف يومياً.',
    },
    includes: {
      fr: ['Approche douce et patiente', 'Coupe ciseaux & tondeuse', 'Finition nette'],
      ar: ['تعامل لطيف ومريح', 'قص دقيق بالمقص والماكينة', 'تنظيف وترتيب نهائي'],
    },
    image: '/assets/atelier-cut.webp',
  },
  {
    id: 'coupe-ciseaux',
    title: { fr: 'Coupe aux ciseaux', ar: 'قصة كاملة بالمقص' },
    shortTitle: { fr: 'Coupe ciseaux', ar: 'قصة بالمقص' },
    category: 'coiffure',
    durationMin: 30,
    priceDa: 1200,
    summary: {
      fr: 'Travail intégral aux ciseaux japonais pour cheveux mi-longs à longs, volume maîtrisé et repousse naturelle.',
      ar: 'قص احترافي كامل بالمقص الياباني للشعر المتوسط والطويل يمنح توازناً طبيعياً ومظهراً راقياً.',
    },
    details: {
      fr: 'Sculpture intégrale aux ciseaux avec effilage précis pour préserver le mouvement naturel et la structure.',
      ar: 'تشكيل كامل بالمقص مع تخفيف مدروس للحفاظ على انسيابية الشعر وثبات القصة مع النمو.',
    },
    includes: {
      fr: ['Sculpture 100% ciseaux', 'Équilibrage du volume', 'Brushing léger'],
      ar: ['قص 100% بالمقص', 'توازن مثالي للحجم', 'تصفيف طبيعي خفيف'],
    },
    image: '/assets/atelier-cut.webp',
  },
  {
    id: 'brushing',
    title: { fr: 'Brushing', ar: 'تصفيف الشعر (بروشينغ)' },
    shortTitle: { fr: 'Brushing', ar: 'بروشينغ' },
    category: 'coiffure',
    durationMin: 15,
    priceDa: 400,
    summary: {
      fr: 'Mise en forme rapide au sèche-cheveux avec produits coiffants mats ou naturels haute tenue.',
      ar: 'تصفيف سريع ومرتب بالمجفف مع مستحضرات تثبيت طبيعية تمنحك أناقة فورية.',
    },
    details: {
      fr: 'Coiffage structuré idéal avant un événement, un rendez-vous professionnel ou une sortie.',
      ar: 'تصفيف متقن مثالي قبل المناسبات والاجتماعات والسهرات بلمسة طبيعية غير لامعة.',
    },
    includes: {
      fr: ['Protection thermique', 'Mise en forme brosse', 'Finition cire ou poudre'],
      ar: ['حماية من الحرارة', 'تصفيف متقن بالفرشاة', 'تثبيت طبيعي أنيق'],
    },
    image: '/assets/service-styling.webp',
  },

  // ── BARBE ──
  {
    id: 'taille-barbe',
    title: { fr: 'Taille de barbe', ar: 'تحديد وتنسيق اللحية' },
    shortTitle: { fr: 'Taille barbe', ar: 'تنسيق اللحية' },
    category: 'barbe',
    durationMin: 15,
    priceDa: 500,
    summary: {
      fr: 'Structuration de la ligne de mâchoire, dégradé des pattes et contours nets au rasoir de précision.',
      ar: 'تحديد دقيق لخطوط الفك والوجنتين مع تدريج متناسق للجوانب وتنظيف بالموس.',
    },
    details: {
      fr: 'Sculpture harmonieuse de la barbe aux ciseaux et tondeuse, suivie d’un traçage précis et huile nourrissante.',
      ar: 'تنسيق متناغم لطول اللحية وكثافتها مع تحديد حواف دقيقة ووضع زيت مرطب.',
    },
    includes: {
      fr: ['Dégradé des joues', 'Traçage précis au rasoir', 'Huile nourrissante'],
      ar: ['تدريج ناعم للجانبين', 'تحديد دقيق بالموس', 'زيت مغذي للحية'],
    },
    image: '/assets/service-beard.webp',
    showInHeroTrio: true,
  },
  {
    id: 'rasage-barbe',
    title: { fr: 'Rasage de barbe', ar: 'حلاقة اللحية بالموس' },
    shortTitle: { fr: 'Rasage barbe', ar: 'حلاقة بالموس' },
    category: 'barbe',
    durationMin: 15,
    priceDa: 600,
    summary: {
      fr: 'Rasage traditionnel de près au coupe-choux avec mousse riche, serviette chaude et lotion apaisante.',
      ar: 'حلاقة تقليدية ناعمة بالموس مع رغوة غنية ومنشفة دافئة ولوشن مهدئ للبشرة.',
    },
    details: {
      fr: 'Préparation de la peau à la vapeur chaude, rasage doux sans irritation et soin après-rasage rafraîchissant.',
      ar: 'تهيئة البشرة بالدفء لحلاقة ناعمة خالية من التهيج مع بلسم منعش بعد الحلاقة.',
    },
    includes: {
      fr: ['Préparation serviette chaude', 'Rasage précis au rasoir', 'Baume après-rasage'],
      ar: ['تحضير بالمنشفة الساخنة', 'حلاقة ناعمة بالموس', 'بلسم مهدئ بعد الحلاقة'],
    },
    image: '/assets/atelier-shave.webp',
  },
  {
    id: 'tracage',
    title: { fr: 'Traçage (fils, cire...)', ar: 'تحديد بالخيط والشمع' },
    shortTitle: { fr: 'Traçage', ar: 'تحديد خيط/شمع' },
    category: 'tracage',
    durationMin: 15,
    priceDa: null,
    summary: {
      fr: 'Finition nette des pommettes, sourcils et contours au fil ou à la cire pour un résultat ultra-propre.',
      ar: 'تنظيف وتحديد فائق الدقة للوجنتين والحاجبين بالخيط أو الشمع لإطلالة نظيفة تدوم.',
    },
    details: {
      fr: 'Technique précise au fil et cire douce suivie d’une lotion calmante anti-rougeurs.',
      ar: 'تحديد احترافي بالخيط والشمع اللطيف يتبعه جل مهدئ لحماية البشرة ومنع الاحمرار.',
    },
    includes: {
      fr: ['Épilation précise fil / cire', 'Contours propres', 'Gel apaisant'],
      ar: ['تنظيف دقيق بالخيط أو الشمع', 'حواف مرتبة ونظيفة', 'جل مهدئ فوري'],
    },
    image: '/assets/service-beard.webp',
  },
  {
    id: 'rituel-soin-barbe',
    title: { fr: 'Rituel soin barbe', ar: 'طقس العناية الفاخرة باللحية' },
    shortTitle: { fr: 'Rituel barbe', ar: 'طقس عناية اللحية' },
    category: 'barbe',
    durationMin: 30,
    priceDa: 1200,
    summary: {
      fr: 'Taille architecturale, triple serviette chaude aromatique, massage relaxant, huile chaude et baume coiffant.',
      ar: 'تنسيق متكامل للحية مع مناشف بخار عطرية وتدليك مريح وزيت دافئ وبلسم فاخر.',
    },
    details: {
      fr: 'Notre soin barbe signature combinant vapeur purifiante, sculpture précise, hydratation profonde et finition impeccable.',
      ar: 'جلستنا المميزة للعناية باللحية تجمع بين البخار العطري، التشكيل الدقيق، والترطيب العميق.',
    },
    includes: {
      fr: ['Sculpture & contours rasoir', 'Serviettes chaudes vapeur', 'Soin huile & massage', 'Serviette fraîche finale'],
      ar: ['تنسيق وتحديد بالموس', 'مناشف بخار ساخنة', 'عناية بالزيت وتدليك', 'منشفة باردة ختامية'],
    },
    image: '/assets/service-styling.webp',
    featured: true,
    showInHeroTrio: true,
  },

  // ── SOINS DU VISAGE ──
  {
    id: 'rituel-purifiant',
    title: { fr: 'Rituel purifiant', ar: 'تنظيف وتنقية البشرة' },
    shortTitle: { fr: 'Rituel purifiant', ar: 'تنظيف البشرة' },
    category: 'soins-visage',
    durationMin: 30,
    priceDa: 1500,
    summary: {
      fr: 'Nettoyage profond à la vapeur, désincrustation douce, masque purifiant et hydratation rééquilibrante.',
      ar: 'تنظيف عميق للبشرة بالبخار وإزالة الشوائب مع ماسك منقّي وترطيب متوازن.',
    },
    details: {
      fr: 'Idéal pour libérer les pores, réduire les brillances et redonner fraîcheur et éclat au teint.',
      ar: 'جلسة مثالية لفتح المسام وإزالة الإرهاق واستعادة نضارة وإشراقة الوجه.',
    },
    includes: {
      fr: ['Bain de vapeur', 'Nettoyage profond', 'Masque purifiant', 'Crème hydratante'],
      ar: ['حمام بخار للوجه', 'تنظيف عميق للمسام', 'ماسك منقي', 'كريم مرطب منعش'],
    },
    image: '/assets/atelier-shave.webp',
  },
  {
    id: 'masque-gold-noir',
    title: { fr: 'Masque gold / noir', ar: 'ماسك ذهبي / أسود' },
    shortTitle: { fr: 'Masque gold/noir', ar: 'ماسك ذهبي/أسود' },
    category: 'soins-visage',
    durationMin: 30,
    priceDa: 1000,
    summary: {
      fr: 'Masque charbon noir désincrustant ou masque gold revitalisant pour une peau nette et lumineuse.',
      ar: 'ماسك الفحم الأسود لإزالة الرؤوس السوداء أو الماسك الذهبي لنضارة فورية وبشرة صافية.',
    },
    details: {
      fr: 'Préparation par serviette chaude, application du masque au choix (Gold éclat ou Noir purifiant) et finition tonique.',
      ar: 'تحضير بالمنشفة الدافئة وتطبيق الماسك الذهبي أو الأسود حسب نوع البشرة مع لمسة مرطبة.',
    },
    includes: {
      fr: ['Préparation chaude', 'Masque Gold ou Noir au choix', 'Sérum apaisant'],
      ar: ['تحضير بالمنشفة الدافئة', 'اختيار ماسك ذهبي أو أسود', 'سيروم مرطب مهدئ'],
    },
    image: '/assets/atelier-tools.webp',
  },
  {
    id: 'gommage',
    title: { fr: 'Gommage', ar: 'تقشير وتجديد البشرة' },
    shortTitle: { fr: 'Gommage', ar: 'تقشير البشرة' },
    category: 'soins-visage',
    durationMin: 30,
    priceDa: 900,
    summary: {
      fr: 'Exfoliation douce du visage pour éliminer les cellules mortes, lisser le grain de peau et faciliter le rasage.',
      ar: 'تقشير لطيف للوجه لإزالة الخلايا الميتة وتنعيم ملمس البشرة ومنحها مظهراً صحياً.',
    },
    details: {
      fr: 'Massage exfoliant aux micro-grains naturels, rinçage à la serviette chaude et soin hydratant matifiant.',
      ar: 'تدليك مقشر لطيف يتبعه تنظيف بالمنشفة الساخنة وكريم ترطيب خفيف.',
    },
    includes: {
      fr: ['Exfoliation douce', 'Massage facial relaxant', 'Hydratation finale'],
      ar: ['تقشير لطيف وفعال', 'تدليك مريح للوجه', 'ترطيب نهائي'],
    },
    image: '/assets/atelier-tools.webp',
  },

  // ── SOINS CAPILLAIRES ──
  {
    id: 'soin-tanin',
    title: { fr: 'Soin capillaire au tanin', ar: 'علاج الشعر بالتانين' },
    shortTitle: { fr: 'Soin au tanin', ar: 'علاج بالتانين' },
    category: 'soins-capillaires',
    durationMin: 30,
    priceDa: 2500,
    summary: {
      fr: 'Soin lissant et disciplinant aux tanins végétaux pour dompter les frisottis tout en gardant un aspect naturel.',
      ar: 'علاج نباتي بالتانين لتنعيم الشعر وترويضه بلمعان طبيعي وملمس حريري دون إثقال.',
    },
    details: {
      fr: 'Protocole enrichi en tanins organiques pour assouplir la fibre capillaire, faciliter le coiffage et renforcer la brillance.',
      ar: 'بروتوكول غني بالتانين الطبيعي لتقوية ألياف الشعر وتسهيل التصفيف اليومي.',
    },
    includes: {
      fr: ['Shampoing préparateur', 'Application soin au tanin', 'Séchage & finition'],
      ar: ['شامبو تحضيري عميق', 'تطبيق علاج التانين', 'تجفيف وتصفيف'],
    },
    image: '/assets/atelier-tools.webp',
  },
  {
    id: 'soin-keratine',
    title: { fr: 'Soin capillaire à la kératine', ar: 'علاج الشعر بالكيراتين' },
    shortTitle: { fr: 'Soin kératine', ar: 'علاج الكيراتين' },
    category: 'soins-capillaires',
    durationMin: 30,
    priceDa: 3000,
    summary: {
      fr: 'Réparation intense à la kératine pour nourrir, lisser et restaurer les cheveux secs ou fragilisés.',
      ar: 'علاج مكثف بالكيراتين لإصلاح وتغذية وتنعيم الشعر الجاف أو المجهد بنتائج فورية.',
    },
    details: {
      fr: 'Traitement haute performance qui gaine la fibre capillaire, apporte souplesse durable et protection quotidienne.',
      ar: 'عناية متقدمة تغلف الشعرة وتعيد لها المرونة والقوة والانسيابية الطويلة.',
    },
    includes: {
      fr: ['Lavage purifiant', 'Infusion kératine', 'Activation thermique & coiffage'],
      ar: ['غسل منقي للشعر', 'تطبيق الكيراتين المغذي', 'تثبيت حراري وتصفيف'],
    },
    image: '/assets/atelier-tools.webp',
  },
  {
    id: 'soin-marin',
    title: { fr: 'Soin capillaire marin', ar: 'علاج الشعر البحري' },
    shortTitle: { fr: 'Soin marin', ar: 'علاج بحري' },
    category: 'soins-capillaires',
    durationMin: 30,
    priceDa: 1800,
    summary: {
      fr: 'Reminéralisation du cuir chevelu aux extraits marins pour fortifier les racines et raviver la vitalité.',
      ar: 'علاج غني بالمعادن البحرية لتقوية فروة الرأس وتنشيط الجذور ومنح الشعر حيوية متجددة.',
    },
    details: {
      fr: 'Soin enrichi en oligo-éléments marins accompagné d’un massage crânien stimulant.',
      ar: 'تركيبة غنية بالعناصر البحرية الطبيعية مع تدليك منشط لفروة الرأس.',
    },
    includes: {
      fr: ['Bain minéral marin', 'Massage cuir chevelu', 'Rinçage tonifiant'],
      ar: ['حمام معدني بحري', 'تدليك منشط للفروة', 'شطف منعش وتصفيف'],
    },
    image: '/assets/atelier-cut.webp',
  },
  {
    id: 'soin-oxygenant',
    title: { fr: 'Soin capillaire oxygénant', ar: 'علاج الشعر بالأكسجين' },
    shortTitle: { fr: 'Soin oxygénant', ar: 'علاج بالأكسجين' },
    category: 'soins-capillaires',
    durationMin: 30,
    priceDa: 1800,
    summary: {
      fr: 'Détoxification fraîche du cuir chevelu pour stimuler la microcirculation et apporter légèreté immédiate.',
      ar: 'تنظيف وإنعاش عميق لفروة الرأس بالأكسجين لتنشيط الدورة الدموية ومنح الشعر خفة وحيوية.',
    },
    details: {
      fr: 'Élimine les résidus de coiffage et la fatigue urbaine tout en revitalisant la racine des cheveux.',
      ar: 'يزيل بقايا المستحضرات وإجهاد اليوم ويعيد الحيوية والانتعاش لجذور الشعر.',
    },
    includes: {
      fr: ['Détox cuir chevelu', 'Sérum oxygénant frais', 'Massage relaxant'],
      ar: ['تنظيف عميق للفروة', 'سيروم أكسجين منعش', 'تدليك مريح للرأس'],
    },
    image: '/assets/atelier-cut.webp',
  },
];

export const HERO_TRIO_SERVICES = ALL_SERVICES.filter((s) => s.showInHeroTrio);

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    id: 'forged-steel',
    eyebrow: { fr: 'LE SAVOIR-FAIRE · 01', ar: 'الحرفية · 01' },
    title: { fr: 'LE SAVOIR-FAIRE', ar: 'فن الحلاقة' },
    description: {
      fr: 'La maîtrise du barbier se mesure au millimètre. Chaque coupe est exécutée avec des ciseaux en acier forgé japonais, un geste précis et un respect absolu de votre style.',
      ar: 'تُقاس مهارة الحلاق بالمليمتر. تُنفّذ كل قصة بمقصات من الفولاذ الياباني المصقول بدقة عالية وتقنية متقنة تناسب أسلوبك الخاص.',
    },
    bladeOpenDeg: 46,
    shearsTiltDeg: -14,
    statLabel: { fr: 'Dureté Acier Forgé', ar: 'صلابة الفولاذ الياباني' },
    statValue: { fr: '62 HRC', ar: '62 HRC' },
  },
  {
    id: 'convex-edge',
    eyebrow: { fr: 'LE SAVOIR-FAIRE · 02', ar: 'الحرفية · 02' },
    title: { fr: 'GÉOMÉTRIE PARFAITE', ar: 'دقّة القصّ' },
    description: {
      fr: 'Des lames convexes affûtées à la main glissent sans casser la fibre capillaire, garantissant une coupe nette et une repousse harmonieuse.',
      ar: 'شفرات مصقولة يدوياً تنساب بسلاسة دون إجهاد الشعرة، لتمنحك قصة متوازنة ومظهراً أنيقاً يدوم أسابيع.',
    },
    bladeOpenDeg: 22,
    shearsTiltDeg: 8,
    statLabel: { fr: 'Angle de Coupe', ar: 'زاوية الشحذ' },
    statValue: { fr: '38° Convexe', ar: '38° محدّب' },
  },
  {
    id: 'ergonomic-balance',
    eyebrow: { fr: 'LE SAVOIR-FAIRE · 03', ar: 'الحرفية · 03' },
    title: { fr: 'TEMPS MAÎTRISÉ', ar: 'عناية بلا استعجال' },
    description: {
      fr: 'Chez Aziz Barber Shop, chaque rendez-vous bénéficie d’un créneau dédié avec Aziz, Youcef ou Mohamed pour soigner chaque contour.',
      ar: 'في عزيز باربر شوب، لكل موعد وقته الكامل مع عزيز أو يوسف أو محمد للاهتمام بأدق التفاصيل.',
    },
    bladeOpenDeg: 58,
    shearsTiltDeg: -26,
    statLabel: { fr: 'Maîtres Barbiers', ar: 'فريق الحلاقين' },
    statValue: { fr: 'Aziz · Youcef · Mohamed', ar: 'عزيز · يوسف · محمد' },
  },
  {
    id: 'bespoke-finish',
    eyebrow: { fr: 'LE SAVOIR-FAIRE · 04', ar: 'الحرفية · 04' },
    title: { fr: 'FINITION RITUELLE', ar: 'لمسة ختامية فاخرة' },
    description: {
      fr: 'Serviettes chaudes aromatiques, huiles naturelles et soins capillaires professionnels prolongent le confort bien après votre visite.',
      ar: 'مناشف ساخنة عطرية، زيوت طبيعية وعلاجات احترافية للشعر والبشرة تمنحك انتعاشاً يدوم طويلاً.',
    },
    bladeOpenDeg: 14,
    shearsTiltDeg: 16,
    statLabel: { fr: 'Soins & Rituels', ar: 'الخدمات والعلاجات' },
    statValue: { fr: '15 Prestations', ar: '15 خدمة متخصصة' },
  },
];

/**
 * MASTER BARBERS — Aziz, Youcef, Mohamed
 */
export const MASTER_BARBERS: BarberProfile[] = [
  {
    id: 'aziz',
    name: 'Aziz',
    nameAr: 'عزيز',
    role: { fr: 'Barbier', ar: 'حلّاق' },
    experience: { fr: 'Coupe & barbe', ar: 'الحلاقة واللحية' },
    specialty: {
      fr: 'Un moment de soin adapté à votre style.',
      ar: 'لحظة عناية تناسب أسلوبك.',
    },
    availability: { fr: 'Sur rendez-vous', ar: 'حسب الموعد' },
    image: '/assets/barber-portrait-1.jpg',
  },
  {
    id: 'youcef',
    name: 'Youcef',
    nameAr: 'يوسف',
    role: { fr: 'Barbier', ar: 'حلّاق' },
    experience: { fr: 'Coupe & barbe', ar: 'الحلاقة واللحية' },
    specialty: {
      fr: 'Un moment de soin adapté à votre style.',
      ar: 'لحظة عناية تناسب أسلوبك.',
    },
    availability: { fr: 'Sur rendez-vous', ar: 'حسب الموعد' },
    image: '/assets/barber-portrait-2.jpg',
  },
  {
    id: 'mohamed',
    name: 'Mohamed',
    nameAr: 'محمد',
    role: { fr: 'Barbier', ar: 'حلّاق' },
    experience: { fr: 'Coupe & barbe', ar: 'الحلاقة واللحية' },
    specialty: {
      fr: 'Un moment de soin adapté à votre style.',
      ar: 'لحظة عناية تناسب أسلوبك.',
    },
    availability: { fr: 'Sur rendez-vous', ar: 'حسب الموعد' },
    image: '/assets/barber-portrait-3.jpg',
  },
];

export const TIME_SLOTS = [
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:30',
  '18:00',
  '19:30',
];
