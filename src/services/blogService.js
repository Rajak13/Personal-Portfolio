import { supabase } from '../lib/supabase'

export const blogService = {
  // Get all blogs with pagination, search, and filtering
  async getBlogs({ 
    page = 1, 
    pageSize = 10, 
    search = '', 
    sortBy = 'created_at', 
    sortOrder = 'desc',
    status = 'all' // 'all', 'published', 'draft'
  } = {}) {
    try {
      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order(sortBy, { ascending: sortOrder === 'asc' })

      // Apply search filter
      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
      }

      // Apply status filter (assuming we'll add a published field later)
      // For now, we'll work with the existing structure
      
      // Apply pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1
      query = query.range(from, to)

      const { data, error, count } = await query

      if (error) throw error

      return {
        blogs: data || [],
        total: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize),
        currentPage: page,
        pageSize
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
      throw error
    }
  },

  // Get single blog by ID
  async getBlogById(id) {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching blog:', error)
      throw error
    }
  },

  // Delete single blog
  async deleteBlog(id) {
    try {
      // First check if the blog exists
      const { data: existingBlog, error: fetchError } = await supabase
        .from('blogs')
        .select('id, title')
        .eq('id', id)
        .single()

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          throw new Error('Blog post not found')
        }
        throw fetchError
      }

      // Delete the blog
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      return {
        success: true,
        message: `Blog post "${existingBlog.title}" deleted successfully`,
        deletedBlog: existingBlog
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      throw {
        success: false,
        message: error.message || 'Failed to delete blog post',
        error
      }
    }
  },

  // Delete multiple blogs
  async deleteBlogs(ids) {
    try {
      if (!ids || ids.length === 0) {
        throw new Error('No blog posts selected for deletion')
      }

      // First get the blogs to be deleted for confirmation
      const { data: blogsToDelete, error: fetchError } = await supabase
        .from('blogs')
        .select('id, title')
        .in('id', ids)

      if (fetchError) throw fetchError

      if (blogsToDelete.length !== ids.length) {
        throw new Error('Some blog posts could not be found')
      }

      // Delete the blogs
      const { error } = await supabase
        .from('blogs')
        .delete()
        .in('id', ids)

      if (error) throw error
      
      return {
        success: true,
        message: `${blogsToDelete.length} blog post${blogsToDelete.length > 1 ? 's' : ''} deleted successfully`,
        deletedBlogs: blogsToDelete
      }
    } catch (error) {
      console.error('Error deleting blogs:', error)
      throw {
        success: false,
        message: error.message || 'Failed to delete blog posts',
        error
      }
    }
  },

  // Soft delete single blog (for future implementation)
  async softDeleteBlog(id) {
    try {
      // This would require adding a deleted_at column to the blogs table
      // For now, we'll use hard delete
      return await this.deleteBlog(id)
    } catch (error) {
      console.error('Error soft deleting blog:', error)
      throw error
    }
  },

  // Restore soft deleted blog (for future implementation)
  async restoreBlog(id) {
    try {
      // This would require adding a deleted_at column to the blogs table
      // For now, this is not implemented
      throw new Error('Restore functionality not yet implemented')
    } catch (error) {
      console.error('Error restoring blog:', error)
      throw error
    }
  },

  // Create new blog
  async createBlog(blogData) {
    try {
      // Get current user to ensure authentication
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) throw userError
      if (!user) throw new Error('User must be authenticated to create blogs')

      // Only include fields that exist in the database
      const dbRecord = {
        title: blogData.title,
        content: blogData.content,
        thumbnail: blogData.thumbnail || null,
        video_url: blogData.video_url || null,
        tags: blogData.tags || [],
        type: blogData.type || null
        // Note: user_id column doesn't exist yet, will be added later
      }

      // Skip slug field until column is added to database
      // if (blogData.slug) {
      //   dbRecord.slug = blogData.slug
      // }

      const { data, error } = await supabase
        .from('blogs')
        .insert([dbRecord])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error
    }
  },

  // Update existing blog
  async updateBlog(id, blogData) {
    try {
      // Only include fields that exist in the database
      const updateRecord = {
        title: blogData.title,
        content: blogData.content,
        thumbnail: blogData.thumbnail || null,
        video_url: blogData.video_url || null,
        tags: blogData.tags || [],
        type: blogData.type || null
      }

      // Skip slug field until column is added to database
      // if (blogData.slug) {
      //   updateRecord.slug = blogData.slug
      // }

      const { data, error } = await supabase
        .from('blogs')
        .update(updateRecord)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating blog:', error)
      throw error
    }
  },

  // Upload image to Supabase Storage
  async uploadImage(file) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // First, try to create the bucket if it doesn't exist
      const { data: buckets } = await supabase.storage.listBuckets()
      const bucketExists = buckets?.some(bucket => bucket.name === 'blog-images')
      
      if (!bucketExists) {
        const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
          public: true,
          allowedMimeTypes: ['image/*'],
          fileSizeLimit: 5242880 // 5MB
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
      console.error('Error uploading image:', error)
      throw error
    }
  },

  // Check if slug is unique
  async checkSlugUniqueness(slug, excludeId = null) {
    try {
      let query = supabase
        .from('blogs')
        .select('id')
        .eq('slug', slug)

      if (excludeId) {
        query = query.neq('id', excludeId)
      }

      const { data, error } = await query

      if (error) {
        // If slug column doesn't exist, return false (not duplicate)
        if (error.message?.includes('column "slug" does not exist')) {
          console.warn('Slug column does not exist in blogs table')
          return false
        }
        throw error
      }

      return data && data.length > 0
    } catch (error) {
      console.error('Error checking slug uniqueness:', error)
      // If there's an error (likely missing column), assume no duplicates
      return false
    }
  },

  // Generate unique slug
  async generateUniqueSlug(baseSlug, excludeId = null) {
    try {
      let slug = baseSlug
      let counter = 1

      while (await this.checkSlugUniqueness(slug, excludeId)) {
        slug = `${baseSlug}-${counter}`
        counter++
        
        // Prevent infinite loops
        if (counter > 100) {
          break
        }
      }

      return slug
    } catch (error) {
      console.error('Error generating unique slug:', error)
      // If slug validation fails (likely missing column), return the base slug
      return baseSlug
    }
  },

  // Update blog views
  async incrementViews(id) {
    try {
      // Try to use the RPC function first, fallback to direct update if it doesn't exist
      const { error: rpcError } = await supabase
        .rpc('increment_blog_views', { blog_id: id })

      if (rpcError) {
        // If RPC function doesn't exist, try direct update
        const { data: currentBlog, error: fetchError } = await supabase
          .from('blogs')
          .select('views')
          .eq('id', id)
          .single()

        if (fetchError) throw fetchError

        const currentViews = typeof currentBlog.views === 'number' ? currentBlog.views : 0
        const { error: updateError } = await supabase
          .from('blogs')
          .update({ views: currentViews + 1 })
          .eq('id', id)

        if (updateError) throw updateError
      }

      return true
    } catch (error) {
      console.error('Error incrementing views:', error)
      // Don't throw error for views increment failure - it's not critical
      return false
    }
  }
}