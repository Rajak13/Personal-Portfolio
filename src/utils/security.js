/**
 * Security utilities for CMS route protection
 */

// Hidden CMS URL pattern
export const CMS_BASE_URL = '/admin-cms-2024-secure'

// Security constants
export const MAX_LOGIN_ATTEMPTS = 5
export const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

/**
 * Check if the current URL is a CMS route
 * @param {string} pathname - Current pathname
 * @returns {boolean} - True if it's a CMS route
 */
export const isCMSRoute = (pathname) => {
  return pathname.startsWith(CMS_BASE_URL)
}

/**
 * Check if access should be blocked due to too many failed attempts
 * @returns {boolean} - True if access should be blocked
 */
export const isAccessBlocked = () => {
  // Return false if localStorage is not available (e.g., in Node.js environment)
  if (typeof localStorage === 'undefined') {
    return false
  }
  
  const attempts = parseInt(localStorage.getItem('cms_access_attempts') || '0')
  
  if (attempts < MAX_LOGIN_ATTEMPTS) {
    return false
  }
  
  const lastAttempt = parseInt(localStorage.getItem('cms_last_attempt') || '0')
  const now = Date.now()
  const timeDiff = now - lastAttempt
  
  return timeDiff < LOCKOUT_DURATION
}

/**
 * Get remaining lockout time in minutes
 * @returns {number} - Minutes remaining in lockout
 */
export const getRemainingLockoutTime = () => {
  // Return 0 if localStorage is not available
  if (typeof localStorage === 'undefined') {
    return 0
  }
  
  const lastAttempt = parseInt(localStorage.getItem('cms_last_attempt') || '0')
  const now = Date.now()
  const timeDiff = now - lastAttempt
  const remaining = LOCKOUT_DURATION - timeDiff
  
  return Math.ceil(remaining / (60 * 1000))
}

/**
 * Record a failed login attempt
 */
export const recordFailedAttempt = () => {
  // Do nothing if localStorage is not available
  if (typeof localStorage === 'undefined') {
    return
  }
  
  const attempts = parseInt(localStorage.getItem('cms_access_attempts') || '0') + 1
  localStorage.setItem('cms_access_attempts', attempts.toString())
  localStorage.setItem('cms_last_attempt', Date.now().toString())
}

/**
 * Clear failed login attempts (on successful login)
 */
export const clearFailedAttempts = () => {
  // Do nothing if localStorage is not available
  if (typeof localStorage === 'undefined') {
    return
  }
  
  localStorage.removeItem('cms_access_attempts')
  localStorage.removeItem('cms_last_attempt')
}

/**
 * Check if a URL pattern should be redirected for security
 * @param {string} pathname - Current pathname
 * @returns {boolean} - True if should be redirected
 */
export const shouldRedirectForSecurity = (pathname) => {
  const suspiciousPatterns = [
    '/admin',
    '/cms',
    '/dashboard',
    '/manage',
    '/wp-admin',
    '/administrator',
    '/backend',
    '/control',
    '/panel',
    '/login',
    '/auth'
  ]
  
  // Don't redirect if it's the legitimate CMS URL
  if (pathname.startsWith(CMS_BASE_URL)) {
    return false
  }
  
  // Check if pathname starts with any suspicious pattern
  return suspiciousPatterns.some(pattern => 
    pathname.toLowerCase().startsWith(pattern.toLowerCase())
  )
}

/**
 * Generate a secure redirect URL for unauthorized access
 * @returns {string} - Redirect URL
 */
export const getSecureRedirectUrl = () => {
  // Always redirect to home page to avoid revealing CMS existence
  return '/'
}