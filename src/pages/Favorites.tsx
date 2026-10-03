import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { PropertyCard } from '../components/PropertyCard';
import { PROPERTIES } from '../data/properties';

export const Favorites: React.FC = () => {
  const { favorites, favoritesCount } = useFavorites();

  const favoriteProperties = PROPERTIES.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-6xl">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary">Início</Link>
              <span>/</span>
              <span className="text-primary font-medium">Favoritos</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
              <Heart className="fill-accent text-accent" size={32} />
              <span>Meus Imóveis Favoritos</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Imóveis salvos para você comparar com tranquilidade.
            </p>
          </div>

          {favoritesCount > 0 && (
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 self-start sm:self-auto">
              {favoritesCount} {favoritesCount === 1 ? 'imóvel salvo' : 'imóveis salvos'}
            </span>
          )}
        </div>

        {/* Content */}
        {favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-3xl p-12 text-center max-w-lg mx-auto shadow-card border border-border/80 my-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground mx-auto mb-6">
              <Heart size={36} className="text-muted-foreground/60" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Sua lista de favoritos está vazia
            </h2>
            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              Você ainda não favoritou nenhum imóvel. Clique no ícone de coração nos cards dos imóveis para salvá-los e consultá-los depois.
            </p>
            <Link to="/imoveis" className="btn-premium inline-flex items-center gap-2">
              <Search size={16} />
              <span>Explorar Imóveis Disponíveis</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
