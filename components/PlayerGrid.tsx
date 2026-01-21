
"use client";

import { useState } from "react";
import PlayerCard from "./PlayerCard";

export default function PlayerGrid() {
  const [onlineCount, setOnlineCount] = useState(0);

  return (
    <>
      <div style={{ padding: "0 20px", marginBottom: 10 }}>
        <strong>{onlineCount}</strong> integrantes ao vivo
      </div>

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
          padding: 20
        }}
      >
        <PlayerCard
          channel="loud_coringa"
          onOnline={() => setOnlineCount((v) => v + 1)}
        />
        <PlayerCard
          channel="gabepeixe"
          onOnline={() => setOnlineCount((v) => v + 1)}
        />
        <PlayerCard
          channel="loud_brabox"
          onOnline={() => setOnlineCount((v) => v + 1)}
        />
      </main>
    </>
  );
}
