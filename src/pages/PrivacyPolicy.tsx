import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { FAKE_CONTACTS } from '../data/contactInfo';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 bg-background">
      <div className="container max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao início</span>
        </Link>

        <div className="bg-card rounded-3xl p-8 sm:p-12 shadow-card border border-border/80 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-wider font-bold mb-2">
              <Shield size={16} />
              <span>Privacidade & LGPD</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Política de Privacidade
            </h1>
            <p className="text-xs text-muted-foreground mt-2">
              Última atualização: 19 de agosto de 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-foreground/80 leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">1. Quem Somos</h2>
              <p>
                A <strong>Soluction Negócios Imobiliários LTDA</strong>, inscrita no CNPJ sob o nº <strong>{FAKE_CONTACTS.cnpj}</strong>, tem o compromisso de proteger a privacidade e os dados pessoais dos usuários de seu site, em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">2. Quais Dados Coletamos</h2>
              <p>
                Podemos coletar os seguintes dados fornecidos voluntariamente por você ao preencher nossos formulários de contato ou solicitar atendimento via WhatsApp:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nome completo;</li>
                <li>Número de telefone e WhatsApp;</li>
                <li>Endereço de e-mail;</li>
                <li>Mensagens e preferências de busca por imóveis;</li>
                <li>Dados do seu imóvel caso deseje anunciá-lo conosco.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">3. Finalidades do Tratamento</h2>
              <p>Os seus dados são tratados exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Retornar seu contato comercial e esclarecer dúvidas;</li>
                <li>Apresentar imóveis compatíveis com o seu perfil de interesse;</li>
                <li>Agendar e confirmar visitas aos imóveis;</li>
                <li>Prestar suporte durante todo o processo de negociação e elaboração de minutas contratuais.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">4. Armazenamento e Favoritos Locais</h2>
              <p>
                Os imóveis favoritados em nosso site são armazenados exclusivamente na memória do seu navegador (armazenamento local - LocalStorage), não havendo transmissão desses dados para servidores externos.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">5. Segurança dos Dados</h2>
              <p>
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acessos não autorizados, perdas ou alterações indevidas. Não comercializamos nem alugamos suas informações a terceiros.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">6. Seus Direitos (LGPD)</h2>
              <p>
                Você tem o direito de solicitar a confirmação da existência de tratamento, o acesso aos seus dados, a correção de dados incompletos ou a eliminação de seus dados de nossa base de contatos comerciais a qualquer momento.
              </p>
              <p>
                Para exercer seus direitos, basta entrar em contato com nosso Encarregado de Proteção de Dados pelo e-mail <strong>{FAKE_CONTACTS.email}</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
