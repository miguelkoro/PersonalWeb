import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import { useRef, useEffect, useState, useMemo } from 'react';
import CanvasFloppy from './CanvasFloppy.jsx';

const FloppyAnimated = (props) => {
    const floppy = useGLTF(props.model);
    const meshRef = useRef();
    const groupRef = useRef();
    const { gl } = useThree();
    const [hovered, setHovered] = useState(false);
    const selectedPositionY = 0.3; // target Y when selected

    //const tex = useTexture(props.texture);
    

    // Smooth transition with an exponential ease (frame-rate independent)
    // Now includes hover elevation: when hovered, the floppy will lift slightly on Y.
    useFrame((_, delta) => {
        if (!groupRef.current) return;
        const hoverOffset = 0.08; // small lift on hover (in scene units)
        // priority: selected state (larger lift) > hover (small lift) > default 0
        const targetY = props.selected ? selectedPositionY : (hovered ? hoverOffset : 0);
        // k controls the stiffness (higher = faster)
        const k = 8;
        const ease = 1 - Math.exp(-k * delta);
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * ease;
        // optional per-frame updates for the mesh
        if (meshRef.current) {
            // meshRef.current.rotation.y += 0.002;
        }
    });

   /* useEffect(() => {
        // ensure initial position matches selected state on mount
        if (groupRef.current) groupRef.current.position.y = props.selected ? selectedPositionY : 0;
    }, []); // run once on mount*/

    const onClick = (e) => {
        // prefer onClick prop (passed from parent), fallback to onSelect/index pattern
        console.log('Floppy clicked');
        props.onClick(e);
        //if (props.onSelect && typeof props.index !== 'undefined') return props.onSelect(props.index);
    };

    return (
        <group ref={groupRef} position={[props.positionX, 0, 0]}>
            

            {/* invisible plane in front to reliably capture pointer events */}
            <mesh
                position={[0, 0, props.positionZ]}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); if (gl && gl.domElement) gl.domElement.style.cursor = 'pointer'; }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); if (gl && gl.domElement) gl.domElement.style.cursor = ''; }}
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
                <CanvasFloppy position={[0, - 0.081, props.positionZ + 0.009]} width={0.355} height={0.235}
                title={props.title} description={props.description} tags={props.tags} colors={props.colors} />
            )}
        </group>
    );
}

export default FloppyAnimated;