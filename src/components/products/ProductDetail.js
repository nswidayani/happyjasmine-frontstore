'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, Grid, Button, ImageList, ImageListItem } from '@mui/material';
import { Close as CloseIcon, PlayArrow as PlayIcon } from '@mui/icons-material';
import Image from 'next/image';

export default function ProductDetail({ product, open, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

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
          {product.images && product.images.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ position: 'relative', width: '100%', height: 300, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.title}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Box>

              {product.images.length > 1 && (
                <ImageList cols={product.images.length > 4 ? 4 : product.images.length} gap={8}>
                  {product.images.map((image, index) => (
                    <ImageListItem
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        border: selectedImage === index ? '2px solid' : '2px solid transparent',
                        borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                        borderRadius: 1,
                        overflow: 'hidden'
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
                        />
                      </Box>
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
            </Grid>
          )}

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
            {product.videos && product.videos.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Videos
                </Typography>
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
                          '&:hover': { bgcolor: 'grey.300' }
                        }}
                        onClick={() => window.open(video, '_blank')}
                      >
                        <PlayIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Video {index + 1}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
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