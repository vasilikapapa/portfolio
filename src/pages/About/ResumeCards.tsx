import "./About.css";
import { FaDownload, FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone, FaPrint } from "react-icons/fa";
import type { Experience } from "../../types/Resume";
import { useResume } from "../../context/ResumeContext";

/** Shows a URL without "https://" and a trailing slash, e.g. github.com/name */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/**
 * ResumeCards: "Cards" resume design
 *
 * Purpose:
 * - Resume-style page, rendered entirely from the ResumeData stored in
 *   Supabase (edited at /admin), with a built-in default as fallback
 * - Two-column layout: experience and projects on the left; skills,
 *   education and training in a sidebar
 * - Print-friendly: "Print / Save PDF" produces a clean light version
 */
export default function ResumeCards(): React.ReactElement {
  const { resume: r } = useResume();

  return (
    <section className="resume" id="about">
      {/* =========================
          Header
         ========================= */}
      <header className="resume-header">
        <div className="resume-identity">
          <p className="resume-eyebrow">Resume</p>
          <h1 className="resume-name">{r.name}</h1>
          <p className="resume-role">{r.role}</p>

          <ul className="resume-contact">
            {r.location && (
              <li>
                <FaMapMarkerAlt aria-hidden /> {r.location}
              </li>
            )}
            {r.email && (
              <li>
                <a href={`mailto:${r.email}`}>
                  <FaEnvelope aria-hidden /> {r.email}
                </a>
              </li>
            )}
            {r.phone && (
              <li>
                <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}>
                  <FaPhone aria-hidden /> {r.phone}
                </a>
              </li>
            )}
            {r.github && (
              <li>
                <a href={r.github} target="_blank" rel="noreferrer">
                  <FaGithub aria-hidden /> {prettyUrl(r.github)}
                </a>
              </li>
            )}
            {r.linkedin && (
              <li>
                <a href={r.linkedin} target="_blank" rel="noreferrer">
                  <FaLinkedin aria-hidden /> {prettyUrl(r.linkedin)}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="resume-actions">
          {r.resumeUrl && (
            <a className="resume-btn primary" href={r.resumeUrl} target="_blank" rel="noreferrer">
              <FaDownload aria-hidden /> Download PDF
            </a>
          )}
          <button className="resume-btn" type="button" onClick={() => window.print()}>
            <FaPrint aria-hidden /> Print
          </button>
        </div>
      </header>

      {r.summary && <p className="resume-summary">{r.summary}</p>}

      <div className="resume-grid">
        {/* =========================
            Main column
           ========================= */}
        <div className="resume-main">
          <ExperienceSection label="Experience" items={r.experience} />

          {r.projects.length > 0 && (
            <section className="resume-section">
              <h2 className="resume-section-title">Projects</h2>
              <div className="project-list">
                {r.projects.map((p, i) => (
                  <article className="project-entry" key={`${p.name}-${i}`}>
                    <div className="entry-head">
                      <h3>
                        {p.name}
                        {p.kind && <span className="entry-org"> · {p.kind}</span>}
                      </h3>
                      <span className="entry-links">
                        {p.repoUrl && (
                          <a href={p.repoUrl} target="_blank" rel="noreferrer">
                            <FaGithub aria-hidden /> Code
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer">
                            <FaExternalLinkAlt aria-hidden /> Live
                          </a>
                        )}
                      </span>
                    </div>
                    {p.bullets.length > 0 && (
                      <ul className="entry-bullets">
                        {p.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {p.tech.length > 0 && (
                      <ul className="chips" aria-label="Technologies">
                        {p.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
          <ExperienceSection label="Additional experience" items={r.additionalExperience ?? []} />
        </div>

        {/* =========================
            Sidebar
           ========================= */}
        <aside className="resume-side">
          {r.skills.length > 0 && (
            <section className="resume-section side-card">
              <h2 className="resume-section-title">Skills</h2>
              {r.skills.map((group, i) => (
                <div className="skill-group" key={`${group.title}-${i}`}>
                  <h3>{group.title}</h3>
                  <ul className="chips">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {r.education.length > 0 && (
            <section className="resume-section side-card">
              <h2 className="resume-section-title">Education</h2>
              {r.education.map((e, i) => (
                <div className="side-entry" key={`${e.degree}-${i}`}>
                  <h3>{e.degree}</h3>
                  <p>{e.school}</p>
                  {e.dates && <span className="entry-dates">{e.dates}</span>}
                </div>
              ))}
            </section>
          )}

          {r.training.length > 0 && (
            <section className="resume-section side-card">
              <h2 className="resume-section-title">Training</h2>
              {r.training.map((t, i) => (
                <div className="side-entry" key={`${t.title}-${i}`}>
                  <h3>{t.title}</h3>
                  <p>{t.org}</p>
                  {t.details && <p className="side-details">{t.details}</p>}
                  {t.dates && <span className="entry-dates">{t.dates}</span>}
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
    </section>
  );
}

/** Timeline-style experience section (used for "Experience" and "Additional experience"). */
function ExperienceSection({ label, items }: { label: string; items: Experience[] }): React.ReactElement | null {
  if (items.length === 0) return null;
  return (
    <section className="resume-section">
      <h2 className="resume-section-title">{label}</h2>
      <ol className="timeline">
        {items.map((job, i) => (
          <li className="timeline-item" key={`${job.company}-${i}`}>
            <div className="entry-head">
              {job.roles && job.roles.length > 0 ? (
                <h3>{job.company}</h3>
              ) : (
                <h3>
                  {job.title}
                  {job.company && <span className="entry-org"> · {job.company}</span>}
                </h3>
              )}
              <span className="entry-dates">{job.dates}</span>
            </div>
            {job.location && <p className="entry-sub">{job.location}</p>}
            {job.roles && job.roles.length > 0 && (
              <ul className="entry-roles" aria-label="Roles">
                {job.roles.map((role, j) => (
                  <li key={j}>{role}</li>
                ))}
              </ul>
            )}
            {job.bullets.length > 0 && (
              <ul className="entry-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
