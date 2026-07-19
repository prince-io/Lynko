"use client";

import { SIZE } from "@/lib/designOptions";

export default function TextScaleSlider({ size, onChange }) {
  const sizeIndex = SIZE.findIndex(
    (s) => JSON.stringify(s.text) === JSON.stringify(size),
  );

  const handleChange = (e) => {
    const index = Number(e.target.value);
    const sizeObj = SIZE[index];
    if (!sizeObj) return;
    onChange(sizeObj.text);
  };

  // Helper: get percentage for each index
  const getLeft = (i) => {
    if (SIZE.length <= 1) return 50;
    const span = 93;
    const offset = (100 - span) / 2;
    return offset + (i / (SIZE.length - 1)) * span;
  };

  return (
    <div className="bg-base-100 rounded-xl p-4 md:flex-1">
      <legend className="fieldset-legend md:text-lg mb-1">Text Scale</legend>

      {/* Slider */}
      <input
        type="range"
        min={0}
        max={SIZE.length - 1}
        step={1}
        value={sizeIndex}
        onChange={handleChange}
        className="range range-sm md:range-md range-secondary w-full"
      />

      {/* Pipes row */}
      <div className="relative w-full h-4 mt-2">
        {SIZE.map((_, i) => (
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
        {SIZE.map(({ label, text }, i) => (
          <span
            key={label}
            className={`absolute text-xs ${
              JSON.stringify(size) === JSON.stringify(text) ? "font-bold text-base-content" : "opacity-80"
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
