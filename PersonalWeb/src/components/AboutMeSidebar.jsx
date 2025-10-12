import React from 'react';
import { useContext,  } from 'react';
import { DataContext } from '../context/DataContext.jsx';


function AboutMeSidebar({ currentSection, onSectionChange }) {
  const { t } = useContext(DataContext);
  const sections = [
    /*{ id: 'profile', icon: '👤', label: 'Perfil' },
    //{ id: 'skills', icon: '🛠️', label: 'Habilidades' },
    { id: 'education', icon: '🎓', label: 'Educación' },
    { id: 'experience', icon: '💼', label: 'Experiencia' },*/
    { id: 'profile', icon: <img src="/profile_pic.svg"  className="about_me_navbar_icon" />, label:  t('i.profile')  },
    //{ id: 'skills', icon: <img src="/skills.png" alt="Habilidades" style={{width: '1.7rem', height: '1.7rem'}} />, label: 'Habilidades' },
    { id: 'education', icon: <img src="/graduation_cap.png"  className="about_me_navbar_icon"  />, label:  t('i.education')  },
    { id: 'experience', icon: <img src="/briefcase.svg"  className="about_me_navbar_icon" />, label:  t('i.experience')  },

  ];
  return (
    <nav className="aboutme-sidebar">
      <ul>
        {sections.map(section => (
          <li key={section.id} className={currentSection === section.id ? 'active' : ''}
            onClick={() => onSectionChange(section.id)} >
            <span className="sidebar-label-bar">{section.label}</span>
            <span className="sidebar-icon">{section.icon}</span>            
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default AboutMeSidebar;
