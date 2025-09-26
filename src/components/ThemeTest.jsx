import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'

const ThemeTest = () => {
  const { theme, isDark, isLight, isTransitioning } = useTheme()

  return (
    <div className="p-8 space-y-6">
      <div className="card-cms">
        <h2 className="text-2xl font-bold cms-text-primary mb-4">Theme System Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Theme Status */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold cms-accent">Current Theme Status</h3>
            <div className="space-y-2 text-sm">
              <p className="cms-text-secondary">Theme: <span className="cms-text-primary font-medium">{theme}</span></p>
              <p className="cms-text-secondary">Is Dark: <span className="cms-text-primary font-medium">{isDark ? 'Yes' : 'No'}</span></p>
              <p className="cms-text-secondary">Is Light: <span className="cms-text-primary font-medium">{isLight ? 'Yes' : 'No'}</span></p>
              <p className="cms-text-secondary">Transitioning: <span className="cms-text-primary font-medium">{isTransitioning ? 'Yes' : 'No'}</span></p>
            </div>
          </div>

          {/* Theme Controls */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold cms-accent">Theme Controls</h3>
            <div className="flex flex-wrap gap-3">
              <ThemeToggle variant="default" />
              <ThemeToggle variant="cms" />
              <ThemeToggle variant="cms" size="small" />
              <ThemeToggle variant="cms" size="large" />
            </div>
          </div>
        </div>

        {/* Color Palette Demo */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold cms-accent">CMS Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cms-bg-primary p-4 rounded-lg cms-border border">
              <p className="cms-text-primary text-sm font-medium">Primary BG</p>
            </div>
            <div className="cms-bg-secondary p-4 rounded-lg cms-border border">
              <p className="cms-text-primary text-sm font-medium">Secondary BG</p>
            </div>
            <div className="cms-accent-bg p-4 rounded-lg">
              <p className="text-white text-sm font-medium">Accent BG</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg cms-border border">
              <p className="cms-accent text-sm font-medium">Accent Text</p>
            </div>
          </div>
        </div>

        {/* Button Demo */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold cms-accent">Button Styles</h3>
          <div className="flex flex-wrap gap-3">
            <button className="btn-cms-primary">Primary Button</button>
            <button className="btn-cms-secondary">Secondary Button</button>
          </div>
        </div>

        {/* Form Demo */}
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold cms-accent">Form Elements</h3>
          <div className="form-cms space-y-4">
            <div>
              <label htmlFor="test-input">Test Input</label>
              <input 
                id="test-input"
                type="text" 
                className="input-cms w-full" 
                placeholder="Type something..."
              />
            </div>
            <div>
              <label htmlFor="test-textarea">Test Textarea</label>
              <textarea 
                id="test-textarea"
                className="input-cms w-full h-24 resize-none" 
                placeholder="Type a longer message..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeTest