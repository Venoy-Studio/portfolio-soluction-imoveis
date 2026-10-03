import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center container">
      <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
        <span className="font-heading text-4xl font-extrabold">404</span>
      </div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
        Página não encontrada
      </h1>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
        O endereço acessado não existe ou foi movido. Navegue pelo catálogo ou retorne à página principal.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="btn-premium inline-flex items-center gap-2">
          <Home size={16} />
          <span>Voltar ao Início</span>
        </Link>
        <Link
          to="/imoveis"
          className="px-6 py-3 rounded-full border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm transition-colors inline-flex items-center gap-2"
        >
          <Search size={16} />
          <span>Buscar Imóveis</span>
        </Link>
      </div>
    </div>
  );
};
