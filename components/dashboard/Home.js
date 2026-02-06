"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AppearancePreview from "../AppearancePreview";
import { generateUUID } from "@/lib/uuid";

const Home = ({ user, setUser, setActiveTab }) => {
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
          <div className={`alert ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">Your Lynko Space</h1>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col justify-start items-center gap-6 md:gap-12">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12 md:w-[70%] bg-base-200 p-4 rounded-xl">
          <div className="avatar">
            <div className="w-20 md:w-28 rounded-full relative">
              <Image
                src={user?.profilePic || "/default.jpg"}
                alt="Profile avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-6 md:w-[70%]">
            <h1
              href={lynko}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover text-sm md:text-2xl break-all"
            >
              {lynko}
            </h1>

            <div className="flex justify-center md:justify-start gap-3 md:gap-6">
              <button
                className="btn btn-sm md:btn-md btn-secondary"
                onClick={handleCopy}
              >
                Copy Link
              </button>
              <a
                href={lynko}
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover"
              >
                <button className="btn btn-sm md:btn-md btn-secondary">
                  View Live
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:w-[85%]">
          <div className="hidden md:block">
            <h1 className="text-lg md:text-2xl mb-4">Your Lynko</h1>
            <div className="mockup-phone md:w-112.5 md:max-h-225">
              <div className="mockup-phone-camera"></div>
              <div
                data-theme={design.theme}
                className="mockup-phone-display overflow-y-scroll no-scrollbar bg-base-300"
              >
                <AppearancePreview user={user} links={links} design={design} />
              </div>
            </div>
          </div>

          <div className="divider md:divider-horizontal md:px-12 hidden md:flex"></div>

          <div>
            <h1 className="text-lg md:text-2xl mb-4">Quick Actions</h1>
            <div className="flex flex-col gap-4 md:gap-6">
              <button
                className="btn btn-primary"
                onClick={() => setActiveTab("Profile")}
              >
                Edit profile
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setActiveTab("Links")}
              >
                Add links
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setActiveTab("Appearance")}
              >
                Customize Appearance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
