import React from "react";
import "./Navbar.css";
import { Home, User, FileText, Mail } from "lucide-react";
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
 */
export default function Navbar(): React.ReactElement {
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
          Primary navigation links
         ========================= */}
      <ul className="nav-links">
        {/* Home route (exact match required) */}
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            <Home size={18} />
            Home
          </NavLink>
        </li>

        {/* About page */}
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            <User size={18} />
            About Me
          </NavLink>
        </li>

        {/* Projects page */}
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            <FileText size={18} />
            Projects
          </NavLink>
        </li>

        {/* Contact page */}
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "nav-active" : "")}
          >
            <Mail size={18} />
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
