/**
 * Custom hooks for form validation
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    debounce,
    generateSlug,
    getCharacterCount,
    getValidationStatus,
    validateBlogPost
} from '../utils/validation'

/**
 * Hook for real-time field validation
 */
export function useFieldValidation(fieldName, value, options = {}) {
  const { 
    debounceMs = 300, 
    validateOnMount = false,
    customRules = null 
  } = options

  const [validation, setValidation] = useState({
    isValid: true,
    error: null,
    errors: [],
    status: 'valid',
    severity: 'success',
    characterCount: null
  })

  const [isValidating, setIsValidating] = useState(false)

  // Debounced validation function
  const debouncedValidate = useCallback(
    debounce((fieldName, value) => {
      setIsValidating(true)
      const result = getValidationStatus(fieldName, value)
      setValidation(result)
      setIsValidating(false)
    }, debounceMs),
    [debounceMs]
  )

  // Validate immediately for certain cases
  const validateImmediate = useCallback((fieldName, value) => {
    const result = getValidationStatus(fieldName, value)
    setValidation(result)
  }, [])

  useEffect(() => {
    if (validateOnMount || value) {
      // For required fields or when there's a value, use debounced validation
      if (value && value.length > 0) {
        debouncedValidate(fieldName, value)
      } else {
        // For empty values, validate immediately to show required field errors
        validateImmediate(fieldName, value)
      }
    }
  }, [fieldName, value, validateOnMount, debouncedValidate, validateImmediate])

  return {
    ...validation,
    isValidating,
    validate: () => validateImmediate(fieldName, value)
  }
}

/**
 * Hook for managing form-wide validation
 */
export function useFormValidation(initialData = {}) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isValidating, setIsValidating] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Debounced form validation
  const debouncedValidateForm = useCallback(
    debounce((data) => {
      setIsValidating(true)
      const validation = validateBlogPost(data)
      setErrors(validation.errors)
      setIsValid(validation.isValid)
      setIsValidating(false)
    }, 500),
    []
  )

  // Update form data
  const updateField = useCallback((fieldName, value) => {
    setFormData(prev => {
      const newData = { ...prev, [fieldName]: value }
      
      // Auto-generate slug when title changes
      if (fieldName === 'title' && value) {
        newData.slug = generateSlug(value)
      }
      
      // Trigger form validation
      debouncedValidateForm(newData)
      
      return newData
    })

    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldName]: true }))

    // Clear field error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }))
    }
  }, [errors, debouncedValidateForm])

  // Mark field as touched
  const touchField = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
  }, [])

  // Validate entire form
  const validateForm = useCallback(() => {
    setIsValidating(true)
    const validation = validateBlogPost(formData)
    setErrors(validation.errors)
    setIsValid(validation.isValid)
    setIsValidating(false)
    
    // Mark all fields as touched
    const allFields = Object.keys(validation.errors)
    const touchedFields = {}
    allFields.forEach(field => {
      touchedFields[field] = true
    })
    setTouched(prev => ({ ...prev, ...touchedFields }))
    
    return validation
  }, [formData])

  // Reset form
  const resetForm = useCallback((newData = {}) => {
    setFormData(newData)
    setErrors({})
    setTouched({})
    setIsValid(false)
  }, [])

  // Get field validation status
  const getFieldStatus = useCallback((fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName]
    const fieldValue = formData[fieldName]
    
    return {
      hasError,
      error: hasError ? errors[fieldName] : null,
      isValid: !hasError && touched[fieldName],
      isTouched: touched[fieldName],
      characterCount: getCharacterCount(fieldName, fieldValue)
    }
  }, [errors, touched, formData])

  // Memoized form status
  const formStatus = useMemo(() => ({
    isValid,
    hasErrors: Object.keys(errors).length > 0,
    errorCount: Object.keys(errors).length,
    touchedCount: Object.keys(touched).length,
    isValidating
  }), [isValid, errors, touched, isValidating])

  return {
    formData,
    errors,
    touched,
    isValid,
    isValidating,
    formStatus,
    updateField,
    touchField,
    validateForm,
    resetForm,
    getFieldStatus,
    setFormData
  }
}

/**
 * Hook for character count display
 */
export function useCharacterCount(fieldName, value) {
  return useMemo(() => {
    return getCharacterCount(fieldName, value)
  }, [fieldName, value])
}

/**
 * Hook for slug generation and validation
 */
export function useSlugGeneration(title, customSlug = '') {
  const [slug, setSlug] = useState(customSlug)
  const [isCustomSlug, setIsCustomSlug] = useState(!!customSlug)

  // Auto-generate slug from title if not custom
  useEffect(() => {
    if (!isCustomSlug && title) {
      const generatedSlug = generateSlug(title)
      setSlug(generatedSlug)
    }
  }, [title, isCustomSlug])

  // Update slug manually
  const updateSlug = useCallback((newSlug) => {
    setSlug(newSlug)
    setIsCustomSlug(true)
  }, [])

  // Reset to auto-generated slug
  const resetSlug = useCallback(() => {
    setIsCustomSlug(false)
    if (title) {
      setSlug(generateSlug(title))
    }
  }, [title])

  // Validation for the slug
  const validation = useFieldValidation('slug', slug, { debounceMs: 500 })

  return {
    slug,
    isCustomSlug,
    updateSlug,
    resetSlug,
    validation,
    generatedSlug: title ? generateSlug(title) : ''
  }
}

/**
 * Hook for async validation (like slug uniqueness)
 */
export function useAsyncValidation(validator, dependencies = []) {
  const [isValidating, setIsValidating] = useState(false)
  const [result, setResult] = useState({ isValid: true, error: null })

  const validate = useCallback(async (...args) => {
    if (!validator) return { isValid: true, error: null }

    setIsValidating(true)
    try {
      const validationResult = await validator(...args)
      setResult(validationResult)
      return validationResult
    } catch (error) {
      const errorResult = { isValid: false, error: error.message || 'Validation failed' }
      setResult(errorResult)
      return errorResult
    } finally {
      setIsValidating(false)
    }
  }, [validator])

  // Auto-validate when dependencies change
  useEffect(() => {
    if (dependencies.some(dep => dep !== null && dep !== undefined && dep !== '')) {
      validate(...dependencies)
    }
  }, dependencies)

  return {
    isValidating,
    result,
    validate
  }
}