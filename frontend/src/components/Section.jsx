import { motion } from "framer-motion";

const variants = {
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 }
  }
};

export default function Section({ id, kicker, title, children, variant = "up" }) {
  const selected = variants[variant] ?? variants.up;
  return (
    <section id={id} className="section">
      <motion.div
        className="section-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={selected}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </motion.div>
      <motion.div
        className="section-body"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={selected}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
