import { Image as ImageIcon, Upload, X } from 'lucide-react'
import React, { useState } from 'react'
import storageService from '../../services/storageService'

const ImageUpload = ({ 
  onImageUploaded, 
  currentImage = null, 
  bucketType = 'blog', // 'blog', 'project', or 'avatar'
  className = '',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB default
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState(null)

  const uploadMethods = {
    blog: storageService.uploadBlogImage,
    project: storageService.uploadProjectImage,
    avatar: storageService.uploadAvatar
  }

  const handleFileUpload = async (file) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }

    setUploading(true)
    setError(null)

    try {
      const uploadMethod = uploadMethods[bucketType]
      if (!uploadMethod) {
        throw new Error('Invalid bucket type')
      }

      const imageUrl = await uploadMethod(file)
      onImageUploaded(imageUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = () => {
    onImageUploaded(null)
    setError(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {currentImage ? (
        <div className="relative group">
          <img
            src={currentImage}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            dragOver
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`image-upload-${bucketType}`}
            disabled={uploading}
          />
          
          <label
            htmlFor={`image-upload-${bucketType}`}
            className="cursor-pointer flex flex-col items-center space-y-4"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <ImageIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">Upload Image</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop or click to select
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Max size: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            )}
          </label>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload