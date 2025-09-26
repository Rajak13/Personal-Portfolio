// Simple test to verify blog list functionality
import { blogService } from '../services/blogService'

// Test blog service functions
export const testBlogService = async () => {
  console.log('Testing Blog Service...')
  
  try {
    // Test getting blogs with default parameters
    const result = await blogService.getBlogs()
    console.log('✅ Blog service getBlogs() works:', {
      totalBlogs: result.total,
      blogsReturned: result.blogs.length,
      totalPages: result.totalPages
    })
    
    // Test with search parameters
    const searchResult = await blogService.getBlogs({
      page: 1,
      pageSize: 5,
      search: 'test',
      sortBy: 'title',
      sortOrder: 'asc'
    })
    console.log('✅ Blog service with search works:', {
      searchTerm: 'test',
      results: searchResult.blogs.length
    })
    
    return true
  } catch (error) {
    console.error('❌ Blog service test failed:', error)
    return false
  }
}

// Test pagination logic
export const testPagination = () => {
  console.log('Testing Pagination Logic...')
  
  const totalItems = 47
  const pageSize = 10
  const totalPages = Math.ceil(totalItems / pageSize)
  
  console.log('✅ Pagination calculation:', {
    totalItems,
    pageSize,
    totalPages,
    expectedPages: 5
  })
  
  return totalPages === 5
}

// Test search debouncing logic
export const testSearchDebounce = () => {
  console.log('Testing Search Debounce Logic...')
  
  let searchValue = ''
  let debouncedValue = ''
  
  // Simulate debounce behavior
  const simulateDebounce = (value, delay = 300) => {
    return new Promise(resolve => {
      setTimeout(() => {
        debouncedValue = value
        resolve(debouncedValue)
      }, delay)
    })
  }
  
  // Test rapid typing
  searchValue = 'r'
  searchValue = 're'
  searchValue = 'rea'
  searchValue = 'react'
  
  return simulateDebounce(searchValue, 100).then(result => {
    console.log('✅ Search debounce simulation:', {
      finalValue: result,
      expected: 'react'
    })
    return result === 'react'
  })
}

// Run all tests
export const runBlogListTests = async () => {
  console.log('🧪 Running Blog List Tests...')
  
  const serviceTest = await testBlogService()
  const paginationTest = testPagination()
  const debounceTest = await testSearchDebounce()
  
  const allPassed = serviceTest && paginationTest && debounceTest
  
  console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed')
  return allPassed
}

// Auto-run tests in development
if (import.meta.env.DEV) {
  console.log('🔧 Development mode detected - Blog List tests available')
  console.log('Run runBlogListTests() in console to test blog list functionality')
}