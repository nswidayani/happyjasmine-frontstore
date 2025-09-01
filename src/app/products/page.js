'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Drawer, List, ListItem, ListItemButton, ListItemText, Chip, Button, Divider, Pagination, Stack } from '@mui/material';
import { FilterList as FilterIcon, Clear as ClearIcon, NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import Header from '../../components/Header';
import ProductDetail from '../../components/products/ProductDetail';
import { getProducts, getCategories, getProductsByCategory } from '../../lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const sidebarWidth = 280;
  const productsPerPage = 20;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async (categoryId = null, page = 1) => {
    setLoading(true);
    let result;

    const from = (page - 1) * productsPerPage;
    const to = from + productsPerPage - 1;

    if (categoryId) {
      result = await getProductsByCategory(categoryId, from, to);
    } else {
      result = await getProducts(from, to);
    }

    if (result.success) {
      setProducts(result.data || []);
      setTotalProducts(result.count || 0);
      setTotalPages(Math.ceil((result.count || 0) / productsPerPage));
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const result = await getCategories();
    if (result.success) {
      setCategories(result.data);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
    loadProducts(categoryId, 1);
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setCurrentPage(1); // Reset to first page when clearing filter
    loadProducts(null, 1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    loadProducts(selectedCategory, page);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center">Loading products...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Permanent Left Sidebar */}
        <Box
          sx={{
            width: { xs: 0, md: sidebarWidth },
            bgcolor: 'background.paper',
            borderRight: { xs: 'none', md: '1px solid' },
            borderColor: 'divider',
            position: { xs: 'relative', md: 'fixed' },
            left: { xs: 'auto', md: 0 },
            top: { xs: 'auto', md: 0 },
            bottom: { xs: 'auto', md: 0 },
            mt: { xs: 0, md: '64px' },
            overflowY: { xs: 'visible', md: 'auto' },
            zIndex: 1000,
            display: { xs: 'none', md: 'block' },
            boxShadow: { xs: 'none', md: '2px 0 8px rgba(0,0,0,0.1)' }
          }}
        >
          <Box sx={{ p: 3, height: '100%' }}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 1
                }}
              >
                Categories
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Filter products by category
              </Typography>
            </Box>

            {/* All Products Option */}
            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant={selectedCategory === null ? "contained" : "outlined"}
                onClick={() => handleCategorySelect(null)}
                sx={{
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 500,
                  boxShadow: selectedCategory === null ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                All Products
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Categories List */}
            <Box sx={{ flexGrow: 1 }}>
              {categories.length > 0 ? (
                <Stack spacing={1}>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      fullWidth
                      variant={selectedCategory === category.id ? "contained" : "text"}
                      onClick={() => handleCategorySelect(category.id)}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        fontWeight: 500,
                        minHeight: 'auto',
                        boxShadow: selectedCategory === category.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                        '&:hover': {
                          bgcolor: selectedCategory === category.id ? 'primary.dark' : 'action.hover',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }
                      }}
                    >
                      <Box sx={{ textAlign: 'left', width: '100%' }}>
                        <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                          {category.name}
                        </Typography>
                        {category.description && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              lineHeight: 1.2,
                              opacity: 0.8
                            }}
                          >
                            {category.description.length > 30
                              ? `${category.description.substring(0, 30)}...`
                              : category.description
                            }
                          </Typography>
                        )}
                      </Box>
                    </Button>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    No categories available
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Clear Filter Button */}
            {selectedCategory && (
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                <Button
                  fullWidth
                  variant="text"
                  startIcon={<ClearIcon />}
                  onClick={handleClearFilter}
                  sx={{
                    textTransform: 'none',
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  Clear Filter
                </Button>
              </Box>
            )}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            ml: { xs: 0, md: `${sidebarWidth}px` },
            py: 4,
            width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` }
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" sx={{ color: 'primary.main' }}>
                Our Products
              </Typography>
            </Box>

            {/* Mobile Category Filter */}
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 2
                }}
              >
                Filter by Category
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                <Button
                  variant={selectedCategory === null ? "contained" : "outlined"}
                  onClick={() => handleCategorySelect(null)}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    fontSize: '0.875rem',
                    boxShadow: selectedCategory === null ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  All Products
                </Button>

                {categories.slice(0, 5).map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "contained" : "outlined"}
                    onClick={() => handleCategorySelect(category.id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      fontSize: '0.875rem',
                      boxShadow: selectedCategory === category.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    {category.name}
                  </Button>
                ))}
              </Box>

              {selectedCategory && (
                <Button
                  variant="text"
                  startIcon={<ClearIcon />}
                  onClick={handleClearFilter}
                  sx={{
                    textTransform: 'none',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  Clear Filter
                </Button>
              )}
            </Box>

            {/* Active Filter Display */}
            {selectedCategory && (
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Filtered by:
                </Typography>
                <Chip
                  label={categories.find(cat => cat.id === selectedCategory)?.name || 'Category'}
                  onDelete={handleClearFilter}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}

            {/* Products Grid */}
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 3
                      }
                    }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg')}
                      alt={product.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description ? product.description.substring(0, 100) + '...' : 'No description available'}
                      </Typography>
                      {product.het_price && (
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          HET: {product.het_price}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {products.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  No products available in this category.
                </Typography>
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
                <Stack spacing={2}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 500,
                        '&.Mui-selected': {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }
                      }
                    }}
                  />
                </Stack>
              </Box>
            )}

            {/* Products count info */}
            {totalProducts > 0 && (
              <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
                </Typography>
              </Box>
            )}
          </Container>
        </Box>

        {/* Product Detail Modal/Dialog */}
        <ProductDetail
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={handleCloseDetail}
        />
      </Box>
    </>
  );
}
