import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "back.out(1.7)" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          descRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          buttonsRef.current.children,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.3",
        )
        .from(
          imageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotation: 5,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="m-1 md:m-6">
      <div className="hero min-h-[80vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div ref={imageRef} className="hover-3d flex-3">
            <figure className="max-w-50 md:max-w-100 rounded-2xl">
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
            <h1
              ref={titleRef}
              className="text-3xl md:text-6xl font-bold text-center md:text-left pt-3 md:pt-0 md:w-[80%]"
            >
              <span className="text-primary">One link</span> for everything you
              do.
            </h1>

            <p
              ref={descRef}
              className="py-4 md:py-6 md:w-[90%] text-center md:text-left text-base md:text-xl"
            >
              Create a personalized page for all your important links. Share
              your socials, projects, portfolio, and more through a single link
              that&apos;s easy to update and easy to share.
            </p>

            <div
              ref={buttonsRef}
              className="flex justify-center md:justify-start gap-6"
            >
              <SignUpButton>
                <button className="btn btn-sm md:btn-md btn-primary text-sm md:text-base">
                  Get started
                </button>
              </SignUpButton>

              <a href="#how">
                <button className="btn btn-sm md:btn-md btn-outline text-sm md:text-base">
                  How it works
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
