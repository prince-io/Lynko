"use client";

import { useState, useEffect, useRef } from "react";
import { useClerk } from "@clerk/nextjs";
import ProfilePhoto from "./ProfilePhoto";
import CropModal from "./CropModal";
import PublicHandle from "./PublicHandle";
import BioEditor from "./BioEditor";
import DeleteAccount from "./DeleteAccount";

const ProfileTab = ({ user, setUser }) => {
  const { signOut } = useClerk();

  const [cropSrc, setCropSrc] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");

  const [error, setError] = useState(false);
  const [mssg, setMssg] = useState("");
  const [loading, setLoading] = useState("");

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [deleteMssg, setDeleteMssg] = useState("");

  const [display, setDisplay] = useState(false);
  const [Tmssg, setTmssg] = useState({});
  const [toast, setToast] = useState(false);

  const [initialUser, setInitialUser] = useState(null);
  const isUnchanged =
    initialUser && username === initialUser.username && bio === initialUser.bio;

  useEffect(() => {
    if (!user) return;

    (() => {
      setInitialUser({
        username: user.username,
        bio: user.bio ?? "",
      });
    })();
  }, [user]);

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

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file) {
      if (cropSrc) URL.revokeObjectURL(cropSrc);
      setCropSrc(URL.createObjectURL(file));
      setCroppedBlob(null);
    }
  }

  function handleCropConfirm(blob) {
    setCroppedBlob(blob);
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  }

  function handleCropCancel() {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    fileInputRef.current.value = "";
  }

  async function handleUpload() {
    if (!croppedBlob) return;

    setLoading("profilePic");
    const formData = new FormData();
    formData.append("file", croppedBlob, "avatar.jpg");

    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      setLoading("");
      setTmssg({ text: data.error || "Upload failed. Try again.", type: "alert-error" });
      setToast(true);
      return;
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
    fileInputRef.current.value = "";
    setCroppedBlob(null);
    setLoading("");
    setTmssg({ text: "Avatar updated successfully.", type: "alert-success" });
    setToast(true);
  }

  async function checkUsername(name) {
    setLoading("username");
    if (!/^[a-zA-Z0-9_]{3,12}$/.test(name)) {
      setError(true);
      setMssg("Pick a username 3–12 characters long, using only letters, numbers, and underscores.");
    } else if (name !== user.username) {
      const res = await fetch(`/api/users/check-username?username=${name}`);
      const data = await res.json();
      setError(data.error);
      setMssg(data.message);
    }
    setLoading("");
  }

  async function saveProfile() {
    setLoading("save");
    if (!error) {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          bio,
        }),
      });
    }
    setMssg("");
    setLoading("");
    setTmssg({ text: "Profile updated successfully.", type: "alert-success" });
    setToast(true);
  }

  async function handleDelete() {
    setDeleteLoading(true);
    setDeleteError(false);
    setDeleteMssg("");

    const res = await fetch("/api/users", { method: "DELETE" });

    if (!res.ok) {
      setDeleteError(true);
      setDeleteMssg("Something went wrong. Please try again.");
      setDeleteLoading(false);
      return;
    }

    signOut({ forceRedirectUrl: "/" });
  }

  return (
    <div>
      {display && (
        <div className="toast toast-end z-3">
          <div className={`alert md:text-lg ${Tmssg.type}`}>
            <span>{Tmssg.text}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl">This Is You</h1>

        <button
          className="btn btn-sm md:btn-md btn-primary"
          disabled={loading == "save" || error || isUnchanged}
          onClick={saveProfile}
        >
          {loading == "save" ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="divider divider-primary"></div>

      {cropSrc && (
        <CropModal
          imageSrc={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={handleCropCancel}
        />
      )}

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <ProfilePhoto
          user={user}
          loading={loading}
          handleFileSelect={handleFileSelect}
          handleUpload={handleUpload}
          fileInputRef={fileInputRef}
          croppedBlob={croppedBlob}
        />

        <div className="flex-3 flex flex-col gap-4 md:gap-6">
          <PublicHandle
            username={username}
            setUsername={setUsername}
            error={error}
            mssg={mssg}
            loading={loading}
            checkUsername={checkUsername}
          />
          <BioEditor bio={bio} setBio={setBio} />
          <DeleteAccount
            deleteLoading={deleteLoading}
            deleteError={deleteError}
            deleteMssg={deleteMssg}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
