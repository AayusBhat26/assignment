const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function testAuth() {
  console.log('🧪 Testing Activity Booking API Authentication...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local')
    return
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
  // Test signup
  console.log('📝 Testing User Signup...')
  const testEmail = `test-${Date.now()}@example.com`
  const testPassword = 'testpassword123'
  
  try {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    if (signupError) {
      console.log(`❌ Signup failed: ${signupError.message}`)
      return
    }

    if (signupData.user) {
      console.log(`✅ Signup successful for: ${testEmail}`)
      console.log(`   User ID: ${signupData.user.id}`)
    } else {
      console.log('⚠️  Signup response incomplete')
      return
    }

    // Test login
    console.log('\n🔑 Testing User Login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword,
    })

    if (loginError) {
      console.log(`❌ Login failed: ${loginError.message}`)
      return
    }

    if (loginData.user && loginData.session) {
      console.log(`✅ Login successful for: ${testEmail}`)
      console.log(`   Access Token: ${loginData.session.access_token.substring(0, 20)}...`)
      
      // Test token verification
      console.log('\n🔍 Testing Token Verification...')
      const { data: { user }, error: verifyError } = await supabase.auth.getUser(loginData.session.access_token)
      
      if (verifyError) {
        console.log(`❌ Token verification failed: ${verifyError.message}`)
      } else if (user) {
        console.log(`✅ Token verification successful`)
        console.log(`   Verified User ID: ${user.id}`)
        console.log(`   Email: ${user.email}`)
      }
      
      // Clean up - delete test user
      console.log('\n🧹 Cleaning up test user...')
      const { error: deleteError } = await supabase.auth.admin.deleteUser(loginData.user.id)
      if (deleteError) {
        console.log(`⚠️  Could not delete test user: ${deleteError.message}`)
        console.log('   You may need to delete this user manually from Supabase dashboard')
      } else {
        console.log('✅ Test user deleted successfully')
      }
      
    } else {
      console.log('⚠️  Login response incomplete')
    }

  } catch (error) {
    console.log(`❌ Test failed with error: ${error.message}`)
  }

  console.log('\n🎯 Authentication Test Summary:')
  console.log('✅ If you see all green checkmarks above, authentication is working!')
  console.log('✅ Your signup/login should now work in the application')
  console.log('✅ No custom users table is needed - everything uses Supabase Auth')
}

testAuth().catch(console.error)
