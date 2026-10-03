import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, RotateCcw, Home as HomeIcon } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { PROPERTIES } from '../data/properties';
import { Property } from '../types/property';

export const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial params
  const typeParam = searchParams.get('type') || 'todos';
  const categoryParam = searchParams.get('category') || 'todos';
  const cityParam = searchParams.get('city') || 'todas';
  const priceParam = searchParams.get('price') || 'todos';

  // Filters state
  const [filterType, setFilterType] = useState<string>(typeParam);
  const [filterCategory, setFilterCategory] = useState<string>(categoryParam);
  const [filterCity, setFilterCity] = useState<string>(cityParam);
  const [filterBedrooms, setFilterBedrooms] = useState<string>('todos');
  const [filterParking, setFilterParking] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if query params change
  React.useEffect(() => {
    if (searchParams.get('type')) setFilterType(searchParams.get('type')!);
    if (searchParams.get('category')) setFilterCategory(searchParams.get('category')!);
    if (searchParams.get('city')) setFilterCity(searchParams.get('city')!);
  }, [searchParams]);

  // Reset filters
  const resetFilters = () => {
    setFilterType('todos');
    setFilterCategory('todos');
    setFilterCity('todas');
    setFilterBedrooms('todos');
    setFilterParking('todos');
    setSearchTerm('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & sort logic
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((p: Property) => {
      // Type filter
      if (filterType !== 'todos' && p.type.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }

      // Category filter
      if (filterCategory !== 'todos' && p.category.toLowerCase() !== filterCategory.toLowerCase()) {
        return false;
      }

      // City filter
      if (filterCity !== 'todas') {
        const cityNorm = filterCity.toLowerCase();
        if (!p.city.toLowerCase().includes(cityNorm)) {
          return false;
        }
      }

      // Bedrooms filter
      if (filterBedrooms !== 'todos') {
        const minBeds = parseInt(filterBedrooms, 10);
        if (p.bedrooms < minBeds) return false;
      }

      // Parking filter
      if (filterParking !== 'todos') {
        const minParking = parseInt(filterParking, 10);
        if (p.parking < minParking) return false;
      }

      // Price range
      if (priceParam === '0-300000' && p.price > 300000) return false;
      if (priceParam === '300000-500000' && (p.price < 300000 || p.price > 500000)) return false;
      if (priceParam === '500000-1000000' && (p.price < 500000 || p.price > 1000000)) return false;
      if (priceParam === '1000000+' && p.price < 1000000) return false;

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(term);
        const matchesAddress = p.address.toLowerCase().includes(term);
        const matchesCity = p.city.toLowerCase().includes(term);
        const matchesCode = p.code.toLowerCase().includes(term);
        const matchesDesc = p.description.toLowerCase().includes(term);
        if (!matchesTitle && !matchesAddress && !matchesCity && !matchesCode && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.area - a.area;
      return 0;
    });
  }, [filterType, filterCategory, filterCity, filterBedrooms, filterParking, priceParam, searchTerm, sortBy]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>Início</span>
            <span>/</span>
            <span className="text-primary font-medium">Catálogo de Imóveis</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Imóveis Disponíveis
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Encontre casas, apartamentos e salas comerciais no ABC Paulista com condições exclusivas.
          </p>
        </div>

        {/* Filter Bar and Search */}
        <div className="bg-card rounded-2xl p-5 shadow-card border border-border/80 mb-10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por bairro, condomínio, código (ex: SOL-577710)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick dropdown filters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="todos">Venda ou Aluguel</option>
                <option value="venda">Apenas Venda</option>
                <option value="aluguel">Apenas Aluguel</option>
              </select>

              {/* Category */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="todos">Todos os tipos</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa / Sobrado</option>
                <option value="comercial">Comercial</option>
                <option value="outro">Outros</option>
              </select>

              {/* City */}
              <select
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="todas">Todas as cidades</option>
                <option value="Santo André">Santo André</option>
                <option value="São Bernardo do Campo">São Bernardo</option>
                <option value="Praia Grande">Praia Grande</option>
                <option value="Mauá">Mauá</option>
              </select>

              {/* Bedrooms */}
              <select
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
                className="px-3 py-2 rounded-xl border border-border bg-background text-xs font-medium text-foreground focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="todos">Dormitórios</option>
                <option value="1">1+ quartos</option>
                <option value="2">2+ quartos</option>
                <option value="3">3+ quartos</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              type="button"
              onClick={resetFilters}
              title="Limpar todos os filtros"
              className="px-3 py-2 rounded-xl border border-border bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <RotateCcw size={14} />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {/* Results Header and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <p className="text-sm text-muted-foreground font-medium">
            Exibindo <strong className="text-foreground">{filteredProperties.length}</strong>{' '}
            {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="area-desc">Maior Área (m²)</option>
            </select>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop, idx) => (
              <PropertyCard key={prop.id} property={prop} index={idx} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-card rounded-2xl border border-border/80 p-8 max-w-lg mx-auto shadow-card">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground mx-auto mb-4">
              <HomeIcon size={32} />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Não encontramos imóveis com os filtros selecionados. Tente ajustar os parâmetros ou limpe a busca.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-premium inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Ver todos os imóveis</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
