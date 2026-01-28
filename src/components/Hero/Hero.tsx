import "./Hero.css";
import { Link } from "react-router-dom";

/**
 * Hero component
 *
 * Purpose:
 * - Acts as the primary introduction on the Home page
 * - Clearly communicates role, focus, and tech stack
 * - Provides strong CTAs for Projects, Contact, and Resume
 *
 * Design decisions:
 * - Split layout: text on the left, profile image on the right
 * - Quick facts replace a heavy info panel to keep the hero lightweight
 * - Buttons use consistent global styles defined in Hero.css
 */
export default function Hero(): React.ReactElement {
  return (
    <section className="hero">
      {/* =========================
          Left column: text content
         ========================= */}
      <div className="hero-left">
        {/* Eyebrow label for role */}
        <p className="hero-eyebrow">Full Stack Developer</p>

        {/* Main headline */}
        <h1 className="hero-title">Hi, I’m Vasilika.</h1>

        {/* Short professional summary */}
        <p className="hero-lead">
          I build clean, scalable web and mobile applications with React + TypeScript
          and modern backend APIs.
        </p>

        {/* Call-to-action buttons */}
        <div className="hero-actions">
          {/* Navigate to Projects page */}
          <Link className="btn primary" to="/projects">
            View Projects
          </Link>

          {/* Navigate to Contact page with form visible */}
          <Link className="btn" to="/contact?form=1">
            Contact
          </Link>

          {/* Open resume PDF in a new tab */}
          <a
            className="btn ghost"
            href="/files/Vasilika-Papa-Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>

        {/* Quick personal facts (compact and readable) */}
        <ul className="hero-facts">
          <li>📍 United States</li>
          <li>🎓 M.S. CS (UMSL)</li>
          <li>⚙️ React • TypeScript • Java</li>
        </ul>
      </div>

      {/* =========================
          Right column: profile image
         ========================= */}
      <div className="hero-photo" aria-label="Profile photo">
        {/* Profile image stored in public/images */}
        <img src="/images/profile.jpg" alt="Vasilika Papa" />
      </div>
    </section>
  );
}
