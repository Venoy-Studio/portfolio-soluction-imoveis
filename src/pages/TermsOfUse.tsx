import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';
import { FAKE_CONTACTS } from '../data/contactInfo';

export const TermsOfUse: React.FC = () => {
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
              <FileText size={16} />
              <span>Documento Legal</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Termos de Uso
            </h1>
            <p className="text-xs text-muted-foreground mt-2">
              Última atualização: 19 de agosto de 2026
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-foreground/80 leading-relaxed space-y-6">
            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">1. Sobre o Site</h2>
              <p>
                Este site é disponibilizado pela <strong>Soluction Negócios Imobiliários LTDA</strong>, inscrita no CNPJ sob o nº <strong>{FAKE_CONTACTS.cnpj}</strong>, com sede em {FAKE_CONTACTS.address}, {FAKE_CONTACTS.city}.
              </p>
              <p>
                O objetivo desta plataforma é apresentar informações imobiliárias, permitir a busca por oportunidades de compra, venda e locação de imóveis e conectar interessados aos nossos corretores credenciados.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">2. Utilização da Plataforma</h2>
              <p>
                Ao navegar neste site, o usuário compromete-se a utilizá-lo para finalidades lícitas e éticas. É expressamente vedado:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Utilizar o site para práticas fraudulentas ou ilícitas;</li>
                <li>Fornecer dados cadastrais falsos nos formulários de contato;</li>
                <li>Tentar invadir áreas restritas ou vulnerar os sistemas de segurança;</li>
                <li>Reproduzir comercialmente o conteúdo, imagens ou marcas sem prévia autorização.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">3. Informações dos Imóveis</h2>
              <p>
                Os dados de valores (venda, condomínio, IPTU), metragens e disponibilidade dos imóveis apresentados possuem caráter informativo e podem sofrer alterações sem aviso prévio por decisão dos proprietários ou dinâmicas do mercado.
              </p>
              <p>
                A confirmação de valores, condições de financiamento e documentação é formalizada diretamente em atendimento com a equipe Soluction antes de qualquer formalização de negócio.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">4. Propriedade Intelectual</h2>
              <p>
                Todas as fotos, plantas, descrições, logotipos, elementos de design e códigos presentes no site são de titularidade da Soluction ou de seus respectivos parceiros, protegidos pela Lei de Direitos Autorais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-foreground">5. Contato e Atendimento</h2>
              <p>
                Em caso de dúvidas a respeito destes Termos de Uso, entre em contato através do e-mail <strong>{FAKE_CONTACTS.email}</strong> ou pelo WhatsApp <strong>{FAKE_CONTACTS.whatsapp}</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
