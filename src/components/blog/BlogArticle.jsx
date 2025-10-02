import { Calendar, Clock, Play, Share2, User } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../../contexts/ThemeContext'
import ImageWithFallback from '../common/ImageWithFallback'

const BlogArticle = ({ 
  blog, 
  author = "Abdul Razzaq", 
  readingTime,
  relatedArticles = [] 
}) => {
  const { isDark } = useTheme()

  // Calculate reading time if not provided
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(' ').length
    return Math.ceil(words / wordsPerMinute)
  }

  const estimatedReadingTime = readingTime || calculateReadingTime(blog.content)

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Extract YouTube video ID and create embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1`
    }
    
    // If it's already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url
    }
    
    return null
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(blog.video_url)

  // Process content to insert video after "Video Walkthrough" heading
  const processContentWithVideo = (content) => {
    if (!youtubeEmbedUrl) return content
    
    // Look for video walkthrough heading and insert video after it
    const lines = content.split('\n')
    const videoHeadingIndex = lines.findIndex(line => 
      /^#{1,6}\s*video\s*walkthrough/i.test(line.trim())
    )
    
    if (videoHeadingIndex !== -1) {
      // Insert video embed marker after the heading
      lines.splice(videoHeadingIndex + 1, 0, '', '{{VIDEO_EMBED}}', '')
      return lines.join('\n')
    }
    
    return content
  }

  const processedContent = processContentWithVideo(blog.content)

  // Custom components for ReactMarkdown
  const components = {
    // Handle video embed placeholder
    p: ({ children }) => {
      // Check if this paragraph contains our video embed marker
      if (typeof children === 'string' && children.includes('{{VIDEO_EMBED}}')) {
        return youtubeEmbedUrl ? (
          <div className="my-12">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={youtubeEmbedUrl}
                title="Video Walkthrough"
                className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        ) : null
      }
      
      return (
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
          {children}
        </p>
      )
    },

    // Headings with better styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 mt-12 leading-tight border-b-2 border-gray-200 dark:border-gray-700 pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 mt-10 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5 mt-8 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 mt-6 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 mt-5 leading-tight">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold text-gray-900 dark:text-white mb-3 mt-4 leading-tight">
        {children}
      </h6>
    ),

    // Lists with better spacing
    ul: ({ children }) => (
      <ul className="list-disc list-outside text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-3 ml-6">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside text-lg text-gray-700 dark:text-gray-300 mb-6 space-y-3 ml-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),

    // Enhanced blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-8 py-6 my-8 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-r-xl">
        <div className="text-lg text-gray-800 dark:text-gray-200 italic leading-relaxed font-medium">
          {children}
        </div>
      </blockquote>
    ),

    // Enhanced code blocks
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div className="my-8 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            {match[1].toUpperCase()}
          </div>
          <SyntaxHighlighter
            style={isDark ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            className="text-sm"
            customStyle={{ margin: 0, borderRadius: 0 }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-mono text-sm" {...props}>
          {children}
        </code>
      )
    },

    // Enhanced links
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline decoration-2 underline-offset-4 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-all duration-200 font-medium"
      >
        {children}
      </a>
    ),

    // Enhanced images
    img: ({ src, alt }) => (
      <figure className="my-10">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full rounded-xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
          fallbackClassName="w-full h-64 rounded-xl shadow-2xl"
          loading="lazy"
        />
        {alt && (
          <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4 italic font-medium">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Enhanced tables
    table: ({ children }) => (
      <div className="my-10 overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),

    // Enhanced horizontal rule
    hr: () => (
      <div className="my-12 flex items-center">
        <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
        <div className="px-4">
          <div className="w-3 h-3 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
        </div>
        <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-700"></div>
      </div>
    ),
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: `Check out this article: ${blog.title}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast notification here
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Cover Image */}
      {blog.thumbnail && (
        <div className="relative h-96 lg:h-[500px] overflow-hidden">
          <ImageWithFallback
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover"
            fallbackClassName="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                {blog.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm lg:text-base">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{author}</span>
                </div>
                
                {blog.created_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{estimatedReadingTime} min read</span>
                </div>

                {youtubeEmbedUrl && (
                  <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full">
                    <Play className="w-4 h-4" />
                    <span className="text-sm font-medium">Video</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title for articles without cover image */}
        {!blog.thumbnail && (
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{author}</span>
              </div>
              
              {blog.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{estimatedReadingTime} min read</span>
              </div>
            </div>
          </header>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-200 font-medium"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
          <ReactMarkdown components={components}>
            {processedContent}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {author.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {author}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Full-stack developer passionate about creating amazing web experiences.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Continue reading with these related posts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {article.thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fallbackClassName="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {article.excerpt || article.content?.substring(0, 150) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{formatDate(article.created_at)}</span>
                      <span>{calculateReadingTime(article.content)} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default BlogArticle