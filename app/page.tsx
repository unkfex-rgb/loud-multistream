
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StreamGrid from "@/components/StreamGrid";
import CinemaMode from "@/components/CinemaMode";

export default function Home() {
  const [cinema, setCinema] = useState<string | null>(null);

  return (
    <>
      <div className="background" />

      <Header />

      <main className="container">
        <StreamGrid onCinema={setCinema} />
      </main>

      {cinema && <CinemaMode url={cinema} onClose={() => setCinema(null)} />}
    </>
  );
}
