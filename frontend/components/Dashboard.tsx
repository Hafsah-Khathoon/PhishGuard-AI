import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Mail, ShieldX, CheckCircle, Users, ArrowUpRight, TrendingUp, Globe, Activity, Zap, AlertCircle, Clock } from 'lucide-react';
import { MetricCardProps } from '../types.ts';
import { getDashboardAnalytics, getRecentActivity } from '../services/geminiService.ts';

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon }) => (
  <div className="glass p-6 rounded-2xl flex items-start justify-between hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-brand-cyan/30">
    <div className="flex-1">
      <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">{label}</p>
      <h3 className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-brand-cyan group-hover:to-cyan-300 transition-all duration-300">{value}</h3>
      {change && (
        <p className="text-xs font-bold text-brand-green mt-2 flex items-center gap-1 animate-pulse">
          <TrendingUp className="w-3 h-3" /> {change}
        </p>
      )}
    </div>
    <div className="p-4 bg-gradient-to-br from-brand-cyan/20 to-cyan-500/10 rounded-xl text-brand-cyan group-hover:scale-110 transition-transform duration-300 border border-brand-cyan/20">
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, activityData] = await Promise.all([
          getDashboardAnalytics(),
          getRecentActivity(4)
        ]);
        
        setAnalytics(analyticsData);
        setRecentActivity(activityData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate chart data from analytics
  const chartData = analytics?.week_trend?.map((day: any, index: number) => ({
    name: new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    threat: day.phishing_count + day.suspicious_count
  })) || [
    { name: 'Jan 15', threat: 4 },
    { name: 'Jan 16', threat: 12 },
    { name: 'Jan 17', threat: 25 },
    { name: 'Jan 18', threat: 45 },
    { name: 'Jan 19', threat: 30 },
    { name: 'Jan 20', threat: 18 },
    { name: 'Jan 21', threat: 52 },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return '+100%';
    const change = ((current - previous) / previous) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-cyan mx-auto mb-4"></div>
            <p className="text-slate-400">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      {/* Header Section with Enhanced Design */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-cyan/20 rounded-lg border border-brand-cyan/30">
              <Activity className="w-5 h-5 text-brand-cyan" />
            </div>
            <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white via-brand-cyan to-white bg-clip-text text-transparent">
              Security Analytics
            </h2>
          </div>
          <p className="text-slate-400 text-lg">Real-time visualization of network threats and security metrics</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-green/10 border border-brand-green/30 rounded-lg">
              <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-brand-green">LIVE</span>
            </div>
            <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard 
          label="Emails Scanned" 
          value={formatNumber(analytics?.totals?.total_detections || 0)} 
          change={analytics?.today?.total_scans > 0 ? `+${analytics.today.total_scans} today` : undefined}
          icon={<Mail className="w-7 h-7" />} 
        />
        <MetricCard 
          label="Threats Blocked" 
          value={formatNumber((analytics?.totals?.total_phishing || 0) + (analytics?.totals?.total_suspicious || 0))} 
          change={analytics?.today ? calculateChange(
            analytics.today.phishing_count + analytics.today.suspicious_count,
            (analytics.totals.total_phishing + analytics.totals.total_suspicious) - (analytics.today.phishing_count + analytics.today.suspicious_count)
          ) : undefined}
          icon={<ShieldX className="w-7 h-7" />} 
        />
        <MetricCard 
          label="Accuracy Rate" 
          value={analytics?.totals?.avg_confidence ? `${Math.round(analytics.totals.avg_confidence)}%` : "99.8%"} 
          icon={<CheckCircle className="w-7 h-7" />} 
        />
        <MetricCard 
          label="Active Scans" 
          value={analytics?.today?.total_scans || 0} 
          change={analytics?.today?.total_scans > 0 ? "+Live" : undefined}
          icon={<Zap className="w-7 h-7" />} 
        />
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10 hover:border-brand-cyan/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-cyan/20 rounded-lg">
                <Activity className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight">Threat Detection Over Time</h3>
                <p className="text-xs text-slate-500 mt-1">7-day threat activity trend</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
              <span className="text-xs px-3 py-1.5 bg-brand-red/10 text-brand-red border border-brand-red/20 rounded-lg font-bold uppercase tracking-widest">Live Feed</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(34, 211, 238, 0.3)', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(34, 211, 238, 0.1)'
                  }}
                  itemStyle={{ color: '#22d3ee', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="threat" 
                  stroke="#22d3ee" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorThreat)"
                  dot={{ fill: '#22d3ee', r: 4 }}
                  activeDot={{ r: 6, fill: '#22d3ee' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl overflow-hidden border border-white/10 hover:border-brand-cyan/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-brand-cyan/20 rounded-lg">
                <Clock className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <h3 className="font-bold text-xl tracking-tight">Recent Activity</h3>
                <p className="text-xs text-slate-500 mt-1">Latest detections</p>
              </div>
            </div>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
            {recentActivity.length > 0 ? recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-cyan/20 transition-all duration-200 group cursor-pointer animate-in fade-in slide-in-from-right" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-lg border ${
                    activity.status === 'PHISHING' ? 'text-brand-red bg-brand-red/10 border-brand-red/20' : 
                    activity.status === 'SUSPICIOUS' ? 'text-brand-yellow bg-brand-yellow/10 border-brand-yellow/20' : 
                    'text-brand-green bg-brand-green/10 border-brand-green/20'
                  } group-hover:scale-110 transition-transform`}>
                    {activity.status === 'PHISHING' ? <AlertCircle className="w-4 h-4" /> : 
                     activity.status === 'SUSPICIOUS' ? <AlertCircle className="w-4 h-4" /> : 
                     <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-white group-hover:text-brand-cyan transition-colors">
                      {activity.display_text || 'Detection'}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">
                      {new Date(activity.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${
                  activity.status === 'PHISHING' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' : 
                  activity.status === 'SUSPICIOUS' ? 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20' : 
                  'bg-brand-green/10 text-brand-green border-brand-green/20'
                }`}>
                  {activity.status}
                </span>
              </div>
            )) : [
              { target: 'login-verify.net', status: 'PHISHING', time: '2m ago' },
              { target: 'Urgent: Reset...', status: 'SAFE', time: '12m ago' },
              { target: 'Suspension Alert', status: 'PHISHING', time: '45m ago' },
              { target: 'google.com/search', status: 'SAFE', time: '1h ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-cyan/20 transition-all duration-200 group cursor-pointer">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-lg border ${
                    activity.status === 'PHISHING' ? 'text-brand-red bg-brand-red/10 border-brand-red/20' : 
                    'text-brand-green bg-brand-green/10 border-brand-green/20'
                  } group-hover:scale-110 transition-transform`}>
                    {activity.status === 'PHISHING' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-white group-hover:text-brand-cyan transition-colors">{activity.target}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-1">{activity.time}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${
                  activity.status === 'PHISHING' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' : 
                  'bg-brand-green/10 text-brand-green border-brand-green/20'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-green/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-green/20 rounded-lg border border-brand-green/30">
              <CheckCircle className="w-5 h-5 text-brand-green" />
            </div>
            <span className="text-2xl font-black text-brand-green">
              {analytics?.totals?.total_safe || 0}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Safe Detections</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-yellow/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-yellow/20 rounded-lg border border-brand-yellow/30">
              <AlertCircle className="w-5 h-5 text-brand-yellow" />
            </div>
            <span className="text-2xl font-black text-brand-yellow">
              {analytics?.totals?.total_suspicious || 0}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suspicious Items</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/10 hover:border-brand-red/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-red/20 rounded-lg border border-brand-red/30">
              <ShieldX className="w-5 h-5 text-brand-red" />
            </div>
            <span className="text-2xl font-black text-brand-red">
              {analytics?.totals?.total_phishing || 0}
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phishing Threats</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;