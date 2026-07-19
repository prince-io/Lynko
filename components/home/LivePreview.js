"use client";

import Image from "next/image";
import { Share, LogoMono } from "@/components/icons";
import MarqueeText from "@/components/shared/MarqueeText";

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
              <h1 className="text-xl md:text-2xl flex items-center ml-2">
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
                className={`${design.buttonStyle} ${design.buttonRadius} btn-sm md:btn-md btn-neutral transition-transform duration-200 hover:scale-105`}
                title="Share profile"
              >
                <Share className="w-[1.6em] h-[1.6em] fill-current" />
              </button>
            </div>

            <div className="avatar w-20 md:w-32">
              <div className={`w-20 md:w-32 ${design.avatar} relative`}>
                <Image
                  src={user?.profilePic || "/default.jpg"}
                  alt="Profile avatar"
                  fill
                  sizes="(max-width: 768px) 80px, 128px"
                  className={`w-20 md:w-32 object-cover ${design.avatar}`}
                />
              </div>
            </div>

            <div className={`${design.size[0]}`}>@{user.username}</div>

            <p className="text-center leading-relaxed opacity-80">{user.bio}</p>

            <div className={`divider divider-neutral ${design.size[1]}`}>My Links</div>

            <div className="flex flex-col gap-4 md:gap-5 w-full">
              {links.map((link, index) => (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  key={link._id}
                  className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} text-accent-content border-4 min-w-0 transition-transform duration-200 hover:scale-105`}
                >
                  <MarqueeText>{link.title || "Untitled"}</MarqueeText>
                </a>
              ))}
            </div>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${design.buttonStyle} ${design.buttonRadius} btn btn-neutral md:text-lg mt-8 md:mt-12 transition-transform duration-200 hover:scale-105`}
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
