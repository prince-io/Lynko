"use client";

import { useState, useEffect } from "react";
import AppearancePreview from "../AppearancePreview";
import {
  THEMES,
  FONT,
  SIZE,
  RADIUS,
  BORDER,
  AVATAR,
  BG,
  BTN,
  BTNRAD,
} from "@/lib/designOptions";
import { generateUUID } from "@/lib/uuid";

const Appearance = ({ user, setUser }) => {
  const [links, setLinks] = useState([]);
  const [design, setDesign] = useState({
    theme: "lemonade",
    font: "inter",
    size: 2,
    radius: 2,
    border: "none",
    avatar: "rounded-xl",
    background: "bg-primary",
    buttonStyle: "btn btn btn-accent",
    buttonRadius: "rounded",
  });
  const [initialDesign, setInitialDesign] = useState({});

  const [isSaving, setIsSaving] = useState(false);
  const [display, setDisplay] = useState(false);
  const [mssg, setMssg] = useState({});
  const [toast, setToast] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/links");
      const data = await res.json();

      const linksArray = data.map((link) => ({
        ...link,
        clientId: generateUUID(),
      }));

      setLinks(linksArray);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/designs");
      const data = await res.json();
      setDesign(data);
      setInitialDesign(data);
    })();
  }, []);

  useEffect(() => {
    if (!toast) return;

    (() => {
      setDisplay(true);

      const timer = setTimeout(() => {
        setDisplay(false);
        setToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    })();
  }, [toast]);

  const sizeIndex = SIZE.findIndex(
    (s) => JSON.stringify(s.text) === JSON.stringify(design.size),
  );

  const handleSize = (e) => {
    const index = Number(e.target.value);
    const sizeObj = SIZE[index];

    if (!sizeObj) return;

    setDesign((prev) => ({
      ...prev,
      size: sizeObj.text,
    }));
  };

  const radiusIndex = RADIUS.findIndex((r) => r.className === design.radius);

  const handleRadius = (e) => {
    const index = Number(e.target.value);
    const radiusObj = RADIUS[index];

    if (!radiusObj) return;

    setDesign((prev) => ({
      ...prev,
      radius: radiusObj.className,
    }));
  };

  async function saveDesign() {
    if (!design) return;

    if (isSaving) return;
    setIsSaving(true);

    const res = await fetch("/api/designs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(design),
    });

    if (res.ok) {
      setInitialDesign(design);
      setIsSaving(false);
      setMssg({
        text: "Appearance settings updated successfully.",
        type: "alert-success",
      });
      setToast(true);
    }
  }

  function resetDesign() {
    setDesign(initialDesign);
    setMssg({
      text: "Appearance settings have been reset.",
      type: "alert-info",
    });
    setToast(true);
  }

  return (
    <div>
      {display && (
        <div className="toast toast-end z-3">
          <div className={`alert ${mssg.type}`}>
            <span>{mssg.text}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">Make It Pop</h1>

        <div className="flex gap-3 md:gap-4">
          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={resetDesign}
          >
            Reset
          </button>
          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={saveDesign}
            disabled={isSaving || design === initialDesign}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col-reverse md:flex-row items-center md:items-start">
        <div className="flex-2 flex flex-col">
          <div className="flex gap-4 items-center">
            <legend className="fieldset-legend text-lg">
              Appearance Theme
            </legend>

            <div className="dropdown dropdown-end md:dropdown-start">
              <div tabIndex={0} role="button" className="btn m-1">
                {design.theme.charAt(0).toUpperCase() + design.theme.slice(1)}
              </div>

              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow h-80 overflow-y-auto flex-row"
              >
                {THEMES.map((t) => (
                  <li
                    key={t}
                    onClick={() =>
                      setDesign((prev) => ({
                        ...prev,
                        theme: t,
                      }))
                    }
                    className={
                      design.theme === t
                        ? "bg-primary text-primary-content rounded w-full"
                        : "w-full"
                    }
                  >
                    <a>{t.charAt(0).toUpperCase() + t.slice(1)}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex gap-4 items-center">
            <legend className="fieldset-legend text-lg">Font Family</legend>

            <div className="dropdown dropdown-end md:dropdown-start">
              <div tabIndex={0} role="button" className="btn m-1">
                {design.font.charAt(0).toUpperCase() + design.font.slice(1)}
              </div>

              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
              >
                {FONT.map(({ name, value }) => (
                  <li
                    key={value}
                    onClick={() =>
                      setDesign((prev) => ({
                        ...prev,
                        font: value,
                      }))
                    }
                    style={{ fontFamily: `var(--font-${value})` }}
                    className={`${
                      design.font === value
                        ? "bg-primary text-primary-content rounded"
                        : ""
                    } hover:bg-primary/20`}
                  >
                    <a>{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider"></div>

          <div className="w-full max-w-xs">
            <legend className="fieldset-legend text-lg mb-1">Text Scale</legend>

            <input
              type="range"
              min={0}
              max={SIZE.length - 1}
              step={1}
              value={sizeIndex}
              onChange={handleSize}
              className="range range-primary"
            />

            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {SIZE.map((_, i) => (
                <span key={i}>|</span>
              ))}
            </div>

            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {SIZE.map(({ label, text }) => (
                <span
                  key={label}
                  className={
                    design.size === text
                      ? "font-bold text-primary"
                      : "opacity-60"
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          <div className="w-full max-w-xs">
            <legend className="fieldset-legend text-lg mb-1">
              Card Corner Radius
            </legend>

            <input
              type="range"
              min={0}
              max={RADIUS.length - 1}
              step={1}
              value={radiusIndex}
              onChange={handleRadius}
              className="range range-primary"
            />

            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {RADIUS.map((_, i) => (
                <span key={i}>|</span>
              ))}
            </div>

            <div className="flex justify-between px-2.5 mt-2 text-xs">
              {RADIUS.map(({ label, className }) => (
                <span
                  key={label}
                  className={
                    design.radius === className
                      ? "font-bold text-primary"
                      : "opacity-60"
                  }
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-6">
            <div className="space-y-3">
              <legend className="fieldset-legend text-lg">
                Card Border Style
              </legend>

              <div className="flex flex-wrap gap-6 w-[90%]">
                {Object.entries(BORDER).map(([key, className]) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="card-border"
                      className="radio"
                      checked={design.border === className}
                      onChange={() =>
                        setDesign((prev) => ({ ...prev, border: className }))
                      }
                    />
                    <span className="label">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-6">
            <div className="space-y-3">
              <legend className="fieldset-legend text-lg">Avatar Shape</legend>
              <div className="flex flex-wrap gap-6 w-[90%]">
                {AVATAR.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="avatar-style"
                      className="radio"
                      checked={design.avatar === value}
                      onChange={() =>
                        setDesign((prev) => ({ ...prev, avatar: value }))
                      }
                    />
                    <span className="label">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex gap-4 items-center">
            <legend className="fieldset-legend text-lg">
              Background Style
            </legend>
            <div className="dropdown dropdown-end md:dropdown-start">
              <div tabIndex={0} role="button" className="btn m-1">
                {
                  Object.values(BG).find(
                    (v) => v.className === design.background,
                  )?.label
                }

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 15 15"
                  className={
                    Object.values(BG).find(
                      (v) => v.className === design.background,
                    )?.arrow
                  }
                  fill="currentColor"
                >
                  <path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                </svg>
              </div>

              <ul
                tabIndex={-1}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-64 p-2 shadow"
              >
                {Object.entries(BG).map(
                  ([key, { label, className, arrow }]) => (
                    <li
                      key={key}
                      onClick={() =>
                        setDesign((prev) => ({
                          ...prev,
                          background: className,
                        }))
                      }
                    >
                      <a
                        className={`flex items-center ${
                          design.background === className
                            ? "bg-primary text-primary-content"
                            : ""
                        }`}
                      >
                        <span>{label}</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 15 15"
                          className={`shrink-0 ${arrow}`}
                          fill="currentColor"
                        >
                          <path d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414" />
                        </svg>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-6">
            <div className="space-y-3">
              <legend className="fieldset-legend text-lg">Buttons Style</legend>

              <div className="flex flex-wrap gap-6 w-[90%]">
                {BTN.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="button-style"
                      className="radio"
                      checked={design.buttonStyle === value}
                      onChange={() =>
                        setDesign((prev) => ({ ...prev, buttonStyle: value }))
                      }
                    />
                    <span className="label">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-6">
            <div className="space-y-3">
              <legend className="fieldset-legend text-lg">Buttons Shape</legend>

              <div className="flex flex-wrap gap-6 w-[90%]">
                {BTNRAD.map(({ label, value }) => (
                  <label
                    key={value}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="button-shape"
                      className="radio"
                      checked={design.buttonRadius === value}
                      onChange={() =>
                        setDesign((prev) => ({ ...prev, buttonRadius: value }))
                      }
                    />
                    <span className="label">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="divider md:divider-horizontal"></div>

        <div className="flex-3 w-[115%] md:w-full">
          <AppearancePreview user={user} links={links} design={design} />
        </div>
      </div>
    </div>
  );
};

export default Appearance;
