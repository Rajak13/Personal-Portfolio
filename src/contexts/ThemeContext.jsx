import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })

  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    // Save to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleSystemThemeChange = (e) => {
      // Only update if no theme is saved in localStorage
      const savedTheme = localStorage.getItem('theme')
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const toggleTheme = () => {
    setIsTransitioning(true)
    
    // Add transition class for smooth animation
    document.documentElement.classList.add('theme-transitioning')
    
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
    
    // Remove transition class after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
      document.documentElement.classList.remove('theme-transitioning')
    }, 300)
  }

  const setLightTheme = () => {
    if (theme !== 'light') {
      setIsTransitioning(true)
      document.documentElement.classList.add('theme-transitioning')
      setTheme('light')
      setTimeout(() => {
        setIsTransitioning(false)
        document.documentElement.classList.remove('theme-transitioning')
      }, 300)
    }
  }

  const setDarkTheme = () => {
    if (theme !== 'dark') {
      setIsTransitioning(true)
      document.documentElement.classList.add('theme-transitioning')
      setTheme('dark')
      setTimeout(() => {
        setIsTransitioning(false)
        document.documentElement.classList.remove('theme-transitioning')
      }, 300)
    }
  }

  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isTransitioning,
    toggleTheme,
    setLightTheme,
    setDarkTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}