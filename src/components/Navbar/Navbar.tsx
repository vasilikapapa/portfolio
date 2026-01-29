import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Home, User, FileText, Mail, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

/**
 * Navbar component
 *
 * Purpose:
 * - Provides primary site navigation
 * - Displays developer name and role
 * - Remains visible across all pages via AppLayout
 *
 * Technical notes:
 * - Uses NavLink to automatically apply active styles
 * - Icons improve scannability without overpowering text
 * - Active route styling handled via `nav-active` class
 * - Mobile menu uses local state (open/close)
 */
export default function Navbar(): React.ReactElement {
  /* =========================
     Mobile menu state
     ========================= */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Close the menu when:
   * - user navigates (clicks a link)
   * - user hits Escape
   */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /**
   * Toggle menu open/closed
   */
  const toggleMenu = () => setIsOpen((v) => !v);

  /**
   * Close menu (used when clicking links)
   */
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      {/* =========================
          Logo / identity section
         ========================= */}
      <div className="logo">
        {/* Developer name */}
        <h1>Vasilika Papa</h1>

        {/* Professional role */}
        <span>Full Stack Developer</span>
      </div>

      {/* =========================
          Desktop navigation links
          - Hidden on mobile via CSS
         ========================= */}
      <ul className="nav-links nav-links-desktop">
        {/* Home route (exact match required) */}
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-active" : "")}>
            <Home size={18} />
            Home
          </NavLink>
        </li>

        {/* About page */}
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-active" : "")}>
            <User size={18} />
            About Me
          </NavLink>
        </li>

        {/* Projects page */}
        <li>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-active" : "")}>
            <FileText size={18} />
            Projects
          </NavLink>
        </li>

        {/* Contact page */}
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-active" : "")}>
            <Mail size={18} />
            Contact
          </NavLink>
        </li>
      </ul>

      {/* =========================
          Mobile menu button
          - Only visible on small screens via CSS
         ========================= */}
      <button
        className="nav-toggle"
        type="button"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* =========================
          Mobile dropdown menu
          - Controlled by isOpen state
         ========================= */}
      <div
        id="mobile-nav"
        className={`nav-dropdown ${isOpen ? "open" : ""}`}
        role="menu"
        aria-hidden={!isOpen}
      >
        <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <Home size={18} /> Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <User size={18} /> About Me
        </NavLink>

        <NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <FileText size={18} /> Projects
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => (isActive ? "nav-active" : "")}>
          <Mail size={18} /> Contact
        </NavLink>
      </div>
    </nav>
  );
}
