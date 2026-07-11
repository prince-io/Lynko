"use client";

import { FONT } from "@/lib/designOptions";

export default function FontDropdown({ font, onChange }) {
  return (
    <div className="flex gap-4 items-center bg-base-100 rounded-xl p-4 md:flex-1">
      <legend className="fieldset-legend text-lg">Font Family</legend>

      <div className="dropdown dropdown-end md:dropdown-start">
        <div tabIndex={0} role="button" className="btn btn-secondary m-1">
          {font.charAt(0).toUpperCase() + font.slice(1)}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
        >
          {FONT.map(({ name, value }) => (
            <li
              key={value}
              onClick={() => onChange(value)}
              style={{ fontFamily: `var(--font-${value})` }}
              className={`${
                font === value
                  ? "bg-secondary text-secondary-content rounded"
                  : ""
              } hover:bg-secondary/20`}
            >
              <a>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
