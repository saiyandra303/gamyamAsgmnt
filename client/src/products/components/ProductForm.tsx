import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import type { Product, ProductFormData } from '../types';

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  editProduct?: Product | null;
}

const initialFormData: ProductFormData = {
  name: '',
  price: '',
  category: '',
  stock: '',
  description: '',
  isActive: true,
  tags: ''
};

export const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onClose,
  onSubmit,
  editProduct
}) => {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        price: editProduct.price.toString(),
        category: editProduct.category,
        stock: editProduct.stock.toString(),
        description: editProduct.description || '',
        isActive: editProduct.isActive,
        tags: editProduct.tags.join(', ')
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [editProduct, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required' as any;
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name.trim(),
      price: Number(formData.price),
      category: formData.category as 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home',
      stock: Number(formData.stock),
      description: formData.description.trim(),
      isActive: formData.isActive,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    onSubmit(productData);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    const processedValue = field === 'isActive' ? value === 'true' : value;
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {editProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Product Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
            />

            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              error={!!errors.price}
              helperText={errors.price}
              required
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />

            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Furniture">Furniture</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Kitchen">Kitchen</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            <TextField
              label="Stock Quantity"
              type="number"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', e.target.value)}
              error={!!errors.stock}
              helperText={errors.stock}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="e.g. wireless, gaming, accessories"
              fullWidth
              helperText="Enter tags separated by commas"
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked.toString())}
              />
              <label htmlFor="isActive">Product is active</label>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {editProduct ? 'Update' : 'Add'} Product
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
