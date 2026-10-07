import type { ResumeData } from "../types/Resume";

/**
 * Default resume content
 *
 * Used when Supabase is not configured yet, when the database has no saved
 * resume, or if loading fails, so the site never shows an empty page.
 * Once you save from /admin, the saved version replaces this one.
 * In /admin → Profile, "Use built-in resume" loads this version into the editor.
 */
export const defaultResume: ResumeData = {
  layout: "journey",
  name: "Vasilika Papa",
  role: "Full Stack Software Engineer",
  location: "St. Louis, MO",
  email: "vasilika.papa108@gmail.com",
  phone: "314 685 7301",
  github: "https://github.com/vasilikapapa",
  linkedin: "https://linkedin.com/in/vasilika-papa",
  resumeUrl: "/Vasilika_Papa_Resume.pdf",
  summary:
    "Full stack software engineer driven by curiosity about how things work and how to make them work better, with hands-on experience building and deploying web applications using React, TypeScript, Java, and Spring Boot. Strong foundation in REST APIs, relational databases, and cloud deployment, with a focus on clean architecture and user-centered design. Thrives on collaborative teams where feedback is welcomed and everyone learns from one another.",
  skills: [
    { title: "Languages", items: ["Java", "C#", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
    {
      title: "Back End",
      items: ["Spring Boot", "ASP.NET MVC (.NET)", "REST API design", "Spring Data JPA", "Authentication"],
    },
    {
      title: "Front End",
      items: ["React", "React Native (Expo)", "Responsive design", "Reusable component architecture"],
    },
    {
      title: "Databases",
      items: ["PostgreSQL", "MySQL", "Azure Database for MySQL", "Prisma ORM", "Query optimization"],
    },
    { title: "Cloud & DevOps", items: ["Azure", "Docker", "Vercel", "Render", "Git", "GitHub"] },
    { title: "Tools & Practices", items: ["Postman", "Agile/Scrum", "Code reviews", "Debugging"] },
  ],
  experience: [
    {
      title: "Full Stack Developer Intern",
      company: "GBCS Group",
      location: "Remote (Calgary, AB, Canada)",
      dates: "Mar 2024 – Oct 2024",
      roles: ["Full Stack Developer Intern · Jul 2024 – Oct 2024", "Back End Developer Intern · Mar 2024 – Jul 2024"],
      bullets: [
        "Promoted from back-end to full stack developer after four months while building a proposal management platform",
        "Designed and implemented REST APIs and integrated them with the front end",
        "Migrated the application database from Firebase to Azure Database for MySQL using Prisma ORM, and optimized SQL queries",
        "Shipped features in Agile sprints with daily standups and peer code reviews",
      ],
    },
    {
      title: "Back End Developer Intern",
      company: "One Albania",
      location: "Tirana, Albania",
      dates: "May 2019 – Aug 2019",
      bullets: [
        "Developed back-end features for a web application in C# using ASP.NET MVC on the .NET framework",
        "Implemented controllers, models, and views following the Model-View-Controller pattern, and debugged and tested code with the development team",
      ],
    },
  ],
  projects: [
    {
      name: "Flip Deal Finder",
      kind: "Real-Estate Deal Sourcing Tool",
      tech: ["Python", "Streamlit", "Pandas", "NumPy", "IMAP"],
      repoUrl: "",
      liveUrl: "https://flip-deal-findergit-atbyqb4vjz2wjvloamtorn.streamlit.app/",
      bullets: [
        "Built a Streamlit app that scans an email inbox over IMAP for off-market wholesale real estate deals, extracting address, price, and property details from message text, attachments, and linked pages",
        "Estimates After Repair Value (ARV) from uploaded sold-comp data (Redfin or MLS exports) and calculates each deal's maximum offer and spread",
        "Presents deals in a searchable, sortable table with Excel export and links out to Zillow and other listing sites",
      ],
    },
    {
      name: "Job Tracker",
      kind: "Web Application",
      tech: ["JavaScript", "Supabase", "PostgreSQL", "SheetJS"],
      repoUrl: "",
      liveUrl: "https://job-tracker-tau-rouge.vercel.app/",
      bullets: [
        "Built a job application tracker that reads the company and position from a pasted job link and tracks each application from Saved to Offer",
        "Added email sign-in with Supabase and PostgreSQL row-level security so each user sees only their own applications",
        "Automated follow-up reminders based on application status, with Excel import and export",
      ],
    },
    {
      name: "Portfolio Roadmap Tracker",
      kind: "Full Stack Application",
      tech: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Docker"],
      repoUrl: "https://github.com/vasilikapapa/portfolio-roadmap-tracker",
      liveUrl: "https://portfolio-roadmap-tracker.vercel.app",
      bullets: [
        "Built a full-stack project tracking platform with a Spring Boot REST API and a React/TypeScript front end",
        "Implemented user authentication and an admin mode for editing projects and posting updates",
        "Containerized with Docker and deployed the API to Render and the UI to Vercel, backed by PostgreSQL",
      ],
    },
    {
      name: "Restaurant Web App",
      kind: "Web Application",
      tech: ["React", "TypeScript"],
      repoUrl: "https://github.com/vasilikapapa/restaurant-website",
      liveUrl: "https://restaurant-website-nine-gold.vercel.app/",
      bullets: [
        "Built a responsive restaurant site with a dynamically rendered menu and API integration, designed for accessibility and mobile use",
      ],
    },
    {
      name: "Workout Tracker Mobile App",
      kind: "Mobile Application",
      tech: ["React Native", "Expo"],
      repoUrl: "https://github.com/vasilikapapa/workout-app",
      liveUrl: "/workout-app",
      bullets: [
        "Built a workout tracking app with structured training plans and simple navigation, tested on physical devices via Expo Go",
      ],
    },
    {
      name: "Portfolio Website",
      kind: "Personal Project",
      tech: ["React", "TypeScript"],
      repoUrl: "https://github.com/vasilikapapa/portfolio",
      liveUrl: "https://portfolio-psi-cyan-67.vercel.app/",
      bullets: ["Designed and deployed a personal portfolio on Vercel built from reusable UI components"],
    },
  ],
  additionalExperience: [
    {
      title: "Mathematics Tutor",
      company: "St. Louis Community College",
      location: "St. Louis, MO",
      dates: "Jan 2025 – Aug 2026",
      bullets: [
        "Tutored college students in mathematics through worked examples and step-by-step problem solving",
        "Supported coursework and exam preparation, adapting explanations to each student's learning needs",
      ],
    },
    {
      title: "Technical Support Specialist (Part-Time)",
      company: "Square",
      location: "St. Louis, MO",
      dates: "Mar 2022 – Dec 2024",
      bullets: [
        "Provided technical support for Square Point of Sale (POS) systems, troubleshooting hardware, software, connectivity, and transaction-related issues",
        "Diagnosed and resolved technical problems to help businesses keep their POS systems running smoothly",
        "Assisted users with system setup, configuration, and troubleshooting of POS devices and peripherals",
        "Investigated issues by identifying possible causes and guiding users through step-by-step solutions",
      ],
    },
  ],
  education: [
    { degree: "M.S. Computer Science", school: "University of Missouri–St. Louis", dates: "" },
    { degree: "Bachelor's in Computer Engineering", school: "Polytechnic University of Tirana, Albania", dates: "" },
    { degree: "A.A.S. Network Security Engineering", school: "St. Louis Community College", dates: "" },
  ],
  training: [
    {
      title: "Full Stack Web Development Certificate",
      org: "LaunchCode",
      dates: "",
      details: "Java, Spring Boot, REST APIs",
    },
  ],
};
