import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { Avatar } from '@/components/ui/Avatar';
import { Menu, Network } from 'lucide-react';

interface MobileDashboardHeaderProps {
  onMenuClick: () => void;
  userId: string;
}

export const MobileDashboardHeader: React.FC<MobileDashboardHeaderProps> = ({
  onMenuClick,
  userId,
}) => {
  const { profile } = useProfile(userId);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:hidden fixed top-0 left-0 right-0 z-30 glass-card border-b border-white/10"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
          
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-glow" />
            <h1 className="text-white text-lg font-bold">Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Avatar
            src={profile?.avatar_url}
            alt={profile?.full_name || 'User'}
            size="sm"
          />
          <span className="text-white text-sm font-medium truncate max-w-[120px]">
            {profile?.full_name || 'User'}
          </span>
        </div>
      </div>
    </motion.header>
  );
};