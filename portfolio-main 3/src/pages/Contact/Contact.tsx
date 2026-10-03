import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

/**
 * Form state type
 */
type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact page
 * - Shows contact methods always
 * - Shows form only when coming from a CTA (?form=1)
 * - Uses Formspree to send emails without redirect
 */
export default function Contact(): React.ReactElement {
  const [searchParams] = useSearchParams();
  const showForm = searchParams.get("form") === "1";

  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mreeebjw", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => setStatus("idle");

  return (
    <section className="contact-page" id="contact">
      <div className="contact-wrap">
        {/* Header */}
        <p className="contact-kicker">GET IN TOUCH</p>
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">
          Reach out anytime — I usually respond within 24–48 hours.
        </p>

        {/* Contact methods */}
        <div className="contact-icons">
          <div className="contact-item">
            <div className="contact-circle" aria-hidden="true">
              <FaEnvelope />
            </div>
            <div className="contact-label">EMAIL</div>
            <a className="contact-link" href="mailto:vasilika.papa108@gmail.com">
              vasilika.papa108@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-circle" aria-hidden="true">
              <FaPhoneAlt />
            </div>
            <div className="contact-label">PHONE</div>
            <a className="contact-link" href="tel:+13146857301">
              +1 (314) 685-7301
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-circle" aria-hidden="true">
              <FaLinkedin />
            </div>
            <div className="contact-label">LINKEDIN</div>
            <a
              className="contact-link"
              href="https://www.linkedin.com/in/vasilika-papa/"
              target="_blank"
              rel="noreferrer"
            >
              Connect with me
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-circle" aria-hidden="true">
              <FaGithub />
            </div>
            <div className="contact-label">GITHUB</div>
            <a
              className="contact-link"
              href="https://github.com/vasilikapapa"
              target="_blank"
              rel="noreferrer"
            >
              View my repos
            </a>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <>
            <div className="contact-divider" />

            <div className="contact-form-wrap">
              <h2 className="contact-form-title">Send me a message</h2>

              {status === "sent" ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <h3 className="contact-success-title">Message sent ✅</h3>
                  <p className="contact-success-text">
                    Thank you! I’ll get back to you as soon as I can.
                  </p>
                  <button className="contact-btn" type="button" onClick={resetForm}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label>
                    Name
                    <input
                      name="name"
                      type="text"
                      required
                      disabled={status === "sending"}
                      autoComplete="name"
                    />
                  </label>

                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      disabled={status === "sending"}
                      autoComplete="email"
                    />
                  </label>

                  <label>
                    Message
                    <textarea
                      name="message"
                      rows={6}
                      required
                      disabled={status === "sending"}
                    />
                  </label>

                  <button className="contact-btn" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  {status === "error" && (
                    <p className="error-msg" role="alert">
                      Something went wrong ❌ Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
