import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { Camera } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { fetchData, postData } from '../utils/api';

const Hero = () => {
  const { isAdmin } = useAdmin();
  const [profileImg, setProfileImg] = useState('/src/assets/profile.jpg');
  const [imgLoading, setImgLoading] = useState(true);
  const fileInputRef = useRef(null);

  const roles = [
    "Full Stack Web Developer",
    "MERN Stack Developer",
    ".Net Developer",
    "Frontend Web Developer"
  ];
  const roleText = useTypewriter(roles, { typeSpeed: 80, deleteSpeed: 40, pauseDelay: 2000 });

  const degrees = [
    "B.Tech CSE",
    "Bachelor of Technology (Computer Science and Engineering)"
  ];
  const degreeText = useTypewriter(degrees, { 
    typeSpeed: 30, 
    deleteSpeed: 15, 
    keepPrefix: true, 
    customPauses: [800, 3000] 
  });

  useEffect(() => {
    const loadProfileImg = async () => {
      setImgLoading(true);
      const data = await fetchData('settings/profileImage');
      if (data && typeof data === 'string') setProfileImg(data);
      setImgLoading(false);
    };
    loadProfileImg();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result;
        setProfileImg(base64String);
        try {
          await postData('settings', { key: 'profileImage', value: base64String });
        } catch (error) {
          alert("Error saving profile image to database.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="hero">
      <div className="container hero-content">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <h1>Vaibhav Pratap Singh</h1>
          <div className="subtitle typing-container">
            <span className="typewriter-role">{roleText}<span className="cursor">|</span></span>
            <span className="typewriter-degree">{degreeText}<span className="cursor">|</span></span>
          </div>
          <div className="hero-description">
            Specializing in Full Stack Web Development, MERN Stack, and Software Development with a focus on GenAI and robust technologies.
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            <a href="#contact">Get In Touch</a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-image"
        >
          <div className="profile-img-container glass-card">
            <img src={profileImg} alt="Vaibhav Pratap Singh" />
            {isAdmin && (
              <>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
                <button 
                  className="edit-image-btn" 
                  onClick={triggerFileInput}
                  title="Upload Profile Picture"
                >
                  <Camera size={20} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
