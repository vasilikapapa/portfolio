import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Skills from "./components/Skills/Skills";
import InfoCards from "./components/Cards/InfoCard";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Projects from "./components/Projects/Projects";
import About from "./components/About/About";
import "./app.css";



function App(): React.ReactElement {
  return (
    <div className="page-background">
      <main className="page-container">
        <Navbar />

        <div className="page-body">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Skills />
                  <InfoCards />
                </>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
         </Routes>
       </div>
  
        <Footer />
      </main>
    </div>
  );
}

export default App;
