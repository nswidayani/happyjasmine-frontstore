import { useState, useRef, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useTheme as useAppTheme } from '../ThemeProvider';

export default function ProductCard({ product, variant = 'default', isFocused = false, index = 0 }) {
    const { theme } = useAppTheme();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    if (!product) return null;

    // Mouse tracking for 3D tilt effect
    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setMousePosition({ x, y });
        }
    };

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

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Size variants for different display modes
    const sizeVariants = {
        default: {
            maxWidth: 600,
            imageHeight: 'auto',
            maxImageHeight: '400px',
            titleVariant: 'h4',
            priceFontSize: '1.3rem',
            buttonSize: 'large',
            padding: 4
        },
        focused: {
            maxWidth: { xs: '280px', sm: '400px', md: '500px', lg: '600px' },
            imageHeight: 'auto',
            maxImageHeight: { xs: '200px', sm: '280px', md: '350px', lg: '400px' },
            titleVariant: 'h4',
            priceFontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
            buttonSize: 'large',
            padding: { xs: 2, sm: 3, md: 4, lg: 5 }
        },
        compact: {
            maxWidth: { xs: '180px', sm: '220px', md: '280px', lg: '320px' },
            imageHeight: 'auto',
            maxImageHeight: { xs: '120px', sm: '150px', md: '180px', lg: '200px' },
            titleVariant: 'h6',
            priceFontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
            buttonSize: 'small',
            padding: { xs: 1.5, sm: 2, md: 2.5, lg: 3 }
        }
    };

    const size = sizeVariants[variant] || sizeVariants.default;

    return (
        <Card
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            sx={{
                maxWidth: size.maxWidth,
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'primary.main',
                border: isFocused ? '3px solid' : '2px solid transparent',
                borderColor: isFocused ? 'secondary.main' : 'transparent',
                borderRadius: '24px',
                cursor: 'pointer',
                // Enhanced animations
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? `translateY(0) ${isFocused ? 'scale(1.05)' : 'scale(1)'}`
                    : 'translateY(50px) scale(0.9)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                animationDelay: `${index * 0.1}s`,

                // 3D tilt effect
                ...(isHovered && {
                    transform: `
            perspective(1000px)
            rotateX(${(mousePosition.y - 50) * -0.1}deg)
            rotateY(${(mousePosition.x - 50) * 0.1}deg)
            translateZ(20px)
            ${isFocused ? 'scale(1.08)' : 'scale(1.02)'}
          `,
                }),

                boxShadow: isFocused
                    ? '0 20px 60px rgba(0, 95, 115, 0.4), 0 0 0 1px rgba(255, 227, 71, 0.3)'
                    : isHovered
                        ? '0 15px 40px rgba(0, 95, 115, 0.25), 0 0 20px rgba(255, 227, 71, 0.1)'
                        : '0 4px 20px rgba(0, 95, 115, 0.1)',

                // Glow effect
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg,
            rgba(255, 227, 71, 0.1) 0%,
            transparent 50%,
            rgba(0, 95, 115, 0.1) 100%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    borderRadius: '24px',
                    zIndex: 1,
                    pointerEvents: 'none'
                },

                // Shimmer effect
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateX(200%)' : 'translateX(-100%)',
                    transition: 'all 0.8s ease',
                    zIndex: 2,
                    pointerEvents: 'none'
                },

                '&:hover': {
                    borderColor: 'secondary.main',
                }
            }}
        >
            {/* Floating particles on hover */}
            {isHovered && (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 3
                }}>
                    {[...Array(6)].map((_, i) => (
                        <Box
                            key={`particle-${i}`}
                            sx={{
                                position: 'absolute',
                                top: `${20 + (i * 12)}%`,
                                left: `${15 + (i * 15)}%`,
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: 'rgba(255, 227, 71, 0.6)',
                                animation: `floatParticle ${2 + i * 0.3}s ease-in-out infinite`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </Box>
            )}

            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                    width: '100%',
                    height: size.imageHeight,
                    maxHeight: size.maxImageHeight,
                    borderRadius: '20px 20px 0 0',
                    objectFit: 'contain',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    zIndex: 4,

                    // Image hover effects
                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                }}
            />

            <CardContent sx={{
                p: size.padding,
                textAlign: 'center',
                position: 'relative',
                zIndex: 4,
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)'
            }}>
                <Typography
                    variant={size.titleVariant}
                    component="h3"
                    sx={{
                        color: 'secondary.main',
                        mb: 3,
                        fontWeight: 700,
                        fontSize: isFocused ? { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' } : undefined,
                        transition: 'all 0.3s ease',
                        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                        textShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                        // Gradient text effect
                        background: isHovered
                            ? `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.tertiary?.main || theme.palette.primary.main})`
                            : 'none',
                        backgroundClip: isHovered ? 'text' : 'unset',
                        WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                        WebkitTextFillColor: isHovered ? 'transparent' : 'inherit'
                    }}
                >
                    {product.name}
                </Typography>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    <Typography
                        variant="h5"
                        component="span"
                        sx={{
                            color: 'tertiary.main',
                            fontWeight: 700,
                            fontSize: size.priceFontSize,
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            // Price glow effect
                            filter: isHovered ? 'drop-shadow(0 0 8px rgba(255, 227, 71, 0.3))' : 'none'
                        }}
                    >
                        {product.price}
                    </Typography>

                    <IconButton
                        size={size.buttonSize}
                        sx={{
                            bgcolor: 'secondary.main',
                            color: 'primary.main',
                            width: { xs: 48, sm: 56 },
                            height: { xs: 48, sm: 56 },
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                            // Button animations
                            transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
                            boxShadow: isHovered
                                ? '0 8px 25px rgba(255, 227, 71, 0.4)'
                                : '0 4px 15px rgba(255, 227, 71, 0.2)',

                            // Button glow
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '0',
                                height: '0',
                                background: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '50%',
                                transform: 'translate(-50%, -50%)',
                                transition: 'all 0.4s ease',
                            },

                            '&:hover': {
                                bgcolor: 'secondary.light',
                                transform: 'translateY(-3px) scale(1.05)',
                                boxShadow: '0 12px 35px rgba(255, 227, 71, 0.5)',

                                '&::before': {
                                    width: '60px',
                                    height: '60px',
                                }
                            },

                            '&:active': {
                                transform: 'translateY(-1px) scale(0.98)',
                            }
                        }}
                    >
                        <ShoppingCart sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </IconButton>
                </Box>
            </CardContent>

            {/* Enhanced Global Styles */}
            <style jsx global>{`
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0px) scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-15px) scale(1.2);
                        opacity: 1;
                    }
                }

                @keyframes cardSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(50px) scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes pulseGlow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(255, 227, 71, 0.3);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(255, 227, 71, 0.6);
                    }
                }

                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                /* Card entrance animation */
                .card-enter {
                    animation: cardSlideIn 0.6s ease-out forwards;
                }

                /* Staggered animations */
                .card-delay-1 { animation-delay: 0.1s; }
                .card-delay-2 { animation-delay: 0.2s; }
                .card-delay-3 { animation-delay: 0.3s; }
                .card-delay-4 { animation-delay: 0.4s; }
                .card-delay-5 { animation-delay: 0.5s; }
            `}</style>
        </Card>
    );
}