/**
 * Test file for blog post service operations
 * This file can be run to verify that all CRUD operations work correctly
 */

import { blogPostService } from '../services/blogPostService'

// Test data
const testBlogPost = {
  title: 'Test Blog Post for CMS',
  content: 'This is a comprehensive test blog post content that should be long enough to meet the minimum requirements for content length. It contains multiple sentences and paragraphs to simulate a real blog post.',
  excerpt: 'This is a test excerpt for the blog post',
  published: false,
  featured: false,
  tags: ['test', 'cms', 'blog'],
  image_url: 'https://example.com/test-image.jpg'
}

const updatedBlogPost = {
  title: 'Updated Test Blog Post for CMS',
  content: 'This is the updated content for the test blog post. It has been modified to test the update functionality of the blog post service.',
  excerpt: 'Updated test excerpt',
  published: true,
  featured: true,
  tags: ['test', 'cms', 'blog', 'updated']
}

/**
 * Run all tests for the blog post service
 */
export async function runBlogPostServiceTests() {
  console.log('🧪 Starting Blog Post Service Tests...\n')
  
  let createdPostId = null
  let createdPosts = []
  
  try {
    // Test 1: Validation
    console.log('1️⃣ Testing validation...')
    const validationResult = blogPostService.validateBlogPost({
      title: '',
      content: 'Short'
    })
    console.log('Validation result:', validationResult)
    console.assert(!validationResult.isValid, 'Validation should fail for invalid data')
    console.log('✅ Validation test passed\n')
    
    // Test 2: Create blog post
    console.log('2️⃣ Testing blog post creation...')
    const createdPost = await blogPostService.createBlogPost(testBlogPost)
    createdPostId = createdPost.id
    createdPosts.push(createdPost)
    console.log('Created post:', createdPost)
    console.assert(createdPost.title === testBlogPost.title, 'Title should match')
    console.assert(createdPost.slug, 'Slug should be generated')
    console.assert(createdPost.reading_time > 0, 'Reading time should be calculated')
    console.log('✅ Create test passed\n')
    
    // Test 3: Get blog post by ID
    console.log('3️⃣ Testing get blog post by ID...')
    const fetchedPost = await blogPostService.getBlogPostById(createdPostId)
    console.log('Fetched post:', fetchedPost)
    console.assert(fetchedPost.id === createdPostId, 'IDs should match')
    console.assert(fetchedPost.title === testBlogPost.title, 'Titles should match')
    console.log('✅ Get by ID test passed\n')
    
    // Test 4: Get blog post by slug
    console.log('4️⃣ Testing get blog post by slug...')
    const fetchedBySlug = await blogPostService.getBlogPostBySlug(createdPost.slug)
    console.log('Fetched by slug:', fetchedBySlug)
    console.assert(fetchedBySlug.id === createdPostId, 'IDs should match')
    console.log('✅ Get by slug test passed\n')
    
    // Test 5: Update blog post
    console.log('5️⃣ Testing blog post update...')
    const updatedPost = await blogPostService.updateBlogPost(createdPostId, updatedBlogPost)
    console.log('Updated post:', updatedPost)
    console.assert(updatedPost.title === updatedBlogPost.title, 'Title should be updated')
    console.assert(updatedPost.published === true, 'Published status should be updated')
    console.assert(updatedPost.published_at, 'Published date should be set')
    console.log('✅ Update test passed\n')
    
    // Test 6: Get blog posts with pagination
    console.log('6️⃣ Testing get blog posts with pagination...')
    const blogPostsList = await blogPostService.getBlogPosts({
      page: 1,
      pageSize: 10,
      search: 'test',
      status: 'all'
    })
    console.log('Blog posts list:', blogPostsList)
    console.assert(blogPostsList.blogPosts.length >= 1, 'Should return at least one post')
    console.assert(blogPostsList.total >= 1, 'Total should be at least 1')
    console.log('✅ Get blog posts test passed\n')
    
    // Test 7: Create multiple posts for bulk delete test
    console.log('7️⃣ Creating additional posts for bulk operations...')
    const additionalPost1 = await blogPostService.createBlogPost({
      ...testBlogPost,
      title: 'Test Post 2 for Bulk Delete',
      slug: 'test-post-2-bulk-delete'
    })
    const additionalPost2 = await blogPostService.createBlogPost({
      ...testBlogPost,
      title: 'Test Post 3 for Bulk Delete',
      slug: 'test-post-3-bulk-delete'
    })
    createdPosts.push(additionalPost1, additionalPost2)
    console.log('Created additional posts for testing')
    console.log('✅ Additional posts created\n')
    
    // Test 8: Bulk delete
    console.log('8️⃣ Testing bulk delete...')
    const bulkDeleteResult = await blogPostService.deleteBlogPosts([
      additionalPost1.id,
      additionalPost2.id
    ])
    console.log('Bulk delete result:', bulkDeleteResult)
    console.assert(bulkDeleteResult.success === true, 'Bulk delete should succeed')
    console.log('✅ Bulk delete test passed\n')
    
    // Test 9: Single delete
    console.log('9️⃣ Testing single delete...')
    const deleteResult = await blogPostService.deleteBlogPost(createdPostId)
    console.log('Delete result:', deleteResult)
    console.assert(deleteResult.success === true, 'Delete should succeed')
    console.log('✅ Single delete test passed\n')
    
    // Test 10: Verify deletion
    console.log('🔟 Verifying deletion...')
    try {
      await blogPostService.getBlogPostById(createdPostId)
      console.assert(false, 'Should not find deleted post')
    } catch (error) {
      console.log('Expected error for deleted post:', error.message)
      console.assert(error.message.includes('not found'), 'Should get not found error')
    }
    console.log('✅ Deletion verification passed\n')
    
    console.log('🎉 All Blog Post Service Tests Passed!')
    return true
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    
    // Cleanup: Delete any created posts
    console.log('🧹 Cleaning up test data...')
    for (const post of createdPosts) {
      try {
        await blogPostService.deleteBlogPost(post.id)
        console.log(`Cleaned up post: ${post.title}`)
      } catch (cleanupError) {
        console.warn(`Failed to cleanup post ${post.id}:`, cleanupError.message)
      }
    }
    
    throw error
  }
}

/**
 * Test utility functions
 */
export function testUtilityFunctions() {
  console.log('🔧 Testing utility functions...\n')
  
  // Test slug generation
  const slug1 = blogPostService.generateSlug('Hello World! This is a Test')
  console.log('Generated slug:', slug1)
  console.assert(slug1 === 'hello-world-this-is-a-test', 'Slug should be properly formatted')
  
  // Test reading time calculation
  const readingTime = blogPostService.calculateReadingTime('This is a test content with multiple words to calculate reading time.')
  console.log('Reading time:', readingTime)
  console.assert(readingTime > 0, 'Reading time should be greater than 0')
  
  // Test validation
  const validation = blogPostService.validateBlogPost({
    title: 'Valid Title',
    content: 'This is valid content that meets the minimum length requirements for a blog post.',
    excerpt: 'Valid excerpt',
    tags: ['tag1', 'tag2']
  })
  console.log('Validation result:', validation)
  console.assert(validation.isValid === true, 'Valid data should pass validation')
  
  console.log('✅ Utility functions test passed\n')
}

/**
 * Run all tests
 */
export async function runAllTests() {
  try {
    testUtilityFunctions()
    await runBlogPostServiceTests()
    console.log('🎊 All tests completed successfully!')
  } catch (error) {
    console.error('💥 Tests failed:', error)
    throw error
  }
}

// Export for manual testing
if (typeof window !== 'undefined') {
  window.testBlogPostService = {
    runAllTests,
    runBlogPostServiceTests,
    testUtilityFunctions
  }
}