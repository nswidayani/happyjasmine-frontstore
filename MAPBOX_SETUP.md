# Mapbox Integration Setup

## Current Implementation
The locations system currently uses the **free OpenStreetMap Nominatim API** for geocoding, which requires no API key and has no usage limits.

## Upgrading to Mapbox

### Step 1: Get Mapbox Access Token
1. Go to [https://account.mapbox.com/](https://account.mapbox.com/)
2. Sign up for a free account (50,000 requests/month free)
3. Create a new token or use the default public token
4. Copy your access token (starts with `pk.`)

### Step 2: Configure Environment Variables
Update your `.env.local` file:

```env
# Mapbox Configuration
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your_actual_mapbox_token_here

# Supabase Configuration (keep existing)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 3: Switch Components (Optional)
If you want to use the full Mapbox integration with interactive maps:

1. Replace the import in `src/components/admin/LocationsAdmin.js`:
```javascript
// Replace this line:
import MapPicker from './MapPicker';

// With this line:
import MapPicker from './MapPickerMapbox';
```

2. The `MapPickerMapbox` component provides:
   - Interactive map with click-to-select
   - Better search results
   - Visual map markers
   - Smooth animations

### Step 4: Restart Development Server
```bash
npm run dev
```

## Features Comparison

| Feature | Free Version (Nominatim) | Mapbox Version |
|---------|------------------------|----------------|
| API Key Required | ❌ No | ✅ Yes |
| Monthly Limit | ❌ Unlimited | ✅ 50,000 requests |
| Interactive Map | ❌ Static preview | ✅ Full interactive map |
| Search Quality | ✅ Good | ✅ Excellent |
| Click to Select | ❌ Manual coordinates | ✅ Click anywhere on map |
| Visual Markers | ❌ Basic emoji | ✅ Professional markers |
| Geocoding Accuracy | ✅ Good | ✅ Excellent |

## Cost Comparison

- **Free Version**: $0/month (OpenStreetMap Nominatim)
- **Mapbox**: $0/month for first 50,000 requests, then $0.75 per 1,000 requests

## Switching Back
To switch back to the free version, simply:
1. Remove or comment out the Mapbox token in `.env.local`
2. Change the import back to `MapPicker` in `LocationsAdmin.js`

The system will automatically fall back to the free version when no Mapbox token is configured.