"use client";

import { useState, useEffect } from "react";
import LivePreview from "./LivePreview";
import LynkoLinkCard from "./LynkoLinkCard";
import OverviewCards from "./OverviewCards";
import QuickActions from "./QuickActions";
import { generateUUID } from "@/lib/uuid";

const HomeTab = ({ user, setUser, setActiveTab }) => {
  const [lynko, setLynko] = useState(
    `${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`,
  );
  const [links, setLinks] = useState([]);
  const [design, setDesign] = useState({
    theme: "lemonade",
    font: "inter",
    size: 2,
    radius: 2,
    border: "none",
    avatar: "rounded-xl",
    background: "bg-primary",
    buttonStyle: "btn btn-accent",
    buttonRadius: "rounded",
  });

  const [overview, setOverview] = useState(null);

  const [display, setDisplay] = useState(false);
  const [mssg, setMssg] = useState({});
  const [toast, setToast] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/links");
      const data = await res.json();

      const linksArray = data.map((link) => ({
        ...link,
        clientId: generateUUID(),
      }));

      setLinks(linksArray);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/designs");
      const data = await res.json();
      setDesign(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/analytics/overview?period=all");
      if (res.ok) {
        const data = await res.json();
        setOverview(data);
      }
    })();
  }, []);

  useEffect(() => {
    if (!toast) return;

    (() => {
      setDisplay(true);

      const timer = setTimeout(() => {
        setDisplay(false);
        setToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    })();
  }, [toast]);

  const handleCopy = async () => {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(lynko);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = lynko;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setMssg({
      text: "Your Lynko link is ready to share.",
      type: "alert-success",
    });
    setToast(true);
  };

  return (
    <div>
      {display && (
        <div className="toast toast-end z-3">
          <div className={`alert md:text-lg ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">Your Lynko Space</h1>
      </div>

      <div className="divider divider-primary"></div>

      <div className="flex flex-col md:flex-row gap-6 min-h-screen">
        <div className="flex flex-col gap-4 md:gap-6 flex-1">
          <LynkoLinkCard user={user} lynko={lynko} handleCopy={handleCopy} />
          <OverviewCards overview={overview} />
          <QuickActions setActiveTab={setActiveTab} />
        </div>

        <div className="hidden md:block flex-1">
          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-base md:text-2xl mb-6">Live Preview</h1>

            <div className="flex justify-center">
              <LivePreview user={user} links={links} design={design} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
