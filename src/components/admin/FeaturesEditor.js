import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import Speed from '@mui/icons-material/Speed';
import Security from '@mui/icons-material/Security';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import Star from '@mui/icons-material/Star';
import Support from '@mui/icons-material/Support';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Cloud from '@mui/icons-material/Cloud';
import Devices from '@mui/icons-material/Devices';
import Analytics from '@mui/icons-material/Analytics';
import Code from '@mui/icons-material/Code';
import Business from '@mui/icons-material/Business';
import School from '@mui/icons-material/School';
import Favorite from '@mui/icons-material/Favorite';
import Lightbulb from '@mui/icons-material/Lightbulb';
import Rocket from '@mui/icons-material/Rocket';
import Shield from '@mui/icons-material/Shield';
import FlashOn from '@mui/icons-material/FlashOn';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import EmojiEvents from '@mui/icons-material/EmojiEvents';

const iconMap = {
  Speed,
  Security,
  Integration: IntegrationInstructions,
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
  Zap: FlashOn,
  Heart: FavoriteBorder,
  Diamond: Star,
  Award: EmojiEvents,
};

export default function FeaturesEditor({ content, setContent }) {
  const features = content?.features || {};
  const items = features?.items || [];

  const updateItemAt = (index, updated) => {
    const newItems = [...items];
    newItems[index] = updated;
    setContent({ ...content, features: { ...features, items: newItems } });
  };

  const removeItemAt = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setContent({ ...content, features: { ...features, items: newItems } });
  };

  const moveUp = (index) => {
    if (index <= 0) return;
    const newItems = [...items];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setContent({ ...content, features: { ...features, items: newItems } });
  };

  const moveDown = (index) => {
    if (index >= items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setContent({ ...content, features: { ...features, items: newItems } });
  };

  const addItem = () => {
    const newFeature = {
      id: Date.now(),
      icon: 'Speed',
      title: '',
      description: ''
    };
    setContent({ ...content, features: { ...features, items: [...items, newFeature] } });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Features Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section Title"
            value={features?.title || ''}
            onChange={(e) => setContent({ ...content, features: { ...features, title: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section Description"
            multiline
            rows={2}
            value={features?.description || ''}
            onChange={(e) => setContent({ ...content, features: { ...features, description: e.target.value } })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Feature Items</Typography>

          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
              Preview (showing first 3 features):
            </Typography>
            <Grid container spacing={2}>
              {items.slice(0, 3).map((feature) => {
                const IconComponent = iconMap[feature.icon] || Speed;
                return (
                  <Grid item xs={12} md={4} key={feature.id}>
                    <Box sx={{ p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.paper', textAlign: 'center', height: '100%' }}>
                      <IconComponent sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6" sx={{ mb: 1, fontSize: '0.9rem' }}>{feature.title || 'No title'}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>{feature.description || 'No description'}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {items.map((feature, index) => (
            <Paper key={feature.id} sx={{ p: 2, mb: 2, border: '1px solid rgba(0, 95, 115, 0.2)' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={1}>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>#{index + 1}</Typography>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    select
                    fullWidth
                    label="Icon"
                    value={feature.icon || ''}
                    onChange={(e) => updateItemAt(index, { ...feature, icon: e.target.value })}
                  >
                    <option value="Speed">Speed</option>
                    <option value="Security">Security</option>
                    <option value="Integration">Integration</option>
                    <option value="Star">Star</option>
                    <option value="Support">Support</option>
                    <option value="TrendingUp">Trending Up</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Devices">Devices</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Code">Code</option>
                    <option value="Business">Business</option>
                    <option value="School">School</option>
                    <option value="Favorite">Favorite</option>
                    <option value="Lightbulb">Lightbulb</option>
                    <option value="Rocket">Rocket</option>
                    <option value="Shield">Shield</option>
                    <option value="Zap">Zap</option>
                    <option value="Heart">Heart</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Award">Award</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={feature.title || ''}
                    onChange={(e) => updateItemAt(index, { ...feature, title: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    value={feature.description || ''}
                    onChange={(e) => updateItemAt(index, { ...feature, description: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                    <Button variant="outlined" size="small" onClick={() => moveUp(index)} disabled={index === 0}>↑</Button>
                    <Button variant="outlined" size="small" onClick={() => moveDown(index)} disabled={index === items.length - 1}>↓</Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => removeItemAt(index)}>Remove</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button variant="outlined" onClick={addItem} sx={{ mt: 1 }}>Add New Feature</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}


