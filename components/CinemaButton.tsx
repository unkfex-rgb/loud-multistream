
"use client";

export default function CinemaButton() {
  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <button
      onClick={toggleFullScreen}
      style={{
        background: "#1DB954",
        border: "none",
        padding: "10px 16px",
        borderRadius: 10,
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      🎥 Modo Cinema
    </button>
  );
}
