"use client";

import { useRef, useEffect, useCallback } from "react";

const MarqueeText = ({ children }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;
    const diff = text.scrollWidth - container.clientWidth;
    const overflows = diff > 0;
    container.classList.toggle("text-center", !overflows);
    container.classList.toggle("text-left", overflows);
  }, [children]);

  const getDist = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return 0;
    const diff = text.scrollWidth - container.clientWidth;
    return diff > 0 ? diff : 0;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = textRef.current;
    const dist = getDist();
    if (!el || dist === 0) return;

    clearTimeout(timerRef.current);

    el.style.transition = "none";
    el.style.transform = "translateX(0)";
    el.offsetHeight;

    el.style.transition = "transform 1.5s ease-in-out";
    el.style.transform = `translateX(-${dist}px)`;

    timerRef.current = setTimeout(() => {
      if (!el) return;
      el.style.transition = "transform 1.5s ease-in-out";
      el.style.transform = "translateX(0)";
    }, 3500);
  }, [getDist]);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timerRef.current);
    const el = textRef.current;
    if (!el) return;
    el.style.transition = "transform 0.3s ease-out";
    el.style.transform = "translateX(0)";
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap w-full min-w-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap"
        style={{ transform: "translateX(0)" }}
      >
        {children}
      </span>
    </div>
  );
};

export default MarqueeText;
