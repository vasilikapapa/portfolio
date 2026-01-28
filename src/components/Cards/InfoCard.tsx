import "./InfoCard.css";
import { cards } from "../../utils/Constants";
import { FaFileAlt, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

/**
 * InfoCard section
 * - Quick links: Resume, Projects, Contact
 * - FAANG-style: clear actions, minimal friction
 */
export default function InfoCard(): React.ReactElement {
  const getIcon = (title: string): React.ReactElement | null => {
    switch (title.toLowerCase()) {
      case "resume":
        return <FaFileAlt />;
      case "projects":
        return <FaProjectDiagram />;
      case "contact":
        return <FaEnvelope />;
      default:
        return null;
    }
  };

  const getAction = (title: string, buttonText: string): React.ReactElement => {
    const t = title.toLowerCase();

    // ✅ Resume: keep as a real link (reliable)
    if (t === "resume") {
      return (
        <a
          className="info-btn"
          href="/files/Vasilika-Papa-Resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          {buttonText}
        </a>
      );
    }

    // ✅ Projects: route link
    if (t === "projects") {
      return (
        <Link className="info-btn" to="/projects">
          {buttonText}
        </Link>
      );
    }

    // ✅ Contact: route link
    return (
      <Link className="info-btn" to="/contact">
        {buttonText}
      </Link>
    );
  };

  return (
    <section className="info-cards">
      <div className="info-grid">
        {cards.map((card) => (
          <div className="info-card" key={card.title}>
            <div className="info-card-header">
              <div className="info-icon-wrapper">{getIcon(card.title)}</div>

              <h3>{card.title}</h3>

              {/* Action */}
              {getAction(card.title, card.buttonText)}
            </div>

            <div className="info-card-body">
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
