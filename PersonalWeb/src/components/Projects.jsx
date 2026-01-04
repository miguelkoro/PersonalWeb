import {DataContext} from '../context/DataContext';
import { useState, useContext, useEffect, useRef } from 'react';
import CardProject from './CardProject.jsx';
import ProyectWindow from './ProyectWindow.jsx';
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
    const [openProject, setOpenProject] = useState(null);

    useEffect(() => {
        setScreen('projects');
    }, []);

    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        if (openProject) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [openProject]);

    const projects = [
        {
            id: 'escapp',
            title: 'ESCAPP',
            imageSrc: '/Projects/ESCAPP/Logo_Escapp.png',
            imageAlt: 'ESCAPP',
            description: 'Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada djakd add akdj ad ak',
            longDescription: 'Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada  Description of Project 1 lore iptsim dhsej sjdajdk da j dakdjkada djakd add akdj ad ak',
            tags: ['HTML', 'CSS'],
            tagsColor: ['#ca360dff', '#025692ff'],
            demoUrl: 'https://example.com',
            githubUrl: 'https://github.com/miguelkoro',
        },
        {
            id: 'p2',
            title: 'Project 2',
            description: 'Description of Project 2',
            longDescription: 'Description of Project 2',
            tags: [],
        },
        { id: 'p3', title: 'Project 3', description: 'Description of Project 3', longDescription: 'Description of Project 3', tags: [] },
        { id: 'p4', title: 'Project 4', description: 'Description of Project 4', longDescription: 'Description of Project 4', tags: [] },
        { id: 'p5', title: 'Project 5', description: 'Description of Project 5', longDescription: 'Description of Project 5', tags: [] },
        { id: 'p6', title: 'Project 6', description: 'Description of Project 6', longDescription: 'Description of Project 6', tags: [] },
    ];



    
    return (<>
            {openProject ? (
                <div className="project-window-overlay" onClick={() => setOpenProject(null)}>
                    <div className="project-window-overlay__content" onClick={(e) => e.stopPropagation()}>
                        <ProyectWindow project={openProject} onClose={() => setOpenProject(null)} />
                    </div>
                </div>
            ) : null}

            <div id="skills" style={{  textAlign: 'center', paddingTop: '1rem' }}>
                <h2 className="skills-title" style={{textAlign: 'center'}}>{t('i.projects')}</h2>
            <div className='card-projects-wrapper' >
                {projects.map((p) => (
                    <CardProject
                        key={p.id}
                        title={p.title}
                        imageSrc={p.imageSrc}
                        imageAlt={p.imageAlt}
                        description={p.description}
                        tags={p.tags}
                        tagsColor={p.tagsColor}
                        onOpen={() => setOpenProject(p)}
                    />
                ))}
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
