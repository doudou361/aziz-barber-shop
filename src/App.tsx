import React, { useEffect, useState } from 'react';
import { Language, RoutePath, SITE_CONFIG, t } from './data/site';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SignatureSection } from './components/SignatureSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { CraftSection } from './components/CraftSection';
import { GroomingExperienceSection } from './components/GroomingExperienceSection';
import { HaloCtaSection } from './components/HaloCtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { InfoModal } from './components/InfoModal';
import { AboutPage, ExperiencePage, ServicesPage } from './components/SubPages';
import { ShowcasePage } from './components/ShowcasePage';

const VALID_ROUTES: RoutePath[] = ['/', '/services', '/experience', '/about', '/showcase'];

function readRoute(): RoutePath {
  const path = window.location.pathname as RoutePath;
  return VALID_ROUTES.includes(path) ? path : '/';
}

export function App() {
  // Default language is French ('fr'); top-right button switches to Arabic ('ar', RTL)
  const [lang, setLang] = useState<Language>('fr');
  const [route, setRoute] = useState<RoutePath>(() => readRoute());
  const [bookingState, setBookingState] = useState<{
    open: boolean;
    serviceId?: string;
    barberId?: string;
  }>({ open: false });
  const [infoModal, setInfoModal] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = `${t(SITE_CONFIG.brand.name, lang)} — ${t(SITE_CONFIG.brand.subname, lang)}`;
  }, [lang]);

  useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const navigate = (path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    if (route !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBooking = (serviceId?: string, barberId?: string) => {
    setBookingState({ open: true, serviceId, barberId });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDE0C4]">
      <Navbar
        lang={lang}
        onToggleLanguage={toggleLanguage}
        currentPath={route}
        onNavigate={navigate}
        onBookClick={(serviceId) => openBooking(serviceId)}
      />

      <main>
        {route === '/' && (
          <>
            <HeroSection
              lang={lang}
              onBookClick={() => openBooking()}
              onExploreServices={() => scrollToSection('pricing-table')}
              onScrollToSection={scrollToSection}
            />
            <SignatureSection
              lang={lang}
              onBookClick={() => openBooking()}
              onExploreServices={() => scrollToSection('pricing-table')}
            />
            <ServicesSection
              lang={lang}
              onBookService={(serviceId) => openBooking(serviceId)}
              onViewAllServices={() => scrollToSection('pricing-table')}
            />
            <PricingSection
              lang={lang}
              onReserveService={(serviceId) => openBooking(serviceId)}
            />
            <CraftSection
              lang={lang}
              onBookClick={() => openBooking('coupe-ciseaux')}
            />
            <GroomingExperienceSection
              lang={lang}
              onBookClick={() => openBooking('rituel-soin-barbe')}
              onExploreServices={() => navigate('/services')}
              onScrollNext={() => scrollToSection('halo-cta')}
            />
            <HaloCtaSection lang={lang} onBookClick={() => openBooking()} />
          </>
        )}

        {route === '/services' && (
          <ServicesPage
            lang={lang}
            onNavigate={navigate}
            onBookClick={(serviceId, barberId) => openBooking(serviceId, barberId)}
          />
        )}

        {route === '/experience' && (
          <ExperiencePage
            lang={lang}
            onNavigate={navigate}
            onBookClick={(serviceId, barberId) => openBooking(serviceId, barberId)}
          />
        )}

        {route === '/about' && (
          <AboutPage
            lang={lang}
            onNavigate={navigate}
            onBookClick={(serviceId, barberId) => openBooking(serviceId, barberId)}
          />
        )}

        {route === '/showcase' && (
          <ShowcasePage lang={lang} onNavigate={navigate} />
        )}
      </main>

      <Footer
        lang={lang}
        onNavigate={navigate}
        onBookClick={(serviceId) => openBooking(serviceId)}
        onOpenInfoModal={(title, body) => setInfoModal({ title, body })}
      />

      <BookingModal
        open={bookingState.open}
        lang={lang}
        initialServiceId={bookingState.serviceId}
        initialBarberId={bookingState.barberId}
        onClose={() => setBookingState((s) => ({ ...s, open: false }))}
      />

      <InfoModal lang={lang} modal={infoModal} onClose={() => setInfoModal(null)} />
    </div>
  );
}

export default App;
