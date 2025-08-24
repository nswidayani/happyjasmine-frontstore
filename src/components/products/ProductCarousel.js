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
        <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {/* Navigation Arrows */}
            <IconButton
                onClick={onPrev}
                sx={{
                    position: 'absolute',
                    left: { xs: 5, sm: 10, md: -25 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 10,
                    width: { xs: 40, sm: 44, md: 48 },
                    height: { xs: 40, sm: 44, md: 48 },
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                        boxShadow: '0 8px 32px rgba(0, 95, 115, 0.3)'
                    },
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
            >
                <ChevronLeft sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            </IconButton>

            <IconButton
                onClick={onNext}
                sx={{
                    position: 'absolute',
                    right: { xs: 5, sm: 10, md: -25 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 10,
                    width: { xs: 40, sm: 44, md: 48 },
                    height: { xs: 40, sm: 44, md: 48 },
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                        boxShadow: '0 8px 32px rgba(0, 95, 115, 0.3)'
                    },
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
            >
                <ChevronRight sx={{ fontSize: { xs: 20, sm: 24, md: 28 } }} />
            </IconButton>

            {/* Mobile View: 1 Card */}
            <Box sx={{
                display: { xs: 'block', md: 'none' },
                py: { xs: 2, sm: 3 },
                position: 'relative',
                minHeight: 400,
                overflow: 'hidden'
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        px: { xs: 4, sm: 6 },
                        transform: `translateX(0)`,
                        transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        willChange: 'transform, opacity',
                    }}
                >
                    {mobileProducts.map((product, index) => (
                        <Box
                            key={`${product.id}-${currentIndex}-${index}`}
                            sx={{
                                maxWidth: { xs: '280px', sm: '320px' }, // Larger single card on mobile
                                width: '100%',
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
                                }
                            }}
                        >
                            <ProductCard
                                product={product}
                                variant="default"
                                isFocused={false}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Desktop/Tablet View: 3 Cards */}
            <Box sx={{
                display: { xs: 'none', md: 'block' },
                py: 4,
                position: 'relative',
                minHeight: 450,
                overflow: 'hidden'
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: { md: 3, lg: 4 },
                        px: { md: 4, lg: 6 },
                        justifyContent: 'center',
                        transform: `translateX(0)`,
                        transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        willChange: 'transform, opacity',
                    }}
                >
                    {desktopProducts.map((product, index) => (
                        <Box
                            key={`${product.id}-${currentIndex}-${index}`}
                            sx={{
                                flex: '1 1 0',
                                maxWidth: { md: '320px', lg: '360px' },
                                transition: 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)',
                                transform: 'translateX(0) scale(1)',
                                opacity: 1,
                                filter: 'blur(0px)',
                                willChange: 'transform, opacity, filter',
                                transitionDelay: `${index * 0.05}s`, // Stagger effect
                                '&:hover': {
                                    transform: 'scale(1.04) translateY(-6px)',
                                    filter: 'brightness(1.08)',
                                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    zIndex: 2,
                                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                                }
                            }}
                        >
                            <ProductCard
                                product={product}
                                variant="default"
                                isFocused={false}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Dots Indicator */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 0.5, sm: 1 },
                mt: { xs: 2, sm: 3, md: 4 }
            }}>
                {products.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => onGoTo(index)}
                        sx={{
                            width: index === currentIndex
                                ? { xs: 24, sm: 28 }
                                : { xs: 8, sm: 10 },
                            height: { xs: 8, sm: 10 },
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
                            } : {}
                        }}
                    />
                ))}
            </Box>

            {/* Slide Counter */}
            <Typography
                variant="body2"
                sx={{
                    textAlign: 'center',
                    color: 'text.secondary',
                    mt: { xs: 1, sm: 2 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    fontWeight: 500,
                    opacity: 0.8,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)'
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