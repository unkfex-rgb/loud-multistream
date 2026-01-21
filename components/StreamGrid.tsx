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
    id: "brabox",
    name: "Loud Brabox",
    channel: "loud_brabox",
    live: true,
  },
  {
    id: "gabepeixe",
    name: "Gabe Peixe",
    channel: "gabepeixe",
    live: true,
  },
];

export default function StreamGrid() {
  const [gridMode, setGridMode] = useState<"auto" | "2" | "1">("auto");
  const [chatHidden, setChatHidden] = useState(false);
  const [popupPinned, setPopupPinned] = useState(false);
  const [popupVisible, setPopupVisible] = useState(true);
  const [selectedStream, setSelectedStream] = useState(streams[0].id);

  const getGridClass = () => {
    if (gridMode === "2") return "grid-2";
    if (gridMode === "1") return "grid-1";
    return "";
  };

  const getPlayerUrl = (channel: string) => {
    const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
    return `https://player.twitch.tv/?channel=${channel}&parent=${parent}`;
  };

  const getChatUrl = (channel: string) => {
    const parent = typeof window !== "undefined" ? window.location.hostname : "localhost";
    return `https://www.twitch.tv/embed/${channel}/chat?parent=${parent}`;
  };

  const currentStream = streams.find(s => s.id === selectedStream) || streams[0];

  return (
    <>
      {/* HEADER COM CONTROLES */}
      <header>
        <img src="/logo-loud.png" alt="LOUD" />
        <div className="header-controls">
          <button 
            className={`control-btn ${chatHidden ? "active" : ""}`}
            onClick={() => setChatHidden(!chatHidden)}
            title="Ocultar/Mostrar Chat"
          >
            💬 Chat
          </button>
          <button 
            className={`control-btn ${gridMode === "2" ? "active" : ""}`}
            onClick={() => setGridMode(gridMode === "2" ? "auto" : "2")}
            title="Modo 2 Colunas"
          >
            📊 Grade
          </button>
          <button 
            className={`control-btn ${gridMode === "1" ? "active" : ""}`}
            onClick={() => setGridMode(gridMode === "1" ? "auto" : "1")}
            title="Modo 1 Coluna"
          >
            📺 Fullscreen
          </button>
          <button 
            className={`control-btn ${popupPinned ? "active" : ""}`}
            onClick={() => setPopupPinned(!popupPinned)}
            title="Fixar Popup"
          >
            📌 Fixar
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* STREAMS GRID */}
        <div className={`streams-container ${getGridClass()}`}>
          {streams.map((stream) => (
            <div 
              key={stream.id} 
              className="stream-card"
              onClick={() => setSelectedStream(stream.id)}
            >
              <div className="stream-player">
                {stream.live && <div className="live-badge">AO VIVO</div>}
                <iframe
                  src={getPlayerUrl(stream.channel)}
                  allowFullScreen
                  title={`Stream ${stream.name}`}
                />
              </div>
              <div className="stream-info">
                <span className="stream-name">{stream.name}</span>
                <div className="stream-controls">
                  <button 
                    className="stream-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://twitch.tv/${stream.channel}`, "_blank");
                    }}
                    title="Abrir no Twitch"
                  >
                    🔗
                  </button>
                  <button 
                    className="stream-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://twitch.tv/popout/${stream.channel}/chat`, "_blank");
                    }}
                    title="Abrir Chat"
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHAT SIDEBAR */}
        {!chatHidden && (
          <div className="chat-sidebar">
            <div className="chat-header">
              Chat - {currentStream.name}
            </div>
            <iframe
              src={getChatUrl(currentStream.channel)}
              className="chat-iframe"
              title={`Chat ${currentStream.name}`}
            />
          </div>
        )}
      </div>

      {/* FLOATING POPUP */}
      {popupVisible && (
        <div className={`floating-popup ${popupPinned ? "pinned" : ""}`}>
          <div className="popup-header">
            <span className="popup-title">LOUD Multistream</span>
            <button 
              className="popup-close"
              onClick={() => setPopupVisible(false)}
            >
              ✕
            </button>
          </div>
          <div className="popup-content">
            <p>Bem-vindo ao LOUD Multistream!</p>
            <p style={{ marginTop: "8px", fontSize: "11px" }}>
              Acompanhe os streamers da LOUD em tempo real. Use os botões acima para controlar a visualização.
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          dev by: <strong>Corintia420</strong>
        </div>
        <div className="footer-right">
          <a 
            href="https://instagram.com/corintia420" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Instagram
            <span className="footer-icon">📷</span>
          </a>
          <a 
            href="https://twitch.tv/corintia420" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Twitch
            <span className="footer-icon">🎮</span>
          </a>
        </div>
      </footer>
    </>
  );
}
