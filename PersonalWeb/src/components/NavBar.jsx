import "../styles/index.scss";
import { useState, useContext } from 'react';
import Logo from '../assets/mk_logo.png';
import enSvg from '../assets/gb.svg';
import esSvg from '../assets/es.svg';
import { DataContext } from '../context/DataContext.jsx';

const NavBar = () => {
  const { t, language, setLanguage } = useContext(DataContext);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const handleLanguageMouseEnter = () => setLanguageMenuOpen(true);
  const handleLanguageMouseLeave = () => setLanguageMenuOpen(false);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageMenuOpen(false);
  };

  return (
    <>
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="Logo" className="navbar-logo" />
        <div className="typewriter">
          <p className="navbar-text">Miguelkoro</p>
        </div>
      </div>
      <div className="navbar-manage">
        <a href="#inicio" className="manage-title">{t('i.home')}</a>
        <a href="#sobre-mi" className="manage-title">{t('i.aboutme')}</a>
        <a href="#habilidades" className="manage-title">{t('i.skills')}</a>
        <a href="#proyectos" className="manage-title">{t('i.projects')}</a>
        <a href="#contacto" className="manage-title">{t('i.contact')}</a>
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

    </nav>
    </>
  );
};
export default NavBar;