import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Startup from './components/Startup';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import ProjectDetails from './pages/ProjectDetails';
import projectsData from './data/projects.json';
import startupProjectsData from './data/startup_projects.json';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const AnimatedSection = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={sectionVariants}
  >
    {children}
  </motion.div>
);

const HomePage = () => (
  <main>
    <Hero />
    <AnimatedSection><About /></AnimatedSection>
    <AnimatedSection><Experience /></AnimatedSection>
    <AnimatedSection><Projects /></AnimatedSection>
    <AnimatedSection><Startup /></AnimatedSection>
    <AnimatedSection><Contact /></AnimatedSection>
  </main>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading simulation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Data is now handled by the backend
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && (
          <motion.div 
            key="loader"
            className="global-loader"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="loader-content">
              <div className="loader-spinner"></div>
              <div className="loader-logo">VPS PORTFOLIO</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        <footer className="footer container">
          <p>&copy; {new Date().getFullYear()} Vaibhav Pratap Singh. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
