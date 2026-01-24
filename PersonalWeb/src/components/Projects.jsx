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
            title: t('i.projectTitle1'),
            imageSrc: '/Projects/ESCAPP/Logo_Escapp.png',
            imageAlt: t('i.projectTitle1'),
            description: t('i.projectDescription1'),
            longDescription: t('i.projectLongDescription1'),
            tags: ['HTML', 'CSS', 'React', 'JS'],
            tagsColor: ['#ca360dff', '#025692ff', '#148f14ff', '#c58000ff'],
            //demoUrl: 'https://example.com',
            //githubUrl: 'https://github.com/miguelkoro',
        },
        {
            id: 'WebThreeJS',
            title: t('i.projectTitle2'),
            imageSrc: '/Projects/ThreeJS/ThreeJS.png',
            description: t('i.projectDescription2'),
            longDescription: t('i.projectLongDescription2'),
            tags: ['HTML', 'Three.js', 'JS'],
            tagsColor: ['#ca360dff', '#bb007dff', '#c58000ff'],
            githubUrl: 'https://github.com/miguelkoro/Threejs',
            demoUrl: 'https://miguelkoro.github.io/WebPersonal/',
        },
        { id: 'p3', title: 'Project 3', description: 'Description of Project 3', longDescription: 'Description of Project 3', tags: [] },
        { id: 'p4', title: 'Project 4', description: 'Description of Project 4', longDescription: 'Description of Project 4', tags: [] },
        { 
            id: 'WebCanvas', 
            title: t('i.projectTitle5'), 
            description: t('i.projectDescription5'), 
            longDescription: t('i.projectLongDescription5'), 
            tags: ['HTML', 'CSS', 'JS', 'Canvas'], 
            tagsColor: ['#ca360dff', '#025692ff', '#c58000ff', '#808080ff'],
            //imageSrc: '/Projects/Canvas/Canvas.png',
            githubUrl: 'https://github.com/miguelkoro/TVWeb',
        },
        //{ id: 'p6', title: 'Project 6', description: 'Description of Project 6', longDescription: 'Description of Project 6', tags: [] },
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
                        t={t}
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
