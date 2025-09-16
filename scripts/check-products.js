#!/usr/bin/env node

// Check products in Supabase
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing env vars. Please set:');
    console.error('   NEXT_PUBLIC_SUPABASE_URL');
    console.error('   SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  console.log('🔍 Checking products in database...');

  try {
    const { data, error, count } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ Error fetching products:', error.message);
      process.exit(1);
    }

    console.log(`✅ Found ${count} products`);
    console.log('📋 Products:');

    data.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title || 'No title'}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Thumbnail: ${product.thumbnail || 'Not set'}`);
      console.log(`   Images: ${product.images ? product.images.length : 0} images`);
      console.log(`   Created: ${product.created_at}`);
      console.log('---');
    });

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});