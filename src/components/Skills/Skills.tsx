import "./Skills.css";
import { skillBoxes } from "../../utils/Constants";
import { FaCode, FaCogs, FaDatabase } from "react-icons/fa";

/**
 * Skills component
 * - Displays grouped technical skills
 * - Uses icons based on category
 * - Data comes from skillBoxes constant
 */
export default function Skills(): JSX.Element {
  /**
   * Returns an icon based on the skill box title
   */
  const getIcon = (title: string) => {
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
      {/* Outer container */}
      <div className="skills-wrapper">
        {/* Section heading */}
        <h2 className="skills-title">&lt;/&gt; Skills</h2>

        {/* Grid of skill cards */}
        <div className="skills-boxes">
          {skillBoxes.map((box) => (
            <div className="skill-box" key={box.title}>
              {/* Card header with icon and title */}
              <div className="skill-box-header">
                {getIcon(box.title)}
                <h3>{box.title}</h3>
              </div>

              {/* List of skills */}
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
