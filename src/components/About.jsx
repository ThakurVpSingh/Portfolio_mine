import React from 'react';
import { motion } from 'framer-motion';
import { fetchData } from '../utils/api';

const About = () => {
  const [eduData, setEduData] = React.useState([]);
  const [selectedEdu, setSelectedEdu] = React.useState(null);

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  React.useEffect(() => {
    const loadEdu = async () => {
      const data = await fetchData('education');
      setEduData(data);
    };
    loadEdu();
  }, []);

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="cms-section-heading">Education & Specialization</h2>
        <div className="about-grid">
          <div className="glass-card about-card">
            <h3 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>Academic Journey</h3>
            {eduData.length === 0 ? (
              <p>Education details will appear here once added in Admin.</p>
            ) : (
              <div className="timeline-container">
                {eduData.map((edu, index) => (
                  <div key={edu._id || index} className="timeline-item">
                    <p className="timeline-title"><strong>{edu.degree}</strong></p>
                    <p className="timeline-school">{edu.school} ({edu.duration})</p>
                    {edu.description && (
                      <p className="timeline-desc">
                        {truncateText(edu.description, 120)}{' '}
                        {edu.description.length > 120 && (
                          <button 
                            className="view-more-btn" 
                            onClick={() => setSelectedEdu(edu)}
                          >
                            View More
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="glass-card about-card">
            <h3 style={{ color: '#6366f1', marginBottom: '1.5rem' }}>Core Specialization</h3>
            <p>Full Stack Web Development</p>
            <p>MERN Stack & Software Development</p>
            <p>Generative AI Integration</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>Focusing on building scalable, user-centric digital experiences using modern cloud-native technologies.</p>
          </div>
        </div>
      </div>

      {/* Education Modal */}
      {selectedEdu && (
        <div className="modal-overlay" onClick={() => setSelectedEdu(null)}>
          <motion.div 
            className="modal-box glass-card"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()} // Prevent click-through closing
          >
            <button className="modal-close-btn" onClick={() => setSelectedEdu(null)}>✕</button>
            <h3 style={{ color: '#6366f1', marginBottom: '1rem' }}>{selectedEdu.degree}</h3>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{selectedEdu.school}</p>
            <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>{selectedEdu.duration}</p>
            <p style={{ lineHeight: '1.6', color: '#e0e0e0' }}>{selectedEdu.description}</p>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default About;
