import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [eduData, setEduData] = React.useState([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('education')) || [];
    setEduData(saved);
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
              eduData.map((edu, index) => (
                <div key={edu.id || index} style={{ marginBottom: '1.5rem' }}>
                  <p><strong>{edu.degree}</strong></p>
                  <p>{edu.school} ({edu.duration})</p>
                  {edu.description && <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.4rem' }}>{edu.description}</p>}
                </div>
              ))
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
    </section>
  );
}

export default About;
