"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Preview from "@/components/Preview";

export default function PublicPage() {
  const { username } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchPublicData() {
      const res = await fetch(`/api/public/${username}`);

      if (res.status === 404) {
        router.replace("/404");
        return;
      }

      const result = await res.json();
      setData(result);
      setLoading(false);
    }

    fetchPublicData();
  }, [username, router]);

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
      <Preview user={data.user} links={data.links} design={data.design} />
    </div>
  );
}
