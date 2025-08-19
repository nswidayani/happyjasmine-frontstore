import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';

export default function HeroEditor({ content, setContent }) {
  const hero = content?.hero || {};
  const slider = hero?.imageSlider || [];

  const updateSlideAt = (index, updated) => {
    const newSlider = [...slider];
    newSlider[index] = updated;
    setContent({ ...content, hero: { ...hero, imageSlider: newSlider } });
  };

  const removeSlideAt = (index) => {
    const newSlider = slider.filter((_, i) => i !== index);
    setContent({ ...content, hero: { ...hero, imageSlider: newSlider } });
  };

  const addSlide = () => {
    const newSlide = { id: Date.now(), image: '', title: '', subtitle: '' };
    setContent({ ...content, hero: { ...hero, imageSlider: [...slider, newSlide] } });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Hero Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={hero?.title || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, title: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Subtitle"
            multiline
            rows={2}
            value={hero?.subtitle || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, subtitle: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Button Text"
            value={hero?.buttonText || ''}
            onChange={(e) => setContent({ ...content, hero: { ...hero, buttonText: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Image Slider</Typography>

          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>Preview (showing first slide):</Typography>
            {slider?.[0] && (
              <Box sx={{ height: 200, backgroundImage: `url(${slider[0].image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box sx={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', p: 2, borderRadius: 1, textAlign: 'center', maxWidth: '80%' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{slider[0].title || 'No title'}</Typography>
                  <Typography variant="body2">{slider[0].subtitle || 'No subtitle'}</Typography>
                </Box>
              </Box>
            )}
          </Box>

          {slider.map((slide, index) => (
            <Paper key={slide.id} sx={{ p: 2, mb: 2, border: '1px solid rgba(0, 95, 115, 0.2)' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    value={slide.image || ''}
                    onChange={(e) => updateSlideAt(index, { ...slide, image: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={slide.title || ''}
                    onChange={(e) => updateSlideAt(index, { ...slide, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Subtitle"
                    value={slide.subtitle || ''}
                    onChange={(e) => updateSlideAt(index, { ...slide, subtitle: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button variant="outlined" color="error" onClick={() => removeSlideAt(index)}>Remove</Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button variant="outlined" onClick={addSlide} sx={{ mt: 1 }}>Add New Slide</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


