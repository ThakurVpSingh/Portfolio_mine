import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { fetchData } from '../utils/api';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      const data = await fetchData(`projects/${id}`);
      // fetchData returns [] on error, so we check if it's an object with a title/title
      setProject(Array.isArray(data) ? null : data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    loadProject();
  }, [id]);

  if (loading) {
    return <div className="container section"><p>Loading project details...</p></div>;
  }

  if (!project) {
    return (
      <div className="container section">
        <div className="glass-card premium-banner" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Project Not Found</h2>
          <p>The project you are looking for doesn't exist or has been moved.</p>
          <Link to="/" className="cta-button" style={{ marginTop: '2rem', display: 'inline-flex' }}>
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="project-details-page container section"
    >
      <Link to="/#projects" className="back-link">
        <ArrowLeft size={18} /> Back to Projects
      </Link>

      <div className="project-header-grid">
        <div className="project-info-main">
          <h1 className="cms-section-heading">{project.title}</h1>
          <div className="tech-tags-large">
            {project.tech.map((tag, i) => (
              <span key={i} className="tech-tag-pill">{tag}</span>
            ))}
          </div>
          <p className="project-description-large">{project.description}</p>
          
          <div className="project-links-row">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="cta-button">
                Live Preview <ExternalLink size={18} />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="outline-button">
                <Github size={18} /> Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="project-content-grid">
        <div className="case-study-content glass-card">
          <h2 className="sub-heading">Case Study</h2>
          <div className="markdown-body">
            {project.caseStudy ? (
              project.caseStudy.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : (
              <p>No case study available for this project.</p>
            )}
          </div>
        </div>

        <div className="project-metadata glass-card">
          <h3 className="sub-heading">Details</h3>
          <div className="meta-list">
            <div className="meta-item">
              <strong>Category</strong>
              <span>{project.category || 'Development'}</span>
            </div>
            <div className="meta-item">
              <strong>Duration</strong>
              <span>{project.duration || 'N/A'}</span>
            </div>
          </div>
          
          {project.images && project.images.length > 0 && (
            <div className="project-gallery">
              <h3 className="sub-heading">Gallery</h3>
              <div className="gallery-grid">
                {project.images.map((img, i) => (
                  <div key={i} className="gallery-item">
                    <img src={img} alt={`Gallery ${i}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
