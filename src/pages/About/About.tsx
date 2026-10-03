import { Link } from "react-router-dom";
import { PencilLine } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { useSession } from "../../lib/useSession";
import ResumeCards from "./ResumeCards";
import ResumeJourney from "./ResumeJourney";
import "./EditButton.css";

/**
 * About (Resume) page
 *
 * Shows one of two designs, chosen in /admin → Profile → Page design.
 * Both render the same ResumeData. When you're signed in, an
 * "Edit resume" button appears in the corner (visitors never see it).
 */
export default function About(): React.ReactElement {
  const { resume } = useResume();
  const session = useSession();

  return (
    <>
      {resume.layout === "cards" ? <ResumeCards /> : <ResumeJourney />}
      {session && (
        <Link className="edit-fab" to="/admin">
          <PencilLine size={17} aria-hidden /> Edit resume
        </Link>
      )}
    </>
  );
}
