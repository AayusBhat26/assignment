const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function addMoreActivities() {
  console.log('🎯 Adding More Activities to Your Database...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    console.log('📋 Current Database Status:')
    
    // Check current activity count
    const { data: currentActivities, error: countError } = await supabase
      .from('activities')
      .select('id')
    
    if (countError) {
      console.log('❌ Could not check current activities')
      console.log(`   Error: ${countError.message}`)
      return
    }
    
    console.log(`✅ Current activities: ${currentActivities.length}`)
    
    console.log('\n🎯 To add more activities:')
    console.log('1. Go to your Supabase project dashboard')
    console.log('2. Navigate to SQL Editor (left sidebar)')
    console.log('3. Copy and paste the contents of scripts/add-more-activities.sql')
    console.log('4. Run the script')
    console.log('5. Verify the new activities were added')
    
    console.log('\n📊 New Activities to be Added:')
    console.log('• Sports & Athletics: 8 activities')
    console.log('• Nature & Wildlife: 8 activities')
    console.log('• Water Sports & Marine: 8 activities')
    console.log('• Creative Arts & Crafts: 8 activities')
    console.log('• Health & Wellness: 8 activities')
    console.log('• Adventure & Extreme Sports: 8 activities')
    console.log('• Cricket & Team Sports: 5 activities')
    console.log('• Dance & Movement: 8 activities')
    console.log('• Cycling & Outdoor Sports: 8 activities')
    console.log('• Travel & Exploration: 8 activities')
    console.log('• Music & Performance: 8 activities')
    console.log('• Language & Communication: 8 activities')
    console.log('• Home & Lifestyle: 8 activities')
    console.log('• Total: 93 new activities')
    
    console.log('\n💰 Price Range:')
    console.log('• Lowest: $20 (Nature Walk)')
    console.log('• Highest: $300 (Cave Diving)')
    console.log('• Most activities: $25-$120')
    
    console.log('\n🎯 Popular New Categories:')
    console.log('• Cricket: Matches, Coaching, Tournaments, Practice Sessions')
    console.log('• Dance: Bollywood, Hip Hop, Salsa, Ballet, Zumba, Street Dance')
    console.log('• Cycling: Tours, Mountain Biking, BMX, Road Cycling, Family Cycling')
    console.log('• Travel: City Tours, Cultural Heritage, Food Tours, Photography Tours')
    console.log('• Music: Guitar, Piano, Drums, Vocal Training, Music Production')
    console.log('• Language: English, Spanish, French, Public Speaking, Debate')
    console.log('• Home: Interior Design, Gardening, Cooking, DIY Projects, Pet Care')
    
    console.log('\n🔧 After adding activities:')
    console.log('1. Test the search functionality with new categories')
    console.log('2. Try filtering by different price ranges')
    console.log('3. Test booking with new activities')
    console.log('4. Verify the cancel booking works with new activities')

  } catch (error) {
    console.log('\n❌ Activity addition check failed:')
    console.log(`   Error: ${error.message}`)
  }

  console.log('\n🎯 Quick Commands:')
  console.log('• Start dev server: npm run dev')
  console.log('• Check database: npm run check-db')
  console.log('• Fix timestamps: npm run fix-timestamps')
  console.log('• Test cancel booking: npm run test-cancel-booking')
}

addMoreActivities().catch(console.error)
