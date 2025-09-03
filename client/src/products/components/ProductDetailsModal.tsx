import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Close,
  Edit,
  Inventory,
  LocalOffer,
  Category,
  AttachMoney,
  Description,
  CalendarToday,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import type { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  open,
  onClose,
  onEdit
}) => {
  if (!product) return null;

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'Sports': return { color: 'success', icon: '⚽', bg: '#e8f5e8' };
      case 'Furniture': return { color: 'warning', icon: '🪑', bg: '#fff8e1' };
      case 'Electronics': return { color: 'secondary', icon: '📱', bg: '#f3e5f5' };
      case 'Kitchen': return { color: 'info', icon: '🍳', bg: '#e3f2fd' };
      case 'Fashion': return { color: 'error', icon: '👕', bg: '#ffebee' };
      case 'Home': return { color: 'primary', icon: '🏠', bg: '#e8eaf6' };
      default: return { color: 'default', icon: '📦', bg: '#f5f5f5' };
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'error', severity: 'High' };
    if (stock < 10) return { label: 'Low Stock', color: 'warning', severity: 'Medium' };
    return { label: 'In Stock', color: 'success', severity: 'Good' };
  };

  const categoryInfo = getCategoryInfo(product.category);
  const stockInfo = getStockStatus(product.stock);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${categoryInfo.bg} 0%, ${categoryInfo.bg}dd 100%)`,
          p: 0,
          position: 'relative'
        }}
      >
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'white',
              color: 'text.primary',
              width: 64,
              height: 64,
              fontSize: '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {categoryInfo.icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                label={product.category}
                sx={{
                  bgcolor: 'white',
                  color: `${categoryInfo.color}.main`,
                  fontWeight: 600
                }}
              />
              <Chip
                icon={product.isActive ? <CheckCircle /> : <Cancel />}
                label={product.isActive ? 'Active' : 'Inactive'}
                color={product.isActive ? 'success' : 'default'}
                variant="outlined"
                sx={{ bgcolor: 'white' }}
              />
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(255,255,255,0.9)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Grid container>
          {/* Left Column - Main Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              {/* Price Section */}
              <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <AttachMoney color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Pricing Information
                    </Typography>
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product ID: #{product.id}
                  </Typography>
                </CardContent>
              </Card>

              {/* Stock Information */}
              <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Inventory color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Stock Information
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {product.stock}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      units available
                    </Typography>
                    <Chip
                      label={stockInfo.label}
                      color={stockInfo.color as any}
                      variant="outlined"
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Stock Level:
                    </Typography>
                    <Chip
                      label={stockInfo.severity}
                      size="small"
                      color={stockInfo.color as any}
                    />
                  </Box>
                </CardContent>
              </Card>

              {/* Description */}
              {product.description && (
                <Card sx={{ mb: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Description color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Description
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.7,
                        color: 'text.secondary'
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>

          {/* Right Column - Additional Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, bgcolor: 'grey.50', height: '100%' }}>
              {/* Category Details */}
              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Category color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Category
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: categoryInfo.bg,
                        color: 'text.primary',
                        width: 80,
                        height: 80,
                        fontSize: '2.5rem',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      {categoryInfo.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {product.category}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Tags */}
              {product.tags.length > 0 && (
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <LocalOffer color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Tags
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {product.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: '16px',
                            '&:hover': {
                              bgcolor: 'primary.50'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Timestamps */}
              <Card sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CalendarToday color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Timeline
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Created
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {new Date(product.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    {/* <Box>
                      <Typography variant="body2" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {new Date(product.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Typography>
                    </Box> */}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, bgcolor: 'grey.50', gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Close
        </Button>
        {onEdit && (
          <Tooltip title="Edit this product">
            <Button
              onClick={() => {
                onEdit(product);
                onClose();
              }}
              variant="contained"
              startIcon={<Edit />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Edit Product
            </Button>
          </Tooltip>
        )}
      </DialogActions>
    </Dialog>
  );
};
