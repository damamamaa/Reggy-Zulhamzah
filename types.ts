export type PropertyType = 'Rumah' | 'Ruko' | 'Tanah' | 'Villa' | 'Gudang' | 'Apartemen';
export type TransactionType = 'Di Jual' | 'Di Sewakan';

export interface PropertySpecs {
  landSize: number; // m2
  buildingSize: number; // m2
  bedrooms: number;
  bathrooms: number;
  floors?: number;
  certificate: 'SHM' | 'HGB' | 'Strata Title' | 'AJB' | 'Lainnya';
  electricity: number; // Watts
  furnishing: 'Non-Furnished' | 'Semi-Furnished' | 'Full Furnished';
  yearBuilt?: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  price: number;
  location: string; // e.g., "Bekasi Timur"
  address?: string;
  type: PropertyType;
  transactionType: TransactionType;
  description: string;
  specs: PropertySpecs;
  images: string[];
  isFeatured?: boolean;
  createdAt: string; // ISO Date
}

export interface FilterState {
  search: string;
  type: PropertyType | 'Semua';
  minPrice: string;
  maxPrice: string;
  transactionType: TransactionType | 'Semua';
  sort: 'terbaru' | 'harga_rendah' | 'harga_tinggi';
}