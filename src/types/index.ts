export type Screen = 'explore' | 'planner' | 'shop' | 'product' | 'ar' | 'saved';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'seating' | 'tables' | 'lighting' | 'textiles' | 'objects';
  price: number;
  rating?: number;
  reviewCount?: number;
  image: string;
  badge?: string;
  tone?: string;
  dimensions?: string;
  footprint?: string;
  material?: string;
  inStock?: boolean;
  arReady?: boolean;
}

export interface RoomItem {
  id: string;
  name: string;
  shortName: string;
  price: number;
  dimensions: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  type: 'rug' | 'sofa' | 'table' | 'lamp' | 'chair' | 'decor';
  rotation?: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedColor?: string;
  quantity: number;
}
