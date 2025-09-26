import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { blogService } from '../services/blogService'

export const useBlogList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [selectedBlogs, setSelectedBlogs] = useState([])
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  const queryClient = useQueryClient()

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setCurrentPage(1) // Reset to first page when searching
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Fetch blogs query
  const blogQuery = useQuery({
    queryKey: ['blogs', currentPage, pageSize, debouncedSearch, sortBy, sortOrder],
    queryFn: () => blogService.getBlogs({
      page: currentPage,
      pageSize,
      search: debouncedSearch,
      sortBy,
      sortOrder
    }),
    keepPreviousData: true
  })

  // Selection handlers
  const handleSelectBlog = (blogId) => {
    setSelectedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    )
  }

  const handleSelectAll = (blogs) => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([])
    } else {
      setSelectedBlogs(blogs.map(blog => blog.id))
    }
  }

  const clearSelection = () => {
    setSelectedBlogs([])
  }

  // Delete handlers - these now return promises for the components to handle
  const handleBulkDelete = async () => {
    if (!selectedBlogs.length) {
      throw new Error('No blog posts selected for deletion')
    }

    try {
      const result = await blogService.deleteBlogs(selectedBlogs)
      setSelectedBlogs([])
      blogQuery.refetch()
      return result
    } catch (error) {
      console.error('Error deleting blogs:', error)
      throw error
    }
  }

  const handleSingleDelete = async (blogId) => {
    try {
      const result = await blogService.deleteBlog(blogId)
      blogQuery.refetch()
      return result
    } catch (error) {
      console.error('Error deleting blog:', error)
      throw error
    }
  }

  // Soft delete handlers (for future implementation)
  const handleSoftDelete = async (blogId) => {
    try {
      const result = await blogService.softDeleteBlog(blogId)
      blogQuery.refetch()
      return result
    } catch (error) {
      console.error('Error soft deleting blog:', error)
      throw error
    }
  }

  // Pagination handlers
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, blogQuery.data?.totalPages || 1)))
  }

  const nextPage = () => {
    if (currentPage < (blogQuery.data?.totalPages || 1)) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  return {
    // Data
    blogs: blogQuery.data?.blogs || [],
    total: blogQuery.data?.total || 0,
    totalPages: blogQuery.data?.totalPages || 0,
    
    // Loading states
    isLoading: blogQuery.isLoading,
    error: blogQuery.error,
    
    // Filters and sorting
    currentPage,
    pageSize,
    search,
    sortBy,
    sortOrder,
    debouncedSearch,
    
    // Selection
    selectedBlogs,
    
    // Actions
    setCurrentPage,
    setPageSize,
    setSearch,
    setSortBy,
    setSortOrder,
    handleSelectBlog,
    handleSelectAll,
    clearSelection,
    handleBulkDelete,
    handleSingleDelete,
    handleSoftDelete,
    goToPage,
    nextPage,
    prevPage,
    refetch: blogQuery.refetch
  }
}