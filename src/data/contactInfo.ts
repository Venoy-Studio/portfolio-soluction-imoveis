import { ContactInfo } from '../types/property';

export const FAKE_CONTACTS: ContactInfo = {
  phone: '(11) 98765-4321',
  phoneRaw: '5511987654321',
  whatsapp: '(11) 98765-4321',
  whatsappRaw: '5511987654321',
  email: 'contato@soluctionimoveis-demo.com.br',
  address: 'Av. Portugal, 1450 - Centro',
  city: 'Santo André - SP, 09040-000',
  cnpj: '00.000.000/0001-91',
  creci: 'CRECI/SP 000000-J',
  hours: 'Segunda a Sexta: 08h às 18h | Sábado: 09h às 13h',
};

export const getWhatsAppLink = (message: string = 'Olá! Gostaria de mais informações sobre os imóveis da Soluction.') => {
  return `https://wa.me/${FAKE_CONTACTS.whatsappRaw}?text=${encodeURIComponent(message)}`;
};
