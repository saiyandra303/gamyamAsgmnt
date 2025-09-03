import React, { useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Fab
} from '@mui/material';
import { ProductSummaryCards } from './ProductSummaryCards';
import { SearchBar } from './SearchBar';
import { ViewToggle } from './ViewToggle';
import { ProductTable } from './ProductTable';
import { ProductCards } from './ProductCards';
import { ProductForm } from './ProductForm';
import { ActiveFilter } from './ActiveFilter';
import { ProductDetailsModal } from './ProductDetailsModal';
import { useProducts } from '../hooks/useProducts';
import type { Product, ViewMode } from '../types';





export const ProductsPage: React.FC = () => {
  const {
    products,
    filters,
    setFilters,
    productSummary,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCategorySelect = useCallback((category: 'all' | 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home') => {
    setFilters(prev => ({ ...prev, category }));
  }, [setFilters]);

  const handleSearch = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  }, [setFilters]);

  const handleActiveFilterChange = useCallback((activeOnly: boolean) => {
    setFilters(prev => ({ ...prev, activeOnly }));
  }, [setFilters]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleViewDetails = (product: Product) => {
    setDetailsProduct(product);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setDetailsProduct(null);
  };

  const handleFormSubmit = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Products Management
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage your product inventory with ease
        </Typography>
      </Box>

      {/* Summary Cards */}
      <ProductSummaryCards
        summary={productSummary}
        activeCategory={filters.category}
        onCategorySelect={handleCategorySelect}
      />

      {/* Controls */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Button
            variant="contained"
            onClick={handleAddProduct}
            sx={{ minWidth: 120 }}
          >
            Add Product
          </Button>
        </Box>
        
        <ActiveFilter 
          activeOnly={filters.activeOnly} 
          onActiveFilterChange={handleActiveFilterChange} 
        />
        
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </Box>

      {/* Products Display */}
      <Box sx={{ mb: 4 }}>
        {viewMode === 'list' ? (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onViewDetails={handleViewDetails}
          />
        ) : (
          <ProductCards
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onViewDetails={handleViewDetails}
          />
        )}
      </Box>

      {/* Product Form Dialog */}
      <ProductForm
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        editProduct={editingProduct}
      />

      <ProductDetailsModal
        product={detailsProduct}
        open={isDetailsOpen}
        onClose={handleCloseDetails}
        onEdit={handleEditProduct}
      />

      {/* Floating Action Button for Mobile */}
      <Fab
        color="primary"
        aria-label="add product"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' }
        }}
        onClick={handleAddProduct}
      >
        ➕
      </Fab>
    </Container>
  );
};
