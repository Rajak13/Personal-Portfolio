import { Plus, X } from 'lucide-react'
import React, { useState } from 'react'
import Button from './Button'

const TagInput = ({ 
  value = [], 
  onChange, 
  label,
  error,
  placeholder = 'Add a tag...',
  maxTags = 10,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('')

  const addTag = () => {
    const trimmedValue = inputValue.trim()
    
    if (!trimmedValue) return
    
    if (value.length >= maxTags) {
      alert(`Maximum ${maxTags} tags allowed`)
      return
    }
    
    if (value.includes(trimmedValue)) {
      alert('Tag already exists')
      return
    }
    
    onChange([...value, trimmedValue])
    setInputValue('')
  }

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Tags Display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:bg-red-200 dark:hover:bg-red-800/50 rounded-full p-0.5 transition-colors duration-200"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`
            flex-1 px-3 py-2 border rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
            ${error 
              ? 'border-red-300 bg-red-50 dark:border-red-600 dark:bg-red-900/20' 
              : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
            }
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-900
          `}
          disabled={value.length >= maxTags}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTag}
          disabled={!inputValue.trim() || value.length >= maxTags}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {value.length}/{maxTags} tags • Press Enter or click + to add
      </p>
    </div>
  )
}

export default TagInput