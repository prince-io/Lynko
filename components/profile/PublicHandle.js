"use client";

import { ErrorIcon, SuccessCheck } from "@/components/icons";

const PublicHandle = ({
  username,
  setUsername,
  error,
  mssg,
  loading,
  checkUsername,
}) => {
  return (
    <div className="bg-base-100 rounded-xl p-4 md:p-8">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Your public handle</h1>

      <div className="flex gap-6">
        <div className="flex justify-start items-center gap-3 mb-4">
          <p className="hidden md:block ml-2 text-base">
            {process.env.NEXT_PUBLIC_APP_URL}/
          </p>
          <fieldset className="fieldset w-full relative">
            <input
              type="text"
              className="input input-sm md:input-md md:text-base"
              placeholder="Type here"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <p
              className={
                error
                  ? "absolute label mt-10 md:mt-13 ml-2 md:text-sm text-red-600 flex items-center gap-1.5"
                  : "absolute label mt-10 md:mt-13 ml-2 md:text-sm text-green-600 flex items-center gap-1.5"
              }
            >
              {mssg &&
                (error ? (
                  <ErrorIcon w={24} h={24} className="w-6 h-6 fill-current" />
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
            className="btn btn-sm md:btn-md btn-secondary md:ml-6"
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
  );
};

export default PublicHandle;
