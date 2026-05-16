'use client'; 

import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
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
  Cell,
  Legend
} from "recharts";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ArrowTrendingUpIcon,
  ArrowRightIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

// Advanced Modern Stat Card
const StatCard = ({ title, value, icon, trend, colorClass, iconBgClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-semibold mb-1">{title}</p>
        <h4 className="text-3xl font-extrabold text-gray-900">{value}</h4>
      </div>
      <div className={`p-3 rounded-xl ${iconBgClass}`}>{icon}</div>
    </div>
    {/* Trend Indicator (You can wire this up to real backend data later!) */}
    <div className="mt-4 flex items-center text-sm">
      <span className="flex items-center text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
        <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
        {trend}
      </span>
      <span className="text-gray-400 ml-2">vs last month</span>
    </div>
  </div>
);

// Custom Tooltip for the Area Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-100">
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-blue-600 font-bold text-lg">
          ৳{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function StatsPage() {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosSecure.get("/admin-stats")
      .then((res) => {
        const data = res.data;
        if (!data.orderStats) data.orderStats = [];
        if (!data.categoryStats) data.categoryStats = [];
        setStats(data);
      })
      .catch((err) => console.error("Failed to load admin stats:", err));
  }, [axiosSecure]);

  if (!stats) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Aggregating Store Data...</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Overview
            </h2>
            <p className="text-gray-500 mt-1">Here is what's happening with your store today.</p>
          </div>
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button className="px-4 py-2 text-sm font-bold bg-blue-50 text-blue-600 rounded-md">30 Days</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition">All Time</button>
          </div>
        </div>

        {/* 1. Power Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`৳${stats.revenue?.toLocaleString() || 0}`}
            icon={<CurrencyDollarIcon className="h-7 w-7 text-green-600" />}
            iconBgClass="bg-green-100"
            trend="12.5%"
          />
          <StatCard
            title="Total Orders"
            value={stats.orders?.toLocaleString() || 0}
            icon={<ShoppingBagIcon className="h-7 w-7 text-blue-600" />}
            iconBgClass="bg-blue-100"
            trend="8.2%"
          />
          <StatCard
            title="Total Products"
            value={stats.products?.toLocaleString() || 0}
            icon={<CubeIcon className="h-7 w-7 text-purple-600" />}
            iconBgClass="bg-purple-100"
            trend="3.1%"
          />
          <StatCard
            title="Total Users"
            value={stats.users?.toLocaleString() || 0}
            icon={<UsersIcon className="h-7 w-7 text-orange-600" />}
            iconBgClass="bg-orange-100"
            trend="18.4%"
          />
        </div>

        {/* 2. Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Main Area Chart: Spans 2 Columns */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Revenue Analytics</h3>
            </div>
            <div className="h-[350px]">
              {stats.orderStats.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.orderStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="dailyRevenue" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  Insufficient data to render revenue analytics.
                </div>
              )}
            </div>
          </div>

          {/* Secondary Donut Chart: Spans 1 Column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h3>
            <div className="h-[300px]">
              {stats.categoryStats.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.categoryStats}
                      cx="50%"
                      cy="45%"
                      innerRadius={80} // Creates the Donut effect!
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="count"
                      stroke="none"
                    >
                      {stats.categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} Items`, name]}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#4B5563' }}/>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  No category data available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Quick Workspace Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Ready to expand your catalog?</h3>
                    <p className="text-blue-100 mb-6 max-w-sm">Keep your inventory fresh to maintain your growth trend. Add new products to your store in just a few clicks.</p>
                    <Link href="/dashboard/add_product" className="inline-flex items-center bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition shadow-sm">
                        Add New Product <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Link>
                </div>
                {/* Decorative background shapes */}
                <div className="absolute -right-10 -top-10 h-64 w-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute right-20 -bottom-20 h-40 w-40 bg-indigo-400 opacity-20 rounded-full blur-2xl"></div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <ShoppingBagIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Recent Orders</h3>
                <p className="text-gray-500 mb-6 max-w-sm">Check your fulfillment queue and process the latest transactions from your customers.</p>
                <Link href="/dashboard/orders" className="text-blue-600 font-semibold hover:text-blue-800 transition flex items-center">
                    Go to Orders Hub <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}