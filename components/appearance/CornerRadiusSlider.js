"use client";

import { RADIUS } from "@/lib/designOptions";

export default function CornerRadiusSlider({ radius, onChange }) {
  const radiusIndex = RADIUS.findIndex((r) => r.className === radius);

  const handleChange = (e) => {
    const index = Number(e.target.value);
    const radiusObj = RADIUS[index];
    if (!radiusObj) return;
    onChange(radiusObj.className);
  };

  const getLeft = (i) => {
    if (RADIUS.length <= 1) return 50;
    return (i / (RADIUS.length - 1)) * 100;
  };

  return (
    <div className="bg-base-100 rounded-xl p-4 md:flex-1">
      <legend className="fieldset-legend md:text-lg mb-1">
        Card Corner Radius
      </legend>

      <input
        type="range"
        min={0}
        max={RADIUS.length - 1}
        step={1}
        value={radiusIndex}
        onChange={handleChange}
        className="range range-sm md:range-md range-secondary w-full"
      />

      {/* Pipes row */}
      <div className="relative w-full h-4 mt-2">
        {RADIUS.map((_, i) => (
          <span
            key={i}
            className="absolute text-xs"
            style={{
              left: `${getLeft(i)}%`,
              transform: "translateX(-50%)",
            }}
          >
            |
          </span>
        ))}
      </div>

      {/* Labels row */}
      <div className="relative w-full h-5 mt-1">
        {RADIUS.map(({ label, className }, i) => (
          <span
            key={label}
            className={`absolute text-xs ${
              radius === className
                ? "font-bold text-base-content"
                : "opacity-80"
            }`}
            style={{
              left: `${getLeft(i)}%`,
              transform: "translateX(-50%)",
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
