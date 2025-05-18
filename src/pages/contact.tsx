import React, { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="contact-page">
      <h1>Contact / Appointment</h1>

      {submitted ? (
        <p className="thank-you">Thank you! Your message has been sent.</p>
      ) : (
        <form
          className="contact-form"
          action="https://formspree.io/f/mwpoyqnk"
          method="POST"
          onSubmit={() => setSubmitted(true)}
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
          />
          <button type="submit">Send</button>
        </form>
      )}
    </main>
  );
}
