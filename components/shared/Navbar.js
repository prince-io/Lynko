"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import ThemeButton from "./ThemeButton";
import Menu from "./Menu";
import { Hamburger, Logo } from "@/components/icons";

const Navbar = ({ activeTab = "Home", setActiveTab = () => {} }) => {
  return (
    <div className="max-lg:collapse bg-primary shadow-sm w-full rounded-md sticky top-0 z-50">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>

      <div className="collapse-title navbar">
        <div className="navbar-start flex items-center gap-2 ml-0 md:ml-1">
          <label
            htmlFor="navbar-1-toggle"
            className="btn btn-sm btn-ghost lg:hidden text-base-100"
          >
            <Hamburger w={20} h={20} className="stroke-current" />
          </label>
          <h1 className="flex justify-center items-center gap-2 text-xl md:text-3xl font-semibold">
            <Logo className="w-8 h-8 md:w-12 md:h-12" />
            <span className="text-base-100">LynkO</span>
          </h1>
        </div>

        <div className="navbar-center hidden lg:flex">
          <SignedIn>
            <Menu
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="menu bg-base-100 lg:menu-horizontal rounded-box gap-2 text-sm md:text-base"
            />
          </SignedIn>
        </div>

        <div className="navbar-end flex gap-3">
          <ThemeButton />

          <SignedOut>
            <ul className="hidden md:flex menu menu-horizontal px-1 text-base text-base-100 font-bold">
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
            <div className="hidden md:flex gap-4">
              <SignInButton forceRedirectUrl="/dashboard" className="btn btn-sm md:btn-md btn-soft text-base" />
              <SignUpButton forceRedirectUrl="/dashboard">
                <button className="btn btn-sm md:btn-md btn-soft btn-primary text-base">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1 bg-base-100">
        <SignedIn>
          <Menu
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            className="menu gap-2 text-sm md:text-base"
          />
        </SignedIn>

        <SignedOut>
          <ul className="menu">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li className="flex flex-row justify-center gap-4 mt-4">
              <SignInButton forceRedirectUrl="/dashboard" className="btn btn-sm btn-soft text-base" />
              <SignUpButton forceRedirectUrl="/dashboard">
                <button className="btn btn-sm btn-soft btn-primary text-base">
                  Sign Up
                </button>
              </SignUpButton>
            </li>
          </ul>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
