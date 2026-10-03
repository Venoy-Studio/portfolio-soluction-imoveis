import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLeadModal } from '../context/LeadModalContext';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { favoritesCount } = useFavorites();
  const { openCapture } = useLeadModal();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Imóveis', href: '/imoveis' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Depoimentos', href: '/depoimentos' },
    { label: 'Contato', href: '/contato' },
  ];

  const headerBg = isScrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(11,63,115,0.15)] border-b border-border/60'
    : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent';

  const textColor = isScrolled || !isHome ? 'text-primary' : 'text-white';
  const textMutedColor = isScrolled || !isHome ? 'text-foreground/80 hover:text-accent' : 'text-white/90 hover:text-accent';

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/assets/logo-B8uGDkzO.webp"
            alt="Soluction Imóveis"
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 ${
                  isActive
                    ? 'text-accent font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent'
                    : textMutedColor
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() =>
              openCapture({
                buttonType: 'Header: Anuncie',
                source: 'header',
                message: 'Olá! Gostaria de anunciar meu imóvel com a Soluction.',
              })
            }
            className={`text-sm font-medium tracking-wide transition-all duration-200 ${textMutedColor}`}
          >
            Anuncie
          </button>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Favorites Button */}
          <Link
            to="/favoritos"
            className={`relative p-2.5 rounded-full transition-colors ${
              isScrolled || !isHome
                ? 'hover:bg-muted text-primary'
                : 'hover:bg-white/20 text-white'
            }`}
            title="Meus Favoritos"
            aria-label="Ver Imóveis Favoritos"
          >
            <Heart size={20} className={favoritesCount > 0 ? 'fill-accent text-accent' : ''} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-md animate-pulse-subtle">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Fictitious WhatsApp CTA */}
          <a
            href={getWhatsAppLink('Olá! Gostaria de falar com um corretor da Soluction.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-whatsapp text-white text-xs md:text-sm font-semibold hover:bg-whatsapp-hover transition-all duration-300 shadow-md hover:-translate-y-0.5"
          >
            <MessageSquare size={16} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/favoritos"
            className={`relative p-2 rounded-full ${
              isScrolled || !isHome ? 'text-primary' : 'text-white'
            }`}
            aria-label="Ver Favoritos"
          >
            <Heart size={22} className={favoritesCount > 0 ? 'fill-accent text-accent' : ''} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isScrolled || !isHome ? 'text-primary' : 'text-white'
            }`}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-2xl animate-fade-in-up">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openCapture({
                  buttonType: 'Header Mobile: Anuncie',
                  source: 'mobile-header',
                  message: 'Olá! Gostaria de anunciar meu imóvel com a Soluction.',
                });
              }}
              className="text-left text-base font-medium py-2 px-3 rounded-lg text-foreground hover:bg-muted"
            >
              Anuncie seu Imóvel
            </button>

            <div className="pt-4 border-t border-border/80 flex flex-col gap-3">
              <a
                href={getWhatsAppLink('Olá! Gostaria de falar com um corretor da Soluction.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-whatsapp text-white font-semibold text-center flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare size={18} />
                <span>Conversar no WhatsApp ({FAKE_CONTACTS.phone})</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCapture({
                    buttonType: 'Header Mobile: Falar Corretor',
                    source: 'mobile-header',
                    message: 'Olá! Gostaria de falar com um corretor especialista.',
                  });
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-center flex items-center justify-center gap-2 shadow"
              >
                <Phone size={18} />
                <span>Solicitar Ligação de Corretor</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
