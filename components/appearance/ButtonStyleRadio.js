"use client";

import { BTN } from "@/lib/designOptions";

export default function ButtonStyleRadio({ buttonStyle, onChange }) {
  return (
    <div className="space-y-6 bg-base-100 rounded-xl p-4 md:flex-5">
      <div className="space-y-3">
        <legend className="fieldset-legend text-lg">Buttons Style</legend>

        <div className="flex flex-wrap gap-5 w-[90%]">
          {BTN.map(({ label, value }) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="button-style"
                className="radio radio-secondary"
                checked={buttonStyle === value}
                onChange={() => onChange(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
