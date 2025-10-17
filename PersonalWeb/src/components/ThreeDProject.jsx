import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Link } from 'react-router-dom';
import ThreeDAsset from './ThreeDAsset.jsx';
import { useRef, useEffect, useState } from 'react';

const FloppyAnimated = ({ object, onClick, ...props }) => {
        const ref = useRef();
        useFrame(() => {
            if (ref.current) {
               //ref.current.rotation.y += 0.01;
                }
        });
        return <primitive object={object} ref={ref} {...props} onPointerDown={onClick} />;
}

const ThreeDProject = (props) => {
    // El canvas ya no controla el hover ni el pointermove
    const computer = useGLTF('/computer_screen/computer_screen.gltf');
    const floppy = useGLTF('/floppy/scene.gltf');
    const floppyRef= useRef();
    /*const floppyRef = useRef();

    useFrame(() => {
    if (floppyRef.current) {
        floppyRef.current.rotation.y += 0.01; // Rota en el eje Y
    }
    });*/

        return (
            <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible', zIndex: 1 }}>
                <Canvas
                    style={{ width: '100%', height: '100%', overflow: 'visible', background: 'transparent', position: 'absolute', left: 0, top: 0 }}
                    camera={{ position: [0, 0, 3] }}
                >
                    <ambientLight intensity={0.7} color={new THREE.Color(0xffffff)} />
                    <directionalLight position={[2, 2, 2]} intensity={0.7} />
                    <primitive object={computer.scene}  scale={4.6} position={[0.8, 0, 0]} rotation={[0, -Math.PI / 16, 0]} />
                    <group ref={floppyRef}>
                        <FloppyAnimated 
                            object={floppy.scene} 
                            scale={0.05} 
                            position={[-0.6, -0.2, 2]} 
                            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                            onClick={() => console.log('Floppy animado pulsado')}
                        />
                    </group>
                    <primitive 
                        object={floppy.scene.clone(true)} 
                        scale={0.05} 
                        position={[1, -0.3, 1.9]} 
                        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    />
                </Canvas>
                {/* Flecha de interfaz HTML/CSS en la zona central izquierda */}

                    

    <svg className='arrowSvg' style={{ left: "-6rem" }} onClick={() => alert("fdfdf")}  width="18px" height="17px" viewBox="-1 0 18 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
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