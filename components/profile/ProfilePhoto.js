"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Upload } from "@/components/icons";

const ProfilePhoto = ({
  user,
  loading,
  handleFileSelect,
  handleUpload,
  fileInputRef,
  croppedBlob,
}) => {
  const previewUrl = useMemo(
    () => (croppedBlob ? URL.createObjectURL(croppedBlob) : null),
    [croppedBlob],
  );

  return (
    <div className="flex-2 bg-base-100 rounded-xl p-4 md:p-8">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Profile Photo</h1>

      <div className="flex flex-col items-center gap-4 md:gap-8">
        <div className="avatar">
          <div className="w-24 md:w-96 rounded-xl relative">
            {previewUrl ? (
              <div className="relative w-full h-full aspect-square">
                <img
                  src={previewUrl}
                  alt="Cropped preview"
                  className="rounded-xl object-cover w-full h-full"
                />
                <span className="absolute top-2 right-2 badge badge-primary badge-sm md:badge-md">
                  New
                </span>
              </div>
            ) : (
              <Image
                src={user?.profilePic || "/default.jpg"}
                alt="Profile avatar"
                fill
                sizes="(max-width: 768px) 96px, 384px"
                className="rounded-xl object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-row gap-4 md:gap-8 md:mb-4">
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-sm md:file-input-lg file-input-secondary w-full"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />

          <button
            className="btn btn-sm md:btn-lg btn-secondary w-fit"
            disabled={!croppedBlob || loading == "profilePic"}
            onClick={handleUpload}
            title="Upload avatar"
          >
            <Upload w="1.6em" h="1.6em" className="stroke-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
