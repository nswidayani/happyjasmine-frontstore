'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Grid, Button, ImageList, ImageListItem } from '@mui/material';
import { Close as CloseIcon, PlayArrow as PlayIcon } from '@mui/icons-material';
import Image from 'next/image';

export default function ProductDetail({ product, open, onClose }) {
   const [selectedImage, setSelectedImage] = useState(0);

   if (!product) return null;

   // Debug logging
   console.log('ProductDetail - Product data:', product);
   console.log('ProductDetail - Images:', product.images);
   console.log('ProductDetail - Videos:', product.videos);
   console.log('ProductDetail - Thumbnail:', product.thumbnail);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ color: 'primary.main' }}>
            {product.title}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Grid container spacing={3}>
          {/* Images Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                height: 300,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 2,
                bgcolor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', product.images[selectedImage]);
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      console.error('Thumbnail failed to load:', product.thumbnail);
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : (
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'text.secondary',
                    p: 4
                  }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                      📷
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                      No Image Available
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.7 }}>
                      Product images will be added soon
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <ImageList cols={Math.min(product.images.length, 4)} gap={8}>
                {product.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid' : '2px solid transparent',
                      borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                      borderRadius: 1,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 4px 12px rgba(0, 95, 115, 0.2)'
                      }
                    }}
                    onClick={() => handleImageClick(index)}
                  >
                    <Box sx={{ position: 'relative', width: '100%', height: 80 }}>
                      <Image
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        fill
                        style={{
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          console.error('Thumbnail failed to load:', image);
                          e.target.src = '/placeholder.jpg';
                        }}
                      />
                    </Box>
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </Grid>

          {/* Details Section */}
          <Grid item xs={12} md={product.images && product.images.length > 0 ? 6 : 12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: 'primary.main' }}>
                Product Details
              </Typography>

              {product.description && (
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
              )}

              {product.nutrition_fact && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Nutrition Facts
                  </Typography>
                  <Typography variant="body2" sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1 }}>
                    {product.nutrition_fact}
                  </Typography>
                </Box>
              )}

              {product.het_price && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    HET: {product.het_price}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Videos Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              {product.videos && product.videos.length > 0 ? (
                <Grid container spacing={2}>
                  {product.videos.map((video, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          position: 'relative',
                          height: 200,
                          bgcolor: 'grey.200',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'grey.300',
                            transform: 'scale(1.02)',
                            boxShadow: 2
                          }
                        }}
                        onClick={() => {
                          try {
                            window.open(video, '_blank');
                          } catch (error) {
                            console.error('Failed to open video:', video, error);
                          }
                        }}
                      >
                        <PlayIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                          Video {index + 1}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box sx={{
                  height: 120,
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed',
                  borderColor: 'grey.300'
                }}>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                    🎥 No Videos Available
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.7 }}>
                    Videos will be added soon
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="contained" size="large">
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}