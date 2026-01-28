import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./AppLayout.css";

/**
 * AppLayout
 *
 * Purpose:
 * - Provides a shared layout for all pages
 * - Keeps Navbar and Footer visible across routes
 * - Centers page content while allowing full-bleed sections
 *
 * How it works:
 * - `Outlet` renders the active route (Home, Projects, Contact, etc.)
 * - `app-bar` spans full width (edge-to-edge)
 * - `app-inner` constrains content to a max width and centers it
 */
export default function AppLayout(): React.ReactElement {
  return (
    <div className="app">
      {/* =========================
          Global navigation bar
         ========================= */}
      <header className="app-bar">
        {/* Centers navbar content */}
        <div className="app-inner">
          <Navbar />
        </div>
      </header>

      {/* =========================
          Main page content
         ========================= */}
      <main className="app-main">
        {/* 
          app-inner keeps page content centered
          Outlet renders the current route
        */}
        <div className="app-inner">
          <Outlet />
        </div>
      </main>

      {/* =========================
          Global footer
         ========================= */}
      <footer className="app-bar">
        {/* Centers footer content */}
        <div className="app-inner">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
