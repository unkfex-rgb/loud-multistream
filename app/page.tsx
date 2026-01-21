"use client";

import Header from "@/components/Header";
import StreamGrid from "@/components/StreamGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="background" />

      <div className="container">
        <Header />
        <StreamGrid />
        <Footer />
      </div>
    </>
  );
}
