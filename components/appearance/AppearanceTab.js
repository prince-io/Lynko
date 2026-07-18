"use client";

import { useState, useEffect } from "react";
import { generateUUID } from "@/lib/uuid";
import AppearancePreview from "./AppearancePreview";
import ThemeDropdown from "./ThemeDropdown";
import FontDropdown from "./FontDropdown";
import TextScaleSlider from "./TextScaleSlider";
import CornerRadiusSlider from "./CornerRadiusSlider";
import BorderStyleRadio from "./BorderStyleRadio";
import AvatarShapeRadio from "./AvatarShapeRadio";
import ButtonStyleRadio from "./ButtonStyleRadio";
import ButtonShapeRadio from "./ButtonShapeRadio";
import BackgroundStyleDropdown from "./BackgroundStyleDropdown";

const AppearanceTab = ({ user, setUser }) => {
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
          <div className={`alert md:text-lg ${mssg.type}`}>
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

      <div className="divider divider-primary"></div>

      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-6">
        <div className="flex-3 flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <ThemeDropdown
              theme={design.theme}
              onChange={(v) => setDesign((prev) => ({ ...prev, theme: v }))}
            />
            <FontDropdown
              font={design.font}
              onChange={(v) => setDesign((prev) => ({ ...prev, font: v }))}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <TextScaleSlider
              size={design.size}
              onChange={(v) => setDesign((prev) => ({ ...prev, size: v }))}
            />
            <CornerRadiusSlider
              radius={design.radius}
              onChange={(v) => setDesign((prev) => ({ ...prev, radius: v }))}
            />
          </div>

          <BorderStyleRadio
            border={design.border}
            onChange={(v) => setDesign((prev) => ({ ...prev, border: v }))}
          />

          <AvatarShapeRadio
            avatar={design.avatar}
            onChange={(v) => setDesign((prev) => ({ ...prev, avatar: v }))}
          />

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <ButtonStyleRadio
              buttonStyle={design.buttonStyle}
              onChange={(v) =>
                setDesign((prev) => ({ ...prev, buttonStyle: v }))
              }
            />
            <ButtonShapeRadio
              buttonRadius={design.buttonRadius}
              onChange={(v) =>
                setDesign((prev) => ({ ...prev, buttonRadius: v }))
              }
            />
          </div>

          <div className="flex">
            <BackgroundStyleDropdown
              background={design.background}
              onChange={(v) =>
                setDesign((prev) => ({ ...prev, background: v }))
              }
            />
          </div>
        </div>

        <div className="flex-4 min-w-0 w-full">
          <AppearancePreview user={user} links={links} design={design} />
        </div>
      </div>
    </div>
  );
};

export default AppearanceTab;
