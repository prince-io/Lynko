"use client";

import Image from "next/image";
import { Upload } from "@/components/icons";

const ProfilePhoto = ({
  user,
  loading,
  handleFileSelect,
  handleUpload,
  fileInputRef,
}) => {
  return (
    <div className="flex-2 bg-base-100 rounded-xl p-4 md:p-8">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Profile Photo</h1>

      <div className="flex flex-col items-center gap-4 md:gap-8">
        <div className="avatar">
          <div className="w-24 md:w-96 rounded-xl relative">
            <Image
              src={user?.profilePic || "/default.jpg"}
              alt="Profile avatar"
              fill
              sizes="(max-width: 768px) 96px, 384px"
              className="rounded-xl object-cover"
            />
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
            disabled={loading == "profilePic"}
            onClick={handleUpload}
          >
            <Upload w="1.6em" h="1.6em" className="stroke-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
