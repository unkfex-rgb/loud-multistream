
import PlayerCard from "./PlayerCard";

export default function PlayerGrid() {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: 20,
        padding: 20
      }}
    >
      <PlayerCard channel="loud_coringa" />
      <PlayerCard channel="gabepeixe" />
      <PlayerCard channel="loud_brabox" />
    </main>
  );
}
