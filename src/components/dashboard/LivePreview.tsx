import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { useLinks } from '@/hooks/useLinks';
import { Monitor, Smartphone, Eye } from 'lucide-react';

interface LivePreviewProps {
  userId: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ userId }) => {
  const { profile } = useProfile(userId);
  const { links } = useLinks(userId);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const activeLinks = links.filter((link) => link.is_active);

  if (!profile) {
    return (
      <div className="sticky top-6 h-fit">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-teal-accent" />
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-cool">Loading preview...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-6 h-fit">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal-accent rounded-full animate-pulse" />
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'desktop'
                  ? 'bg-cyan-glow/20 text-cyan-glow'
                  : 'text-gray-cool hover:bg-white/5'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'mobile'
                  ? 'bg-cyan-glow/20 text-cyan-glow'
                  : 'text-gray-cool hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className={`bg-navy-base rounded-lg overflow-auto transition-all ${
            viewMode === 'mobile' ? 'max-w-[300px] mx-auto' : 'w-full'
          }`}
          style={{
            maxHeight: '70vh',
            transform: 'scale(0.6)',
            transformOrigin: 'top center',
          }}
        >
          <div className="p-8 space-y-6 min-h-[600px]">
            {/* Profile Preview */}
            <div className="flex justify-center">
              <div className="glass-card rounded-3xl p-8 max-w-md">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-navy-mid border-2 border-cyan-glow/50 mb-4 overflow-hidden">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt={profile.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-teal-accent/20 to-cyan-glow/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {profile.full_name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gradient mb-2">
                    {profile.full_name}
                  </h1>
                  
                  {profile.tagline && (
                    <p className="text-teal-accent text-sm font-medium uppercase tracking-wide mb-2">
                      {profile.tagline}
                    </p>
                  )}
                  
                  {profile.bio && (
                    <p className="text-gray-cool/80 text-sm leading-relaxed mb-2">
                      {profile.bio}
                    </p>
                  )}
                  
                  {profile.location && (
                    <p className="text-gray-cool/60 text-xs">
                      📍 {profile.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Links Preview */}
            <div className={`grid gap-3 ${
              viewMode === 'desktop' ? 'grid-cols-2' : 'grid-cols-1'
            }`}>
              {activeLinks.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-cool/60 text-sm">No active links</p>
                </div>
              ) : (
                activeLinks.map((link) => (
                  <div
                    key={link.id}
                    className="glass-card rounded-xl p-4 hover:border-cyan-glow/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <span className="text-xs">🔗</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">
                          {link.label}
                        </p>
                        <p className="text-gray-cool/60 text-xs capitalize">
                          {link.platform}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-gray-cool/60 text-xs mb-2">
            Public link: linkhub.me/{profile.full_name.toLowerCase().replace(/\s+/g, '')}
          </p>
          <button className="text-cyan-glow text-xs font-medium hover:underline">
            📋 Copy URL
          </button>
        </div>
      </motion.div>
    </div>
  );
};