import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import startupProjectsData from '../data/startup_projects.json';
import { Rocket, Users, CheckCircle, ExternalLink, Trash2, Edit3, X, LogIn, Mail, Github, Facebook, Phone, Fingerprint } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { fetchData, postData, putData, deleteData } from '../utils/api';

const AuthModal = ({ onLogin, onClose }) => {
  const [step, setStep] = useState('method'); // method, input, otp
  const [method, setMethod] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleMethodSelect = (m) => {
    if (m === 'Google' || m === 'Github') {
      setLoading(true);
      setTimeout(() => {
        onLogin({ name: `${m} User (Demo)`, method: m });
        setLoading(false);
      }, 2000);
    } else {
      setMethod(m);
      setStep('input');
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep('otp');
      setLoading(false);
    }, 1200);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split('');
    setOtp([...newOtp, ...Array(4 - newOtp.length).fill('')].slice(0, 4));
    
    // Focus the last filled input or the first empty one
    const focusIndex = Math.min(newOtp.length, 3);
    otpRefs[focusIndex].current.focus();
  };

  const handleVerifyOtp = () => {
    if (otp.join('') === '1234') {
      setLoading(true);
      setTimeout(() => {
        onLogin({ name: `${method} User (${inputValue})`, method: method });
        setLoading(false);
      }, 1000);
    } else {
      alert("Invalid OTP! Use '1234' for testing.");
      setOtp(['', '', '', '']);
      otpRefs[0].current.focus();
    }
  };

  return (
    <div className="auth-modal-overlay">
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="auth-modal glass-card premium-auth"
      >
        <button className="close-modal" onClick={onClose}><X size={20} /></button>
        
        {loading ? (
          <div className="auth-loading">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="loader-spinner"
            />
            <p>{step === 'method' 
                ? 'Connecting to Google...' 
                : step === 'input' 
                ? 'Sending Verification Code...' 
                : 'Verifying Securely...'}</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {step === 'method' && (
              <motion.div 
                key="method"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3>Join the Community</h3>
                <p>Sign in to share your experience with VP Group.</p>
                <div className="auth-options">
                  <button className="auth-btn google" onClick={() => handleMethodSelect('Google')}>
                    <Users size={18} /> Continue with Google
                  </button>
                  <button className="auth-btn github" onClick={() => handleMethodSelect('Github')}>
                    <Github size={18} /> Continue with GitHub
                  </button>
                  <div className="divider"><span>OR</span></div>
                  <button className="auth-btn phone" onClick={() => handleMethodSelect('Phone')}>
                    <Phone size={18} /> Continue with Phone
                  </button>
                  <button className="auth-btn email" onClick={() => handleMethodSelect('Email')}>
                    <Mail size={18} /> Continue with Email
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'input' && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3>Verify Your {method}</h3>
                <p>Enter your {method.toLowerCase()} to receive an authentication code.</p>
                <form onSubmit={handleInputSubmit} className="auth-input-form">
                  <div className="input-with-icon">
                    {method === 'Email' ? <Mail size={18} /> : <Phone size={18} />}
                    <input 
                      type={method === 'Email' ? 'email' : 'tel'} 
                      placeholder={method === 'Email' ? 'name@example.com' : '+91 00000 00000'}
                      required 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button type="submit" className="cta-button">Send Code</button>
                  <button type="button" onClick={() => setStep('method')} className="back-btn">Back</button>
                </form>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div 
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h3>Security Check</h3>
                <p>We've sent a 4-digit code to <strong>{inputValue}</strong></p>
                <div className="otp-container">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength="1"
                      value={digit}
                      ref={otpRefs[idx]}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onPaste={handlePaste}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                          otpRefs[idx - 1].current.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <button onClick={handleVerifyOtp} className="cta-button">Verify & Continue</button>
                <div className="otp-hint">Use <strong>1234</strong> to verify</div>
                <p className="resend-text">Didn't receive code? <button className="text-btn">Resend</button></p>
                <button type="button" onClick={() => setStep('input')} className="back-btn">Change {method}</button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

const Startup = () => {
  const { isAdmin } = useAdmin();
  const [feedbacks, setFeedbacks] = useState([]);
  const [myFeedbackIds, setMyFeedbackIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    // Basic verification: user must exist and not be empty
    if (savedUser && savedUser.trim() !== "") {
      setAuthUser(savedUser);
    } else {
      setAuthUser(null);
      localStorage.removeItem('auth_user'); // Clean up if empty
    }
  }, []);

  const handleAuthLogin = (userData) => {
    const { name, method } = userData;
    setAuthUser(name);
    localStorage.setItem('auth_user', name);
    
    // Track in "Recent Persons" for Admin
    const persons = JSON.parse(localStorage.getItem('recentPersons')) || [];
    const newPerson = {
      id: Date.now(),
      name: name,
      method: method || 'Standard',
      timestamp: Date.now()
    };
    // Avoid duplicates for same user name (simple check)
    if (!persons.find(p => p.name === name)) {
      localStorage.setItem('recentPersons', JSON.stringify([newPerson, ...persons]));
    }
    
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('auth_user');
  };
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    websiteLink: '',
    duration: '',
    service: 'General Consultation',
    experience: ''
  });

  useEffect(() => {
    const loadFeedbacks = async () => {
      const data = await fetchData('feedback');
      setFeedbacks(data);
    };
    loadFeedbacks();
    
    const savedMyIds = JSON.parse(localStorage.getItem('myFeedbackIds')) || [];
    setMyFeedbackIds(savedMyIds);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        const updated = await putData('feedback', editingId, formData);
        setFeedbacks(feedbacks.map(fb => fb._id === editingId ? updated : fb));
        setEditingId(null);
      } else {
        const savedFeedback = await postData('feedback', formData);
        setFeedbacks([...feedbacks, savedFeedback]);
        
        const updatedMyIds = [...myFeedbackIds, savedFeedback._id];
        setMyFeedbackIds(updatedMyIds);
        localStorage.setItem('myFeedbackIds', JSON.stringify(updatedMyIds));
      }

      setFormData({
        name: '',
        companyName: '',
        websiteLink: '',
        duration: '',
        service: 'General Consultation',
        experience: ''
      });
    } catch (error) {
      alert("Error submitting feedback. Please try again.");
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await deleteData('feedback', id);
        setFeedbacks(feedbacks.filter(fb => fb._id !== id));
      } catch (error) {
        alert("Error deleting feedback.");
      }
    }
  };

  const handleEditFeedback = (fb) => {
    setFormData({
      name: fb.name,
      companyName: fb.companyName,
      websiteLink: fb.websiteLink,
      duration: fb.duration,
      service: fb.service || 'General Consultation',
      experience: fb.experience
    });
    setEditingId(fb._id);
    document.getElementById('feedback-form').scrollIntoView({ behavior: 'smooth' });
  };

  const canEdit = (fb) => {
    if (isAdmin) return true;
    const twoHoursInMs = 2 * 60 * 60 * 1000;
    const isOwner = myFeedbackIds.includes(fb._id);
    const windowOpen = (Date.now() - new Date(fb.createdAt).getTime()) < twoHoursInMs;
    return isOwner && windowOpen;
  };

  return (
    <section id="startup" className="startup section">
      <div className="container">
        <h2 className="cms-section-heading">VP Group and Technologies</h2>
        
        <div className="startup-intro glass-card">
          <div className="intro-text">
            <h3>Empowering Businesses with Next-Gen Tech</h3>
            <p>Our startup is focused on software and web development, meeting client expectations with the latest technologies, prioritizing GenAI requirements with robust architectures.</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <Users className="stat-icon" />
              <span>10+ Happy Clients</span>
            </div>
            <div className="stat-item">
              <Rocket className="stat-icon" />
              <span>Full Stack Focus</span>
            </div>
            <div className="stat-item">
              <CheckCircle className="stat-icon" />
              <span>Quality Delivery</span>
            </div>
          </div>
        </div>

        <div className="startup-projects">
          <h2 className="cms-section-heading">Featured Startup Projects</h2>
          <div className="projects-grid">
            {startupProjectsData.map((project) => (
              <div key={project.id} className="startup-card glass-card">
                <h4>{project.name}</h4>
                <p className="tech"><strong>Tech:</strong> {project.usedTechnology}</p>
                <p className="desc">{project.productDescription}</p>
                <div className="feedback-section">
                  <h5>Initial Feedback</h5>
                  <p><strong>Experience:</strong> {project.clientFeedback.experience}</p>
                  <p><strong>Duration:</strong> {project.clientFeedback.duration}</p>
                  <p><strong>Condition:</strong> {project.clientFeedback.workingCondition}</p>
                </div>
              </div>
            ))}
          </div>

          {feedbacks.filter(fb => fb.approved || isAdmin).length > 0 && (
            <>
              <h2 className="cms-section-heading" style={{ marginTop: '5rem' }}>Client Feedback</h2>
              <div className="projects-grid">
                {feedbacks.filter(fb => fb.approved || isAdmin).map((fb) => (
                  <motion.div 
                    key={fb.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="startup-card glass-card feedback-card"
                  >
                    <div className="card-actions">
                      {canEdit(fb) && (
                        <button onClick={() => handleEditFeedback(fb)} title="Edit Feedback" className="action-btn edit">
                          <Edit3 size={16} />
                        </button>
                      )}
                      {isAdmin && (
                        <button onClick={() => handleDeleteFeedback(fb._id)} title="Delete Feedback" className="action-btn delete">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <h4>Project Feedback</h4>
                    <p className="client-name"><strong>Client:</strong> {fb.name}</p>
                    <p className="company"><strong>Company:</strong> {fb.companyName}</p>
                    {fb.websiteLink && (
                      <a href={fb.websiteLink} target="_blank" rel="noopener noreferrer" className="website-link">
                        Project Link <ExternalLink size={14} />
                      </a>
                    )}
                    <div className="feedback-section dynamic">
                      <div className="feedback-meta">
                        <span className="service-tag">{fb.service}</span>
                        <p className="duration"><strong>Duration:</strong> {fb.duration}</p>
                      </div>
                      <p className="exp-text">"{fb.experience}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        <div id="feedback-form" className="feedback-form-container section">
          <AnimatePresence>
            {showAuthModal && <AuthModal onLogin={handleAuthLogin} onClose={() => setShowAuthModal(false)} />}
          </AnimatePresence>

          <h3 className="section-subtitle premium-h cms-section-heading" style={{ borderLeft: 'none', textAlign: 'center', width: '100%', paddingLeft: 0 }}>
            {editingId ? "Update Feedback" : "Share Your Experience"}
          </h3>
          
          {!authUser && !isAdmin ? (
            <div className="auth-placeholder glass-card">
              <LogIn size={40} />
              <p>You must be signed in to leave feedback.</p>
              <button className="cta-button" onClick={() => setShowAuthModal(true)}>
                Sign In Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="feedback-form container-glass">
              <div className="auth-bar-compact">
                <div className="auth-user-info">
                  <Fingerprint size={14} className="accent-text" />
                  <span>Authenticated: <strong>{isAdmin ? "Admin" : authUser}</strong></span>
                </div>
                {!isAdmin && (
                  <button onClick={handleLogout} className="auth-switch-btn" title="Switch Account">
                    <LogIn size={14} />
                    <span>Switch</span>
                  </button>
                )}
              </div>
            {editingId && (
              <div className="edit-notice">
                <span>Editing your submission</span>
                <button type="button" onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', companyName: '', websiteLink: '', duration: '', experience: '' });
                }} className="cancel-edit"><X size={14} /> Cancel</button>
              </div>
            )}
            <div className="form-grid-modern">
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  required 
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  name="companyName" 
                  placeholder="Enter company name" 
                  required 
                  value={formData.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Project Link (Optional)</label>
                <input 
                  type="url" 
                  name="websiteLink" 
                  placeholder="https://example.com" 
                  value={formData.websiteLink}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Project Duration</label>
                <input 
                  type="text" 
                  name="duration" 
                  placeholder="e.g. 3 Months" 
                  required 
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group full-width">
                <label>Select Project/Service</label>
                <div className="select-wrapper">
                  <select 
                    name="service" 
                    value={formData.service} 
                    onChange={handleInputChange}
                    required
                    className="form-select-modern"
                  >
                    <option value="General Consultation">General Consultation</option>
                    <option value="MedExpress 10">MedExpress 10</option>
                    <option value="StoryLine">StoryLine</option>
                    <option value="Custom Development">Custom Development</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Detailed Experience</label>
              <textarea 
                name="experience" 
                placeholder="Share your experience working with us..." 
                required 
                rows="5"
                value={formData.experience}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-actions-centered">
              <button type="submit" className="cta-button submit-btn-modern">
                {editingId ? "Update Feedback" : "Submit Feedback"}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Startup;

