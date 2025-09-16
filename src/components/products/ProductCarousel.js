import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products, currentIndex, onPrev, onNext, onGoTo }) {
    if (!products || products.length === 0) return null;

    // Get visible products based on screen size
    const getVisibleProducts = (count) => {
        const visibleProducts = [];
        for (let i = 0; i < count; i++) {
            const index = (currentIndex + i) % products.length;
            visibleProducts.push(products[index]);
        }
        return visibleProducts;
    };

    const mobileProducts = getVisibleProducts(1); // Changed from 2 to 1
    const desktopProducts = getVisibleProducts(3); // Changed from 4 to 3

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            // Mobile-first: base mobile styles for square cards
            py: 1,
            minHeight: 300, // Account for 280px card + padding
            // Desktop enhancements
            '@media (min-width: 600px)': {
                py: 2,
                minHeight: 320 // Account for 300px card + padding
            },
            '@media (min-width: 900px)': {
                py: 4,
                minHeight: 380 // Account for 320px cards + padding + multi-card layout
            },
            '@media (min-width: 1200px)': {
                minHeight: 420 // Account for 350px cards + padding
            }
        }}>
            {/* Navigation Arrows - mobile-first */}
            <IconButton
                onClick={onPrev}
                sx={{
                    // Mobile-first: base mobile styles
                    position: 'absolute',
                    left: 5,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 10,
                    width: 40,
                    height: 40,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                        boxShadow: '0 8px 32px rgba(0, 95, 115, 0.3)'
                    },
                    // Desktop enhancements
                    '@media (min-width: 600px)': {
                        left: 10,
                        width: 44,
                        height: 44
                    },
                    '@media (min-width: 900px)': {
                        left: -25,
                        width: 48,
                        height: 48
                    }
                }}
            >
                <ChevronLeft sx={{
                    fontSize: 20,
                    '@media (min-width: 600px)': {
                        fontSize: 24
                    },
                    '@media (min-width: 900px)': {
                        fontSize: 28
                    }
                }} />
            </IconButton>

            <IconButton
                onClick={onNext}
                sx={{
                    // Mobile-first: base mobile styles
                    position: 'absolute',
                    right: 5,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 10,
                    width: 40,
                    height: 40,
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                        boxShadow: '0 8px 32px rgba(0, 95, 115, 0.3)'
                    },
                    // Desktop enhancements
                    '@media (min-width: 600px)': {
                        right: 10,
                        width: 44,
                        height: 44
                    },
                    '@media (min-width: 900px)': {
                        right: -25,
                        width: 48,
                        height: 48
                    }
                }}
            >
                <ChevronRight sx={{
                    fontSize: 20,
                    '@media (min-width: 600px)': {
                        fontSize: 24
                    },
                    '@media (min-width: 900px)': {
                        fontSize: 28
                    }
                }} />
            </IconButton>

            {/* Mobile-first: Single card layout as base */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    px: 4,
                    transform: `translateX(0)`,
                    transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    willChange: 'transform, opacity',
                    // Desktop enhancements: multi-card layout
                    '@media (min-width: 900px)': {
                        display: 'flex',
                        gap: 3,
                        px: 4,
                        justifyContent: 'center'
                    },
                    '@media (min-width: 1200px)': {
                        gap: 4,
                        px: 6
                    }
                }}
            >
                {/* Mobile-first: Show 1 card, enhance to 3 on desktop */}
                {products.length > 0 && (
                    <>
                        {/* Current card (always visible) */}
                        <Box
                            key={`${products[currentIndex].id}-${currentIndex}-current`}
                            sx={{
                                // Mobile-first: square aspect ratio
                                width: '280px',
                                height: '280px',
                                transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                transform: 'translateX(0) scale(1)',
                                opacity: 1,
                                filter: 'blur(0px)',
                                willChange: 'transform, opacity, filter',
                                '&:hover': {
                                    transform: 'scale(1.03) translateY(-4px)',
                                    filter: 'brightness(1.05)',
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    zIndex: 2,
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
                                },
                                // Desktop enhancements - maintain square ratio
                                '@media (min-width: 600px)': {
                                    width: '300px',
                                    height: '300px'
                                },
                                '@media (min-width: 900px)': {
                                    flex: '1 1 0',
                                    width: '320px',
                                    height: '320px',
                                    '&:hover': {
                                        transform: 'scale(1.04) translateY(-6px)',
                                        filter: 'brightness(1.08)',
                                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                    }
                                },
                                '@media (min-width: 1200px)': {
                                    width: '360px',
                                    height: '360px'
                                }
                            }}
                        >
                            <ProductCard
                                product={products[currentIndex]}
                                variant="minimal"
                                isFocused={false}
                            />
                        </Box>

                        {/* Desktop: Show additional cards */}
                        {products.length > 1 && (
                            <>
                                {/* Next card */}
                                <Box
                                    key={`${products[(currentIndex + 1) % products.length].id}-${currentIndex}-next`}
                                    sx={{
                                        display: 'none', // Hidden on mobile
                                        '@media (min-width: 900px)': {
                                            display: 'block',
                                            flex: '1 1 0',
                                            width: '320px',
                                            height: '320px',
                                            transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                            transform: 'translateX(0) scale(1)',
                                            opacity: 1,
                                            filter: 'blur(0px)',
                                            transitionDelay: '0.05s',
                                            '&:hover': {
                                                transform: 'scale(1.04) translateY(-6px)',
                                                filter: 'brightness(1.08)',
                                                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                zIndex: 2,
                                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                            }
                                        },
                                        '@media (min-width: 1200px)': {
                                            width: '360px',
                                            height: '360px'
                                        }
                                    }}
                                >
                                    <ProductCard
                                        product={products[(currentIndex + 1) % products.length]}
                                        variant="minimal"
                                        isFocused={false}
                                    />
                                </Box>

                                {/* Third card if available */}
                                {products.length > 2 && (
                                    <Box
                                        key={`${products[(currentIndex + 2) % products.length].id}-${currentIndex}-third`}
                                        sx={{
                                            display: 'none', // Hidden on mobile
                                            '@media (min-width: 900px)': {
                                                display: 'block',
                                                flex: '1 1 0',
                                                width: '320px',
                                                height: '320px',
                                                transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                                transform: 'translateX(0) scale(1)',
                                                opacity: 1,
                                                filter: 'blur(0px)',
                                                transitionDelay: '0.1s',
                                                '&:hover': {
                                                    transform: 'scale(1.04) translateY(-6px)',
                                                    filter: 'brightness(1.08)',
                                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                                    zIndex: 2,
                                                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                                }
                                            },
                                            '@media (min-width: 1200px)': {
                                                width: '360px',
                                                height: '360px'
                                            }
                                        }}
                                    >
                                        <ProductCard
                                            product={products[(currentIndex + 2) % products.length]}
                                            variant="minimal"
                                            isFocused={false}
                                        />
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>

            {/* Dots Indicator - mobile-first */}
            <Box sx={{
                // Mobile-first: base mobile styles
                display: 'flex',
                justifyContent: 'center',
                gap: 0.5,
                mt: 2,
                // Desktop enhancements
                '@media (min-width: 600px)': {
                    gap: 1,
                    mt: 3
                },
                '@media (min-width: 900px)': {
                    mt: 4
                }
            }}>
                {products.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => onGoTo(index)}
                        sx={{
                            // Mobile-first: base mobile styles
                            width: index === currentIndex ? 24 : 8,
                            height: 8,
                            borderRadius: index === currentIndex ? 2 : '50%',
                            bgcolor: index === currentIndex
                                ? 'primary.main'
                                : 'rgba(0, 95, 115, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                            position: 'relative',
                            overflow: 'hidden',
                            willChange: 'transform, background-color',
                            '&:hover': {
                                bgcolor: index === currentIndex
                                    ? 'primary.dark'
                                    : 'rgba(0, 95, 115, 0.6)',
                                transform: 'scale(1.2)',
                                boxShadow: '0 4px 16px rgba(0, 95, 115, 0.4)',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                            },
                            '&::before': index === currentIndex ? {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                animation: 'smoothSweep 2.5s ease-in-out infinite'
                            } : {},
                            // Desktop enhancements
                            '@media (min-width: 600px)': {
                                width: index === currentIndex ? 28 : 10,
                                height: 10
                            }
                        }}
                    />
                ))}
            </Box>

            {/* Slide Counter - mobile-first */}
            <Typography
                variant="body2"
                sx={{
                    // Mobile-first: base mobile styles
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: 1,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    opacity: 0.8,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    // Desktop enhancements
                    '@media (min-width: 600px)': {
                        mt: 2,
                        fontSize: '0.9rem'
                    }
                }}
            >
                {currentIndex + 1} of {products.length}
            </Typography>

            {/* Enhanced CSS Animations */}
            <style jsx>{`
                @keyframes smoothSweep {
                    0%, 100% {
                        left: -100%;
                        opacity: 0;
                    }
                    50% {
                        left: 0%;
                        opacity: 1;
                    }
                    100% {
                        left: 100%;
                        opacity: 0;
                    }
                }
            `}</style>
        </Box>
    );
}