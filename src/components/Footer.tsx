import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';
import { useLeadModal } from '../context/LeadModalContext';

export const Footer: React.FC = () => {
  const { openCapture } = useLeadModal();

  return (
    <footer className="bg-footer-bg text-footer-text py-16 border-t border-footer-divider">
      <div className="container">
        {/* Main 4 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/assets/footer-logo-C6dNQpip.png"
                alt="Soluction Imóveis"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-footer-text leading-relaxed">
              Seu lar é o objetivo. A Soluction é o caminho para encontrar, escolher e conquistar o imóvel certo no ABC Paulista com total segurança e excelência.
            </p>
            <div className="flex flex-col gap-1 text-xs text-footer-link pt-2 border-t border-footer-divider/60">
              <span className="font-semibold text-white/90">Credenciais Oficiais:</span>
              <span>CNPJ: {FAKE_CONTACTS.cnpj}</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-accent" />
                <span>{FAKE_CONTACTS.creci}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-footer-title text-sm tracking-wider uppercase">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/imoveis" className="hover:text-accent transition-colors">
                  Buscar Imóveis
                </Link>
              </li>
              <li>
                <Link to="/imoveis?type=venda" className="hover:text-accent transition-colors">
                  Imóveis à Venda
                </Link>
              </li>
              <li>
                <Link to="/imoveis?category=apartamento" className="hover:text-accent transition-colors">
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link to="/imoveis?category=casa" className="hover:text-accent transition-colors">
                  Casas e Sobrados
                </Link>
              </li>
              <li>
                <Link to="/favoritos" className="hover:text-accent transition-colors flex items-center gap-1.5">
                  <Heart size={14} className="text-accent" />
                  <span>Meus Favoritos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-footer-title text-sm tracking-wider uppercase">
              Institucional
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/sobre" className="hover:text-accent transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/depoimentos" className="hover:text-accent transition-colors">
                  Depoimentos de Clientes
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openCapture({
                      buttonType: 'Footer: Anuncie',
                      source: 'footer',
                      message: 'Olá! Desejo anunciar meu imóvel com vocês.',
                    })
                  }
                  className="hover:text-accent transition-colors text-left"
                >
                  Anuncie seu Imóvel
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    openCapture({
                      buttonType: 'Footer: Parceria Corretor',
                      source: 'footer',
                      message: 'Olá! Sou corretor autônomo e quero ser parceiro da Soluction.',
                    })
                  }
                  className="hover:text-accent transition-colors text-left"
                >
                  Seja um Corretor Parceiro
                </button>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="hover:text-accent transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos-de-uso" className="hover:text-accent transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Atendimento (Fictitious!) */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-footer-title text-sm tracking-wider uppercase">
              Fale Conosco
            </h3>
            <div className="space-y-3 text-sm">
              {/* WhatsApp Fictício */}
              <a
                href={getWhatsAppLink('Olá! Gostaria de falar com um corretor da Soluction.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-footer-link hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-whatsapp/20 flex items-center justify-center text-whatsapp group-hover:bg-whatsapp group-hover:text-white transition-colors">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <span className="text-xs text-footer-text block">WhatsApp (Fictício)</span>
                  <span className="font-medium text-white">{FAKE_CONTACTS.whatsapp}</span>
                </div>
              </a>

              {/* Telefone Fictício */}
              <div className="flex items-center gap-3 text-footer-link">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-xs text-footer-text block">Telefone</span>
                  <span className="font-medium text-white">{FAKE_CONTACTS.phone}</span>
                </div>
              </div>

              {/* Email Fictício */}
              <a
                href={`mailto:${FAKE_CONTACTS.email}`}
                className="flex items-center gap-3 text-footer-link hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-xs text-footer-text block">E-mail Comercial</span>
                  <span className="font-medium text-white break-all">{FAKE_CONTACTS.email}</span>
                </div>
              </a>

              {/* Endereço Fictício */}
              <div className="flex items-start gap-3 text-footer-link pt-1">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-xs text-footer-text block">Endereço</span>
                  <span className="text-white text-xs leading-relaxed">
                    {FAKE_CONTACTS.address}, {FAKE_CONTACTS.city}
                  </span>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-3 text-footer-link">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="text-xs text-footer-text block">Horário de Atendimento</span>
                  <span className="text-xs text-footer-text leading-tight block">
                    {FAKE_CONTACTS.hours}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-footer-divider flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-footer-text">
          <p>© 2026 Soluction Imóveis. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <span className="text-accent/80 font-medium">Contatos Fictícios para Demonstração</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
