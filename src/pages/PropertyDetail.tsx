import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  Heart,
  Share2,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  ArrowLeft,
  Calendar,
  Check,
  Building,
  DollarSign
} from 'lucide-react';
import { getPropertyById, PROPERTIES } from '../data/properties';
import { PropertyCard } from '../components/PropertyCard';
import { useFavorites } from '../context/FavoritesContext';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = id ? getPropertyById(id) : undefined;

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = property ? isFavorite(property.id) : false;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Lead quick form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientMsg, setClientMsg] = useState('');

  // Scroll to top on id change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center container">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
          Imóvel não encontrado
        </h1>
        <p className="text-muted-foreground mb-6">
          O imóvel que você procura não está disponível ou o link pode ter expirado.
        </p>
        <Link to="/imoveis" className="btn-premium">
          Ver todos os imóveis disponíveis
        </Link>
      </div>
    );
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop'];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Confira este imóvel na Soluction: ${property.title}`,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // User cancelled or share not supported
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const waPreFilled = `Olá! Vi o imóvel "${property.title}" (Cód: ${property.code}) no site da Soluction e gostaria de tirar dúvidas e agendar uma visita.`;

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const leadText = `*Interesse no Imóvel ${property.code}*\n` +
      `*Imóvel:* ${property.title}\n` +
      `*Nome:* ${clientName}\n` +
      `*Telefone:* ${clientPhone}\n` +
      `*Mensagem:* ${clientMsg || 'Gostaria de agendar uma visita e obter mais informações.'}`;

    window.open(getWhatsAppLink(leadText), '_blank');
  };

  // Related properties
  const related = PROPERTIES.filter((p) => p.id !== property.id && (p.city === property.city || p.category === property.category)).slice(0, 3);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container">
        {/* Navigation / Back link */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>

          {/* Code, Share & Favorite */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-foreground border border-border">
              Cód: {property.code}
            </span>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors relative"
              title="Compartilhar imóvel"
              aria-label="Compartilhar imóvel"
            >
              {copiedLink ? <Check size={18} className="text-green-600" /> : <Share2 size={18} />}
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-black text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                  Link copiado!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              className="p-2 rounded-full border border-border bg-card hover:bg-muted text-foreground transition-colors"
              title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              aria-label="Favoritar imóvel"
            >
              <Heart
                size={18}
                className={favorited ? 'fill-accent text-accent' : 'text-foreground'}
              />
            </button>
          </div>
        </div>

        {/* Title and Location Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                property.type === 'venda' ? 'badge-venda' : 'badge-aluguel'
              }`}
            >
              {property.type === 'venda' ? 'Venda' : 'Aluguel'}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
              {property.category}
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
            {property.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={16} className="text-accent shrink-0" />
            <span>
              {property.address ? `${property.address}, ` : ''}{property.city} - SP
            </span>
          </div>
        </div>

        {/* PHOTO GALLERY SECTION */}
        <div className="mb-10">
          {/* Main Large Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[560px] rounded-3xl overflow-hidden shadow-card border border-border/70 bg-muted group">
            <img
              src={images[activeImageIndex]}
              alt={`${property.title} - Foto ${activeImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-102"
              onClick={() => setLightboxOpen(true)}
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                  aria-label="Próxima foto"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Photo counter badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {activeImageIndex + 1} / {images.length} fotos
            </div>
          </div>

          {/* Thumbnails row */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 sm:w-24 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-accent scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* MAIN CONTENT & SIDEBAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column (2 cols): Details, Specs, Description */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs Highlights */}
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/80">
              <h2 className="font-heading text-lg font-bold text-foreground mb-4">
                Características do Imóvel
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Maximize2 size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Área útil</span>
                    <strong className="text-sm text-foreground">{property.area} m²</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Bed size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Dormitórios</span>
                    <strong className="text-sm text-foreground">
                      {property.bedrooms > 0 ? `${property.bedrooms} quartos` : 'Não especificado'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Bath size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Banheiros</span>
                    <strong className="text-sm text-foreground">
                      {property.bathrooms > 0 ? `${property.bathrooms} banheiros` : 'Não especificado'}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/60">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Car size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Vagas</span>
                    <strong className="text-sm text-foreground">
                      {property.parking > 0 ? `${property.parking} vagas` : 'Não possui'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Financial & Building Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/60 text-xs">
                {property.condominio && (
                  <div>
                    <span className="text-muted-foreground block">Condomínio estimado:</span>
                    <strong className="text-foreground text-sm font-semibold">{property.condominio}</strong>
                  </div>
                )}
                {property.iptu && (
                  <div>
                    <span className="text-muted-foreground block">IPTU:</span>
                    <strong className="text-foreground text-sm font-semibold">{property.iptu}</strong>
                  </div>
                )}
                {property.andar && (
                  <div>
                    <span className="text-muted-foreground block">Andar / Pavimento:</span>
                    <strong className="text-foreground text-sm font-semibold">{property.andar}º andar</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/80">
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">
                Sobre este imóvel
              </h2>
              <div className="text-sm text-foreground/80 leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {property.description}
              </div>
            </div>

            {/* Location & Map info */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/80">
              <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                Localização
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Bairro {property.address}, em {property.city} - SP. Região com infraestrutura completa de transportes, comércio e escolas.
              </p>
              <div className="p-4 rounded-xl bg-muted/60 border border-border/80 flex items-center gap-3">
                <MapPin size={24} className="text-primary shrink-0" />
                <span className="text-xs text-foreground font-medium">
                  Por razões de segurança e privacidade dos proprietários, o número exato do imóvel será fornecido no momento do agendamento da visita com nosso corretor credenciado.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (1 col): Sticky Pricing & Broker Contact Box */}
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="bg-card rounded-3xl p-6 sm:p-8 shadow-card-hover border border-border/90">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block mb-1">
                Valor do Imóvel
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-primary mb-6">
                {formatPrice(property.price)}
              </div>

              {/* Direct WhatsApp CTA Button with Fictitious Number */}
              <a
                href={getWhatsAppLink(waPreFilled)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 mb-6"
              >
                <MessageSquare size={20} />
                <span>Falar no WhatsApp ({FAKE_CONTACTS.whatsapp})</span>
              </a>

              {/* Quick Inquiry Form */}
              <div className="pt-6 border-t border-border/80">
                <h3 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                  Agendar Visita ou Tirar Dúvidas
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Envie seus dados para que um consultor exclusivo entre em contato.
                </p>

                <form onSubmit={handleQuickLeadSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp (ex: 11 98765-4321)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Mensagem opcional..."
                      value={clientMsg}
                      onChange={(e) => setClientMsg(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    Solicitar Atendimento
                  </button>
                </form>
              </div>

              {/* Fictitious Broker Credentials */}
              <div className="mt-6 pt-6 border-t border-border/80 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-accent shrink-0" />
                  <span>Imóvel verificado com documentação apta para financiamento.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-accent shrink-0" />
                  <span>Plantão de Atendimento: {FAKE_CONTACTS.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PROPERTIES */}
        {related.length > 0 && (
          <div className="mt-20 pt-16 border-t border-border/70">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">
                  Oportunidades Semelhantes
                </p>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Imóveis Relacionados
                </h2>
              </div>
              <Link to="/imoveis" className="text-sm font-semibold text-primary hover:text-accent">
                Ver todos
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Próxima foto"
          >
            <ChevronRight size={28} />
          </button>

          <img
            src={images[activeImageIndex]}
            alt="Foto expandida"
            className="max-h-[85vh] max-w-[90vw] object-contain select-none shadow-2xl"
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/90 text-sm font-semibold bg-black/60 px-4 py-2 rounded-full">
            {activeImageIndex + 1} de {images.length}
          </div>
        </div>
      )}
    </div>
  );
};
