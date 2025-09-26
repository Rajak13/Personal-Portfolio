import { useQuery } from '@tanstack/react-query'
import { blogService } from '../services/blogService'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        // Get all blogs to calculate statistics
        const { blogs, total } = await blogService.getBlogs({ 
          pageSize: 1000, // Get all blogs for stats
          page: 1 
        })

        // Calculate statistics
        const totalPosts = total
        const publishedPosts = blogs.length // All blogs are considered published for now
        const draftPosts = 0 // Will be implemented when we add published field
        const totalViews = blogs.reduce((sum, blog) => {
          // Handle both number and null/undefined views
          const views = typeof blog.views === 'number' ? blog.views : 0
          return sum + views
        }, 0)

        // Get recent posts (last 5)
        const recentPosts = blogs
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
          .map(blog => ({
            id: blog.id,
            title: blog.title,
            created_at: blog.created_at,
            views: typeof blog.views === 'number' ? blog.views : 0,
            type: blog.type || 'article'
          }))

        // Calculate posts by month for the last 6 months
        const now = new Date()
        const monthsData = []
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
          const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
          
          const postsInMonth = blogs.filter(blog => {
            const blogDate = new Date(blog.created_at)
            return blogDate >= monthStart && blogDate <= monthEnd
          }).length

          monthsData.push({
            month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            posts: postsInMonth,
            views: blogs
              .filter(blog => {
                const blogDate = new Date(blog.created_at)
                return blogDate >= monthStart && blogDate <= monthEnd
              })
              .reduce((sum, blog) => sum + (typeof blog.views === 'number' ? blog.views : 0), 0)
          })
        }

        // Get top performing posts
        const topPosts = blogs
          .sort((a, b) => {
            const aViews = typeof a.views === 'number' ? a.views : 0
            const bViews = typeof b.views === 'number' ? b.views : 0
            return bViews - aViews
          })
          .slice(0, 5)
          .map(blog => ({
            id: blog.id,
            title: blog.title,
            views: typeof blog.views === 'number' ? blog.views : 0,
            created_at: blog.created_at
          }))

        // Calculate tags distribution
        const tagCounts = {}
        blogs.forEach(blog => {
          if (blog.tags && Array.isArray(blog.tags)) {
            blog.tags.forEach(tag => {
              tagCounts[tag] = (tagCounts[tag] || 0) + 1
            })
          }
        })

        const topTags = Object.entries(tagCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([tag, count]) => ({ tag, count }))

        return {
          overview: {
            totalPosts,
            publishedPosts,
            draftPosts,
            totalViews
          },
          recentPosts,
          monthsData,
          topPosts,
          topTags,
          lastUpdated: new Date().toISOString()
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        throw error
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  })
}