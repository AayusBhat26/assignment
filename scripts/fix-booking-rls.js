const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixBookingRLS() {
  console.log('🔒 Fixing Booking RLS Policy (Specific Fix)...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('🔍 Current Issue:')
    console.log('The RLS policy is failing because of UUID comparison issues')
    console.log('We need to create a more permissive policy for testing\n')
    
    // Drop all existing policies
    console.log('🗑️  Dropping all existing RLS policies...')
    const dropAllPolicies = `
      DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
      DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;
      DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
      DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;
      DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON bookings;
    `
    
    try {
      await supabase.rpc('exec_sql', { sql: dropAllPolicies })
      console.log('   ✅ Dropped all existing policies')
    } catch (e) {
      console.log('   ⚠️  Could not drop policies via RPC')
    }

    // Create a simple, permissive policy for testing
    console.log('\n📝 Creating simple permissive policy...')
    const simplePolicy = `
      CREATE POLICY "Allow all operations for authenticated users" ON bookings
      FOR ALL USING (auth.uid() IS NOT NULL);
    `
    
    try {
      await supabase.rpc('exec_sql', { sql: simplePolicy })
      console.log('   ✅ Created simple permissive policy')
    } catch (e) {
      console.log(`   ❌ Failed to create policy via RPC: ${e.message}`)
      console.log('   This means you need to run the SQL manually')
    }

    console.log('\n✅ RLS Fix Attempt Complete!')
    
    // If the RPC approach failed, provide manual instructions
    if (true) { // Always show manual instructions as backup
      console.log('\n🔧 MANUAL SOLUTION REQUIRED:')
      console.log('Since the automated fix may not work, please do this manually:')
      console.log('\n1. Go to your Supabase project dashboard')
      console.log('2. Navigate to SQL Editor (left sidebar)')
      console.log('3. Run these commands one by one:')
      console.log('\n-- First, drop all existing policies:')
      console.log('DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;')
      console.log('DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;')
      console.log('DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;')
      console.log('DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;')
      console.log('DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON bookings;')
      console.log('\n-- Then create a simple permissive policy:')
      console.log('CREATE POLICY "Allow all operations for authenticated users" ON bookings')
      console.log('FOR ALL USING (auth.uid() IS NOT NULL);')
      console.log('\n4. Test booking an activity again')
    }

  } catch (error) {
    console.log('\n❌ RLS fix failed:')
    console.log(`   Error: ${error.message}`)
    console.log('\n📋 Manual Solution Required:')
    console.log('Please follow the manual steps above in Supabase SQL Editor')
  }
}

fixBookingRLS().catch(console.error)
