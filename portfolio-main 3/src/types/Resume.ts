/**
 * Resume data model
 *
 * Everything shown on the About (resume) page and the Home skills section
 * comes from one ResumeData object. It is stored in Supabase as JSON and
 * edited from the /admin page, so no code changes are needed to update it.
 */

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Education = {
  degree: string;
  school: string;
  dates: string;
};

export type Experience = {
  title: string;
  company: string;
  location: string;
  dates: string;
  /** Optional role history at the same company, e.g. "Back End Developer Intern · Mar 2024 – Jul 2024". */
  roles?: string[];
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  kind: string;
  tech: string[];
  repoUrl: string;
  liveUrl: string;
  bullets: string[];
};

export type Training = {
  title: string;
  org: string;
  dates: string;
  details: string;
};

/** Which resume page design to show. */
export type ResumeLayout = "journey" | "cards";

export type ResumeData = {
  /** Page design, switchable from /admin. */
  layout: ResumeLayout;
  name: string;
  role: string;
  location: string;
  email: string;
  /** Shown on the resume page as a call link. Leave empty to hide. */
  phone: string;
  github: string;
  linkedin: string;
  /** Link to the downloadable PDF (a path in /public or any URL). Leave empty to hide. */
  resumeUrl: string;
  summary: string;
  skills: SkillGroup[];
  experience: Experience[];
  /** Non-engineering work, shown in its own section. */
  additionalExperience: Experience[];
  projects: ResumeProject[];
  education: Education[];
  training: Training[];
};
