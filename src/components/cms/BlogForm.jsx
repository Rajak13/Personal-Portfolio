import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, Save, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormValidation } from '../../hooks/useFormValidation'
import { blogService } from '../../services/blogService'
import Button from '../ui/Button'
import ImageUpload from '../ui/ImageUpload'
import Input from '../ui/Input'
import LoadingSpinner from '../ui/LoadingSpinner'
import RichTextEditor from '../ui/RichTextEditor'
import Select from '../ui/Select'
import SlugInput from '../ui/SlugInput'
import TagInput from '../ui/TagInput'

// Import test for development
if (process.env.NODE_ENV === 'development') {
  import('../../tests/blogEdit.test.js')
}

const BlogForm = ({ mode = 'create' }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryClient = useQueryClient()
  
  // Use the form validation hook
  const {
    formData,
    errors,
    isValid,
    isValidating,
    formStatus,
    updateField,
    validateForm,
    resetForm,
    getFieldStatus,
    setFormData
  } = useFormValidation({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    thumbnail: '',
    video_url: '',
    tags: [],
    type: ''
  })
  
  const [showPreview, setShowPreview] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [slugValidation, setSlugValidation] = useState({ isValid: true, error: null })

  // Fetch existing blog data for edit mode
  const { data: existingBlog, isLoading: loadingBlog } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getBlogById(id),
    enabled: mode === 'edit' && !!id
  })

  // Populate form with existing data
  useEffect(() => {
    if (existingBlog && mode === 'edit') {
      const blogData = {
        title: existingBlog.title || '',
        slug: existingBlog.slug || '',
        content: existingBlog.content || '',
        excerpt: existingBlog.excerpt || '',
        thumbnail: existingBlog.thumbnail || '',
        video_url: existingBlog.video_url || '',
        tags: existingBlog.tags || [],
        type: existingBlog.type || ''
      }
      setFormData(blogData)
      
      // Check for auto-saved data
      const autoSaveKey = `blog-draft-${mode}-${id || 'new'}`
      const autoSavedData = localStorage.getItem(autoSaveKey)
      if (autoSavedData) {
        try {
          const parsedData = JSON.parse(autoSavedData)
          if (window.confirm('Found auto-saved changes. Would you like to restore them?')) {
            setFormData(parsedData.formData)
            setLastSaved(new Date(parsedData.timestamp))
          } else {
            localStorage.removeItem(autoSaveKey)
          }
        } catch (error) {
          console.error('Error parsing auto-saved data:', error)
          localStorage.removeItem(autoSaveKey)
        }
      }
    }
  }, [existingBlog, mode, id, setFormData])

  // Auto-save functionality
  useEffect(() => {
    if (!formData.title && !formData.content) return

    const autoSaveKey = `blog-draft-${mode}-${id || 'new'}`
    const timeoutId = setTimeout(() => {
      const dataToSave = {
        formData,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem(autoSaveKey, JSON.stringify(dataToSave))
      setLastSaved(new Date())
    }, 2000) // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId)
  }, [formData, mode, id])

  // Slug uniqueness checker - disabled until slug column is added
  const checkSlugUniqueness = async (slug, currentId) => {
    // Skip validation if slug column doesn't exist
    return { isValid: true, error: null }
  }

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      // Remove fields that don't exist in the database
      const { excerpt, slug, ...dbData } = data
      
      return blogService.createBlog(dbData)
    },
    onSuccess: () => {
      // Clear auto-saved data on successful creation
      const autoSaveKey = `blog-draft-${mode}-${id || 'new'}`
      localStorage.removeItem(autoSaveKey)
      
      queryClient.invalidateQueries(['blogs'])
      navigate('/admin-cms-2024-secure/blogs')
      alert('Blog post created successfully!')
    },
    onError: (error) => {
      console.error('Error creating blog:', error)
      alert('Failed to create blog post. Please try again.')
    }
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      // Remove fields that don't exist in the database
      const { excerpt, slug, ...dbData } = data
      
      return blogService.updateBlog(id, dbData)
    },
    onSuccess: () => {
      // Clear auto-saved data on successful update
      const autoSaveKey = `blog-draft-${mode}-${id || 'new'}`
      localStorage.removeItem(autoSaveKey)
      
      queryClient.invalidateQueries(['blogs'])
      queryClient.invalidateQueries(['blog', id])
      navigate('/admin-cms-2024-secure/blogs')
      alert('Blog post updated successfully!')
    },
    onError: (error) => {
      console.error('Error updating blog:', error)
      alert('Failed to update blog post. Please try again.')
    }
  })

  // Enhanced form validation with slug check
  const validateFormWithSlug = async () => {
    const validation = validateForm()
    
    // Additional slug validation (only if slug column exists)
    if (formData.slug && !slugValidation.isValid && slugValidation.error !== null) {
      // Only fail validation if it's a real error, not a missing column
      if (!slugValidation.error.includes('Unable to validate')) {
        validation.errors.slug = slugValidation.error
        validation.isValid = false
      }
    }
    
    return validation
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validation = await validateFormWithSlug()
    if (!validation.isValid) {
      return
    }

    const mutation = mode === 'edit' ? updateMutation : createMutation
    mutation.mutate(formData)
  }

  // Handle input changes using the form validation hook
  const handleInputChange = (field) => (e) => {
    const value = e.target ? e.target.value : e
    updateField(field, value)
  }

  // Check for unsaved changes
  const hasUnsavedChanges = () => {
    const initialData = existingBlog || {
      title: '', slug: '', content: '', excerpt: '', thumbnail: '', video_url: '', tags: [], type: ''
    }
    
    return JSON.stringify(formData) !== JSON.stringify({
      title: initialData.title || '',
      slug: initialData.slug || '',
      content: initialData.content || '',
      excerpt: initialData.excerpt || '',
      thumbnail: initialData.thumbnail || '',
      video_url: initialData.video_url || '',
      tags: initialData.tags || [],
      type: initialData.type || ''
    })
  }

  // Handle cancel
  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin-cms-2024-secure/blogs')
      }
    } else {
      navigate('/admin-cms-2024-secure/blogs')
    }
  }

  // Handle browser back/refresh with unsaved changes
  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [formData, existingBlog])

  if (mode === 'edit' && loadingBlog) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const isLoading = createMutation.isLoading || updateMutation.isLoading

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mode === 'edit' ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {mode === 'edit' ? 'Update your blog content' : 'Write and publish your blog content'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={showPreview ? "primary" : "outline"}
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
      </div>

      {showPreview ? (
        /* Preview Mode */
        <div className="space-y-6">
          {/* Preview Header */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-medium text-blue-900 dark:text-blue-100">Blog Preview</h3>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              This is how your blog post will appear to readers
            </p>
          </div>

          {/* Preview Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <article className="prose prose-lg max-w-none dark:prose-invert">
              {formData.thumbnail && (
                <div className="mb-8">
                  <img 
                    src={formData.thumbnail} 
                    alt={formData.title}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {formData.title || 'Untitled Blog Post'}
                </h1>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm rounded-full font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {formData.type && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Category: <span className="font-medium capitalize">{formData.type}</span>
                  </div>
                )}

                <div className="text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
                  Published on {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </header>
              
              <div className="prose-content">
                {formData.content ? (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/^- (.+)$/gm, '<li>$1</li>')
                        .replace(/^1\. (.+)$/gm, '<li>$1</li>')
                        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-red-600 dark:text-red-400 hover:underline">$1</a>')
                        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-4" />')
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/\n/g, '<br>')
                        .replace(/^(.+)$/, '<p>$1</p>')
                    }} 
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">
                    No content to preview yet. Start writing your blog post!
                  </p>
                )}
              </div>
              
              {formData.video_url && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Featured Video</h3>
                  <div className="aspect-video">
                    <iframe
                      src={formData.video_url}
                      className="w-full h-full rounded-lg shadow-lg"
                      allowFullScreen
                      title="Blog video"
                    />
                  </div>
                </div>
              )}
            </article>
          </div>
        </div>
      ) : (
        /* Form Mode */
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Input
                  label="Title"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  error={getFieldStatus('title').error}
                  placeholder="Enter blog title..."
                  maxLength={200}
                  showCharacterCount={true}
                  characterCountField="title"
                  helpText="A compelling title helps attract readers"
                  isValid={getFieldStatus('title').isValid}
                  isValidating={isValidating}
                  required={true}
                />

                <SlugInput
                  title={formData.title}
                  value={formData.slug}
                  onChange={handleInputChange('slug')}
                  error={getFieldStatus('slug').error}
                  onValidation={setSlugValidation}
                  checkUniqueness={checkSlugUniqueness}
                  currentId={id}
                  baseUrl={`${window.location.origin}/blog/`}
                />

                <Input
                  label="Excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange('excerpt')}
                  error={getFieldStatus('excerpt').error}
                  placeholder="Brief description of your blog post..."
                  maxLength={300}
                  showCharacterCount={true}
                  characterCountField="excerpt"
                  helpText="⚠️ Note: Excerpt field requires database migration to save. Currently for UI only."
                  isValid={getFieldStatus('excerpt').isValid}
                />

                <RichTextEditor
                  label="Content"
                  value={formData.content}
                  onChange={handleInputChange('content')}
                  error={getFieldStatus('content').error}
                  placeholder="Write your blog content here..."
                  showCharacterCount={true}
                  minLength={50}
                  maxLength={50000}
                  isValid={getFieldStatus('content').isValid}
                  isValidating={isValidating}
                  required={true}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <ImageUpload
                  label="Thumbnail Image"
                  value={formData.thumbnail}
                  onChange={handleInputChange('thumbnail')}
                  error={getFieldStatus('thumbnail').error}
                />

                <Input
                  label="Video URL"
                  value={formData.video_url}
                  onChange={handleInputChange('video_url')}
                  error={getFieldStatus('video_url').error}
                  placeholder="https://youtube.com/..."
                  helpText="YouTube, Vimeo, or Dailymotion URLs supported"
                  isValid={getFieldStatus('video_url').isValid}
                />

                <TagInput
                  label="Tags"
                  value={formData.tags}
                  onChange={handleInputChange('tags')}
                  error={getFieldStatus('tags').error}
                  placeholder="Add a tag..."
                  maxTags={10}
                />

                <Select
                  label="Type"
                  value={formData.type}
                  onChange={handleInputChange('type')}
                  error={getFieldStatus('type').error}
                  options={[
                    { value: '', label: 'Select type...' },
                    { value: 'tutorial', label: 'Tutorial' },
                    { value: 'article', label: 'Article' },
                    { value: 'news', label: 'News' },
                    { value: 'review', label: 'Review' },
                    { value: 'guide', label: 'Guide' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  * Required fields
                </div>
                
                {/* Form validation status */}
                {formStatus.hasErrors && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formStatus.errorCount} validation error{formStatus.errorCount > 1 ? 's' : ''}
                  </div>
                )}
                
                {isValid && !hasUnsavedChanges() && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    All fields valid
                  </div>
                )}
                
                {hasUnsavedChanges() && (
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    Unsaved changes
                  </div>
                )}
                
                {lastSaved && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Auto-saved {lastSaved.toLocaleTimeString()}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading || !isValid || (!slugValidation.isValid && !slugValidation.error?.includes('Unable to validate'))}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {mode === 'edit' ? 'Update Post' : 'Create Post'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default BlogForm