import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

export default function GalleryCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="section gallery-section" id="gallery">
      <SectionTitle eyebrow="Gallery" title="Moments of Liya & Mikias" />

      <div className="gallery-shell">
        <div className="gallery-stage glass-card">
          {slides.map((slide, index) => (
            <motion.figure
              key={slide.image}
              className={`gallery-slide ${activeIndex === index ? "is-active" : ""}`}
              initial={false}
              animate={{
                opacity: activeIndex === index ? 1 : 0,
                scale: activeIndex === index ? 1 : 1.08,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img src={slide.image} alt={slide.alt} loading="lazy" />
            </motion.figure>
          ))}
        </div>

        <div className="gallery-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              className={activeIndex === index ? "is-active" : ""}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
