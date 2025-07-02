import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { supabase } from '../lib/supabase';
import { calculateReadingTime } from '../lib/utils';

function useBlog(id) {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
      if (error) throw error;
      return data;
    },
  });
}

function stripFrontmatter(content) {
  // Remove frontmatter (--- ... ---) from markdown
  return content.replace(/^---[\s\S]*?---/, '').trim();
}

function extractFrontmatter(content) {
  let author = 'Abdul Razzaq';
  let date = null;
  const frontmatterMatch = content.match(/^---([\s\S]*?)---/);
  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    lines.forEach(line => {
      if (line.startsWith('author:')) author = line.replace('author:', '').trim();
      if (line.startsWith('date:')) date = line.replace('date:', '').trim();
    });
  }
  return { author, date };
}

// Helper to insert video after the 'Video Walkthrough' heading
function insertVideoAfterHeading(markdown, videoUrl) {
  if (!videoUrl) return markdown;
  const lines = markdown.split('\n');
  const videoSectionIdx = lines.findIndex(line => /video walkthrough/i.test(line));
  if (videoSectionIdx !== -1) {
    // Insert a custom marker after the heading
    lines.splice(videoSectionIdx + 1, 0, '\n<BlogVideoEmbed />\n');
    return lines.join('\n');
  }
  return markdown;
}

// Helper to get YouTube video ID and thumbnail
function getYouTubeId(url) {
  const match = url?.match(/(?:embed\/|watch\?v=)([\w-]{11})/);
  return match ? match[1] : null;
}

function getDeviceId() {
  let id = localStorage.getItem('blog_device_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('blog_device_id', id);
  }
  return id;
}

function HeartIcon({ filled }) {
  return filled ? (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ec4899" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all drop-shadow-md">
      <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
    </svg>
  ) : (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all">
      <path d="M12 21C12 21 4 13.36 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.36 16 21 16 21H12Z" />
    </svg>
  );
}

function BlogDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data: blog, isLoading, error } = useBlog(id);
  const containerRef = useRef();
  const imageRef = useRef();
  const isDark = document.documentElement.classList.contains('dark');
  const [showVideo, setShowVideo] = useState(false);
  const [likeState, setLikeState] = useState({ count: 0, liked: false });
  const [related, setRelated] = useState([]);

  // Fetch like count and state
  useEffect(() => {
    if (!blog) return;
    const deviceId = getDeviceId();
    const fetchLikes = async () => {
      const { data: likes } = await supabase
        .from('blog_likes')
        .select('device_id')
        .eq('blog_id', blog.id);
      setLikeState({
        count: likes?.length || 0,
        liked: likes?.some(l => l.device_id === deviceId),
      });
    };
    fetchLikes();
  }, [blog]);

  // Like/unlike handler
  const handleLike = async () => {
    if (!blog) return;
    const deviceId = getDeviceId();
    const liked = likeState.liked;
    setLikeState(s => ({
      count: s.count + (liked ? -1 : 1),
      liked: !liked,
    }));
    if (!liked) {
      await supabase.from('blog_likes').insert({ blog_id: blog.id, device_id: deviceId });
    } else {
      await supabase.from('blog_likes').delete().eq('blog_id', blog.id).eq('device_id', deviceId);
    }
  };

  // Fetch related articles
  useEffect(() => {
    if (!blog) return;
    const fetchRelated = async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .neq('id', blog.id)
        .limit(6);
      if (blog.tags?.length) {
        query = query.or(blog.tags.map(tag => `tags.cs.{${tag}}`).join(','));
      } else if (blog.type) {
        query = query.eq('type', blog.type);
      }
      const { data: relatedBlogs } = await query;
      setRelated(relatedBlogs || []);
    };
    fetchRelated();
  }, [blog]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
    }
  }, [blog]);

  // Extract author and date from frontmatter
  const { author, date } = extractFrontmatter(blog?.content || '');
  const displayDate = date ? new Date(date).toLocaleDateString() : new Date(blog?.created_at).toLocaleDateString();
  let markdownContent = blog ? stripFrontmatter(blog.content) : '';
  markdownContent = blog ? insertVideoAfterHeading(markdownContent, blog.video_url) : '';
  const videoId = getYouTubeId(blog?.video_url);
  const videoThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  // Glassy effect helpers
  const glassClass = 'backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border border-white/40 dark:border-gray-700/70 shadow-2xl';
  const codeBlockClass = 'rounded-xl my-8 border-2 border-pink-400/60 dark:border-pink-600/60 shadow-lg overflow-x-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100';

  // Custom renderer for code blocks and custom video embed
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline ? (
        <SyntaxHighlighter
          style={isDark ? oneDark : oneLight}
          language={match ? match[1] : 'javascript'}
          PreTag="div"
          className={codeBlockClass}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded border border-pink-300 dark:border-pink-700 text-gray-900 dark:text-gray-100">{children}</code>
      );
    },
    BlogVideoEmbed() {
      return blog?.video_url ? (
        <div className="w-full my-12 rounded-2xl overflow-hidden shadow-xl border border-blue-200 dark:border-blue-800 bg-black flex items-center justify-center" style={{ aspectRatio: '16/7', minHeight: 420 }}>
          <iframe
            src={blog.video_url}
            title="Video Walkthrough"
            allowFullScreen
            className="w-full h-full min-h-[420px] bg-black"
            style={{ border: 0 }}
          />
        </div>
      ) : null;
    }
  };

  if (isLoading) return <div className="text-center py-12 text-lg font-semibold">{t('common.loading', 'Loading...')}</div>;
  if (error) return <div className="text-center py-12 text-red-500">{t('common.error', 'Error loading blog:')} {error.message}</div>;
  if (!blog) return <div className="text-center py-12 text-gray-500">{t('blogs.no_blogs', 'Blog not found')}</div>;

  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Hero background: blurred blog thumbnail */}
      <div className="absolute inset-0 -z-10">
        <img
          src={blog.thumbnail}
          alt={t('blogs.hero_bg_alt', 'Blog hero background')}
          className="w-full h-full object-cover object-center blur-2xl scale-110 opacity-80"
          style={{ filter: 'blur(36px) brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/30 dark:from-gray-900/95 dark:via-gray-900/80 dark:to-gray-900/60" />
      </div>
      {/* Main glassy blog card */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 py-8 md:py-20">
        <div ref={containerRef} className={`rounded-3xl ${glassClass} p-4 sm:p-8 md:p-12 flex flex-col gap-10 md:gap-14 relative z-10`}> 
          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {author.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">{author}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{displayDate} · {calculateReadingTime(blog.content)} {t('blogs.min_read', 'min read')}</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white mb-2 break-words">{blog.title}</h1>
            <div className="flex flex-wrap gap-3 justify-center mb-2">
              {blog.tags && blog.tags.map(tag => (
                <span key={tag} className="px-4 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 text-sm rounded-full font-semibold">#{tag}</span>
              ))}
            </div>
            <button
              className="mt-2 flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 rounded-full px-5 py-2 shadow-lg hover:scale-110 transition-all border border-pink-200 dark:border-pink-800 text-pink-500 dark:text-pink-400 text-lg font-semibold"
              onClick={handleLike}
              aria-label={likeState.liked ? t('common.unlike', 'Unlike') : t('common.like', 'Like')}
            >
              <HeartIcon filled={likeState.liked} />
              <span>{likeState.count}</span>
            </button>
          </div>
          {/* YouTube Video Thumbnail or Embedded Video */}
          {videoThumbnail && !showVideo && (
            <div className="relative mb-12 cursor-pointer group" onClick={() => setShowVideo(true)}>
              <img
                src={videoThumbnail}
                alt={t('blogs.video_thumbnail_alt', 'YouTube video thumbnail')}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] object-cover rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black bg-opacity-60 rounded-full p-4 group-hover:scale-110 transition-transform">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
          {videoThumbnail && showVideo && (
            <div className="mb-12 aspect-video rounded-2xl overflow-hidden shadow-xl border border-blue-200 dark:border-blue-800 bg-black flex items-center justify-center">
              <iframe
                src={blog.video_url}
                title={t('blogs.video_iframe_title', 'YouTube video')}
                allowFullScreen
                className="w-full h-full min-h-[220px] sm:min-h-[320px] md:min-h-[420px] bg-black"
                style={{ border: 0 }}
              />
            </div>
          )}
          {/* Markdown Content with video inserted after the right heading */}
          <div className="prose prose-xl dark:prose-invert max-w-none space-y-12 text-gray-900 dark:text-gray-100">
            <ReactMarkdown components={components}>{markdownContent}</ReactMarkdown>
          </div>
          {/* Byline */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-base text-gray-500 dark:text-gray-300 text-right">
            <span>{t('blogs.byline', 'Written by {{author}}. Last updated {{date}}.', { author, date: displayDate })}</span>
          </div>
        </div>
        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">{t('blogs.related_articles', 'Related Articles')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {related.map(r => (
                <a
                  key={r.id}
                  href={`/blog/${r.id}`}
                  className={`block ${glassClass} rounded-xl shadow hover:shadow-xl border p-5 transition-all hover:scale-105`}
                >
                  <img src={r.thumbnail} alt={r.title} className="w-full h-36 object-cover rounded-lg mb-4" />
                  <div className="font-semibold text-lg text-gray-800 dark:text-white mb-1">{r.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{new Date(r.created_at).toLocaleDateString()} · {calculateReadingTime(r.content)} {t('blogs.min_read', 'min read')}</div>
                  <div className="flex flex-wrap gap-2">
                    {r.tags && r.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">#{tag}</span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogDetails;
