export type PropertyType = 'Căn hộ' | 'Nhà phố' | 'Biệt thự' | 'Shophouse' | 'Đất nền';

export type PropertyStatus = 'Đang bán' | 'Sắp mở bán' | 'Đang cho thuê';

export interface AgentInfo {
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  district: string;
  city: string;
  area: number; // m2
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  image: string;
  images: string[];
  description: string;
  features: string[];
  agent: AgentInfo;
  createdAt: string;
}
