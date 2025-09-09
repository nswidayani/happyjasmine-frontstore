'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { MyLocation as MyLocationIcon, Search as SearchIcon } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPickerMapbox = ({ latitude, longitude, onLocationChange, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [mapError, setMapError] = useState(null);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Initialize Mapbox map
  useEffect(() => {
    if (typeof window !== 'undefined' && mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here') {
      try {
        mapboxgl.accessToken = mapboxToken;

        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: longitude && latitude ? [longitude, latitude] : [106.8456, -6.2088], // Default to Jakarta
          zoom: longitude && latitude ? 15 : 10
        });

        mapRef.current = map;

        // Add navigation control
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add marker if coordinates provided
        if (longitude && latitude) {
          addMarker([longitude, latitude]);
        }

        // Handle map clicks
        map.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          addMarker([lng, lat]);
          onLocationChange(lat, lng);
        });

        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
          }
        };
      } catch (error) {
        console.error('Error initializing Mapbox:', error);
        setMapError('Failed to load map. Please check your Mapbox token.');
      }
    } else if (!mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') {
      setMapError('Mapbox access token not configured. Using fallback mode.');
    }
  }, [latitude, longitude, mapboxToken]);

  const addMarker = (coordinates) => {
    if (markerRef.current) {
      markerRef.current.remove();
    }

    const marker = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    markerRef.current = marker;

    // Center map on marker
    mapRef.current.flyTo({
      center: coordinates,
      zoom: 15
    });
  };

  const searchLocation = async () => {
    if (!searchQuery.trim() || !mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') return;

    setIsSearching(true);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxToken}&limit=5&country=id`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.features || []);
      } else {
        console.error('Mapbox search failed');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }

    setIsSearching(false);
  };

  const selectLocation = (feature) => {
    const [lng, lat] = feature.center;
    const coordinates = [lng, lat];

    // Add marker to map
    addMarker(coordinates);

    // Update parent component
    onLocationChange(lat, lng);
    onLocationSelect?.(feature);

    setSearchResults([]);
    setSearchQuery(feature.place_name);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          addMarker([lng, lat]);
          onLocationChange(lat, lng);
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get current location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Box>
      {/* Mapbox Status */}
      {mapError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {mapError}
        </Alert>
      )}

      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Location Search
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search for a location (e.g., Jakarta, Bandung)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            size="small"
          />
          <Button
            variant="contained"
            onClick={searchLocation}
            disabled={isSearching || !searchQuery.trim() || !mapboxToken || mapboxToken === 'pk.your_mapbox_token_here'}
            startIcon={isSearching ? <CircularProgress size={16} /> : <SearchIcon />}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
          <Button
            variant="outlined"
            onClick={getCurrentLocation}
            startIcon={<MyLocationIcon />}
          >
            Current
          </Button>
        </Box>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {searchResults.map((feature, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                onClick={() => selectLocation(feature)}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {feature.place_name.split(',')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.place_name}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      {/* Map Container */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Interactive Map
        </Typography>

        <Box
          ref={mapContainerRef}
          sx={{
            width: '100%',
            height: 400,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider'
          }}
        />

        {/* Coordinate Display */}
        {(latitude && longitude) && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Coordinates:</strong> {latitude}, {longitude}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
              Click on the map to set a new location
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MapPickerMapbox;