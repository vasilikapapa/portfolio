import "./Footer.css";

/**
 * Footer component
 * - Stays at the bottom of the page
 * - Shows copyright year automatically
 * - Shows social / contact links
 */
export default function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      {/* Copyright text with current year */}
      <p>© {new Date().getFullYear()} Vasilika Papa</p>

      {/* External and contact links */}
      <div className="footer-links">
        {/* GitHub profile */}
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          GitHub
        </a>

        {/* LinkedIn profile */}
        <a href="https://github.com/vasilikapapa" target="_blank" rel="noreferrer">
          LinkedIn
        </a>

        {/* Email link */}
        <a href="mailto:vasilika.papa108@gmail.com">
          Email
        </a>
      </div>
    </footer>
  );
}
