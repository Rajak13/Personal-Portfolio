import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import BlogArticle from '../components/blog/BlogArticle';
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
  const [related, setRelated] = useState([]);

  // Fetch related articles
  useEffect(() => {
    if (!blog) return;
    const fetchRelated = async () => {
      let query = supabase
        .from('blogs')
        .select('*')
        .neq('id', blog.id)
        .limit(3);
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

  // GSAP animation
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [blog]);

  // Extract author and date from frontmatter
  const { author } = extractFrontmatter(blog?.content || '');

  // Clean content by removing frontmatter
  const cleanContent = blog ? stripFrontmatter(blog.content) : '';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12 text-lg font-semibold">
          {t('common.loading', 'Loading...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12 text-red-500">
          {t('common.error', 'Error loading blog:')} {error.message}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12 text-gray-500">
          {t('blogs.no_blogs', 'Blog not found')}
        </div>
      </div>
    );
  }

  // Prepare blog data for the BlogArticle component
  const blogData = {
    ...blog,
    content: cleanContent
  };

  return (
    <div ref={containerRef}>
      <BlogArticle
        blog={blogData}
        author={author}
        readingTime={calculateReadingTime(blog.content)}
        relatedArticles={related}
      />
    </div>
  );
}

export default BlogDetails;
