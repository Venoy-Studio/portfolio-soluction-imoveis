import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Car, Maximize2, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Property } from '../types/property';
import { useFavorites } from '../context/FavoritesContext';
import { getWhatsAppLink } from '../data/contactInfo';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const mainImage = property.images && property.images.length > 0
    ? property.images[0]
    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop';

  const isVenda = property.type === 'venda';

  const waMessage = `Olá! Vi o imóvel "${property.title}" (Cód: ${property.code}) no site da Soluction e gostaria de mais informações.`;

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card card-lift border border-border/70 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Link to={`/imovel/${property.id}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={property.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span
            className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
              isVenda ? 'badge-venda' : 'badge-aluguel'
            }`}
          >
            {isVenda ? 'Venda' : 'Aluguel'}
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/50 text-white/90 backdrop-blur-sm">
            {property.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-foreground flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            size={18}
            className={favorited ? 'fill-accent text-accent' : 'text-foreground/70'}
          />
        </button>

        {/* Price Tag Overlay on bottom of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="text-white drop-shadow-md">
            <span className="text-xs font-medium text-white/80 block uppercase tracking-wider">
              Valor
            </span>
            <span className="text-xl md:text-2xl font-bold font-heading">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* Code Tag */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-black/60 text-white/90 backdrop-blur-sm">
            {property.code}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <MapPin size={14} className="text-accent shrink-0" />
            <span className="truncate">
              {property.address ? `${property.address}, ` : ''}{property.city}
            </span>
          </div>

          {/* Title */}
          <Link to={`/imovel/${property.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-heading font-semibold text-base text-foreground line-clamp-2 leading-snug mb-3">
              {property.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Features spec badges */}
          <div className="grid grid-cols-4 gap-2 py-3 border-y border-border/60 text-xs text-muted-foreground my-3">
            <div className="flex flex-col items-center justify-center p-1 text-center" title="Área total">
              <Maximize2 size={16} className="text-primary mb-1" />
              <span className="font-semibold text-foreground">{property.area} m²</span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 text-center" title="Dormitórios">
              <Bed size={16} className="text-primary mb-1" />
              <span className="font-semibold text-foreground">
                {property.bedrooms > 0 ? `${property.bedrooms} qto${property.bedrooms > 1 ? 's' : ''}` : '-'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 text-center" title="Banheiros">
              <Bath size={16} className="text-primary mb-1" />
              <span className="font-semibold text-foreground">
                {property.bathrooms > 0 ? `${property.bathrooms} ban` : '-'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 text-center" title="Vagas de Garagem">
              <Car size={16} className="text-primary mb-1" />
              <span className="font-semibold text-foreground">
                {property.parking > 0 ? `${property.parking} vag${property.parking > 1 ? 'as' : 'a'}` : '-'}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Link
              to={`/imovel/${property.id}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white font-medium text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all duration-200"
            >
              <span>Ver Detalhes</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href={getWhatsAppLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white transition-colors"
              title="Falar no WhatsApp"
              aria-label="Falar sobre este imóvel no WhatsApp"
            >
              <MessageSquare size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
