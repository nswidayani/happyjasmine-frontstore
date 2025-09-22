'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardMedia,
  Chip,
  Alert,
  Tabs,
  Tab,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Divider,
  Avatar,
  Stack,
  Tooltip,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  PhotoCamera as CameraIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  CloudUpload as UploadIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadFileToStorage, getCategories } from '../../lib/supabase';
import Image from 'next/image';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nutrition_fact: '',
    het_price: '',
    thumbnail: '',
    category_id: '',
    images: [],
    videos: []
  });
  const [nutritionFactFile, setNutritionFactFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState('');

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = useCallback(async () => {
    const result = await getProducts();
    if (result.success) {
      setProducts(result.data);
    } else {
      console.error('Error loading products:', result.error);
    }
    setLoading(false);
  }, []);

  const loadCategories = useCallback(async () => {
    const result = await getCategories();
    if (result.success) {
      setCategories(result.data);
    } else {
      console.error('Error loading categories:', result.error);
    }
  }, []);

  const showAlert = useCallback((message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  }, []);

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title || '',
        description: product.description || '',
        nutrition_fact: product.nutrition_fact || '',
        het_price: product.het_price || '',
        thumbnail: product.thumbnail || '',
        category_id: product.category_id || '',
        images: product.images || [],
        videos: product.videos || []
      });
      setSelectedThumbnail(product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : ''));
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        nutrition_fact: '',
        het_price: '',
        thumbnail: '',
        images: [],
        videos: []
      });
      setSelectedThumbnail('');
    }
    setImageFiles([]);
    setVideoFiles([]);
    setNutritionFactFile(null);
    setActiveTab(0);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    setFormData({
      title: '',
      description: '',
      nutrition_fact: '',
      het_price: '',
      thumbnail: '',
      category_id: '',
      images: [],
      videos: []
    });
    setImageFiles([]);
    setVideoFiles([]);
    setNutritionFactFile(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (type, files) => {
    if (type === 'images') {
      setImageFiles(Array.from(files));
    } else {
      setVideoFiles(Array.from(files));
    }
  };

  const uploadFiles = async () => {
    setUploading(true);
    const uploadedImages = [];
    const uploadedVideos = [];

    // Upload images
    for (const file of imageFiles) {
      const result = await uploadFileToStorage(file, 'products');
      if (result.success) {
        uploadedImages.push(result.url);
      } else {
        showAlert('Error uploading image: ' + result.error, 'error');
      }
    }

    // Upload videos
    for (const file of videoFiles) {
      const result = await uploadFileToStorage(file, 'products');
      if (result.success) {
        uploadedVideos.push(result.url);
      } else {
        showAlert('Error uploading video: ' + result.error, 'error');
      }
    }

    setUploading(false);
    return { images: uploadedImages, videos: uploadedVideos };
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      showAlert('Title is required', 'error');
      return;
    }

    setUploading(true);

    // Upload new files
    if (imageFiles.length > 0) {
      await handleImageUpload(imageFiles);
    }
    if (videoFiles.length > 0) {
      await handleVideoUpload(videoFiles);
    }
    if (nutritionFactFile) {
      await handleNutritionFactUpload(nutritionFactFile);
    }

    const productData = {
      ...formData,
      thumbnail: selectedThumbnail || (formData.images.length > 0 ? formData.images[0] : '')
    };

    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, productData);
    } else {
      result = await createProduct(productData);
    }

    if (result.success) {
      showAlert(`Product ${editingProduct ? 'updated' : 'created'} successfully`);
      loadProducts();
      handleCloseDialog();
    } else {
      showAlert('Error saving product: ' + result.error, 'error');
    }

    setUploading(false);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const result = await deleteProduct(productId);
      if (result.success) {
        showAlert('Product deleted successfully');
        loadProducts();
      } else {
        showAlert('Error deleting product: ' + result.error, 'error');
      }
    }
  };

  const removeMedia = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const setAsThumbnail = (imageUrl) => {
    setFormData(prev => ({ ...prev, thumbnail: imageUrl }));
    setSelectedThumbnail(imageUrl);
  };

  const handleImageUpload = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const result = await uploadFileToStorage(file, 'products');
      if (result.success) {
        uploadedUrls.push(result.url);
      } else {
        showAlert('Error uploading image: ' + result.error, 'error');
      }
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedUrls]
    }));

    // Auto-set first uploaded image as thumbnail if none selected
    if (!selectedThumbnail && uploadedUrls.length > 0) {
      setAsThumbnail(uploadedUrls[0]);
    }

    setUploading(false);
  };

  const handleVideoUpload = async (files) => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    for (const file of files) {
      const result = await uploadFileToStorage(file, 'products');
      if (result.success) {
        uploadedUrls.push(result.url);
      } else {
        showAlert('Error uploading video: ' + result.error, 'error');
      }
    }

    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, ...uploadedUrls]
    }));

    setUploading(false);
  };

  const handleNutritionFactUpload = async (file) => {
    setUploading(true);
    const result = await uploadFileToStorage(file, 'products');
    if (result.success) {
      setFormData(prev => ({
        ...prev,
        nutrition_fact: result.url
      }));
    } else {
      showAlert('Error uploading nutrition fact image: ' + result.error, 'error');
    }
    setUploading(false);
  };

  if (loading) {
    return <Typography>Loading products...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Product
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>HET Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.thumbnail || (product.images && product.images.length > 0) ? (
                    <Box sx={{ position: 'relative', width: 60, height: 60, borderRadius: 1, overflow: 'hidden' }}>
                      <Image
                        src={product.thumbnail || product.images[0]}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ width: 60, height: 60, bgcolor: 'grey.200', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImageIcon />
                    </Box>
                  )}
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {product.description ? product.description.substring(0, 50) + '...' : 'No description'}
                </TableCell>
                <TableCell>{product.het_price || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found. Click 'Add Product' to create your first product.
          </Typography>
        </Box>
      )}

      {/* Product Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </Typography>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ px: 3 }}>
            <Tab label="Basic Info" />
            <Tab label="Media" />
            <Tab label="Details" />
          </Tabs>
        </Box>

        <DialogContent sx={{ minHeight: 500 }}>
          {/* Tab 1: Basic Information */}
          {activeTab === 0 && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Describe your product..."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="HET Price"
                    value={formData.het_price}
                    onChange={(e) => handleInputChange('het_price', e.target.value)}
                    variant="outlined"
                    placeholder="e.g., Rp 25.000"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category_id}
                      onChange={(e) => handleInputChange('category_id', e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>No Category</em>
                      </MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Select a category for this product
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Nutrition Facts Image
                    </Typography>
                    {formData.nutrition_fact ? (
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                          <Image
                            src={formData.nutrition_fact}
                            alt="Nutrition Facts"
                            width={200}
                            height={150}
                            style={{ objectFit: 'contain', border: '1px solid #ccc', borderRadius: 4 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => setFormData(prev => ({ ...prev, nutrition_fact: '' }))}
                            sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'error.main', color: 'white' }}
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    ) : null}
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading}
                      fullWidth
                    >
                      {uploading ? <CircularProgress size={20} /> : 'Upload Nutrition Facts Image'}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => setNutritionFactFile(e.target.files[0])}
                      />
                    </Button>
                    {nutritionFactFile && (
                      <Button
                        variant="contained"
                        onClick={() => handleNutritionFactUpload(nutritionFactFile)}
                        disabled={uploading}
                        sx={{ mt: 1 }}
                        fullWidth
                      >
                        {uploading ? 'Uploading...' : 'Upload Selected Image'}
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Tab 2: Media Management */}
          {activeTab === 1 && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                {/* Thumbnail Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Default Thumbnail
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    {selectedThumbnail ? (
                      <Box sx={{ position: 'relative' }}>
                        <Avatar
                          src={selectedThumbnail}
                          sx={{ width: 80, height: 80, border: '2px solid', borderColor: 'primary.main' }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => setAsThumbnail('')}
                          sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'error.main', color: 'white' }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ width: 80, height: 80, border: '2px dashed', borderColor: 'grey.300', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon sx={{ color: 'grey.400' }} />
                      </Box>
                    )}
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Select an image below to set as thumbnail
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Images Upload and Management */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Product Images
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading}
                    >
                      {uploading ? <CircularProgress size={20} /> : 'Upload Images'}
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={(e) => setImageFiles(Array.from(e.target.files))}
                      />
                    </Button>
                    {imageFiles.length > 0 && (
                      <Button
                        variant="contained"
                        onClick={() => handleImageUpload(imageFiles)}
                        disabled={uploading}
                        sx={{ ml: 2 }}
                      >
                        {uploading ? 'Uploading...' : 'Upload Selected'}
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {formData.images.map((image, index) => (
                      <Card key={index} sx={{ width: 120, position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={image}
                          alt={`Product image ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
                          <IconButton
                            size="small"
                            onClick={() => setAsThumbnail(image)}
                            sx={{
                              bgcolor: selectedThumbnail === image ? 'primary.main' : 'rgba(255,255,255,0.8)',
                              color: selectedThumbnail === image ? 'white' : 'black',
                              mr: 1
                            }}
                          >
                            {selectedThumbnail === image ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => removeMedia('images', index)}
                            sx={{ bgcolor: 'rgba(255,255,255,0.8)' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Grid>

                {/* Videos Upload and Management */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Product Videos
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadIcon />}
                      disabled={uploading}
                    >
                      {uploading ? <CircularProgress size={20} /> : 'Upload Videos'}
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        hidden
                        onChange={(e) => setVideoFiles(Array.from(e.target.files))}
                      />
                    </Button>
                    {videoFiles.length > 0 && (
                      <Button
                        variant="contained"
                        onClick={() => handleVideoUpload(videoFiles)}
                        disabled={uploading}
                        sx={{ ml: 2 }}
                      >
                        {uploading ? 'Uploading...' : 'Upload Selected'}
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.videos.map((video, index) => (
                      <Chip
                        key={index}
                        label={`Video ${index + 1}`}
                        onDelete={() => removeMedia('videos', index)}
                        icon={<VideoIcon />}
                        variant="outlined"
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Tab 3: Preview */}
          {activeTab === 2 && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                Product Preview
              </Typography>

              <Card sx={{ maxWidth: 400, mx: 'auto' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedThumbnail || (formData.images && formData.images.length > 0 ? formData.images[0] : '/placeholder.jpg')}
                  alt={formData.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {formData.title || 'Product Title'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {formData.description || 'Product description will appear here...'}
                  </Typography>
                  {formData.het_price && (
                    <Typography variant="h6" color="primary">
                      HET: {formData.het_price}
                    </Typography>
                  )}
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Chip size="small" label={`${formData.images.length} images`} />
                    <Chip size="small" label={`${formData.videos.length} videos`} />
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={uploading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={uploading || !formData.title.trim()}
            sx={{ minWidth: 100 }}
          >
            {uploading ? <CircularProgress size={20} color="inherit" /> : 'Save Product'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}