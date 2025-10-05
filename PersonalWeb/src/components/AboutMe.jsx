import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext.jsx';
const AboutMe = () => {
    const { t, language, setLanguage, screen, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('about-me');
    }, []);
    return (
        <div><h1>Sobre mí</h1><p>Información sobre mí.</p></div>
    );
};
export default AboutMe;
