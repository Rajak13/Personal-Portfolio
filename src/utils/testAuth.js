// Test utility for authentication - FOR DEVELOPMENT ONLY
import { supabase } from '../lib/supabase'

export const testAuthUtils = {
  // Create a test user (for development only)
  async createTestUser(email = 'admin@test.com', password = 'testpassword123') {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) {
        console.error('Error creating test user:', error)
        return { success: false, error: error.message }
      }
      
      console.log('Test user created:', data)
      return { success: true, data }
    } catch (err) {
      console.error('Error in createTestUser:', err)
      return { success: false, error: err.message }
    }
  },

  // Test sign in
  async testSignIn(email = 'admin@test.com', password = 'testpassword123') {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        console.error('Error signing in:', error)
        return { success: false, error: error.message }
      }
      
      console.log('Sign in successful:', data)
      return { success: true, data }
    } catch (err) {
      console.error('Error in testSignIn:', err)
      return { success: false, error: err.message }
    }
  },

  // List all users (admin only)
  async listUsers() {
    try {
      // This requires admin privileges
      const { data, error } = await supabase.auth.admin.listUsers()
      
      if (error) {
        console.error('Error listing users:', error)
        return { success: false, error: error.message }
      }
      
      console.log('Users:', data)
      return { success: true, data }
    } catch (err) {
      console.error('Error in listUsers:', err)
      return { success: false, error: err.message }
    }
  }
}

// Make it available globally for testing in browser console
if (typeof window !== 'undefined') {
  window.testAuthUtils = testAuthUtils
  
  // Quick setup function for easy access
  window.setupTestUser = async () => {
    console.log('🔧 Setting up test user...')
    const result = await testAuthUtils.createTestUser()
    if (result.success) {
      console.log('✅ Test user created successfully!')
      console.log('📧 Email: admin@test.com')
      console.log('🔑 Password: testpassword123')
      console.log('🔗 Login at: http://localhost:3000/admin-cms-2024-secure/login')
    } else {
      console.log('❌ Failed to create test user:', result.error)
      if (result.error.includes('already registered')) {
        console.log('ℹ️  Test user already exists, you can login directly!')
      }
    }
    return result
  }
  
  // Quick login test function
  window.testLogin = async () => {
    console.log('🔐 Testing login...')
    const result = await testAuthUtils.testSignIn()
    if (result.success) {
      console.log('✅ Login successful!')
    } else {
      console.log('❌ Login failed:', result.error)
    }
    return result
  }
}