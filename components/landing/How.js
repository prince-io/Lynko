"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const How = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef(null);

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
          cardsRef.current.children,
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="m-1 md:m-6" id="how">
      <div className="hero min-h-[70vh] py-5 md:py-0">
        <div className="hero-content flex-col items-start gap-4 md:gap-6">
          <h1
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold place-self-center md:place-self-start pt-3 md:pt-0 text-primary"
          >
            How it works
          </h1>
          <p
            ref={descRef}
            className="px-4 md:px-0 py-4 md:py-6 md:text-xl text-center md:text-left"
          >
            Get your link page up and running in just a few minutes.
          </p>

          <div
            ref={cardsRef}
            className="flex gap-5 md:gap-10 flex-col md:flex-row justify-center items-center p-4 md:p-0"
          >
            <Card
              num={"1"}
              title={"Sign up"}
              content={"Create your free account using email or social login."}
            />

            <Card
              num={"2"}
              title={"Add your links"}
              content={
                "Customize your profile and add all the links you want to share."
              }
            />

            <Card
              num={"3"}
              title={"Share"}
              content={
                "Share your single link anywhere and let people explore everything you do."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
