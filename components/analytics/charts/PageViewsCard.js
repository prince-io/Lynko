"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PERIODS = ["1h", "1d", "7d", "30d"];

function toIST(dateStr, period) {
  const d = new Date(dateStr);
  if (period === "7d" || period === "30d") {
    return d.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
    });
  }
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function PageViewsCard() {
  const [period, setPeriod] = useState("1d");
  const [views, setViews] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const [overviewRes, timelineRes] = await Promise.all([
        fetch("/api/analytics/overview?period=all"),
        fetch(`/api/analytics/timeline?period=${period}`),
      ]);

      if (!overviewRes.ok) throw new Error("Failed");
      const overviewData = await overviewRes.json();
      setViews(overviewData.totalPageViews);

      if (timelineRes.ok) {
        const tlData = await timelineRes.json();
        setTimeline(tlData.data || []);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="bg-base-100 rounded-xl p-4 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-base md:text-2xl">Page Views</h1>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`btn btn-xs md:btn-sm ${period === p ? "btn-primary" : "btn-outline btn-primary"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div>
          <div className="h-12 w-24 bg-base-300 rounded animate-pulse mb-4" />
          <div className="h-28 bg-base-300 rounded animate-pulse" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm text-base-content/40">Failed to load</p>
          <button onClick={fetchData} className="btn btn-xs btn-ghost">
            Retry
          </button>
        </div>
      ) : (
        <>
          <p className="text-4xl md:text-5xl font-bold">{views ?? 0}</p>

          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={timeline}>
              <XAxis
                dataKey="date"
                tickFormatter={(v) => toIST(v, period)}
                tick={{ fontSize: 10, fill: "currentColor" }}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
                minTickGap={60}
              />
              <Tooltip
                content={(props) => {
                  if (!props.active || !props.payload?.length) return null;
                  const { label, payload } = props;
                  const d = new Date(label);
                  const formatted = d.toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                  return (
                    <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-3 text-sm">
                      <p className="font-semibold">{formatted}</p>
                      <p className="text-base-content/70">
                        {payload[0].value} view
                        {payload[0].value !== 1 ? "s" : ""}
                      </p>
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
