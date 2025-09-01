'use client';

import { useState, useEffect } from 'react';
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
  Chip,
  Alert,
  Switch,
  FormControlLabel,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { getAllCategories, createCategory, updateCategory, deleteCategory, uploadFileToStorage } from '../../lib/supabase';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    display_order: 0,
    is_active: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const result = await getAllCategories();
    if (result.success) {
      setCategories(result.data);
    } else {
      showAlert('Error loading categories: ' + result.error, 'error');
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name || '',
        description: category.description || '',
        image_url: category.image_url || '',
        display_order: category.display_order || 0,
        is_active: category.is_active ?? true
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        image_url: '',
        display_order: categories.length,
        is_active: true
      });
    }
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image_url: '',
      display_order: 0,
      is_active: true
    });
    setImageFile(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    const result = await uploadFileToStorage(file, 'categories');
    if (result.success) {
      setFormData(prev => ({ ...prev, image_url: result.url }));
      showAlert('Image uploaded successfully');
    } else {
      showAlert('Error uploading image: ' + result.error, 'error');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showAlert('Category name is required', 'error');
      return;
    }

    // Handle image upload if there's a new file
    if (imageFile) {
      await handleImageUpload(imageFile);
    }

    const categoryData = {
      ...formData,
      display_order: parseInt(formData.display_order) || 0
    };

    let result;
    if (editingCategory) {
      result = await updateCategory(editingCategory.id, categoryData);
    } else {
      result = await createCategory(categoryData);
    }

    if (result.success) {
      showAlert(`Category ${editingCategory ? 'updated' : 'created'} successfully`);
      loadCategories();
      handleCloseDialog();
    } else {
      showAlert('Error saving category: ' + result.error, 'error');
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? This will not delete associated products.')) {
      const result = await deleteCategory(categoryId);
      if (result.success) {
        showAlert('Category deleted successfully');
        loadCategories();
      } else {
        showAlert('Error deleting category: ' + result.error, 'error');
      }
    }
  };

  const handleToggleActive = async (categoryId, currentStatus) => {
    const result = await updateCategory(categoryId, { is_active: !currentStatus });
    if (result.success) {
      showAlert(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      loadCategories();
    } else {
      showAlert('Error updating category status: ' + result.error, 'error');
    }
  };

  if (loading) {
    return <Typography>Loading categories...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Categories Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Category
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
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Display Order</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {category.image_url ? (
                    <Avatar
                      src={category.image_url}
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.200' }}>
                      <CategoryIcon />
                    </Avatar>
                  )}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {category.description ? category.description.substring(0, 50) + '...' : 'No description'}
                </TableCell>
                <TableCell>{category.display_order}</TableCell>
                <TableCell>
                  <Chip
                    label={category.is_active ? 'Active' : 'Inactive'}
                    color={category.is_active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(category)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {categories.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No categories found. Click "Add Category" to create your first category.
          </Typography>
        </Box>
      )}

      {/* Category Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                multiline
                rows={3}
                variant="outlined"
                placeholder="Describe this category..."
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Display Order"
                type="number"
                value={formData.display_order}
                onChange={(e) => handleInputChange('display_order', e.target.value)}
                variant="outlined"
                helperText="Lower numbers appear first"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                  />
                }
                label="Active"
              />
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Category Image
              </Typography>

              {formData.image_url && (
                <Box sx={{ mb: 2 }}>
                  <Avatar
                    src={formData.image_url}
                    sx={{ width: 80, height: 80, mr: 2 }}
                  />
                  <IconButton
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}

              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      handleImageUpload(file);
                    }
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={uploading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={uploading || !formData.name.trim()}
          >
            {uploading ? 'Saving...' : 'Save Category'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}