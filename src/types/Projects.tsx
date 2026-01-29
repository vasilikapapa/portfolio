// Defines the structure for a single portfolio project card
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;     
  liveUrl?: string;  
  repoUrl?: string;  
   /** If true, the liveUrl is meant for mobile only (Expo / deep link) */
  mobileOnly?: boolean;

  /** Optional QR code image (best placed in /public/images/qr-*.png) */
  qrImage?: string;

  /** Optional helper text shown near the QR */
  mobileOnlyNote?: string;
}
