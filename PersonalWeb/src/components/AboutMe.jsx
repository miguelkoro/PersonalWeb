
import { useState, useContext, useEffect, useRef, useMemo } from 'react';
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
    const isAutoScrollingRef = useRef(false);
    const rafRef = useRef(0);
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

    const sectionOrder = useMemo(() => Object.keys(sectionContent), []);

    const smoothScrollToY = (targetY, durationMs = 700) => {
        // cancel any in-flight animation
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        isAutoScrollingRef.current = true;

        const startY = window.scrollY || window.pageYOffset || 0;
        const delta = targetY - startY;
        const start = performance.now();
        const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

        const tick = (now) => {
            const t = Math.min((now - start) / durationMs, 1);
            const e = easeInOutCubic(t);
            window.scrollTo(0, startY + delta * e);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                isAutoScrollingRef.current = false;
                rafRef.current = 0;
            }
        };

        rafRef.current = requestAnimationFrame(tick);
    };

    const smoothScrollToEl = (el, durationMs = 700) => {
        if (!el) return;
        // align top of the section to top of viewport
        const rect = el.getBoundingClientRect();
        const targetY = (window.scrollY || window.pageYOffset || 0) + rect.top;
        smoothScrollToY(targetY, durationMs);
    };

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Scroll global: detecta si la sección está visible y avanza/retrocede
    useEffect(() => {
        function onWheel(e) {
            // while we are auto-scrolling between sections, ignore wheel input
            if (isAutoScrollingRef.current) {
                e.preventDefault();
                return;
            }
            const idx = sectionOrder.indexOf(section);
            if (e.deltaY > 0) {
                // Scroll down
                const ref = sectionRefs.current[section];
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.bottom <= window.innerHeight + 2 && idx < sectionOrder.length - 1) {
                        e.preventDefault();
                        setSection(sectionOrder[idx + 1]);
                    }
                }
            } else if (e.deltaY < 0) {
                // Scroll up
                const ref = sectionRefs.current[section];
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top >= -2 && idx > 0) {
                        e.preventDefault();
                        setSection(sectionOrder[idx - 1]);
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
                smoothScrollToY(0, 750);
            } else {
                smoothScrollToEl(ref, 750);
            }
        }
    }, [section]);

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
