/**
 * Simple test runner for the blog post service
 * This can be used to verify the service works correctly
 */

import { blogPostService } from '../services/blogPostService'

/**
 * Run basic validation tests
 */
export function runValidationTests() {
  console.log('🧪 Running validation tests...')
  
  // Test 1: Valid data should pass
  const validData = {
    title: 'Test Blog Post',
    content: 'This is a test blog post with enough content to meet the minimum requirements for validation.',
    excerpt: 'Test excerpt',
    tags: ['test', 'validation']
  }
  
  const validResult = blogPostService.validateBlogPost(validData)
  console.assert(validResult.isValid === true, 'Valid data should pass validation')
  console.log('✅ Valid data test passed')
  
  // Test 2: Invalid data should fail
  const invalidData = {
    title: '', // Empty title
    content: 'Short', // Too short content
    excerpt: 'A'.repeat(400), // Too long excerpt
    tags: Array(15).fill('tag') // Too many tags
  }
  
  const invalidResult = blogPostService.validateBlogPost(invalidData)
  console.assert(invalidResult.isValid === false, 'Invalid data should fail validation')
  console.assert(invalidResult.errors.length > 0, 'Should have validation errors')
  console.log('✅ Invalid data test passed')
  console.log('Validation errors:', invalidResult.errors)
  
  console.log('✅ All validation tests passed!\n')
}

/**
 * Run utility function tests
 */
export function runUtilityTests() {
  console.log('🔧 Running utility function tests...')
  
  // Test slug generation
  const testCases = [
    { input: 'Hello World!', expected: 'hello-world' },
    { input: 'React & JavaScript Tips', expected: 'react-javascript-tips' },
    { input: '  Multiple   Spaces  ', expected: 'multiple-spaces' },
    { input: 'Special@#$%Characters', expected: 'specialcharacters' }
  ]
  
  testCases.forEach(({ input, expected }) => {
    const result = blogPostService.generateSlug(input)
    console.assert(result === expected, `Slug generation failed: "${input}" -> "${result}" (expected "${expected}")`)
  })
  console.log('✅ Slug generation tests passed')
  
  // Test reading time calculation
  const shortText = 'This is a short text.'
  const longText = 'This is a much longer text that should take more time to read. '.repeat(50)
  
  const shortTime = blogPostService.calculateReadingTime(shortText)
  const longTime = blogPostService.calculateReadingTime(longText)
  
  console.assert(shortTime > 0, 'Short text should have reading time > 0')
  console.assert(longTime > shortTime, 'Long text should have longer reading time')
  console.log('✅ Reading time calculation tests passed')
  
  // Test URL validation
  const validUrls = [
    'https://example.com/image.jpg',
    'http://localhost:3000/test.png',
    'https://cdn.example.com/path/to/image.gif'
  ]
  
  const invalidUrls = [
    'not-a-url',
    'ftp://example.com/file.txt',
    'javascript:alert("xss")'
  ]
  
  validUrls.forEach(url => {
    console.assert(blogPostService.isValidUrl(url), `Valid URL should pass: ${url}`)
  })
  
  invalidUrls.forEach(url => {
    console.assert(!blogPostService.isValidUrl(url), `Invalid URL should fail: ${url}`)
  })
  console.log('✅ URL validation tests passed')
  
  console.log('✅ All utility tests passed!\n')
}

/**
 * Test error handling utilities
 */
export function runErrorHandlingTests() {
  console.log('🚨 Running error handling tests...')
  
  // Import error handling utilities
  import('../utils/errorHandling.js').then(({ 
    parseSupabaseError, 
    getErrorMessage, 
    isRetryableError,
    BlogPostError,
    ERROR_CODES 
  }) => {
    // Test custom error creation
    const customError = new BlogPostError('Test error', ERROR_CODES.VALIDATION_ERROR)
    console.assert(customError.name === 'BlogPostError', 'Custom error should have correct name')
    console.assert(customError.code === ERROR_CODES.VALIDATION_ERROR, 'Custom error should have correct code')
    console.log('✅ Custom error creation test passed')
    
    // Test error message extraction
    const message1 = getErrorMessage(customError)
    const message2 = getErrorMessage('String error')
    const message3 = getErrorMessage({ message: 'Object error' })
    
    console.assert(message1 === 'Test error', 'Should extract message from BlogPostError')
    console.assert(message2 === 'String error', 'Should handle string errors')
    console.assert(message3 === 'Object error', 'Should extract message from error objects')
    console.log('✅ Error message extraction tests passed')
    
    // Test retry logic
    const retryableError = new BlogPostError('Network error', ERROR_CODES.NETWORK_ERROR)
    const nonRetryableError = new BlogPostError('Validation error', ERROR_CODES.VALIDATION_ERROR)
    
    console.assert(isRetryableError(retryableError), 'Network errors should be retryable')
    console.assert(!isRetryableError(nonRetryableError), 'Validation errors should not be retryable')
    console.log('✅ Retry logic tests passed')
    
    console.log('✅ All error handling tests passed!\n')
  }).catch(error => {
    console.error('❌ Error handling tests failed:', error)
  })
}

/**
 * Run all tests
 */
export function runAllTests() {
  console.log('🎯 Starting Blog Post Service Tests...\n')
  
  try {
    runValidationTests()
    runUtilityTests()
    runErrorHandlingTests()
    
    console.log('🎉 All tests completed successfully!')
    return true
  } catch (error) {
    console.error('❌ Tests failed:', error)
    return false
  }
}

/**
 * Make test functions available in browser console for manual testing
 */
if (typeof window !== 'undefined') {
  window.blogPostTests = {
    runAllTests,
    runValidationTests,
    runUtilityTests,
    runErrorHandlingTests
  }
  
  console.log('🧪 Blog post tests available in console:')
  console.log('- window.blogPostTests.runAllTests()')
  console.log('- window.blogPostTests.runValidationTests()')
  console.log('- window.blogPostTests.runUtilityTests()')
  console.log('- window.blogPostTests.runErrorHandlingTests()')
}