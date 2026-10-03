import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Quero comprar um imóvel');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullText = `*Contato via Site Soluction*\n` +
      `*Assunto:* ${subject}\n` +
      `*Nome:* ${name}\n` +
      `*Telefone:* ${phone}\n` +
      `*E-mail:* ${email || 'Não informado'}\n` +
      `*Mensagem:* ${message}`;

    setSent(true);
    setTimeout(() => {
      window.open(getWhatsAppLink(fullText), '_blank');
      setSent(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent font-heading text-xs sm:text-sm tracking-[0.25em] uppercase mb-2 font-semibold">
            Atendimento Exclusivo
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Fale com a Soluction
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Tire suas dúvidas, agende uma visita ou receba uma curadoria personalizada de imóveis no ABC Paulista.
          </p>
        </div>

        {/* 2 Columns: Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-16">
          {/* Left Column (2 cols): Contact cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/80">
              <h2 className="font-heading text-lg font-bold text-foreground mb-6">
                Canais de Atendimento
              </h2>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-whatsapp/15 text-whatsapp flex items-center justify-center shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                      WhatsApp Principal (Fictício)
                    </span>
                    <strong className="text-foreground text-base block font-heading">
                      {FAKE_CONTACTS.whatsapp}
                    </strong>
                    <a
                      href={getWhatsAppLink('Olá! Gostaria de falar com o atendimento da Soluction.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-whatsapp hover:underline mt-1 inline-block"
                    >
                      Iniciar conversa imediata &rarr;
                    </a>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                      Telefone de Atendimento
                    </span>
                    <strong className="text-foreground text-base block font-heading">
                      {FAKE_CONTACTS.phone}
                    </strong>
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      Fixo / Plantão: (11) 4002-8922
                    </span>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                      E-mail Comercial
                    </span>
                    <strong className="text-foreground text-sm block font-heading break-all">
                      {FAKE_CONTACTS.email}
                    </strong>
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      Retorno em até 24 horas úteis
                    </span>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                      Endereço Comercial
                    </span>
                    <span className="text-foreground text-sm font-medium block">
                      {FAKE_CONTACTS.address}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {FAKE_CONTACTS.city}
                    </span>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                      Horário de Funcionamento
                    </span>
                    <span className="text-xs text-muted-foreground block leading-relaxed">
                      {FAKE_CONTACTS.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal credentials */}
            <div className="bg-muted/60 rounded-2xl p-5 border border-border/80 text-xs text-muted-foreground space-y-1">
              <span className="font-bold text-foreground block">Dados Cadastrais da Empresa:</span>
              <p>Soluction Negócios Imobiliários LTDA</p>
              <p>CNPJ: {FAKE_CONTACTS.cnpj} • {FAKE_CONTACTS.creci}</p>
            </div>
          </div>

          {/* Right Column (3 cols): Interactive Contact Form */}
          <div className="lg:col-span-3 bg-card rounded-3xl p-8 sm:p-10 shadow-card border border-border/80">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
              Envie uma mensagem
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Preencha o formulário abaixo e direcionaremos seu atendimento diretamente para o especialista mais adequado.
            </p>

            {sent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Mensagem recebida com sucesso!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Abrindo o WhatsApp com nossos consultores para prosseguir...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Amanda Ferreira"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(11) 98765-4321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Assunto do Contato
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="Quero comprar um imóvel">Quero comprar um imóvel</option>
                    <option value="Quero alugar um imóvel">Quero alugar um imóvel</option>
                    <option value="Quero anunciar meu imóvel">Quero anunciar meu imóvel</option>
                    <option value="Parceria de corretor autônomo">Parceria de corretor autônomo / captador</option>
                    <option value="Assessoria jurídica ou dúvidas">Assessoria jurídica ou dúvidas gerais</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Conte-nos o que você busca (bairros de preferência, quantidade de quartos, orçamento, etc.)..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck size={16} className="text-accent shrink-0" />
                  <span>Seus dados são protegidos conforme a LGPD e usados apenas para retorno da sua consulta.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Send size={18} />
                  <span>Enviar Mensagem & Conectar com Corretor</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
