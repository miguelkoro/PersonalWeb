import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import {  useGLTF } from '@react-three/drei';
import { useRef,  useState } from 'react';
import CanvasProject from './CanvasProject.jsx';
import FloppyAnimated from './FloppyAnimated.jsx';



const ThreeDProject = (props) => {
    // El canvas ya no controla el hover ni el pointermove
    const computer = useGLTF('/computer_screen/computer_screen.gltf');
    //const positionZ = 0;
    
    const floppyRef= useRef();
    
    /*const floppyRef = useRef();

    
    useFrame(() => {
    if (floppyRef.current) {
        floppyRef.current.rotation.y += 0.01; // Rota en el eje Y
    }
    });*/
    const models = [
        '/floppy_grey/scene.gltf',
        '/floppy_blue/scene.gltf',
        '/floppy_orange/scene.gltf',
        //useLoader(THREE.TextureLoader, '/floppy/textures/green.png')
    ];

    const positions = [
        { x: 0.08, z: 0 },
        { x: 0.04, z: 0.01 },
        { x: 0, z: 0.02 }
    ];

    // Data array for floppys (kept as `floppyArray` so you can customize text/other props)
    const floppyArray = [
        { title: 'WEB PERSONAL', model: models[1], description: ['This is a description for WEB PERSONAL'], tags: ['HTML', 'CSS'], colors: ['#ff5733', '#33c1ff'] },
        { title: 'SOMETHING', model: models[0], description: ['This is a description for SOMETHING HERE'], tags: ['JavaScript'], colors: ['#ff33a1'] },
        { title: 'ESCAPP UPM', model: models[2], description: ['This is a description for ESCAPP UPM, blabla mola mucho y no se que mas poner'], tags: ['React', 'JS', 'HTML', 'CSS'], colors: ['#00b922ff', '#d32701ff', '#9eca00ff', '#0061cfff'] }
    ];

    // Single source of truth for selection
    const [selectedIndex, setSelectedIndex] = useState(floppyArray.length - 1);

    const [positionsList, setPositionsList] = useState([0,1,2]);

    const floppyOnClick = (index) => {
        setSelectedIndex(index);
        setPositionsList(prev => {
            const filtered = prev.filter(v => v !== index);
            return [...filtered, index];
        });
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible', zIndex: 1 }}>
            <Canvas
                style={{ width: '100%', height: '100%', overflow: 'visible', background: 'transparent', position: 'absolute', left: 0, top: 0 }}
                camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.7} color={new THREE.Color(0xffffff)} />
                <directionalLight position={[2, 2, 2]} intensity={0.7} />
                <group scale={1.03}>
                    <primitive object={computer.scene}  scale={4.8} position={[0.85, 0, 0]} rotation={[0, -Math.PI / 18, 0]} /><CanvasProject position={[0.345, 0.179, 1.79]} width={0.967} height={0.749} rotation={[-0.07, -Math.PI/18, 0]} />
                    <CanvasProject position={[0.345, 0.179, 1.79]} width={0.967} height={0.749} rotation={[-0.07, -Math.PI/18, 0]} />
                </group>
                <pointLight position={[0.31, 0.2, 1.9]} color={'#9adefd'} intensity={2} distance={4} decay={0.15} />
                
                <group ref={floppyRef} rotation={[ 0,Math.PI/26 ,0]} position={[-0.48,-0.1,2.3]} scale={1}>
                    {positionsList.map((floppyIdx, slotIdx) => {
                        const item = floppyArray[floppyIdx];
                        if (!item) return null;
                        return (
                            <FloppyAnimated
                                key={`${floppyIdx}-${slotIdx}`}
                                index={floppyIdx}
                                position={slotIdx}
                                positions={positions}
                                model={item.model}
                                selected={floppyIdx === selectedIndex}
                                // pass finalize handler; child will call this after its animation completes
                                onMoveDone={floppyOnClick}
                                title={item.title}
                                description={item.description}
                                tags={item.tags}
                                colors={item.colors}
                                positionsList={positionsList}
                            />
                        );
                    })}
                </group>
            </Canvas>
            {/* Flecha de interfaz HTML/CSS en la zona central izquierda */}

        {/*<svg
            className='arrowSvg'
            style={{ left: "-6rem" }}
            onClick={() => setSelectedIndex(prev => (prev === floppyArray.length - 1 ? 0 : prev + 1))}
            width="18px"
            height="17px"
            viewBox="-1 0 18 17"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#b62bf7" />
                    <stop offset="100%" stopColor="#1f63f7" />
                </linearGradient>
            </defs>
            <g>
                <polygon className="arrow" fill="url(#arrow-gradient)" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
                <polygon className="arrow-fixed" fill="url(#arrow-gradient)" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
                <path fill="url(#arrow-gradient)" d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z" />
            </g>
        </svg>*/}

        </div>
    );
};
useGLTF.preload('/computer_screen/computer_screen.gltf');
useGLTF.preload('/floppy_grey/scene.gltf');
useGLTF.preload('/floppy_blue/scene.gltf');
export default ThreeDProject;