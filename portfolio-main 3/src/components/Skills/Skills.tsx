import "./Skills.css";
import { useResume } from "../../context/ResumeContext";
import { FaCloud, FaCode, FaCogs, FaDatabase, FaLaptopCode, FaLayerGroup, FaTools } from "react-icons/fa";

/**
 * Skills component
 *
 * Purpose:
 * - Displays grouped technical skills (Frontend, Backend, Database & Tools)
 * - Uses icons to visually distinguish each category
 * - Data comes from the resume (edited at /admin)
 */
export default function Skills(): React.ReactElement {
  // Skills are edited at /admin (same list as the resume page)
  const skillBoxes = useResume().resume.skills;

  /**
   * Returns an icon based on the skill category title
   *
   * This keeps icon logic separate from JSX
   * and avoids repeating conditional logic in the render.
   */
  const getIcon = (title: string): React.ReactElement => {
    const t = title.toLowerCase().replace(/[^a-z]/g, "");
    if (t.includes("language")) return <FaCode size={18} />;
    if (t.includes("backend")) return <FaCogs size={18} />;
    if (t.includes("frontend")) return <FaLaptopCode size={18} />;
    if (t.includes("database")) return <FaDatabase size={18} />;
    if (t.includes("cloud") || t.includes("devops")) return <FaCloud size={18} />;
    if (t.includes("tool") || t.includes("practice")) return <FaTools size={18} />;
    return <FaLayerGroup size={18} />;
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
          {skillBoxes.map((box, index) => (
            <div
              key={box.title + index}
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
                {box.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
