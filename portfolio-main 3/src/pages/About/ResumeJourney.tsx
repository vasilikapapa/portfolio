import "./ResumeJourney.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useResume } from "../../context/ResumeContext";
import type { Experience, ResumeData } from "../../types/Resume";

/** github.com/name instead of https://github.com/name/ */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/** First 4-digit year in a date string like "Mar 2024 – Oct 2024". */
function startYear(dates: string): number | null {
  const m = dates.match(/\d{4}/);
  return m ? Number(m[0]) : null;
}

/** Sort key from the start date: year plus month when one is written before it. */
function sortKey(dates: string, year: number): number {
  const m = dates.toLowerCase().match(/([a-z]{3})[a-z]*\.?\s+\d{4}/);
  const month = m ? MONTHS.indexOf(m[1]) : -1;
  return year * 12 + (month >= 0 ? month : 8); // no month: assume a fall start
}

type Stop = { year: number; key: number; title: string; place: string };

/**
 * Builds the journey line from education, training and experience, ordered
 * by start year. Entries without a year in their dates are skipped.
 */
function journeyStops(r: ResumeData): Stop[] {
  const stops: Stop[] = [];
  r.education.forEach((e) => {
    const y = startYear(e.dates);
    if (y)
      stops.push({
        year: y,
        key: sortKey(e.dates, y),
        title: e.degree,
        place: e.school,
      });
  });
  r.training.forEach((t) => {
    const y = startYear(t.dates);
    if (y)
      stops.push({
        year: y,
        key: sortKey(t.dates, y),
        title: t.title,
        place: t.org,
      });
  });
  [...r.experience, ...(r.additionalExperience ?? [])].forEach((x) => {
    const y = startYear(x.dates);
    if (y)
      stops.push({
        year: y,
        key: sortKey(x.dates, y),
        title: x.title,
        place: x.company,
      });
  });
  return stops.sort((a, b) => a.key - b.key);
}

/**
 * ResumeJourney: "Journey" resume design
 *
 * - Large name, then a timeline of the path so far, generated from dates
 * - Every section shares one grid: section name on the left, content right
 * - No cards or pills; hierarchy comes from type and spacing
 */
export default function ResumeJourney(): React.ReactElement {
  const { resume: r } = useResume();
  const stops = journeyStops(r);

  return (
    <article className="rj">
      {/* =========================
          Intro
         ========================= */}
      <header className="rj-intro">
        <h1 className="rj-name">{r.name}</h1>
        <div className="rj-intro-row">
          <p className="rj-role">
            {r.role}
            {r.location && (
              <span className="rj-location">, based in {r.location}</span>
            )}
          </p>
          <div className="rj-actions">
            {r.resumeUrl && (
              <a
                className="rj-btn rj-btn-solid"
                href={r.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            )}
            <button
              className="rj-btn"
              type="button"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
        </div>
        <ul className="rj-contact">
          {r.email && (
            <li>
              <a href={`mailto:${r.email}`}>{r.email}</a>
            </li>
          )}
          {r.phone && (
            <li>
              <a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}>{r.phone}</a>
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
      </header>

      {/* =========================
          Journey line
         ========================= */}
      {stops.length > 1 && (
        <ol className="rj-journey" aria-label="Path so far">
          {stops.map((s, i) => (
            <li
              key={`${s.year}-${i}`}
              className={
                i === stops.length - 1
                  ? "is-latest"
                  : i === stops.length - 2
                    ? "is-before-latest"
                    : ""
              }
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="rj-year">{s.year}</span>
              <span className="rj-dot" aria-hidden />
              <span className="rj-stop-title">{s.title}</span>
              <span className="rj-stop-place">{s.place}</span>
            </li>
          ))}
        </ol>
      )}

      {r.summary && <p className="rj-summary">{r.summary}</p>}

      {/* =========================
          Experience
         ========================= */}
      <ExperienceSection label="Experience" items={r.experience} />

      {/* =========================
          Projects
         ========================= */}
      {r.projects.length > 0 && (
        <section className="rj-section">
          <h2 className="rj-label">Projects</h2>
          <div className="rj-body rj-projects">
            {r.projects.map((p, i) => (
              <div className="rj-project" key={`${p.name}-${i}`}>
                <h3>{p.name}</h3>
                {p.kind && <p className="rj-where">{p.kind}</p>}
                {p.bullets.length > 0 && (
                  <ul className="rj-points">
                    {p.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
                {p.tech.length > 0 && (
                  <p className="rj-tech">{p.tech.join(", ")}</p>
                )}
                {(p.repoUrl || p.liveUrl) && (
                  <p className="rj-links">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer">
                        Open live demo
                      </a>
                    )}
                    {p.repoUrl && (
                      <a href={p.repoUrl} target="_blank" rel="noreferrer">
                        View code
                      </a>
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <ExperienceSection
        label="Additional experience"
        items={r.additionalExperience ?? []}
      />

      {/* =========================
          Skills
         ========================= */}
      {r.skills.length > 0 && (
        <section className="rj-section">
          <h2 className="rj-label">Skills</h2>
          <dl className="rj-body rj-skills">
            {r.skills.map((g, i) => (
              <div key={`${g.title}-${i}`}>
                <dt>{g.title}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* =========================
          Education + training
         ========================= */}
      {(r.education.length > 0 || r.training.length > 0) && (
        <section className="rj-section">
          <h2 className="rj-label">Education</h2>
          <div className="rj-body rj-edu">
            {r.education.map((e, i) => (
              <div key={`e-${i}`}>
                <h3>{e.degree}</h3>
                <p className="rj-where">{e.school}</p>
                {e.dates && <p className="rj-when">{e.dates}</p>}
              </div>
            ))}
            {r.training.map((t, i) => (
              <div key={`t-${i}`}>
                <h3>{t.title}</h3>
                <p className="rj-where">{t.org}</p>
                {t.details && <p className="rj-tech">{t.details}</p>}
                {t.dates && <p className="rj-when">{t.dates}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/** One experience section (used for "Experience" and "Additional experience"). */
function ExperienceSection({
  label,
  items,
}: {
  label: string;
  items: Experience[];
}): React.ReactElement | null {
  if (items.length === 0) return null;
  return (
    <section className="rj-section">
      <h2 className="rj-label">{label}</h2>
      <div className="rj-body">
        {items.map((x, i) => {
          // With a role history, the company is the heading and the roles list the titles
          const hasRoles = !!x.roles && x.roles.length > 0;
          return (
            <div className="rj-entry" key={`${x.company}-${i}`}>
              <div className="rj-entry-head">
                <h3>{hasRoles ? x.company : x.title}</h3>
                {x.dates && <span className="rj-when">{x.dates}</span>}
              </div>
              <p className="rj-where">
                {(hasRoles ? [x.location] : [x.company, x.location])
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {x.roles && x.roles.length > 0 && (
                <ul className="rj-roles" aria-label="Roles">
                  {x.roles.map((role, j) => (
                    <li key={j}>{role}</li>
                  ))}
                </ul>
              )}
              {x.bullets.length > 0 && (
                <ul className="rj-points">
                  {x.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
