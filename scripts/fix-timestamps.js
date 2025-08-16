const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixTimestamps() {
  console.log('🔧 Fixing Timestamp Issues...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('📋 Checking Current Database Status:')
    
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
        
        // Check if created_at has valid data
        const sampleBooking = bookings[0]
        if (sampleBooking.created_at) {
          const createdDate = new Date(sampleBooking.created_at)
          console.log(`   Sample created_at: ${createdDate.toISOString()}`)
          console.log(`   Is valid date: ${!isNaN(createdDate.getTime())}`)
        } else {
          console.log('   ❌ created_at is null or undefined')
        }
      }
    }

    console.log('\n🔧 Fixing Timestamp Issues...')
    
    // First, let's check if there are any existing bookings with invalid timestamps
    const { data: invalidBookings, error: checkError } = await supabase
      .from('bookings')
      .select('*')
      .is('created_at', null)
    
    if (checkError) {
      console.log('⚠️  Could not check for invalid timestamps')
    } else if (invalidBookings && invalidBookings.length > 0) {
      console.log(`❌ Found ${invalidBookings.length} bookings with invalid timestamps`)
      console.log('   These need to be fixed manually in the database')
    } else {
      console.log('✅ All existing bookings have valid timestamps')
    }

    console.log('\n📋 Manual Fix Required:')
    console.log('1. Go to your Supabase project dashboard')
    console.log('2. Navigate to SQL Editor (left sidebar)')
    console.log('3. Run these commands to fix the triggers:')
    console.log('\n-- First, check the current table structure:')
    console.log('\\d bookings;')
    console.log('\n-- Drop existing triggers:')
    console.log('DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;')
    console.log('DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;')
    console.log('\n-- Drop the function:')
    console.log('DROP FUNCTION IF EXISTS update_updated_at_column();')
    console.log('\n-- Recreate the function:')
    console.log(`
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';`)
    console.log('\n-- Recreate triggers:')
    console.log(`
CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`)
    console.log(`
CREATE TRIGGER update_activities_updated_at 
    BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`)
    
    console.log('\n-- Fix any existing invalid timestamps:')
    console.log(`
UPDATE bookings 
SET created_at = NOW(), updated_at = NOW() 
WHERE created_at IS NULL OR created_at = '1970-01-01 00:00:00+00';`)
    
    console.log('\n-- If there\'s an extra "timestamp" column, remove it:')
    console.log('ALTER TABLE bookings DROP COLUMN IF EXISTS timestamp;')
    
    console.log('\n-- Verify the table structure:')
    console.log('\\d bookings;')
    
    console.log('\n4. Test creating a new booking to verify timestamps work')
    console.log('5. Run this script again to verify the fix')

  } catch (error) {
    console.log('\n❌ Timestamp fix check failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n🎯 Quick Commands:')
  console.log('• Check database: npm run check-db')
  console.log('• Verify setup: npm run verify-setup')
  console.log('• Test auth: npm run test-auth')
  console.log('• Start dev server: npm run dev')
}

fixTimestamps().catch(console.error)
