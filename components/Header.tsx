export default function Header() {
  return (
    <header className="container" style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 16,
      paddingBottom: 0,
      marginBottom: 20,
      borderBottom: "1px solid rgba(0, 255, 136, 0.2)",
      paddingBottom: 16
    }}>
      <img 
        src="/logo-loud.png" 
        alt="LOUD" 
        height={50}
        style={{
          filter: "drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))"
        }}
      />
      <h1 style={{ 
        fontSize: 28, 
        fontWeight: 700,
        color: "#00ff88",
        textTransform: "uppercase",
        letterSpacing: "2px",
        textShadow: "0 0 20px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 217, 255, 0.3)",
        fontFamily: "'Space Mono', monospace"
      }}>
        LOUD • MULTISTREAM
      </h1>
    </header>
  );
}
