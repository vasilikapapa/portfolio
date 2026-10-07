/**
 * Project type
 *
 * Purpose:
 * - Defines the shape of one project used in the portfolio frontend
 */
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  slug: string;

  repoUrl?: string;
  /** Source code is in a private repo: shows a "Private repo" label instead of a View Code link. */
  repoPrivate?: boolean;
  liveUrl?: string;

  mobileOnly?: boolean;
  requiresExpoGo?: boolean;
  mobileOnlyNote?: string;
  qrImage?: string;
};