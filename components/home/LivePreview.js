"use client";

import Image from "next/image";
import { Share, LogoMono } from "@/components/icons";

const LivePreview = ({ user, links, design }) => {
  return (
    <div className="mockup-phone md:w-112.5 md:max-h-225">
      <div className="mockup-phone-camera"></div>
      <div
        data-theme={design.theme}
        className="mockup-phone-display overflow-y-scroll no-scrollbar bg-base-300"
      >
        <div
          data-theme={design.theme}
          style={{ fontFamily: `var(--font-${design.font})` }}
          className={`bg-base-300 rounded-xl ${design.size[3]} text-primary-content`}
        >
          <div
            className={`w-full h-fit ${design.background} ${design.radius} ${design.border} flex flex-col justify-center items-center gap-4 p-6 md:p-12`}
          >
            <div className="w-full flex justify-between items-center mt-4 md:m-0">
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
                className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-xs md:btn-md btn-neutral transition-transform duration-200 hover:scale-105`}
              >
                <Share className="w-[1.2em] h-[1.2em] md:w-[1.6em] md:h-[1.6em] fill-current" />
              </button>
            </div>

            <div className="avatar w-20 md:w-32">
              <div className={`w-20 md:w-32 ${design.avatar}`}>
                <Image
                  src={user?.profilePic || "/default.jpg"}
                  alt="Profile avatar"
                  fill
                  className={`w-20 md:w-32 object-cover ${design.avatar}`}
                />
              </div>
            </div>

            <div className={`${design.size[0]}`}>@{user.username}</div>

            <p>{user.bio}</p>

            <span className={`${design.size[1]} mt-3 md:mt-6`}>My Links</span>

            <div className="flex flex-col gap-4 md:gap-5 w-full">
              {links.map((link, index) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  key={index}
                  className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} text-accent-content border-4 transition-transform duration-200 hover:scale-105`}
                >
                  {link.title || "Untitled"}
                </a>
              ))}
            </div>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-neutral mt-8 md:mt-12 transition-transform duration-200 hover:scale-105`}
            >
              Get your own Lynko
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
