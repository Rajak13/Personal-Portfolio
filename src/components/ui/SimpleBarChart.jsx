import React from 'react'

const SimpleBarChart = ({ data, maxHeight = 100, className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(item => item.value))
  
  return (
    <div className={`flex items-end justify-center gap-2 ${className}`}>
      {data.map((item, index) => {
        const height = maxValue > 0 ? Math.max(8, (item.value / maxValue) * maxHeight) : 8
        
        return (
          <div key={item.label || index} className="flex flex-col items-center">
            <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
              {item.value}
            </div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
              style={{ 
                height: `${height}px`,
                width: '32px',
                minHeight: '8px'
              }}
              title={`${item.label}: ${item.value}`}
            />
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center max-w-[60px] truncate">
              {item.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SimpleBarChart