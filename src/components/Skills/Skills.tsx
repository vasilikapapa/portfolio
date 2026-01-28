import "./Skills.css";
import { skillBoxes } from "../../utils/Constants";
import { FaCode, FaCogs, FaDatabase } from "react-icons/fa";

/**
 * Skills component
 *
 * Purpose:
 * - Displays grouped technical skills (Frontend, Backend, Database & Tools)
 * - Uses icons to visually distinguish each category
 * - Data-driven via the `skillBoxes` constant for easy maintenance
 */
export default function Skills(): React.ReactElement {
  /**
   * Returns an icon based on the skill category title
   *
   * This keeps icon logic separate from JSX
   * and avoids repeating conditional logic in the render.
   */
  const getIcon = (title: string): React.ReactElement | null => {
    switch (title.toLowerCase()) {
      case "frontend":
        return <FaCode size={18} />;
      case "backend":
        return <FaCogs size={18} />;
      case "database & tools":
        return <FaDatabase size={18} />;
      default:
        return null;
    }
  };

  return (
    <section className="skills" id="skills">
      {/* =========================
          Outer container
         ========================= */}
      <div className="skills-wrapper">
        {/* 
          Section heading
          - Hidden visually via CSS
          - Kept for accessibility and semantic structure
        */}
        <h2 className="skills-title">&lt;/&gt; Skills</h2>

        {/* =========================
            Skills grid
           ========================= */}
        <div className="skills-boxes">
          {skillBoxes.map((box) => (
            <div
              key={box.title}
              className={`
                skill-box 
                skill-${box.title.toLowerCase().replace(/[^a-z]+/g, "-")}
              `}
            >
              {/* Card header: icon + category title */}
              <div className="skill-box-header">
                {getIcon(box.title)}
                <h3>{box.title}</h3>
              </div>

              {/* List of individual skills */}
              <ul>
                {box.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
