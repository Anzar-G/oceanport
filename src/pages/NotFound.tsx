import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BackgroundEffects } from '@/components/common/BackgroundEffects';
import { Button } from '@/components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <BackgroundEffects />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-cool leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button onClick={() => navigate('/')}>
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;