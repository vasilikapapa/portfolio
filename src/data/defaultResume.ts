import type { ResumeData } from "../types/Resume";

/**
 * Default resume content
 *
 * Used when Supabase is not configured yet, when the database has no saved
 * resume, or if loading fails, so the site never shows an empty page.
 * Once you save from /admin, the saved version replaces this one.
 */
export const defaultResume: ResumeData = {
  layout: "journey",
  name: "Vasilika Papa",
  role: "Full Stack Software Engineer",
  location: "United States",
  email: "vasilika.papa108@gmail.com",
  github: "https://github.com/vasilikapapa",
  linkedin: "https://linkedin.com/in/vasilika-papa",
  resumeUrl: "/Vasilika_Papa_Resume.pdf",
  summary:
    "Full Stack Software Engineer with hands-on experience building and deploying web applications using React, TypeScript, Java, and Spring Boot. Strong foundation in REST APIs, relational databases, and cloud deployment, with a focus on clean architecture and user-centered design.",
  skills: [
    { title: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Responsive Design"] },
    { title: "Backend", items: ["Java", "Spring Boot", "REST APIs", "Authentication"] },
    {
      title: "Database & Tools",
      items: ["MySQL", "PostgreSQL", "Prisma", "JPA", "Git & GitHub", "Postman", "Vercel", "Render"],
    },
  ],
  experience: [
    {
      title: "Full Stack Developer Intern",
      company: "GBCS Group",
      location: "Calgary, Canada",
      dates: "Mar 2024 – Oct 2024",
      bullets: [
        "Built a full-featured proposal management web application using Java, Spring Boot, and MySQL.",
        "Designed and implemented REST APIs supporting frontend–backend communication.",
        "Migrated the database from Firebase to Azure MySQL using Prisma ORM, improving scalability.",
        "Optimized SQL queries to reduce latency and improve performance.",
        "Participated in Agile sprints, daily standups, and peer code reviews.",
      ],
    },
  ],
  projects: [
    {
      name: "Portfolio Roadmap Tracker",
      kind: "Full Stack Application",
      tech: ["React", "TypeScript", "Java", "Spring Boot", "PostgreSQL", "Docker"],
      repoUrl: "https://github.com/vasilikapapa/portfolio-roadmap-tracker",
      liveUrl: "https://portfolio-roadmap-tracker.vercel.app",
      bullets: [
        "Built a full-stack project tracking platform with a React and TypeScript frontend and a Java Spring Boot backend.",
        "Implemented REST APIs, authentication, and an admin editing mode for managing projects and updates.",
        "Integrated a PostgreSQL database and deployed with Docker, Vercel, and Render.",
        "Designed a responsive UI with reusable components and clean architecture.",
      ],
    },
    {
      name: "Restaurant Website",
      kind: "Web Application",
      tech: ["React", "TypeScript", "Vite"],
      repoUrl: "https://github.com/vasilikapapa/restaurant-website",
      liveUrl: "https://restaurant-website-nine-gold.vercel.app/",
      bullets: [
        "Developed a responsive restaurant website with modern UI components and clean navigation.",
        "Implemented dynamic menu rendering and frontend–backend integration.",
        "Focused on usability, accessibility, and mobile responsiveness.",
      ],
    },
    {
      name: "Mobile Workout App",
      kind: "Mobile Application",
      tech: ["React Native", "Expo", "TypeScript"],
      repoUrl: "https://github.com/vasilikapapa/workout-app",
      liveUrl: "/workout-app",
      bullets: [
        "Built a workout tracking app with structured workout plans and intuitive navigation.",
        "Tested on real devices using Expo Go.",
        "Designed scalable components with a strong UX focus.",
      ],
    },
    {
      name: "Portfolio Website",
      kind: "Personal Project",
      tech: ["React", "TypeScript", "Supabase"],
      repoUrl: "https://github.com/vasilikapapa/portfolio",
      liveUrl: "https://portfolio-psi-cyan-67.vercel.app/",
      bullets: [
        "Designed and developed a professional portfolio showcasing projects and skills.",
        "Added a sign-in admin dashboard so resume content is edited from the UI and stored in Supabase.",
      ],
    },
  ],
  education: [
    { degree: "M.S. Computer Science", school: "University of Missouri–St. Louis", dates: "2022 – 2024" },
    { degree: "B.A. Computer Engineering", school: "Polytechnic University of Tirana", dates: "2016 – 2019" },
  ],
  training: [
    {
      title: "Full Stack Web Development",
      org: "LaunchCode LC10",
      dates: "May 2022 – Dec 2022",
      details: "Java, Spring Boot, REST APIs, Git, Agile",
    },
  ],
};
