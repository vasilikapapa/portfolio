import "./ProjectCard.css";
import type { Project } from "../../types/Projects";
import { useEffect, useMemo, useState } from "react";

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
 * - Mobile-only demos open a modal with Expo/QR instructions
 */
export default function ProjectCard({ project }: Props): React.ReactElement {
  /**
   * Modal state:
   * - Used for mobile-only projects (Expo demos)
   * - Keeps the card clean and makes the demo experience clear
   */
  const [showDemoModal, setShowDemoModal] = useState(false);

  /**
   * Detect mobile-ish screens (simple + good enough for this use case)
   */
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 900px)").matches;
  }, []);

  /**
   * Close modal helper
   */
  const closeModal = () => setShowDemoModal(false);

  /**
   * Lock background scroll when modal is open (nice UX)
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
   * Close on Escape
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
   * Handle demo click:
   * - For normal web projects: open link
   * - For mobile-only Expo projects: open modal (desktop + mobile)
   */
  const handleDemoClick = () => {
    if (!project.liveUrl) return;

    // Expo / mobile-only: show modal first (best UX)
    if (project.mobileOnly && project.requiresExpoGo) {
      setShowDemoModal(true);
      return;
    }

    // Other mobile-only projects (without Expo requirement):
    // - Desktop: you could still show modal/QR if you want
    // - For now: open link on mobile, toggle modal on desktop
    if (project.mobileOnly) {
      if (isMobile) {
        window.open(project.liveUrl, "_blank", "noreferrer");
      } else {
        setShowDemoModal(true);
      }
      return;
    }

    // Standard web demo
    window.open(project.liveUrl, "_blank", "noreferrer");
  };

  /**
   * Button label:
   * - For normal web projects: "Live Demo"
   * - For mobile-only projects: "Mobile Demo"
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

          {/* Demo button */}
          {project.liveUrl ? (
            <button type="button" className="btn" onClick={handleDemoClick}>
              {demoLabel}
            </button>
          ) : (
            <button className="btn" disabled title="Add live link later">
              {demoLabel}
            </button>
          )}
        </div>
      </div>

      {/* =========================
          Demo Modal (Expo / Mobile-only)
         ========================= */}
      {showDemoModal && project.liveUrl && (
        <div className="modal-overlay" role="presentation" onClick={closeModal}>
          {/* Stop click bubbling so clicking inside modal doesn't close it */}
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

              <button className="modal-close" type="button" onClick={closeModal} aria-label="Close">
                ✕
              </button>
            </div>

            {/* Short instruction */}
            <p className="modal-note">
              {project.mobileOnlyNote ??
                "This is a mobile demo. Install Expo Go, then open the link on your phone or scan the QR code."}
            </p>

            {/* Expo Go requirement block */}
            {project.requiresExpoGo && (
              <div className="modal-expo">
                <p className="modal-expo-title">Step 1: Install Expo Go</p>
                <div className="modal-expo-links">
                  <a className="modal-link" href="https://expo.dev/go" target="_blank" rel="noreferrer">
                    Expo Go
                  </a>
                  <span className="modal-sep">•</span>
                  <a
                    className="modal-link"
                    href="https://apps.apple.com/app/expo-go/id982107779"
                    target="_blank"
                    rel="noreferrer"
                  >
                    iOS
                  </a>
                  <span className="modal-sep">•</span>
                  <a
                    className="modal-link"
                    href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Android
                  </a>
                </div>
                <p className="modal-expo-sub">Step 2: Open the demo link on your phone (or scan QR).</p>
              </div>
            )}

            {/* Actions + QR */}
            <div className="modal-body">
              <div className="modal-actions">
                <a className="btn primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Open Demo
                </a>

                {/* Optional: keep a visible “Get Expo Go” quick button */}
                {project.requiresExpoGo && (
                  <a className="btn" href="https://expo.dev/go" target="_blank" rel="noreferrer">
                    Get Expo Go
                  </a>
                )}
              </div>

              {/* QR shown when available (very useful on desktop) */}
              {project.qrImage && (
                <div className="modal-qr">
                  <img src={project.qrImage} alt={`${project.title} QR code`} />
                  <span className="modal-qr-label">Scan to open</span>
                </div>
              )}
            </div>

            {/* Tiny footer hint (mobile) */}
            <p className="modal-foot">
              Tip: If you’re on desktop, scan the QR with your phone camera. If you’re on mobile, tap “Open Demo”.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
