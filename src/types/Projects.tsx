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
}
