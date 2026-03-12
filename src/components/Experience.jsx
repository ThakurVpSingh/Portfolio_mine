import React from 'react';
import { motion } from 'framer-motion';


const Experience = () => {
  const [experienceData, setExperienceData] = React.useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('experience')) || [];
    setExperienceData(saved);
  }, []);

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="cms-section-heading">Professional Journey</h2>
        <div className="timeline">
          {experienceData.length === 0 ? (
            <p className="no-data-text">Experience details will appear here once added in Admin.</p>
          ) : (
            experienceData.map((exp, index) => (
              <motion.div 
                key={exp.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="timeline-item glass-card"
              >
                <div className="timeline-date">{exp.duration}</div>
                <div className="timeline-content">
                  <h3>{exp.role}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Experience;
