# Blog Post Service Integration Guide

This document explains how to integrate the new blog post service with Supabase database operations and React Query for the CMS.

## Overview

The blog post service provides a complete CRUD interface for managing blog posts using the `blog_posts` table in Supabase. It includes:

- **Service Layer**: `blogPostService.js` - Direct database operations
- **React Query Hooks**: `useBlogPosts.js` - Optimistic updates and caching
- **Error Handling**: `errorHandling.js` - Consistent error management
- **Query Client**: `queryClient.js` - Configured React Query client

## Key Features

### 1. Database Operations
- ✅ Create, read, update, delete blog posts
- ✅ Pagination, search, and filtering
- ✅ Image upload to Supabase Storage
- ✅ Slug generation and validation
- ✅ Reading time calculation
- ✅ Bulk operations support

### 2. React Query Integration
- ✅ Optimistic updates for better UX
- ✅ Automatic cache invalidation
- ✅ Error handling with retry logic
- ✅ Loading states management
- ✅ Prefetching for pagination

### 3. Error Handling
- ✅ Supabase error parsing
- ✅ User-friendly error messages
- ✅ Retry logic for network errors
- ✅ Validation error formatting

## Usage Examples

### Basic Usage

```jsx
import { useBlogPosts, useCreateBlogPost } from '../hooks/useBlogPosts'

function BlogManager() {
  // Fetch blog posts with pagination
  const { data, isLoading, error } = useBlogPosts({
    page: 1,
    pageSize: 10,
    search: 'react',
    status: 'published'
  })

  // Create new blog post
  const createMutation = useCreateBlogPost()

  const handleCreate = async (blogData) => {
    try {
      const newPost = await createMutation.mutateAsync(blogData)
      console.log('Created:', newPost)
    } catch (error) {
      console.error('Failed to create:', error.message)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {data?.blogPosts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### Advanced Usage with Optimistic Updates

```jsx
import { useUpdateBlogPost, useDeleteBlogPost } from '../hooks/useBlogPosts'

function BlogEditor({ postId }) {
  const updateMutation = useUpdateBlogPost()
  const deleteMutation = useDeleteBlogPost()

  const handleUpdate = async (updates) => {
    // Optimistic update - UI updates immediately
    await updateMutation.mutateAsync({ id: postId, data: updates })
  }

  const handleDelete = async () => {
    // Optimistic delete - post removed from UI immediately
    await deleteMutation.mutateAsync(postId)
  }

  return (
    <div>
      <button onClick={() => handleUpdate({ title: 'New Title' })}>
        Update Title
      </button>
      <button onClick={handleDelete}>
        Delete Post
      </button>
    </div>
  )
}
```

### Direct Service Usage

```jsx
import { blogPostService } from '../services/blogPostService'

// Direct service calls (without React Query)
async function directUsage() {
  try {
    // Create a blog post
    const newPost = await blogPostService.createBlogPost({
      title: 'My New Post',
      content: 'This is the content of my new blog post...',
      published: false,
      tags: ['react', 'javascript']
    })

    // Update the post
    const updatedPost = await blogPostService.updateBlogPost(newPost.id, {
      published: true
    })

    // Get all posts
    const posts = await blogPostService.getBlogPosts({
      page: 1,
      pageSize: 10,
      search: 'react'
    })

    console.log('Posts:', posts)
  } catch (error) {
    console.error('Error:', error.message)
  }
}
```

## Data Structure

### Blog Post Model

```typescript
interface BlogPost {
  id: string                    // UUID primary key
  title: string                 // Required, max 200 chars
  slug: string                  // Auto-generated from title
  excerpt?: string              // Optional, max 300 chars
  content: string               // Required, min 50 chars
  image_url?: string            // Optional image URL
  published: boolean            // Default false
  featured: boolean             // Default false
  tags?: string[]               // Array of tags, max 10
  reading_time?: number         // Auto-calculated minutes
  created_at: string            // ISO timestamp
  updated_at: string            // ISO timestamp
  published_at?: string         // ISO timestamp when published
  user_id?: string              // Optional user reference
}
```

### API Response Format

```typescript
interface BlogPostsResponse {
  blogPosts: BlogPost[]         // Array of blog posts
  total: number                 // Total count for pagination
  totalPages: number            // Total pages
  currentPage: number           // Current page number
  pageSize: number              // Items per page
}
```

## Error Handling

### Error Types

```javascript
import { ERROR_CODES, getErrorMessage } from '../utils/errorHandling'

// Handle different error types
try {
  await blogPostService.createBlogPost(data)
} catch (error) {
  switch (error.code) {
    case ERROR_CODES.VALIDATION_ERROR:
      // Show validation errors
      break
    case ERROR_CODES.DUPLICATE_SLUG:
      // Handle duplicate slug
      break
    case ERROR_CODES.NETWORK_ERROR:
      // Show retry option
      break
    default:
      // Generic error handling
      console.error(getErrorMessage(error))
  }
}
```

## Testing

### Running Tests

```javascript
// Import test functions
import { runAllTests } from '../tests/blogPostService.test.js'

// Run comprehensive tests
await runAllTests()

// Or run specific tests
import { testUtilityFunctions } from '../tests/blogPostService.test.js'
testUtilityFunctions()
```

### Manual Testing in Browser Console

```javascript
// Test functions are available in browser console
await window.testBlogPostService.runAllTests()
```

## Migration from Old Service

If you're migrating from the old `blogService.js` (which uses the `blogs` table), here are the key differences:

### Table Structure Changes
- `blogs` table → `blog_posts` table
- Added `excerpt`, `published`, `featured`, `reading_time`, `published_at` fields
- `thumbnail` → `image_url`
- Better slug handling and validation

### API Changes
```javascript
// Old service
import { blogService } from '../services/blogService'
const blogs = await blogService.getBlogs()

// New service
import { blogPostService } from '../services/blogPostService'
const posts = await blogPostService.getBlogPosts()
```

### Hook Changes
```javascript
// Old hook
import { useBlogList } from '../hooks/useBlogList'

// New hook
import { useBlogPosts } from '../hooks/useBlogPosts'
```

## Best Practices

### 1. Use React Query Hooks
Always prefer the React Query hooks over direct service calls for better UX:

```javascript
// ✅ Good - Uses optimistic updates and caching
const mutation = useCreateBlogPost()
await mutation.mutateAsync(data)

// ❌ Avoid - No optimistic updates or caching
await blogPostService.createBlogPost(data)
```

### 2. Handle Loading States
```javascript
const { data, isLoading, error } = useBlogPosts()

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
```

### 3. Validate Data Before Submission
```javascript
const validation = blogPostService.validateBlogPost(formData)
if (!validation.isValid) {
  setErrors(validation.errors)
  return
}
```

### 4. Use Error Boundaries
```javascript
import { getErrorMessage } from '../utils/errorHandling'

function ErrorBoundary({ error }) {
  return (
    <div className="error">
      {getErrorMessage(error)}
    </div>
  )
}
```

## Configuration

### Query Client Setup
The query client is automatically configured with:
- 5-minute stale time
- 10-minute cache time
- Automatic retries for network errors
- Error logging in development

### Environment Variables
Make sure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### Common Issues

1. **"Blog post not found" errors**
   - Check if the post ID exists in the database
   - Verify RLS policies allow access

2. **Slug conflicts**
   - The service automatically generates unique slugs
   - Manual slugs are validated for uniqueness

3. **Image upload failures**
   - Check file size (max 5MB)
   - Verify file type is an image
   - Ensure Supabase storage bucket exists

4. **Network errors**
   - The service automatically retries network errors
   - Check internet connection and Supabase status

### Debug Mode
Enable debug logging in development:
```javascript
// The query client automatically logs errors in development
// Check browser console for detailed error information
```

## Performance Considerations

- **Pagination**: Always use pagination for large datasets
- **Search**: Search is debounced to avoid excessive API calls
- **Caching**: React Query automatically caches responses
- **Optimistic Updates**: UI updates immediately for better perceived performance
- **Prefetching**: Use `usePrefetchBlogPosts` for pagination

## Security

- **RLS Policies**: Ensure proper Row Level Security policies are set up in Supabase
- **Input Validation**: All inputs are validated both client and server-side
- **File Upload**: Image uploads are restricted by type and size
- **Authentication**: All operations require proper authentication

This integration provides a robust, scalable solution for blog post management with excellent user experience through optimistic updates and proper error handling.