import { QueryClient } from '@tanstack/react-query'
import { isRetryableError, logError } from '../utils/errorHandling'

/**
 * Create and configure React Query client with proper error handling
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Stale time - how long data is considered fresh
        staleTime: 5 * 60 * 1000, // 5 minutes
        
        // Cache time - how long data stays in cache after becoming unused
        cacheTime: 10 * 60 * 1000, // 10 minutes
        
        // Retry configuration
        retry: (failureCount, error) => {
          // Don't retry more than 3 times
          if (failureCount >= 3) return false
          
          // Only retry if the error is retryable
          return isRetryableError(error)
        },
        
        // Retry delay with exponential backoff
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        
        // Refetch on window focus for important data
        refetchOnWindowFocus: false,
        
        // Refetch on reconnect
        refetchOnReconnect: true,
        
        // Error handling
        onError: (error) => {
          logError(error, { type: 'query' })
        },
      },
      mutations: {
        // Retry configuration for mutations
        retry: (failureCount, error) => {
          // Don't retry mutations more than 2 times
          if (failureCount >= 2) return false
          
          // Only retry if the error is retryable
          return isRetryableError(error)
        },
        
        // Retry delay for mutations
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        
        // Error handling
        onError: (error) => {
          logError(error, { type: 'mutation' })
        },
      },
    },
  })
}

/**
 * Default query client instance
 */
export const queryClient = createQueryClient()

/**
 * Query client configuration for development
 */
export function createDevQueryClient() {
  const client = createQueryClient()
  
  // Enable React Query DevTools in development
  if (process.env.NODE_ENV === 'development') {
    // Additional logging for development
    client.setDefaultOptions({
      queries: {
        ...client.getDefaultOptions().queries,
        onError: (error, query) => {
          console.group('🔴 Query Error')
          console.error('Query Key:', query.queryKey)
          console.error('Error:', error)
          console.groupEnd()
          logError(error, { type: 'query', queryKey: query.queryKey })
        },
      },
      mutations: {
        ...client.getDefaultOptions().mutations,
        onError: (error, variables, context, mutation) => {
          console.group('🔴 Mutation Error')
          console.error('Mutation:', mutation.options.mutationFn?.name || 'Unknown')
          console.error('Variables:', variables)
          console.error('Error:', error)
          console.groupEnd()
          logError(error, { type: 'mutation', variables })
        },
      },
    })
  }
  
  return client
}