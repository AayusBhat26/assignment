const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixDatabase() {
  console.log('🔧 Fixing Database Schema Issues...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    console.log('Please create .env.local with your Supabase credentials')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('📋 Current Database Status:')
    
    // Check if tables exist and their structure
    const { data: activities, error: activitiesError } = await supabase
      .from('activities')
      .select('*')
      .limit(1)
    
    if (activitiesError) {
      console.log('❌ activities table: Not found or error')
      console.log(`   Error: ${activitiesError.message}`)
    } else {
      console.log('✅ activities table: Found')
      if (activities && activities.length > 0) {
        const columns = Object.keys(activities[0])
        console.log(`   Columns: ${columns.join(', ')}`)
      }
    }

    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .limit(1)
    
    if (bookingsError) {
      console.log('❌ bookings table: Not found or error')
      console.log(`   Error: ${bookingsError.message}`)
    } else {
      console.log('✅ bookings table: Found')
      if (bookings && bookings.length > 0) {
        const columns = Object.keys(bookings[0])
        console.log(`   Columns: ${columns.join(', ')}`)
      }
    }

    console.log('\n🔍 Analysis:')
    
    if (activitiesError || bookingsError) {
      console.log('❌ Database tables are missing or have errors')
      console.log('📚 Solution: You need to create the database tables')
      console.log('\n📋 Steps to fix:')
      console.log('1. Go to your Supabase project dashboard')
      console.log('2. Navigate to SQL Editor (left sidebar)')
      console.log('3. Copy the contents of database/schema.sql')
      console.log('4. Paste and execute the SQL commands')
      console.log('5. Verify tables are created in Table Editor')
      console.log('6. Run this script again to verify')
    } else {
      // Check for column name mismatches
      let hasIssues = false
      
      if (activities && activities.length > 0) {
        const activityColumns = Object.keys(activities[0])
        const expectedActivityColumns = ['id', 'title', 'description', 'location', 'price', 'available_slots', 'created_at', 'updated_at']
        
        const missingColumns = expectedActivityColumns.filter(col => !activityColumns.includes(col))
        if (missingColumns.length > 0) {
          console.log('❌ activities table missing columns:', missingColumns.join(', '))
          hasIssues = true
        }
      }
      
      if (bookings && bookings.length > 0) {
        const bookingColumns = Object.keys(bookings[0])
        const expectedBookingColumns = ['id', 'user_id', 'activity_id', 'created_at', 'updated_at']
        
        const missingColumns = expectedBookingColumns.filter(col => !bookingColumns.includes(col))
        if (missingColumns.length > 0) {
          console.log('❌ bookings table missing columns:', missingColumns.join(', '))
          hasIssues = true
        }
      }
      
      if (!hasIssues) {
        console.log('✅ Database schema looks correct!')
        console.log('✅ All expected columns are present')
        console.log('✅ You should be able to use the application now')
      } else {
        console.log('\n📋 To fix column issues:')
        console.log('1. Drop the existing tables in Supabase SQL Editor:')
        console.log('   DROP TABLE IF EXISTS bookings CASCADE;')
        console.log('   DROP TABLE IF EXISTS activities CASCADE;')
        console.log('2. Run the complete database/schema.sql again')
        console.log('3. Run this script again to verify')
      }
    }

  } catch (error) {
    console.log('\n❌ Database check failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n🎯 Quick Commands:')
  console.log('• Check database: npm run check-db')
  console.log('• Verify setup: npm run verify-setup')
  console.log('• Test auth: npm run test-auth')
  console.log('• Start dev server: npm run dev')
}

fixDatabase().catch(console.error)
