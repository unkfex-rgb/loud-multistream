export default function Header() {
  return (
    <header className="container" style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <img src="/logo-loud.png" alt="LOUD" height={40} />
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>
        LOUD • Multistream
      </h1>
    </header>
  );
}
