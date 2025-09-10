'use client';

'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Chip, Avatar, Tooltip, CircularProgress } from '@mui/material';
import { Factory as FactoryIcon, Business as BusinessIcon, LocalShipping as LocalShippingIcon, Store as StoreIcon, Map as MapIcon } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { getLocations } from '../lib/supabase';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Import Icon synchronously since it's just a utility
let leafletIcon = null;
if (typeof window !== 'undefined') {
  try {
    const { Icon } = require('leaflet');
    leafletIcon = Icon;
  } catch (e) {
    console.warn('Leaflet Icon not available');
  }
}

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

const LocationsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-6.2088, 106.8456]); // Jakarta coordinates [lat, lng]
  const [mapZoom, setMapZoom] = useState(10);

  // Load locations on component mount
  useEffect(() => {
    loadLocations();
  }, []);

  // Category configuration with icons and colors
  const categoryConfig = {
    'Pabrik': {
      icon: FactoryIcon,
      color: '#1976d2',
      bgColor: '#e3f2fd'
    },
    'Supplier': {
      icon: BusinessIcon,
      color: '#7b1fa2',
      bgColor: '#f3e5f5'
    },
    'Dropshipper': {
      icon: LocalShippingIcon,
      color: '#f57c00',
      bgColor: '#fff3e0'
    },
    'Toko': {
      icon: StoreIcon,
      color: '#388e3c',
      bgColor: '#e8f5e8'
    }
  };

  useEffect(() => {
    loadLocations();
  }, []);

  // Calculate map center and zoom based on locations
  useEffect(() => {
    if (locations.length > 0) {
      // Calculate center point from all locations
      let totalLat = 0;
      let totalLng = 0;
      let validLocations = 0;

      locations.forEach(location => {
        if (location.latitude && location.longitude) {
          totalLat += location.latitude;
          totalLng += location.longitude;
          validLocations++;
        }
      });

      if (validLocations > 0) {
        const centerLat = totalLat / validLocations;
        const centerLng = totalLng / validLocations;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(locations.length === 1 ? 15 : 10);
      }
    }
  }, [locations]);

  const loadLocations = async () => {
    try {
      const result = await getLocations();
      if (result.success) {
        setLocations(result.data);
      } else {
        console.error('Error loading locations:', result.error);
        setLocations([]);
      }
    } catch (error) {
      console.error('Error loading locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // Create custom marker icon
  const createCustomIcon = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    if (!leafletIcon) return null;

    return new leafletIcon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="${config.bgColor}" stroke="${config.color}" stroke-width="3"/>
          <circle cx="20" cy="15" r="6" fill="${config.color}"/>
          <rect x="18" y="21" width="4" height="8" fill="${config.color}"/>
        </svg>
      `)}`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  // Location marker component
  const LocationMarker = ({ location, onMarkerClick }) => {
    const config = categoryConfig[location.category] || categoryConfig['Toko'];

    return (
      <Marker
        position={[location.latitude, location.longitude]}
        icon={createCustomIcon(location.category)}
        eventHandlers={{
          click: () => onMarkerClick(location),
        }}
      >
        <Popup>
          <div style={{ padding: '8px', maxWidth: '200px' }}>
            <h4 style={{
              margin: '0 0 4px 0',
              color: config.color,
              fontSize: '14px',
              fontWeight: 600
            }}>
              {location.name}
            </h4>
            <p style={{
              margin: '0 0 4px 0',
              fontSize: '12px',
              color: '#666'
            }}>
              {location.category}
            </p>
            {location.description && (
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: '#666'
              }}>
                {location.description}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

  const getCategoryIcon = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    const IconComponent = config.icon;
    return <IconComponent sx={{ color: config.color }} />;
  };

  const getCategoryColor = (category) => {
    const config = categoryConfig[category] || categoryConfig['Toko'];
    return config.color;
  };

  // This function is no longer needed with React-Leaflet

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading locations...</Typography>
      </Box>
    );
  }

  if (locations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <MapIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No locations available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Business locations will appear here once added in the admin panel.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Map Container */}
      <Paper
        sx={{
          height: 400,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        {loading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50'
            }}
          >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1">Loading locations...</Typography>
          </Box>
        ) : locations.length === 0 ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50',
              p: 3
            }}
          >
            <MapIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No locations available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Business locations will appear here once added in the admin panel.
            </Typography>
          </Box>
        ) : (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((location) => (
              location.latitude && location.longitude && (
                <LocationMarker
                  key={location.id}
                  location={location}
                  onMarkerClick={(loc) => setSelectedLocation(loc)}
                />
              )
            ))}
          </MapContainer>
        )}
      </Paper>

      {/* Location List */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          <MapIcon />
          Our Locations
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {locations.map((location, index) => (
            <Tooltip
              key={location.id}
              title={
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {location.name}
                  </Typography>
                  <Typography variant="caption">
                    {location.description || 'No description'}
                  </Typography>
                  <Typography variant="caption" display="block">
                    Lat: {location.latitude?.toFixed(6)}, Lng: {location.longitude?.toFixed(6)}
                  </Typography>
                </Box>
              }
              arrow
            >
              <Chip
                icon={getCategoryIcon(location.category)}
                label={`${location.name} (${location.category})`}
                variant={selectedLocation?.id === location.id ? "filled" : "outlined"}
                sx={{
                  bgcolor: selectedLocation?.id === location.id ? getCategoryColor(location.category) : 'transparent',
                  color: selectedLocation?.id === location.id ? 'white' : getCategoryColor(location.category),
                  borderColor: getCategoryColor(location.category),
                  '&:hover': {
                    bgcolor: getCategoryColor(location.category),
                    color: 'white'
                  },
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setSelectedLocation(location);
                  // The map will automatically update via the selectedLocation state
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Paper sx={{ mt: 2, p: 2, bgcolor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: getCategoryColor(selectedLocation.category) }}>
              {getCategoryIcon(selectedLocation.category)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: getCategoryColor(selectedLocation.category) }}>
                {selectedLocation.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedLocation.category}
              </Typography>
              {selectedLocation.description && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {selectedLocation.description}
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default LocationsMap;