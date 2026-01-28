import "./ProjectCard.css";
import type { Project } from "../../types/Project";

/**
 * Props for ProjectCard
 * - Receives a single project object
 * - Project data is defined via a shared TypeScript type
 */
type Props = {
  project: Project;
};

/**
 * ProjectCard component
 *
 * Purpose:
 * - Displays one project in a reusable card layout
 * - Used on the Projects page inside a responsive grid
 *
 * Design considerations:
 * - Image is placed at the top for quick visual context
 * - Content flows from title → description → tech → actions
 * - Buttons follow a FAANG-style hierarchy (code > live demo)
 */
export default function ProjectCard({ project }: Props): JSX.Element {
  return (
    <article className="project-card">
      {/* =========================
          Project image / media
         ========================= */}
      <div className="project-media">
        {/* 
          Lazy loading improves performance when
          multiple project cards are rendered 
        */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
        />
      </div>

      {/* =========================
          Project content
         ========================= */}
      <div className="project-body">
        {/* Title and subtitle */}
        <div className="project-top">
          {/* Project name */}
          <h3 className="project-title">{project.title}</h3>

          {/* Short contextual subtitle (e.g. stack or purpose) */}
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        {/* Project description */}
        <p className="project-desc">{project.description}</p>

        {/* Tech stack pills */}
        <div className="project-tech" aria-label="Tech stack">
          {project.tech.map((t) => (
            <span className="pill" key={t}>
              {t}
            </span>
          ))}
        </div>

        {/* =========================
            Action buttons
           ========================= */}
        <div className="project-actions">
          {/* 
            FAANG-style choice:
            - Emphasize source code slightly more than live demo
          */}
          {project.repoUrl ? (
            <a
              className="btn primary"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Code
            </a>
          ) : (
            <button
              className="btn primary"
              disabled
              title="Add GitHub link later"
            >
              View Code
            </button>
          )}

          {/* Live demo link (optional) */}
          {project.liveUrl ? (
            <a
              className="btn"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          ) : (
            <button
              className="btn"
              disabled
              title="Add live link later"
            >
              Live Demo
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
