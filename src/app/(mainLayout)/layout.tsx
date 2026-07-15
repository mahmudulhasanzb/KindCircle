import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
