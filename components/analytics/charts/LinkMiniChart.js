"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PERIODS = ["1h", "1d", "7d", "30d"];

function toIST(dateStr, granularity) {
  const d = new Date(dateStr);
  const options = { timeZone: "Asia/Kolkata" };
  if (granularity === "hour" || granularity === "minute") {
    return d.toLocaleString("en-IN", { ...options, hour: "2-digit", minute: "2-digit", hour12: false });
  }
  return d.toLocaleString("en-IN", { ...options, day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function LinkMiniChart({ linkId, title }) {
  const [period, setPeriod] = useState("1d");
  const [data, setData] = useState([]);
  const [granularity, setGranularity] = useState("hour");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `/api/analytics/timeline?period=${period}&linkId=${linkId}`,
      );
      if (!res.ok) throw new Error("Failed");
      const result = await res.json();
      setData(result.data || []);
      setGranularity(result.granularity || "hour");
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [period, linkId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasClicks = data.some((d) => d.clicks > 0);

  return (
    <div className="bg-base-100 rounded-xl p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-sm md:text-lg font-medium truncate">{title}</h1>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`btn btn-xs ${period === p ? "btn-primary" : "btn-outline btn-primary"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-44 bg-base-300 rounded" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-2 py-8">
          <p className="text-sm text-base-content/40">Failed to load</p>
          <button onClick={fetchData} className="btn btn-xs btn-ghost">
            Retry
          </button>
        </div>
      ) : !hasClicks ? (
        <div className="flex items-center justify-center h-44 text-base-content/40">
          No clicks
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(v) => toIST(v, granularity)}
              tick={{ fontSize: 10, fill: "currentColor" }}
                  interval="preserveStartEnd"
                  minTickGap={60}
                />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 10, fill: "currentColor" }}
              width={30}
            />
            <Tooltip
              labelFormatter={(v) => toIST(v, granularity)}
              content={(props) => {
                if (!props.active || !props.payload?.length) return null;
                const { label, payload } = props;
                return (
                  <div className="bg-base-100 border border-base-300 rounded-xl shadow-lg p-3 text-sm">
                    <p className="font-semibold">{label}</p>
                    <p className="text-base-content/70">
                      {payload[0].value} click
                      {payload[0].value !== 1 ? "s" : ""}
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="Clicks"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
