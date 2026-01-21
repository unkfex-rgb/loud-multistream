
type Props = {
  channel: string;
};

export default function PlayerCard({ channel }: Props) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden" }}>
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=loud-multistream.vercel.app`}
        height="300"
        width="100%"
        allowFullScreen
      />
    </div>
  );
}
