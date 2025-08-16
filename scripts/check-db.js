const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function checkDatabase() {
  console.log('🔍 Checking Database Schema...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    // Check if tables exist
    console.log('📋 Checking Tables:')
    
    // Check activities table structure
    try {
      const { data: activities, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .limit(1)
      
      if (activitiesError) {
        console.log('❌ activities table: Error or not found')
        console.log(`   Error: ${activitiesError.message}`)
      } else {
        console.log('✅ activities table: Found and accessible')
        
        // Check columns
        if (activities && activities.length > 0) {
          const columns = Object.keys(activities[0])
          console.log(`   Columns: ${columns.join(', ')}`)
        }
      }
    } catch (e) {
      console.log('❌ activities table: Not accessible')
    }

    // Check bookings table structure
    try {
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .limit(1)
      
      if (bookingsError) {
        console.log('❌ bookings table: Error or not found')
        console.log(`   Error: ${bookingsError.message}`)
      } else {
        console.log('✅ bookings table: Found and accessible')
        
        // Check columns
        if (bookings && bookings.length > 0) {
          const columns = Object.keys(bookings[0])
          console.log(`   Columns: ${columns.join(', ')}`)
        }
      }
    } catch (e) {
      console.log('❌ bookings table: Not accessible')
    }

    // Try to get table info from information_schema
    console.log('\n📊 Table Schema Details:')
    try {
      const { data: tableInfo, error: tableError } = await supabase
        .rpc('get_table_info', { table_name: 'bookings' })
      
      if (tableError) {
        console.log('⚠️  Could not get detailed table info')
      } else {
        console.log('✅ Table info retrieved')
      }
    } catch (e) {
      console.log('⚠️  Could not get detailed table info')
    }

  } catch (error) {
    console.log('\n❌ Database check failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n📚 Next Steps:')
  console.log('1. If tables are missing, run the SQL schema in Supabase SQL Editor')
  console.log('2. If columns are wrong, drop and recreate the tables')
  console.log('3. Make sure the schema matches exactly between database and Prisma')
}

checkDatabase().catch(console.error)
