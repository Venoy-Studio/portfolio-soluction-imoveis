import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getWhatsAppLink, FAKE_CONTACTS } from '../data/contactInfo';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 group">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-foreground px-4 py-2.5 rounded-2xl shadow-xl border border-border/80 text-xs font-medium animate-fade-in-up">
          <span>Precisa de ajuda? <strong>Fale conosco!</strong></span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Fechar dica"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={getWhatsAppLink('Olá! Gostaria de conversar com a equipe da Soluction Imóveis.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-float hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Conversar pelo WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-whatsapp/40 animate-ping opacity-60 pointer-events-none" />
        <MessageSquare size={28} className="relative z-10 fill-white" />
      </a>
    </div>
  );
};
