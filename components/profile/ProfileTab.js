"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="w-6 h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-9q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          className="w-6 h-6"
                        >
                          <path
                            fill="currentColor"
                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m3.707-9.293l-4.003 4a1 1 0 0 1-1.415 0l-1.997-2a1 1 0 1 1 1.416-1.414l1.29 1.293l3.295-3.293a1 1 0 0 1 1.414 1.414"
                          />
                        </svg>
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
