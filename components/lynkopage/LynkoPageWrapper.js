"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LynkoPage from "./LynkoPage";

export default function LynkoPageWrapper() {
  const { username } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchPublicPage() {
      const res = await fetch(`/api/public/${username}`);

      if (res.status === 404) {
        router.replace("/404");
        return;
      }

      const result = await res.json();
      setData(result);
      setLoading(false);
    }

    fetchPublicPage();
  }, [username, router]);

  useEffect(() => {
    if (!data?.user?.clerkUserId) return;

    const metadata = {
      referrer: document.referrer || "",
      device:
        window.innerWidth < 768
          ? "mobile"
          : window.innerWidth < 1024
            ? "tablet"
            : "desktop",
    };

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType: "page_view",
        userId: data.user.clerkUserId,
        metadata,
      }),
    }).catch(() => {});
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg opacity-70">
        Loading…
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen">
      <LynkoPage
        user={data.user}
        links={data.links}
        design={data.design}
        userId={data.user.clerkUserId}
      />
    </div>
  );
}
