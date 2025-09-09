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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Card,
  CardContent,
  Divider,
  Stack,
  Tooltip,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Map as MapIcon,
  Business as BusinessIcon,
  LocalShipping as LocalShippingIcon,
  Store as StoreIcon,
  Factory as FactoryIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../../lib/supabase';
import MapPicker from './MapPicker';

const locationCategories = [
  {
    value: 'Pabrik',
    label: 'Factory',
    description: 'Manufacturing facility or production plant',
    icon: <FactoryIcon />,
    color: 'primary'
  },
  {
    value: 'Supplier',
    label: 'Supplier',
    description: 'Raw material or component supplier',
    icon: <BusinessIcon />,
    color: 'secondary'
  },
  {
    value: 'Dropshipper',
    label: 'Dropshipper',
    description: 'Third-party logistics and shipping partner',
    icon: <LocalShippingIcon />,
    color: 'warning'
  },
  {
    value: 'Toko',
    label: 'Store',
    description: 'Retail store or sales outlet',
    icon: <StoreIcon />,
    color: 'success'
  }
];

export default function LocationsAdmin() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    category: ''
  });

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    const result = await getLocations();
    if (result.success) {
      setLocations(result.data);
    } else {
      showAlert('Error loading locations: ' + result.error, 'error');
    }
    setLoading(false);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = (location = null) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        name: location.name || '',
        description: location.description || '',
        latitude: location.latitude?.toString() || '',
        longitude: location.longitude?.toString() || '',
        category: location.category || ''
      });
    } else {
      setEditingLocation(null);
      setFormData({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        category: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingLocation(null);
    setFormData({
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      category: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleSave = async () => {
    if (!formData.name.trim()) {
      showAlert('Name is required', 'error');
      return;
    }
    if (!formData.latitude || !formData.longitude) {
      showAlert('Latitude and longitude are required', 'error');
      return;
    }
    if (!formData.category) {
      showAlert('Category is required', 'error');
      return;
    }

    const locationData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };

    let result;
    if (editingLocation) {
      result = await updateLocation(editingLocation.id, locationData);
    } else {
      result = await createLocation(locationData);
    }

    if (result.success) {
      showAlert(`Location ${editingLocation ? 'updated' : 'created'} successfully`);
      loadLocations();
      handleCloseDialog();
    } else {
      showAlert('Error saving location: ' + result.error, 'error');
    }
  };

  const handleDelete = async (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const result = await deleteLocation(locationId);
      if (result.success) {
        showAlert('Location deleted successfully');
        loadLocations();
      } else {
        showAlert('Error deleting location: ' + result.error, 'error');
      }
    }
  };

  const getCategoryInfo = (categoryValue) => {
    return locationCategories.find(cat => cat.value === categoryValue) || locationCategories[0];
  };

  const getCategoryColor = (category) => {
    const categoryInfo = getCategoryInfo(category);
    return categoryInfo.color;
  };

  if (loading) {
    return <Typography>Loading locations...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Locations Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Location
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.severity} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Location Name</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Business Type</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Coordinates</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationIcon color="primary" />
                    <Typography variant="body1" fontWeight={500}>
                      {location.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getCategoryInfo(location.category).icon}
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {getCategoryInfo(location.category).label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {location.category}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {location.latitude?.toFixed(6)}, {location.longitude?.toFixed(6)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {location.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(location)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(location.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {locations.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <LocationIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No locations found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Start building your business network by adding your first location.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            size="large"
          >
            Add Your First Location
          </Button>
        </Box>
      )}

      {/* Location Form Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Box>
              <Typography variant="h5" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {editingLocation ? 'Update location details and coordinates' : 'Create a new business location with precise coordinates'}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <Box sx={{ mb: 3 }}>
            {/* Basic Information Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <InfoIcon />
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Location Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    variant="outlined"
                    placeholder="e.g., Main Factory Jakarta"
                    error={!formData.name.trim() && formData.name !== undefined}
                    helperText={!formData.name.trim() && formData.name !== undefined ? 'Location name is required' : ''}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth variant="outlined" error={!formData.category}>
                    <InputLabel>Business Type</InputLabel>
                    <Select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      label="Business Type"
                      required
                    >
                      {locationCategories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            {category.icon}
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {category.label}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {category.description}
                              </Typography>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {!formData.category && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        Please select a business type
                      </Typography>
                    )}
                  </FormControl>
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
                    placeholder="Provide details about this location, operating hours, contact information, etc."
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Category Selection Cards */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
                Quick Category Selection
              </Typography>

              <Grid container spacing={2}>
                {locationCategories.map((category) => (
                  <Grid item xs={12} sm={6} md={3} key={category.value}>
                    <Card
                      sx={{
                        cursor: 'pointer',
                        border: formData.category === category.value ? '2px solid' : '1px solid',
                        borderColor: formData.category === category.value ? 'primary.main' : 'divider',
                        bgcolor: formData.category === category.value ? 'primary.light' : 'background.paper',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        }
                      }}
                      onClick={() => handleInputChange('category', category.value)}
                    >
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Box sx={{ color: 'primary.main', mb: 1 }}>
                          {category.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
                          {category.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          {category.description}
                        </Typography>
                        {formData.category === category.value && (
                          <CheckIcon sx={{ color: 'primary.main', mt: 1 }} />
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Location & Map Section */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MapIcon />
                Location & Coordinates
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>How to set coordinates:</strong> Search for a location, click on the map, or use your current location. You can also drag the marker to adjust the exact position.
                </Typography>
              </Alert>

              <MapPicker
                latitude={formData.latitude ? parseFloat(formData.latitude) : null}
                longitude={formData.longitude ? parseFloat(formData.longitude) : null}
                onLocationChange={(lat, lng) => {
                  handleInputChange('latitude', lat.toString());
                  handleInputChange('longitude', lng.toString());
                }}
                onLocationSelect={(locationData) => {
                  console.log('Selected location:', locationData);
                }}
              />

              {/* Coordinate Validation */}
              {(!formData.latitude || !formData.longitude) && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <ErrorIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    Please set the location coordinates using the map above.
                  </Typography>
                </Alert>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name.trim() || !formData.latitude || !formData.longitude || !formData.category}
            sx={{
              minWidth: 120,
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            {editingLocation ? 'Update Location' : 'Create Location'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}