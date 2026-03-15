import React from 'react';
import { motion } from 'framer-motion';
import { fetchData } from '../utils/api';
import { sortChronologically } from '../utils/dateUtils';

const Experience = () => {
  const [experienceData, setExperienceData] = React.useState([]);
  const [selectedExp, setSelectedExp] = React.useState(null);

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };


  React.useEffect(() => {
    const loadExperience = async () => {
      const data = await fetchData('experience');
      const sortedData = sortChronologically(data, 'duration');
      setExperienceData(sortedData);
    };
    loadExperience();
  }, []);

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <h2 className="cms-section-heading">Experience</h2>
        <div className="glass-card about-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>Professional Journey</h3>
          <div className="timeline" style={{ position: 'relative' }}>
            {experienceData.length === 0 ? (
              <p className="no-data-text">Experience details will appear here once added in Admin.</p>
            ) : selectedExp ? (
                <motion.div 
                  className="expanded-edu-view"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '1rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{ color: '#6366f1', margin: 0 }}>{selectedExp.role}</h3>
                    <button 
                      className="minimize-btn dim-blink" 
                      onClick={() => setSelectedExp(null)}
                      title="Minimize"
                    >
                      Minimize
                    </button>
                  </div>
                  <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{selectedExp.company}</p>
                  {selectedExp.location && (
                    <p style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i>
                      {selectedExp.location}
                    </p>
                  )}
                  <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>{selectedExp.duration}</p>
                  <p style={{ lineHeight: '1.6', color: '#e0e0e0', whiteSpace: 'pre-wrap' }}>{selectedExp.description}</p>
                </motion.div>
            ) : (
              <div className="timeline-container">
                {experienceData.map((exp, index) => (
                  <motion.div 
                    key={exp.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="timeline-item group"
                  >
                    <p className="timeline-title" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>{exp.role}</strong></p>
                    <p className="timeline-school" style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{exp.company}</p>
                    {exp.location && (
                      <p style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '5px' }}></i>
                        {exp.location}
                      </p>
                    )}
                    <p className="timeline-date" style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1rem' }}>{exp.duration}</p>
                    
                    {exp.description && (
                      <p className="timeline-desc" style={{ lineHeight: '1.6', color: '#e0e0e0' }}>
                        {truncateText(exp.description, 150)}{' '}
                        {exp.description.length > 150 && (
                          <button 
                            className="view-more-btn dim-blink" 
                            onClick={() => setSelectedExp(exp)}
                          >
                            View More
                          </button>
                        )}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
