"use client";

import { useState } from "react";
import { ErrorIcon } from "@/components/icons";
import { getGraceMs } from "@/lib/gracePeriod";

const DeleteAccount = ({
  deleteLoading,
  deleteError,
  deleteMssg,
  handleDelete,
}) => {
  const [confirmText, setConfirmText] = useState("");
  const [confirming, setConfirming] = useState(false);

  function handleBack() {
    setConfirmText("");
    setConfirming(false);
  }

  return (
    <div className="bg-base-100 rounded-xl p-4 md:p-8">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Delete Account</h1>

      {!confirming ? (
        <div className="flex justify-start items-center gap-3 mb-4">
          <fieldset className="fieldset w-fit relative">
            <input
              type="text"
              className="input input-sm md:input-md md:text-base"
              placeholder='Type "DELETE" to confirm'
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </fieldset>
          <button
            className="btn btn-sm md:btn-md btn-error md:ml-6"
            disabled={confirmText !== "DELETE" || deleteLoading}
            onClick={() => setConfirming(true)}
          >
            Delete
          </button>
        </div>
      ) : (
        <div>
          <p className="text-red-500 font-semibold mb-2">
            This action is irreversible.
          </p>
          <p className="text-sm opacity-70 mb-4">
            Your account will be scheduled for deletion. All your links,
            analytics, and profile data will be permanently removed after{" "}
            {(() => {
              const ms = getGraceMs();
              if (ms < 60000) return `${ms / 1000} seconds`;
              if (ms < 3600000) return `${ms / 60000} minutes`;
              return `${ms / 3600000} hours`;
            })()}
            . You can cancel by logging in within the grace period.
          </p>

          <div className="relative">
            {deleteMssg && (
              <p
                className={
                  deleteError
                    ? "label mb-2 text-xs md:text-sm text-red-600 flex items-center gap-1.5"
                    : "label mb-2 text-xs md:text-sm text-green-600 flex items-center gap-1.5"
                }
              >
                {deleteError && (
                  <ErrorIcon w={24} h={24} className="w-6 h-6 fill-current" />
                )}
                {deleteMssg}
              </p>
            )}

            <div className="flex gap-3">
              <button
                className="btn btn-sm md:btn-md btn-error"
                disabled={deleteLoading}
                onClick={handleDelete}
              >
                {deleteLoading ? "Deleting..." : "Yes, delete my account"}
              </button>
              <button
                className="btn btn-sm md:btn-md btn-ghost"
                disabled={deleteLoading}
                onClick={handleBack}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
