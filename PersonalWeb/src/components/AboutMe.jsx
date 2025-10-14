
import { useState, useContext, useEffect, useRef } from 'react';
import { DataContext } from '../context/DataContext.jsx';
import AboutMeSidebar from './AboutMeSidebar.jsx';
import ProfileSection from './ProfileSection.jsx';
import Education from './Education.jsx';
import Experience from './Experience.jsx';
import Footer from './Footer.jsx';



const AboutMe = () => {
    const { t, setScreen } = useContext(DataContext);
    const [section, setSection] = useState('profile');
    const sectionRefs = useRef({});
    useEffect(() => {
        setScreen('about-me');
    }, []);


    const sectionContent = {
        profile: () => <ProfileSection t={t}/>,
        //skills: t => <><h1>{t('skills')}</h1><p>{t('i.skills')}</p></>,
        education: t => <Education t={t} />,
        experience: t => <Experience t={t} />,
        
        //contact: t => <><h1>{t('contact')}</h1><p>{t('i.contact')}</p></>,
    };

    const sectionOrder = Object.keys(sectionContent);
    // Scroll global: detecta si la sección está visible y avanza/retrocede
    useEffect(() => {
        function onWheel(e) {
            const idx = sectionOrder.indexOf(section);
            if (e.deltaY > 0) {
                // Scroll down
                const ref = sectionRefs.current[section];
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.bottom <= window.innerHeight + 2 && idx < sectionOrder.length - 1) {
                        setSection(sectionOrder[idx + 1]);
                        setTimeout(() => {
                            sectionRefs.current[sectionOrder[idx + 1]]?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                    }
                }
            } else if (e.deltaY < 0) {
                // Scroll up
                const ref = sectionRefs.current[section];
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top >= -2 && idx > 0) {
                        setSection(sectionOrder[idx - 1]);
                        setTimeout(() => {
                            sectionRefs.current[sectionOrder[idx - 1]]?.scrollIntoView({ behavior: 'smooth' });
                        }, 0);
                    }
                }
            }
        }
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, [section]);

    // Cuando cambia la sección, hacer scroll a ella
    useEffect(() => {
        const ref = sectionRefs.current[section];
        if (ref) {
            if (section === sectionOrder[0]) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                ref.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [section, sectionOrder]);

    return (
        <>
        <div style={{ display: 'flex', minHeight: '100% - 5rem)' }}>
            <AboutMeSidebar currentSection={section} onSectionChange={setSection} />
            <div style={{ marginLeft: 60, flex: 1 }}>
                {sectionOrder.map(sec => (
                    <section
                        key={sec}
                        ref={el => (sectionRefs.current[sec] = el)}
                        style={{ minHeight: '100vh', padding: '0rem', paddingTop: '3rem', scrollSnapAlign: 'start' }}
                    >
                        {sectionContent[sec](t)}
                    </section>
                ))}
            </div>
        </div>
        
        </>
    );
};

export default AboutMe;
