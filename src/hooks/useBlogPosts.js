import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogPostService } from '../services/blogPostService'

// Query keys for consistent cache management
export const blogPostKeys = {
  all: ['blogPosts'],
  lists: () => [...blogPostKeys.all, 'list'],
  list: (filters) => [...blogPostKeys.lists(), filters],
  details: () => [...blogPostKeys.all, 'detail'],
  detail: (id) => [...blogPostKeys.details(), id],
}

/**
 * Hook for fetching paginated blog posts with search and filtering
 */
export function useBlogPosts({
  page = 1,
  pageSize = 10,
  search = '',
  sortBy = 'created_at',
  sortOrder = 'desc',
  status = 'all'
} = {}) {
  return useQuery({
    queryKey: blogPostKeys.list({ page, pageSize, search, sortBy, sortOrder, status }),
    queryFn: () => blogPostService.getBlogPosts({ page, pageSize, search, sortBy, sortOrder, status }),
    keepPreviousData: true, // Keep previous data while fetching new data
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook for fetching a single blog post by ID
 */
export function useBlogPost(id) {
  return useQuery({
    queryKey: blogPostKeys.detail(id),
    queryFn: () => blogPostService.getBlogPostById(id),
    enabled: !!id, // Only run query if ID is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Hook for creating a new blog post with optimistic updates
 */
export function useCreateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogPostService.createBlogPost,
    onMutate: async (newPost) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: blogPostKeys.lists() })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueriesData({ queryKey: blogPostKeys.lists() })

      // Optimistically update to the new value
      queryClient.setQueriesData({ queryKey: blogPostKeys.lists() }, (old) => {
        if (!old) return old

        const optimisticPost = {
          id: `temp-${Date.now()}`, // Temporary ID
          ...newPost,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          reading_time: blogPostService.calculateReadingTime(newPost.content),
          slug: newPost.slug || blogPostService.generateSlug(newPost.title)
        }

        return {
          ...old,
          blogPosts: [optimisticPost, ...old.blogPosts],
          total: old.total + 1
        }
      })

      // Return a context object with the snapshotted value
      return { previousPosts }
    },
    onError: (err, newPost, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() })
    },
  })
}

/**
 * Hook for updating a blog post with optimistic updates
 */
export function useUpdateBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => blogPostService.updateBlogPost(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: blogPostKeys.detail(id) })
      await queryClient.cancelQueries({ queryKey: blogPostKeys.lists() })

      // Snapshot the previous values
      const previousPost = queryClient.getQueryData(blogPostKeys.detail(id))
      const previousPosts = queryClient.getQueriesData({ queryKey: blogPostKeys.lists() })

      // Optimistically update the individual post
      if (previousPost) {
        const optimisticPost = {
          ...previousPost,
          ...data,
          updated_at: new Date().toISOString(),
          reading_time: data.content ? blogPostService.calculateReadingTime(data.content) : previousPost.reading_time
        }

        queryClient.setQueryData(blogPostKeys.detail(id), optimisticPost)

        // Update the post in all list queries
        queryClient.setQueriesData({ queryKey: blogPostKeys.lists() }, (old) => {
          if (!old) return old

          return {
            ...old,
            blogPosts: old.blogPosts.map(post => 
              post.id === id ? optimisticPost : post
            )
          }
        })
      }

      return { previousPost, previousPosts }
    },
    onError: (err, { id }, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousPost) {
        queryClient.setQueryData(blogPostKeys.detail(id), context.previousPost)
      }
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: (data, error, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: blogPostKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() })
    },
  })
}

/**
 * Hook for deleting a single blog post with optimistic updates
 */
export function useDeleteBlogPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogPostService.deleteBlogPost,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: blogPostKeys.lists() })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueriesData({ queryKey: blogPostKeys.lists() })

      // Optimistically remove the post from all list queries
      queryClient.setQueriesData({ queryKey: blogPostKeys.lists() }, (old) => {
        if (!old) return old

        return {
          ...old,
          blogPosts: old.blogPosts.filter(post => post.id !== id),
          total: Math.max(0, old.total - 1)
        }
      })

      // Remove the individual post from cache
      queryClient.removeQueries({ queryKey: blogPostKeys.detail(id) })

      return { previousPosts }
    },
    onError: (err, id, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() })
    },
  })
}

/**
 * Hook for deleting multiple blog posts with optimistic updates
 */
export function useDeleteBlogPosts() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: blogPostService.deleteBlogPosts,
    onMutate: async (ids) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: blogPostKeys.lists() })

      // Snapshot the previous value
      const previousPosts = queryClient.getQueriesData({ queryKey: blogPostKeys.lists() })

      // Optimistically remove the posts from all list queries
      queryClient.setQueriesData({ queryKey: blogPostKeys.lists() }, (old) => {
        if (!old) return old

        return {
          ...old,
          blogPosts: old.blogPosts.filter(post => !ids.includes(post.id)),
          total: Math.max(0, old.total - ids.length)
        }
      })

      // Remove the individual posts from cache
      ids.forEach(id => {
        queryClient.removeQueries({ queryKey: blogPostKeys.detail(id) })
      })

      return { previousPosts }
    },
    onError: (err, ids, context) => {
      // If the mutation fails, use the context to roll back
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: blogPostKeys.lists() })
    },
  })
}

/**
 * Hook for uploading images
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: blogPostService.uploadImage,
  })
}

/**
 * Hook for prefetching blog posts (useful for pagination)
 */
export function usePrefetchBlogPosts() {
  const queryClient = useQueryClient()

  return (filters) => {
    queryClient.prefetchQuery({
      queryKey: blogPostKeys.list(filters),
      queryFn: () => blogPostService.getBlogPosts(filters),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }
}

/**
 * Hook for invalidating all blog post queries (useful for manual refresh)
 */
export function useInvalidateBlogPosts() {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: blogPostKeys.all })
  }
}