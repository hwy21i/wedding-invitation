export default function MusicToggle({ isPlaying, onToggle }) {
  return (
    <button className="music-toggle glass-card" type="button" onClick={onToggle}>
      <span className={`music-indicator ${isPlaying ? "is-playing" : ""}`} />
      {isPlaying ? "Pause Melody" : "Play Melody"}
    </button>
  );
}
