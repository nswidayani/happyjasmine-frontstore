#!/usr/bin/env node

// One-time seeding: push src/data/content.json into Supabase `content` table (id: 'main')
// Usage:
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/init-supabase.js

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing env vars. Please set:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL');
    console.error('   SUPABASE_SERVICE_ROLE_KEY (service role)');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const contentPath = path.join(process.cwd(), 'src', 'data', 'content.json');
  if (!fs.existsSync(contentPath)) {
    console.error('❌ Could not find src/data/content.json');
    process.exit(1);
  }

  let content;
  try {
    const raw = fs.readFileSync(contentPath, 'utf8');
    content = JSON.parse(raw);
  } catch (e) {
    console.error('❌ Failed to read/parse content.json:', e.message);
    process.exit(1);
  }

  console.log('🚀 Upserting content to Supabase...');
  const { error } = await supabase.from('content').upsert({ id: 1, data: content }, { onConflict: 'id' });
  if (error) {
    console.error('❌ Upsert failed:', error.message);
    process.exit(1);
  }
  console.log('✅ Content seeded to Supabase (content.id = main)');
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});


