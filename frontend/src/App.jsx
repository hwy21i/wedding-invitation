import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import AnimatedNames from "./components/AnimatedNames";
import CountdownTimer from "./components/CountdownTimer";
import FloatingPetals from "./components/FloatingPetals";
import GalleryCarousel from "./components/GalleryCarousel";
import RSVPForm from "./components/RSVPForm";
import ScrollProgress from "./components/ScrollProgress";
import SectionTitle from "./components/SectionTitle";
import StoryTimeline from "./components/StoryTimeline";

const weddingDate = new Date("2026-05-16T19:00:00");
const heroImage = "/wedding-photos/photo_2026-03-1.jpg";

const storyMoments = [
  {
    year: "1 ቆሮንቶስ ሰዎች 13",
    title: "ፍቅር ከሁሉ ይበልጣል",
    description:
      "ፍቅር ይታገሣል፥ ቸርነትንም ያደርጋል፤ ፍቅር አይቀናም፤ ፍቅር አይመካም፥ አይታበይም፤ የማይገባውን አያደርግም፥ የራሱንም አይፈልግም፥ አይበሳጭም፥ በደልን አይቆጥርም፤ ከእውነት ጋር ደስ ይለዋል እንጂ ስለ ዓመፃ ደስ አይለውም፤ ሁሉን ይታገሣል፥ ሁሉን ያምናል፥ ሁሉን ተስፋ ያደርጋል፥ በሁሉ ይጸናል።",
  },
];

const gallerySlides = [
  { image: "/wedding-photos/photo_2026-03-2.jpg", alt: "Liya and Mikias smiling together outdoors" },
  { image: "/wedding-photos/photo_2026-03-3.jpg", alt: "Liya and Mikias in elegant formal attire" },
  { image: "/wedding-photos/photo_2026-03-4.jpg", alt: "Liya and Mikias in cultural wedding attire" },
  { image: "/wedding-photos/photo_2026-03-5.jpg", alt: "Close-up of wedding rings and hands" },
  { image: "/wedding-photos/photo_2026-03-6.jpg", alt: "Liya and Mikias standing before a beautiful building" },
];

export default function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [guestPass, setGuestPass] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  const sparklePieces = useMemo(() => {
    return Array.from({ length: 32 }).map((_, index) => ({
      id: index,
      left: `${(index * 13) % 100}%`,
      top: `${(index * 17) % 100}%`,
      delay: index * 0.06,
    }));
  }, []);

  function handleGuestPass(guest) {
    setGuestPass(guest);
    requestAnimationFrame(() => {
      document.getElementById("pass")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="app-shell">
      <ScrollProgress />
      <FloatingPetals />

      <AnimatePresence>
        {showConfetti ? (
          <motion.div className="sparkle-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {sparklePieces.map((piece) => (
              <span
                key={piece.id}
                className="sparkle"
                style={{ left: piece.left, top: piece.top, animationDelay: `${piece.delay}s` }}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <header className="hero-section" id="home" style={{ backgroundImage: `linear-gradient(rgba(16, 10, 18, 0.42), rgba(35, 5, 18, 0.76)), url(${heroImage})` }}>
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <AnimatedNames firstName="Liya" secondName="Mikias" />
          <p className="hero-copy">Join Liya and Mikias on May 16, 2026</p>

          <div className="hero-actions">
            <a className="primary-button" href="#rsvp">
              RSVP Now
            </a>
            <a className="secondary-button" href="#save-the-date">
              Save the Date
            </a>
          </div>

          <CountdownTimer targetDate={weddingDate} />
        </motion.div>
      </header>

      <main>
        <section className="section save-date-section" id="save-the-date">
          <SectionTitle eyebrow="Save The Date" title="May 16, 2026" />

          <motion.div
            className="save-date-card glass-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85 }}
          >
            <span className="save-date-label">Saturday Evening</span>
            <h3>Liya & Mikias</h3>
            <p>Ceremony begins at 7:00 PM at Piassa in Yohannes Church, Addis Ababa.</p>
          </motion.div>
        </section>

        <section className="section details-section" id="details">
          <SectionTitle eyebrow="Event Details" title=" Evening " />

          <div className="details-grid">
            <motion.article className="detail-card glass-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}>
              <div className="detail-icon">DAY</div>
              <h3>When</h3>
              <p>Saturday, May 16, 2026</p>
              <p>7:00 PM</p>
            </motion.article>

            <motion.article
              className="detail-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
            >
              <div className="detail-icon">MAP</div>
              <h3>Where</h3>
              <p>Piassa in Yohannes Church</p>
              <p>Addis Ababa, Ethiopia</p>
            </motion.article>
             <div>
        <motion.article
              className="detail-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
            >
              <div className="detail-icon">EVENT</div>
              <h3> Ceremony</h3>
              <p> Lunch  <br/>
                 prayer ceremony </p>
            </motion.article>
          </div>
          </div>
         
          <br/>
          <motion.div
            className="map-card glass-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="map-copy">
              <span className="section-eyebrow">Location</span>
              <h3>Piassa in Yohannes Church</h3>
            </div>
            <iframe
              title="Wedding venue map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=9.042746919625749,38.745479451026426&z=17&output=embed"
            />
          </motion.div>
        </section>

        <GalleryCarousel slides={gallerySlides} />
        <StoryTimeline storyMoments={storyMoments} />
        <RSVPForm onSuccess={handleGuestPass} />

        <section className="section pass-section" id="pass">
          <SectionTitle eyebrow="Digital Invitation Pass" title="Your Entry Pass" text="After sending your RSVP, your personal invitation card and QR code will appear here." />

          <motion.div className="pass-card glass-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}>
            {guestPass ? (
              <div className="pass-content">
                <div>
                  <span className="section-eyebrow">Confirmed Guest</span>
                  <h3>{guestPass.name}</h3>
                  <p>Invitation ID: {guestPass.id}</p>
                  <p>Phone Number: {guestPass.contact}</p>
                </div>
                <img src={guestPass.qrCode} alt={`QR code for ${guestPass.name}`} />
              </div>
            ) : (
              <div className="pass-placeholder">
                <p>Your invitation pass will appear here after RSVP confirmation.</p>
              </div>
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}
