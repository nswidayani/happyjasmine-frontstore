import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import {
    Speed,
    Security,
    IntegrationInstructions,
    Star,
    Support,
    TrendingUp,
    Cloud,
    Devices,
    Analytics,
    Code,
    Business,
    School,
    Favorite,
    Lightbulb,
    Rocket,
    Shield,
    FlashOn,
    FavoriteBorder,
    EmojiEvents
} from '@mui/icons-material';

const iconMap = {
    Speed: Speed,
    Security: Security,
    Integration: IntegrationInstructions,
    Star: Star,
    Support: Support,
    TrendingUp: TrendingUp,
    Cloud: Cloud,
    Devices: Devices,
    Analytics: Analytics,
    Code: Code,
    Business: Business,
    School: School,
    Favorite: Favorite,
    Lightbulb: Lightbulb,
    Rocket: Rocket,
    Shield: Shield,
    Zap: FlashOn,
    Heart: FavoriteBorder,
    Diamond: Star,
    Award: EmojiEvents
};

export default function FeaturesSection({ features }) {
    return (
        <Box
            sx={{
                py: { xs: 4, md: 6 },
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" sx={{ mb: { xs: 6, md: 10 } }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                            fontWeight: 700,
                            mb: 3,
                            background: 'var(--gradient-primary)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.02em',
                        }}
                    >
                      {features?.title || 'Mengapa Memilih Kami?'}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1.1rem', md: '1.3rem' },
                        color: 'var(--muted)',
                        maxWidth: '600px',
                        mx: 'auto',
                        lineHeight: 1.6,
                        fontWeight: 400,
                      }}
                    >
                      {features?.description || 'Temukan keunggulan yang membedakan kami dari kompetitor'}
                    </Typography>
                </Box>

                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    {features?.items?.map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Speed;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={feature.id}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        textAlign: 'center',
                                        background: 'primary.main',
                                        border: '1px solid var(--border)',
                                        borderRadius: '20px',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            background: 'var(--gradient-primary)',
                                            transform: 'scaleX(0)',
                                            transition: 'transform 0.3s ease',
                                        },
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: 'var(--shadow-xl)',
                                            borderColor: 'var(--primary-light)',
                                            '&::before': {
                                                transform: 'scaleX(1)',
                                            },
                                            '& .icon-wrapper': {
                                                transform: 'scale(1.1) rotate(5deg)',
                                                background: 'var(--gradient-primary)',
                                            },
                                            '& .icon': {
                                                color: 'white',
                                            }
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 3, md: 4 }, background: 'primary.main' }}>
                                        <Box
                                            className="icon-wrapper"
                                            sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 80,
                                                height: 80,
                                                borderRadius: '20px',
                                                background: 'primary.main',
                                                mb: 3,
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                position: 'relative',
                                                '&::after': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: '20px',
                                                    padding: '2px',
                                                    background: 'var(--gradient-primary)',
                                                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                    WebkitMaskComposite: 'xor',
                                                    maskComposite: 'exclude',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                },
                                                '&:hover::after': {
                                                    opacity: 1,
                                                }
                                            }}
                                        >
                                            <IconComponent
                                                className="icon"
                                                sx={{
                                                    fontSize: 40,
                                                    color: 'secondary.main',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            variant="h5"
                                            component="h3"
                                            sx={{
                                                mb: 2,
                                                fontWeight: 600,
                                                color: 'var(--foreground)',
                                                fontSize: { xs: '1.2rem', md: '1.4rem' },
                                                letterSpacing: '-0.01em',
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                color: 'var(--muted)',
                                                lineHeight: 1.7,
                                                fontSize: { xs: '0.95rem', md: '1rem' },
                                                fontWeight: 400,
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Box>
    );
}