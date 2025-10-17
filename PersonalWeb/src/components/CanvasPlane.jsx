import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function CanvasPlane({ position = [0, 1, 0], width , height , rotation }) {
  const meshRef = useRef();
  const canvasRef = useRef(document.createElement('canvas'));
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 512;//512;
    canvas.height = 256;//256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Cargar imagen
    const img = new window.Image();
    img.src = '/canvas_image.jpg'; // Debe estar en public/
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 256); // Ajusta posición/tamaño
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
    <mesh ref={meshRef} position={position} rotation={rotation || [0,0,0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}
export default CanvasPlane;