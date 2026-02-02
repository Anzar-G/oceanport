export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  bio: string | null;
  tagline: string | null;
  avatar_url: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  user_id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  username?: string | null;
  icon_name: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export type SocialPlatform =
  | 'instagram'
  | 'whatsapp'
  | 'tiktok'
  | 'github'
  | 'linkedin'
  | 'email'
  | 'upscrolled'
  | 'telegram'
  | 'discord'
  | 'portfolio'
  | 'twitter';

export interface SocialLinkFormData {
  platform: SocialPlatform;
  label: string;
  url: string;
  username?: string;
  is_active: boolean;
}

export interface ProfileFormData {
  full_name: string;
  bio: string;
  tagline: string;
  location?: string;
  avatar?: File | null;
}

export interface User {
  id: string;
  email?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}