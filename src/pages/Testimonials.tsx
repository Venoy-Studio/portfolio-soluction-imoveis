import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';

export const Testimonials: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2 font-semibold">
            Experiências Reais
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A transparência, agilidade e cuidado em cada detalhe refletidos na satisfação de quem conquistou o imóvel ideal conosco.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((item, idx) => (
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

        {/* CTA Card */}
        <div className="bg-primary text-white rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3">
            Quer ser o próximo a realizar esse sonho?
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-8">
            Nossos consultores no ABC Paulista estão à disposição para entender o que você busca e apresentar as melhores oportunidades do mercado.
          </p>
          <a
            href={getWhatsAppLink('Olá! Li os depoimentos no site e gostaria de conversar com um corretor.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <MessageSquare size={18} />
            <span>Falar com nosso time no WhatsApp ({FAKE_CONTACTS.whatsapp})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
