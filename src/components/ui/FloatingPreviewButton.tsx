import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';
import { LivePreview } from '@/components/dashboard/LivePreview';

interface FloatingPreviewButtonProps {
  userId: string;
}

export const FloatingPreviewButton: React.FC<FloatingPreviewButtonProps> = ({ userId }) => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowPreview(true)}
        className="xl:hidden fixed bottom-6 right-6 z-30 w-14 h-14 bg-gradient-to-r from-teal-accent to-cyan-glow rounded-full shadow-lg flex items-center justify-center text-navy-base"
      >
        <Eye className="w-6 h-6" />
      </motion.button>

      {/* Mobile Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="xl:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowPreview(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="xl:hidden fixed inset-4 z-50 glass-card rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white text-lg font-bold">Live Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-cool" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto hide-scrollbar" style={{ height: 'calc(100% - 80px)' }}>
                <LivePreview userId={userId} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};