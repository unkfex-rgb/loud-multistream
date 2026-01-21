"use client";

import Header from "@/components/Header";
import StreamGrid from "@/components/StreamGrid";

export default function Home() {
  return (
    <>
      <div className="background" />
      <div className="container">
        <StreamGrid />
      </div>
    </>
  );
}
