import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getSecureRedirectUrl, isAccessBlocked } from '../../utils/security'

const SecurityWrapper = ({ children }) => {
  const [isSecure, setIsSecure] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for suspicious activity patterns
    const checkSecurity = () => {
      try {
        // Check if access is blocked due to failed attempts
        if (isAccessBlocked()) {
          console.warn('CMS access blocked due to too many failed attempts')
          setIsSecure(false)
          setIsLoading(false)
          return
        }

        // Additional security checks can be added here
        // For example: IP-based restrictions, time-based access, etc.
        
        // If we get here, access is allowed
        setIsSecure(true)
      } catch (error) {
        console.error('Security check failed:', error)
        setIsSecure(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkSecurity()
  }, [])

  // Show loading state while security checks are running
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin rounded-full border-2 border-gray-300 border-t-red-600 dark:border-gray-600 dark:border-t-red-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Verifying access...
          </p>
        </div>
      </div>
    )
  }

  // If security check fails, redirect to main site
  if (!isSecure) {
    return <Navigate to={getSecureRedirectUrl()} replace />
  }

  return children
}

export default SecurityWrapper