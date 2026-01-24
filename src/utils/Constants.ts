import { skill } from "../types/Skill";
import { Card } from "../types/Card";

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