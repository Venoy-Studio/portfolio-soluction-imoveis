import React from 'react';
import { Headset, Compass, Route, Target, Eye, HeartHandshake, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Headset,
      title: 'Atendimento direto',
      desc: 'Você é atendido diretamente por um consultor especializado no ABC Paulista, sem intermediários ou enrolação.',
    },
    {
      icon: Compass,
      title: 'Entender antes de indicar',
      desc: 'Primeiro escutamos suas necessidades, orçamento e momento de vida. Depois apresentamos apenas o que realmente faz sentido.',
    },
    {
      icon: Route,
      title: 'Do início ao fim',
      desc: 'Acompanhamos cada etapa da jornada imobiliária, desde o primeiro contato e visitas até a assinatura da escritura e entrega das chaves.',
    },
    {
      icon: Target,
      title: 'Missão',
      desc: 'Encontrar a melhor oportunidade imobiliária para você, de forma segura, transparente e pensando sempre nas suas particularidades.',
    },
    {
      icon: Eye,
      title: 'Visão',
      desc: 'Focar em pessoas, entender seus objetivos e limites para construir uma relação sólida e de máxima confiança no mercado imobiliário.',
    },
    {
      icon: HeartHandshake,
      title: 'Valores',
      desc: 'Damos importância às pessoas e não somente aos números. Nos importamos com a realização de cada família e nosso compromisso é a sua satisfação plena.',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-6xl">
        {/* Main Grid: Text & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="max-w-xl">
            <p className="text-accent font-heading text-xs tracking-[0.3em] uppercase mb-4 font-semibold">
              Sobre a Soluction
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] mb-6">
              Um atendimento direto, <br />
              <span className="text-accent">sem complicação.</span>
            </h1>
            <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
              <p>
                Somos uma imobiliária de referência no ABC Paulista. Trabalhamos de forma próxima, com transparência em cada etapa e foco real no que o cliente precisa.
              </p>
              <p>
                Antes de indicar imóveis, escutamos. Antes de fechar negócio, explicamos minuciosamente cada detalhe contratual e jurídico. E acompanhamos você de ponta a ponta.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppLink('Olá! Gostaria de conversar com a equipe da Soluction.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2"
              >
                <MessageSquare size={18} />
                <span>Conversar no WhatsApp</span>
              </a>

              <Link to="/imoveis" className="text-primary hover:text-accent font-semibold text-sm inline-flex items-center gap-1.5 transition-colors">
                <span>Ver nosso catálogo</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Photo with glowing card effect */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl blur-2xl opacity-70 pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover border border-border/80 aspect-square">
              <img
                src="/assets/about-soluction-CiNkWo4Q.jpg"
                alt="Consultor da Soluction Imóveis com cliente"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/80 mb-16" />

        {/* 6 Pillars */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-2">
              Nossos Princípios
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Por que confiar na Soluction?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-card rounded-2xl p-7 border border-border/70 shadow-card card-lift flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center mb-5 transition-colors group-hover:border-accent group-hover:bg-accent/10">
                      <Icon size={24} className="text-accent" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credentials and Security Box */}
        <div className="bg-primary text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold">
              Imobiliária Credenciada
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Segurança e Registro Profissional
            </h3>
            <p className="text-white/80 text-sm max-w-xl">
              Atuação em conformidade com as normas do Conselho Regional de Corretores de Imóveis (CRECI) e assessoria jurídica qualificada.
            </p>
            <div className="pt-2 text-xs text-white/70 font-mono">
              <span>{FAKE_CONTACTS.creci} • CNPJ: {FAKE_CONTACTS.cnpj}</span>
            </div>
          </div>

          <a
            href={getWhatsAppLink('Olá! Gostaria de tirar dúvidas com um consultor da Soluction.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-4 rounded-full bg-accent hover:bg-accent-hover text-accent-foreground font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Falar com um Consultor
          </a>
        </div>
      </div>
    </div>
  );
};
