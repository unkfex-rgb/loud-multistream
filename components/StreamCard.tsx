
export default function StreamCard({
  stream,
  onCinema,
}: {
  stream: any;
  onCinema: (url: string) => void;
}) {
  return (
    <div className="card">
      <div style={{ position: "relative" }}>
        {stream.live && <div className="live">AO VIVO</div>}

        <iframe
          src={stream.url}
          width="100%"
          height="220"
          allowFullScreen
        />
      </div>

      <div style={{ padding: 12 }}>
        <strong>{stream.name}</strong>
        <button
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => onCinema(stream.url)}
        >
          🎬 Cinema
        </button>
      </div>
    </div>
  );
}
