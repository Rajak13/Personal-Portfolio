# Enhanced Theme System Documentation

## Overview

The enhanced theme system provides a comprehensive solution for managing light and dark themes across the entire application, with special support for CMS-specific styling using a red, black, and white color scheme.

## Features

- ✅ **Smooth Theme Transitions**: 300ms animated transitions between themes
- ✅ **Theme Persistence**: Remembers user preference across sessions
- ✅ **System Theme Detection**: Automatically detects and follows system theme preference
- ✅ **CMS-Specific Colors**: Red, black, white color scheme for CMS interface
- ✅ **Reusable Components**: ThemeToggle component with multiple variants
- ✅ **CSS Custom Properties**: Consistent theming using CSS variables
- ✅ **Accessibility**: Proper ARIA labels and keyboard navigation

## Architecture

### ThemeContext (`src/contexts/ThemeContext.jsx`)

The main theme context provides:
- `theme`: Current theme ('light' or 'dark')
- `isDark`: Boolean indicating dark mode
- `isLight`: Boolean indicating light mode
- `isTransitioning`: Boolean indicating theme transition state
- `toggleTheme()`: Function to toggle between themes
- `setLightTheme()`: Function to set light theme
- `setDarkTheme()`: Function to set dark theme

### ThemeToggle Component (`src/components/ThemeToggle.jsx`)

Reusable theme toggle button with variants:
- `default`: Standard theme toggle for main site
- `cms`: CMS-specific styling with red accent colors

Sizes available: `small`, `default`, `large`

## Color Scheme

### Light Theme (Red, Black, White)
- **Primary Background**: White (#ffffff)
- **Secondary Background**: Light gray (#f8f8f8)
- **Primary Text**: Black (#0a0a0a)
- **Secondary Text**: Dark gray (#5f6368)
- **Accent**: Red (#dc2626)
- **Accent Hover**: Darker red (#b91c1c)

### Dark Theme (Inverted Red, Black, White)
- **Primary Background**: Black (#0a0a0a)
- **Secondary Background**: Dark gray (#171717)
- **Primary Text**: White (#ffffff)
- **Secondary Text**: Light gray (#9aa0a6)
- **Accent**: Red (#ef4444)
- **Accent Hover**: Darker red (#dc2626)

## CSS Classes

### CMS-Specific Classes
- `.cms-bg-primary`: Primary background color
- `.cms-bg-secondary`: Secondary background color
- `.cms-text-primary`: Primary text color
- `.cms-text-secondary`: Secondary text color
- `.cms-accent`: Accent text color
- `.cms-accent-bg`: Accent background color
- `.cms-border`: Border color
- `.cms-shadow`: Box shadow (dark mode only)

### Component Classes
- `.btn-cms-primary`: Primary CMS button style
- `.btn-cms-secondary`: Secondary CMS button style
- `.card-cms`: CMS card component style
- `.input-cms`: CMS input field style
- `.form-cms`: CMS form container style

### Transition Classes
- `.theme-transition-fast`: 150ms transitions
- `.theme-transition-medium`: 300ms transitions
- `.theme-transition-slow`: 500ms transitions

## Usage Examples

### Basic Theme Context Usage

```jsx
import { useTheme } from '../contexts/ThemeContext'

function MyComponent() {
  const { isDark, toggleTheme, isTransitioning } = useTheme()
  
  return (
    <div className={`p-4 ${isDark ? 'dark-styles' : 'light-styles'}`}>
      <button 
        onClick={toggleTheme}
        disabled={isTransitioning}
      >
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  )
}
```

### Using ThemeToggle Component

```jsx
import ThemeToggle from '../components/ThemeToggle'

function Header() {
  return (
    <header>
      {/* Default theme toggle */}
      <ThemeToggle />
      
      {/* CMS variant */}
      <ThemeToggle variant="cms" />
      
      {/* Small size */}
      <ThemeToggle size="small" />
    </header>
  )
}
```

### Using CMS Classes

```jsx
function CMSCard({ children }) {
  return (
    <div className="card-cms">
      <h2 className="cms-text-primary cms-accent">Card Title</h2>
      <p className="cms-text-secondary">Card content</p>
      <button className="btn-cms-primary">Primary Action</button>
      <button className="btn-cms-secondary">Secondary Action</button>
    </div>
  )
}
```

## Integration

### App Setup

The theme system is integrated at the root level:

```jsx
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
```

### CMS Integration

The CMS layout automatically uses the theme context:

```jsx
import { useTheme } from '../../contexts/ThemeContext'
import ThemeToggle from '../ThemeToggle'

function CMSLayout({ children }) {
  const { isDark } = useTheme()
  
  return (
    <div className="cms-bg-primary">
      <header className="cms-bg-secondary">
        <ThemeToggle variant="cms" />
      </header>
      <main>{children}</main>
    </div>
  )
}
```

## Testing

A theme test component is available at `/theme-test` route to verify:
- Theme switching functionality
- Color palette consistency
- Component styling
- Transition animations
- Form element theming

## Browser Support

- Modern browsers with CSS custom properties support
- Graceful degradation for older browsers
- Respects `prefers-color-scheme` media query
- Supports system theme changes

## Performance

- Minimal JavaScript overhead
- CSS-based transitions for smooth performance
- Efficient re-renders using React Context
- Optimized CSS custom properties

## Accessibility

- Proper ARIA labels on theme toggle buttons
- High contrast ratios in both themes
- Keyboard navigation support
- Screen reader friendly
- Respects user's motion preferences

## Future Enhancements

- Additional color schemes (blue, green, etc.)
- High contrast mode support
- Custom theme creation
- Theme scheduling (auto dark mode at night)
- Theme preview functionality