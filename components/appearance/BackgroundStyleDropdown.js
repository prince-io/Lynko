"use client";

import { BG } from "@/lib/designOptions";
import { Arrow } from "@/components/icons";

export default function BackgroundStyleDropdown({ background, onChange }) {
  return (
    <div className="w-full md:w-1/2 flex gap-4 items-center bg-base-100 rounded-xl p-4">
      <legend className="fieldset-legend text-lg">Background Style</legend>
      <div className="dropdown dropdown-end md:dropdown-start">
        <div tabIndex={0} role="button" className="btn btn-secondary m-1">
          {Object.values(BG).find((v) => v.className === background)?.label}

          <Arrow
            w="1.2em"
            h="1.2em"
            className={`fill-current ${Object.values(BG).find((v) => v.className === background)?.arrow}`}
          />
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-2 shadow"
        >
          {Object.entries(BG).map(([key, { label, className, arrow }]) => (
            <li key={key} onClick={() => onChange(className)}>
              <a
                className={`flex items-center ${
                  background === className
                    ? "bg-secondary text-secondary-content"
                    : ""
                }`}
              >
                <span>{label}</span>

                <Arrow
                  w="1.2em"
                  h="1.2em"
                  className={`fill-current ${arrow}`}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
