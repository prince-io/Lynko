"use client";

import { useState, useEffect, useRef } from "react";
import ProfilePhoto from "./ProfilePhoto";
import PublicHandle from "./PublicHandle";
import BioEditor from "./BioEditor";

const ProfileTab = ({ user, setUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");

  const [error, setError] = useState(false);
  const [mssg, setMssg] = useState("");
  const [loading, setLoading] = useState("");

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
      setSelectedFile(file);
    }
  }

  async function handleUpload() {
    if (!selectedFile) return;

    setLoading("profilePic");
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    const updatedUser = await res.json();
    setUser(updatedUser);
    fileInputRef.current.value = "";
    setSelectedFile(null);
    setLoading("");
    setTmssg({ text: "Avatar updated successfully.", type: "alert-success" });
    setToast(true);
  }

  async function checkUsername(name) {
    setLoading("username");
    if (name.trim() !== name) {
      setError(true);
      setMssg("Invalid username format.");
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

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <ProfilePhoto
          user={user}
          loading={loading}
          handleFileSelect={handleFileSelect}
          handleUpload={handleUpload}
          fileInputRef={fileInputRef}
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
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
