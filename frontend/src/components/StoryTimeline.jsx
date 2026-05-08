import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function StoryTimeline({ storyMoments }) {
  return (
    <section className="section story-section" id="story">
      <SectionTitle eyebrow="Our Story" title="ፍቅራችን" />

      <div className="story-timeline">
        {storyMoments.map((moment, index) => (
          <motion.article
            key={moment.year}
            className="story-card glass-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.08 }}
          >
            <span className="story-year">{moment.year}</span>
            <h3>{moment.title}</h3>
            <p>{moment.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
