import { BookOpen, Home, LogOut, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import ThemeToggle from '../ThemeToggle'

const CMSLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const { user, signOut } = useAuth()
  const { isDark, toggleTheme, isTransitioning } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/admin-cms-2024-secure/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin-cms-2024-secure/',
      icon: Home,
      current: location.pathname === '/admin-cms-2024-secure/' || location.pathname === '/admin-cms-2024-secure/dashboard'
    },
    {
      name: 'Blog Posts',
      href: '/admin-cms-2024-secure/blogs',
      icon: BookOpen,
      current: location.pathname.startsWith('/admin-cms-2024-secure/blogs')
    }
  ]

  const handleNavigation = (href) => {
    navigate(href)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen cms-bg-primary transition-all duration-500"
         style={{
           background: isDark 
             ? 'linear-gradient(135deg, rgb(10, 10, 10) 0%, rgb(23, 23, 23) 100%)'
             : 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(248, 248, 248) 100%)'
         }}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 cms-bg-secondary backdrop-blur-md cms-border border-r cms-shadow transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b cms-border">
            <div>
              <h1 className="text-xl font-bold cms-accent">
                Blog CMS
              </h1>
              <p className="text-xs cms-text-secondary mt-1">
                Content Management
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
            >
              <X className="w-5 h-5 cms-text-secondary" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    item.current
                      ? 'bg-red-50 dark:bg-red-900/30 cms-accent shadow-lg'
                      : 'cms-text-primary hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* User profile and logout */}
          <div className="p-4 border-t cms-border">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 mb-3">
              <div className="w-8 h-8 cms-accent-bg rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium cms-text-primary truncate">
                  {user?.email}
                </p>
                <p className="text-xs cms-text-secondary">
                  Administrator
                </p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium cms-accent hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="cms-bg-secondary backdrop-blur-md border-b cms-border sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200"
                >
                  <Menu className="w-6 h-6 cms-text-secondary" />
                </button>
                
                <div>
                  <h2 className="text-lg font-semibold cms-text-primary">
                    {navigationItems.find(item => item.current)?.name || 'Dashboard'}
                  </h2>
                  <p className="text-sm cms-text-secondary">
                    Manage your blog content
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Theme toggle */}
                <ThemeToggle variant="cms" />

                {/* User profile - desktop only */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-red-50 dark:bg-red-900/30 backdrop-blur-md cms-border border">
                  <div className="w-6 h-6 cms-accent-bg rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium cms-text-primary">
                    {user?.email?.split('@')[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default CMSLayout