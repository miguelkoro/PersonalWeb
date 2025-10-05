import "../styles/index.scss";
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import Logo from '../assets/mk_logo.png';
import enSvg from '../assets/gb.svg';
import esSvg from '../assets/es.svg';
import { DataContext } from '../context/DataContext.jsx';

const NavBar = () => {
  const { t, language, setLanguage, screen, setScreen } = useContext(DataContext);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageMouseEnter = () => setLanguageMenuOpen(true);
  const handleLanguageMouseLeave = () => setLanguageMenuOpen(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageMenuOpen(false);
  };



  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
        <Link to="/">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </Link>
        <div className="typewriter">
          <Link to="/" className="navbar-text">Miguelkoro</Link>
        </div>
      </div>
      
      <div className="navbar-center">
        <div className="navbar-manage">
          <Link to="/" className={`${screen === 'home' ? 'selected-title' : 'manage-title'}`} onClick={screen === 'home' ? (e => e.preventDefault()) : undefined}>{t('i.home')}</Link>
          <Link to="/about-me" className={`${screen === 'about-me' ? 'selected-title' : 'manage-title'}`} onClick={screen === 'about-me' ? (e => e.preventDefault()) : undefined}>{t('i.aboutme')}</Link>
          <Link to="/skills" className={`${screen === 'skills' ? 'selected-title' : 'manage-title'}`} onClick={screen === 'skills' ? (e => e.preventDefault()) : undefined}>{t('i.skills')}</Link>
          <Link to="/projects" className={`${screen === 'projects' ? 'selected-title' : 'manage-title'}`} onClick={screen === 'projects' ? (e => e.preventDefault()) : undefined}>{t('i.projects')}</Link>
          <Link to="/contact" className={`${screen === 'contact' ? 'selected-title' : 'manage-title'}`} onClick={screen === 'contact' ? (e => e.preventDefault()) : undefined}>{t('i.contact')}</Link>
        </div>
      </div>

      <div className="navbar-right">
        <div className="navbar-social">
          <a href="https://github.com/miguelkoro" target="_blank" rel="noopener noreferrer" className="social-link github">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/miguelkoro" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://twitter.com/miguelkoro" target="_blank" rel="noopener noreferrer" className="social-link twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="navbar-language"
             onMouseEnter={handleLanguageMouseEnter}
             onMouseLeave={handleLanguageMouseLeave}>
          <span className="language-selector"><img src={language === 'es' ? esSvg : enSvg} alt="Language" className="language-icon" /> {language.toUpperCase()}</span>
          {languageMenuOpen && (
            <div className="dropdown-menu-language">
              <div className={`dropdown-item-language ${language === 'es' ? 'active' : ''}`}
                onClick={() => changeLanguage('es')}>
                <img src={esSvg} alt="Español" className="language-icon" /> Español
              </div>
              <div className={`dropdown-item-language ${language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}>
                <img src={enSvg} alt="English" className="language-icon" /> English
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.home')}</Link>
            <Link to="/about-me" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.aboutme')}</Link>
            <Link to="/skills" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.skills')}</Link>
            <Link to="/projects" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.projects')}</Link>
            <Link to="/contact" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.contact')}</Link>
          </div>
        </div>
      )}

    </nav>
    </>
  );
};
export default NavBar;