'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useTheme } from './ThemeProvider';
import { getContent } from '../lib/supabase';
import ProductsHeader from './products/ProductsHeader';
import ProductCarousel from './products/ProductCarousel';
import ProductCard from './products/ProductCard';

const ProductsSection = ({ products: propProducts = [] }) => {
    const { theme } = useTheme();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const sectionRef = useRef(null);
    const productsRef = useRef([]);

    // Default products if none provided
    const defaultProducts = [
        {
            id: 1,
            name: 'Product 1',
            description: 'High-quality product with excellent features',
            image: '/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg',
            price: '$99.99'
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Premium product designed for modern needs',
            image: '/products/WhatsApp Image 2025-08-18 at 16.42.28 (2).jpeg',
            price: '$149.99'
        },
        {
            id: 3,
            name: 'Product 3',
            description: 'Innovative solution for everyday challenges',
            image: '/products/WhatsApp Image 2025-08-18 at 16.42.28 (1).jpeg',
            price: '$79.99'
        },
        {
            id: 4,
            name: 'Product 4',
            description: 'Reliable product built to last',
            image: '/products/WhatsApp Image 2025-08-18 at 16.42.28.jpeg',
            price: '$129.99'
        },
        {
            id: 5,
            name: 'Product 5',
            description: 'Cutting-edge technology for the future',
            image: '/products/WhatsApp Image 2025-08-18 at 16.42.28.jpeg',
            price: '$199.99'
        }
    ];

    // Mouse tracking for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100
                });
            }
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            return () => section.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            setRefreshing(true);

            console.log('Fetching products...', { propProducts: propProducts.length });

            // If products are passed as props, use them
            if (propProducts.length > 0) {
                console.log('Using products from props');
                setProducts(propProducts);
                setLoading(false);
                setRefreshing(false);
                return;
            }

            // Otherwise, fetch from Firebase
            console.log('Fetching from Firebase...');
            const result = await getContent();
            console.log('Firebase result:', result);

            if (result.success && result.data.products) {
                console.log('Setting products from Firebase:', result.data.products);
                setProducts(result.data.products);
            } else {
                // Fallback to default products if Firebase fetch fails
                console.log('Using default products');
                setProducts(defaultProducts);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setError('Failed to load products');
            setProducts(defaultProducts);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [propProducts]);

    const displayProducts = products.length > 0 ? products : defaultProducts;

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Set client flag to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Show a simple loading state during SSR to prevent hydration mismatch
    if (!isClient) {
        return (
            <Box
                sx={{
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h4" color="text.secondary">
                    Loading...
                </Typography>
            </Box>
        );
    }

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % displayProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Enhanced loading state with animations
    if (loading && isClient) {
        return (
            <Box
                ref={sectionRef}
                sx={{
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    minHeight: '400px',
                    overflow: 'hidden'
                }}
            >
                {/* Animated background elements */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 0
                }}>
                    {[...Array(5)].map((_, index) => (
                        <Box
                            key={`loading-bubble-${index}`}
                            sx={{
                                position: 'absolute',
                                top: `${20 + (index * 15)}%`,
                                left: `${10 + (index * 20)}%`,
                                width: `${30 + (index * 10)}px`,
                                height: `${30 + (index * 10)}px`,
                                borderRadius: '50%',
                                background: 'rgba(255, 255, 255, 0.1)',
                                animation: `loadingFloat ${2 + index}s ease-in-out infinite`,
                                animationDelay: `${index * 0.2}s`
                            }}
                        />
                    ))}
                </Box>

                <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center'
                }}>
                    <CircularProgress
                        size={60}
                        sx={{
                            color: 'primary.main',
                            mb: 3,
                            animation: 'pulse 2s ease-in-out infinite'
                        }}
                    />
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            animation: 'fadeInUp 1s ease-out',
                            animationDelay: '0.5s',
                            animationFillMode: 'both'
                        }}
                    >
                        Loading products...
                    </Typography>
                </Box>
            </Box>
        );
    }

    // Enhanced error state with animations
    if (error && isClient) {
        return (
            <Box
                ref={sectionRef}
                sx={{
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        maxWidth: 600,
                        animation: 'slideInFromLeft 0.8s ease-out'
                    }}
                >
                    {error}
                </Alert>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        animation: 'fadeIn 1s ease-out',
                        animationDelay: '0.3s',
                        animationFillMode: 'both'
                    }}
                >
                    Showing default products
                </Typography>
                <Button
                    variant="outlined"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{
                        color: 'secondary.main',
                        borderColor: 'secondary.main',
                        animation: 'bounceIn 1s ease-out',
                        animationDelay: '0.6s',
                        animationFillMode: 'both',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    {refreshing ? 'Loading...' : 'Try Again'}
                </Button>
            </Box>
        );
    }

    return (
        <Box
            ref={sectionRef}
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Interactive Background Elements */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.6
            }}>
                {/* Floating product-themed elements */}
                {[...Array(8)].map((_, index) => (
                    <Box
                        key={`bg-element-${index}`}
                        sx={{
                            position: 'absolute',
                            top: `${15 + (index * 12)}%`,
                            left: `${8 + (index * 11)}%`,
                            width: `${20 + (index * 5)}px`,
                            height: `${20 + (index * 5)}px`,
                            borderRadius: index % 2 === 0 ? '50%' : '20%',
                            background: `rgba(255, 255, 255, ${0.05 + (index * 0.01)})`,
                            animation: `productFloat${index % 3} ${8 + index}s ease-in-out infinite`,
                            transform: `translate(${mousePosition.x * (0.2 + index * 0.05)}px, ${mousePosition.y * (0.1 + index * 0.03)}px)`,
                            transition: 'transform 0.5s ease-out',
                            backdropFilter: 'blur(1px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    />
                ))}

                {/* Gradient orbs */}
                {[...Array(3)].map((_, index) => (
                    <Box
                        key={`gradient-orb-${index}`}
                        sx={{
                            position: 'absolute',
                            top: `${30 + (index * 25)}%`,
                            right: `${10 + (index * 15)}%`,
                            width: `${60 + (index * 20)}px`,
                            height: `${60 + (index * 20)}px`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
                            animation: `orbPulse ${6 + index * 2}s ease-in-out infinite`,
                            filter: 'blur(2px)'
                        }}
                    />
                ))}
            </Box>

            <Box sx={{
                maxWidth: { xs: '100%', sm: 'xl', md: '1400px', lg: '1600px', xl: '1800px' },
                mx: 'auto',
                px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
                position: 'relative',
                zIndex: 1
            }}>
                {/* Animated Header */}
                <Box sx={{
                    animation: isVisible ? 'slideInFromTop 1s ease-out' : 'none',
                    animationFillMode: 'both'
                }}>
                    <ProductsHeader
                        count={displayProducts.length}
                        onRefresh={handleRefresh}
                        showRefresh={isClient}
                    />
                </Box>

                {/* Products Carousel */}
                {displayProducts.length === 0 ? (
                    <Box sx={{
                        textAlign: 'center',
                        py: 8,
                        animation: isVisible ? 'fadeInUp 1s ease-out' : 'none',
                        animationDelay: '0.3s',
                        animationFillMode: 'both'
                    }}>
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{
                                mb: 2,
                                animation: 'textGlow 2s ease-in-out infinite'
                            }}
                        >
                            No products available at the moment
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Check back soon for our latest products!
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleRefresh}
                            disabled={refreshing}
                            sx={{
                                color: 'secondary.main',
                                borderColor: 'secondary.main',
                                '&:hover': {
                                    transform: 'scale(1.05) translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                },
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {refreshing ? 'Loading...' : 'Try Again'}
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{
                        position: 'relative',
                        mb: 6,
                        animation: isVisible ? 'slideInFromBottom 1s ease-out' : 'none',
                        animationDelay: '0.5s',
                        animationFillMode: 'both'
                    }}>
                        {isClient && displayProducts.length > 3 && (
                            <ProductCarousel
                                products={displayProducts}
                                currentIndex={currentSlide}
                                onPrev={prevSlide}
                                onNext={nextSlide}
                                onGoTo={goToSlide}
                            />
                        )}

                        {/* Enhanced Fallback for 3 or fewer products */}
                        {isClient && displayProducts.length <= 3 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
                                flexWrap: 'wrap',
                                py: 4
                            }}>
                                {displayProducts.map((product, index) => (
                                    <Box
                                        key={product.id}
                                        ref={el => productsRef.current[index] = el}
                                        onMouseEnter={() => setHoveredProduct(index)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        sx={{
                                            flex: index === 1 ? '1 1 auto' : '0 0 auto',
                                            maxWidth: index === 1 ?
                                                { md: '600px', lg: '700px', xl: '800px' } :
                                                { md: '400px', lg: '500px', xl: '600px' },
                                            animation: isVisible ? `productCardSlideIn 0.8s ease-out` : 'none',
                                            animationDelay: `${0.7 + (index * 0.2)}s`,
                                            animationFillMode: 'both',
                                            transform: hoveredProduct === index ?
                                                'translateY(-8px) scale(1.02)' :
                                                'translateY(0) scale(1)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            filter: hoveredProduct !== null && hoveredProduct !== index ?
                                                'blur(2px) brightness(0.7)' :
                                                'blur(0) brightness(1)',
                                            '&:hover': {
                                                zIndex: 10,
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: '-5px',
                                                    left: '-5px',
                                                    right: '-5px',
                                                    bottom: '-5px',
                                                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)',
                                                    borderRadius: '20px',
                                                    zIndex: -1,
                                                    animation: 'shimmerGlow 2s ease-in-out infinite'
                                                }
                                            }
                                        }}
                                    >
                                        <ProductCard
                                            product={product}
                                            isCenter={index === 1}
                                            isVisible={isVisible}
                                            delay={index * 100}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                )}

                {/* Enhanced Call to Action */}
                <Box sx={{
                    textAlign: 'center',
                    mt: 6,
                    animation: isVisible ? 'bounceInUp 1s ease-out' : 'none',
                    animationDelay: '1.2s',
                    animationFillMode: 'both'
                }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'secondary.main',
                            px: 4,
                            py: 2,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                transition: 'left 0.6s ease'
                            },
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.05) translateY(-2px)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                '&::before': {
                                    left: '100%'
                                }
                            },
                            '&:active': {
                                transform: 'scale(0.98)'
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        Jelajah Semua Rasa
                    </Button>
                </Box>
            </Box>

            {/* Enhanced Global Styles */}
            <style jsx global>{`
                @keyframes loadingFloat {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
                    50% { transform: translateY(-15px) scale(1.1); opacity: 1; }
                }

                @keyframes productFloat0 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-8px) rotate(1deg); }
                    66% { transform: translateY(-12px) rotate(-1deg); }
                }

                @keyframes productFloat1 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                }

                @keyframes productFloat2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-6px) rotate(-1deg); }
                    75% { transform: translateY(-14px) rotate(1deg); }
                }

                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.3; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                }

                @keyframes fadeInUp {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideInFromTop {
                    0% { opacity: 0; transform: translateY(-50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideInFromBottom {
                    0% { opacity: 0; transform: translateY(50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideInFromLeft {
                    0% { opacity: 0; transform: translateX(-50px); }
                    100% { opacity: 1; transform: translateX(0); }
                }

                @keyframes bounceIn {
                    0% { opacity: 0; transform: scale(0.3); }
                    50% { opacity: 1; transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                }

                @keyframes bounceInUp {
                    0% { opacity: 0; transform: translateY(50px) scale(0.8); }
                    60% { opacity: 1; transform: translateY(-10px) scale(1.1); }
                    80% { transform: translateY(5px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes productCardSlideIn {
                    0% { opacity: 0; transform: translateY(40px) scale(0.9); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes textGlow {
                    0%, 100% { text-shadow: 0 0 5px rgba(255,255,255,0.3); }
                    50% { text-shadow: 0 0 20px rgba(255,255,255,0.6); }
                }

                @keyframes shimmerGlow {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.05); }
                }

                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }

                /* Staggered animation delays for multiple elements */
                .stagger-1 { animation-delay: 0.1s; }
                .stagger-2 { animation-delay: 0.2s; }
                .stagger-3 { animation-delay: 0.3s; }
                .stagger-4 { animation-delay: 0.4s; }
                .stagger-5 { animation-delay: 0.5s; }
            `}</style>
        </Box>
    );
};

export default ProductsSection;