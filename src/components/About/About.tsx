import "./About.css";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function About(): React.ReactElement {
  return (
    <section className="about-page" id="about">
      <div className="about-card">
        {/* Header */}
        <header className="about-header">
          <div className="about-header-left">
            <h1 className="about-name">Vasilika Papa</h1>
            <p className="about-role">Full Stack Developer</p>

            <div className="about-links">
              <a className="about-link" href="mailto:you@email.com">
                <FaEnvelope /> you@email.com
              </a>
              <a className="about-link" href="https://github.com/yourname" target="_blank" rel="noreferrer">
                <FaGithub /> GitHub
              </a>
              <a className="about-link" href="https://linkedin.com/in/yourname" target="_blank" rel="noreferrer">
                <FaLinkedin /> LinkedIn
              </a>
            </div>
          </div>

          <a className="about-download" href="/resume.pdf" download>
            <FaDownload /> Download PDF
          </a>
        </header>

        <div className="about-divider" />

        {/* Summary */}
        <section className="about-section">
          <h2 className="about-section-title">Summary</h2>
          <p className="about-text">
            Full Stack Developer focused on building clean, scalable, user-centered applications.
            Comfortable across frontend (React + TypeScript) and backend (Java + Spring Boot), with
            databases (MySQL/Prisma) and deployment workflows.
          </p>
        </section>

        {/* Skills */}
        <section className="about-section">
          <h2 className="about-section-title">Skills</h2>

          <div className="about-grid">
            <div className="about-block">
              <h3>Frontend</h3>
              <ul>
                <li>React, TypeScript, JavaScript</li>
                <li>HTML, CSS</li>
                <li>Responsive UI, component design</li>
              </ul>
            </div>

            <div className="about-block">
              <h3>Backend</h3>
              <ul>
                <li>Java, Spring Boot</li>
                <li>REST APIs, Authentication</li>
                <li>Validation, error handling</li>
              </ul>
            </div>

            <div className="about-block">
              <h3>Database & Tools</h3>
              <ul>
                <li>MySQL, Prisma/JPA</li>
                <li>Git & GitHub, Postman</li>
                <li>Vercel / Render deployments</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="about-section">
          <h2 className="about-section-title">Experience</h2>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Software Development Intern</h3>
              <span className="about-meta">Remote • 2024–Present</span>
            </div>
            <ul>
              <li>Built UI components and improved layouts in React + TypeScript.</li>
              <li>Worked with APIs, debugging, and feature iteration with a team.</li>
              <li>Focused on clean UI, maintainability, and user-friendly design.</li>
            </ul>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Customer Service / Server</h3>
              <span className="about-meta">Part-time • 2023–Present</span>
            </div>
            <ul>
              <li>Strengthened communication, time management, and multitasking under pressure.</li>
              <li>Improved customer satisfaction through efficient, friendly service.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="about-section">
          <h2 className="about-section-title">Education</h2>
          <div className="about-item">
            <div className="about-item-top">
              <h3>M.S. Computer Science</h3>
              <span className="about-meta">University of Missouri–St. Louis</span>
            </div>
            <p className="about-text">Currently pursuing a Master’s degree in Computer Science.</p>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>B.S. Computer Science</h3>
              <span className="about-meta">Completed</span>
            </div>
            <p className="about-text">Bachelor’s degree in Computer Science.</p>
          </div>
        </section>
      </div>
    </section>
  );
}
