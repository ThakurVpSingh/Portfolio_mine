import { useState, useEffect, useRef } from 'react';
import { LogOut, Settings, Image as ImageIcon, MessageSquare, Users, Trash2, Edit3, Briefcase, CheckCircle, XCircle, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchData, postData, putData, deleteData } from '../utils/api';
import { useAdmin } from '../context/AdminContext';

const Admin = () => {
  const { isAdmin, login, logout } = useAdmin();
  const fileInputRef = useRef(null);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data State
  const [persons, setPersons] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '', tech: '', link: '', github: '', description: '', caseStudy: '', category: 'Development', duration: '', images: []
  });

  // Experience Form State
  const [expForm, setExpForm] = useState({
    company: '', role: '', duration: '', location: '', description: ''
  });
  const [editingExpId, setEditingExpId] = useState(null);

  // Education Form State
  const [eduForm, setEduForm] = useState({
    school: '', degree: '', duration: '', description: ''
  });
  const [editingEduId, setEditingEduId] = useState(null);

  useEffect(() => {
    if (isAdmin) {
      const loadAllData = async () => {
        const [projectsData, expData, eduData, feedbackData] = await Promise.all([
          fetchData('projects'),
          fetchData('experience'),
          fetchData('education'),
          fetchData('feedback')
        ]);
        setProjects(projectsData);
        setExperience(expData);
        setEducation(eduData);
        setFeedbacks(feedbackData);
        
        // For persons we can keep local for now as it's a simple auth log
        setPersons(JSON.parse(localStorage.getItem('recentPersons')) || []);
      };
      loadAllData();
    }
  }, [isAdmin]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(password)) alert("Incorrect Password");
  };

  // --- Projects CRUD ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const techArray = typeof projectForm.tech === 'string' ? projectForm.tech.split(',').map(t => t.trim()) : projectForm.tech;
    
    // images is already an array in our state now
    const payload = { ...projectForm, tech: techArray };
    
    try {
      if (editingProjectId) {
        const updated = await putData('projects', editingProjectId, payload);
        setProjects(projects.map(p => p._id === editingProjectId ? updated : p));
        setEditingProjectId(null);
      } else {
        const saved = await postData('projects', payload);
        setProjects([...projects, saved]);
      }
      setProjectForm({ title: '', tech: '', link: '', github: '', description: '', caseStudy: '', category: 'Development', duration: '', images: [] });
    } catch (error) {
      alert("Error saving project.");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setProjectForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const deleteProject = async (id) => {
    if (window.confirm("Delete project?")) {
      try {
        await deleteData('projects', id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        alert("Error deleting project.");
      }
    }
  };

  const startEditProject = (p) => {
    setProjectForm({ ...p, tech: p.tech.join(', '), images: p.images || [] });
    setEditingProjectId(p._id);
    document.getElementById('cms-form').scrollIntoView({ behavior: 'smooth' });
  };

  // --- Experience CRUD ---
  const handleExpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpId) {
        const updated = await putData('experience', editingExpId, expForm);
        setExperience(experience.map(exp => exp._id === editingExpId ? updated : exp));
        setEditingExpId(null);
      } else {
        const saved = await postData('experience', expForm);
        setExperience([...experience, saved]);
      }
      setExpForm({ company: '', role: '', duration: '', location: '', description: '' });
    } catch (error) {
      alert("Error saving experience.");
    }
  };

  const deleteExp = async (id) => {
    if (window.confirm("Delete experience?")) {
      try {
        await deleteData('experience', id);
        setExperience(experience.filter(exp => exp._id !== id));
      } catch (error) {
        alert("Error deleting experience.");
      }
    }
  };

  // --- Feedback Moderation ---
  const approveFeedback = async (id) => {
    try {
      const updated = await putData('feedback', id, { approved: true });
      setFeedbacks(feedbacks.map(fb => fb._id === id ? updated : fb));
    } catch (error) {
      alert("Error approving feedback.");
    }
  };

  const deleteFeedback = async (id) => {
    if (window.confirm("Delete feedback?")) {
      try {
        await deleteData('feedback', id);
        setFeedbacks(feedbacks.filter(fb => fb._id !== id));
      } catch (error) {
        alert("Error deleting feedback.");
      }
    }
  };

  // --- Education CRUD ---
  const handleEduSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEduId) {
        const updated = await putData('education', editingEduId, eduForm);
        setEducation(education.map(edu => edu._id === editingEduId ? updated : edu));
        setEditingEduId(null);
      } else {
        const saved = await postData('education', eduForm);
        setEducation([...education, saved]);
      }
      setEduForm({ school: '', degree: '', duration: '', description: '' });
    } catch (error) {
      alert("Error saving education.");
    }
  };

  const deleteEdu = async (id) => {
    if (window.confirm("Delete education record?")) {
      try {
        await deleteData('education', id);
        setEducation(education.filter(edu => edu._id !== id));
      } catch (error) {
        alert("Error deleting education.");
      }
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login-page container">
        <form onSubmit={handleLogin} className="glass-card login-form">
          <h2>Admin Access</h2>
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="cta-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container section">
      <div className="admin-header-modern">
        <div className="admin-title-group">
          <h2>Admin Control Center</h2>
          <p className="admin-subtitle">Welcome back, Admin. Manage your enterprise portfolio.</p>
        </div>
        <button onClick={logout} className="logout-btn-modern"><LogOut size={18} /><span>Logout</span></button>
      </div>

      <div className="admin-tabs">
        {['overview', 'projects', 'experience', 'education', 'feedback'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`tab-btn ${activeTab === tab ? 'active' : ''}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {activeTab === 'overview' && (
        <div className="admin-grid-modern">
          <div className="admin-card-glass">
            <div className="card-header-left">
              <Settings className="admin-card-icon" />
              <div className="card-header-text"><h3>Quick Status</h3><p>System Overview</p></div>
            </div>
            <div className="card-content-compact">
              <p className="description-text">You have {projects.length} Projects, {experience.length} Experience roles, {education.length} Education records, and {feedbacks.filter(f => !f.approved).length} Pending Feedbacks.</p>
              <a href="/" className="manage-btn-compact"><MessageSquare size={16} />View Site</a>
            </div>
          </div>

          <div className="admin-card-glass wide-card">
            <div className="card-header-left">
              <Users className="admin-card-icon" />
              <div className="card-header-text"><h3>Recent Visitors</h3><p>Authentication Log</p></div>
            </div>
            <div className="dashboard-table-container">
              <table className="persons-table-modern">
                <thead><tr><th>Name</th><th>Method</th><th>Time</th><th>Action</th></tr></thead>
                <tbody>
                  {persons.map(p => (
                    <tr key={p.id}>
                      <td className="name-cell"><strong>{p.name}</strong></td>
                      <td><span className={`method-badge ${p.method?.toLowerCase()}`}>{p.method}</span></td>
                      <td className="time-cell">{new Date(p.timestamp).toLocaleTimeString()}</td>
                      <td><button onClick={() => {
                        const updated = persons.filter(pers => pers.id !== p.id);
                        setPersons(updated);
                        localStorage.setItem('recentPersons', JSON.stringify(updated));
                      }} className="delete-row-btn"><Trash2 size={16} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="cms-container">
          <div id="cms-form" className="admin-card-glass cms-form-card">
            <h3 className="sub-heading">{editingProjectId ? 'Update Project' : 'Add New Project'}</h3>
            <form onSubmit={handleProjectSubmit} className="form-grid-modern">
              <div className="form-group-modern">
                <label>Project Title</label>
                <input type="text" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
              </div>
              <div className="form-group-modern">
                <label>Tech Stack (Comma Separated)</label>
                <input type="text" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} placeholder="React, Node.js, CSS" required />
              </div>
              <div className="form-group-modern">
                <label>Live Link</label>
                <input type="url" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} />
              </div>
              <div className="form-group-modern">
                <label>GitHub Link</label>
                <input type="url" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} />
              </div>
              <div className="form-group-modern">
                <label>Short Description</label>
                <textarea value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required rows="2" />
              </div>
              <div className="form-group-modern">
                <label>Duration</label>
                <input type="text" value={projectForm.duration} onChange={e => setProjectForm({...projectForm, duration: e.target.value})} placeholder="e.g. 3 Months" />
              </div>
              <div className="form-group-modern full-width">
                <label>Project Images</label>
                <div className="image-upload-wrapper">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    multiple 
                    style={{ display: 'none' }} 
                  />
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current.click()} 
                    className="outline-button"
                    style={{ marginBottom: '1rem' }}
                  >
                    <Upload size={18} style={{ marginRight: '0.5rem' }} /> Upload Images
                  </button>
                  
                  <div className="admin-image-previews">
                    {projectForm.images.map((img, idx) => (
                      <div key={idx} className="admin-image-preview-item">
                        <img src={img} alt="Preview" />
                        <button type="button" onClick={() => removeImage(idx)} className="remove-img-btn">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="manual-url-input" style={{ marginTop: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>Or add by URL:</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        id="manual-url"
                        placeholder="https://example.com/image.jpg" 
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (e.target.value) {
                              setProjectForm(prev => ({ ...prev, images: [...prev.images, e.target.value] }));
                              e.target.value = '';
                            }
                          }
                        }}
                      />
                      <button 
                        type="button" 
                        className="outline-button"
                        onClick={() => {
                          const input = document.getElementById('manual-url');
                          if (input.value) {
                            setProjectForm(prev => ({ ...prev, images: [...prev.images, input.value] }));
                            input.value = '';
                          }
                        }}
                      >Add</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group-modern full-width">
                <label>Case Study (Markdown/Plain Text)</label>
                <textarea value={projectForm.caseStudy} onChange={e => setProjectForm({...projectForm, caseStudy: e.target.value})} rows="6" placeholder="Describe the challenges, solutions, and outcome..." />
              </div>
              <div className="form-actions-centered">
                <button type="submit" className="cta-button">{editingProjectId ? 'Update project' : 'Save Project'}</button>
                {editingProjectId && <button type="button" onClick={() => setEditingProjectId(null)} className="outline-button">Cancel</button>}
              </div>
            </form>
          </div>

          <div className="admin-card-glass">
            <h3 className="sub-heading">Managed Projects</h3>
            <div className="dashboard-table-container">
              <table className="persons-table-modern">
                <thead><tr><th>Title</th><th>Category</th><th>Tech</th><th>Actions</th></tr></thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p._id}>
                      <td className="name-cell"><strong>{p.title}</strong></td>
                      <td>{p.category}</td>
                      <td>{p.tech.slice(0, 2).join(', ')}...</td>
                      <td className="action-cell">
                        <button onClick={() => startEditProject(p)} className="action-btn edit"><Edit3 size={16} /></button>
                        <button onClick={() => deleteProject(p._id)} className="action-btn delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'education' && (
        <div className="cms-container">
          <div id="cms-form-edu" className="admin-card-glass cms-form-card">
            <h3 className="sub-heading">{editingEduId ? 'Update Education' : 'Add Education Record'}</h3>
            <form onSubmit={handleEduSubmit} className="form-grid-modern">
              <div className="form-group-modern">
                <label>Institution/School</label>
                <input type="text" value={eduForm.school} onChange={e => setEduForm({...eduForm, school: e.target.value})} required />
              </div>
              <div className="form-group-modern">
                <label>Degree/Qualification</label>
                <input type="text" value={eduForm.degree} onChange={e => setEduForm({...eduForm, degree: e.target.value})} required />
              </div>
              <div className="form-group-modern">
                <label>Duration</label>
                <input type="text" value={eduForm.duration} onChange={e => setEduForm({...eduForm, duration: e.target.value})} placeholder="e.g. 2020 - 2024" />
              </div>
              <div className="form-group-modern full-width">
                <label>Short Description/Details</label>
                <textarea value={eduForm.description} onChange={e => setEduForm({...eduForm, description: e.target.value})} rows="2" />
              </div>
              <div className="form-actions-centered">
                <button type="submit" className="cta-button">{editingEduId ? 'Update education' : 'Save Education'}</button>
                {editingEduId && <button type="button" onClick={() => setEditingEduId(null)} className="outline-button">Cancel</button>}
              </div>
            </form>
          </div>

          <div className="admin-card-glass">
            <h3 className="sub-heading">Managed Education</h3>
            <div className="dashboard-table-container">
              <table className="persons-table-modern">
                <thead><tr><th>Qualification</th><th>Institution</th><th>Duration</th><th>Actions</th></tr></thead>
                <tbody>
                  {education.map(edu => (
                    <tr key={edu._id}>
                      <td className="name-cell"><strong>{edu.degree}</strong></td>
                      <td>{edu.school}</td>
                      <td>{edu.duration}</td>
                      <td className="action-cell">
                        <button onClick={() => {
                          setEduForm(edu);
                          setEditingEduId(edu._id);
                          document.getElementById('cms-form-edu').scrollIntoView({ behavior: 'smooth' });
                        }} className="action-btn edit"><Edit3 size={16} /></button>
                        <button onClick={() => deleteEdu(edu._id)} className="action-btn delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'experience' && (
        <div className="cms-container">
          <div id="cms-form-exp" className="admin-card-glass cms-form-card">
            <h3 className="sub-heading">{editingExpId ? 'Update Role' : 'Add Experience Role'}</h3>
            <form onSubmit={handleExpSubmit} className="form-grid-modern">
              <div className="form-group-modern">
                <label>Company Name</label>
                <input type="text" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})} required />
              </div>
              <div className="form-group-modern">
                <label>Job Role</label>
                <input type="text" value={expForm.role} onChange={e => setExpForm({...expForm, role: e.target.value})} required />
              </div>
              <div className="form-group-modern">
                <label>Duration</label>
                <input type="text" value={expForm.duration} onChange={e => setExpForm({...expForm, duration: e.target.value})} placeholder="e.g. Aug 2024 - Mar 2025" required />
              </div>
              <div className="form-group-modern">
                <label>Location</label>
                <input type="text" value={expForm.location} onChange={e => setExpForm({...expForm, location: e.target.value})} />
              </div>
              <div className="form-group-modern full-width">
                <label>Role Description</label>
                <textarea value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} required rows="3" />
              </div>
              <div className="form-actions-centered">
                <button type="submit" className="cta-button">{editingExpId ? 'Update Role' : 'Save Role'}</button>
                {editingExpId && <button type="button" onClick={() => setEditingExpId(null)} className="outline-button">Cancel</button>}
              </div>
            </form>
          </div>

          <div className="admin-card-glass">
            <h3 className="sub-heading">Managed Experience</h3>
            <div className="dashboard-table-container">
              <table className="persons-table-modern">
                <thead><tr><th>Role</th><th>Company</th><th>Duration</th><th>Actions</th></tr></thead>
                <tbody>
                  {experience.map(exp => (
                    <tr key={exp._id}>
                      <td className="name-cell"><strong>{exp.role}</strong></td>
                      <td>{exp.company}</td>
                      <td>{exp.duration}</td>
                      <td className="action-cell">
                        <button onClick={() => {
                          setExpForm(exp);
                          setEditingExpId(exp._id);
                          document.getElementById('cms-form-exp').scrollIntoView({ behavior: 'smooth' });
                        }} className="action-btn edit"><Edit3 size={16} /></button>
                        <button onClick={() => deleteExp(exp._id)} className="action-btn delete"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="cms-container">
          <div className="admin-card-glass">
            <h3 className="sub-heading">Feedback Moderation</h3>
            <p className="description-text">Approve or delete client feedback before they appear on the main site.</p>
            <div className="dashboard-table-container">
              <table className="persons-table-modern">
                <thead><tr><th>Client</th><th>Service</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {feedbacks.length === 0 ? (
                    <tr><td colSpan="4" className="no-data-cell">No feedback submitted yet.</td></tr>
                  ) : (
                     feedbacks.map(fb => (
                      <tr key={fb._id}>
                        <td className="name-cell"><strong>{fb.name}</strong><br/><small>{fb.companyName}</small></td>
                        <td><span className="service-tag">{fb.service}</span></td>
                        <td>
                          <span className={`moderation-badge ${fb.approved ? 'badge-approved' : 'badge-pending'}`}>
                            {fb.approved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="action-cell">
                          {!fb.approved && (
                            <button onClick={() => approveFeedback(fb._id)} className="action-btn approve" title="Approve">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button onClick={() => deleteFeedback(fb._id)} className="action-btn delete" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
