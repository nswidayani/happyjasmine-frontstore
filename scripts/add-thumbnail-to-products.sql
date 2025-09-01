-- Add thumbnail field to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS thumbnail TEXT;

-- Add comment for documentation
COMMENT ON COLUMN products.thumbnail IS 'Default thumbnail URL for product showcase';