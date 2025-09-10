#!/usr/bin/env node

// Execute the visit_counts table creation SQL
// Usage:
//   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/create-visit-counts.js

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

  const sqlPath = path.join(__dirname, 'create-visit-counts-table.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('❌ Could not find create-visit-counts-table.sql');
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('🚀 Executing visit_counts table creation...');

  try {
    // For Supabase, we can execute DDL by using the pg_meta functions or direct SQL
    // Let's try a different approach - execute via the database directly
    console.log('📋 Please run the following SQL in your Supabase SQL Editor:');
    console.log('---');
    console.log(sql);
    console.log('---');
    console.log('Or visit: https://supabase.com/dashboard/project/tstfupwelkoiorjaelgs/sql');
    console.log('✅ Script generated successfully');
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});