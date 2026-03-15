import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { fetchData } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = React.useState([]);

  const truncateText = (htmlText, maxLength) => {
    if (!htmlText) return '';
    const strippedString = htmlText.replace(/(<([^>]+)>)/gi, "");
    if (strippedString.length <= maxLength) return strippedString;
    return strippedString.substring(0, maxLength) + '...';
  };

  React.useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchData('projects');
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <h2 className="cms-section-heading">Featured Projects</h2>
        <div className="projects-grid">
          {projects.length === 0 ? (
            <p>No projects added yet.</p>
          ) : (
            projects.map((project) => (
              <motion.div 
                key={project._id}
                whileHover={{ scale: 1.02 }}
                className="project-card glass-card"
              >
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{truncateText(project.description, 120)}</p>
                  <div className="tech-tags">
                    {project.tech.map((tag, i) => (
                      <span key={i} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <Link to={`/project/${project._id}`} className="project-link">
                    View Case Study <ExternalLink size={16} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Projects;
