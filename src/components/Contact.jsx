import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // IMPORTANT: You must replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key.
    // Get it for free at https://web3forms.com/
    const accessKey = "69f39652-bf1a-464b-9bdd-6c7684d27b19"; 
    
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      setResult("Error: Web3Forms access key is missing. Please check Contact.jsx.");
      return;
    }

    formData.append("access_key", accessKey);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="cms-section-heading">Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>vaibhavsinghha@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>6388398552</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Hans Enclave, Sector 33, Gurgaon, Haryana 122001</p>
              </div>
            </div>
            
            <div className="social-links">
              <a href="https://www.linkedin.com/in/vaibhav-pratap-singh-12a711341/" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://www.instagram.com/vaibhavpratap705/" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://www.facebook.com/vaibhav.pratap.singh.996222" target="_blank" rel="noopener noreferrer"><Facebook /></a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="contact-form glass-card">
            <input type="hidden" name="from_name" value="Portfolio Visitor" />
            <input type="hidden" name="subject" value="New Contact Form Submission" />
            
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required rows="5"></textarea>
            <button type="submit" className="cta-button">{result || "Send Message"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
