import { supabase } from '../lib/supabase'

export const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw error
    }
    
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }
  },

  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      throw error
    }
    
    return session
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw error
    }
    
    return user
  },

  // Refresh session
  async refreshSession() {
    const { data, error } = await supabase.auth.refreshSession()
    
    if (error) {
      throw error
    }
    
    return data
  },

  // Set up auth state change listener
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Check if user is authenticated
  isAuthenticated() {
    return supabase.auth.getUser().then(({ data: { user } }) => !!user)
  }
}

export default authService