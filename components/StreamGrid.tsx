"use client";

import { useState } from "react";

const streams = [
  {
    id: "coringa",
    name: "Loud Coringa",
    channel: "loud_coringa",
    live: true,
  },
  {
    id: "gabepeixe",
    name: "Gabe Peixe",
    channel: "gabepeixe",
    live: true,
  },
  {
    id: "brabox",
    name: "Loud Brabox",
    channel: "loud_brabox",
    live: true,
  },
];

export default function StreamGrid() {
  const [activeStream, setActiveStream] = useState(streams[0].id);

  const currentStream = streams.find(s => s.id === activeStream) || streams[0];

  const playerUrl = `https://player.twitch.tv/?channel=${currentStream.channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;
  const chatUrl = `https://www.twitch.tv/embed/${currentStream.channel}/chat?parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;

  return (
    <>
      <div className="streamer-tabs">
        {streams.map((stream) => (
          <button
            key={stream.id}
            className={`tab-btn ${activeStream === stream.id ? 'active' : ''}`}
            onClick={() => setActiveStream(stream.id)}
          >
            {stream.live && <span className="live-indicator" />}
            {stream.name}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="stream-section">
          <div className="player-container">
            {currentStream.live && <div className="live">AO VIVO</div>}
            <iframe
              src={playerUrl}
              allowFullScreen
              title={`Stream ${currentStream.name}`}
            />
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            Chat - {currentStream.name}
          </div>
          <iframe
            src={chatUrl}
            className="chat-iframe"
            title={`Chat ${currentStream.name}`}
          />
        </div>
      </div>
    </>
  );
}
