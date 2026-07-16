"use client";

import Image from "next/image";
import { CopyLink, ExternalLink } from "@/components/icons";

const LynkoLinkCard = ({ user, lynko, handleCopy }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <h1 className="text-base md:text-2xl mb-6">Lynko Link</h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-12 md:pb-4">
        <div className="avatar">
          <div className="w-28 md:w-32 rounded-full relative">
            <Image
              src={user?.profilePic || "/default.jpg"}
              alt="Profile avatar"
              fill
              sizes="(max-width: 768px) 112px, 128px"
              loading="eager"
              className="rounded-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 md:w-[70%]">
          <a
            href={lynko}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover text-base md:text-2xl break-all font-semibold text-center md:text-left"
          >
            {lynko}
          </a>

          <p className="text-sm md:text-base text-center md:text-left">
            Grab your link and start sharing your Lynko page everywhere.
          </p>

          <div className="flex justify-center md:justify-start gap-3 md:gap-6">
            <button
              className="btn btn-sm md:btn-md btn-secondary"
              onClick={handleCopy}
            >
              <CopyLink w={24} h={24} className="w-6 h-6 stroke-current" />

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
  );
};

export default LynkoLinkCard;
