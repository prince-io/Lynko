"use client";

import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import DashboardContent from "./DashboardContent";

export default function DashboardWrapper({ user }) {
  const [activeTab, setActiveTab] = useState("Home");
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard-container min-h-screen">
        <div className="flex-1 p-4">
          <DashboardContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            user={currentUser}
            setUser={setCurrentUser}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
