"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Share, LogoMono } from "@/components/icons";
import LynkoLinkTracker from "../analytics/LynkoLinkTracker";

const LynkoPage = ({ user, links, design, userId }) => {
  const [lynko, setLynko] = useState(
    `${process.env.NEXT_PUBLIC_APP_URL}/${user.username}`,
  );

  const [display, setDisplay] = useState(false);
  const [mssg, setMssg] = useState({});
  const [toast, setToast] = useState(false);

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
      text: "Lynko link copied — share this profile.",
      type: "alert-success",
    });
    setToast(true);
  };

  return (
    <div>
      {display && (
        <div className="toast toast-end">
          <div className={`alert md:text-lg ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div
        data-theme={design.theme}
        style={{ fontFamily: `var(--font-${design.font})` }}
        className={`w-full min-h-screen flex justify-center items-center bg-base-300 ${design.size[3]} text-primary-content`}
      >
        <div
          className={`w-[90%] lg:w-[50%] h-fit ${design.background} ${design.radius} ${design.border} flex flex-col justify-center items-center gap-4 p-8 md:p-12 my-8 md:my-16`}
        >
          <div className="w-full flex justify-between items-center">
            <h1 className={`${design.size[0]} flex items-center ml-2`}>
              <LogoMono
                w={56}
                h={56}
                className="w-6 h-6 md:w-8 md:h-8 fill-neutral stroke-neutral"
              />
              <span className="text-neutral font-bold rounded-full m-2">
                LynkO
              </span>
            </h1>

            <button
              className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-sm md:btn-md mr-4 md:m-0 btn-neutral transition-transform duration-200 hover:scale-105`}
              onClick={handleCopy}
            >
              <Share className="w-[1.2em] h-[1.2em] md:w-[1.6em] md:h-[1.6em] fill-current" />
            </button>
          </div>

          <div className="avatar w-24 md:w-32">
            <div className={`w-24 md:w-32 ${design.avatar} relative`}>
              <Image
                src={user?.profilePic || "/default.jpg"}
                alt="Profile avatar"
                fill
                sizes="(max-width: 768px) 96px, 128px"
                className={`w-24 md:w-32 object-cover ${design.avatar}`}
              />
            </div>
          </div>

          <div className={`${design.size[0]}`}>@{user.username}</div>

          <p>{user.bio}</p>

          <span className={`${design.size[1]} mt-3 md:mt-6`}>My Links</span>

          <div className="flex flex-col gap-4 md:gap-5 w-full">
            {links.map((link, index) => (
              <LynkoLinkTracker
                href={link.url || "#"}
                userId={userId}
                linkId={link._id}
                title={link.title}
                key={index}
                className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} text-accent-content border-4 transition-transform duration-200 hover:scale-105`}
              >
                {link.title || "Untitled"}
              </LynkoLinkTracker>
            ))}
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-neutral mt-8 md:mt-12 transition-transform duration-200 hover:scale-105`}
          >
            Get your own Lynko
          </a>
        </div>
      </div>
    </div>
  );
};

export default LynkoPage;
