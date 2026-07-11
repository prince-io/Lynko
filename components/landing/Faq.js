"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Faq = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const itemsRef = useRef(null);

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
          itemsRef.current.children,
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.3",
        );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="m-1 md:m-6" id="faq">
      <div className="md:min-h-[70vh] hero">
        <div className="p-4 md:p-12 hero-content flex-col items-start gap-2 md:gap-6">
          <h1
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-primary text-center md:text-left pt-3 md:pt-0"
          >
            Frequently asked questions
          </h1>
          <p ref={descRef} className="py-6 md:text-xl text-center md:text-left">
            Everything you need to know before getting started.
          </p>

          <div ref={itemsRef} className="h-100 flex flex-col gap-3 md:gap-5">
            <div className="collapse collapse-arrow bg-base-100 border-2 md:border-4 border-primary">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title font-semibold text-sm md:text-lg">
                Is Lynko free to use?
              </div>
              <div className="collapse-content">
                <p className="text-sm md:text-base">
                  Yes, absolutely! Lynko is completely free to use. Create your
                  page, add your links, and customize your profile without any
                  upfront cost. No credit card required and no hidden fees.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border-2 md:border-4 border-primary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold text-sm md:text-lg">
                Do I need to create an account?
              </div>
              <div className="collapse-content">
                <p className="text-sm md:text-base">
                  Yes, creating an account is quick and easy. Signing up allows
                  you to save your page, manage your links, customize your
                  profile, and make updates whenever you need to.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border-2 md:border-4 border-primary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold text-sm md:text-lg">
                Can I edit my links later?
              </div>
              <div className="collapse-content">
                <p className="text-sm md:text-base">
                  Absolutely. You can add, edit, reorder, or remove links at any
                  time from your dashboard. Changes are reflected instantly,
                  ensuring your audience always sees the most up-to-date version
                  of your page.
                </p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border-2 md:border-4 border-primary">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title font-semibold text-sm md:text-lg">
                Can I customize my page?
              </div>
              <div className="collapse-content">
                <p className="text-sm md:text-base">
                  Yes. Lynko gives you control over how your page looks and
                  feels. Add your profile information, organize your links, and
                  personalize your page to match your style and brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
