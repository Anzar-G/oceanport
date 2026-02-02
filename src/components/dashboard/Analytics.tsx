
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  MousePointer,
  Users,
  TrendingUp,
  Calendar,
  Globe
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const Analytics: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalViews: 0,
    totalClicks: 0,
    uniqueVisitors: 0,
    ctr: 0
  });
  const [chartData, setChartData] = useState([]);
  const [topLinks, setTopLinks] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Fetch all analytics events
        const { data: events, error } = await supabase
          .from('analytics')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Process basic stats
        const views = events?.filter(e => e.event_type === 'view') || [];
        const clicks = events?.filter(e => e.event_type === 'click') || [];
        const uniqueVisitors = new Set(events?.map(e => e.visitor_id)).size || 0;

        setStats({
          totalViews: views.length,
          totalClicks: clicks.length,
          uniqueVisitors,
          ctr: views.length ? (clicks.length / views.length) * 100 : 0
        });

        // Process Weekly Data
        const last7Days = [...Array(7)].map((_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - i);
          return d.toISOString().split('T')[0];
        }).reverse();

        const dailyData = last7Days.map(date => {
          const dayViews = views.filter(e => e.created_at.startsWith(date)).length;
          const dayClicks = clicks.filter(e => e.created_at.startsWith(date)).length;
          return {
            name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
            views: dayViews,
            clicks: dayClicks
          };
        });
        setChartData(dailyData as any);

        // Process Devices
        const deviceCounts = events?.reduce((acc: any, curr) => {
          const device = curr.metadata?.device_type || 'desktop';
          acc[device] = (acc[device] || 0) + 1;
          return acc;
        }, {}) || {};

        const deviceData = Object.entries(deviceCounts).map(([name, value]) => ({
          name,
          value
        }));
        setDevices(deviceData as any);

        // Process Top Links
        const { data: links } = await supabase
          .from('social_links')
          .select('id, label, platform')
          .eq('user_id', user.id);

        if (links) {
          const linkClicks = clicks.reduce((acc: any, curr) => {
            acc[curr.link_id] = (acc[curr.link_id] || 0) + 1;
            return acc;
          }, {});

          const top = links
            .map(l => ({
              name: l.label,
              platform: l.platform,
              value: linkClicks[l.id] || 0
            }))
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 5);

          setTopLinks(top as any);
        }

      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-cool text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const COLORS = ['#00D9FF', '#1DD3B0', '#9D4EDD', '#FF006E', '#FFBE0B'];

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
          Real-time performance metrics.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Eye}
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          color="bg-cyan-glow/20"
        />
        <StatCard
          icon={MousePointer}
          title="Total Clicks"
          value={stats.totalClicks.toLocaleString()}
          color="bg-teal-accent/20"
        />
        <StatCard
          icon={Users}
          title="Unique Visitors"
          value={stats.uniqueVisitors.toLocaleString()}
          color="bg-purple-depth/20"
        />
        <StatCard
          icon={TrendingUp}
          title="CTR"
          value={`${stats.ctr.toFixed(1)}%`}
          color="bg-navy-light/40"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-cool">Loading analytics data...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-cyan-glow" />
              <h3 className="text-white text-lg font-bold">Weekly Performance</h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1DD3B0" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1DD3B0" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#00D9FF" fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="clicks" stroke="#1DD3B0" fillOpacity={1} fill="url(#colorClicks)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <MousePointer className="w-5 h-5 text-cyan-glow" />
              <h3 className="text-white text-lg font-bold">Top Performing Links</h3>
            </div>
            <div className="space-y-4">
              {topLinks.length === 0 ? (
                <p className="text-gray-cool text-center py-8">No clicks yet</p>
              ) : (
                topLinks.map((link: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        /* eslint-disable-next-line react/no-unknown-property */
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-white font-medium truncate max-w-[200px]">{link.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold">{link.value}</span>
                      <span className="text-gray-cool text-sm ml-1">clicks</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-cyan-glow" />
              <h3 className="text-white text-lg font-bold">Device Distribution</h3>
            </div>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={devices}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {devices.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A1628', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
              {devices.map((entry: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    /* eslint-disable-next-line react/no-unknown-property */
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-cool capitalize">{entry.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};