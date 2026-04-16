import { Skeleton } from "@/components/ui/skeleton";
import { BarChart2, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNoticesStore } from "../store/noticesStore";
import type { Category } from "../types";
import { CATEGORY_LABELS } from "../types";

// Raw oklch-based hex-like approximations via CSS var names resolved at runtime
const PIE_COLORS: Record<Category, string> = {
  academic: "oklch(0.58 0.21 265)",
  event: "oklch(0.62 0.24 142)",
  sports: "oklch(0.68 0.21 60)",
  general: "oklch(0.65 0.03 0)",
};

const PIE_COLORS_DARK: Record<Category, string> = {
  academic: "oklch(0.68 0.22 265)",
  event: "oklch(0.72 0.26 142)",
  sports: "oklch(0.75 0.23 60)",
  general: "oklch(0.58 0.03 0)",
};

const CATEGORIES: Category[] = ["academic", "event", "sports", "general"];

function usePieColors(): Record<Category, string> {
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  return isDark ? PIE_COLORS_DARK : PIE_COLORS;
}

// Custom tooltip for Pie chart
const PieTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-card text-xs">
        <p className="font-medium text-foreground">{payload[0].name}</p>
        <p className="text-muted-foreground">
          {payload[0].value} notice{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for Line chart
const LineTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-card text-xs">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-muted-foreground">
          {payload[0].value} notice{payload[0].value !== 1 ? "s" : ""} posted
        </p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const { notices, loading, fetch } = useNoticesStore();
  const pieColors = usePieColors();

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Pie chart data: count per category
  const pieData = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        name: CATEGORY_LABELS[cat],
        value: notices.filter((n) => n.category === cat).length,
        category: cat,
      })).filter((d) => d.value > 0),
    [notices],
  );

  // Line chart data: notices per day over last 30 days
  const lineData = useMemo(() => {
    const today = new Date();
    const days: { date: string; label: string; count: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      days.push({ date: dateStr, label, count: 0 });
    }
    for (const notice of notices) {
      const ts = notice.createdAt;
      // Handle both ms and seconds timestamps
      const d = new Date(ts > 1e12 ? ts : ts * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const dayEntry = days.find((day) => day.date === dateStr);
      if (dayEntry) dayEntry.count++;
    }
    return days.map(({ label, count }) => ({ label, count }));
  }, [notices]);

  // Tick every 5 days for the line chart
  const lineTicks = useMemo(
    () =>
      lineData
        .filter((_, i) => i % 5 === 0 || i === lineData.length - 1)
        .map((d) => d.label),
    [lineData],
  );

  const totalNotices = notices.length;
  const activeCategories = pieData.length;

  return (
    <div className="p-6 space-y-6 animate-fade-in" data-ocid="analytics.page">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1"
      >
        <h1 className="font-display font-bold text-2xl text-foreground">
          Analytics Overview
        </h1>
        <p className="text-muted-foreground text-sm">
          Visual breakdown of campus notices and activity
        </p>
      </motion.div>

      {/* Stat chips */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="flex flex-wrap gap-3"
      >
        <div className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-2 shadow-card">
          <BarChart2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {loading ? "…" : totalNotices} Total Notices
          </span>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-2 shadow-card">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            {loading ? "…" : activeCategories} Active Categories
          </span>
        </div>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pie Chart Card */}
        <motion.div
          data-ocid="analytics.pie_chart.card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
        >
          {/* Gradient header */}
          <div className="gradient-primary p-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary-foreground/90" />
              <div>
                <h2 className="font-display font-semibold text-primary-foreground text-sm">
                  Notice Distribution by Category
                </h2>
                <p className="text-primary-foreground/70 text-xs mt-0.5">
                  Breakdown of all posted notices
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="space-y-3 w-full">
                  <Skeleton className="h-40 w-40 rounded-full mx-auto" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
              </div>
            ) : pieData.length === 0 ? (
              <div
                data-ocid="analytics.pie_chart.empty_state"
                className="flex flex-col items-center justify-center h-64 text-muted-foreground"
              >
                <BarChart2 className="h-10 w-10 mb-2 opacity-40" />
                <p className="text-sm">No data available yet</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={100}
                    animationDuration={700}
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={`cell-${entry.category}`}
                        fill={pieColors[entry.category as Category]}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs text-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}

            {/* Category summary row */}
            {!loading && pieData.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-border">
                {pieData.map((d) => (
                  <div
                    key={d.category}
                    className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg bg-muted/50"
                  >
                    <span className="text-muted-foreground">{d.name}</span>
                    <span className="font-semibold text-foreground">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Line Chart Card */}
        <motion.div
          data-ocid="analytics.line_chart.card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="bg-card border border-border rounded-xl overflow-hidden shadow-card"
        >
          {/* Gradient header */}
          <div className="gradient-primary p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-foreground/90" />
              <div>
                <h2 className="font-display font-semibold text-primary-foreground text-sm">
                  Notices Posted Over Time
                </h2>
                <p className="text-primary-foreground/70 text-xs mt-0.5">
                  Daily activity for the last 30 days
                </p>
              </div>
            </div>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="space-y-3 h-64 pt-4">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={lineData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(var(--border))"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="label"
                    ticks={lineTicks}
                    tick={{
                      fontSize: 10,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 10,
                      fill: "oklch(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<LineTooltip />} />
                  <Legend
                    formatter={() => (
                      <span className="text-xs text-foreground">
                        Notices Posted
                      </span>
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Notices Posted"
                    stroke="oklch(var(--primary))"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "oklch(var(--primary))",
                      stroke: "oklch(var(--card))",
                      strokeWidth: 2,
                    }}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
