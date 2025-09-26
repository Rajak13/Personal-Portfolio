/**
 * Comprehensive form validation utilities for the blog CMS
 */

import { BlogPostError, ERROR_CODES } from './errorHandling'

/**
 * Validation rules for blog post fields
 */
export const VALIDATION_RULES = {
  title: {
    required: true,
    minLength: 3,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9\s\-_.,!?()'"]+$/,
    message: 'Title must contain only letters, numbers, spaces, and basic punctuation'
  },
  content: {
    required: true,
    minLength: 50,
    maxLength: 50000,
    message: 'Content must be between 50 and 50,000 characters'
  },
  excerpt: {
    required: false,
    maxLength: 300,
    message: 'Excerpt must be less than 300 characters'
  },
  slug: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: 'Slug must contain only lowercase letters, numbers, and hyphens'
  },
  thumbnail: {
    required: false,
    pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i,
    message: 'Thumbnail must be a valid image URL (jpg, jpeg, png, gif, webp)'
  },
  video_url: {
    required: false,
    pattern: /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/|dailymotion\.com\/video\/)/i,
    message: 'Video URL must be from YouTube, Vimeo, or Dailymotion'
  },
  tags: {
    required: false,
    maxItems: 10,
    itemMaxLength: 30,
    itemPattern: /^[a-zA-Z0-9\s\-_]+$/,
    message: 'Tags must contain only letters, numbers, spaces, hyphens, and underscores'
  },
  type: {
    required: false,
    allowedValues: ['tutorial', 'article', 'news', 'review', 'guide'],
    message: 'Type must be one of: tutorial, article, news, review, guide'
  }
}

/**
 * Generate URL slug from title
 */
export function generateSlug(title) {
  if (!title || typeof title !== 'string') {
    return ''
  }

  return title
    .toLowerCase()
    .trim()
    // Replace spaces and special characters with hyphens
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')
    // Limit length
    .substring(0, 100)
}

/**
 * Validate a single field
 */
export function validateField(fieldName, value, rules = VALIDATION_RULES) {
  const rule = rules[fieldName]
  if (!rule) {
    return { isValid: true, error: null }
  }

  const errors = []

  // Required field validation
  if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
    errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`)
  }

  // Skip other validations if field is empty and not required
  if (!rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return { isValid: true, error: null }
  }

  // String validations
  if (typeof value === 'string') {
    // Minimum length
    if (rule.minLength && value.trim().length < rule.minLength) {
      errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rule.minLength} characters`)
    }

    // Maximum length
    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${rule.maxLength} characters`)
    }

    // Pattern validation
    if (rule.pattern && value.trim() && !rule.pattern.test(value.trim())) {
      errors.push(rule.message || `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} format is invalid`)
    }
  }

  // Array validations (for tags)
  if (Array.isArray(value)) {
    // Maximum items
    if (rule.maxItems && value.length > rule.maxItems) {
      errors.push(`Maximum ${rule.maxItems} ${fieldName} allowed`)
    }

    // Validate each item
    if (rule.itemPattern || rule.itemMaxLength) {
      value.forEach((item, index) => {
        if (rule.itemMaxLength && item.length > rule.itemMaxLength) {
          errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} item ${index + 1} must be less than ${rule.itemMaxLength} characters`)
        }
        if (rule.itemPattern && !rule.itemPattern.test(item)) {
          errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} item "${item}" ${rule.message || 'format is invalid'}`)
        }
      })
    }
  }

  // Allowed values validation
  if (rule.allowedValues && value && !rule.allowedValues.includes(value)) {
    errors.push(rule.message || `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be one of: ${rule.allowedValues.join(', ')}`)
  }

  return {
    isValid: errors.length === 0,
    error: errors.length > 0 ? errors[0] : null,
    errors: errors
  }
}

/**
 * Validate entire blog post form data
 */
export function validateBlogPost(formData) {
  const errors = {}
  let isValid = true

  // Validate each field
  Object.keys(VALIDATION_RULES).forEach(fieldName => {
    const validation = validateField(fieldName, formData[fieldName])
    if (!validation.isValid) {
      errors[fieldName] = validation.error
      isValid = false
    }
  })

  // Custom cross-field validations
  
  // Auto-generate slug if not provided
  if (!formData.slug && formData.title) {
    formData.slug = generateSlug(formData.title)
  }

  // Validate generated slug
  if (formData.slug) {
    const slugValidation = validateField('slug', formData.slug)
    if (!slugValidation.isValid) {
      errors.slug = slugValidation.error
      isValid = false
    }
  }

  // Ensure excerpt is shorter than content
  if (formData.excerpt && formData.content && formData.excerpt.length >= formData.content.length) {
    errors.excerpt = 'Excerpt should be shorter than the main content'
    isValid = false
  }

  return {
    isValid,
    errors,
    data: formData
  }
}

/**
 * Real-time validation hook for form fields
 */
export function useFieldValidation(fieldName, value, customRules = null) {
  const rules = customRules || VALIDATION_RULES
  return validateField(fieldName, value, rules)
}

/**
 * Get character count information for a field
 */
export function getCharacterCount(fieldName, value) {
  const rule = VALIDATION_RULES[fieldName]
  if (!rule) return null

  const currentLength = typeof value === 'string' ? value.length : 0
  const maxLength = rule.maxLength
  const minLength = rule.minLength

  return {
    current: currentLength,
    max: maxLength,
    min: minLength,
    remaining: maxLength ? maxLength - currentLength : null,
    isOverLimit: maxLength ? currentLength > maxLength : false,
    isUnderMinimum: minLength ? currentLength < minLength : false,
    percentage: maxLength ? Math.min((currentLength / maxLength) * 100, 100) : 0
  }
}

/**
 * Get validation status for UI display
 */
export function getValidationStatus(fieldName, value) {
  const validation = validateField(fieldName, value)
  const charCount = getCharacterCount(fieldName, value)

  return {
    ...validation,
    characterCount: charCount,
    status: validation.isValid ? 'valid' : 'invalid',
    severity: validation.isValid ? 'success' : 'error'
  }
}

/**
 * Validate URL format
 */
export function isValidUrl(string) {
  if (!string) return false
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

/**
 * Validate image URL format
 */
export function isValidImageUrl(url) {
  if (!isValidUrl(url)) return false
  return VALIDATION_RULES.thumbnail.pattern.test(url)
}

/**
 * Validate video URL format
 */
export function isValidVideoUrl(url) {
  if (!isValidUrl(url)) return false
  return VALIDATION_RULES.video_url.pattern.test(url)
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Check if slug is unique (would need to be called with database check)
 */
export async function validateSlugUniqueness(slug, currentId = null, checkFunction) {
  if (!slug || !checkFunction) {
    return { isValid: false, error: 'Slug validation function not provided' }
  }

  try {
    const exists = await checkFunction(slug, currentId)
    return {
      isValid: !exists,
      error: exists ? 'This URL slug is already in use. Please choose a different one.' : null
    }
  } catch (error) {
    return {
      isValid: false,
      error: 'Unable to validate slug uniqueness. Please try again.'
    }
  }
}

/**
 * Debounce function for real-time validation
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Format validation errors for display
 */
export function formatValidationError(error) {
  if (error instanceof BlogPostError) {
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'Validation error occurred'
}

/**
 * Create validation error
 */
export function createValidationError(message, field = null) {
  return new BlogPostError(
    message,
    ERROR_CODES.VALIDATION_ERROR,
    { field }
  )
}