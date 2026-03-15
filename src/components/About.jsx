import React from 'react';
import { motion } from 'framer-motion';
import { fetchData } from '../utils/api';
import { sortChronologically } from '../utils/dateUtils';

const About = () => {
  const [eduData, setEduData] = React.useState([]);
  const [selectedEdu, setSelectedEdu] = React.useState(null);

  const truncateText = (htmlText, maxLength) => {
    if (!htmlText) return '';
    const strippedString = htmlText.replace(/(<([^>]+)>)/gi, "");
    if (strippedString.length <= maxLength) return strippedString;
    return strippedString.substring(0, maxLength) + '...';
  };

  React.useEffect(() => {
    const loadEdu = async () => {
      const data = await fetchData('education');
      const sortedData = sortChronologically(data, 'duration');
      setEduData(sortedData);
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
            ) : selectedEdu ? (
              <motion.div 
                className="expanded-edu-view"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ color: '#6366f1', margin: 0 }}>{selectedEdu.degree}</h3>
                  <button 
                    className="minimize-btn dim-blink" 
                    onClick={() => setSelectedEdu(null)}
                    title="Minimize"
                  >
                    Minimize
                  </button>
                </div>
                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{selectedEdu.school}</p>
                <p style={{ color: '#aaa', marginBottom: '1rem', fontSize: '0.9rem' }}>{selectedEdu.duration}</p>
                <div 
                  className="rich-text-content" 
                  style={{ lineHeight: '1.6', color: '#e0e0e0' }} 
                  dangerouslySetInnerHTML={{ __html: selectedEdu.description }} 
                />
              </motion.div>
            ) : (
              <div className="timeline-container">
                {eduData.map((edu, index) => (
                  <div key={edu._id || index} className="timeline-item group">
                    <p className="timeline-title"><strong>{edu.degree}</strong></p>
                    <p className="timeline-school">{edu.school} ({edu.duration})</p>
                    {edu.description && (
                      <p className="timeline-desc" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {truncateText(edu.description, 120)}{' '}
                        {edu.description.length > 120 && (
                          <button 
                            className="view-more-btn dim-blink" 
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
      {/* Fullscreen modal code removed as per new UI requirements */}
    </section>
  );
}

export default About;
