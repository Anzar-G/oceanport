import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SocialLink, SocialLinkFormData } from '@/types';

export const useLinks = (userId?: string) => {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('user_id', userId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLinks();
    }
  }, [userId]);

  const addLink = async (linkData: SocialLinkFormData) => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .insert([{ ...linkData, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      await fetchLinks(); // Refresh list
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const updateLink = async (id: string, updates: Partial<SocialLink>) => {
    try {
      const { data, error } = await supabase
        .from('social_links')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchLinks();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err as Error };
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchLinks();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const reorderLinks = async (reorderedLinks: SocialLink[]) => {
    try {
      const updates = reorderedLinks.map((link, index) => ({
        id: link.id,
        order_index: index,
      }));

      // Batch update
      for (const update of updates) {
        await supabase
          .from('social_links')
          .update({ order_index: update.order_index })
          .eq('id', update.id);
      }

      await fetchLinks();
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  return {
    links,
    loading,
    error,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    refreshLinks: fetchLinks,
  };
};