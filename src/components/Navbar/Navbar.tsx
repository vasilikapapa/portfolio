import React from "react";
import "./Navbar.css";
import { Home, User, FileText, Mail } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Navbar component
 * - Displays site title and role
 * - Provides navigation using React Router
 * - Stays visible across all pages
 */
export default function Navbar(): JSX.Element {
  return (
    <nav className="navbar">
      {/* Logo / identity section */}
      <div className="logo">
        <h1>Vasilika Papa</h1>
        <span>Full Stack Developer</span>
      </div>

      {/* Navigation links */}
      <ul className="nav-links">
        {/* Home page */}
        <li>
          <Link to="/">
            <Home size={18} /> Home
          </Link>
        </li>

        {/* About page */}
        <li>
          <Link to="/about">
            <User size={18} /> About Me
          </Link>
        </li>

        {/* Projects page */}
        <li>
          <Link to="/projects">
            <FileText size={18} /> Projects
          </Link>
        </li>

        {/* Contact page */}
        <li>
          <Link to="/contact">
            <Mail size={18} /> Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
