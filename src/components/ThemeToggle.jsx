import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = ({ 
  className = "", 
  variant = "default", 
  size = "default" 
}) => {
  const { isDark, toggleTheme, isTransitioning } = useTheme()

  const baseClasses = "rounded-xl backdrop-blur-md border transition-all duration-300 group disabled:opacity-50"
  
  const variants = {
    default: "bg-white/10 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50",
    cms: "bg-red-50 dark:bg-red-900/30 cms-border border hover:bg-red-100 dark:hover:bg-red-900/50"
  }

  const sizes = {
    small: "p-1.5",
    default: "p-2",
    large: "p-3"
  }

  const iconSizes = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-6 h-6"
  }

  return (
    <button
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className={`${iconSizes[size]} text-yellow-400 group-hover:rotate-180 transition-transform duration-500`} />
      ) : (
        <Moon className={`${iconSizes[size]} ${variant === 'cms' ? 'cms-accent' : 'text-slate-700'} group-hover:rotate-180 transition-transform duration-500`} />
      )}
    </button>
  )
}

export default ThemeToggle