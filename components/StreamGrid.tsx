
import StreamCard from "./StreamCard";

const streams = [
  {
    name: "Streamer 1",
    url: "https://player.twitch.tv/?channel=gaules&parent=loud-multistream.vercel.app",
    live: true,
  },
  {
    name: "Streamer 2",
    url: "https://player.twitch.tv/?channel=alanzoka&parent=loud-multistream.vercel.app",
    live: false,
  },
];

export default function StreamGrid({ onCinema }: { onCinema: (url: string) => void }) {
  return (
    <div className="grid">
      {streams.map((s) => (
        <StreamCard key={s.name} stream={s} onCinema={onCinema} />
      ))}
    </div>
  );
}
