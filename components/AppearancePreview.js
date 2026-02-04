"use client";

import Image from "next/image";

const AppearancePreview = ({ user, links, design }) => {
  return (
    <div>
      <div
        data-theme={design.theme}
        style={{ fontFamily: `var(--font-${design.font})` }}
        className={`w-full h-full flex justify-center items-center bg-base-300 rounded-xl ${design.size[3]} text-primary-content`}
      >
        <div
          className={`w-[88%] md:w-[80%] h-fit ${design.background} ${design.radius} ${design.border} flex flex-col justify-center items-center gap-4 p-6 md:p-12 my-8 md:my-12`}
        >
          <div className="w-full flex justify-between items-center mt-4 md:m-0">
            <h1 className={`${design.size[0]} flex items-center ml-2`}>
              <Image
                src="/logo.svg"
                alt="App logo"
                width={56}
                height={56}
                className="w-6 h-6 md:w-8 md:h-8 fill-neutral"
              />
              <span className="text-neutral font-bold rounded-full m-2">
                LynkO
              </span>
            </h1>

            <button
              className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-xs md:btn-md btn-neutral transition-transform duration-200 hover:scale-110`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-[1.2em] h-[1.2em] md:w-[1.6em] md:h-[1.6em]"
              >
                <title xmlns="">share-rounded</title>
                <path
                  fill="currentColor"
                  d="M6 23q-.825 0-1.412-.587T4 21V10q0-.825.588-1.412T6 8h2q.425 0 .713.288T9 9t-.288.713T8 10H6v11h12V10h-2q-.425 0-.712-.288T15 9t.288-.712T16 8h2q.825 0 1.413.588T20 10v11q0 .825-.587 1.413T18 23zm5-18.175l-.9.9q-.3.3-.7.288T8.7 5.7q-.275-.3-.287-.7t.287-.7l2.6-2.6q.3-.3.7-.3t.7.3l2.6 2.6q.275.275.275.688T15.3 5.7q-.3.3-.712.3t-.713-.3L13 4.825V15q0 .425-.288.713T12 16t-.712-.288T11 15z"
                />
              </svg>
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
                className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} text-accent-content border-4 transition-transform duration-200 hover:scale-110`}
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
            className={`${design.buttonStyle} ${design.buttonRadius} ${design.size[3]} btn btn-neutral mt-8 md:mt-12 transition-transform duration-200 hover:scale-110`}
          >
            Get your own Lynko
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppearancePreview;
