-- Create product categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add category_id to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_categories_name ON product_categories (name);
CREATE INDEX IF NOT EXISTS idx_product_categories_display_order ON product_categories (display_order);
CREATE INDEX IF NOT EXISTS idx_product_categories_active ON product_categories (is_active);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);

-- Enable Row Level Security
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for categories" ON product_categories
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage categories
CREATE POLICY "Authenticated users can manage categories" ON product_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp for categories
CREATE OR REPLACE FUNCTION update_categories_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at for categories
CREATE TRIGGER update_product_categories_updated_at
  BEFORE UPDATE ON product_categories
  FOR EACH ROW EXECUTE FUNCTION update_categories_updated_at_column();

-- Insert some default categories
INSERT INTO product_categories (name, description, display_order) VALUES
  ('Minuman', 'Berbagai jenis minuman segar dan sehat', 1),
  ('Makanan Ringan', 'Snack dan camilan lezat', 2),
  ('Produk Organik', 'Produk alami dan organik', 3),
  ('Minuman Dingin', 'Minuman segar untuk cuaca panas', 4),
  ('Minuman Panas', 'Minuman hangat untuk kenyamanan', 5)
ON CONFLICT (name) DO NOTHING;