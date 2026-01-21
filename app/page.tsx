"use client";

import { useState } from "react";
import React from "react";

interface Stream {
  id: string;
  name: string;
  channel: string;
  game: string;
}

const defaultStreams: Stream[] = [
  {
    id: "loud_coringa",
    name: "LOUD Coringa",
    channel: "loud_coringa",
    game: "Just Chatting",
  },
  {
    id: "loud_brabox",
    name: "LOUD Brabox",
    channel: "loud_brabox",
    game: "Just Chatting",
  },
  {
    id: "gabepeixe",
    name: "Gabe Peixe",
    channel: "gabepeixe",
    game: "Just Chatting",
  },
];

export default function Home() {
  const [streams, setStreams] = useState(defaultStreams);
  const [selectedStream, setSelectedStream] = useState(defaultStreams[0].id);
  const [chatHidden, setChatHidden] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chatHidden') === 'true';
    }
    return false;
  });
  const [viewMode, setViewMode] = useState<"focus" | "grid" | "auto">(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('viewMode') as "focus" | "grid" | "auto") || "auto";
    }
    return "auto";
  });
  const [popupPinned, setPopupPinned] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [platform, setPlatform] = useState("twitch");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatWidth, setChatWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('chatWidth') || '350');
    }
    return 350;
  });
  const [isResizing, setIsResizing] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);

  // Salvar configurações no localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chatHidden', String(chatHidden));
      localStorage.setItem('viewMode', viewMode);
      localStorage.setItem('chatWidth', String(chatWidth));
    }
  }, [chatHidden, viewMode, chatWidth]);

  // Redimensionamento do chat
  const handleMouseDown = () => {
    setIsResizing(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      e.preventDefault();
      const newWidth = Math.max(250, Math.min(600, window.innerWidth - e.clientX));
      setChatWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'auto';
        document.body.style.userSelect = 'auto';
      };
    }
  }, [isResizing]);

  // Detectar domínio para Twitch embed
  const getParentDomain = () => {
    if (typeof window !== 'undefined') {
      return window.location.hostname;
    }
    return 'localhost';
  };

  const parentDomain = getParentDomain();

  const getViewModeClass = () => {
    if (viewMode === "focus") return "view-focus";
    if (viewMode === "grid") return "view-grid";
    return "view-auto";
  };

  const getChatUrl = (channel: string, plat: string) => {
    if (plat === "twitch") {
      return `https://twitch.tv/embed/${channel}/chat?parent=${parentDomain}`;
    }
    return "";
  };

  const getPlayerUrl = (channel: string, plat: string) => {
    if (plat === "twitch") {
      return `https://twitch.tv/embed/${channel}?parent=${parentDomain}`;
    }
    return "";
  };

  const getStreamUrl = (channel: string, plat: string) => {
    if (plat === "twitch") {
      return `https://twitch.tv/${channel}`;
    }
    return "";
  };

  const selectedStreamData = streams.find((s) => s.id === selectedStream);

  return (
    <>
      <div className="background"></div>

      {/* HEADER */}
      <header>
        <div className="header-left">
          <img src="/logo-loud.png" alt="LOUD" className="logo" />
          <div className="header-info">
            <h1>LOUD MULTISTREAM</h1>
            <p>Streaming Hub</p>
          </div>
        </div>

        {/* CONTROLS MENU */}
        <div 
          className={`controls-menu ${menuOpen ? "open" : ""} ${popupPinned ? "pinned" : ""}`}
          onMouseEnter={() => !popupPinned && setMenuOpen(true)}
          onMouseLeave={() => !popupPinned && setMenuOpen(false)}
        >
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>

          <div className="menu-dropdown">
            <button 
              className={`menu-item ${chatHidden ? "active" : ""}`}
              onClick={() => setChatHidden(!chatHidden)}
              title="Chat"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <span>Chat</span>
            </button>

            <button 
              className={`menu-item ${viewMode === "focus" ? "active" : ""}`}
              onClick={() => setViewMode(viewMode === "focus" ? "auto" : "focus")}
              title="Foco"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
              <span>Foco</span>
            </button>

            <button 
              className={`menu-item ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode(viewMode === "grid" ? "auto" : "grid")}
              title="Grade"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>
              </svg>
              <span>Grade</span>
            </button>

            <button 
              className={`menu-item ${viewMode === "auto" ? "active" : ""}`}
              onClick={() => setViewMode("auto")}
              title="Automático"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-7C6.48 1 2 5.48 2 12s4.48 11 10 11 10-4.48 10-10S17.52 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z"/>
              </svg>
              <span>Auto</span>
            </button>

            <button 
              className={`menu-item ${popupPinned ? "active" : ""}`}
              onClick={() => setPopupPinned(!popupPinned)}
              title="Fixar"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
              </svg>
              <span>Fixar</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* STREAMS GRID */}
        <div className={`streams-container ${getViewModeClass()}`}>
          {streams.map((stream) => (
            <div 
              key={stream.id} 
              className={`stream-card ${selectedStream === stream.id ? "selected" : ""}`}
              onClick={() => setSelectedStream(stream.id)}
            >
              <div className="live-badge">LIVE</div>
              <div className="stream-player">
                <iframe
                  src={getPlayerUrl(stream.channel, platform)}
                  height="100%"
                  width="100%"
                  allowFullScreen={true}
                  title={`${stream.name} Stream`}
                ></iframe>
              </div>
              <div className="stream-info">
                <div className="stream-details">
                  <div className="stream-name">{stream.name}</div>
                  <div className="stream-game">{stream.game}</div>
                </div>
                <div className="stream-controls">
                  <button 
                    className="stream-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(getStreamUrl(stream.channel, platform), "_blank");
                    }}
                    title="Abrir no Twitch"
                  >
                    🔗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHAT SIDEBAR */}
        {!chatHidden && (
          <div className="chat-sidebar" style={{ width: `${chatWidth}px`, position: 'relative' }}>
            <div 
              onMouseDown={handleMouseDown}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                cursor: 'col-resize',
                background: 'rgba(0, 255, 0, 0.2)',
                zIndex: 100,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.6)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0, 255, 0, 0.2)')}
            />
            <div className="chat-header">
              <span>CHAT - {selectedStreamData?.name.toUpperCase()}</span>
              <button 
                className="chat-close"
                onClick={() => setChatHidden(true)}
              >
                ✕
              </button>
            </div>
            {selectedStreamData && (
              <iframe
                className="chat-iframe"
                src={getChatUrl(selectedStreamData.channel, platform)}
                frameBorder="0"
                scrolling="yes"
                allowFullScreen={true}
              ></iframe>
            )}
          </div>
        )}
      </div>

      {/* FOCUS MODE SELECTOR */}
      {viewMode === "focus" && (
        <div className="focus-selector-bar">
          <span className="selector-label">Selecione o streamer:</span>
          <div className="selector-buttons">
            {streams.map((stream) => (
              <button
                key={stream.id}
                className={`selector-btn ${selectedStream === stream.id ? "active" : ""}`}
                onClick={() => setSelectedStream(stream.id)}
              >
                {stream.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FLOATING POPUP */}
      {popupVisible && (
        <div className={`floating-popup ${popupPinned ? "pinned" : ""}`}
          onMouseEnter={() => popupPinned && setMenuOpen(true)}
          onMouseLeave={() => popupPinned && setMenuOpen(false)}
        >
          <div className="popup-header">
            <span className="popup-title">LOUD MULTISTREAM</span>
            <button 
              className="popup-close"
              onClick={() => setPopupVisible(false)}
            >
              ✕
            </button>
          </div>
          <div className="popup-content">
            <p>Bem-vindo ao LOUD Multistream!</p>
            <p>Acompanhe os streamers da LOUD em tempo real.</p>
            <p>Use o menu de controles para alternar entre diferentes modos de exibição ou ocultar o chat.</p>
          </div>
        </div>
      )}

      {/* CLIPES EM DESTAQUE */}
      <div className="clips-section">
        <h2 className="clips-title">Clipes em Destaque</h2>
        <div className="clips-grid">
          {streams.map((stream) => (
            <div key={stream.id} className="clip-card">
              <div className="clip-thumbnail">
                <div style={{background: 'rgba(0,0,0,0.8)', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px'}}>
                  <span style={{color: '#888'}}>Clipes em breve</span>
                </div>
              </div>
              <div className="clip-info">
                <h3>{stream.name}</h3>
                <p>Clipes populares</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <div className="dev-credit-container">
            <span className="dev-credit">Dev by: <strong>Corintia420</strong></span>
            <div className="social-popup">
              <a 
                href="https://instagram.com/corintia420" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link instagram"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                </svg>
              </a>
              <a 
                href="https://twitch.tv/corintia420" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link twitch"
                title="Twitch"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M2.149 0l-1.612 4.823v16.815h5.849v3.529h3.848l3.627-3.529h5.236l6.923-7.231V0H2.149zm16.994 13.601h-4.281l-2.557 2.64v-2.64h-4.281V2.754h11.119v10.847z"/>
                  <path d="M11.11 5.338H9.481v6.313h1.629V5.338zm4.358 0h-1.629v6.313h1.629V5.338z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
