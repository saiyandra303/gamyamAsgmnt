import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { Edit, Delete, Visibility, Inventory, TrendingUp, TrendingDown, FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import type { Product } from '../types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, onViewDetails }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / rowsPerPage);
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
    if (stock === 0) return { label: 'Out of Stock', color: 'error', icon: <TrendingDown /> };
    if (stock < 10) return { label: 'Low Stock', color: 'warning', icon: <TrendingDown /> };
    return { label: 'In Stock', color: 'success', icon: <TrendingUp /> };
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
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden'
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="products table">
        <TableHead>
          <TableRow 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '& .MuiTableCell-head': {
                color: 'white',
                fontWeight: 600,
                fontSize: '0.95rem',
                borderBottom: 'none'
              }
            }}
          >
            <TableCell>Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Stock Status</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedProducts.map((product, index) => {
            const categoryInfo = getCategoryInfo(product.category);
            const stockInfo = getStockStatus(product.stock);
            
            return (
              <TableRow
                key={product.id}
                sx={{ 
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                    transform: 'scale(1.001)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  },
                  transition: 'all 0.2s ease-in-out',
                  opacity: product.isActive ? 1 : 0.6,
                  '& .MuiTableCell-root': {
                    borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
                    py: 2
                  }
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: categoryInfo.bg,
                        color: 'text.primary',
                        width: 40,
                        height: 40,
                        fontSize: '1.2rem',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      {categoryInfo.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: #{product.id}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Typography 
                    variant="h6" 
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
                </TableCell>
                
                <TableCell align="center">
                  <Chip 
                    icon={<span style={{ fontSize: '1rem' }}>{categoryInfo.icon}</span>}
                    label={product.category}
                    sx={{ 
                      bgcolor: categoryInfo.bg,
                      color: `${categoryInfo.color}.main`,
                      fontWeight: 500,
                      border: `1px solid ${categoryInfo.color === 'default' ? '#e0e0e0' : 'transparent'}`,
                      '& .MuiChip-icon': {
                        fontSize: '1rem'
                      }
                    }}
                  />
                  {!product.isActive && (
                    <Chip 
                      label="Inactive" 
                      size="small"
                      color="default"
                      variant="outlined"
                      sx={{ ml: 1, opacity: 0.7 }}
                    />
                  )}
                </TableCell>
                
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Inventory fontSize="small" color="action" />
                    <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                      {product.stock}
                    </Typography>
                    <Tooltip title={stockInfo.label}>
                      <Chip 
                        icon={stockInfo.icon}
                        label={stockInfo.label}
                        size="small"
                        color={stockInfo.color as any}
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Tooltip>
                  </Box>
                </TableCell>
                
                <TableCell>
                  <Box sx={{ maxWidth: 200 }}>
                    {product.description ? (
                      <Tooltip title={product.description}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.4
                          }}
                        >
                          {product.description}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        No description
                      </Typography>
                    )}
                    {product.tags.length > 0 && (
                      <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {product.tags.slice(0, 2).map((tag, tagIndex) => (
                          <Chip 
                            key={tagIndex}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.65rem',
                              height: '20px',
                              borderRadius: '10px'
                            }}
                          />
                        ))}
                        {product.tags.length > 2 && (
                          <Chip 
                            label={`+${product.tags.length - 2}`}
                            size="small"
                            color="primary"
                            sx={{ 
                              fontSize: '0.65rem',
                              height: '20px',
                              borderRadius: '10px'
                            }}
                          />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="Edit Product">
                      <IconButton 
                        size="small"
                        color="primary"
                        onClick={() => onEdit(product)}
                        sx={{ 
                          bgcolor: 'primary.50',
                          '&:hover': {
                            bgcolor: 'primary.100',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s'
                        }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small"
                        color="info"
                        onClick={() => onViewDetails(product)}
                        sx={{ 
                          bgcolor: 'info.50',
                          '&:hover': {
                            bgcolor: 'info.100',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s'
                        }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton 
                        size="small"
                        color="error"
                        onClick={() => onDelete(product.id)}
                        sx={{ 
                          bgcolor: 'error.50',
                          '&:hover': {
                            bgcolor: 'error.100',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s'
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      {/* Enhanced Pagination Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderTop: '1px solid rgba(224, 224, 224, 0.5)',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        {/* Pagination Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Showing {startIndex + 1}-{Math.min(endIndex, totalProducts)} of {totalProducts} products
          </Typography>
          
          <Divider orientation="vertical" flexItem sx={{ height: 20 }} />
          
          {/* Rows per page selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Rows per page:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={rowsPerPage}
                onChange={(e) => handleChangeRowsPerPage(e as React.ChangeEvent<HTMLInputElement>)}
                sx={{
                  '& .MuiSelect-select': {
                    py: 0.5,
                    fontSize: '0.875rem'
                  }
                }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Enhanced Pagination Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* First Page Button */}
          <Tooltip title="First Page">
            <span>
              <IconButton 
                onClick={() => setPage(0)}
                disabled={page === 0}
                size="small"
                sx={{
                  bgcolor: page === 0 ? 'transparent' : 'primary.50',
                  '&:hover': {
                    bgcolor: page === 0 ? 'transparent' : 'primary.100'
                  }
                }}
              >
                <FirstPage fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          {/* Previous Page Button */}
          <Tooltip title="Previous Page">
            <span>
              <IconButton 
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                size="small"
                sx={{
                  bgcolor: page === 0 ? 'transparent' : 'primary.50',
                  '&:hover': {
                    bgcolor: page === 0 ? 'transparent' : 'primary.100'
                  }
                }}
              >
                <KeyboardArrowLeft fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          {/* Page Numbers */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 1 }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i;
              } else if (page < 2) {
                pageNum = i;
              } else if (page > totalPages - 3) {
                pageNum = totalPages - 5 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setPage(pageNum)}
                  sx={{
                    minWidth: 36,
                    height: 32,
                    fontSize: '0.875rem',
                    fontWeight: pageNum === page ? 600 : 400,
                    ...(pageNum === page && {
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)'
                    })
                  }}
                >
                  {pageNum + 1}
                </Button>
              );
            })}
          </Box>

          {/* Next Page Button */}
          <Tooltip title="Next Page">
            <span>
              <IconButton 
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages - 1}
                size="small"
                sx={{
                  bgcolor: page >= totalPages - 1 ? 'transparent' : 'primary.50',
                  '&:hover': {
                    bgcolor: page >= totalPages - 1 ? 'transparent' : 'primary.100'
                  }
                }}
              >
                <KeyboardArrowRight fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          {/* Last Page Button */}
          <Tooltip title="Last Page">
            <span>
              <IconButton 
                onClick={() => setPage(totalPages - 1)}
                disabled={page >= totalPages - 1}
                size="small"
                sx={{
                  bgcolor: page >= totalPages - 1 ? 'transparent' : 'primary.50',
                  '&:hover': {
                    bgcolor: page >= totalPages - 1 ? 'transparent' : 'primary.100'
                  }
                }}
              >
                <LastPage fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </TableContainer>
  );
};
