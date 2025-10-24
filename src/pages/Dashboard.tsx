import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Package } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Hero3D } from "@/components/Hero3D";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getKPIs, getRevenueChart, getSalesbyCategory } from "@/lib/mockServer";

const kpis = getKPIs();
const revenueData = getRevenueChart();
const salesByCategory = getSalesbyCategory();

const chartData = revenueData.labels.map((label, i) => ({
  month: label,
  revenue: revenueData.data[i],
}));

const COLORS = ["hsl(172 66% 50%)", "hsl(25 95% 53%)", "hsl(217 91% 60%)", "hsl(142 71% 45%)"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your business today.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value={kpis.revenue}
          change={kpis.yoy}
          prefix="$"
          icon={DollarSign}
          delay={0}
        />
        <KPICard
          title="Net Profit"
          value={kpis.profit}
          change={18.2}
          prefix="$"
          icon={TrendingUp}
          delay={0.1}
        />
        <KPICard
          title="Total Sales"
          value={346}
          change={12.5}
          icon={Users}
          delay={0.2}
        />
        <KPICard
          title="Inventory Items"
          value={1245}
          change={-3.2}
          icon={Package}
          delay={0.3}
        />
      </div>

      {/* 3D Hero & Revenue Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Hero3D />
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="mb-4 text-xl font-bold">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(172 66% 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(172 66% 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(223 47% 11%)" />
              <XAxis
                dataKey="month"
                stroke="hsl(215.4 16.3% 56.9%)"
                style={{ fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(215.4 16.3% 56.9%)"
                style={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(224 71% 4% / 0.9)",
                  border: "1px solid hsl(223 47% 11%)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(172 66% 50%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Sales by Category & Top Models */}
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="mb-4 text-xl font-bold">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="mb-4 text-xl font-bold">Top Selling Models</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpis.topModels}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(223 47% 11%)" />
              <XAxis dataKey="name" stroke="hsl(215.4 16.3% 56.9%)" style={{ fontSize: 12 }} />
              <YAxis stroke="hsl(215.4 16.3% 56.9%)" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(224 71% 4% / 0.9)",
                  border: "1px solid hsl(223 47% 11%)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="hsl(172 66% 50%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
