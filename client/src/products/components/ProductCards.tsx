import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Avatar,
  CardActions,
  Divider,
  IconButton
} from '@mui/material';
import { Edit, Delete, Inventory, LocalOffer, Visibility } from '@mui/icons-material';
import type { Product } from '../types';

interface ProductCardsProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCards: React.FC<ProductCardsProps> = ({ products, onEdit, onDelete, onViewDetails }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Sports': return { color: 'success', bg: '#e8f5e8', icon: '⚽' };
      case 'Furniture': return { color: 'warning', bg: '#fff8e1', icon: '🪑' };
      case 'Electronics': return { color: 'secondary', bg: '#f3e5f5', icon: '📱' };
      case 'Kitchen': return { color: 'info', bg: '#e3f2fd', icon: '🍳' };
      case 'Fashion': return { color: 'error', bg: '#ffebee', icon: '👕' };
      case 'Home': return { color: 'primary', bg: '#e8eaf6', icon: '🏠' };
      default: return { color: 'default', bg: '#f5f5f5', icon: '📦' };
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'error' };
    if (stock < 10) return { label: 'Low Stock', color: 'warning' };
    return { label: 'In Stock', color: 'success' };
  };

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No products found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => {
        const categoryInfo = getCategoryColor(product.category);
        const stockInfo = getStockStatus(product.stock);
        
        return (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease-in-out',
                border: '1px solid rgba(0,0,0,0.06)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  borderColor: 'primary.main'
                },
                opacity: product.isActive ? 1 : 0.7
              }}
            >
              {/* Header with Category Icon */}
              <Box 
                sx={{ 
                  background: `linear-gradient(135deg, ${categoryInfo.bg} 0%, ${categoryInfo.bg}dd 100%)`,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'white',
                    color: 'text.primary',
                    width: 48,
                    height: 48,
                    fontSize: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {categoryInfo.icon}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    {product.name}
                  </Typography>
                  <Chip 
                    label={product.category}
                    size="small"
                    sx={{ 
                      bgcolor: 'white',
                      color: `${categoryInfo.color}.main`,
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                {/* Price and Status Row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  {!product.isActive && (
                    <Chip 
                      label="Inactive" 
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ opacity: 0.7 }}
                    />
                  )}
                </Box>

                {/* Stock Information */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Inventory fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {product.stock} units
                  </Typography>
                  <Chip 
                    label={stockInfo.label}
                    size="small"
                    color={stockInfo.color as any}
                    variant="outlined"
                    sx={{ ml: 'auto', fontSize: '0.7rem' }}
                  />
                </Box>

                {/* Description */}
                {product.description && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.description}
                  </Typography>
                )}

                {/* Tags */}
                {product.tags.length > 0 && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocalOffer fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                        Tags
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Chip 
                          key={index}
                          label={tag} 
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem', 
                            height: '24px',
                            borderRadius: '12px',
                            '&:hover': {
                              bgcolor: 'primary.50'
                            }
                          }}
                        />
                      ))}
                      {product.tags.length > 3 && (
                        <Chip 
                          label={`+${product.tags.length - 3}`}
                          size="small"
                          variant="filled"
                          color="primary"
                          sx={{ 
                            fontSize: '0.7rem', 
                            height: '24px',
                            borderRadius: '12px'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </CardContent>

              <Divider />
              <CardActions sx={{ p: 2, gap: 1 }}>
                <Button 
                  variant="outlined"
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => onViewDetails(product)}
                  sx={{ 
                    flex: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  View Details
                </Button>
                <IconButton 
                  color="primary"
                  onClick={() => onEdit(product)}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'primary.50'
                    }
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  color="error"
                  onClick={() => onDelete(product.id)}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'error.main',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: 'error.50'
                    }
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
