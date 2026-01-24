import "./Projects.css";

/**
 * Projects page
 * - Shown when user clicks "Projects"
 * - Displays a placeholder while projects are not ready
 */
export default function Projects(): React.ReactElement {
  return (
    <section className="projects-page">
      {/* Centered container */}
      <div className="projects-box">
        {/* Illustration / icon */}
        <img
          src="/src/images/UnderConstruction.png"
          alt="Under construction"
          className="projects-icon"
        />

        {/* Main message */}
        <h1>Under Construction</h1>

        {/* Supporting text */}
        <p>
          Projects are coming soon.  
          I’m currently building and polishing them.
        </p>
      </div>
    </section>
  );
}
