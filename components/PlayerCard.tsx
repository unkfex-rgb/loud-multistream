
"use client";

import { useState } from "react";

type Props = {
  channel: string;
  onOnline?: () => void;
};

export default function PlayerCard({ channel, onOnline }: Props) {
  const [online, setOnline] = useState(false);

  return (
    <div
      style={{
        borderRadius: 14,
        overflow: "hidden",
        border: online ? "3px solid #1DB954" : "1px solid #333"
      }}
    >
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=loud-multistream.vercel.app`}
        height="300"
        width="100%"
        allowFullScreen
        onLoad={() => {
          setOnline(true);
          onOnline && onOnline();
        }}
      />
      <div style={{ padding: 8, textAlign: "center" }}>
        {online ? "🟢 AO VIVO" : "🔴 OFFLINE"}
      </div>
    </div>
  );
}
