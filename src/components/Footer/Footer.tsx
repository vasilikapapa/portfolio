import "./Footer.css";

/**
 * Footer component
 *
 * Purpose:
 * - Displayed on every page via AppLayout
 * - Provides secondary navigation and contact links
 * - Kept intentionally minimal and unobtrusive (FAANG-style)
 *
 * Design notes:
 * - Text is low-contrast to avoid competing with main content
 * - Links are simple text links (no buttons)
 * - Layout aligns perfectly with Navbar and main content
 */
export default function Footer(): React.ReactElement {
  return (
    <footer className="footer">
      {/* Copyright information with dynamic year */}
      <p className="footer-copy">
        © {new Date().getFullYear()} Vasilika Papa
      </p>

      {/* Footer navigation links */}
      <nav className="footer-links" aria-label="Footer links">
        {/* GitHub profile */}
        <a
          href="https://github.com/vasilikapapa"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        {/* LinkedIn profile */}
        <a
          href="https://www.linkedin.com/in/vasilikapapa/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>

        {/* Email contact */}
        <a href="mailto:vasilika.papa108@gmail.com">
          Email
        </a>
      </nav>
    </footer>
  );
}
