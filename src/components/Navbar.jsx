import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAdmin } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar glass-card">
      <div className="container nav-content">
        <a href="/" className="logo" onClick={closeMenu}>
          VPS {isAdmin && <span className="admin-status-pill">Admin</span>}
        </a>
        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="/#about" onClick={closeMenu}>About</a></li>
          <li><a href="/#experience" onClick={closeMenu}>Experience</a></li>
          <li><a href="/#projects" onClick={closeMenu}>Projects</a></li>
          <li><a href="/#startup" onClick={closeMenu}>Startup</a></li>
          <li><a href="/#contact" onClick={closeMenu}>Contact</a></li>
          {isAdmin && <li><Link to="/admin" className="admin-link" onClick={closeMenu}>Dashboard</Link></li>}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
