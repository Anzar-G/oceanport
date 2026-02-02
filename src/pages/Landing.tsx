import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BackgroundEffects } from '@/components/common/BackgroundEffects';
import { ProfileCard } from '@/components/landing/ProfileCard';
import { SocialLinkCard } from '@/components/landing/SocialLinkCard';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Profile, SocialLink } from '@/types';
import { Network, Mail, Download } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

const Landing: React.FC = () => {
  const { trackView } = useAnalytics();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if Supabase is configured
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
          // Show demo data when Supabase isn't configured
          setProfile({
            id: 'demo',
            user_id: 'demo',
            full_name: 'Demo User',
            bio: 'This is a demo profile. Set up Supabase to create your own!',
            tagline: 'Demo Mode',
            avatar_url: null,
            location: 'Demo Land',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

          setLinks([
            {
              id: 'demo1',
              user_id: 'demo',
              platform: 'github',
              label: 'GitHub Profile',
              url: 'https://github.com',
              username: 'demo',
              icon_name: 'github',
              is_active: true,
              order_index: 0,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: 'demo2',
              user_id: 'demo',
              platform: 'linkedin',
              label: 'LinkedIn',
              url: 'https://linkedin.com',
              username: 'demo',
              icon_name: 'linkedin',
              is_active: true,
              order_index: 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: 'demo3',
              user_id: 'demo',
              platform: 'email',
              label: 'Email Me',
              url: 'mailto:demo@example.com',
              username: null,
              icon_name: 'email',
              is_active: true,
              order_index: 2,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);
          setLoading(false);
          return;
        }

        // For demo purposes, we'll fetch the first profile
        // In production, this would be based on a username or custom domain
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (error) throw error;

        if (profileData) {
          try {
            trackView(profileData.user_id);
          } catch (e) {
            console.error('Track view failed', e);
          }
          setProfile(profileData);

          const { data: linksData } = await supabase
            .from('social_links')
            .select('*')
            .eq('user_id', profileData.user_id)
            .eq('is_active', true)
            .order('order_index', { ascending: true });

          setLinks(linksData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Show demo data on error
        setProfile({
          id: 'demo',
          user_id: 'demo',
          full_name: 'Demo User',
          bio: 'Set up Supabase to create your own profile!',
          tagline: 'Demo Mode',
          avatar_url: null,
          location: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundEffects />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-glow/30 border-t-cyan-glow rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-cool">Loading your links...</p>
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundEffects />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-gray-cool">This link hub doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const isDemo = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder');

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <BackgroundEffects />

      {/* Setup Banner - Show when Supabase not configured */}
      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-cyan-glow to-teal-accent text-navy-base p-3 text-center"
        >
          <p className="text-sm font-semibold">
            🚀 Demo Mode - Set up Supabase to create your own link hub!
            <a href="#setup" className="underline ml-2">Setup Guide</a>
          </p>
        </motion.div>
      )}

      {/* Navigation - Mobile Optimized */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full flex justify-center py-4 md:py-6 px-4 ${isDemo ? 'pt-16 md:pt-20' : ''}`}
      >
        <div className="glass-card rounded-xl px-4 md:px-6 py-3 flex items-center justify-between w-full max-w-4xl">
          <div className="flex items-center gap-3">
            <Network className="w-5 h-5 md:w-6 md:h-6 text-cyan-glow" />
            <h2 className="text-white text-base md:text-lg font-bold">Link Hub</h2>
          </div>
          <Button variant="outline" size="sm" className="text-xs md:text-sm px-3 md:px-4">
            Get in Touch
          </Button>
        </div>
      </motion.header>

      {/* Main Content - Mobile Optimized */}
      <main className="flex flex-col items-center px-4 pb-12 md:pb-20">
        <div className="w-full max-w-4xl">
          {/* Profile Section */}
          <div className="flex justify-center mb-8 md:mb-12">
            <ProfileCard profile={profile} />
          </div>

          {/* Social Links Grid - Optimized for Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4 mb-16"
          >
            {/* Mobile: Stacked cards with better spacing */}
            <div className="block md:hidden space-y-3">
              {links.map((link, index) => (
                <SocialLinkCard key={link.id} link={link} index={index} />
              ))}
            </div>

            {/* Tablet & Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {links.map((link, index) => (
                <SocialLinkCard key={link.id} link={link} index={index} />
              ))}
            </div>
          </motion.div>

          {/* CTA Section - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-glow/10 rounded-full blur-[80px]" />

            <div className="flex flex-col gap-6 md:gap-8 relative z-10">
              <div className="text-center md:text-left">
                <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3 md:mb-2">
                  Let's build something extraordinary.
                </h2>
                <p className="text-gray-cool text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
                  Currently accepting new projects and consulting opportunities.
                  Reach out for a free discovery session.
                </p>
              </div>

              {/* Mobile: Stacked buttons, Desktop: Side by side */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <Button className="w-full md:w-auto md:min-w-[160px] justify-center">
                  <Mail className="w-4 h-4" />
                  Schedule Call
                </Button>
                <Button variant="secondary" className="w-full md:w-auto md:min-w-[160px] justify-center">
                  <Download className="w-4 h-4" />
                  Download CV
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 flex flex-col items-center gap-4 text-gray-cool/50 text-sm">
        <div className="flex gap-6">
          <a href="#" className="hover:text-cyan-glow transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-glow transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-glow transition-colors">Analytics</a>
        </div>
        <p>© 2024 {profile.full_name}. Built for the deep web.</p>
        <div className="flex items-center gap-1 text-[10px] tracking-[0.2em] uppercase opacity-50">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          Encrypted Connection Verified
        </div>
      </footer>
    </div>
  );
};

export default Landing;