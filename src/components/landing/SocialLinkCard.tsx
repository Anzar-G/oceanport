import { motion } from 'framer-motion';
import { SocialLink } from '@/types';
import { getSocialIcon, getPlatformColor } from '@/lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface SocialLinkCardProps {
  link: SocialLink;
  index: number;
}

export const SocialLinkCard: React.FC<SocialLinkCardProps> = ({ link, index }) => {
  const { trackClick } = useAnalytics();
  const Icon = getSocialIcon(link.platform);
  const platformColor = getPlatformColor(link.platform);

  const handleClick = () => {
    trackClick(link.user_id, link.id, {
      url: link.url,
      platform: link.platform
    });
  };

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.8 + index * 0.1,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative glass-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 block overflow-hidden"
      style={{
        '--platform-color': platformColor,
      } as React.CSSProperties}
    >
      {/* Mobile-optimized layout */}
      <div className="p-6 md:p-6">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 relative"
          >
            <div
              className="w-12 h-12 md:w-10 md:h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${platformColor}20` }}
            >
              <Icon
                className="w-6 h-6 md:w-5 md:h-5 transition-colors duration-200"
                /* eslint-disable-next-line react/no-unknown-property */
                style={{ color: platformColor }}
              />
            </div>
            {/* Mobile: Add small external link indicator */}
            <div className="md:hidden absolute -top-1 -right-1 w-4 h-4 bg-cyan-glow/20 rounded-full flex items-center justify-center">
              <ExternalLink className="w-2 h-2 text-cyan-glow" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg md:text-lg group-hover:text-cyan-glow transition-colors">
              {link.label}
            </h3>
            {link.username && (
              <p className="text-sm text-gray-cool/70 mt-1">@{link.username}</p>
            )}
            {/* Mobile: Show platform name */}
            <p className="md:hidden text-xs text-gray-cool/50 capitalize mt-1">
              {link.platform}
            </p>
          </div>

          {/* Arrow - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ x: 0, opacity: 0.6 }}
            whileHover={{ x: 4, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="hidden md:block"
          >
            <ArrowRight className="w-5 h-5 text-gray-cool group-hover:text-cyan-glow transition-colors" />
          </motion.div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        /* eslint-disable-next-line react/no-unknown-property */
        style={{
          background: `radial-gradient(circle at center, ${platformColor}15 0%, transparent 70%)`,
        }}
      />

      {/* Mobile: Bottom accent line */}
      <div
        className="md:hidden absolute bottom-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
        /* eslint-disable-next-line react/no-unknown-property */
        style={{ backgroundColor: platformColor }}
      />
    </motion.a>
  );
};