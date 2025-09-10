-- Create visit_counts table to track landing page visits
CREATE TABLE IF NOT EXISTS visit_counts (
  id SERIAL PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL DEFAULT 'landing',
  visit_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial record for landing page
INSERT INTO visit_counts (page_type, visit_count) VALUES ('landing', 0)
ON CONFLICT (id) DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_visit_counts_page_type ON visit_counts(page_type);

-- Function to increment visit count
CREATE OR REPLACE FUNCTION increment_visit_count(page_type_param VARCHAR DEFAULT 'landing')
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  -- Get current count
  SELECT visit_count INTO current_count
  FROM visit_counts
  WHERE page_type = page_type_param;

  -- If no record exists, create one
  IF current_count IS NULL THEN
    INSERT INTO visit_counts (page_type, visit_count) VALUES (page_type_param, 1);
    RETURN 1;
  ELSE
    -- Increment the count
    UPDATE visit_counts
    SET visit_count = visit_count + 1, updated_at = NOW()
    WHERE page_type = page_type_param;
    RETURN current_count + 1;
  END IF;
END;
$$ LANGUAGE plpgsql;