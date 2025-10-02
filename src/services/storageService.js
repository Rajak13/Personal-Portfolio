import { supabase } from '../lib/supabase'

export const storageService = {
  // Upload image to blog-images bucket
  async uploadBlogImage(file) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading blog image:', error)
      throw error
    }
  },

  // Upload image to project-images bucket
  async uploadProjectImage(file) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `project-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading project image:', error)
      throw error
    }
  },

  // Upload avatar image
  async uploadAvatar(file, userId) {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading avatar:', error)
      throw error
    }
  },

  // Delete image from storage
  async deleteImage(bucketName, filePath) {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath])

      if (error) throw error
      return true
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  },

  // Get all images from a bucket
  async listImages(bucketName, folder = '') {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .list(folder)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error listing images:', error)
      throw error
    }
  },

  // Get public URL for an image
  getPublicUrl(bucketName, filePath) {
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)
    
    return publicUrl
  }
}

export default storageService