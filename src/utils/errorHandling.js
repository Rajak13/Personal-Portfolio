/**
 * Error handling utilities for the blog CMS
 */

/**
 * Custom error class for blog post operations
 */
export class BlogPostError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = null) {
    super(message)
    this.name = 'BlogPostError'
    this.code = code
    this.details = details
  }
}

/**
 * Error codes for different types of blog post errors
 */
export const ERROR_CODES = {
  // Network/Connection errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONNECTION_TIMEOUT: 'CONNECTION_TIMEOUT',
  
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD_MISSING: 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT: 'INVALID_FORMAT',
  DUPLICATE_SLUG: 'DUPLICATE_SLUG',
  
  // Database errors
  NOT_FOUND: 'NOT_FOUND',
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
  
  // File upload errors
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  SERVER_ERROR: 'SERVER_ERROR'
}

/**
 * Parse Supabase errors and convert them to user-friendly messages
 */
export function parseSupabaseError(error) {
  if (!error) return null

  // Handle different types of Supabase errors
  switch (error.code) {
    case 'PGRST116':
      return new BlogPostError('Blog post not found', ERROR_CODES.NOT_FOUND, error)
    
    case '23505': // Unique constraint violation
      if (error.message.includes('slug')) {
        return new BlogPostError('A blog post with this URL slug already exists', ERROR_CODES.DUPLICATE_SLUG, error)
      }
      return new BlogPostError('This data conflicts with existing records', ERROR_CODES.CONSTRAINT_VIOLATION, error)
    
    case '23502': // Not null constraint violation
      return new BlogPostError('Required fields are missing', ERROR_CODES.REQUIRED_FIELD_MISSING, error)
    
    case '42501': // Insufficient privilege
      return new BlogPostError('You do not have permission to perform this action', ERROR_CODES.FORBIDDEN, error)
    
    case 'PGRST301': // JWT expired
      return new BlogPostError('Your session has expired. Please log in again.', ERROR_CODES.UNAUTHORIZED, error)
    
    default:
      // Check for network errors
      if (error.message?.includes('fetch')) {
        return new BlogPostError('Network connection error. Please check your internet connection.', ERROR_CODES.NETWORK_ERROR, error)
      }
      
      // Generic database error
      if (error.message) {
        return new BlogPostError(error.message, ERROR_CODES.DATABASE_ERROR, error)
      }
      
      return new BlogPostError('An unexpected error occurred', ERROR_CODES.UNKNOWN_ERROR, error)
  }
}

/**
 * Get user-friendly error messages for different error codes
 */
export function getErrorMessage(error) {
  if (error instanceof BlogPostError) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (error?.message) {
    return error.message
  }

  return 'An unexpected error occurred'
}

/**
 * Get error severity level for UI display
 */
export function getErrorSeverity(error) {
  if (error instanceof BlogPostError) {
    switch (error.code) {
      case ERROR_CODES.VALIDATION_ERROR:
      case ERROR_CODES.REQUIRED_FIELD_MISSING:
      case ERROR_CODES.INVALID_FORMAT:
      case ERROR_CODES.DUPLICATE_SLUG:
      case ERROR_CODES.FILE_TOO_LARGE:
      case ERROR_CODES.INVALID_FILE_TYPE:
        return 'warning'
      
      case ERROR_CODES.UNAUTHORIZED:
      case ERROR_CODES.FORBIDDEN:
      case ERROR_CODES.NOT_FOUND:
        return 'error'
      
      case ERROR_CODES.NETWORK_ERROR:
      case ERROR_CODES.CONNECTION_TIMEOUT:
      case ERROR_CODES.DATABASE_ERROR:
      case ERROR_CODES.SERVER_ERROR:
        return 'error'
      
      default:
        return 'error'
    }
  }
  
  return 'error'
}

/**
 * Check if an error is retryable
 */
export function isRetryableError(error) {
  if (error instanceof BlogPostError) {
    return [
      ERROR_CODES.NETWORK_ERROR,
      ERROR_CODES.CONNECTION_TIMEOUT,
      ERROR_CODES.SERVER_ERROR
    ].includes(error.code)
  }
  
  return false
}

/**
 * Format validation errors for form display
 */
export function formatValidationErrors(errors) {
  if (!Array.isArray(errors)) {
    return [getErrorMessage(errors)]
  }
  
  return errors.map(error => getErrorMessage(error))
}

/**
 * Create a standardized error response for API operations
 */
export function createErrorResponse(error, operation = 'operation') {
  const parsedError = parseSupabaseError(error)
  
  return {
    success: false,
    error: parsedError || error,
    message: getErrorMessage(parsedError || error),
    operation,
    timestamp: new Date().toISOString(),
    retryable: isRetryableError(parsedError || error)
  }
}

/**
 * Log errors with context for debugging
 */
export function logError(error, context = {}) {
  const errorInfo = {
    message: getErrorMessage(error),
    code: error?.code || 'UNKNOWN',
    timestamp: new Date().toISOString(),
    context,
    stack: error?.stack
  }
  
  console.error('Blog CMS Error:', errorInfo)
  
  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, etc.
  
  return errorInfo
}

/**
 * Retry wrapper for operations that might fail temporarily
 */
export async function withRetry(operation, maxRetries = 3, delay = 1000) {
  let lastError
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries || !isRetryableError(error)) {
        throw error
      }
      
      // Wait before retrying with exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)))
    }
  }
  
  throw lastError
}