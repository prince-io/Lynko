"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import How from "@/components/How";
import About from "@/components/About";
import Faq from "@/components/Faq";

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
      <Hero />
      <How />
      <div className="m-6 flex flex-col md:flex-row gap-6">
        <About />
        <Faq />
      </div>
      <Footer />
    </>
  );
}
