import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ImageWithFallback from '../components/common/ImageWithFallback';
import useBlogs from '../hooks/fetchblogs';
import { supabase } from '../lib/supabase';
import { calculateReadingTime } from '../lib/utils';
gsap.registerPlugin(ScrollTrigger);

const BLOG_TYPES = [
  'Tutorial',
  'Opinion',
  'Project Update',
  'Announcement',
  'Interview',
  'Case Study',
];

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

function BlogsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [activeTag, setActiveTag] = useState(null);
  const [activeType, setActiveType] = useState('All');
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [likeStates, setLikeStates] = useState({}); // { [blogId]: { count, liked } }
  const pageSize = 6;
  const filterRef = useRef();
  const cardsRef = useRef([]);

  // Fetch blogs
  const { data, isLoading, error } = useBlogs({
    page,
    pageSize,
    filters: {
      ...(activeTag ? { tags: [activeTag] } : {}),
      ...(activeType && activeType !== 'All' ? { type: activeType } : {}),
    },
    sort: sort === 'oldest' ? 'created_at' : sort,
    order: sort === 'oldest' ? 'asc' : order,
    search: submittedSearch,
  });

  // Fetch likes for visible blogs
  useEffect(() => {
    if (!data?.blogs) return;
    const deviceId = getDeviceId();
    const fetchLikes = async () => {
      const ids = data.blogs.map(b => b.id);
      if (!ids.length) return;
      const { data: likes, error } = await supabase
        .from('blog_likes')
        .select('blog_id, device_id')
        .in('blog_id', ids);
      const counts = {};
      ids.forEach(id => {
        const blogLikes = likes?.filter(l => l.blog_id === id) || [];
        counts[id] = {
          count: blogLikes.length,
          liked: blogLikes.some(l => l.device_id === deviceId),
        };
      });
      setLikeStates(counts);
    };
    fetchLikes();
  }, [data]);

  // Like/unlike handler
  const handleLike = async (blogId) => {
    const deviceId = getDeviceId();
    const liked = likeStates[blogId]?.liked;
    setLikeStates(s => ({
      ...s,
      [blogId]: {
        count: s[blogId]?.count + (liked ? -1 : 1),
        liked: !liked,
      },
    }));
    if (!liked) {
      await supabase.from('blog_likes').insert({ blog_id: blogId, device_id: deviceId });
    } else {
      await supabase.from('blog_likes').delete().eq('blog_id', blogId).eq('device_id', deviceId);
    }
  };

  // Extract all unique tags from blogs for tag cloud
  const allTags = Array.from(
    new Set((data?.blogs || []).flatMap(blog => blog.tags || []))
  );

  // GSAP Animations
  useEffect(() => {
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
      );
    }
  }, [activeTag, activeType, sort]);

  useEffect(() => {
    if (cardsRef.current) {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0, scale: 0.97 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }
  }, [data]);

  // Sorting logic
  const sortOptions = [
    { value: 'created_at', label: t('blogs.sort.newest', 'Newest') },
    { value: 'views', label: t('blogs.sort.popular', 'Most Popular') },
    { value: 'title', label: t('blogs.sort.az', 'A-Z') },
    { value: 'oldest', label: t('blogs.sort.oldest', 'Oldest') },
  ];

  if (isLoading) return <div className="text-center py-12 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error loading blogs: {error.message}</div>;

  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Full glassy background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/blog-bg.jpg"
          alt="Blog background"
          className="w-full h-full object-cover object-center blur-2xl scale-110 opacity-80"
          style={{ filter: 'blur(36px) brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/30 dark:from-gray-900/95 dark:via-gray-900/80 dark:to-gray-900/60" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">{t('blogs.title', 'Blog')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('blogs.subtitle', 'Explore articles, tutorials, and updates. Filter by type, tag, or sort as you like!')}
          </p>
        </div>
        {/* Search Bar */}
        <form className="mb-8 flex flex-col sm:flex-row justify-center gap-3" onSubmit={e => { e.preventDefault(); setSubmittedSearch(search); setPage(1); }}>
          <input
            type="text"
            placeholder={t('blogs.search_placeholder', 'Search by title or content...')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-2xl border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg shadow focus:ring-2 focus:ring-pink-400 transition-all text-black dark:text-white"
          />
          <button type="submit" className="px-5 py-3 rounded-2xl bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition-all">{t('common.search', 'Search')}</button>
        </form>
        {/* Filter & Sort UI */}
        <div ref={filterRef} className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Type Filter */}
          <div className="flex flex-wrap gap-3 items-center justify-center">
            <button
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeType === 'All' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800'}`}
              onClick={() => { setActiveType('All'); setPage(1); }}
            >
              {t('blogs.filter.all', 'All')}
            </button>
            {BLOG_TYPES.map(type => (
              <button
                key={type}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeType === type ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800'}`}
                onClick={() => { setActiveType(type); setPage(1); }}
              >
                {t(`blogs.filter.${type.toLowerCase().replace(/ /g, '_')}`, type)}
              </button>
            ))}
          </div>
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium">{t('common.sort', 'Sort by')}:</span>
            <select
              className="px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 shadow"
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1); }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Tag Cloud */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 border ${activeTag === tag ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white/90 dark:bg-gray-800/90 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30'}`}
                onClick={() => {
                  setActiveTag(tag === activeTag ? null : tag);
                  setPage(1);
                }}
              >
                #{tag}
              </button>
            ))}
            {activeTag && (
              <button
                className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
                onClick={() => setActiveTag(null)}
              >
                {t('blogs.clear_tag', 'Clear Tag')}
              </button>
            )}
          </div>
        )}
        {/* Blog Cards Grid */}
        {data.blogs.length === 0 ? (
          <div className="text-center text-xl text-gray-500 dark:text-gray-400 py-20">{t('blogs.no_blogs', 'No blogs found.')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.blogs.map((blog, i) => (
              <div
                key={blog.id}
                ref={el => (cardsRef.current[i] = el)}
                className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-white/30 dark:border-gray-700/60 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col relative"
              >
                <Link to={`/blog/${blog.id}`} className="flex-1 flex flex-col">
                  <div className="relative h-56 overflow-hidden rounded-t-2xl">
                    <ImageWithFallback
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      fallbackClassName="w-full h-full rounded-t-2xl"
                      loading="lazy"
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
                    
                    {/* Type Badge */}
                    {blog.type && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-blue-700 dark:text-blue-300 shadow-lg backdrop-blur-sm">
                        {blog.type}
                      </div>
                    )}
                    
                    {/* Date Badge */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 shadow-lg backdrop-blur-sm">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors mb-3 line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags && blog.tags.slice(0, 3).map(tag => (
                        <button
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          onClick={e => {
                            e.preventDefault();
                            setActiveTag(tag);
                            setPage(1);
                          }}
                        >
                          #{tag}
                        </button>
                      ))}
                      {blog.tags && blog.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Stats and Like Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span>{blog.views || 0} {t('blogs.views', 'views')}</span>
                        <span>·</span>
                        <span>{calculateReadingTime(blog.content)} {t('blogs.min_read', 'min read')}</span>
                      </div>
                      
                      {/* Like Button */}
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all border border-pink-200 dark:border-pink-800"
                        onClick={e => {
                          e.preventDefault();
                          handleLike(blog.id);
                        }}
                        aria-label={likeStates[blog.id]?.liked ? t('common.unlike', 'Unlike') : t('common.like', 'Like')}
                      >
                        <HeartIcon filled={likeStates[blog.id]?.liked} />
                        <span className="text-pink-500 dark:text-pink-400 font-semibold text-sm">
                          {likeStates[blog.id]?.count || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold disabled:opacity-50"
          >
            {t('common.previous', 'Previous')}
          </button>
          <span className="px-4 py-2 text-gray-700 dark:text-gray-300 font-semibold">{page}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * pageSize >= data.total}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold disabled:opacity-50"
          >
            {t('common.next', 'Next')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogsPage;
