import { ImageIcon } from 'lucide-react'
import React, { useState } from 'react'

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackClassName = '',
  ...props 
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  if (imageError || !src) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${fallbackClassName || className}`}
        {...props}
      >
        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
          <ImageIcon className="w-12 h-12 mb-2" />
          <span className="text-sm font-medium">No Image</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 ${className}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        {...props}
      />
    </div>
  )
}

export default ImageWithFallback