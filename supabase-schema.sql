-- Personal Link Hub Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  bio TEXT,
  tagline VARCHAR(200),
  avatar_url TEXT,
  location VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social links table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  username VARCHAR(100),
  icon_name VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT unique_user_platform UNIQUE(user_id, platform)
);

-- Site settings table (optional)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  theme VARCHAR(50) DEFAULT 'navy-mysterious',
  custom_css TEXT,
  analytics_enabled BOOLEAN DEFAULT false,
  custom_domain VARCHAR(200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Social links policies
CREATE POLICY "Public links are viewable by everyone"
  ON social_links FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can manage own links"
  ON social_links FOR ALL
  USING (auth.uid() = user_id);

-- Site settings policies
CREATE POLICY "Users can manage own settings"
  ON site_settings FOR ALL
  USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX idx_social_links_user_id ON social_links(user_id);
CREATE INDEX idx_social_links_active ON social_links(is_active);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON social_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, bio)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'New User'),
    'Welcome to my links!'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );