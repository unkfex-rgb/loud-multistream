"use client";

import { useState, useRef, useEffect } from "react";

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
  const [chatWidth, setChatWidth] = useState(350);
  const [isDragging, setIsDragging] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const currentStream = streams.find(s => s.id === activeStream) || streams[0];
  const otherStreams = streams.filter(s => s.id !== activeStream);

  const playerUrl = `https://player.twitch.tv/?channel=${currentStream.channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;
  const chatUrl = `https://www.twitch.tv/embed/${currentStream.channel}/chat?parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;

  // Handle chat resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mainContentRef.current) return;

      const mainContent = mainContentRef.current;
      const mainRect = mainContent.getBoundingClientRect();
      const newWidth = mainRect.right - e.clientX;

      if (newWidth > 250 && newWidth < 600) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

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

      <div className="main-content" ref={mainContentRef}>
        <div className="stream-section">
          <div className="streams-grid">
            {/* Main Stream */}
            <div className="stream-player main">
              {currentStream.live && <div className="live-tag">AO VIVO</div>}
              <iframe
                src={playerUrl}
                allowFullScreen
                title={`Stream ${currentStream.name}`}
              />
            </div>

            {/* Small Streams */}
            {otherStreams.map((stream) => {
              const smallPlayerUrl = `https://player.twitch.tv/?channel=${stream.channel}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}`;
              return (
                <div 
                  key={stream.id} 
                  className="stream-player"
                  onClick={() => setActiveStream(stream.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {stream.live && <div className="live-tag">AO VIVO</div>}
                  <iframe
                    src={smallPlayerUrl}
                    allowFullScreen
                    title={`Stream ${stream.name}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Section - Resizable */}
        <div 
          className="chat-section" 
          ref={chatRef}
          style={{ width: `${chatWidth}px` }}
        >
          <div 
            className="resize-handle"
            onMouseDown={() => setIsDragging(true)}
          />
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
