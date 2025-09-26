import { createContext, useContext, useEffect, useState } from 'react'
import authService from '../services/authService'

export const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const session = await authService.getCurrentSession()
        setUser(session?.user ?? null)
      } catch (err) {
        console.error('Error in getInitialSession:', err)
        setError('Failed to initialize authentication')
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
        setError(null)

        // Persist session state in localStorage for better UX
        if (session?.user) {
          localStorage.setItem('cms_auth_user', JSON.stringify({
            id: session.user.id,
            email: session.user.email,
            last_sign_in_at: session.user.last_sign_in_at
          }))
        } else {
          localStorage.removeItem('cms_auth_user')
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      setError(null)

      const data = await authService.signIn(email, password)
      return data
    } catch (err) {
      console.error('Sign in error:', err)
      setError(err.message || 'Failed to sign in')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)

      await authService.signOut()

      // Clear persisted session data
      localStorage.removeItem('cms_auth_user')
    } catch (err) {
      console.error('Sign out error:', err)
      setError(err.message || 'Failed to sign out')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    signIn,
    signOut,
    loading,
    error,
    clearError: () => setError(null)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}