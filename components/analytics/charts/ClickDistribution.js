"use client";

import { useState, useEffect, useCallback } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#14b8a6",
  "#8b5cf6",
  "#f97316",
];

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={700}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];

  // Calculate total from all payload items
  const total = payload[0].payload.total;
  const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-base-content/70">
        {value} click{value !== 1 ? "s" : ""} ({percentage}%)
      </p>
    </div>
  );
};

const CenterLabel = ({ total }) => (
  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
    <tspan x="50%" dy="-8" fontSize="28" fontWeight="bold" fill="currentColor">
      {total}
    </tspan>
    <tspan x="50%" dy="20" fontSize="12" fill="currentColor" opacity="0.6">
      clicks
    </tspan>
  </text>
);

export default function ClickDistribution() {
  const [links, setLinks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch("/api/analytics/distribution");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setLinks(data.links || []);
      setTotal(data.total || 0);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = links.map((link) => ({
    name: link.title || "Untitled",
    value: link.clicks,
    linkId: link.linkId,
    total: total, // Make sure total is passed here
  }));

  return (
    <div className="bg-base-100 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="text-sm md:text-2xl">Click Distribution</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 animate-pulse">
          <div className="w-48 h-48 bg-base-300 rounded-full" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 py-8">
          <p className="text-sm text-base-content/40">Failed to load</p>
          <button onClick={fetchData} className="btn btn-xs btn-ghost">
            Retry
          </button>
        </div>
      ) : total === 0 ? (
        <div className="flex items-center justify-center h-64 text-base-content/40">
          No clicks yet
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-2/3">
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                  label={renderLabel}
                  labelLine={false}
                  isAnimationActive={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.linkId}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <CenterLabel total={total} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-1/3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
            <div className="flex lg:flex-col flex-wrap gap-x-4 gap-y-2 justify-center text-base">
              {chartData.map((entry, index) => {
                const percentage = ((entry.value / total) * 100).toFixed(1);
                return (
                  <div
                    key={entry.linkId}
                    className="flex items-center gap-2 py-1"
                  >
                    <span
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate max-w-28">{entry.name}</span>
                    <span className="text-base-content/60 ml-auto">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
