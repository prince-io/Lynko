"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const Profile = ({ user, setUser }) => {
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
          <div className={`alert ${Tmssg.type}`}>
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

      <div className="divider"></div>

      <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:grid-rows-3">
        <div className="md:row-span-3 flex flex-col justify-start items-center gap-4 md:gap-6">
          <div className="avatar">
            <div className="w-24 md:w-48 rounded-xl relative">
              <Image
                src={user?.profilePic || "/default.jpg"}
                alt="Profile avatar"
                fill
                className="rrounded-xl object-cover"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4 md:gap-6">
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-sm md:file-input-md file-input-primary w-full"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />

            <button
              className="btn btn-sm md:btn-md btn-primary w-fit"
              disabled={loading == "profilePic"}
              onClick={handleUpload}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.6em"
                height="1.6em"
                viewBox="0 0 24 24"
              >
                <title xmlns="">upload</title>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5l5 5m-5-5v12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="md:w-[70%] flex justify-start gap-4 md:gap-6">
            <fieldset className="fieldset mb-2 w-full">
              <legend className="fieldset-legend ml-1 text-base py-1">
                Your public handle
              </legend>
              <input
                type="text"
                className="input input-sm md:input-md"
                placeholder="Type here"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <p
                className={
                  error
                    ? "label ml-1 text-red-600"
                    : "label ml-1 text-green-600"
                }
              >
                {mssg}
              </p>
            </fieldset>
            <button
              className="btn btn-sm md:btn-md btn-primary mt-7.5 md:mt-8"
              disabled={loading == "username"}
              onClick={() => {
                checkUsername(username);
              }}
            >
              {loading == "username" ? "Checking..." : "Check"}
            </button>
          </div>
        </div>

        <div className="md:row-span-2 md:col-start-2 -mt-6 md:m-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend ml-1 text-base py-1">
              Tell us who you are
            </legend>
            <textarea
              className="textarea md:w-[70%]"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Profile;
