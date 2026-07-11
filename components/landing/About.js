"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const desc1Ref = useRef(null);
  const desc2Ref = useRef(null);
  const desc3Ref = useRef(null);

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
          desc1Ref.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          desc2Ref.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          desc3Ref.current,
          {
            y: 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="m-1 md:m-6" id="about">
      <div className="md:min-h-[70vh] hero">
        <div className="p-4 md:p-12 hero-content flex-col items-start gap-4 md:gap-6">
          <h1
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold place-self-center md:place-self-start text-primary pt-3 md:pt-0"
          >
            About Lynko
          </h1>
          <p ref={desc1Ref} className="md:text-xl">
            Let&apos;s be honest — sharing your work, profiles, and content
            online usually means juggling a dozen different links. You&apos;ve
            got your portfolio, your social media, your latest project, maybe a
            newsletter or a YouTube channel. Before you know it, you&apos;re
            sending people on a scavenger hunt just to find you. I&apos;ve seen
            this problem again and again, and it&apos;s frustrating trying to
            keep everything organized while making sure your audience can easily
            find what they&apos;re looking for.
          </p>

          <p ref={desc2Ref} className="md:text-xl">
            That&apos;s exactly why I built Lynko. My goal was simple: create
            one clean, customizable page where everything comes together — no
            clutter, no confusion, just you. Whether you&apos;re a creator
            sharing your work, a developer showcasing projects, a student
            building a personal brand, or someone looking for a simple online
            presence, Lynko helps you organize and share what matters most. You
            stay in complete control of how your page looks, what you share, and
            when you update it — all through a single, easy-to-remember link
            that works anywhere, on any device. No distractions, no complexity,
            no stress. Just a beautiful page that&apos;s 100% yours and ready to
            share with the world in seconds.
          </p>
          <p
            ref={desc3Ref}
            className="text-lg text-primary md:text-xl font-bold"
          >
            Built to simplify sharing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
