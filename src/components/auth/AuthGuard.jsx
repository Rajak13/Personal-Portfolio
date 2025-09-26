import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../ui/LoadingSpinner'

const AuthGuard = ({ children }) => {
  const { user, loading, error } = useAuth()
  const location = useLocation()

  // Clear any error state when component mounts
  useEffect(() => {
    if (error) {
      console.warn('AuthGuard detected auth error:', error)
    }
  }, [error])

  // Show loading state while authentication is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Verifying authentication...
          </p>
        </div>
      </div>
    )
  }

  // If there's an authentication error, redirect to login
  if (error) {
    return <Navigate to="/admin-cms-2024-secure/login" state={{ from: location, error }} replace />
  }

  // If user is not authenticated, redirect to login page with return URL
  if (!user) {
    return <Navigate to="/admin-cms-2024-secure/login" state={{ from: location }} replace />
  }

  // User is authenticated, render the protected content
  return children
}

export default AuthGuard