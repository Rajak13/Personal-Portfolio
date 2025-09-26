import { supabase } from '../lib/supabase'

/**
 * Blog Post Service for CMS operations
 * Uses the blog_posts table structure as defined in the requirements
 */
export const blogPostService = {
  // Get all blog posts with pagination, search, and filtering
  async getBlogPosts({ 
    page = 1, 
    pageSize = 10, 
    search = '', 
    sortBy = 'created_at', 
    sortOrder = 'desc',
    status = 'all' // 'all', 'published', 'draft'
  } = {}) {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*', { count: 'exact' })
        .order(sortBy, { ascending: sortOrder === 'asc' })

      // Apply search filter
      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
      }

      // Apply status filter
      if (status === 'published') {
        query = query.eq('published', true)
      } else if (status === 'draft') {
        query = query.eq('published', false)
      }
      
      // Apply pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        blogPosts: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
        pageSize
      }
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to fetch blog posts: ${error.message}`)
    }
  },

  // Get single blog post by ID
  async getBlogPostById(id) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Blog post not found')
        }
        throw error
      }
      
      return data
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to fetch blog post: ${error.message}`)
    }
  },

  // Get single blog post by slug
  async getBlogPostBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Blog post not found')
        }
        throw error
      }
      
      return data
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to fetch blog post: ${error.message}`)
    }
  },

  // Create new blog post
  async createBlogPost(blogData) {
    try {
      // Generate slug from title if not provided
      const slug = blogData.slug || this.generateSlug(blogData.title)
      
      // Check if slug already exists
      const { data: existingPost } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('slug', slug)
        .single()

      if (existingPost) {
        throw new Error('A blog post with this slug already exists')
      }

      // Calculate reading time
      const readingTime = this.calculateReadingTime(blogData.content)

      const postData = {
        title: blogData.title?.trim(),
        slug: slug,
        excerpt: blogData.excerpt?.trim() || null,
        content: blogData.content?.trim(),
        image_url: blogData.image_url || null,
        published: blogData.published || false,
        featured: blogData.featured || false,
        tags: blogData.tags || [],
        reading_time: readingTime,
        published_at: blogData.published ? new Date().toISOString() : null,
        user_id: blogData.user_id || null
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single()

      if (error) throw error
      
      return data
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to create blog post: ${error.message}`)
    }
  },

  // Update existing blog post
  async updateBlogPost(id, blogData) {
    try {
      // Check if blog post exists
      const existingPost = await this.getBlogPostById(id)
      
      // Generate slug from title if changed and not provided
      let slug = blogData.slug
      if (!slug && blogData.title && blogData.title !== existingPost.title) {
        slug = this.generateSlug(blogData.title)
        
        // Check if new slug already exists (excluding current post)
        const { data: conflictingPost } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', slug)
          .neq('id', id)
          .single()

        if (conflictingPost) {
          throw new Error('A blog post with this slug already exists')
        }
      }

      // Calculate reading time if content changed
      let readingTime = existingPost.reading_time
      if (blogData.content && blogData.content !== existingPost.content) {
        readingTime = this.calculateReadingTime(blogData.content)
      }

      const updateData = {
        ...(blogData.title !== undefined && { title: blogData.title.trim() }),
        ...(slug && { slug }),
        ...(blogData.excerpt !== undefined && { excerpt: blogData.excerpt?.trim() || null }),
        ...(blogData.content !== undefined && { content: blogData.content.trim() }),
        ...(blogData.image_url !== undefined && { image_url: blogData.image_url || null }),
        ...(blogData.published !== undefined && { published: blogData.published }),
        ...(blogData.featured !== undefined && { featured: blogData.featured }),
        ...(blogData.tags !== undefined && { tags: blogData.tags || [] }),
        reading_time: readingTime,
        updated_at: new Date().toISOString()
      }

      // Set published_at if publishing for the first time
      if (blogData.published && !existingPost.published) {
        updateData.published_at = new Date().toISOString()
      } else if (!blogData.published && existingPost.published) {
        updateData.published_at = null
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      
      return data
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to update blog post: ${error.message}`)
    }
  },

  // Delete single blog post
  async deleteBlogPost(id) {
    try {
      // First check if the blog post exists
      const existingPost = await this.getBlogPostById(id)

      // Delete the blog post
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      return {
        success: true,
        message: `Blog post "${existingPost.title}" deleted successfully`,
        deletedPost: existingPost
      }
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to delete blog post: ${error.message}`)
    }
  },

  // Delete multiple blog posts
  async deleteBlogPosts(ids) {
    try {
      if (!ids || ids.length === 0) {
        throw new Error('No blog posts selected for deletion')
      }

      // First get the blog posts to be deleted for confirmation
      const { data: postsToDelete, error: fetchError } = await supabase
        .from('blog_posts')
        .select('id, title')
        .in('id', ids)

      if (fetchError) throw fetchError

      if (postsToDelete.length !== ids.length) {
        throw new Error('Some blog posts could not be found')
      }

      // Delete the blog posts
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .in('id', ids)

      if (error) throw error
      
      return {
        success: true,
        message: `${postsToDelete.length} blog post${postsToDelete.length > 1 ? 's' : ''} deleted successfully`,
        deletedPosts: postsToDelete
      }
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to delete blog posts: ${error.message}`)
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file) {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file')
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        throw new Error('Image size must be less than 5MB')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // Check if bucket exists, create if it doesn't
      const { data: buckets } = await supabase.storage.listBuckets()
      const bucketExists = buckets?.some(bucket => bucket.name === 'blog-images')
      
      if (!bucketExists) {
        const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
          public: true,
          allowedMimeTypes: ['image/*'],
          fileSizeLimit: maxSize
        })
        
        if (bucketError && !bucketError.message.includes('already exists')) {
          throw bucketError
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      const parsedError = parseSupabaseError(error)
      throw parsedError || new Error(`Failed to upload image: ${error.message}`)
    }
  },

  // Utility function to generate URL-friendly slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  },

  // Utility function to calculate reading time
  calculateReadingTime(content) {
    if (!content) return 0
    
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(words / wordsPerMinute)
    
    return readingTime
  },

  // Validate blog post data
  validateBlogPost(blogData) {
    const errors = []

    if (!blogData.title || blogData.title.trim().length === 0) {
      errors.push('Title is required')
    } else if (blogData.title.trim().length > 200) {
      errors.push('Title must be less than 200 characters')
    }

    if (!blogData.content || blogData.content.trim().length === 0) {
      errors.push('Content is required')
    } else if (blogData.content.trim().length < 50) {
      errors.push('Content must be at least 50 characters')
    }

    if (blogData.excerpt && blogData.excerpt.trim().length > 300) {
      errors.push('Excerpt must be less than 300 characters')
    }

    if (blogData.tags && Array.isArray(blogData.tags) && blogData.tags.length > 10) {
      errors.push('Maximum 10 tags allowed')
    }

    if (blogData.image_url && blogData.image_url.trim() && !this.isValidUrl(blogData.image_url)) {
      errors.push('Image URL must be a valid URL')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Utility function to validate URL
  isValidUrl(string) {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }
}