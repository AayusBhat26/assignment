const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function testCancelBooking() {
  console.log('🧪 Testing Cancel Booking Functionality...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('📋 Testing Steps:')
    console.log('1. Create a test user account')
    console.log('2. Book an activity')
    console.log('3. Cancel the booking')
    console.log('4. Verify cancellation')
    console.log('5. Check if slots increased')
    
    console.log('\n🎯 To test manually:')
    console.log('1. Start your dev server: npm run dev')
    console.log('2. Sign up with a test email')
    console.log('3. Book an activity for a future date')
    console.log('4. Go to "My Bookings"')
    console.log('5. Click the "❌ Cancel Booking" button')
    console.log('6. Confirm the cancellation')
    console.log('7. Verify the booking is removed from the list')
    
    console.log('\n🔧 API Endpoint:')
    console.log('DELETE /api/cancel-booking?id=<booking_id>')
    console.log('Headers: Authorization: Bearer <token>')
    
    console.log('\n✅ Features to verify:')
    console.log('• Cancel button only shows for future bookings')
    console.log('• Past bookings show as "Completed"')
    console.log('• Confirmation dialog appears before cancellation')
    console.log('• Loading state during cancellation')
    console.log('• Booking disappears after successful cancellation')
    console.log('• Available slots increase for the activity')
    
    console.log('\n🚨 Error cases to test:')
    console.log('• Try to cancel a past booking (should fail)')
    console.log('• Try to cancel without authentication (should fail)')
    console.log('• Try to cancel someone else\'s booking (should fail)')

  } catch (error) {
    console.log('\n❌ Test setup failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n🎯 Quick Commands:')
  console.log('• Start dev server: npm run dev')
  console.log('• Check database: npm run check-db')
  console.log('• Fix timestamps: npm run fix-timestamps')
  console.log('• Test auth: npm run test-auth')
}

testCancelBooking().catch(console.error)
