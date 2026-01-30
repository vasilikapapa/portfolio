import "./About.css";
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * About Component
 *
 * Purpose:
 * - Resume-style About page that mirrors the 1-page resume PDF
 * - Includes contact links + a direct download CTA
 * - Keeps sections scannable and consistent with the resume layout
 */
export default function About(): React.ReactElement {
  return (
    <section className="about-page" id="about">
      <div className="about-card">
        {/* Header */}
        <header className="about-header">
          <div className="about-header-left">
            <h1 className="about-name">Vasilika Papa</h1>
            <p className="about-role">Full Stack Software Engineer</p>

            {/* Quick-access links (same as resume header) */}
            <div className="about-links">
              <a className="about-link" href="mailto:vasilika.papa108@gmail.com">
                <FaEnvelope /> vasilika.papa108@gmail.com
              </a>

              <a
                className="about-link"
                href="https://github.com/vasilikapapa"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub /> github.com/vasilikapapa
              </a>

              <a
                className="about-link"
                href="https://linkedin.com/in/vasilika-papa"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin /> linkedin.com/in/vasilika-papa
              </a>
            </div>
          </div>

          {/* Download CTA
               */}
              <a
                className="about-download"
                href="/Vasilika_Papa_Resume.pdf"
                target="_blank"
                rel="noreferrer"
               >
  <FaDownload /> Open Resume (PDF)
</a>
        </header>

        <div className="about-divider" />

        {/* Summary (matches resume) */}
        <section className="about-section">
          <h2 className="about-section-title">Summary</h2>
          <p className="about-text">
            Full Stack Software Engineer with hands-on experience building and deploying web
            applications using React, TypeScript, Java, and Spring Boot. Strong foundation in REST
            APIs, relational databases, and cloud deployment, with a focus on clean architecture and
            user-centered design.
          </p>
        </section>

        {/* Education (matches resume order + dates) */}
        <section className="about-section">
          <h2 className="about-section-title">Education</h2>

          <div className="about-item">
            <div className="about-item-top">
              <h3>M.S. Computer Science</h3>
              <span className="about-meta">University of Missouri–St. Louis • 2022–2024</span>
            </div>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>B.A. Computer Engineering</h3>
              <span className="about-meta">Polytechnic University of Tirana • 2016–2019</span>
            </div>
          </div>
        </section>

        {/* Technical Skills*/}
        <section className="about-section">
          <h2 className="about-section-title">Technical Skills</h2>

          <div className="about-grid">
            <div className="about-block">
              <h3>Frontend</h3>
              <ul>
                <li>React, TypeScript, JavaScript</li>
                <li>HTML, CSS</li>
              </ul>
            </div>

            <div className="about-block">
              <h3>Backend</h3>
              <ul>
                <li>Java, Spring Boot</li>
                <li>REST APIs</li>
              </ul>
            </div>

            <div className="about-block">
              <h3>Database & Tools</h3>
              <ul>
                <li>MySQL, PostgreSQL, Prisma, JPA</li>
                <li>Git, GitHub, Postman</li>
                <li>Vercel, Render</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Internship Experience  */}
        <section className="about-section">
          <h2 className="about-section-title">Internship Experience</h2>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Full Stack Developer Intern — GBCS Group</h3>
              <span className="about-meta">Calgary, Canada • Mar 2024–Oct 2024</span>
            </div>
            <ul>
              <li>
                Built a full-featured proposal management web application using Java, Spring Boot,
                and MySQL.
              </li>
              <li>
                Designed and implemented REST APIs supporting frontend–backend communication.
              </li>
              <li>
                Migrated database from Firebase to Azure MySQL using Prisma ORM, improving
                scalability.
              </li>
              <li>Optimized SQL queries to reduce latency and improve performance.</li>
              <li>Participated in Agile sprints, daily standups, and peer code reviews.</li>
            </ul>
          </div>
        </section>

        {/* Projects & Training  */}
        <section className="about-section">
          <h2 className="about-section-title">Projects & Training</h2>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Web Restaurant Application — Full Stack Web Project (React, TypeScript)</h3>
              <span className="about-meta">
                <a className="about-mini-link" href="https://github.com/vasilikapapa/restaurant-website" target="_blank" rel="noreferrer">
                  View Code
                </a>
                <span className="about-dot">•</span>
                <a className="about-mini-link" href="https://restaurant-website-nine-gold.vercel.app/" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </span>
            </div>
            <ul>
              <li>Developed a responsive restaurant website with modern UI components and clean navigation.</li>
              <li>Implemented dynamic menu rendering and frontend–backend integration.</li>
              <li>Focused on usability, accessibility, and mobile responsiveness.</li>
            </ul>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Mobile Workout App — Mobile Application (React Native, Expo)</h3>
          
              <span className="about-meta">
                <a className="about-mini-link" href="https://github.com/vasilikapapa/workout-app" target="_blank" rel="noreferrer">
                  View Code
                </a>
                <span className="about-dot">•</span>
                <a className="about-mini-link" href="https://expo.dev/preview/update?message=Login%26Register+Image+Background&updateRuntimeVersion=1.0.0&createdAt=2026-01-29T15%3A00%3A54.678Z&slug=exp&projectId=3a9b7182-6fa1-43e2-8a52-af08253b3eb6&group=d10fbf89-7f85-4bf4-940a-f07e4293bb89" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </span>
            </div>
            <ul>
              <li>Built a workout tracking app with structured workout plans and intuitive navigation.</li>
              <li>Tested on real devices using Expo Go.</li>
              <li>Designed scalable components with a strong UX focus.</li>
            </ul>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Portfolio Website — Personal Project (React, TypeScript)</h3>
         
              <span className="about-meta">
                <a className="about-mini-link" href="https://github.com/vasilikapapa/portfolio" target="_blank" rel="noreferrer">
                  View Code
                </a>
                <span className="about-dot">•</span>
                <a className="about-mini-link" href="https://portfolio-psi-cyan-67.vercel.app/" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              </span>
            </div>
            <ul>
              <li>Designed and developed a professional portfolio showcasing projects and skills.</li>
              <li>Built reusable UI components and deployed using Vercel.</li>
            </ul>
          </div>

          <div className="about-item">
            <div className="about-item-top">
              <h3>Full Stack Web Development Student — LaunchCode LC10</h3>
              <span className="about-meta">May 2022 – Dec 2022</span>
            </div>
            <ul>
              <li>Java, Spring Boot, REST APIs, Git, Agile.</li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
