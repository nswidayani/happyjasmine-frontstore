'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { MyLocation as MyLocationIcon, Search as SearchIcon } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapPicker = ({ latitude, longitude, onLocationChange, onLocationSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
          zoom: longitude && latitude ? 15 : 10,
          attributionControl: false
        });

        mapRef.current = map;

        // Add navigation control
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Add geolocate control
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: false,
            showUserHeading: true
          })
        );

        map.on('load', () => {
          setMapLoaded(true);

          // Add marker if coordinates provided
          if (longitude && latitude) {
            addDraggableMarker([longitude, latitude]);
          }
        });

        // Handle map clicks
        map.on('click', (e) => {
          const { lng, lat } = e.lngLat;
          addDraggableMarker([lng, lat]);
          onLocationChange(lat, lng);
        });

        return () => {
          if (mapRef.current) {
            mapRef.current.remove();
          }
        };
      } catch (error) {
        console.error('Error initializing Mapbox:', error);
        setMapError('Failed to load interactive map. Please check your Mapbox token.');
        // Fallback to simple visualization
        showFallbackMap();
      }
    } else if (!mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') {
      setMapError('Mapbox access token not configured. Using basic map mode.');
      showFallbackMap();
    } else {
      showFallbackMap();
    }
  }, [latitude, longitude, mapboxToken]);

  const addDraggableMarker = (coordinates) => {
    if (markerRef.current) {
      markerRef.current.remove();
    }

    // Create a custom marker element
    const markerElement = document.createElement('div');
    markerElement.innerHTML = `
      <div style="
        width: 30px;
        height: 30px;
        background: #ff4444;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: move;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      ">📍</div>
    `;

    const marker = new mapboxgl.Marker({
      element: markerElement,
      draggable: true,
      anchor: 'bottom'
    })
      .setLngLat(coordinates)
      .addTo(mapRef.current);

    markerRef.current = marker;

    // Handle drag events
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      onLocationChange(lngLat.lat, lngLat.lng);
    });

    // Center map on marker
    mapRef.current.flyTo({
      center: coordinates,
      zoom: 15,
      duration: 1000
    });
  };

  const showFallbackMap = () => {
    if (mapContainerRef.current) {
      if (latitude && longitude) {
        mapContainerRef.current.innerHTML = `
          <div style="
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: 2px solid #2196f3;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              color: #1976d2;
              font-weight: 500;
            ">
              <div style="font-size: 48px; margin-bottom: 8px;">📍</div>
              <div>Latitude: ${latitude}</div>
              <div>Longitude: ${longitude}</div>
              <div style="font-size: 12px; margin-top: 8px; opacity: 0.7;">
                Map integration ready for Mapbox API
              </div>
            </div>
          </div>
        `;
      } else {
        mapContainerRef.current.innerHTML = `
          <div style="
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border: 2px dashed #bdbdbd;
            cursor: pointer;
          " onclick="document.querySelector('[data-testid=current-location-btn]')?.click()">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              color: #757575;
              font-weight: 500;
            ">
              <div style="font-size: 48px; margin-bottom: 8px;">🗺️</div>
              <div>No location selected</div>
              <div style="font-size: 12px; margin-top: 8px; opacity: 0.7;">
                Click here or search for a location above
              </div>
            </div>
          </div>
        `;
      }
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);

    try {
      if (mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here') {
        // Use Mapbox Geocoding API
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
      } else {
        // Fallback to Nominatim
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&countrycodes=id`
        );

        if (response.ok) {
          const results = await response.json();
          setSearchResults(results);
        } else {
          console.error('Geocoding search failed');
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }

    setIsSearching(false);
  };

  const selectLocation = (result) => {
    let lat, lng, name;

    if (result.center) {
      // Mapbox format
      [lng, lat] = result.center;
      name = result.place_name;
    } else {
      // Nominatim format
      lat = parseFloat(result.lat);
      lng = parseFloat(result.lon);
      name = result.display_name;
    }

    setSelectedLocation({
      name: name,
      latitude: lat,
      longitude: lng
    });

    // Update parent component
    onLocationChange(lat, lng);
    onLocationSelect?.(result);

    // Add/update marker on interactive map
    if (mapRef.current && mapLoaded) {
      addDraggableMarker([lng, lat]);
    } else {
      // Fallback for non-interactive map
      showFallbackMap();
    }

    setSearchResults([]);
    setSearchQuery(name);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setSelectedLocation({
            name: 'Current Location',
            latitude: lat,
            longitude: lng
          });

          onLocationChange(lat, lng);

          // Add marker on interactive map
          if (mapRef.current && mapLoaded) {
            addDraggableMarker([lng, lat]);
          } else {
            // Fallback for non-interactive map
            showFallbackMap();
          }
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to get current location. Please check your browser permissions.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <Box>
      {/* Mapbox Status/Error */}
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
            disabled={isSearching || !searchQuery.trim()}
            startIcon={isSearching ? <CircularProgress size={16} /> : <SearchIcon />}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
          <Button
            variant="outlined"
            onClick={getCurrentLocation}
            startIcon={<MyLocationIcon />}
            data-testid="current-location-btn"
          >
            Current
          </Button>
        </Box>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {searchResults.map((result, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
                onClick={() => selectLocation(result)}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {result.place_name ? result.place_name.split(',')[0] : result.display_name.split(',')[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {result.place_name || result.display_name}
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Paper>

      {/* Interactive Map */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
          Interactive Map
          {mapLoaded && (
            <Typography variant="caption" sx={{ ml: 1, color: 'success.main' }}>
              • Drag the marker to adjust location
            </Typography>
          )}
        </Typography>

        <Box
          ref={mapContainerRef}
          sx={{
            width: '100%',
            height: 400,
            borderRadius: 1,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            position: 'relative'
          }}
        >
          {!mapLoaded && !mapError && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255,255,255,0.8)',
                zIndex: 1000
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading map...</Typography>
            </Box>
          )}
        </Box>

        {/* Instructions */}
        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ color: 'info.contrastText', fontWeight: 500 }}>
            📍 How to use:
          </Typography>
          <Typography variant="body2" sx={{ color: 'info.contrastText', mt: 0.5 }}>
            • Click on the map to place a marker
            • Drag the marker to adjust the exact location
            • Use search above to find specific places
            • Click "Current" to use your current location
          </Typography>
        </Box>

        {/* Coordinate Display */}
        {(latitude && longitude) && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              <strong>Coordinates:</strong> {latitude}, {longitude}
            </Typography>
            {selectedLocation && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Location:</strong> {selectedLocation.name}
              </Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default MapPicker;