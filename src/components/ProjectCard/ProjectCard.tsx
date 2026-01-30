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

    // On mobile screens we open the link directly
    if (isMobile) {
      window.open(project.liveUrl, "_blank", "noreferrer");
      return;
    }

    // On desktop we show a panel (QR + instructions)
    setShowMobilePanel((v) => !v);
  };

  /**
   * Button label:
   * - For normal web projects: "Live Demo"
   * - For mobile-only projects: "Mobile Demo" (clearer expectation)
   */
  const demoLabel = project.mobileOnly ? "Mobile Demo" : "Live Demo";

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

          {/* Live Demo / Mobile Demo */}
          {project.liveUrl ? (
            project.mobileOnly ? (
              <button
                type="button"
                className="btn"
                onClick={handleMobileDemoClick}
                aria-expanded={showMobilePanel}
                aria-controls={`mobile-panel-${project.id ?? project.title}`}
              >
                {demoLabel}
              </button>
            ) : (
              <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                {demoLabel}
              </a>
            )
          ) : (
            <button className="btn" disabled title="Add live link later">
              {demoLabel}
            </button>
          )}
        </div>

        {/* =========================
            Mobile-only demo panel
            - shows ONLY when user clicks Mobile Demo on desktop
           ========================= */}
        {project.mobileOnly && project.liveUrl && showMobilePanel && (
          <div
            id={`mobile-panel-${project.id ?? project.title}`}
            className="project-mobile-panel"
            role="region"
            aria-label="Mobile demo options"
          >
            {/* Explanation / instruction text */}
            <p className="project-note">
              {project.mobileOnlyNote ?? "Mobile only — scan the QR code or open on your phone."}
            </p>

            {/* Expo Go note and download links (only for Expo projects) */}
            {project.requiresExpoGo && (
              <div className="project-expo">
                <p className="project-expo-title">Step 1: Install Expo Go</p>

                <div className="project-expo-links">
                  <a
                    className="project-expo-link"
                    href="https://expo.dev/go"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Expo Go
                  </a>

                  <span className="project-expo-sep">•</span>

                  <a
                    className="project-expo-link"
                    href="https://apps.apple.com/app/expo-go/id982107779"
                    target="_blank"
                    rel="noreferrer"
                  >
                    iOS
                  </a>

                  <span className="project-expo-sep">•</span>

                  <a
                    className="project-expo-link"
                    href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Android
                  </a>
                </div>

                <p className="project-expo-sub">
                  Step 2: Scan the QR (camera) or open the link on your phone.
                </p>
              </div>
            )}

            {/* Button + QR row */}
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
