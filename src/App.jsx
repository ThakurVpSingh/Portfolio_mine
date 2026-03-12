import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    // Initialize Projects if not present
    if (!localStorage.getItem('projects')) {
      const initialProjects = projectsData.map(p => ({
        ...p,
        github: '',
        caseStudy: '',
        images: [],
        category: 'Development',
        duration: '3 Months'
      }));
      localStorage.setItem('projects', JSON.stringify(initialProjects));
    }

    // Initialize Experience if not present
    if (!localStorage.getItem('experience')) {
      const initialExperience = [
        {
          id: 1,
          company: "Concentrix India Pvt. Ltd.",
          role: "Technical Engineer",
          duration: "August 2025 - Present",
          location: "Gurgaon",
          description: "Providing high-level technical support and troubleshooting for enterprise systems."
        },
        {
          id: 2,
          company: "Teleperformance India",
          role: "Technical Support Engineer (Adobe.inc)",
          duration: "April 2025 - July 2025",
          description: "Handled technical queries and provided solutions for Adobe's professional software suite."
        },
        {
          id: 3,
          company: "iEnergizer IT Services Pvt. Ltd.",
          role: "Associate Technical Support Engineer",
          duration: "April 2024 - April 2025",
          description: "Provided technical assistance and resolved system issues for globally based users."
        }
      ];
      localStorage.setItem('experience', JSON.stringify(initialExperience));
    }

    // Initialize Education if not present
    if (!localStorage.getItem('education')) {
      const initialEducation = [
        {
          id: 1,
          school: "Dronacharya Group of Institutions, Greater Noida",
          degree: "Btech Computer Science & Engineering",
          duration: "2020 - 2024",
          description: "Full Stack Development & Software Engineering."
        }
      ];
      localStorage.setItem('education', JSON.stringify(initialEducation));
    }
    
    // Initialize approved flag for feedbacks if missing
    const feedbacks = JSON.parse(localStorage.getItem('clientFeedbacks')) || [];
    const updatedFeedbacks = feedbacks.map(fb => ({
      ...fb,
      approved: fb.hasOwnProperty('approved') ? fb.approved : true // Legacy feedbacks approved by default
    }));
    localStorage.setItem('clientFeedbacks', JSON.stringify(updatedFeedbacks));

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
