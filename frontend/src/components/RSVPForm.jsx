import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { submitRsvp } from "../services/api";
import RoseBurst from "./RoseBurst";
import SectionTitle from "./SectionTitle";

const initialForm = {
  name: "",
  contact: "",
};

export default function RSVPForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showBurst, setShowBurst] = useState(false);

  useEffect(() => {
    if (!showBurst) {
      return undefined;
    }

    const timer = setTimeout(() => setShowBurst(false), 1600);
    return () => clearTimeout(timer);
  }, [showBurst]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await submitRsvp(form);
      setSuccessMessage(response.message);
      setShowBurst(true);
      setForm(initialForm);
      onSuccess(response.guest);
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setLoading(false);
    }
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <section className="section rsvp-section" id="rsvp">
      <SectionTitle
        eyebrow="RSVP"
        title="Send Your RSVP"
        text="Please share your name and phone number. Your invitation pass will appear right after submission."
      />

      <motion.form
        className="rsvp-form glass-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
      >
        <RoseBurst active={showBurst} />
        <label>
          <span>Full Name</span>
          <input name="name" value={form.name} onChange={updateField} placeholder="Your name" required />
        </label>

        <label>
          <span>Phone Number</span>
          <input
            name="contact"
            value={form.contact}
            onChange={updateField}
            placeholder="+251..."
            required
          />
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Sending RSVP..." : "Submit RSVP"}
        </button>

        {error ? <p className="form-message error">{error}</p> : null}
        {successMessage ? <p className="form-message success">{successMessage}</p> : null}
      </motion.form>
    </section>
  );
}
