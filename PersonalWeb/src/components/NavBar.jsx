import "../styles/index.scss";
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
          <p className="navbar-text">Miguelkoro</p>
        </div>
      </div>
      
      <div className="navbar-center">
        <div className="navbar-manage">
          <a href="#inicio" className="manage-title">{t('i.home')}</a>
          <a href="#sobre-mi" className="manage-title">{t('i.aboutme')}</a>
          <a href="#habilidades" className="manage-title">{t('i.skills')}</a>
          <a href="#proyectos" className="manage-title">{t('i.projects')}</a>
          <a href="#contacto" className="manage-title">{t('i.contact')}</a>
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
            <a href="#inicio" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.home')}</a>
            <a href="#sobre-mi" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.aboutme')}</a>
            <a href="#habilidades" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.skills')}</a>
            <a href="#proyectos" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.projects')}</a>
            <a href="#contacto" className="mobile-menu-item" onClick={closeMobileMenu}>{t('i.contact')}</a>
          </div>
        </div>
      )}

    </nav>
    </>
  );
};
export default NavBar;