export default function FloatingPetals() {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: 34 }).map((_, index) => (
        <span
          key={index}
          className="petal"
          style={{
            left: `${(index * 11) % 100}%`,
            width: `${12 + (index % 5) * 6}px`,
            height: `${10 + (index % 4) * 5}px`,
            opacity: `${0.32 + (index % 4) * 0.1}`,
            animationDelay: `${index * 0.55}s`,
            animationDuration: `${10 + (index % 5) * 2.6}s`,
          }}
        />
      ))}
    </div>
  );
}
