import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { 
  Network, 
  User, 
  Link, 
  Settings, 
  BarChart3, 
  LogOut,
  X
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

interface DashboardSidebarProps {
  onClose?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user?.id);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const navItems = [
    { to: '/dashboard/profile', icon: User, label: 'Profile' },
    { to: '/dashboard/links', icon: Link, label: 'Links' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 bg-shadow-navy border-r border-white/5 flex flex-col justify-between p-6 h-full lg:h-screen"
    >
      <div className="flex flex-col gap-8">
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-accent to-cyan-glow flex items-center justify-center">
              <Network className="w-6 h-6 text-navy-base font-bold" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold leading-tight">Link Hub</h1>
              <p className="text-teal-accent text-xs font-medium tracking-wider uppercase">
                Management
              </p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-cool" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive
                    ? 'bg-teal-accent/10 border-l-4 border-teal-accent'
                    : 'hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-6 h-6 transition-colors ${
                      isActive
                        ? 'text-teal-accent'
                        : 'text-gray-cool group-hover:text-teal-accent'
                    }`}
                  />
                  <p
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-cool group-hover:text-white'
                    }`}
                  >
                    {item.label}
                  </p>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        {/* User Info */}
        <div className="p-4 rounded-xl bg-white/5">
          <p className="text-xs text-gray-cool mb-2">Logged in as</p>
          <div className="flex items-center gap-3">
            <Avatar
              src={profile?.avatar_url}
              alt={profile?.full_name || 'User'}
              size="sm"
            />
            <p className="text-sm font-medium text-white truncate">
              {profile?.full_name || user?.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="justify-start text-gray-cool hover:text-red-400 hover:bg-red-500/10"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </motion.aside>
  );
};