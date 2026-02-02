import { motion } from 'framer-motion';
import { Profile } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { MapPin } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card rounded-3xl p-8 md:p-12 shadow-card hover:shadow-card-hover transition-all duration-300 w-full max-w-2xl"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex flex-col items-center"
      >
        <Avatar
          src={profile.avatar_url}
          alt={profile.full_name}
          size="xl"
          className="mb-6 floating-animation"
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-3 text-center leading-tight"
        >
          {profile.full_name}
        </motion.h1>
        
        {profile.tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-teal-accent font-medium tracking-wide uppercase mb-3 text-center"
          >
            {profile.tagline}
          </motion.p>
        )}
        
        {profile.bio && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm md:text-base text-gray-cool/80 max-w-md text-center leading-relaxed mb-4 px-2 md:px-0"
          >
            {profile.bio}
          </motion.p>
        )}
        
        {profile.location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 text-sm text-gray-cool/60"
          >
            <MapPin className="w-4 h-4" />
            {profile.location}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};