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
  liveUrl?: string;

  mobileOnly?: boolean;
  requiresExpoGo?: boolean;
  mobileOnlyNote?: string;
  qrImage?: string;
};