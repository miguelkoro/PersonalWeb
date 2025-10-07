import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThreeDAsset from './ThreeDAsset.jsx';
import { DataContext } from '../context/DataContext.jsx';

const Home = () => {
    const { t, language, setLanguage, screen, setScreen } = useContext(DataContext);    
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const handlePointerMove = (e) => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
    };

    useEffect(() => {
        setScreen('home');
    }, []);
    return (
        <div style={{ position: 'relative', width: '100%',  overflow: 'visible' }} onMouseMove={handlePointerMove}>
            {/* Columna izquierda: texto y botones */}
            <div style={{
                position: 'relative',
                width: '35%',
                minWidth: '35%',
                zIndex: 2,            
                
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1 className='name_title'>Miguel<br />Coronel
                </h1>
                <h2 className='job_title'>{t('i.jobtitle')}</h2>
                <div className='home_buttons'>
                    <Link to="/projects" ><button className="home_button_projects"><span>{t('i.seeprojects')}</span></button></Link>
                    <Link to="/contact" ><button className="home_button"><span>{t('i.contactme')}</span></button></Link>
                </div>
            </div>
            {/* Fondo 3D interactivo */}
            <div className='background_PC'>
                <ThreeDAsset mouse={mouse} handlePointerMove={handlePointerMove} />
            </div>
        </div>
    );
};

export default Home;
