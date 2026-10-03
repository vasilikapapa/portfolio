import { ReactElement } from "react";
import Hero from "../../components/Hero/Hero";
import Skills from "../../components/Skills/Skills";
import "./Home.css";

/**
 * Home page
 *
 * Purpose:
 * - Acts as the landing page of the portfolio
 * - Introduces the developer (Hero)
 * - Highlights core technical skills
 *
 * Structure:
 * - Sections are stacked vertically
 * - Each section is wrapped for consistent spacing
 */
export default function Home(): React.ReactElement {
  return (
    <div className="home">
      {/* =========================
          Hero section
         ========================= */}
      <section className="home-section">
        <Hero />
      </section>

      {/* =========================
          Skills section
         ========================= */}
      <section className="home-section">
        {/* Section heading */}
        <header className="home-header">
          <h2 className="home-title">Skills</h2>
          <p className="home-subtitle">
            Tools and technologies I use to build clean, scalable applications.
          </p>
        </header>

        {/* Skills grid */}
        <Skills />
      </section>
    </div>
  );
}
