import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout/AppLayout";

import Home from "./pages/Home/Home";
import ProjectsPage from "./pages/Projects/Projects";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";

/**
 * App
 *
 * Purpose:
 * - Defines all application routes
 * - Wraps pages with a shared layout (Navbar + Footer)
 *
 * Routing strategy:
 * - AppLayout is used as a layout route
 * - All pages render inside <Outlet /> from AppLayout
 */
export default function App(): React.ReactElement {
  return (
    <Routes>
      {/* Layout route */}
      <Route element={<AppLayout />}>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Projects page */}
        <Route path="/projects" element={<ProjectsPage />} />

        {/* About page */}
        <Route path="/about" element={<AboutPage />} />

        {/* Contact page */}
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
