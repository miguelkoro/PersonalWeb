import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import Footer from './Footer.jsx';

const Projects = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('projects');
    }, []);
    
    return (
        <>
        <div>
            <h1>{t('i.projects')}</h1>
            <p>{t('i.projectsText')}</p>
        </div>
        <Footer />
        </>
    );
}
export default Projects;
