import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import CanvasProject from './CanvasProject.jsx';
import CanvasFloppy from './CanvasFloppy.jsx';

const FloppyAnimated = (props) => {
    const floppy = useGLTF('/floppy/scene.gltf');
    const meshRef = useRef();
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const selectedPositionY = 0.5; // target Y when selected

    // Create multiple back-face clones with additive blending to approximate a silhouette rim + glow.
    // We render a few layers with increasing "thickness" (displacement along normal) and decreasing opacity
    // to create a smooth glow outward from the silhouette. This avoids adding postprocessing dependencies.
    const outlineClones = useMemo(() => {
        if (!floppy || !floppy.scene) return null;

    // thickness values for two lightweight glow layers (outer -> inner)
    const layers = [0.06, 0.03];
        const baseColor = new THREE.Color('#8737d1');

    // alphas for each layer (outer -> inner)
    const alphas = [0.18, 0.36];
        return layers.map((thickness, i) => {
            // shader material displacing along normals
            const mat = new THREE.ShaderMaterial({
                uniforms: {
                    thickness: { value: thickness },
                    outlineColor: { value: baseColor.clone() },
                    alpha: { value: alphas[i] || 0.2 }
                },
                vertexShader: `
                    uniform float thickness;
                    void main() {
                      vec3 displaced = position + normal * thickness;
                      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 outlineColor;
                    uniform float alpha;
                    void main() {
                      gl_FragColor = vec4(outlineColor, alpha);
                    }
                `,
                side: THREE.BackSide,
                depthWrite: false,
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const clone = floppy.scene.clone(true);
            clone.traverse((c) => {
                if (c.isMesh) {
                    c.material = mat;
                }
            });

            return clone;
        });
    }, [floppy]);

    // Option B: a simpler fallback using MeshBasicMaterial clones (robust silhouette, less shader fiddling)
    // Enabled by default for user testing (set to false to use shader-based outlineClones)
    const useBasicOutline = true;
    const outlineClonesBasic = useMemo(() => {
    if (!floppy || !floppy.scene) return null;
    const layers = [0.06, 0.03];
    const baseColor = new THREE.Color('#8737d1');
    const alphas = [0.18, 0.5];

        return layers.map((thickness, i) => {
            // Basic material painted on back faces; we'll scale clones slightly outward
            const mat = new THREE.MeshBasicMaterial({
                color: baseColor.clone(),
                side: THREE.BackSide,
                transparent: true,
                opacity: alphas[i] || 0.25
            });
            // additive-ish look
            mat.blending = THREE.AdditiveBlending;
            // respect depth but don't write it so the silhouette doesn't occlude the real mesh
            mat.depthTest = true;
            mat.depthWrite = false;

            const clone = floppy.scene.clone(true);
            clone.traverse((c) => {
                if (c.isMesh) {
                    c.material = mat;
                    c.material.polygonOffset = true;
                    c.material.polygonOffsetFactor = -2;
                    c.material.polygonOffsetUnits = -4;
                    c.renderOrder = 999;
                }
            });

            // userData to control per-layer scale when rendering
            clone.userData.__glowScale = 1 + i * 0.03;
            return clone;
        });
    }, [floppy]);

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

    const onClick = (e) => {
        // prefer onClick prop (passed from parent), fallback to onSelect/index pattern
        console.log('Floppy clicked');
        if (props.onClick) return props.onClick(e);
        if (props.onSelect && typeof props.index !== 'undefined') return props.onSelect(props.index);
    };

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* render stacked outline clones behind model when hovered to produce silhouette + glow
                if useBasicOutline is true we render `outlineClonesBasic` (MeshBasicMaterial fallback)
            */}
            {hovered && (useBasicOutline ? outlineClonesBasic : outlineClones) && (useBasicOutline ? outlineClonesBasic : outlineClones).map((clone, i) => (
                <primitive
                    key={i}
                    object={clone}
                    rotation={[Math.PI / 2, -Math.PI / 2, 0]}
                    // allow per-layer scale so outer layers envelope the model
                    scale={0.05 * (clone.userData?.__glowScale || 1)}
                    position={[0, 0, props.positionZ]}
                />
            ))}

            {/* invisible plane in front to reliably capture pointer events */}
            <mesh
                position={[0, 0, props.positionZ]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true);  }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
                onPointerDown={(e) => { e.stopPropagation(); onClick(e); }}
            >
                <planeGeometry args={[0.45, 0.45]} />
                <meshBasicMaterial transparent opacity={0} depthTest={false} />
            </mesh>

            <primitive
                object={floppy.scene.clone(true)}
                ref={meshRef}
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
        { positionZ: 0.2, title: 'ESCAPP UPM', description: ['This is a description for ESCAPP UPM, blabla mola mucho y no se que mas poner'], tags: ['React', 'JS', 'HTML', 'CSS'], colors: ['#00b922ff', '#d32701ff', '#9eca00ff', '#0061cfff'] }
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
                <pointLight position={[0.31, 0.2, 1.9]}
                    color={'#9adefd'} intensity={2}
                    distance={4}    /* increase to spread further across the scene */
                    decay={0.15}       /* lower decay -> less sharp falloff */
                />
                <CanvasProject position={[0.345, 0.179, 1.79]} width={0.967} height={0.749} rotation={[-0.07, -Math.PI/18, 0]} />
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