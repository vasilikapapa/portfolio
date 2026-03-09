import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

import Home from "./pages/Home/Home";
import ProjectsPage from "./pages/Projects/Projects";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import WorkoutAppDemo from "./pages/WorkoutAppDemo/WorkoutAppDemo";
import ProjectDetailsPage from "./pages/ProjectDetails/ProjectDetailsPage";

/**
 * App
 *
 * Purpose:
 * - Defines all application routes
 * - Wraps pages with a shared layout (Navbar + Footer)
 */
export default function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />

        {/* Local portfolio project details page */}
        <Route path="/projects/:slug" element={<ProjectDetailsPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/workout-app" element={<WorkoutAppDemo />} />
    </Routes>
  );
}