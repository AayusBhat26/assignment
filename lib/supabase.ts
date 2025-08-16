import { createClient } from '@supabase/supabase-js'

// Create a dummy client for build time
const createDummyClient = () => {
  return createClient('https://dummy.supabase.co', 'dummy-key')
}

// Create real clients only when environment variables are available
const createRealClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return createDummyClient()
  }
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

const createAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return createDummyClient()
  }
  
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export const supabase = createRealClient()
export const supabaseAdmin = createAdminClient()
