import { supabase } from './supabase';
import { SocialPlatform } from '@/types';
import { 
  Instagram, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Mail, 
  Send,
  Globe,
  Twitter
} from 'lucide-react';

export const uploadAvatar = async (
  file: File,
  userId: string
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return { url: data.publicUrl, error: null };
  } catch (err) {
    return { url: null, error: err as Error };
  }
};

export const deleteAvatar = async (url: string): Promise<{ error: Error | null }> => {
  try {
    // Extract filename from URL
    const fileName = url.split('/avatars/')[1];
    
    const { error } = await supabase.storage
      .from('avatars')
      .remove([fileName]);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    return { error: err as Error };
  }
};

export const getSocialIcon = (platform: SocialPlatform) => {
  const iconMap = {
    instagram: Instagram,
    whatsapp: MessageCircle,
    tiktok: Globe, // Using Globe as placeholder for TikTok
    github: Github,
    linkedin: Linkedin,
    email: Mail,
    upscrolled: Globe,
    telegram: Send,
    discord: MessageCircle,
    portfolio: Globe,
    twitter: Twitter,
  };
  
  return iconMap[platform] || Globe;
};

export const getPlatformColor = (platform: SocialPlatform): string => {
  const colorMap = {
    instagram: '#E4405F',
    whatsapp: '#25D366',
    tiktok: '#000000',
    github: '#FFFFFF',
    linkedin: '#0A66C2',
    email: '#EA4335',
    upscrolled: '#1DD3B0',
    telegram: '#26A5E4',
    discord: '#5865F2',
    portfolio: '#00D9FF',
    twitter: '#1DA1F2',
  };
  
  return colorMap[platform] || '#00D9FF';
};

export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};