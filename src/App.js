import React, { useState, useEffect } from 'react';
// We use lucide-react for standard UI icons
import { Mail, ChevronRight, Terminal, Sun, Moon, Filter, ChevronDown } from 'lucide-react';
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

  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scrollspy logic using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // viewport focus window
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.projects-filter-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [dropdownOpen]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-logo">
          <Terminal size={24} className="logo-icon" />
          <span>Portfolio VG</span>
        </div>
        <div className="nav-actions">
          <div className="nav-links">
            <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
            <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
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
        <section id="home" className="hero fade-in">
          <div className="hero-content">
            <div className="hero-text">
              <div className="status-badge">
                <span className="pulse-dot"></span>
                <span>Open for Opportunities</span>
              </div>
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
            
            {/* Profile Image Section */}
            <div className="hero-image-container">
              <div className="hero-image-wrapper">
                <img src={profileImg} alt={personal.name} className="hero-image" />
              </div>
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
          <div className="projects-title-row">
            <h3 className="section-title"><span>03.</span> Featured Architecture</h3>
            
            <div className="projects-filter-container">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)} 
                className="filter-dropdown-btn"
                aria-expanded={dropdownOpen}
                aria-haspopup="listbox"
              >
                <Filter size={16} className="filter-icon" />
                <span>
                  {selectedCategory === 'all' && 'All Projects'}
                  {selectedCategory === 'frontend' && 'Frontend'}
                  {selectedCategory === 'backend' && 'Backend'}
                  {selectedCategory === 'fullstack' && 'Full Stack'}
                  {selectedCategory === 'other' && 'Other Projects'}
                </span>
                <ChevronDown size={16} className={`chevron-icon ${dropdownOpen ? 'open' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <ul className="filter-dropdown-menu" role="listbox">
                  <li 
                    className={selectedCategory === 'all' ? 'active' : ''} 
                    onClick={() => { setSelectedCategory('all'); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={selectedCategory === 'all'}
                  >
                    All Projects
                  </li>
                  <li 
                    className={selectedCategory === 'frontend' ? 'active' : ''} 
                    onClick={() => { setSelectedCategory('frontend'); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={selectedCategory === 'frontend'}
                  >
                    Frontend
                  </li>
                  <li 
                    className={selectedCategory === 'backend' ? 'active' : ''} 
                    onClick={() => { setSelectedCategory('backend'); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={selectedCategory === 'backend'}
                  >
                    Backend
                  </li>
                  <li 
                    className={selectedCategory === 'fullstack' ? 'active' : ''} 
                    onClick={() => { setSelectedCategory('fullstack'); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={selectedCategory === 'fullstack'}
                  >
                    Full Stack
                  </li>
                  <li 
                    className={selectedCategory === 'other' ? 'active' : ''} 
                    onClick={() => { setSelectedCategory('other'); setDropdownOpen(false); }}
                    role="option"
                    aria-selected={selectedCategory === 'other'}
                  >
                    Other Projects
                  </li>
                </ul>
              )}
            </div>
          </div>
          
          <div className="projects-grid key-reload">
            {filteredProjects.map((project, index) => (
              <div className="project-card fade-in" key={`${selectedCategory}-${index}`}>
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <span className={`category-tag ${project.category}`}>
                    {project.category === 'fullstack' ? 'Full Stack' : 
                     project.category === 'frontend' ? 'Frontend' : 
                     project.category === 'backend' ? 'Backend' : 'Other'}
                  </span>
                </div>
                {project.link && (
                  <p>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-icon"
                    >
                      View Project 
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
                )}
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

        {/* Footer / Contact */}
        <footer id="contact" className="footer slide-up">
          <div className="contact-card">
            <h2>What's Next?</h2>
            <p>Currently open to new opportunities and collaborations in software development.</p>
            <a href={`mailto:${personal.email}`} className="cta-button">Say Hello</a>
          </div>
          
          <div className="footer-content">
            <div className="footer-socials">
              <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
              <a href={`mailto:${personal.email}`} aria-label="Email"><Mail size={18} /></a>
            </div>
            
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
            </div>
            
            <div className="footer-info">
              <p className="footer-credit">Built with ❤️ by Rishi</p>
              <p className="footer-copy">&copy; {new Date().getFullYear()} Vrushabh Gorivale. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;