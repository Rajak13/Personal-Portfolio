import { useCharacterCount } from '../../hooks/useFormValidation'

const Input = ({ 
  label,
  error,
  className = '',
  showCharacterCount = false,
  characterCountField = null,
  maxLength,
  minLength,
  helpText,
  isValid,
  isValidating,
  required = false,
  ...props 
}) => {
  const characterCount = useCharacterCount(characterCountField, props.value || '')
  
  // Determine validation state
  const hasError = error && error.length > 0
  const hasSuccess = isValid && props.value && props.value.length > 0 && !hasError
  
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    ${hasError
      ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
      : hasSuccess
      ? 'border-green-300 bg-green-50 dark:border-green-600 dark:bg-green-900/20'
      : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
    }
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-900
    ${isValidating ? 'animate-pulse' : ''}
    ${className}
  `

  // Character count display logic
  const shouldShowCharCount = showCharacterCount && characterCount && (characterCount.max || maxLength)
  const currentCount = props.value ? props.value.length : 0
  const maxCount = characterCount?.max || maxLength
  const isOverLimit = maxCount && currentCount > maxCount
  const isNearLimit = maxCount && currentCount > maxCount * 0.8

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          className={inputClasses}
          maxLength={maxLength || characterCount?.max}
          {...props}
        />
        
        {isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasSuccess && !isValidating && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Help text */}
      {helpText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {helpText}
        </p>
      )}

      {/* Character count */}
      {shouldShowCharCount && (
        <div className="flex justify-between items-center text-xs">
          <span className={`${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {currentCount}{maxCount && `/${maxCount}`}
            {characterCount?.min && currentCount < characterCount.min && (
              <span className="ml-1 text-red-500">
                (need {characterCount.min - currentCount} more)
              </span>
            )}
          </span>
          {maxCount && (
            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-200 ${
                  isOverLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((currentCount / maxCount) * 100, 100)}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input