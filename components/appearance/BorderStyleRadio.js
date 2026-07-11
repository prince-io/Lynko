"use client";

import { BORDER } from "@/lib/designOptions";

export default function BorderStyleRadio({ border, onChange }) {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <legend className="fieldset-legend text-lg">Card Border Style</legend>

          <div className="flex flex-wrap gap-5 w-[90%]">
            {Object.entries(BORDER).map(([key, className]) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="card-border"
                  className="radio radio-secondary"
                  checked={border === className}
                  onChange={() => onChange(className)}
                />
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
