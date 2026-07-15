"use client";

import { Arrow } from "@/components/icons";

const QuickActions = ({ setActiveTab }) => {
  return (
    <div className="bg-base-100 rounded-xl p-4">
      <h1 className="text-base md:text-2xl mb-4 md:mb-6">Quick Actions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
          onClick={() => setActiveTab("Profile")}
        >
          <div className="card-body">
            <h2 className="text-xl md:text-2xl">Profile</h2>

            <div className="flex justify-between">
              <p className="flex-4">
                Update your username, bio, and profile picture.
              </p>
              <Arrow
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 flex-1 fill-current"
              />
            </div>
          </div>
        </div>

        <div
          className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
          onClick={() => setActiveTab("Links")}
        >
          <div className="card-body">
            <h2 className="text-xl md:text-2xl">Links</h2>

            <div className="flex justify-between">
              <p className="flex-4">
                Add, edit, or reorder your link collection.
              </p>
              <Arrow
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 flex-1 fill-current"
              />
            </div>
          </div>
        </div>

        <div
          className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
          onClick={() => setActiveTab("Appearance")}
        >
          <div className="card-body">
            <h2 className="text-xl md:text-2xl">Appearance</h2>

            <div className="flex justify-between">
              <p className="flex-4">
                Customize your theme, fonts, buttons, and layout.
              </p>
              <Arrow
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 flex-1 fill-current"
              />
            </div>
          </div>
        </div>

        <div
          className="card bg-secondary text-secondary-content cursor-pointer hover:scale-102 transition-transform duration-200"
          onClick={() => setActiveTab("Analytics")}
        >
          <div className="card-body">
            <h2 className="text-xl md:text-2xl">Analytics</h2>

            <div className="flex justify-between">
              <p className="flex-4">
                Track page views, link clicks, and top performers.
              </p>
              <Arrow
                w={24}
                h={24}
                className="w-6 h-6 md:w-10 md:h-10 flex-1 fill-current"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
