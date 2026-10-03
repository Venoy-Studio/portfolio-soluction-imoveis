export interface Property {
  id: string;
  title: string;
  type: 'venda' | 'aluguel';
  price: number;
  rent_price?: number | null;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  address: string;
  city: string;
  description: string;
  images: string[];
  iptu?: string | null;
  condominio?: string | null;
  andar?: string | null;
  category: 'casa' | 'apartamento' | 'comercial' | 'outro';
  code: string;
  created_at?: string;
  updated_at?: string;
}

export interface Region {
  name: string;
  slug: string;
  img: string;
  count?: number;
}

export interface Testimonial {
  name: string;
  role?: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface ContactInfo {
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: string;
  city: string;
  cnpj: string;
  creci: string;
  hours: string;
}
