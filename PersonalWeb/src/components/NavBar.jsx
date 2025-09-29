import "../styles/index.scss";
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Logo from '../assets/mk_logo.png';
import enSvg from '../assets/gb.svg';
import esSvg from '../assets/es.svg';
import { DataContext } from '../context/DataContext.jsx';

const NavBar = () => {
  const { t, language, setLanguage } = useContext(DataContext);
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
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <div className="typewriter">
          <Link to="/" className="navbar-text">Miguelkoro</Link>
        </div>
      </div>
      
      <div className="navbar-center">
        <div className="navbar-manage">
          <Link to="/" className="manage-title">{t('i.home')}</Link>
          <Link to="/about-me" className="manage-title">{t('i.aboutme')}</Link>
          <Link to="/skills" className="manage-title">{t('i.skills')}</Link>
          <Link to="/projects" className="manage-title">{t('i.projects')}</Link>
          <Link to="/contact" className="manage-title">{t('i.contact')}</Link>
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
            <Link to="/inicio" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.home')}</Link>
            <Link to="/sobre-mi" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.aboutme')}</Link>
            <Link to="/habilidades" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.skills')}</Link>
            <Link to="/proyectos" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.projects')}</Link>
            <Link to="/contacto" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.contact')}</Link>
          </div>
        </div>
      )}

    </nav>
    </>
  );
};
export default NavBar;