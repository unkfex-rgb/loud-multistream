export default function Header() {
  return (
    <header className="container" style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: 16,
      marginBottom: 20,
      borderBottom: "2px solid rgba(0, 255, 0, 0.3)",
      paddingBottom: 16
    }}>
      <img 
        src="/logo-loud.png" 
        alt="LOUD" 
        height={50}
        style={{
          filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.3))"
        }}
      />
      <h1 style={{ 
        fontSize: 28, 
        fontWeight: 700,
        color: "#00ff00",
        textTransform: "uppercase",
        letterSpacing: "3px",
        textShadow: "0 0 20px rgba(0, 255, 0, 0.4)",
        fontFamily: "'Poppins', sans-serif"
      }}>
        LOUD • MULTISTREAM
      </h1>
    </header>
  );
}
