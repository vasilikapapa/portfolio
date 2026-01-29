import "./ProjectCard.css";
import type { Project } from "../../types/Projects";
import { useMemo, useState } from "react";

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
 * - Mobile-only demos open link on mobile; show QR panel on desktop
 */
export default function ProjectCard({ project }: Props): React.ReactElement {
  /**
   * Desktop-only: toggle a "Live Demo" panel for mobile-only apps
   * - closed by default to keep the card clean
   */
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  /**
   * Detect mobile-ish screens (simple + good enough for this use case)
   * - If on mobile, we open the link directly
   * - If on desktop, we show the QR panel
   */
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px)").matches;
  }, []);

  /**
   * Handle Live Demo click for mobile-only projects:
   * - Mobile: open the link
   * - Desktop: toggle QR panel
   */
  const handleMobileDemoClick = () => {
    if (!project.liveUrl) return;

    if (isMobile) {
      window.open(project.liveUrl, "_blank", "noreferrer");
      return;
    }

    setShowMobilePanel((v) => !v);
  };

  return (
    <article className="project-card">
      {/* =========================
          Project image / media
         ========================= */}
      <div className="project-media">
        {/* Lazy loading improves performance when multiple cards are on screen */}
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      {/* =========================
          Project content
         ========================= */}
      <div className="project-body">
        {/* Title and subtitle */}
        <div className="project-top">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        {/* Project description */}
        <p className="project-desc">{project.description}</p>

        {/* Tech stack pills */}
        <div className="project-tech" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <span className="pill" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        {/* =========================
            Action buttons
           ========================= */}
        <div className="project-actions">
          {/* View Code (primary) */}
          {project.repoUrl ? (
            <a className="btn primary" href={project.repoUrl} target="_blank" rel="noreferrer">
              View Code
            </a>
          ) : (
            <button className="btn primary" disabled title="Add GitHub link later">
              View Code
            </button>
          )}

          {/* Live Demo */}
          {project.liveUrl ? (
            project.mobileOnly ? (
              <button
                type="button"
                className="btn"
                onClick={handleMobileDemoClick}
                aria-expanded={showMobilePanel}
              >
                Live Demo
              </button>
            ) : (
              <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )
          ) : (
            <button className="btn" disabled title="Add live link later">
              Live Demo
            </button>
          )}
        </div>

        {/* =========================
            Mobile-only demo panel
            - shows ONLY when user clicks Live Demo on desktop
           ========================= */}
        {project.mobileOnly && project.liveUrl && showMobilePanel && (
          <div className="project-mobile-panel" role="region" aria-label="Mobile demo options">
            <p className="project-note">
              {project.mobileOnlyNote ?? "Mobile only — scan the QR code or open on your phone."}
            </p>

            <div className="project-mobile-row">
              <a className="btn mobile" href={project.liveUrl} target="_blank" rel="noreferrer">
                Open on Phone
              </a>

              {project.qrImage && (
                <div className="project-qr">
                  <img src={project.qrImage} alt={`${project.title} QR code`} />
                  <span className="project-qr-label">Scan to open</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
