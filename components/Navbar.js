import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import ThemeButton from "./ThemeButton";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar shadow-sm bg-primary">
      <div className="navbar-start mx-2 md:m-0">
        <h1 className="flex justify-center items-center gap-2 text-xl md:text-3xl font-semibold">
          <Image
            src="/logo.svg"
            alt="App logo"
            width={56}
            height={56}
            className="w-8 h-8 md:w-12 md:h-12"
          />
          <span className="text-base-100">LynkO</span>
        </h1>
      </div>

      <div className="navbar-end flex gap-3">
        <ThemeButton />
        <SignedOut>
          <ul className="hidden md:flex menu menu-horizontal px-1 text-base-100 font-bold">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <SignInButton className="btn btn-sm md:btn-md btn-soft" />
          <SignUpButton>
            <button className="btn btn-sm md:btn-md btn-soft btn-primary">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
