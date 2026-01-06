import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const CanvasPlane = (props) => {
  const meshRef = useRef();
  const canvasRef = useRef(document.createElement('canvas'));
  const ctxRef = useRef(null);
  const accRef = useRef(0);
  const codingStateRef = useRef({
    lastSpawnT: 0,
    rects: [],
    linePointer: 0,
    lastTab: 0,
  });
  const [texture, setTexture] = useState(null);

  const createRoundedRect = (ctx, x, y, width, height, radius, color) => {
    const r = Math.max(0, Math.min(radius, width / 2, height / 2));
    ctx.fillStyle = color;

    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, width, height, r);
    } else {
      // Fallback para navegadores sin roundRect
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + width - r, y);
      ctx.arcTo(x + width, y, x + width, y + r, r);
      ctx.lineTo(x + width, y + height - r);
      ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
      ctx.lineTo(x + r, y + height);
      ctx.arcTo(x, y + height, x, y + height - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
    }
    ctx.closePath();
    ctx.fill();
  }





  const codingScreen = (ctx, width, height, t, dt, state) => {
    const padding = 28;
    const maxRects = 4;
    const spawnEvery = 1;
    const speedY = 20; // px/s
    const rectH = 14;
    const radius = 6;
    const tab = [0,20,40, 50]
    const colors = ['#3A86FF', '#2EC4B6', '#FFD166', '#EF476F'];


    // Draw "static" lines
    const paddingLeftX = 20;
    const linesNumber = 10;
    const linesW = 70;
    

    for (let i = 0; i < linesNumber; i++) {
      createRoundedRect(ctx, paddingLeftX, i * padding, linesW, rectH, radius, '#3A86FF');
    }
    ///

    // Spawn new rectangles over time
    if (t - state.lastSpawnT >= spawnEvery) {
      state.lastSpawnT = t;

      const rectW = 80 + Math.random() * 160;
      //const rectH = 10 + Math.random() * 26;
      const tabIndex = Math.floor(Math.random() * tab.length);
      state.rects.push({
        x: padding + tab[tabIndex],
        y: height + rectH,
        w: rectW,
        h: rectH,
        r: radius,
        //vy: -(speedY + Math.random() * 60),
        vy: -speedY,
        color: colors[tabIndex],
      });

      //if (state.rects.length > maxRects) {
      //  state.rects.splice(0, state.rects.length - maxRects);
     // }
    }

    // Update positions
    for (const rect of state.rects) {
      rect.y += rect.vy * dt;
    }

    // Remove off-screen
    state.rects = state.rects.filter((rect) => rect.y + rect.h > 0); //Se sale fuera de la pantalla

    // Draw
    for (const rect of state.rects) {
      //createRoundedRect(ctx, rect.x, rect.y, rect.w, rect.h, rect.r, rect.color);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 512;//512;
    canvas.height = 256;//256;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Pintado inicial (fondo)
    ctx.fillStyle = '#0B132B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Crear textura desde el canvas (si no, nunca se renderiza nada)
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
    // Cargar imagen
    /*const img = new window.Image();
    img.src = '/canvas_image.jpg'; // Debe estar en public/
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 512, 256); // Ajusta posición/tamaño
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    };*/
  }, []);

  useFrame((state, delta) => {
    const ctx = ctxRef.current;
    if (!ctx || !texture) return;

    // No hace falta redibujar a 60fps: 20fps es suficiente para “verlo” y ahorra CPU
    accRef.current += delta;
    if (accRef.current < 1 / 20) return;
    const dt = accRef.current;
    accRef.current = 0;

    const canvas = canvasRef.current;
    const w = canvas.width;
    const h = canvas.height;
    const t = state.clock.getElapsedTime();

    // Fondo
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0E1A2B';
    ctx.fillRect(0, 0, w, h);

    // Marco
    ctx.strokeStyle = '#ffffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // Texto animado
    codingScreen(ctx, w, h, t, dt, codingStateRef.current);

    texture.needsUpdate = true;
  });

  if (!texture) return null;
  return (
    <mesh ref={meshRef} position={props.position} rotation={props.rotation || [0,0,0]}>
      <planeGeometry args={[props.width, props.height]} />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}
export default CanvasPlane;