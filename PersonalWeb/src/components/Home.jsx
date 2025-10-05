import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeDAsset from './ThreeDAsset.jsx';
import { DataContext } from '../context/DataContext.jsx';

const Home = () => {
    const { t, language, setLanguage, screen, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('home');
    }, []);
    return (
        <div style={{ position: 'relative', width: '100%',  overflow: 'visible' }}>
            {/* Columna izquierda: texto y botones */}
            <div style={{
                position: 'relative',
                width: '35%',
                minWidth: '35%',
                zIndex: 2,            
                
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 className='name_title'>Miguel</h1>
                <h1 className='name_title'>Coronel</h1>
                <h2 className='job_title'>{t('i.jobtitle')}</h2>
                <div className='home_buttons'>
                    <Link to="/projects" style={{ padding: '0.8rem 2.5rem', background: '#4f8cff', color: 'white', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #0002', width: 'fit-content', textAlign: 'center' }}>Ver proyectos</Link>
                    <Link to="/contact" style={{ padding: '0.8rem 2.5rem', background: 'transparent', color: '#4f8cff', border: '2px solid #4f8cff', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #0002', width: 'fit-content', textAlign: 'center' }}>Contactar</Link>
                </div>
            </div>
            {/* Fondo 3D interactivo */}
            <div className='background_PC'>
                <ThreeDAsset />
            </div>
        </div>
    );
};

export default Home;
