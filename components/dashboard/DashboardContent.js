"use client";

import HomeTab from "../home/HomeTab";
import ProfileTab from "../profile/ProfileTab";
import LinksTab from "../links/LinksTab";
import AppearanceTab from "../appearance/AppearanceTab";
import AnalyticsTab from "../analytics/AnalyticsTab";

const VALID_TABS = ["Home", "Profile", "Links", "Appearance", "Analytics"];

export default function DashboardContent({
  activeTab,
  setActiveTab,
  user,
  setUser,
}) {
  return (
    <div className="relative rounded-3xl p-6">
      <div className="absolute inset-0 bg-base-300 opacity-65 rounded-3xl"></div>
      <div className="relative z-10">
        {activeTab === "Home" && (
          <HomeTab user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}
        {activeTab === "Profile" && (
          <ProfileTab user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}
        {activeTab === "Links" && (
          <LinksTab user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}
        {activeTab === "Appearance" && (
          <AppearanceTab
            user={user}
            setUser={setUser}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "Analytics" && <AnalyticsTab />}
        {!VALID_TABS.includes(activeTab) && (
          <p className="text-center text-gray-500">
            Select a tab from the menu
          </p>
        )}
      </div>
    </div>
  );
}
