export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home';
  stock: number;
  description: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
}

export interface ProductFormData {
  name: string;
  price: string;
  category: 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home' | '';
  stock: string;
  description: string;
  isActive: boolean;
  tags: string;
}

export interface ProductFilters {
  category: 'all' | 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home';
  searchTerm: string;
  activeOnly: boolean;
}

export type ViewMode = 'list' | 'card';

export interface ProductSummary {
  total: number;
  electronics: number;
  furniture: number;
  sports: number;
  kitchen: number;
  fashion: number;
  home: number;
  active: number;
  inactive: number;
}
