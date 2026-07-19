"use client";

import { BG } from "@/lib/designOptions";
import { Arrow } from "@/components/icons";

export default function BackgroundStyleDropdown({ background, onChange }) {
  return (
    <div className="w-full md:w-1/2 flex justify-between gap-4 items-center bg-base-100 rounded-xl p-4">
      <legend className="fieldset-legend md:text-lg">Background</legend>
      <div className="dropdown dropdown-end md:dropdown-right">
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
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-2 shadow h-35 overflow-y-auto flex-row"
        >
          {Object.entries(BG).map(([key, { label, className, arrow }]) => (
            <li
              key={key}
              className="w-full"
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
