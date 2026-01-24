import React from "react";
import "./Hero.css";
import { FaDownload } from "react-icons/fa";
// import myImage from "../../images/Profile.jpg";

/**
 * Hero component
 * - Top section of the page
 * - Introduces you with a short message
 * - Optional profile image on the side
 */
export default function Hero(): React.ReactElement {
  return (
    <section className="hero" id="hero">
      {/* Left side: text content */}
      <div className="hero-text">
        <h2>Hi, I'm Vasilika!</h2>
        <p>
          Full Stack Developer passionate about building clean,
          scalable, and user-focused applications.
        </p>
      </div>

      {/* Right side: image area (optional) */}
      <div className="hero-image">
        {/* 
          Uncomment when you add a profile image:

          <img src={myImage} alt="Vasilika Papa" />
        */}
      </div>
    </section>
  );
}
