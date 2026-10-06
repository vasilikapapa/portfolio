# Vasilika Papa — Portfolio Website

A modern, dark-themed portfolio website built with **React + TypeScript**, designed to showcase my projects, skills, and experience as a Full Stack Developer.

This project focuses on clean architecture, reusable components, and a polished UI inspired by industry-standard (FAANG-style) portfolios.

---

## 🚀 Live Demo

👉https://portfolio-psi-cyan-67.vercel.app/ 
👉 GitHub Repo: https://github.com/vasilikapapa/portfolio

---

## 🧠 Why I Built This

I built this portfolio to:

- Present my work in a **clear, professional, and scalable way**
- Practice **real-world React + TypeScript architecture**
- Apply **design systems, reusable components, and layout patterns**
- Create something that reflects how I would structure a production frontend

---

## ✏️ Editing the resume without code

The About (resume) page and Home skills are loaded from **Supabase**.
Sign in at **/admin** to edit everything from the browser and save it live.


---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Supabase (auth + database for editable resume content)

### Styling & Design
- Custom CSS (no UI frameworks)
- CSS variables for theming
- Dark, cohesive design system
- Responsive grid layouts
- Icons via `react-icons` and `lucide-react`

### Tooling
- Vite
- Git & GitHub
- Vercel (deployment)
- Formspree (contact form handling)

---

## 📁 Project Structure

```txt
src/
├── components/        # Reusable UI components
│   ├── Navbar/
│   ├── Footer/
│   ├── Hero/
│   ├── Skills/
│   └── ProjectCard/
│
├── pages/             # Route-level pages
│   ├── Home/
│   ├── Projects/
│   ├── About/
│   └── Contact/
│
├── layouts/           # Shared layout wrappers
│   └── AppLayout/
│
├── utils/             # Constants & shared data
│   └── Constants.ts
│
├── types/             # TypeScript types
│   └── Project.ts
│
├── App.tsx            # Routing configuration
├── main.tsx           # App entry point
└── index.css          # Global theme variables

Architecture Overview
Layout Strategy

Shared AppLayout component

Full-width Navbar and Footer

Centered content container

Pages rendered using React Router <Outlet />

Component Strategy

Small, focused, reusable components

Data-driven rendering for projects and skills

Strong TypeScript typing across the app

Styling Strategy

No Tailwind or UI frameworks

Custom design system using CSS variables

Consistent spacing, typography, and colors

Dark UI optimized for readability

📄 Pages
Home

Hero section with introduction, CTAs, and profile image

Skills section highlighting core technologies

Projects

Responsive grid of reusable ProjectCard components

Each project includes:

Image

Description

Tech stack

GitHub and Live Demo links

Contact

Always-visible contact methods

Optional contact form triggered via ?form=1

Async form submission via Formspree

Success and error states with user feedback

♿ Accessibility & UX

Semantic HTML structure

Keyboard-friendly navigation

Accessible form states and alerts

Disabled and loading states for async actions

📦 Getting Started Locally
git clone https://github.com/vasilikapapa/portfolio.git
cd portfolio
npm install
npm run dev


Open: http://localhost:5173

🌱 Future Improvements

Add animations with Framer Motion

Add project case-study pages

Improve image optimization

Add light/dark theme toggle

👩‍💻 Author

Vasilika Papa
Full Stack Developer

GitHub: https://github.com/vasilikapapa

LinkedIn: https://www.linkedin.com/in/vasilika-papa/

Email: vasilika.papa108@gmail.com