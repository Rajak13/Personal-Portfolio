import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Edit,
    Eye,
    Filter,
    Grid,
    List,
    Plus,
    Trash2
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogPosts, useDeleteBlogPost, useDeleteBlogPosts } from '../../hooks/useBlogPosts'
import { getErrorMessage } from '../../utils/errorHandling'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import LoadingSpinner from '../ui/LoadingSpinner'
import Select from '../ui/Select'
import { useToast } from '../ui/Toast'

const BlogPostList = () => {
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  
  // View and filter state
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState([])
  
  // Query parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [status, setStatus] = useState('all')
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'single', // 'single' or 'bulk'
    postId: null,
    postTitle: '',
    count: 0
  })

  // Fetch blog posts
  const {
    data: blogPostsData,
    isLoading,
    error,
    refetch
  } = useBlogPosts({
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    status
  })

  // Mutations
  const deletePostMutation = useDeleteBlogPost()
  const deletePostsMutation = useDeleteBlogPosts()

  const blogPosts = blogPostsData?.blogPosts || []
  const total = blogPostsData?.total || 0
  const totalPages = blogPostsData?.totalPages || 0

  // Selection handlers
  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === blogPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(blogPosts.map(post => post.id))
    }
  }

  // Pagination handlers
  const goToPage = (newPage) => {
    setPage(newPage)
    setSelectedPosts([]) // Clear selection when changing pages
  }

  const nextPage = () => {
    if (page < totalPages) {
      goToPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page > 1) {
      goToPage(page - 1)
    }
  }

  // Delete handlers
  const openSingleDeleteDialog = (postId, postTitle) => {
    setConfirmDialog({
      isOpen: true,
      type: 'single',
      postId,
      postTitle,
      count: 1
    })
  }

  const openBulkDeleteDialog = () => {
    if (selectedPosts.length === 0) {
      showError('No blog posts selected for deletion')
      return
    }
    
    setConfirmDialog({
      isOpen: true,
      type: 'bulk',
      postId: null,
      postTitle: '',
      count: selectedPosts.length
    })
  }

  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      type: 'single',
      postId: null,
      postTitle: '',
      count: 0
    })
  }

  const handleConfirmedDelete = async () => {
    try {
      let result
      
      if (confirmDialog.type === 'bulk') {
        result = await deletePostsMutation.mutateAsync(selectedPosts)
        setSelectedPosts([]) // Clear selection after successful bulk delete
      } else {
        result = await deletePostMutation.mutateAsync(confirmDialog.postId)
      }
      
      if (result?.success) {
        showSuccess(result.message)
      }
      
      closeConfirmDialog()
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      showError(errorMessage)
    }
  }

  // Navigation handlers
  const handleCreateNew = () => {
    navigate('/admin-cms-2024-secure/blogs/create')
  }

  const handleEdit = (postId) => {
    navigate(`/admin-cms-2024-secure/blogs/edit/${postId}`)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get status badge
  const getStatusBadge = (post) => {
    if (post.published) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
          Published
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
          Draft
        </span>
      )
    }
  }

  // Pagination component
  const Pagination = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{' '}
              <span className="font-medium">{((page - 1) * pageSize) + 1}</span>
              {' '}to{' '}
              <span className="font-medium">
                {Math.min(page * pageSize, total)}
              </span>
              {' '}of{' '}
              <span className="font-medium">{total}</span>
              {' '}results
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {pages.map(pageNum => (
              <Button
                key={pageNum}
                variant={page === pageNum ? 'primary' : 'outline'}
                size="sm"
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error Loading Blog Posts
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {getErrorMessage(error)}
          </p>
          <Button onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Blog Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your blog content ({total} posts)
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
              <Button
                variant={viewMode === 'table' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none border-r border-gray-300 dark:border-gray-600"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
            
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Search posts..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1) // Reset to first page when searching
              }}
            />
            
            <Select
              options={[
                { value: 'all', label: 'All Posts' },
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Drafts' }
              ]}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setPage(1)
              }}
            />
            
            <Select
              options={[
                { value: 'created_at', label: 'Date Created' },
                { value: 'updated_at', label: 'Date Updated' },
                { value: 'published_at', label: 'Date Published' },
                { value: 'title', label: 'Title' }
              ]}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
            
            <Select
              options={[
                { value: 'desc', label: 'Descending' },
                { value: 'asc', label: 'Ascending' }
              ]}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
            
            <Select
              options={[
                { value: '5', label: '5 per page' },
                { value: '10', label: '10 per page' },
                { value: '20', label: '20 per page' },
                { value: '50', label: '50 per page' }
              ]}
              value={pageSize.toString()}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value))
                setPage(1)
              }}
            />
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-800 dark:text-red-200">
              {selectedPosts.length} blog post(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={openBulkDeleteDialog}
                disabled={deletePostsMutation.isLoading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deletePostsMutation.isLoading ? 'Deleting...' : 'Delete Selected'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
        {isLoading ? (
          <div className="p-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {search ? 'Try adjusting your search terms.' : 'Get started by creating your first blog post.'}
            </p>
            <Button onClick={handleCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </div>
        ) : viewMode === 'table' ? (
          <TableView 
            blogPosts={blogPosts}
            selectedPosts={selectedPosts}
            onSelectPost={handleSelectPost}
            onSelectAll={handleSelectAll}
            onEdit={handleEdit}
            onDelete={openSingleDeleteDialog}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            deleteLoading={deletePostMutation.isLoading}
          />
        ) : (
          <GridView 
            blogPosts={blogPosts}
            selectedPosts={selectedPosts}
            onSelectPost={handleSelectPost}
            onEdit={handleEdit}
            onDelete={openSingleDeleteDialog}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            deleteLoading={deletePostMutation.isLoading}
          />
        )}
        
        {blogPosts.length > 0 && <Pagination />}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirmedDelete}
        title={confirmDialog.type === 'bulk' ? 'Delete Multiple Posts' : 'Delete Blog Post'}
        message={
          confirmDialog.type === 'bulk'
            ? `Are you sure you want to delete ${confirmDialog.count} blog post${confirmDialog.count > 1 ? 's' : ''}? This action cannot be undone.`
            : `Are you sure you want to delete "${confirmDialog.postTitle}"? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deletePostMutation.isLoading || deletePostsMutation.isLoading}
      />
    </div>
  )
}

// Table View Component
const TableView = ({ 
  blogPosts, 
  selectedPosts, 
  onSelectPost, 
  onSelectAll, 
  onEdit, 
  onDelete, 
  formatDate, 
  getStatusBadge,
  deleteLoading 
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-900/50">
          <tr>
            <th className="px-6 py-3 text-left">
              <Checkbox
                checked={selectedPosts.length === blogPosts.length && blogPosts.length > 0}
                onChange={onSelectAll}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Reading Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Tags
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {blogPosts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4">
                <Checkbox
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => onSelectPost(post.id)}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {post.image_url && (
                    <img
                      className="h-10 w-10 rounded-lg object-cover mr-4"
                      src={post.image_url}
                      alt={post.title}
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </div>
                    {post.excerpt && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {post.excerpt}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(post)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900 dark:text-white">
                  {post.reading_time || 0} min read
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags?.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags?.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{post.tags.length - 2} more
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(post.created_at)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onEdit(post.id)}
                    title="Edit blog post"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => onDelete(post.id, post.title)}
                    title="Delete blog post"
                    disabled={deleteLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Grid View Component  
const GridView = ({ 
  blogPosts, 
  selectedPosts, 
  onSelectPost, 
  onEdit, 
  onDelete, 
  formatDate, 
  getStatusBadge,
  deleteLoading 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
        >
          {post.image_url && (
            <img
              className="w-full h-48 object-cover"
              src={post.image_url}
              alt={post.title}
            />
          )}
          
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <Checkbox
                checked={selectedPosts.includes(post.id)}
                onChange={() => onSelectPost(post.id)}
              />
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEdit(post.id)}
                  title="Edit blog post"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => onDelete(post.id, post.title)}
                  title="Delete blog post"
                  disabled={deleteLoading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="mb-2">
              {getStatusBadge(post)}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            {post.excerpt && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {post.reading_time || 0} min read
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.created_at)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogPostList