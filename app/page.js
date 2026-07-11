"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/landing/Hero";
import How from "@/components/landing/How";
import About from "@/components/landing/About";
import Faq from "@/components/landing/Faq";

export default function Home() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (userId) {
      router.replace("/dashboard");
    }
  }, [isLoaded, userId, router]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen md:max-w-[80vw] mx-2 md:mx-auto my-6 md:my-10 relative">
        <div className="bg-base-300 opacity-55 absolute inset-0 rounded-3xl"></div>
        <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
          <Hero />
          <How />
          <About />
          <Faq />
        </div>
      </div>
      <Footer />
    </>
  );
}
