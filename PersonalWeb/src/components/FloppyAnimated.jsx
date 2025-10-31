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
    const selectedPositionY = 0.0; // target Y when selected
    // no local slot state needed — parent tells us the slot via props.position
    const [animating, setAnimating] = useState(false);

    // animation state for move-to-last behavior
    const animRef = useRef({ running: false, start: 0, base: null, target: null });
    const dx = 0.41; // how much to move right
    const dz = 0.15; // how much to advance on Z
    const dur1 = 0.4; // seconds move right
    const dur2 = 0.5; // seconds advance on z
    const dur3 = 0.3; // seconds return on x

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


        // handle selection animation if running
        if (animRef.current && animRef.current.running) {
            const now = performance.now();
            const elapsed = (now - animRef.current.start) / 1000; // seconds

            const base = animRef.current.base || { x: 0, y: 0, z: 0 };
            const target = animRef.current.target || base;

            const totalDur = dur1 + dur2 + dur3;
            const prevY = (animRef.current && typeof animRef.current.prevY === 'number') ? animRef.current.prevY : groupRef.current.position.y;
            const yProgress = Math.min(elapsed / totalDur, 1);
            const y = THREE.MathUtils.lerp(prevY, 0, yProgress);

            if (elapsed < dur1) {
                // phase 1: move right on x
                const t = elapsed / dur1;
                const x = THREE.MathUtils.lerp(base.x, base.x + dx, t);
                groupRef.current.position.x = x;
                groupRef.current.position.y = y;
            } else if (elapsed < dur1 + dur2) {
                // phase 2: advance on z (keep x at pushed position)
                const t = (elapsed - dur1) / dur2;
                const x = base.x + dx;
                const z = THREE.MathUtils.lerp(base.z, base.z + dz, t);
                groupRef.current.position.x = x;
                groupRef.current.position.z = z;
                groupRef.current.position.y = y;
            } else if (elapsed < dur1 + dur2 + dur3) {
                // phase 3: move to target x,z
                const t = (elapsed - dur1 - dur2) / dur3;
                const x = THREE.MathUtils.lerp(base.x + dx, target.x, t);
                const z = THREE.MathUtils.lerp(base.z + dz, target.z, t);
                groupRef.current.position.x = x;
                groupRef.current.position.z = z;
                groupRef.current.position.y = y;
                 
            } else {
                // finished: snap to target and notify parent once
                groupRef.current.position.set(target.x, 0, target.z);
                // stop animating (causes re-render so CanvasFloppy visibility updates)
                try { setAnimating(false); } catch (e) {}
                animRef.current.running = false;
                
               props.onMoveDone(props.index);
                   
                
            }
        }
    });

    // Simple effect: position this floppy according to the slot index the parent passes
    useEffect(() => {
        /*const slot =  props.position 
        const pos = props.positions[slot]*/

       /* if (groupRef.current && pos) {
            groupRef.current.position.set(
                typeof pos.x === 'number' ? pos.x : groupRef.current.position.x,
                typeof pos.y === 'number' ? pos.y : groupRef.current.position.y,
                typeof pos.z === 'number' ? pos.z : groupRef.current.position.z
            );
        }*/
    }, [props.position, props.positions]);

   /* useEffect(() => {
        // ensure initial position matches selected state on mount
        if (groupRef.current) groupRef.current.position.y = props.selected ? selectedPositionY : 0;
    }, []); // run once on mount*/

    // When clicked, run the move animation locally, then notify the parent to finalize move
    const onClick = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        // if already animating, ignore
        if (animRef.current && animRef.current.running) return;

        // compute base (current slot position) and target (last slot position)
        const slot = Number.isFinite(props.position) ? props.position : 0;
        const base = (props.positions && props.positions[slot]) ? props.positions[slot] : { x: 0, y: 0, z: 0 };
    const slotsCount = Array.isArray(props.positions) ? props.positions.length : 0;
    const targetSlot = Math.max(0, slotsCount - 1);
    // if this floppy is already the last slot AND selected, do nothing
    if (props.position === targetSlot && props.selected) return;
    const target = (props.positions && props.positions[targetSlot]) ? props.positions[targetSlot] : base;

        // initialize animation state with explicit base/target
        animRef.current = {
            running: true,
            start: performance.now(),
            base,
            target,
        };
        // save current Y so we can lower it smoothly during the animation
        if (groupRef.current) {
            animRef.current.prevY = groupRef.current.position.y;
        }
        setAnimating(true);
        console.log('Floppy click animation start', props.index);
    };

    return (
        <group ref={groupRef} position={[
            (props.positions && props.positions[props.position] && props.positions[props.position].x) || 0,
            0,
            (props.positions && props.positions[props.position] && props.positions[props.position].z) || 0
        ]}>
            

            {/* invisible plane in front to reliably capture pointer events */}
            <mesh
                position={[0, 0, 0]}
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
                position={[0, 0, 0]}
            />
            {(props.selected || animating) && (
                <CanvasFloppy position={[0, - 0.081,  0.009]} width={0.355} height={0.235}
                title={props.title} description={props.description} tags={props.tags} colors={props.colors} />
            )}
        </group>
    );
}

export default FloppyAnimated;