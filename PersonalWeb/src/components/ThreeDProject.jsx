import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import CanvasPlane from './CanvasPlane.jsx';
import CanvasFloppy from './CanvasFloppy.jsx';

const FloppyAnimated = (props) => {
    const floppy = useGLTF('/floppy/scene.gltf');
    const meshRef = useRef();
    const groupRef = useRef();
    const selectedPositionY = 0.3; // target Y when selected

    // Smooth transition with an exponential ease (frame-rate independent)
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        const targetY = props.selected ? selectedPositionY : 0;
        // k controls the stiffness (higher = faster)
        const k = 8;
        const ease = 1 - Math.exp(-k * delta);
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * ease;
        // optional per-frame updates for the mesh
        if (meshRef.current) {
            // meshRef.current.rotation.y += 0.002;
        }
    });

    useEffect(() => {
        // ensure initial position matches selected state on mount
        if (groupRef.current) groupRef.current.position.y = props.selected ? selectedPositionY : 0;
    }, []); // run once on mount

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <primitive
                object={floppy.scene.clone(true)}
                ref={meshRef}
                //onPointerDown={onClick}
                rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                scale={0.05}
                position={[0, 0, props.positionZ]}
            />
            {props.selected && (
                <CanvasFloppy position={[0, -0.081, props.positionZ + 0.009]} width={0.355} height={0.235} 
                title={props.title} description={props.description} tags={props.tags} colors={props.colors} />
            )}
        </group>
    );
}

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

    // Data array for floppys (kept as `floppyArray` so you can customize text/other props)
    const floppyArray = [
        { positionZ: 0, title: 'WEB PERSONAL', description: ['This is a description for WEB PERSONAL'], tags: ['HTML', 'CSS'], colors: ['#ff5733', '#33c1ff'] },
        { positionZ: 0.1, title: 'SOMETHING', description: ['This is a description for SOMETHING HERE'], tags: ['JavaScript'], colors: ['#ff33a1'] },
        { positionZ: 0.2, title: 'ESCAPP UPM', description: ['This is a description for ESCAPP UPM, blabla mola mucho y tiene muchas cositas'], tags: ['React', 'JS', 'HTML', 'CSS'], colors: ['#00b922ff', '#d32701ff', '#9eca00ff', '#0061cfff'] }
    ];

    // Single source of truth for selection
    const [selectedIndex, setSelectedIndex] = useState(floppyArray.length - 1);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible', zIndex: 1 }}>
            <Canvas
                style={{ width: '100%', height: '100%', overflow: 'visible', background: 'transparent', position: 'absolute', left: 0, top: 0 }}
                camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.7} color={new THREE.Color(0xffffff)} />
                <directionalLight position={[2, 2, 2]} intensity={0.7} />
                <primitive object={computer.scene}  scale={4.8} position={[0.85, 0, 0]} rotation={[0, -Math.PI / 18, 0]} />
                {/*<CanvasPlane position={[0.84, 0.65, 1.59]} width={0.85} height={0.66} rotation={[-0.07, 0, 0]} />*/}
                <group ref={floppyRef} rotation={[ 0,Math.PI/12 ,0]} position={[-0.72,-0.35,1.83]} scale={1.2}>
                    {floppyArray.map((item, index) => (
                            <FloppyAnimated
                                key={index}
                                positionZ={item.positionZ}
                                selected={index === selectedIndex}
                                onClick={() => setSelectedIndex(index)}
                                // pass text or other data for CanvasFloppy later
                                title={item.title}
                                description={item.description}
                                tags={item.tags}
                                colors={item.colors}
                            />
                    ))}
                </group>
            </Canvas>
            {/* Flecha de interfaz HTML/CSS en la zona central izquierda */}

        <svg
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
        </svg>

        </div>
    );
};
useGLTF.preload('/computer_screen/computer_screen.gltf');
useGLTF.preload('/floppy/scene.gltf');
export default ThreeDProject;