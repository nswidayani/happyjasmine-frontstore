-- Create locations table for Happy Jasmine business locations
CREATE TABLE IF NOT EXISTS locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  latitude DECIMAL(10, 8) NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
  longitude DECIMAL(11, 8) NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
  category TEXT NOT NULL CHECK (category IN ('Pabrik', 'Supplier', 'Dropshipper', 'Toko')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_locations_category ON locations (category);

-- Create index on name for search
CREATE INDEX IF NOT EXISTS idx_locations_name ON locations (name);

-- Create spatial index for location queries (if PostGIS is available)
-- CREATE INDEX IF NOT EXISTS idx_locations_coords ON locations USING gist (point(longitude, latitude));

-- Enable Row Level Security (RLS)
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for frontend display)
CREATE POLICY "Public read access for locations" ON locations
  FOR SELECT USING (true);

-- Create policy for authenticated users to manage locations (admin)
CREATE POLICY "Authenticated users can manage locations" ON locations
  FOR ALL USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_locations_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_locations_updated_at_column();

-- Insert some sample data
INSERT INTO locations (name, description, latitude, longitude, category) VALUES
  ('Main Factory Jakarta', 'Primary manufacturing facility in Jakarta', -6.2087634, 106.845599, 'Pabrik'),
  ('Supplier Warehouse Bandung', 'Main supplier warehouse for raw materials', -6.9174639, 107.619122, 'Supplier'),
  ('Dropshipper Center Surabaya', 'Central dropshipping distribution center', -7.2574719, 112.752088, 'Dropshipper'),
  ('Retail Store Yogyakarta', 'Flagship retail store in Yogyakarta', -7.795574, 110.3694896, 'Toko')
ON CONFLICT DO NOTHING;