import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import type { ProductSummary } from '../types';

interface ProductSummaryCardsProps {
  summary: ProductSummary;
  activeCategory: 'all' | 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home';
  onCategorySelect: (category: 'all' | 'Electronics' | 'Furniture' | 'Sports' | 'Kitchen' | 'Fashion' | 'Home') => void;
}

const categoryConfig = {
  all: { label: 'All Products', color: '#1976d2', icon: '📦' },
  Electronics: { label: 'Electronics', color: '#9c27b0', icon: '💻' },
  Furniture: { label: 'Furniture', color: '#ed6c02', icon: '🪑' },
  Sports: { label: 'Sports', color: '#2e7d32', icon: '⚽' },
  Kitchen: { label: 'Kitchen', color: '#f57c00', icon: '🍳' },
  Fashion: { label: 'Fashion', color: '#e91e63', icon: '👗' },
  Home: { label: 'Home', color: '#795548', icon: '🏠' }
};

export const ProductSummaryCards: React.FC<ProductSummaryCardsProps> = ({
  summary,
  activeCategory,
  onCategorySelect
}) => {
  const getCount = (category: keyof typeof categoryConfig) => {
    switch (category) {
      case 'all': return summary.total;
      case 'Electronics': return summary.electronics;
      case 'Furniture': return summary.furniture;
      case 'Sports': return summary.sports;
      case 'Kitchen': return summary.kitchen;
      case 'Fashion': return summary.fashion;
      case 'Home': return summary.home;
      default: return 0;
    }
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {Object.entries(categoryConfig).map(([key, config]) => {
        const category = key as keyof typeof categoryConfig;
        const isActive = activeCategory === category;
        const count = getCount(category);

        return (
          <Grid item xs={12} sm={6} md={2} key={category}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isActive ? 'translateY(-4px)' : 'none',
                boxShadow: isActive ? 4 : 1,
                border: isActive ? `2px solid ${config.color}` : '1px solid #e0e0e0',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
              onClick={() => onCategorySelect(category)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6" component="div" color={config.color}>
                      {config.label}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {count}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      backgroundColor: `${config.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h5" sx={{ color: config.color, fontWeight: 'bold' }}>
                      {config.icon}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
