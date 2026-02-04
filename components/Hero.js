import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";

const Hero = () => {
  return (
    <div className="m-6">
      <div className="hero glass min-h-screen rounded-3xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="hover-3d flex-3">
            <figure className="max-w-100 rounded-2xl">
              <Image
                src="/hero.jpg"
                alt="Lynko hero"
                width={600}
                height={400}
                priority
              />
            </figure>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="flex-6">
            <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left pt-3 md:pt-0 md:w-[60%]">
              One link for everything you do!
            </h1>
            <p className="py-6 md:w-[90%] text-center md:text-left md:text-lg">
              Create a clean, customizable page where you can add all your
              important links in one place. Share your social profiles,
              projects, or anything else you want people to see — all through a
              single, easy-to-remember link.
            </p>
            <div className="flex justify-center md:justify-start gap-3">
              <SignUpButton>
                <button className="btn btn-sm md:btn-md btn-primary">
                  Get started for free
                </button>
              </SignUpButton>
              <a href="#how">
                <button className="btn btn-sm md:btn-md btn-outline">
                  See how it works
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
