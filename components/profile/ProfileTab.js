"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Upload, ErrorIcon, SuccessCheck } from "@/components/icons";

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
          <div className={`alert text-lg ${Tmssg.type}`}>
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

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-2 bg-base-100 rounded-xl p-8">
          <h1 className="text-sm md:text-2xl mb-6">Profile Photo</h1>

          <div className="flex flex-col items-center gap-4 md:gap-8">
            <div className="avatar">
              <div className="w-24 md:w-96 rounded-xl relative">
                <Image
                  src={user?.profilePic || "/default.jpg"}
                  alt="Profile avatar"
                  fill
                  className="rrounded-xl object-cover"
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

        <div className="flex-3 flex flex-col gap-6">
          <div className="bg-base-100 rounded-xl p-8">
            <h1 className="text-sm md:text-2xl mb-6">Your public handle</h1>

            <div className="flex gap-6">
              <div className="flex justify-start items-center gap-3 mb-4">
                <p className="ml-2 text-base">
                  {process.env.NEXT_PUBLIC_APP_URL}/
                </p>
                <fieldset className="fieldset w-full relative">
                  <input
                    type="text"
                    className="input input-sm md:input-md text-base"
                    placeholder="Type here"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />

                  <p
                    className={
                      error
                        ? "absolute label mt-13 ml-2 text-sm text-red-600 flex items-center gap-1.5"
                        : "absolute label mt-13 ml-2 text-sm text-green-600 flex items-center gap-1.5"
                    }
                  >
                    {mssg &&
                      (error ? (
                        <ErrorIcon
                          w={24}
                          h={24}
                          className="w-6 h-6 fill-current"
                        />
                      ) : (
                        <SuccessCheck
                          w={16}
                          h={16}
                          className="w-6 h-6 fill-current"
                        />
                      ))}
                    {mssg}
                  </p>
                </fieldset>
                <button
                  className="btn btn-sm md:btn-md btn-secondary ml-6"
                  disabled={loading == "username"}
                  onClick={() => {
                    checkUsername(username);
                  }}
                >
                  {loading == "username" ? "Checking..." : "Check"}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-8">
            <h1 className="text-sm md:text-2xl mb-6">Tell us who you are</h1>

            <div className="md:row-span-2 md:col-start-2 mb-6">
              <fieldset className="fieldset">
                <textarea
                  className="textarea text-base md:w-[70%]"
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
