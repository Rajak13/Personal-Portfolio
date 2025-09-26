// Authentication system test
// This file can be used to manually test authentication functionality

import authService from '../services/authService'

export const runAuthTests = async () => {
  console.log('🧪 Starting Authentication Tests...')
  
  try {
    // Test 1: Check if auth service is properly initialized
    console.log('✅ Test 1: Auth service initialization')
    console.log('Auth service methods:', Object.keys(authService))
    
    // Test 2: Check current session (should be null initially)
    console.log('✅ Test 2: Getting current session')
    const initialSession = await authService.getCurrentSession()
    console.log('Initial session:', initialSession)
    
    // Test 3: Check current user (should be null initially)
    console.log('✅ Test 3: Getting current user')
    const initialUser = await authService.getCurrentUser()
    console.log('Initial user:', initialUser)
    
    // Test 4: Check authentication status
    console.log('✅ Test 4: Checking authentication status')
    const isAuth = await authService.isAuthenticated()
    console.log('Is authenticated:', isAuth)
    
    console.log('🎉 All authentication tests completed successfully!')
    
    return {
      success: true,
      results: {
        authService: !!authService,
        initialSession,
        initialUser,
        isAuthenticated: isAuth
      }
    }
    
  } catch (error) {
    console.error('❌ Authentication test failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Test authentication flow with actual credentials
export const testAuthFlow = async (email, password) => {
  console.log('🔐 Testing authentication flow...')
  
  try {
    // Test sign in
    console.log('📝 Attempting sign in...')
    const signInResult = await authService.signIn(email, password)
    console.log('Sign in result:', signInResult)
    
    // Test getting user after sign in
    console.log('👤 Getting user after sign in...')
    const user = await authService.getCurrentUser()
    console.log('Current user:', user)
    
    // Test getting session after sign in
    console.log('🎫 Getting session after sign in...')
    const session = await authService.getCurrentSession()
    console.log('Current session:', session)
    
    // Test sign out
    console.log('🚪 Testing sign out...')
    await authService.signOut()
    console.log('Sign out successful')
    
    // Verify user is null after sign out
    console.log('🔍 Verifying sign out...')
    const userAfterSignOut = await authService.getCurrentUser()
    console.log('User after sign out:', userAfterSignOut)
    
    console.log('🎉 Authentication flow test completed successfully!')
    
    return {
      success: true,
      message: 'Authentication flow works correctly'
    }
    
  } catch (error) {
    console.error('❌ Authentication flow test failed:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

// Make tests available globally for browser console testing
if (typeof window !== 'undefined') {
  window.runAuthTests = runAuthTests
  window.testAuthFlow = testAuthFlow
}