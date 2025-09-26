/**
 * Comprehensive validation tests for the blog CMS
 */

import {
    generateSlug,
    getCharacterCount,
    isValidImageUrl,
    isValidUrl,
    isValidVideoUrl,
    validateBlogPost,
    validateField
} from '../utils/validation'

/**
 * Test validation utility functions
 */
export function runValidationTests() {
  console.log('🧪 Running comprehensive validation tests...')
  
  let passedTests = 0
  let totalTests = 0

  const test = (description, assertion) => {
    totalTests++
    try {
      if (assertion()) {
        console.log(`   ✅ ${description}`)
        passedTests++
      } else {
        console.log(`   ❌ ${description}`)
      }
    } catch (error) {
      console.log(`   ❌ ${description} - Error: ${error.message}`)
    }
  }

  // Test 1: Title validation
  console.log('\n📝 Testing title validation:')
  
  test('Empty title should fail', () => {
    const result = validateField('title', '')
    return !result.isValid && result.error.includes('required')
  })
  
  test('Short title should fail', () => {
    const result = validateField('title', 'Hi')
    return !result.isValid && result.error.includes('at least 3')
  })
  
  test('Long title should fail', () => {
    const result = validateField('title', 'a'.repeat(201))
    return !result.isValid && result.error.includes('less than 200')
  })
  
  test('Valid title should pass', () => {
    const result = validateField('title', 'My Great Blog Post')
    return result.isValid
  })

  // Test 2: Content validation
  console.log('\n📄 Testing content validation:')
  
  test('Empty content should fail', () => {
    const result = validateField('content', '')
    return !result.isValid && result.error.includes('required')
  })
  
  test('Short content should fail', () => {
    const result = validateField('content', 'Too short')
    return !result.isValid && result.error.includes('at least 50')
  })
  
  test('Long content should fail', () => {
    const result = validateField('content', 'a'.repeat(50001))
    return !result.isValid && result.error.includes('less than 50,000')
  })
  
  test('Valid content should pass', () => {
    const result = validateField('content', 'This is a valid blog post content that is long enough to meet the minimum requirements and provides good value to readers.')
    return result.isValid
  })

  // Test 3: Slug validation
  console.log('\n🔗 Testing slug validation:')
  
  test('Empty slug should fail', () => {
    const result = validateField('slug', '')
    return !result.isValid && result.error.includes('required')
  })
  
  test('Invalid slug characters should fail', () => {
    const result = validateField('slug', 'invalid slug!')
    return !result.isValid
  })
  
  test('Uppercase slug should fail', () => {
    const result = validateField('slug', 'Invalid-Slug')
    return !result.isValid
  })
  
  test('Valid slug should pass', () => {
    const result = validateField('slug', 'valid-blog-slug')
    return result.isValid
  })

  // Test 4: Slug generation
  console.log('\n🏷️ Testing slug generation:')
  
  test('Generate slug from title', () => {
    const slug = generateSlug('My Great Blog Post!')
    return slug === 'my-great-blog-post'
  })
  
  test('Handle special characters', () => {
    const slug = generateSlug('Hello, World! & More...')
    return slug === 'hello-world-more'
  })
  
  test('Handle multiple spaces', () => {
    const slug = generateSlug('Multiple   Spaces    Here')
    return slug === 'multiple-spaces-here'
  })
  
  test('Handle empty title', () => {
    const slug = generateSlug('')
    return slug === ''
  })

  // Test 5: URL validation
  console.log('\n🌐 Testing URL validation:')
  
  test('Valid HTTP URL', () => {
    return isValidUrl('http://example.com')
  })
  
  test('Valid HTTPS URL', () => {
    return isValidUrl('https://example.com')
  })
  
  test('Invalid URL', () => {
    return !isValidUrl('not-a-url')
  })
  
  test('Empty URL', () => {
    return !isValidUrl('')
  })

  // Test 6: Image URL validation
  console.log('\n🖼️ Testing image URL validation:')
  
  test('Valid JPG image URL', () => {
    return isValidImageUrl('https://example.com/image.jpg')
  })
  
  test('Valid PNG image URL', () => {
    return isValidImageUrl('https://example.com/image.png')
  })
  
  test('Invalid image URL (no extension)', () => {
    return !isValidImageUrl('https://example.com/notanimage')
  })
  
  test('Invalid image URL (wrong extension)', () => {
    return !isValidImageUrl('https://example.com/file.pdf')
  })

  // Test 7: Video URL validation
  console.log('\n🎥 Testing video URL validation:')
  
  test('Valid YouTube URL', () => {
    return isValidVideoUrl('https://youtube.com/watch?v=abc123')
  })
  
  test('Valid YouTube short URL', () => {
    return isValidVideoUrl('https://youtu.be/abc123')
  })
  
  test('Valid Vimeo URL', () => {
    return isValidVideoUrl('https://vimeo.com/123456')
  })
  
  test('Invalid video URL', () => {
    return !isValidVideoUrl('https://example.com/video')
  })

  // Test 8: Tags validation
  console.log('\n🏷️ Testing tags validation:')
  
  test('Valid tags array', () => {
    const result = validateField('tags', ['javascript', 'react', 'web-dev'])
    return result.isValid
  })
  
  test('Too many tags should fail', () => {
    const result = validateField('tags', Array(11).fill('tag'))
    return !result.isValid && result.error.includes('Maximum 10')
  })
  
  test('Invalid tag characters should fail', () => {
    const result = validateField('tags', ['valid-tag', 'invalid@tag'])
    return !result.isValid
  })

  // Test 9: Character count
  console.log('\n🔢 Testing character count:')
  
  test('Character count for title', () => {
    const count = getCharacterCount('title', 'Test Title')
    return count.current === 10 && count.max === 200
  })
  
  test('Over limit detection', () => {
    const count = getCharacterCount('title', 'a'.repeat(201))
    return count.isOverLimit === true
  })
  
  test('Under minimum detection', () => {
    const count = getCharacterCount('content', 'Short')
    return count.isUnderMinimum === true
  })

  // Test 10: Complete form validation
  console.log('\n📋 Testing complete form validation:')
  
  test('Valid form data should pass', () => {
    const formData = {
      title: 'My Great Blog Post',
      slug: 'my-great-blog-post',
      content: 'This is a comprehensive blog post content that meets all the requirements for length and quality. It provides valuable information to readers.',
      excerpt: 'A brief summary of the blog post',
      thumbnail: 'https://example.com/image.jpg',
      video_url: 'https://youtube.com/watch?v=abc123',
      tags: ['javascript', 'tutorial'],
      type: 'tutorial'
    }
    
    const result = validateBlogPost(formData)
    return result.isValid
  })
  
  test('Invalid form data should fail', () => {
    const formData = {
      title: '', // Empty title
      content: 'Short', // Too short
      tags: Array(11).fill('tag') // Too many tags
    }
    
    const result = validateBlogPost(formData)
    return !result.isValid && Object.keys(result.errors).length > 0
  })
  
  test('Auto-generate slug from title', () => {
    const formData = {
      title: 'My Great Blog Post',
      content: 'This is a comprehensive blog post content that meets all the requirements for length and quality.'
    }
    
    const result = validateBlogPost(formData)
    return formData.slug === 'my-great-blog-post'
  })

  // Test 11: Edge cases
  console.log('\n🔍 Testing edge cases:')
  
  test('Whitespace-only title should fail', () => {
    const result = validateField('title', '   ')
    return !result.isValid
  })
  
  test('Null values should be handled', () => {
    const result = validateField('title', null)
    return !result.isValid
  })
  
  test('Undefined values should be handled', () => {
    const result = validateField('title', undefined)
    return !result.isValid
  })

  // Summary
  console.log(`\n📊 Validation Tests Summary:`)
  console.log(`   Passed: ${passedTests}/${totalTests}`)
  console.log(`   Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`)
  
  if (passedTests === totalTests) {
    console.log('   🎉 All validation tests passed!')
  } else {
    console.log(`   ⚠️  ${totalTests - passedTests} test(s) failed`)
  }
  
  return {
    passed: passedTests,
    total: totalTests,
    success: passedTests === totalTests
  }
}

/**
 * Test real-time validation scenarios
 */
export function testRealTimeValidation() {
  console.log('\n⚡ Testing real-time validation scenarios...')
  
  // Simulate typing in title field
  const titleValues = ['', 'M', 'My', 'My Blog', 'My Blog Post']
  titleValues.forEach((value, index) => {
    const result = validateField('title', value)
    console.log(`   Step ${index + 1}: "${value}" - ${result.isValid ? '✅ Valid' : '❌ ' + result.error}`)
  })
  
  // Simulate typing in content field
  console.log('\n   Content validation progression:')
  const contentValues = [
    '',
    'Short',
    'This is getting longer but still not enough',
    'This is a comprehensive blog post content that meets all the requirements for length and quality. It provides valuable information to readers and demonstrates proper validation.'
  ]
  
  contentValues.forEach((value, index) => {
    const result = validateField('content', value)
    const charCount = getCharacterCount('content', value)
    console.log(`   Step ${index + 1}: ${charCount.current} chars - ${result.isValid ? '✅ Valid' : '❌ ' + result.error}`)
  })
}

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  // Run tests after a short delay to ensure all modules are loaded
  setTimeout(() => {
    runValidationTests()
    testRealTimeValidation()
  }, 1000)
}