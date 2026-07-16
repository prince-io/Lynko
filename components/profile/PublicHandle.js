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
        <div className="flex flex-col justify-start gap-2">
          <fieldset className="fieldset w-full relative flex items-center">
            <p className="hidden md:block mx-2 text-base">
              {process.env.NEXT_PUBLIC_APP_URL}/
            </p>

            <input
              type="text"
              className="input input-sm md:input-md md:text-base"
              placeholder="Type here"
              value={username}
              maxLength={12}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <button
              className="btn btn-sm md:btn-md btn-secondary ml-2 md:ml-6"
              disabled={loading == "username"}
              onClick={() => {
                checkUsername(username);
              }}
            >
              {loading == "username" ? "Checking..." : "Check"}
            </button>
          </fieldset>

          <div className={"rounded p-2 w-full min-h-10"}>
            {mssg && (
              <p className="flex items-center gap-1.5 text-xs md:text-sm">
                {error ? (
                  <ErrorIcon
                    w={28}
                    h={28}
                    className="w-6 h-6 shrink-0 fill-current text-red-600"
                  />
                ) : (
                  <SuccessCheck
                    w={20}
                    h={20}
                    className="w-6 h-6 shrink-0 fill-current text-green-600"
                  />
                )}
                <span className={error ? "text-red-600" : "text-green-600"}>
                  {mssg}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicHandle;
