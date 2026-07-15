"use client";

import { THEMES } from "@/lib/designOptions";

export default function ThemeDropdown({ theme, onChange }) {
  return (
    <div className="flex gap-4 items-center bg-base-100 rounded-xl p-4 md:flex-1">
      <legend className="fieldset-legend md:text-lg">Appearance Theme</legend>

      <div className="dropdown dropdown-end md:dropdown-start">
        <div tabIndex={0} role="button" className="btn btn-secondary m-1">
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow h-60 overflow-y-auto flex-row"
        >
          {THEMES.map((t) => (
            <li
              key={t}
              onClick={() => onChange(t)}
              className={
                theme === t
                  ? "bg-secondary text-secondary-content rounded w-full"
                  : "w-full"
              }
            >
              <a>{t.charAt(0).toUpperCase() + t.slice(1)}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
