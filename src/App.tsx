import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { FavoritesProvider } from './context/FavoritesContext';
import { LeadModalProvider } from './context/LeadModalContext';

// Pages
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Favorites } from './pages/Favorites';
import { TermsOfUse } from './pages/TermsOfUse';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { NotFound } from './pages/NotFound';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <LeadModalProvider>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/imoveis" element={<Properties />} />
              <Route path="/imovel/:id" element={<PropertyDetail />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/depoimentos" element={<Testimonials />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
          <LeadCaptureModal />
        </div>
      </LeadModalProvider>
    </FavoritesProvider>
  );
};

export default App;
