
import CinemaButton from "./CinemaButton";

export default function Header() {
  return (
    <header
      style={{
        padding: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)"
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 32, color: "#1DB954" }}>
          LOUD
        </h1>
        <span style={{ opacity: 0.8 }}>
          O caminho até Las Vegas
        </span>
      </div>

      <CinemaButton />
    </header>
  );
}
