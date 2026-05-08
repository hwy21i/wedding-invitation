export default function RoseBurst({ active }) {
  if (!active) {
    return null;
  }

  return (
    <div className="rose-burst" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
          className="burst-petal"
          style={{
            "--angle": `${index * 15}deg`,
            "--distance": `${90 + (index % 4) * 18}px`,
            animationDelay: `${index * 0.015}s`,
          }}
        />
      ))}
    </div>
  );
}
