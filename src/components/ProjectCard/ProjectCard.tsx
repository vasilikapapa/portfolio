import "./ProjectCard.css";
import type { Project } from "../../types/Projects";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Props for ProjectCard
 */
type Props = {
  project: Project;
};

/**
 * ProjectCard component
 *
 * Purpose:
 * - Shows one project card
 * - Clicking anywhere on the card opens the local project details page
 * - Inner buttons still work independently
 * - Demo behavior remains unchanged
 */
export default function ProjectCard({ project }: Props): React.ReactElement {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  /**
   * Detect mobile-ish screens for demo behavior
   */
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px)").matches;
  }, []);

  /**
   * Local portfolio route for details page
   */
  const projectDetailsHref = `/projects/${project.slug}`;

  /**
   * Open details page
   */
  const openProjectDetails = () => {
    navigate(projectDetailsHref);
  };

  /**
   * Close modal helper
   */
  const closeModal = () => setShowDemoModal(false);

  /**
   * Lock background scroll when modal is open
   */
  useEffect(() => {
    if (!showDemoModal) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [showDemoModal]);

  /**
   * Close demo modal on Escape
   */
  useEffect(() => {
    if (!showDemoModal) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showDemoModal]);

  /**
   * Allow keyboard access for the whole clickable card
   */
  const handleCardKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProjectDetails();
    }
  };

  /**
   * Demo click behavior
   */
  const handleDemoClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!project.liveUrl) return;

    if (project.mobileOnly && project.requiresExpoGo) {
      setShowDemoModal(true);
      return;
    }

    if (project.mobileOnly) {
      if (isMobile) {
        window.open(project.liveUrl, "_blank", "noreferrer");
      } else {
        setShowDemoModal(true);
      }
      return;
    }

    window.open(project.liveUrl, "_blank", "noreferrer");
  };

  const demoLabel = project.mobileOnly ? "Mobile Demo" : "Live Demo";

  return (
    <article
      className="project-card"
      role="link"
      tabIndex={0}
      onClick={openProjectDetails}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open details for ${project.title}`}
      style={{ cursor: "pointer" }}
    >
      <div className="project-media">
        <img src={project.image} alt={project.title} loading="lazy" />
      </div>

      <div className="project-body">
        <div className="project-top">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>

        <p className="project-desc">{project.description}</p>

        <div className="project-tech" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <span className="pill" key={tech}>
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.repoUrl ? (
            <a
              className="btn primary"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </a>
          ) : (
            <button
              className="btn primary"
              disabled
              title="Add GitHub link later"
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </button>
          )}

          {project.liveUrl ? (
            <button type="button" className="btn" onClick={handleDemoClick}>
              {demoLabel}
            </button>
          ) : (
            <button
              className="btn"
              disabled
              title="Add live link later"
              onClick={(e) => e.stopPropagation()}
            >
              {demoLabel}
            </button>
          )}

          <button
            type="button"
            className="btn"
            title="Open project roadmap details"
            onClick={(e) => {
              e.stopPropagation();
              openProjectDetails();
            }}
          >
            View Roadmap
          </button>
        </div>
      </div>

      {showDemoModal && project.liveUrl && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} demo`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-titleblock">
                <p className="modal-kicker">MOBILE DEMO</p>
                <h3 className="modal-title">{project.title}</h3>
              </div>

              <button
                className="modal-close"
                type="button"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="modal-note">
              {project.mobileOnlyNote ??
                "This is a mobile demo. Install Expo Go, then open the link on your phone or scan the QR code."}
            </p>

            {project.requiresExpoGo && (
              <div className="modal-expo">
                <p className="modal-expo-title">Step 1: Install Expo Go</p>

                <div className="modal-expo-links">
                  <a
                    className="modal-link"
                    href="https://expo.dev/go"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Expo Go
                  </a>
                  <span className="modal-sep">•</span>
                  <a
                    className="modal-link"
                    href="https://apps.apple.com/app/expo-go/id982107779"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    iOS
                  </a>
                  <span className="modal-sep">•</span>
                  <a
                    className="modal-link"
                    href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Android
                  </a>
                </div>

                <p className="modal-expo-sub">
                  Step 2: Open the demo link on your phone (or scan QR).
                </p>
              </div>
            )}

            <div className="modal-body">
              <div className="modal-actions">
                <a
                  className="btn primary"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Open Demo
                </a>

                {project.requiresExpoGo && (
                  <a
                    className="btn"
                    href="https://expo.dev/go"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Get Expo Go
                  </a>
                )}
              </div>

              {project.qrImage && (
                <div className="modal-qr">
                  <img src={project.qrImage} alt={`${project.title} QR code`} />
                  <span className="modal-qr-label">Scan to open</span>
                </div>
              )}
            </div>

            <p className="modal-foot">
              Tip: If you’re on desktop, scan the QR with your phone camera. If you’re on mobile, tap
              “Open Demo”.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}