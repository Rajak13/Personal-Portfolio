import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

function useBlogs({ page = 1, pageSize = 6, filters = {}, sort = 'created_at', order = 'desc', search = '' }) {
  return useQuery({
    queryKey: ['blogs', page, filters, sort, order, search],
    queryFn: async () => {
      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order(sort, { ascending: order === 'asc' })
        .range((page - 1) * pageSize, page * pageSize - 1);

      // Filtering
      if (filters.tags) query = query.contains('tags', filters.tags);
      if (filters.type) query = query.eq('type', filters.type);
      // Search
      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { blogs: data, total: count };
    },
  });
}

export default useBlogs;
