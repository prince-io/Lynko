"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LivePreview from "./LivePreview";
import { generateUUID } from "@/lib/uuid";
import {
  CopyLink,
  ExternalLink,
  Eye,
  Lightbulb,
  TrendUp,
  Arrow,
} from "@/components/icons";

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
    buttonStyle: "btn btn btn-accent",
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
          <div className={`alert text-lg ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">Your Lynko Space</h1>
      </div>

      <div className="divider divider-primary"></div>

      <div className="flex flex-col md:flex-row gap-6 min-h-screen">
        <div className="flex flex-col gap-6 flex-1">
          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-sm md:text-2xl mb-6">Lynko Link</h1>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12 pb-4">
              <div className="avatar">
                <div className="w-20 md:w-32 rounded-full relative">
                  <Image
                    src={user?.profilePic || "/default.jpg"}
                    alt="Profile avatar"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 md:w-[70%]">
                <h1
                  href={lynko}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover text-sm md:text-2xl break-all card-title"
                >
                  {lynko}
                </h1>

                <p>
                  Grab your link and start sharing your Lynko page everywhere.
                </p>

                <div className="flex justify-center md:justify-start gap-3 md:gap-6">
                  <button
                    className="btn btn-sm md:btn-md btn-secondary"
                    onClick={handleCopy}
                  >
                    <CopyLink
                      w={24}
                      h={24}
                      className="w-6 h-6 stroke-current"
                    />

                    <p>Copy Link</p>
                  </button>
                  <a
                    href={lynko}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                  >
                    <button className="btn btn-sm md:btn-md btn-secondary">
                      <ExternalLink
                        w={24}
                        h={24}
                        className="w-6 h-6 stroke-current"
                      />

                      <p>Open Link</p>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-sm md:text-2xl mb-6">Overview</h1>

            <div className="flex gap-4">
              <div className="card card-border border-2 flex-1">
                <div className="card-body">
                  <div className="flex items-center gap-2">
                    <Eye w={32} h={32} className="w-10 h-10 fill-current" />
                    <p className="text-lg font-medium">Page Views</p>
                  </div>
                  <h2 className="text-3xl">{overview?.totalPageViews ?? 0}</h2>
                </div>
              </div>

              <div className="card card-border border-2 flex-1">
                <div className="card-body">
                  <div className="flex items-center gap-2">
                    <Lightbulb
                      w={24}
                      h={24}
                      className="w-10 h-10 fill-current"
                    />
                    <p className="text-lg font-medium">Link Clicks</p>
                  </div>
                  <h2 className="text-3xl">{overview?.totalLinkClicks ?? 0}</h2>
                </div>
              </div>

              <div className="card card-border border-2 flex-1 min-w-0">
                <div className="card-body overflow-hidden">
                  <div className="flex items-center gap-2">
                    <TrendUp
                      w={24}
                      h={24}
                      className="w-10 h-10 fill-current shrink-0"
                    />
                    <p className="text-lg font-medium truncate">Top Link</p>
                  </div>
                  <h2
                    className="text-2xl font-medium truncate"
                    title={overview?.topLinks?.[0]?.title}
                  >
                    {overview?.topLinks?.[0]?.title ?? "—"}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-sm md:text-2xl mb-6">Quick Actions</h1>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
                onClick={() => setActiveTab("Profile")}
              >
                <div className="card-body">
                  <h2 className="text-2xl">Profile</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      Update your username, bio, and profile picture.
                    </p>
                    <Arrow
                      w={24}
                      h={24}
                      className="w-10 h-10 flex-1 fill-current"
                    />
                  </div>
                </div>
              </div>

              <div
                className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
                onClick={() => setActiveTab("Links")}
              >
                <div className="card-body">
                  <h2 className="text-2xl">Links</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      Add, edit, or reorder your link collection.
                    </p>
                    <Arrow
                      w={24}
                      h={24}
                      className="w-10 h-10 flex-1 fill-current"
                    />
                  </div>
                </div>
              </div>

              <div
                className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
                onClick={() => setActiveTab("Appearance")}
              >
                <div className="card-body">
                  <h2 className="text-2xl">Appearance</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      Customize your theme, fonts, buttons, and layout.
                    </p>
                    <Arrow
                      w={24}
                      h={24}
                      className="w-10 h-10 flex-1 fill-current"
                    />
                  </div>
                </div>
              </div>

              <div
                className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
                onClick={() => setActiveTab("Analytics")}
              >
                <div className="card-body">
                  <h2 className="text-2xl">Analytics</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      Track page views, link clicks, and top performers.
                    </p>
                    <Arrow
                      w={24}
                      h={24}
                      className="w-10 h-10 flex-1 fill-current"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-sm md:text-2xl mb-6">Live Preview</h1>

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
