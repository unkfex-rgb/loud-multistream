
export default function CinemaMode({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  return (
    <div className="cinema" onClick={onClose}>
      <iframe
        src={url}
        width="80%"
        height="80%"
        allowFullScreen
      />
    </div>
  );
}
