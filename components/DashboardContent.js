"use client";

import { useState } from "react";
import Home from "./dashboard/Home";
import Profile from "./dashboard/Profile";
import Links from "./dashboard/Links";
import Appearance from "./dashboard/Appearance";

export default function DashboardContent({ User }) {
  const [user, setUser] = useState(User);
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="tabs tabs-box">
      <label className="tab tabs-sm md:tabs-md text-xs md:text-sm p-2 md:p-3">
        <input
          type="radio"
          name="my_tab"
          aria-label="Home"
          checked={activeTab === "Home"}
          onChange={() => setActiveTab("Home")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 md:size-5 me-1 md:me-2"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M5 12H3l9-9l9 9h-2M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
          </g>
        </svg>
        Home
      </label>

      <div className="tab-content bg-base-100 border-base-300 p-6">
        <Home user={user} setUser={setUser} setActiveTab={setActiveTab} />
      </div>

      <label className="tab tabs-sm md:tabs-md text-xs md:text-sm p-2 md:p-3">
        <input
          type="radio"
          name="my_tab"
          aria-label="Profile"
          checked={activeTab === "Profile"}
          onChange={() => setActiveTab("Profile")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 md:size-5 me-1 md:me-2"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
          />
        </svg>
        Profile
      </label>

      <div className="tab-content bg-base-100 border-base-300 p-6">
        <Profile user={user} setUser={setUser} setActiveTab={setActiveTab} />
      </div>

      <label className="tab tabs-sm md:tabs-md text-xs md:text-sm p-2 md:p-3">
        <input
          type="radio"
          name="my_tab"
          aria-label="Links"
          checked={activeTab === "Links"}
          onChange={() => setActiveTab("Links")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 md:size-5 me-1 md:me-2"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 15l6-6m-4-3l.463-.536a5 5 0 0 1 7.071 7.072L18 13m-5 5l-.397.534a5.07 5.07 0 0 1-7.127 0a4.97 4.97 0 0 1 0-7.071L6 11"
          />
        </svg>
        Links
      </label>

      <div className="tab-content bg-base-100 border-base-300 p-3 md:p-6">
        <Links user={user} setUser={setUser} setActiveTab={setActiveTab} />
      </div>

      <label className="tab tabs-sm md:tabs-md text-xs md:text-sm p-2 md:p-3">
        <input
          type="radio"
          name="my_tab"
          aria-label="Appearance"
          checked={activeTab === "Appearance"}
          onChange={() => setActiveTab("Appearance")}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4 md:size-5 me-1 md:me-2"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path d="M12 21a9 9 0 0 1 0-18c4.97 0 9 3.582 9 8c0 1.06-.474 2.078-1.318 2.828S17.693 15 16.5 15H14a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 12 21" />
            <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m4-3a1 1 0 1 0 2 0a1 1 0 1 0-2 0m4 3a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
          </g>
        </svg>
        Appearance
      </label>

      <div className="tab-content bg-base-100 border-base-300 p-6">
        <Appearance user={user} setUser={setUser} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
