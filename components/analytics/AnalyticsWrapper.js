"use client";

import { useState, useEffect } from "react";
import PageViewsCard from "./charts/PageViewsCard";
import ClickDistribution from "./charts/ClickDistribution";
import LinkMiniChart from "./charts/LinkMiniChart";

export default function AnalyticsWrapper() {
  const [links, setLinks] = useState([]);
  const [linksLoading, setLinksLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await fetch("/api/links");
        if (res.ok) {
          const data = await res.json();
          setLinks(data);
        }
      } catch {
        // silently fail
      } finally {
        setLinksLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="flex-1">
          <PageViewsCard />
        </div>
        <div className="flex-1">
          <ClickDistribution />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {linksLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-base-100 rounded-xl p-4 animate-pulse">
                <div className="h-5 w-32 bg-base-300 rounded mb-3" />
                <div className="h-44 bg-base-300 rounded" />
              </div>
            ))
          : links.map((link) => (
              <LinkMiniChart
                key={link._id}
                linkId={link._id}
                title={link.title}
              />
            ))}
      </div>
    </div>
  );
}
