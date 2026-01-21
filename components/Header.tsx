export default function Header() {
  return (
    <header style={{ 
      padding: "20px 24px",
      borderBottom: "2px solid rgba(0, 255, 0, 0.3)",
      marginBottom: 30
    }}>
      <img 
        src="/logo-loud.png" 
        alt="LOUD" 
        height={60}
        style={{
          filter: "drop-shadow(0 0 10px rgba(0, 255, 0, 0.3))",
          transition: "filter 0.3s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "drop-shadow(0 0 15px rgba(0, 255, 0, 0.6))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(0, 255, 0, 0.3))";
        }}
      />
    </header>
  );
}
