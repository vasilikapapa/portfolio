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
 * - Shows form only when coming from InfoCards (?form=1)
 * - Uses Formspree to send emails without redirect
 */
export default function Contact(): React.ReactElement {
  // Read URL query params
  const [searchParams] = useSearchParams();
  const showForm = searchParams.get("form") === "1";

  // Track form status
  const [status, setStatus] = useState<Status>("idle");

  /**
   * Handle form submission
   */
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
        form.reset();        // clear inputs
        setStatus("sent");   // show success screen
      } else {
        setStatus("error");  // show error message
      }
    } catch {
      setStatus("error");
    }
  };

  /**
   * Reset form to allow sending another message
   */
  const resetForm = () => setStatus("idle");

  return (
    <section className="contact-page" id="contact">
      <div className="contact-wrap">
        {/* Page header */}
        <p className="contact-kicker">GET IN TOUCH</p>
        <h1 className="contact-title">Contact</h1>
        <p className="contact-subtitle">
          Reach out anytime — I usually respond within 24–48 hours.
        </p>

        {/* Contact methods */}
        <div className="contact-icons">
          <div className="contact-item">
            <div className="contact-circle">
              <FaEnvelope />
            </div>
            <div className="contact-label">EMAIL</div>
            <a className="contact-link" href="mailto:vasilika.papa108@gmail.com">
              vasilika.papa108@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-circle">
              <FaPhoneAlt />
            </div>
            <div className="contact-label">PHONE</div>
            <a className="contact-link" href="tel:+13146857301">
              +1 (314) 685-7301
            </a>
          </div>

          <div className="contact-item">
            <div className="contact-circle">
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
            <div className="contact-circle">
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

        {/* Show form ONLY when coming from InfoCards */}
        {showForm && (
          <>
            <div className="contact-divider" />

            <div className="contact-form-wrap">
              <h2 className="contact-form-title">Send me a message</h2>

              {/* If sent: show success panel */}
              {status === "sent" ? (
                <div className="contact-success">
                  <h3 className="contact-success-title">Message sent ✅</h3>
                  <p className="contact-success-text">
                    Thank you! I’ll get back to you as soon as I can.
                  </p>
                  <button
                    className="contact-btn"
                    type="button"
                    onClick={resetForm}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                /* Otherwise show the form */
                <form className="contact-form" onSubmit={handleSubmit}>
                  <label>
                    Name
                    <input
                      name="name"
                      type="text"
                      required
                      disabled={status === "sending"}
                    />
                  </label>

                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      required
                      disabled={status === "sending"}
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

                  <button
                    className="contact-btn"
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  {/* Error message */}
                  {status === "error" && (
                    <p className="error-msg">
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
