import "./Projects.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../utils/Constants";

export default function Projects(): React.ReactElement {
  return (
    <section className="projects">
      <header className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">
          Selected work showcasing full-stack apps, UI engineering, and practical deployment.
        </p>
      </header>

      <div className="projects-grid">
        {projects.map((p) => (
          <ProjectCard key={p.id ?? p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
