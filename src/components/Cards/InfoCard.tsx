import "./InfoCard.css";
import { cards } from "../../utils/Constants";
import { FaFileAlt, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/**
 * InfoCard section
 * Displays cards like: Resume, Projects, Contact
 * Each card has:
 *  - Icon
 *  - Title
 *  - Description
 *  - Action button
 */
export default function InfoCard(): React.ReactElement {
  // Used to navigate between pages
  const navigate = useNavigate();

  /**
   * Returns an icon based on card title
   */
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

  /**
   * Handles what happens when a card button is clicked
   */
  const handleClick = (title: string) => {
    const t = title.toLowerCase();

    // Download resume PDF
    if (t === "resume") {
      const a = document.createElement("a");
      a.href = "/resume.pdf"; 
      a.download = "Vasilika_Papa_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }

    // Go to Projects page
    if (t === "projects") {
      navigate("/projects");
      return;
    }

    // Go to Contact page and show form
    if (t === "contact") {
      navigate("/contact?form=1");
      return;
    }
  };

  return (
    <section className="info-cards">
      <div className="info-grid">
        {/* Loop through all card data */}
        {cards.map((card) => (
          <div className="info-card" key={card.title}>
            {/* Card header: icon, title, button */}
            <div className="info-card-header">
              <div className="info-icon-wrapper">
                {getIcon(card.title)}
              </div>

              <h3>{card.title}</h3>

              <button
                className="info-btn"
                type="button"
                onClick={() => handleClick(card.title)}
              >
                {card.buttonText}
              </button>
            </div>

            {/* Card description */}
            <div className="info-card-body">
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
