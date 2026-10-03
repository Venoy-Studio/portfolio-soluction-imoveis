import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLeadModal } from '../context/LeadModalContext';
import { FAKE_CONTACTS, getWhatsAppLink } from '../data/contactInfo';

export const LeadCaptureModal: React.FC = () => {
  const { isOpen, options, closeCapture } = useLeadModal();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');

      let defaultMsg = options.message || 'Olá! Gostaria de mais informações sobre os imóveis.';
      if (options.propertyTitle) {
        defaultMsg = `Olá! Tenho interesse no imóvel "${options.propertyTitle}" (Cód: ${options.propertyCode || 'N/A'}). Poderia me passar mais informações?`;
      }
      setMessage(defaultMsg);
    }
  }, [isOpen, options]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare message to send
    const fullText = `*Novo Contato via Site Soluction*\n` +
      `*Nome:* ${name}\n` +
      `*Telefone:* ${phone}\n` +
      `*E-mail:* ${email || 'Não informado'}\n` +
      `*Mensagem:* ${message}`;

    setSubmitted(true);

    setTimeout(() => {
      // Open fictitious WhatsApp
      window.open(getWhatsAppLink(fullText), '_blank');
      closeCapture();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
      <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
        {/* Modal Header */}
        <div className="bg-primary text-white p-6 relative">
          <button
            type="button"
            onClick={closeCapture}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
            aria-label="Fechar modal"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-2 text-accent text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare size={16} />
            <span>Atendimento Personalizado</span>
          </div>
          <h2 className="font-heading text-2xl font-bold">Falar com um corretor</h2>
          <p className="text-white/80 text-sm mt-1">
            Preencha seus dados e iremos te conectar imediatamente com nosso especialista.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Pronto! Conectando com o corretor...
              </h3>
              <p className="text-sm text-muted-foreground">
                Você será redirecionado para o WhatsApp com nosso consultor.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {options.propertyTitle && (
                <div className="p-3 bg-muted/60 rounded-xl border border-border/80 text-xs">
                  <span className="font-medium text-foreground block">Imóvel selecionado:</span>
                  <span className="text-primary font-semibold block truncate">{options.propertyTitle}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    WhatsApp ou Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Como podemos ajudar você?
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                <ShieldCheck size={16} className="text-accent shrink-0" />
                <span>Seus dados são protegidos e usados apenas para este contato comercial.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageSquare size={18} />
                <span>Continuar para WhatsApp ({FAKE_CONTACTS.whatsapp})</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
