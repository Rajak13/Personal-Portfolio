import {
  BarChart3,
  BookOpen,
  Calendar,
  Edit3,
  Eye,
  FileText,
  Plus,
  RefreshCw,
  Tag,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CMSLayout from '../../components/cms/CMSLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import SimpleBarChart from '../../components/ui/SimpleBarChart';
import { useDashboardStats } from '../../hooks/useDashboardStats';

const Dashboard = () => {
  const navigate = useNavigate()
  const { data: stats, isLoading, error, refetch } = useDashboardStats()

  if (isLoading) {
    return (
      <CMSLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </CMSLayout>
    )
  }

  if (error) {
    return (
      <CMSLayout>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-red-600 dark:text-red-300 mb-4">
            {error.message || 'Failed to load dashboard statistics'}
          </p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </CMSLayout>
    )
  }

  const overviewStats = [
    {
      name: 'Total Posts',
      value: stats?.overview?.totalPosts || 0,
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-100'
    },
    {
      name: 'Published',
      value: stats?.overview?.publishedPosts || 0,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-100'
    },
    {
      name: 'Total Views',
      value: stats?.overview?.totalViews || 0,
      icon: Eye,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-100'
    },
    {
      name: 'Avg Views/Post',
      value: stats?.overview?.totalPosts > 0 
        ? Math.round((stats?.overview?.totalViews || 0) / stats.overview.totalPosts)
        : 0,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-100'
    }
  ]

  const quickActions = [
    {
      name: 'Create New Post',
      description: 'Write a new blog post',
      icon: Plus,
      action: () => navigate('/admin-cms-2024-secure/blogs/create'),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      name: 'Manage Posts',
      description: 'View and edit existing posts',
      icon: BookOpen,
      action: () => navigate('/admin-cms-2024-secure/blogs'),
      color: 'bg-blue-500 hover:bg-blue-600'
    }
  ]

  return (
    <CMSLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to your CMS Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your blog posts and content from this secure interface.
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.name}
                className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} text-sm font-medium`}>
                      {stat.name}
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {typeof stat.value === 'number' && stat.value > 999 
                        ? `${(stat.value / 1000).toFixed(1)}k`
                        : stat.value
                      }
                    </p>
                  </div>
                  <Icon className="w-8 h-8 opacity-80" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.name}
                    onClick={action.action}
                    className={`w-full ${action.color} text-white rounded-xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {action.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Posts
            </h2>
            <div className="space-y-4">
              {stats?.recentPosts?.length > 0 ? (
                stats.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-medium truncate">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/admin-cms-2024-secure/blogs/edit/${post.id}`)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No blog posts yet. Create your first post!
                  </p>
                  <button
                    onClick={() => navigate('/admin-cms-2024-secure/blogs/create')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Create Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Top Performing Posts
            </h2>
            <div className="space-y-4">
              {stats?.topPosts?.length > 0 ? (
                stats.topPosts.map((post, index) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 dark:text-white font-medium truncate">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No analytics data available yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Popular Tags
            </h2>
            <div className="space-y-4">
              {stats?.topTags?.length > 0 ? (
                stats.topTags.map((tagData, index) => (
                  <div key={tagData.tag} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-900 dark:text-white font-medium">
                        {tagData.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {tagData.count} posts
                      </span>
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min(100, (tagData.count / (stats.topTags[0]?.count || 1)) * 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No tags found. Add tags to your posts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monthly Activity Chart */}
        {stats?.monthsData?.length > 0 && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Monthly Activity
            </h2>
            <SimpleBarChart 
              data={stats.monthsData.map(month => ({
                label: month.month,
                value: month.posts
              }))}
              maxHeight={120}
              className="py-4"
            />
          </div>
        )}
      </div>
    </CMSLayout>
  )
}

export default Dashboard