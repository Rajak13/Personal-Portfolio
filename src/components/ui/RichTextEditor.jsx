import { Bold, Eye, Image, Italic, Link, List, ListOrdered } from 'lucide-react'
import { useState } from 'react'
import Button from './Button'

const RichTextEditor = ({ 
  value = '', 
  onChange, 
  label,
  error,
  placeholder = 'Write your blog content here...',
  className = '',
  showCharacterCount = true,
  minLength = 50,
  maxLength = 50000,
  isValid,
  isValidating,
  required = false
}) => {
  const [showPreview, setShowPreview] = useState(false)

  // Simple markdown formatting functions
  const insertMarkdown = (before, after = '') => {
    const textarea = document.getElementById('rich-text-content')
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange({ target: { value: newText } })
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const formatBold = () => insertMarkdown('**', '**')
  const formatItalic = () => insertMarkdown('*', '*')
  const formatList = () => insertMarkdown('\n- ')
  const formatOrderedList = () => insertMarkdown('\n1. ')
  const formatLink = () => insertMarkdown('[', '](url)')
  const formatImage = () => insertMarkdown('![alt text](', ')')

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown) => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^1\. (.+)$/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border border-gray-300 dark:border-gray-600 rounded-t-lg bg-gray-50 dark:bg-gray-800">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatBold}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatItalic}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatList}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatOrderedList}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatLink}
          title="Link"
        >
          <Link className="w-4 h-4" />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={formatImage}
          title="Image"
        >
          <Image className="w-4 h-4" />
        </Button>
        
        <div className="flex-1" />
        
        <Button
          type="button"
          variant={showPreview ? "primary" : "ghost"}
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          title="Preview"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Area */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-b-lg overflow-hidden">
        {showPreview ? (
          <div className="p-4 min-h-[200px] bg-white dark:bg-gray-800 prose prose-sm max-w-none dark:prose-invert">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: markdownToHtml(value) || '<p class="text-gray-500 dark:text-gray-400">Nothing to preview yet...</p>' 
              }} 
            />
          </div>
        ) : (
          <textarea
            id="rich-text-content"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={12}
            className="w-full p-4 border-0 resize-none focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        )}
      </div>

      {/* Character count and validation info */}
      {showCharacterCount && (
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span className={`${
              value.length < minLength ? 'text-red-500' : 
              value.length > maxLength ? 'text-red-500' : 
              'text-gray-500 dark:text-gray-400'
            }`}>
              {value.length.toLocaleString()}/{maxLength.toLocaleString()} characters
            </span>
            
            {value.length < minLength && (
              <span className="text-red-500">
                Need {minLength - value.length} more characters
              </span>
            )}
            
            {value.length >= minLength && value.length <= maxLength && (
              <span className="text-green-600 dark:text-green-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Good length
              </span>
            )}
          </div>
          
          {/* Progress bar */}
          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-200 ${
                value.length > maxLength ? 'bg-red-500' : 
                value.length < minLength ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${Math.min((value.length / maxLength) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Help text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Supports basic Markdown: **bold**, *italic*, - lists, 1. numbered lists, [links](url), ![images](url)
      </p>
    </div>
  )
}

export default RichTextEditor