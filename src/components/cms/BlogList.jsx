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
    RotateCcw,
    Trash2
} from 'lucide-react'
import { useState } from 'react'
import { useToast } from '../../contexts/ToastContext'
import { useBlogList } from '../../hooks/useBlogList'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import ConfirmDialog from '../ui/ConfirmDialog'
import Input from '../ui/Input'
import LoadingSpinner from '../ui/LoadingSpinner'
import Select from '../ui/Select'

const BlogList = () => {
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'
  const [showFilters, setShowFilters] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'single', // 'single' or 'bulk'
    blogId: null,
    blogTitle: '',
    count: 0
  })

  const { showSuccess, showError } = useToast()

  const {
    blogs,
    total,
    totalPages,
    currentPage,
    pageSize,
    search,
    sortBy,
    sortOrder,
    selectedBlogs,
    isLoading,
    error,
    setCurrentPage,
    setPageSize,
    setSearch,
    setSortBy,
    setSortOrder,
    handleSelectBlog,
    handleSelectAll,
    handleBulkDelete: bulkDelete,
    handleSingleDelete: singleDelete,
    handleSoftDelete,
    goToPage,
    nextPage,
    prevPage,
    refetch
  } = useBlogList()

  // Open confirmation dialog for single delete
  const openSingleDeleteDialog = (blogId, blogTitle) => {
    setConfirmDialog({
      isOpen: true,
      type: 'single',
      blogId,
      blogTitle,
      count: 1
    })
  }

  // Open confirmation dialog for bulk delete
  const openBulkDeleteDialog = () => {
    if (selectedBlogs.length === 0) {
      showError('No blog posts selected for deletion')
      return
    }
    
    setConfirmDialog({
      isOpen: true,
      type: 'bulk',
      blogId: null,
      blogTitle: '',
      count: selectedBlogs.length
    })
  }

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmDialog({
      isOpen: false,
      type: 'single',
      blogId: null,
      blogTitle: '',
      count: 0
    })
  }

  // Handle confirmed deletion
  const handleConfirmedDelete = async () => {
    setDeleteLoading(true)
    
    try {
      let result
      
      if (confirmDialog.type === 'bulk') {
        result = await bulkDelete()
      } else {
        result = await singleDelete(confirmDialog.blogId)
      }
      
      if (result?.success) {
        showSuccess(result.message)
      }
      
      closeConfirmDialog()
    } catch (error) {
      const errorMessage = error?.message || 'Failed to delete blog post(s)'
      showError(errorMessage)
    } finally {
      setDeleteLoading(false)
    }
  }

  // Handle soft delete (for future implementation)
  const handleSoftDeleteClick = async (blogId, blogTitle) => {
    try {
      const result = await handleSoftDelete(blogId)
      if (result?.success) {
        showSuccess(result.message)
      }
    } catch (error) {
      const errorMessage = error?.message || 'Failed to delete blog post'
      showError(errorMessage)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Pagination component
  const Pagination = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
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
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{' '}
              <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span>
              {' '}to{' '}
              <span className="font-medium">
                {Math.min(currentPage * pageSize, total)}
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
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {pages.map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline'}
                size="sm"
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
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
            Error Loading Blogs
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message || 'Something went wrong while loading the blog posts.'}
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
              Manage your blog content
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
            
            <Button onClick={() => window.location.href = '/admin-cms-2024-secure/blogs/create'}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <Select
              options={[
                { value: 'created_at', label: 'Date Created' },
                { value: 'title', label: 'Title' },
                { value: 'views', label: 'Views' }
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
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-800 dark:text-red-200">
              {selectedBlogs.length} blog post(s) selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Future implementation: show soft deleted posts
                  showError('Soft delete functionality coming soon')
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restore
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={openBulkDeleteDialog}
                disabled={deleteLoading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
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
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {search ? 'Try adjusting your search terms.' : 'Get started by creating your first blog post.'}
            </p>
            <Button onClick={() => window.location.href = '/admin-cms-2024-secure/blogs/create'}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </div>
        ) : viewMode === 'table' ? (
          <TableView 
            blogs={blogs}
            selectedBlogs={selectedBlogs}
            onSelectBlog={handleSelectBlog}
            onSelectAll={() => handleSelectAll(blogs)}
            onDelete={openSingleDeleteDialog}
            onSoftDelete={handleSoftDeleteClick}
            formatDate={formatDate}
          />
        ) : (
          <GridView 
            blogs={blogs}
            selectedBlogs={selectedBlogs}
            onSelectBlog={handleSelectBlog}
            onDelete={openSingleDeleteDialog}
            onSoftDelete={handleSoftDeleteClick}
            formatDate={formatDate}
          />
        )}
        
        {blogs.length > 0 && <Pagination />}
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
            : `Are you sure you want to delete "${confirmDialog.blogTitle}"? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />
    </div>
  )
}

// Table View Component
const TableView = ({ blogs, selectedBlogs, onSelectBlog, onSelectAll, onDelete, onSoftDelete, formatDate }) => {
  const handleEdit = (blogId) => {
    window.location.href = `/admin-cms-2024-secure/blogs/edit/${blogId}`
  }

  return (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-900/50">
        <tr>
          <th className="px-6 py-3 text-left">
            <Checkbox
              checked={selectedBlogs.length === blogs.length && blogs.length > 0}
              onChange={onSelectAll}
            />
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Views
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
        {blogs.map((blog) => (
          <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <td className="px-6 py-4">
              <Checkbox
                checked={selectedBlogs.includes(blog.id)}
                onChange={() => onSelectBlog(blog.id)}
              />
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                {blog.thumbnail && (
                  <img
                    className="h-10 w-10 rounded-lg object-cover mr-4"
                    src={blog.thumbnail}
                    alt={blog.title}
                  />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {blog.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                    {blog.content?.substring(0, 100)}...
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center text-sm text-gray-900 dark:text-white">
                <Eye className="w-4 h-4 mr-1" />
                {blog.views || 0}
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-wrap gap-1">
                {blog.tags?.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
                {blog.tags?.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{blog.tags.length - 2} more
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(blog.created_at)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(blog.id)}
                  title="Edit blog post"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onSoftDelete(blog.id, blog.title)}
                  title="Soft delete (recoverable)"
                  className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => onDelete(blog.id, blog.title)}
                  title="Permanently delete"
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
const GridView = ({ blogs, selectedBlogs, onSelectBlog, onDelete, onSoftDelete, formatDate }) => {
  const handleEdit = (blogId) => {
    window.location.href = `/admin-cms-2024-secure/blogs/edit/${blogId}`
  }

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {blogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      >
        {blog.thumbnail && (
          <img
            className="w-full h-48 object-cover"
            src={blog.thumbnail}
            alt={blog.title}
          />
        )}
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <Checkbox
              checked={selectedBlogs.includes(blog.id)}
              onChange={() => onSelectBlog(blog.id)}
            />
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleEdit(blog.id)}
                title="Edit blog post"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSoftDelete(blog.id, blog.title)}
                title="Soft delete (recoverable)"
                className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button 
                variant="danger" 
                size="sm"
                onClick={() => onDelete(blog.id, blog.title)}
                title="Permanently delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {blog.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
            {blog.content?.substring(0, 150)}...
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {blog.tags?.slice(0, 3).map((tag, index) => (
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
              {blog.views || 0} views
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(blog.created_at)}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default BlogList