"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
    img.src = url;
  });
}

const MAX_AVATAR_SIZE = 400;

function getCroppedImg(imageSrc, pixelCrop) {
  return Promise.resolve().then(async () => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scale = Math.min(MAX_AVATAR_SIZE / pixelCrop.width, MAX_AVATAR_SIZE / pixelCrop.height, 1);
    const w = Math.round(pixelCrop.width * scale);
    const h = Math.round(pixelCrop.height * scale);

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      w,
      h,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.85);
    });
  });
}

const CropModal = ({ imageSrc, onConfirm, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [saving, setSaving] = useState(false);

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setSaving(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onConfirm(blob);
    } catch {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-base-100 rounded-xl p-4 md:p-8 w-full max-w-lg mx-4">
        <h1 className="text-base md:text-2xl mb-4 md:mb-6">Crop your photo</h1>

        <div className="relative w-full h-80 md:h-96 bg-base-300 rounded-xl overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="range range-sm w-full"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="btn btn-sm md:btn-md btn-ghost"
            onClick={onCancel}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm md:btn-md btn-primary"
            onClick={handleConfirm}
            disabled={saving || !croppedAreaPixels}
          >
            {saving ? "Cropping..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropModal;
