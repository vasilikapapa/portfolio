import "./WorkoutAppDemo.css";
import { ExternalLink, Smartphone, QrCode, Download } from "lucide-react";

/**
 * WorkoutAppDemo page
 *
 * Purpose:
 * - Acts as a safe, resume-friendly landing page for a mobile-only app
 * - Explains how to open the app using Expo Go
 * - Works on desktop AND mobile (no broken links)
 *
 * Why this page exists:
 * - Expo preview links often do not work on desktop browsers
 * - Recruiters usually open links on desktop first
 * - This page clearly explains the steps and looks intentional & professional
 */
export default function WorkoutAppDemo(): React.ReactElement {
  const expoPreviewUrl =
    "https://expo.dev/preview/update?message=Login%26Register+Image+Background&updateRuntimeVersion=1.0.0&createdAt=2026-01-29T15%3A00%3A54.678Z&slug=exp&projectId=3a9b7182-6fa1-43e2-8a52-af08253b3eb6&group=d10fbf89-7f85-4bf4-940a-f07e4293bb89";

  return (
    <section className="workout-demo">
      <div className="workout-demo-card">
        {/* =========================
           Header
        ========================= */}
        <p className="demo-eyebrow">MOBILE APPLICATION</p>
        <h1 className="demo-title">Workout Planner App</h1>
        <p className="demo-subtitle">
          This project is a <strong>mobile-only React Native app</strong>.
          To view it, please follow the steps below.
        </p>

        {/* =========================
           Step-by-step instructions
        ========================= */}
        <div className="demo-steps">
          {/* Step 1 */}
          <div className="demo-step">
            <div className="step-icon">
              <Download />
            </div>
            <div className="step-content">
              <h3>1. Install Expo Go</h3>
              <p>
                Download <strong>Expo Go</strong> from the App Store or Google Play.
                It’s required to run the app.
              </p>

              <div className="store-links">
                <a
                  href="https://apps.apple.com/app/expo-go/id982107779"
                  target="_blank"
                  rel="noreferrer"
                >
                  App Store
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=host.exp.exponent"
                  target="_blank"
                  rel="noreferrer"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="demo-step">
            <div className="step-icon">
              <Smartphone />
            </div>
            <div className="step-content">
              <h3>2. Open the App</h3>
              <p>
                Once Expo Go is installed, open the app using one of the options below.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
           Actions (link + QR)
        ========================= */}
        <div className="demo-actions">
          {/* Open on phone */}
          <a
            className="demo-btn primary"
            href={expoPreviewUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink />
            Open on Phone
          </a>

          {/* QR Code block */}
          <div className="demo-qr">
            <QrCode />
            <img
              src="/images/qr-workout.png"
              alt="Workout App QR code"
            />
            <span>Scan with Expo Go</span>
          </div>
        </div>

        {/* =========================
           Footer note
        ========================= */}
        <p className="demo-note">
          💡 If this page is opened on a phone and Expo Go is not installed,
          you will be prompted to download it automatically.
        </p>
      </div>
    </section>
  );
}
