"use client";

import { BTNRAD } from "@/lib/designOptions";

export default function ButtonShapeRadio({ buttonRadius, onChange }) {
  return (
    <div className="space-y-6 bg-base-100 rounded-xl p-4 md:flex-3">
      <div className="space-y-3">
        <legend className="fieldset-legend text-lg">Buttons Shape</legend>

        <div className="flex flex-wrap gap-5 w-[90%]">
          {BTNRAD.map(({ label, value }) => (
            <label
              key={value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="button-shape"
                className="radio radio-secondary"
                checked={buttonRadius === value}
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
