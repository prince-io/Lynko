"use client";

import AnalyticsWrapper from "./AnalyticsWrapper";

export default function AnalyticsTab() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">Watch The Numbers</h1>
      </div>

      <div className="divider divider-primary"></div>

      <AnalyticsWrapper />
    </>
  );
}
