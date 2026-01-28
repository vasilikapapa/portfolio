import { Skill } from "../types/Skill";
import { Card } from "../types/Card";
import type { Project } from "../types/Projects";


//Array of skill objects to display in the Skills section
export const skillBoxes: Skill[] = [
    {

        title: "Frontend",
        items: ["React, TypeScript, JavaScript", "HTML, CSS", "Responsive Design"], 
    },
    {
        title: "Backend",
        items: ["Java, Spring Boot", "REST APIs, Authentication"],
    },
    {
        title: "Database & Tools",
        items: ["MySQL, Prisma/JPA", "Git & GitHub, Postman", "Vercel, Render"],
    },
];

//Array of card objects to didplay in the InfoCards section
export const cards: Card[] = [
    {
        title: "Resume",
        description: "Download my rsume to learn more about my experience,",
        buttonText: "Download Resume",
    },
    {
        title: "Projects",
        description: "Check out some of my recent work.",
        buttonText: "View My Work",
    },
    {
        title: "Contact",
        description: "Let's get in touch!",
        buttonText: "Contact",
    },
];

// Projects shown on the Projects page
export const projects: Project[] = [
  {
    id: "workout-app",
    title: "Workout App",
    subtitle: "Mobile app (Expo) + API",
    description:
      "Workout planner with routines and progress tracking. Built with a clean UI and scalable structure.",
    tech: ["React Native", "Expo", "TypeScript", "REST API"],
    image: "images/project-workout.jpeg",
    // liveUrl: "https://...",  
    repoUrl: "https://github.com/vasilikapapa/workout-app"
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    subtitle: "Landing page + menu layout",
    description:
      "Restaurant website with hero, navigation, menu sections, and CTAs. Designed for a clean Pinterest-style feel.",
    tech: ["React", "Vite", "TypeScript", "CSS"],
    image: "/images/project-restaurant.jpg",
    liveUrl:"https://restaurant-website-nine-gold.vercel.app/",
    repoUrl:"https://github.com/vasilikapapa/restaurant-website"
  },
];