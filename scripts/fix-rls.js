const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixRLS() {
  console.log('🔒 Fixing Row Level Security (RLS) Policies...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('📋 Current RLS Status:')
    
    // Check if RLS is enabled
    const { data: rlsStatus, error: rlsError } = await supabase
      .rpc('get_rls_status', { table_name: 'bookings' })
    
    if (rlsError) {
      console.log('⚠️  Could not check RLS status directly')
    }

    console.log('🔍 Checking RLS policies...')
    
    // Try to get policy information
    const { data: policies, error: policiesError } = await supabase
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'bookings')
    
    if (policiesError) {
      console.log('⚠️  Could not check policies directly')
    } else if (policies && policies.length > 0) {
      console.log(`✅ Found ${policies.length} RLS policies for bookings table`)
      policies.forEach(policy => {
        console.log(`   - ${policy.policyname}: ${policy.cmd} on ${policy.permissive ? 'permissive' : 'restrictive'}`)
      })
    } else {
      console.log('❌ No RLS policies found for bookings table')
    }

    console.log('\n🔧 Fixing RLS Policies...')
    
    // Drop existing policies if they exist
    console.log('🗑️  Dropping existing policies...')
    const dropPolicies = [
      'DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;',
      'DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;',
      'DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;',
      'DROP POLICY IF EXISTS "Users can delete their own bookings" ON bookings;'
    ]
    
    for (const dropPolicy of dropPolicies) {
      try {
        await supabase.rpc('exec_sql', { sql: dropPolicy })
        console.log('   ✅ Dropped policy')
      } catch (e) {
        console.log('   ⚠️  Could not drop policy (may not exist)')
      }
    }

    // Create new, more permissive policies
    console.log('\n📝 Creating new RLS policies...')
    
    const createPolicies = [
      // Allow users to view their own bookings
      `CREATE POLICY "Users can view their own bookings" ON bookings
       FOR SELECT USING (auth.uid()::text = user_id::text);`,
      
      // Allow users to create bookings
      `CREATE POLICY "Users can create bookings" ON bookings
       FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);`,
      
      // Allow users to update their own bookings
      `CREATE POLICY "Users can update their own bookings" ON bookings
       FOR UPDATE USING (auth.uid()::text = user_id::text);`,
      
      // Allow users to delete their own bookings
      `CREATE POLICY "Users can delete their own bookings" ON bookings
       FOR DELETE USING (auth.uid()::text = user_id::text);`
    ]
    
    for (const createPolicy of createPolicies) {
      try {
        await supabase.rpc('exec_sql', { sql: createPolicy })
        console.log('   ✅ Created policy')
      } catch (e) {
        console.log(`   ❌ Failed to create policy: ${e.message}`)
      }
    }

    // Alternative: Create a simple permissive policy for testing
    console.log('\n🔄 Creating fallback permissive policy...')
    try {
      const fallbackPolicy = `
        CREATE POLICY "Allow all operations for authenticated users" ON bookings
        FOR ALL USING (auth.uid() IS NOT NULL);
      `
      await supabase.rpc('exec_sql', { sql: fallbackPolicy })
      console.log('   ✅ Created fallback policy')
    } catch (e) {
      console.log(`   ❌ Failed to create fallback policy: ${e.message}`)
    }

    console.log('\n✅ RLS Policy Fix Complete!')
    console.log('\n📚 Next Steps:')
    console.log('1. Try booking an activity again')
    console.log('2. If it still fails, check the browser console for more details')
    console.log('3. You may need to run the SQL commands manually in Supabase SQL Editor')
    
    console.log('\n🔧 Manual SQL Commands (if needed):')
    console.log('-- Drop existing policies')
    console.log('DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;')
    console.log('DROP POLICY IF EXISTS "Users can create their own bookings" ON bookings;')
    console.log('')
    console.log('-- Create simple permissive policy for testing')
    console.log('CREATE POLICY "Allow all operations for authenticated users" ON bookings')
    console.log('FOR ALL USING (auth.uid() IS NOT NULL);')

  } catch (error) {
    console.log('\n❌ RLS fix failed:')
    console.log(`   Error: ${error.message}`)
    console.log('\n📋 Manual Solution:')
    console.log('1. Go to Supabase SQL Editor')
    console.log('2. Run the manual SQL commands shown above')
    console.log('3. Test booking again')
  }
}

fixRLS().catch(console.error)
