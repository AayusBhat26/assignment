const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function verifySetup() {
  console.log('🔍 Verifying Activity Booking API setup...\n')

  // Check environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]

  console.log('📋 Environment Variables:')
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar]
    if (value) {
      console.log(`✅ ${envVar}: ${value.substring(0, 20)}...`)
    } else {
      console.log(`❌ ${envVar}: Missing`)
    }
  }

  // Check Supabase connection
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('\n❌ Cannot verify database - missing Supabase credentials')
    return
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('\n🗄️ Database Tables:')
    
    // Check activities table
    try {
      const { data: activities, error: activitiesError } = await supabase
        .from('activities')
        .select('count')
        .limit(1)
      
      if (activitiesError) {
        console.log('❌ activities table: Not found or error')
        console.log(`   Error: ${activitiesError.message}`)
      } else {
        console.log('✅ activities table: Found')
      }
    } catch (e) {
      console.log('❌ activities table: Not accessible')
    }

    // Check bookings table
    try {
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select('count')
        .limit(1)
      
      if (bookingsError) {
        console.log('❌ bookings table: Not found or error')
        console.log(`   Error: ${bookingsError.message}`)
      } else {
        console.log('✅ bookings table: Found')
      }
    } catch (e) {
      console.log('❌ bookings table: Not accessible')
    }

    console.log('\n📊 Sample Data Check:')
    try {
      const { data: sampleActivities, error: sampleError } = await supabase
        .from('activities')
        .select('*')
        .limit(3)
      
      if (sampleError) {
        console.log('❌ Sample data: Error fetching')
      } else if (sampleActivities && sampleActivities.length > 0) {
        console.log(`✅ Sample data: ${sampleActivities.length} activities found`)
        console.log('   Sample activities:')
        sampleActivities.forEach(activity => {
          console.log(`   - ${activity.title} (${activity.location})`)
        })
      } else {
        console.log('⚠️  Sample data: No activities found')
      }
    } catch (e) {
      console.log('❌ Sample data: Cannot fetch')
    }

    console.log('\n🔐 Authentication Check:')
    console.log('✅ Using Supabase Auth (no custom users table needed)')
    console.log('✅ Users will be created in Supabase Auth system')

  } catch (error) {
    console.log('\n❌ Database connection failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n📚 Next Steps:')
  console.log('1. If tables are missing, run the updated SQL schema in Supabase SQL Editor')
  console.log('2. Copy contents of database/schema.sql (updated version)')
  console.log('3. Execute in Supabase SQL Editor')
  console.log('4. Restart your development server')
  console.log('5. Test signup/login - should work with Supabase Auth now!')
}

verifySetup().catch(console.error)
