import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundEffects } from '@/components/common/BackgroundEffects';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { MobileDashboardHeader } from '@/components/dashboard/MobileDashboardHeader';
import { ProfileEditor } from '@/components/dashboard/ProfileEditor';
import { LinkEditor } from '@/components/dashboard/LinkEditor';
import { Analytics } from '@/components/dashboard/Analytics';
import { Settings } from '@/components/dashboard/Settings';
import { LivePreview } from '@/components/dashboard/LivePreview';
import { FloatingPreviewButton } from '@/components/ui/FloatingPreviewButton';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex relative">
      <BackgroundEffects />
      
      {/* Mobile Header */}
      <div className="lg:hidden">
        <MobileDashboardHeader 
          onMenuClick={() => setSidebarOpen(true)}
          userId={user.id}
        />
      </div>
      
      {/* Sidebar - Desktop: Always visible, Mobile: Overlay */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50"
            >
              <DashboardSidebar onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto hide-scrollbar pt-20 lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard/profile" replace />} />
              <Route path="/profile" element={<ProfileEditor userId={user.id} />} />
              <Route path="/links" element={<LinkEditor userId={user.id} />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings userId={user.id} />} />
            </Routes>
          </motion.div>
        </div>
        
        {/* Live Preview Panel - Hidden on mobile, shown on desktop */}
        <aside className="hidden xl:block w-[420px] border-l border-white/5 p-6">
          <LivePreview userId={user.id} />
        </aside>
      </main>
      
      {/* Floating Preview Button for Mobile */}
      <FloatingPreviewButton userId={user.id} />
    </div>
  );
};

export default Dashboard;