import React from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  MousePointer,
  Users,
  TrendingUp,
  Calendar,
  Globe
} from 'lucide-react';

// Mock data - in real app, this would come from your analytics service
const mockData = {
  totalViews: 1247,
  totalClicks: 342,
  uniqueVisitors: 891,
  conversionRate: 27.4,
  weeklyViews: [
    { day: 'Mon', views: 120, clicks: 32 },
    { day: 'Tue', views: 180, clicks: 45 },
    { day: 'Wed', views: 150, clicks: 38 },
    { day: 'Thu', views: 220, clicks: 58 },
    { day: 'Fri', views: 190, clicks: 49 },
    { day: 'Sat', views: 160, clicks: 41 },
    { day: 'Sun', views: 140, clicks: 36 },
  ],
  topLinks: [
    { name: 'Instagram', clicks: 89, color: '#E4405F' },
    { name: 'LinkedIn', clicks: 76, color: '#0A66C2' },
    { name: 'Portfolio', clicks: 65, color: '#00D9FF' },
    { name: 'GitHub', clicks: 54, color: '#FFFFFF' },
    { name: 'Email', clicks: 43, color: '#EA4335' },
  ],
  countries: [
    { name: 'United States', value: 45 },
    { name: 'United Kingdom', value: 20 },
    { name: 'Germany', value: 15 },
    { name: 'Canada', value: 12 },
    { name: 'Others', value: 8 },
  ]
};

export const Analytics: React.FC = () => {
  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-cool text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 flex items-center gap-1 ${change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
              <TrendingUp className="w-3 h-3" />
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-white text-4xl font-black tracking-tight">Analytics</h2>
        <p className="text-gray-cool text-base">
          Track your link performance and visitor insights.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          title="Total Views"
          value={mockData.totalViews.toLocaleString()}
          change={12.5}
          color="bg-cyan-glow/20"
        />
        <StatCard
          icon={MousePointer}
          title="Total Clicks"
          value={mockData.totalClicks.toLocaleString()}
          change={8.3}
          color="bg-teal-accent/20"
        />
        <StatCard
          icon={Users}
          title="Unique Visitors"
          value={mockData.uniqueVisitors.toLocaleString()}
          change={15.7}
          color="bg-purple-depth/20"
        />
        <StatCard
          icon={TrendingUp}
          title="Conversion Rate"
          value={`${mockData.conversionRate}%`}
          change={-2.1}
          color="bg-navy-light/40"
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-cyan-glow" />
            <h3 className="text-white text-lg font-bold">Weekly Performance</h3>
          </div>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-cool/30 mx-auto mb-4" />
              <p className="text-gray-cool">Charts will appear after running:</p>
              <code className="text-cyan-glow text-sm">npm install</code>
            </div>
          </div>
        </motion.div>

        {/* Top Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <MousePointer className="w-5 h-5 text-cyan-glow" />
            <h3 className="text-white text-lg font-bold">Top Performing Links</h3>
          </div>
          <div className="space-y-4">
            {mockData.topLinks.map((link) => (
              <div key={link.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: link.color }}
                  />
                  <span className="text-white font-medium">{link.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold">{link.clicks}</span>
                  <span className="text-gray-cool text-sm ml-1">clicks</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic Distribution Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5 text-cyan-glow" />
          <h3 className="text-white text-lg font-bold">Geographic Distribution</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-white/10 rounded-lg">
            <div className="text-center">
              <Globe className="w-12 h-12 text-gray-cool/30 mx-auto mb-4" />
              <p className="text-gray-cool">Pie chart will appear after:</p>
              <code className="text-cyan-glow text-sm">npm install</code>
            </div>
          </div>
          <div className="space-y-3">
            {mockData.countries.map((country) => (
              <div key={country.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full bg-cyan-glow"
                    style={{ opacity: 1 - (mockData.countries.indexOf(country) * 0.15) }}
                  />
                  <span className="text-white">{country.name}</span>
                </div>
                <span className="text-gray-cool">{country.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Install Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-6 border border-cyan-glow/20"
      >
        <div className="text-center">
          <h3 className="text-white text-lg font-bold mb-4">📊 Enable Full Analytics</h3>
          <p className="text-gray-cool mb-4">
            To see interactive charts and graphs, install the dependencies:
          </p>
          <div className="bg-navy-base/50 rounded-lg p-4 mb-4">
            <code className="text-cyan-glow">npm install</code>
          </div>
          <p className="text-gray-cool text-sm">
            This will install Recharts for beautiful, interactive data visualizations.
          </p>
        </div>
      </motion.div>
    </div>
  );
};