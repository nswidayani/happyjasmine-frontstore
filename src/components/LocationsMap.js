'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button, Chip, Avatar, Tooltip, CircularProgress } from '@mui/material';
import { Factory as FactoryIcon, Business as BusinessIcon, LocalShipping as LocalShippingIcon, Store as StoreIcon, Map as MapIcon } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getLocations } from '../lib/supabase';

const LocationsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isContainerReady, setIsContainerReady] = useState(false);

  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Debug: Log token status and validate token
  useEffect(() => {
    console.log('LocationsMap: Component mounted');
    console.log('LocationsMap: Token available:', !!mapboxToken);
    console.log('LocationsMap: Token value:', mapboxToken ? mapboxToken.substring(0, 10) + '...' : 'undefined');
    console.log('LocationsMap: Token starts with pk.:', mapboxToken ? mapboxToken.startsWith('pk.') : false);
    console.log('LocationsMap: Token length:', mapboxToken ? mapboxToken.length : 0);

    // Test token validity
    if (mapboxToken && mapboxToken.startsWith('pk.')) {
      console.log('LocationsMap: Testing token validity...');
      // Test with a simple geocoding request
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/jakarta.json?access_token=${mapboxToken}&limit=1`)
        .then(response => {
          console.log('LocationsMap: Token validation response:', response.status, response.statusText);
          if (response.status === 401) {
            console.error('LocationsMap: Token is invalid or unauthorized');
            setMapError('Mapbox token is invalid. Please check your Mapbox access token.');
          } else if (response.status === 403) {
            console.error('LocationsMap: Token is forbidden');
            setMapError('Mapbox token access forbidden. Please check your token permissions.');
          } else if (!response.ok) {
            console.error('LocationsMap: Token validation failed with status:', response.status);
            setMapError(`Mapbox API error (${response.status}). Please check your token and account.`);
          } else {
            console.log('LocationsMap: Token appears to be valid');
          }
        })
        .catch(error => {
          console.error('LocationsMap: Token validation network error:', error);
          setMapError('Network error validating Mapbox token. Please check your internet connection.');
        });
    } else if (mapboxToken && !mapboxToken.startsWith('pk.')) {
      console.error('LocationsMap: Token does not start with pk.');
      setMapError('Mapbox token format is incorrect. It should start with "pk."');
    }
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

  // Monitor container readiness and visibility
  useEffect(() => {
    if (mapContainerRef.current) {
      const checkContainerReady = () => {
        const rect = mapContainerRef.current.getBoundingClientRect();
        const isReady = rect.width > 0 && rect.height > 0;
        setIsContainerReady(isReady);

        if (!isReady) {
          // Check again in a short delay
          setTimeout(checkContainerReady, 100);
        }
      };

      checkContainerReady();

      // Set up IntersectionObserver to detect when container becomes visible
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log('LocationsMap: Container became visible');
              checkContainerReady();
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );

      intersectionObserver.observe(mapContainerRef.current);

      // Also set up a MutationObserver to watch for style changes
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            checkContainerReady();
          }
        });
      });

      mutationObserver.observe(mapContainerRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });

      return () => {
        intersectionObserver.disconnect();
        mutationObserver.disconnect();
      };
    }
  }, []);

  // Handle window resize to ensure map resizes properly
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current && isContainerReady) {
        console.log('LocationsMap: Resizing map');
        mapRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Also handle orientation change on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 100);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [isContainerReady]);

  useEffect(() => {
    console.log('LocationsMap: Initializing with token:', mapboxToken ? 'Present' : 'Missing');
    console.log('LocationsMap: Locations count:', locations.length);
    console.log('LocationsMap: Container ready:', isContainerReady);

    if (locations.length > 0 && mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here' && isContainerReady) {
      console.log('LocationsMap: All conditions met, initializing Mapbox map');
      initializeMap();
    } else if (locations.length > 0 && mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here' && !isContainerReady) {
      console.log('LocationsMap: Waiting for container to be ready...');
      // Container readiness is monitored by another useEffect
    } else {
      const reason = !mapboxToken ? 'Mapbox token not configured' :
                    mapboxToken === 'pk.your_mapbox_token_here' ? 'Using placeholder token' :
                    !isContainerReady ? 'Container not ready' :
                    'No locations available';
      console.log('LocationsMap: Not initializing map -', reason);
      if (locations.length === 0) {
        setMapError('No locations available to display on map.');
      } else if (!mapboxToken || mapboxToken === 'pk.your_mapbox_token_here') {
        setMapError(`${reason}. Using basic map mode.`);
      }
      setLoading(false);
    }
  }, [locations, mapboxToken, retryCount, isContainerReady]);

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

  const initializeMap = () => {
    if (!mapContainerRef.current || locations.length === 0) {
      console.log('LocationsMap: Skipping map initialization - no container or locations');
      return;
    }

    try {
      console.log('LocationsMap: Setting Mapbox access token');
      mapboxgl.accessToken = mapboxToken;

      // Calculate center point from all locations
      let bounds = null;
      let hasValidLocations = false;

      locations.forEach(location => {
        if (location.latitude && location.longitude) {
          if (!bounds) {
            bounds = new mapboxgl.LngLatBounds([location.longitude, location.latitude], [location.longitude, location.latitude]);
          } else {
            bounds.extend([location.longitude, location.latitude]);
          }
          hasValidLocations = true;
        }
      });

      const center = (bounds && hasValidLocations) ? bounds.getCenter().toArray() : [106.8456, -6.2088]; // Default Jakarta
      const zoom = locations.length === 1 ? 15 : 10;

      console.log('LocationsMap: Map center:', center, 'Zoom:', zoom);
      console.log('LocationsMap: Has valid bounds:', !!bounds);

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      mapRef.current = map;

      map.on('load', () => {
        console.log('LocationsMap: Map loaded successfully');
        setMapLoaded(true);

        // Add markers for each location
        locations.forEach((location, index) => {
          if (location.latitude && location.longitude) {
            console.log('LocationsMap: Adding marker for location:', location.name);
            addLocationMarker(location, index);
          }
        });

        // Fit bounds if multiple locations and bounds is valid
        if (locations.length > 1 && bounds && hasValidLocations) {
          try {
            map.fitBounds(bounds, {
              padding: { top: 50, bottom: 50, left: 50, right: 50 },
              maxZoom: 15
            });
            console.log('LocationsMap: Fitted bounds successfully');
          } catch (boundsError) {
            console.error('LocationsMap: Error fitting bounds:', boundsError);
          }
        }
      });

      map.on('error', (e) => {
        console.error('LocationsMap: Map error:', e);
        setMapError('Map loading error. Please check your internet connection.');
        setLoading(false);
      });

      return () => {
        if (mapRef.current) {
          console.log('LocationsMap: Cleaning up map');
          mapRef.current.remove();
        }
      };
    } catch (error) {
      console.error('LocationsMap: Error initializing map:', error);
      setMapError(`Failed to load interactive map: ${error.message}`);
      setLoading(false);
    }
  };

  const addLocationMarker = (location, index) => {
    if (!mapRef.current) return;

    const config = categoryConfig[location.category] || categoryConfig['Toko'];
    const IconComponent = config.icon;

    // Create custom marker element
    const markerElement = document.createElement('div');
    markerElement.innerHTML = `
      <div style="
        width: 40px;
        height: 40px;
        background: ${config.bgColor};
        border: 3px solid ${config.color};
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.2s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        📍
      </div>
    `;

    const marker = new mapboxgl.Marker({
      element: markerElement,
      anchor: 'bottom'
    })
      .setLngLat([location.longitude, location.latitude])
      .addTo(mapRef.current);

    // Add popup
    const popup = new mapboxgl.Popup({
      offset: 25,
      closeButton: false,
      closeOnClick: false
    });

    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
      <div style="padding: 8px; max-width: 200px;">
        <h4 style="margin: 0 0 4px 0; color: ${config.color}; font-size: 14px; font-weight: 600;">
          ${location.name}
        </h4>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">
          ${location.category}
        </p>
        ${location.description ? `<p style="margin: 0; font-size: 12px; color: #666;">${location.description}</p>` : ''}
      </div>
    `;

    marker.setPopup(popup);

    // Store marker reference
    markersRef.current.push(marker);

    // Add click handler
    markerElement.addEventListener('click', () => {
      setSelectedLocation(location);
      mapRef.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 16,
        duration: 1000
      });
    });
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

  const handleRetryMap = () => {
    console.log('LocationsMap: Retrying map load, attempt:', retryCount + 1);
    setRetryCount(prev => prev + 1);
    setMapError(null);
    setMapLoaded(false);

    // Force re-initialization
    if (locations.length > 0 && mapboxToken && mapboxToken !== 'pk.your_mapbox_token_here') {
      initializeMap();
    }
  };

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
        {mapError ? (
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
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Interactive Map Unavailable
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
              {mapError}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleRetryMap}
                disabled={retryCount >= 3}
              >
                {retryCount >= 3 ? 'Max retries reached' : `Retry Map Load ${retryCount > 0 ? `(${retryCount})` : ''}`}
              </Button>
            </Box>

            {/* Show static location preview */}
            {locations.length > 0 && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Location Preview:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {locations.slice(0, 3).map((location, index) => (
                    <Box
                      key={location.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: 'background.paper',
                        p: 1,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      {getCategoryIcon(location.category)}
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {location.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {location.category}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {locations.length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      +{locations.length - 3} more locations
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
              Check browser console (F12) for detailed error logs
            </Typography>

            {/* Static map fallback */}
            {locations.length > 0 && (
              <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Static Map Preview:
                </Typography>
                <Box sx={{ height: 200, bgcolor: 'grey.100', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Map would show {locations.length} location{locations.length !== 1 ? 's' : ''} here
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            ref={mapContainerRef}
            sx={{
              width: '100%',
              height: '100%',
              minHeight: 400, // Ensure minimum height
              position: 'relative',
              '& .mapboxgl-canvas': {
                borderRadius: 2
              },
              '& .mapboxgl-map': {
                borderRadius: 2
              }
            }}
          />
        )}

        {!mapLoaded && !mapError && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(255,255,255,0.9)',
              zIndex: 1000,
              borderRadius: 2
            }}
          >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>Loading interactive map...</Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center" sx={{ maxWidth: 300 }}>
              {isContainerReady ? 'Initializing Mapbox...' : 'Waiting for container to be ready...'}
            </Typography>
          </Box>
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
                  if (mapRef.current && location.latitude && location.longitude) {
                    mapRef.current.flyTo({
                      center: [location.longitude, location.latitude],
                      zoom: 16,
                      duration: 1000
                    });
                  }
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