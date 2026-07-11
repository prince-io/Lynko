"use client";

import { AVATAR } from "@/lib/designOptions";

export default function AvatarShapeRadio({ avatar, onChange }) {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <div className="space-y-6">
        <div className="space-y-3">
          <legend className="fieldset-legend text-lg">Avatar Shape</legend>
          <div className="flex flex-wrap gap-5 w-[90%]">
            {AVATAR.map(({ label, value }) => (
              <label
                key={value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="avatar-style"
                  className="radio radio-secondary"
                  checked={avatar === value}
                  onChange={() => onChange(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
