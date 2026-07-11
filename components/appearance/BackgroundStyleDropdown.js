"use client";

import { BG } from "@/lib/designOptions";

export default function BackgroundStyleDropdown({ background, onChange }) {
  return (
    <div className="w-full md:w-1/2 flex gap-4 items-center bg-base-100 rounded-xl p-4">
      <legend className="fieldset-legend text-lg">Background Style</legend>
      <div className="dropdown dropdown-end md:dropdown-start">
        <div tabIndex={0} role="button" className="btn btn-secondary m-1">
          {Object.values(BG).find((v) => v.className === background)?.label}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 15 15"
            className={
              Object.values(BG).find((v) => v.className === background)?.arrow
            }
            fill="currentColor"
          >
            <path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
          </svg>
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-2 shadow"
        >
          {Object.entries(BG).map(([key, { label, className, arrow }]) => (
            <li
              key={key}
              onClick={() => onChange(className)}
            >
              <a
                className={`flex items-center ${
                  background === className
                    ? "bg-secondary text-secondary-content"
                    : ""
                }`}
              >
                <span>{label}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 15 15"
                  className={`shrink-0 ${arrow}`}
                  fill="currentColor"
                >
                  <path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
