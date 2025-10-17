import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import Footer from './Footer.jsx';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ThreeDAsset from './ThreeDAsset.jsx';
import ThreeDProject from './ThreeDProject.jsx';

const Projects = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('projects');
    }, []);
        const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const handlePointerMove = (e) => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
    };


    
    return (<>
        <div style={{ position: 'relative', width: '100%',  overflow: 'visible' }} onMouseMove={handlePointerMove}>
           
            <h2 className="projects-title">{t('i.projects')}</h2>
           
            {/* Fondo 3D interactivo */}
            <div className='background_PC'>
                <ThreeDProject/>
            </div>
        </div>
        <Footer />
    </>
    );
}
export default Projects;
