import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  Home as HomeIcon,
  Store,
  Layers,
  ShieldCheck,
  UserCheck,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Star,
  Quote,
  Sparkles,
  MapPin
} from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { getFeaturedProperties } from '../data/properties';
import { REGIONS } from '../data/regions';
import { TESTIMONIALS } from '../data/testimonials';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';
import { useLeadModal } from '../context/LeadModalContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openCapture } = useLeadModal();
  const featured = getFeaturedProperties();

  // Search Bar State
  const [searchType, setSearchType] = useState<'venda' | 'aluguel'>('venda');
  const [searchCategory, setSearchCategory] = useState<string>('todos');
  const [searchCity, setSearchCity] = useState<string>('todas');
  const [searchPriceRange, setSearchPriceRange] = useState<string>('todos');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchType) params.append('type', searchType);
    if (searchCategory !== 'todos') params.append('category', searchCategory);
    if (searchCity !== 'todas') params.append('city', searchCity);
    if (searchPriceRange !== 'todos') params.append('price', searchPriceRange);
    navigate(`/imoveis?${params.toString()}`);
  };

  const categories = [
    { id: 'apartamento', label: 'Apartamentos', icon: Building2, desc: 'Praticidade e lazer completo' },
    { id: 'casa', label: 'Casas & Sobrados', icon: HomeIcon, desc: 'Espaço, privacidade e conforto' },
    { id: 'comercial', label: 'Comerciais', icon: Store, desc: 'Salas e galpões para seu negócio' },
    { id: 'outro', label: 'Oportunidades', icon: Layers, desc: 'Lotes e investimentos no ABC' },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/assets/hero-bg-D9xejRv_.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/85 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-40 z-10" />

        {/* Hero Content */}
        <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            <Sparkles size={14} />
            <span>Sua Imobiliária no ABC Paulista</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Encontre hoje seu novo lar na <span className="text-accent underline decoration-accent/40 decoration-wavy">Soluction!</span>
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            Consulte casas, apartamentos e imóveis comerciais com curadoria especializada, atendimento humanizado e segurança em todo o processo.
          </p>

          {/* SEARCH BOX TABS & FORM */}
          <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/40 text-left">
            {/* Type selector tabs */}
            <div className="flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
              <button
                type="button"
                onClick={() => setSearchType('venda')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  searchType === 'venda'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Comprar
              </button>
              <button
                type="button"
                onClick={() => setSearchType('aluguel')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  searchType === 'aluguel'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                Alugar
              </button>
            </div>

            {/* Form controls */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-foreground uppercase tracking-wider mb-1">
                  Tipo de Imóvel
                </label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                >
                  <option value="todos">Todos os tipos</option>
                  <option value="apartamento">Apartamentos</option>
                  <option value="casa">Casas</option>
                  <option value="comercial">Comerciais</option>
                  <option value="outro">Outros</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-foreground uppercase tracking-wider mb-1">
                  Cidade
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                >
                  <option value="todas">Todas as cidades</option>
                  <option value="Santo André">Santo André</option>
                  <option value="São Bernardo do Campo">São Bernardo do Campo</option>
                  <option value="Praia Grande">Praia Grande</option>
                  <option value="Mauá">Mauá</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-foreground uppercase tracking-wider mb-1">
                  Faixa de Valor
                </label>
                <select
                  value={searchPriceRange}
                  onChange={(e) => setSearchPriceRange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-white text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
                >
                  <option value="todos">Qualquer valor</option>
                  <option value="0-300000">Até R$ 300 mil</option>
                  <option value="300000-500000">R$ 300 mil a R$ 500 mil</option>
                  <option value="500000-1000000">R$ 500 mil a R$ 1 Milhão</option>
                  <option value="1000000+">Acima de R$ 1 Milhão</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Search size={16} />
                  <span>Buscar</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick trust highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-accent" />
              <span>Atendimento Direto & Personalizado</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent" />
              <span>Assessoria Jurídica Especializada</span>
            </div>
            <div className="flex items-center gap-2">
              <UserCheck size={16} className="text-accent" />
              <span>Curadoria no ABC Paulista</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION ("O que você procura?") */}
      <section className="py-20 bg-background border-b border-border/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">
              Encontre rapidamente
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              O que você procura?
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              Explore nossos tipos de imóveis e descubra o espaço ideal para você ou seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/imoveis?category=${cat.id}`}
                  className="group p-6 rounded-2xl bg-card border border-border/80 shadow-card card-lift flex flex-col items-center text-center transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cat.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES ("Imóveis em Destaque") */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-14 text-center md:text-left">
            <div>
              <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">
                Selecionados para você
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Imóveis em Destaque
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                Confira nossas melhores oportunidades selecionadas para você no ABC e litoral.
              </p>
            </div>

            <Link
              to="/imoveis"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-accent transition-colors"
            >
              <span>Ver todos os imóveis</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/imoveis"
              className="btn-premium inline-flex items-center gap-2 shadow-lg"
            >
              <Search size={18} />
              <span>Explorar Catálogo Completo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. REGIONS SECTION ("Onde você quer morar?") */}
      <section className="py-24 bg-muted/60 border-y border-border/60">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">
              Regiões mais procuradas
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              Onde você quer morar?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Especialistas no ABC Paulista, com profundo conhecimento de cada bairro e região.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGIONS.map((region) => (
              <Link
                key={region.slug}
                to={`/imoveis?city=${encodeURIComponent(region.name)}`}
                className="group relative block rounded-2xl overflow-hidden shadow-card border border-border/50 aspect-[3/4] card-lift"
              >
                <img
                  src={region.img}
                  alt={`Imóveis em ${region.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 text-accent text-xs mb-1">
                    <MapPin size={14} />
                    <span>Região em alta</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-xs text-white/80">
                    Clique para ver imóveis
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRUST / DIFFERENTIALS SECTION ("Do primeiro contato à assinatura") */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">
              Atendimento Especializado
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
              Do primeiro contato à assinatura
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Na <strong>Soluction</strong> te acompanhamos em cada etapa da jornada imobiliária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Consultor Especialista */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-card card-lift border border-border/60 flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                <img
                  src="/assets/trust-consultant-new-BfPs1pHS.webp"
                  alt="Consultor Especialista Soluction Imóveis"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <UserCheck size={22} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-accent font-bold block">
                        Atendimento Personalizado
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        Consultor Especialista
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    Ouvimos a sua história, seus sonhos e expectativas antes de apresentar qualquer imóvel. Criamos uma curadoria sob medida com total transparência.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() =>
                      openCapture({
                        buttonType: 'Trust: Consultor Especialista',
                        source: 'trust-section',
                        message: 'Olá! Gostaria de conversar com um consultor especialista da Soluction.',
                      })
                    }
                    className="text-primary hover:text-accent font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Falar com especialista</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2: Assessoria Jurídica */}
            <div className="group bg-card rounded-2xl overflow-hidden shadow-card card-lift border border-border/60 flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                <img
                  src="/assets/trust-legal-DHbDJhbW.webp"
                  alt="Assessoria Jurídica Soluction Imóveis"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-accent font-bold block">
                        Segurança Garantida
                      </span>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        Assessoria Jurídica Completa
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                    Análise completa de certidões, contratos e documentação imobiliária. Zero riscos jurídicos na compra, venda ou locação do seu patrimônio.
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() =>
                      openCapture({
                        buttonType: 'Trust: Assessoria Jurídica',
                        source: 'trust-section',
                        message: 'Olá! Gostaria de entender mais sobre a assessoria jurídica e documental.',
                      })
                    }
                    className="text-primary hover:text-accent font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Saiba mais sobre segurança</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BROKER / CAPTADOR PARTNER CTA */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none blur-3xl" />
        <div className="container relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="text-accent text-xs uppercase tracking-[0.3em] font-bold block mb-3">
            Oportunidade para Profissionais
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
            É captador ou corretor autônomo?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Faça parte da nossa rede de parceiros no ABC Paulista. Conte com nossa estrutura de vendas, suporte jurídico e comissões atrativas.
          </p>

          <a
            href={getWhatsAppLink('Olá! Sou corretor autônomo/captador e gostaria de me tornar parceiro da Soluction Imóveis.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-sm tracking-wide shadow-xl transition-transform hover:-translate-y-1"
          >
            <MessageSquare size={18} />
            <span>Quero ser parceiro da Soluction ({FAKE_CONTACTS.whatsapp})</span>
          </a>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION ("Depoimentos") */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">
              O que dizem nossos clientes
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Depoimentos
            </h2>
            <p className="text-muted-foreground text-sm mt-3">
              A satisfação de quem conquistou o imóvel perfeito com a Soluction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="bg-card rounded-2xl p-8 shadow-card card-lift border border-border/70 relative flex flex-col justify-between"
              >
                <div>
                  <Quote size={36} className="text-accent/20 absolute top-6 right-6" />
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Star key={s} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 italic leading-relaxed">
                    "{item.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-accent-foreground font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">
                      {item.name}
                    </p>
                    {item.role && (
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/depoimentos"
              className="text-primary hover:text-accent font-semibold text-sm inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Ver mais depoimentos</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER ("Realize o sonho do imóvel perfeito") */}
      <section className="relative py-28 overflow-hidden bg-footer-cta text-white">
        <div className="container relative z-10 text-center max-w-3xl mx-auto px-4">
          <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 font-semibold">
            Pronto para o próximo passo?
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Realize o sonho do <span className="text-accent">imóvel perfeito</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Nossa equipe está pronta para ajudá-lo. Escolha a melhor forma de começar sua busca ou anuncie seu patrimônio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getWhatsAppLink('Olá! Gostaria de mais informações sobre os imóveis da Soluction.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-sm transition-all duration-300 shadow-xl hover:-translate-y-1"
            >
              <MessageSquare size={18} />
              <span>Falar no WhatsApp ({FAKE_CONTACTS.whatsapp})</span>
            </a>

            <Link
              to="/imoveis"
              className="w-full sm:w-auto btn-premium btn-glow inline-flex items-center justify-center gap-2"
            >
              <Search size={18} />
              <span>Buscar oportunidades</span>
            </Link>

            <button
              type="button"
              onClick={() =>
                openCapture({
                  buttonType: 'Avaliar meu imóvel (CTA Final)',
                  source: 'footer-cta',
                  message: 'Olá! Gostaria de avaliar meu imóvel com a Soluction.',
                })
              }
              className="w-full sm:w-auto btn-outline-premium inline-flex items-center justify-center gap-2"
            >
              <span>Avaliar meu imóvel</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
