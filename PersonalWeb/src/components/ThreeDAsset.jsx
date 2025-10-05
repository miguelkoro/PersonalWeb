// Ejemplo de asset 3D usando react-three-fiber
// Puedes reemplazar el contenido por un modelo real si lo tienes

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';




function useFollowRotation({ hovered, mouse, baseRotation }) {
  // baseRotation: [x, y, z]
  const ref = useRef();
  useFrame((state) => {
    let targetX = baseRotation[0];
    let targetY = baseRotation[1];
    if (hovered && mouse) {
      targetY += mouse.x * 0.10; // muy ligero
      targetX += mouse.y * 0.07;
    } else {
      // Oscilación suave cuando no hay mouse encima
      const t = state.clock.getElapsedTime();
      targetY += Math.sin(t * 0.5) * 0.07;
      targetX += Math.cos(t * 0.3) * 0.03;
    }
    if (ref.current) {
      ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
    }
  });
  return ref;
}

function ModelAndCanvasGroup({ mouse, hovered }) {
  const gltf = useGLTF('/computer_3D/scene.gltf');
  const baseRotation = [Math.PI/18, -Math.PI/26, 0];
  const groupRef = useFollowRotation({ hovered, mouse, baseRotation });
  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={4.1} position={[1, 0.5, 0]} />
      <CanvasPlane position={[0.84, 0.64, 1.59]} width={0.85} height={0.68} rotation={[-0.07, 0, 0]} />
    </group>
  );
}



function CanvasPlane({ position = [0, 1, 0], width = 1.2, height = 0.7 }) {
  const meshRef = useRef();
  const canvasRef = useRef(document.createElement('canvas'));
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 365;//512;
    canvas.height = 324;//256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Cargar imagen
    const img = new window.Image();
    img.src = '/canvas_image.jpg'; // Debe estar en public/
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 256, 256); // Ajusta posición/tamaño
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    };
  }, []);

  useFrame(() => {
    if (texture) texture.needsUpdate = true;
  });

  if (!texture) return null;
  return (
    <mesh ref={meshRef} position={position} rotation={arguments[0]?.rotation || [0,0,0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}




const ThreeDAsset = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  // Handler para mouse move
  const handlePointerMove = (e) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'visible', zIndex: 1 }}>
      <Canvas
        style={{ width: '100%', height: '100%', overflow: 'visible', background: 'transparent', position: 'absolute', left: 0, top: 0 }}
        camera={{ position: [2, 1.5, 3] }}
        onPointerMove={e => { setHovered(true); handlePointerMove(e); }}
        onPointerOut={() => setHovered(false)}
      >
        <ambientLight intensity={0.7} color={new THREE.Color(0xffffff)} />
        <directionalLight position={[2, 2, 2]} intensity={0.7} />
    <ModelAndCanvasGroup mouse={mouse} hovered={hovered} />
        <OrbitControls enableZoom={false} enablePan={false} enableDamping={true} dampingFactor={0.01} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI /16} maxAzimuthAngle={Math.PI / 16} />
      </Canvas>
    </div>
  );
};

// Necesario para que useGLTF funcione correctamente
// eslint-disable-next-line react-refresh/only-export-components
useGLTF.preload('/computer_3D/scene.gltf');

export default ThreeDAsset;
