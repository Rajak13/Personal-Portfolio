import { Check, Link, RefreshCw, X } from 'lucide-react'
import { useEffect } from 'react'
import { useAsyncValidation, useSlugGeneration } from '../../hooks/useFormValidation'
import { generateSlug } from '../../utils/validation'

const SlugInput = ({ 
  label = "URL Slug",
  title = '',
  value = '',
  onChange,
  error,
  onValidation,
  checkUniqueness,
  currentId = null,
  baseUrl = '',
  className = '',
  ...props 
}) => {
  const {
    slug,
    isCustomSlug,
    updateSlug,
    resetSlug,
    validation,
    generatedSlug
  } = useSlugGeneration(title, value)

  // Async validation for uniqueness
  const uniquenessValidation = useAsyncValidation(
    checkUniqueness ? (slug) => checkUniqueness(slug, currentId) : null,
    [slug]
  )

  // Update parent component when slug changes
  useEffect(() => {
    if (onChange && slug !== value) {
      onChange(slug)
    }
  }, [slug, value]) // Remove onChange from dependencies to prevent infinite loop

  // Report validation status to parent
  useEffect(() => {
    if (onValidation) {
      const isValid = validation.isValid && uniquenessValidation.result.isValid
      const combinedError = validation.error || uniquenessValidation.result.error
      onValidation({
        isValid,
        error: combinedError,
        isValidating: validation.isValidating || uniquenessValidation.isValidating
      })
    }
  }, [validation.isValid, validation.error, validation.isValidating, uniquenessValidation.result.isValid, uniquenessValidation.result.error, uniquenessValidation.isValidating]) // Remove onValidation from dependencies

  const handleSlugChange = (e) => {
    const newSlug = generateSlug(e.target.value)
    updateSlug(newSlug)
  }

  const handleResetSlug = () => {
    resetSlug()
  }

  // Determine validation state
  const hasError = error || validation.error || uniquenessValidation.result.error
  const isValidating = validation.isValidating || uniquenessValidation.isValidating
  const isValid = !hasError && slug && validation.isValid && uniquenessValidation.result.isValid

  const inputClasses = `
    w-full px-3 py-2 pr-20 border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    ${hasError
      ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
      : isValid
      ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20'
      : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
    }
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    font-mono text-sm
    ${className}
  `

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}

      {/* URL Preview */}
      {baseUrl && slug && (
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
          <Link className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-mono break-all">
            {baseUrl}{slug}
          </span>
        </div>
      )}

      <div className="relative">
        <input
          type="text"
          value={slug}
          onChange={handleSlugChange}
          className={inputClasses}
          placeholder="url-slug-example"
          {...props}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Reset button */}
          {isCustomSlug && generatedSlug !== slug && (
            <button
              type="button"
              onClick={handleResetSlug}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title="Reset to auto-generated slug"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          
          {/* Validation status */}
          {isValidating ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          ) : isValid ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : hasError ? (
            <X className="w-4 h-4 text-red-500" />
          ) : null}
        </div>
      </div>

      {/* Auto-generation info */}
      {!isCustomSlug && title && (
        <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
          <RefreshCw className="w-3 h-3 mr-1" />
          Auto-generated from title
        </p>
      )}

      {/* Custom slug info */}
      {isCustomSlug && (
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Custom URL slug (will not auto-update from title)
        </p>
      )}

      {/* Database column missing notice */}
      <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded">
        ⚠️ Note: Slug functionality requires database migration. Currently using ID-based URLs.
      </p>

      {/* Validation messages */}
      {hasError && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <X className="w-4 h-4 mr-1 flex-shrink-0" />
          {hasError}
        </p>
      )}

      {/* Character count */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>
          {slug.length}/100 characters
        </span>
        <span>
          Only lowercase letters, numbers, and hyphens allowed
        </span>
      </div>
    </div>
  )
}

export default SlugInput