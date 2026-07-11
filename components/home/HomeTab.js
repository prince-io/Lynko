"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import LivePreview from "./LivePreview";
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M6 15h-.6C4.07 15 3 13.93 3 12.6V5.4C3 4.07 4.07 3 5.4 3h7.2C13.93 3 15 4.07 15 5.4V6m-3.6 3h7.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-7.2A2.4 2.4 0 0 1 9 18.6v-7.2A2.4 2.4 0 0 1 11.4 9"
                      ></path>
                    </svg>

                    <p>Copy Link</p>
                  </button>
                  <a
                    href={lynko}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-hover"
                  >
                    <button className="btn btn-sm md:btn-md btn-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4m-8-2l8-8m0 0v5m0-5h-5"
                        />
                      </svg>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    className="w-12 h-12"
                  >
                    <path
                      fill="currentColor"
                      d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
                    />
                    <path
                      fill="currentColor"
                      d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                    />
                  </svg>
                  <h2 className="text-2xl">Card Title</h2>
                  <p>Views</p>
                </div>
              </div>

              <div className="card card-border border-2 flex-1">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="w-12 h-12"
                  >
                    <path
                      fill="currentColor"
                      d="M10.293 10.293a1 1 0 0 1 1.11-.208l10 4.4a1.001 1.001 0 0 1-.15 1.882l-3.87 1.015l-1.016 3.872a1 1 0 0 1-1.882.148l-4.4-10a1 1 0 0 1 .208-1.109m-3.948 5.946a1 1 0 1 1 1.414 1.414l-2.121 2.121a1 1 0 0 1-1.414-1.414zm-1.34-5.244a1 1 0 1 1 0 2h-3a1 1 0 0 1 0-2zm-.781-6.77a1 1 0 0 1 1.414 0l2.121 2.122A1 1 0 0 1 6.345 7.76L4.224 5.64a1 1 0 0 1 0-1.414m14.142-.006a1 1 0 1 1 1.413 1.414l-2.12 2.12a1 1 0 0 1-1.415-1.413zM11 5V2a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0"
                    />
                  </svg>
                  <h2 className="text-2xl">Card Title</h2>
                  <p>Link Clicks</p>
                </div>
              </div>

              <div className="card card-border border-2 flex-1">
                <div className="card-body">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="w-12 h-12"
                  >
                    <path
                      fill="currentColor"
                      d="M21.92 6.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 6h-5a1 1 0 0 0 0 2h2.59L13 13.59l-3.29-3.3a1 1 0 0 0-1.42 0l-6 6a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 12.41l3.29 3.3a1 1 0 0 0 1.42 0L20 9.41V12a1 1 0 0 0 2 0V7a1 1 0 0 0-.08-.38"
                    />
                  </svg>
                  <h2 className="text-2xl">Card Title</h2>
                  <p>CTR</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-4">
            <h1 className="text-sm md:text-2xl mb-6">Quick Actions</h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-secondary text-secondary-content hover:scale-102 transition-transform duration-200">
                <div className="card-body">
                  <h2 className="text-2xl">Profile</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 flex-1"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path strokeDasharray="20" d="M3 12h17.5">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.3s"
                            values="20;0"
                          ></animate>
                        </path>
                        <path
                          strokeDasharray="12"
                          strokeDashoffset="12"
                          d="M21 12l-7 7M21 12l-7 -7"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.3s"
                            dur="0.2s"
                            to="0"
                          ></animate>
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content hover:scale-102 transition-transform duration-200">
                <div className="card-body">
                  <h2 className="text-2xl">Profile</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 flex-1"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path strokeDasharray="20" d="M3 12h17.5">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.3s"
                            values="20;0"
                          ></animate>
                        </path>
                        <path
                          strokeDasharray="12"
                          strokeDashoffset="12"
                          d="M21 12l-7 7M21 12l-7 -7"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.3s"
                            dur="0.2s"
                            to="0"
                          ></animate>
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content hover:scale-102 transition-transform duration-200">
                <div className="card-body">
                  <h2 className="text-2xl">Profile</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 flex-1"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path strokeDasharray="20" d="M3 12h17.5">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.3s"
                            values="20;0"
                          ></animate>
                        </path>
                        <path
                          strokeDasharray="12"
                          strokeDashoffset="12"
                          d="M21 12l-7 7M21 12l-7 -7"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.3s"
                            dur="0.2s"
                            to="0"
                          ></animate>
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="card bg-secondary text-secondary-content hover:scale-102 transition-transform duration-200">
                <div className="card-body">
                  <h2 className="text-2xl">Profile</h2>

                  <div className="flex justify-between">
                    <p className="flex-4">
                      A card component has a figure, a body part, and inside
                      body there are title and actions parts
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="w-10 h-10 flex-1"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path strokeDasharray="20" d="M3 12h17.5">
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            dur="0.3s"
                            values="20;0"
                          ></animate>
                        </path>
                        <path
                          strokeDasharray="12"
                          strokeDashoffset="12"
                          d="M21 12l-7 7M21 12l-7 -7"
                        >
                          <animate
                            fill="freeze"
                            attributeName="stroke-dashoffset"
                            begin="0.3s"
                            dur="0.2s"
                            to="0"
                          ></animate>
                        </path>
                      </g>
                    </svg>
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
