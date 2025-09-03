import { useState, useMemo } from 'react';
import type { Product, ProductFilters, ProductSummary } from '../types';
import { mockProducts } from '../mockData';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    searchTerm: '',
    activeOnly: false
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesActive = !filters.activeOnly || product.isActive;
      return matchesCategory && matchesSearch && matchesActive;
    });
  }, [products, filters]);

  const productSummary = useMemo((): ProductSummary => {
    return {
      total: products.length,
      electronics: products.filter(p => p.category === 'Electronics').length,
      furniture: products.filter(p => p.category === 'Furniture').length,
      sports: products.filter(p => p.category === 'Sports').length,
      kitchen: products.filter(p => p.category === 'Kitchen').length,
      fashion: products.filter(p => p.category === 'Fashion').length,
      home: products.filter(p => p.category === 'Home').length,
      active: products.filter(p => p.isActive).length,
      inactive: products.filter(p => !p.isActive).length
    };
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id 
        ? { ...product, ...productData }
        : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(product => product.id === id);
  };

  return {
    products: filteredProducts,
    allProducts: products,
    filters,
    setFilters,
    productSummary,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
  };
};
