import React, { useState, useEffect } from 'react';
// We use lucide-react for standard UI icons
import { Mail, ChevronRight, Terminal, Sun, Moon } from 'lucide-react';
// We use react-icons for brand logos (Github & Linkedin)
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';
import { portfolioData } from './data';
import profileImg from './profile.png';

function App() {
  const { personal, hero, education, skills, projects } = portfolioData;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark'; // Fallback default
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-logo">
          <Terminal size={24} className="logo-icon" />
          <span>Portfolio VG</span>
        </div>
        <div className="nav-actions">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
          </div>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn" 
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section className="hero fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <p className="greeting">Hi, my name is</p>
              <h1 className="name">{personal.name}.</h1>
              <h2 className="role">I build the backend of the internet.</h2>
              <p className="hero-desc">{hero.description}</p>
              
              <div className="social-links">
                <a href={personal.github} target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
                <a href={personal.linkedin} target="_blank" rel="noreferrer"><FaLinkedin size={20} /></a>
                <a href={`mailto:${personal.email}`}><Mail size={20} /></a>
              </div>
            </div>
            
            {/* New Profile Image Section */}
            <div className="hero-image-container">
              
              <img src={profileImg} alt={personal.name} className="hero-image" />
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="about" className="section slide-up">
          <h3 className="section-title"><span>01.</span> Education & Background</h3>
          <div className="timeline">
            {education.map((edu, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>{edu.degree}</h4>
                  <p className="institution">{edu.institution}</p>
                  <p className="duration">{edu.duration}</p>
                  <p className="details">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section slide-up">
          <h3 className="section-title"><span>02.</span> Technical Arsenal</h3>
          <div className="skills-grid">
            {Object.entries(skills).map(([category, items]) => (
              <div className="skill-card" key={category}>
                <h4>{category}</h4>
                <ul className="skill-list">
                  {items.map(skill => (
                    <li key={skill}><ChevronRight size={14} className="list-icon"/> {skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section slide-up">
          <h3 className="section-title"><span>03.</span> Featured Architecture</h3>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <div className="project-header">
                  <h4>{project.title}</h4>
                </div>
                <p>
  <a 
    href={project.link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="project-link-icon"
  >
    View Project 
    {/* This is the standard external link SVG icon */}
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  </a>
</p>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span className="mono-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer slide-up">
          <h2>What's Next?</h2>
          <p>Currently open to new opportunities and collaborations in software development.</p>
          <a href={`mailto:${personal.email}`} className="cta-button">Say Hello</a>
          <p className="footer-credit">Built with React by {personal.name}</p>
        </footer>
      </main>
    </div>
  );
}

export default App;