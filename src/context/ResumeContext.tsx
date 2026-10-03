import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultResume } from "../data/defaultResume";
import { loadResume } from "../lib/resumeStore";
import type { ResumeData } from "../types/Resume";

type ResumeContextValue = {
  resume: ResumeData;
  loading: boolean;
  /** Replace the in-memory resume (used after the admin saves). */
  setResume: (resume: ResumeData) => void;
  reload: () => Promise<void>;
};

const ResumeContext = createContext<ResumeContextValue | null>(null);

/**
 * ResumeProvider
 *
 * Loads the resume once for the whole app so the About page, Home skills and
 * Hero all show the same, latest content.
 */
export function ResumeProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setResume(await loadResume());
    } catch (err) {
      // Keep showing the default resume if the database can't be reached.
      console.warn("Could not load resume, showing default content.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return (
    <ResumeContext.Provider value={{ resume, loading, setResume, reload }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used inside ResumeProvider");
  return ctx;
}
