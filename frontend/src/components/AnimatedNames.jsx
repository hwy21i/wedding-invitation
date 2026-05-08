import { motion } from "framer-motion";

function AnimatedWord({ text, delay = 0 }) {
  return (
    <span className="animated-word" aria-label={text}>
      {text.split("").map((character, index) => (
        <motion.span
          key={`${text}-${index}`}
          className="animated-letter"
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: delay + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export default function AnimatedNames({ firstName = "Adel", secondName = "Noah" }) {
  return (
    <div className="animated-names" aria-label={`${firstName} and ${secondName}`}>
      <AnimatedWord text={firstName} delay={0.1} />
      <motion.span
        className="ampersand-script"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.55 }}
      >
        &
      </motion.span>
      <AnimatedWord text={secondName} delay={0.8} />
    </div>
  );
}
