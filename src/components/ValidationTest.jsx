import React, { useEffect } from 'react'
import { generateSlug, validateBlogPost, validateField } from '../utils/validation'

const ValidationTest = () => {
  useEffect(() => {
    console.log('🧪 Running validation tests...')
    
    // Test 1: Title validation
    console.log('Testing title validation:')
    console.log('Empty title:', validateField('title', ''))
    console.log('Valid title:', validateField('title', 'My Great Blog Post'))
    
    // Test 2: Slug generation
    console.log('Testing slug generation:')
    console.log('Generated slug:', generateSlug('My Great Blog Post!'))
    
    // Test 3: Complete form validation
    console.log('Testing complete form:')
    const testForm = {
      title: 'Test Blog Post',
      content: 'This is a test blog post with enough content to meet the minimum requirements for validation testing.',
      slug: 'test-blog-post',
      tags: ['test', 'validation']
    }
    console.log('Form validation result:', validateBlogPost(testForm))
    
    console.log('✅ Validation tests completed!')
  }, [])

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <h3 className="font-semibold text-blue-900 dark:text-blue-100">Validation Test Component</h3>
      <p className="text-sm text-blue-700 dark:text-blue-300">Check the browser console for validation test results.</p>
    </div>
  )
}

export default ValidationTest