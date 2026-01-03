import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import CardProject from './CardProject.jsx';
//import Footer from './Footer.jsx';
//import { Canvas, useFrame, useThree } from '@react-three/fiber';
//import * as THREE from 'three';
//import { OrbitControls, useGLTF } from '@react-three/drei';
//import { Link } from 'react-router-dom';
//import ThreeDAsset from './ThreeDAsset.jsx';
//import ThreeDProject from './ThreeDProject.jsx';
//import InConstruction from './InConstruction.jsx';

const Projects = () => {
    const { t, setScreen } = useContext(DataContext);
    useEffect(() => {
        setScreen('projects');
    }, []);



    
    return (<>
            <div id="skills" style={{  textAlign: 'center', paddingTop: '1rem' }}>
                <h2 className="skills-title" style={{textAlign: 'center'}}>{t('i.projects')}</h2>
            <div className='card-projects-wrapper' >
                <CardProject title="Project 1" imageSrc="/Projects/ESCAPP/Logo_Escapp.png" description="Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada djakd add akdj ad ak" tags={["HTML", "CSS"]} />
                <CardProject title="Project 1" description="Description of Project 1" />
                <CardProject title="Project 1" description="Description of Project 1" />
                <CardProject title="Project 1" description="Description of Project 1" />
                <CardProject title="Project 1" description="Description of Project 1" />
                <CardProject title="Project 1" description="Description of Project 1" />
            </div>
           
            {/* Fondo 3D interactivo */}
            {/*<div className='background_PC'>
                <ThreeDProject/>
            </div>*/}
        </div>
        {/*<Footer />*/}
        {/*<InConstruction />*/}
    </>
    );
}
export default Projects;
