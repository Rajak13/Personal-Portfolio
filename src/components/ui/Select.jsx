import React from 'react'

const Select = ({ 
  label,
  error,
  options = [],
  className = '',
  ...props 
}) => {
  const selectClasses = `
    w-full px-3 py-2 border rounded-lg transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
    ${error 
      ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
      : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
    }
    text-gray-900 dark:text-white
    disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-900
    ${className}
  `

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <select
        className={selectClasses}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select