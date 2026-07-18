"use client";

import { Eye, Lightbulb, TrendUp } from "@/components/icons";

const OverviewCards = ({ overview }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Overview</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card card-border border-2">
          <div className="card-body p-3 md:p-6">
            <div className="flex items-center gap-3">
              <Eye
                w={32}
                h={32}
                className="w-6 h-6 md:w-10 md:h-10 fill-current"
              />
              <p className="hidden md:block text-base md:text-lg font-medium">
                Page Views
              </p>
              <h2 className="md:hidden text-2xl">
                {overview?.totalPageViews ?? 0}
              </h2>
            </div>
            <p className="md:hidden text-base font-medium">Page Views</p>
            <h2 className="hidden md:block text-2xl md:text-3xl">
              {overview?.totalPageViews ?? 0}
            </h2>
          </div>
        </div>

        <div className="card card-border border-2">
          <div className="card-body p-3 md:p-6">
            <div className="flex items-center gap-3">
              <Lightbulb
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 fill-current"
              />
              <p className="hidden md:block text-base md:text-lg font-medium">
                Link Clicks
              </p>
              <h2 className="md:hidden text-2xl">
                {overview?.totalLinkClicks ?? 0}
              </h2>
            </div>
            <p className="md:hidden text-base font-medium">Link Clicks</p>
            <h2 className="hidden md:block text-2xl md:text-3xl">
              {overview?.totalLinkClicks ?? 0}
            </h2>
          </div>
        </div>

        <div className="card card-border border-2 col-span-2 md:col-span-1">
          <div className="card-body p-3 md:p-6 overflow-hidden">
            <div className="flex items-center gap-3">
              <TrendUp
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 fill-current shrink-0"
              />
              <p className="text-base md:text-lg font-medium truncate">
                Top Link
              </p>
            </div>
            <h2
              className="text-xl md:text-2xl font-medium truncate"
              title={overview?.topLinks?.[0]?.title}
            >
              {overview?.topLinks?.[0]?.title ?? "—"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewCards;
