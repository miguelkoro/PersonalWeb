import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const CanvasPlane = (props) => {
  const meshRef = useRef();
  const canvasRef = useRef(document.createElement('canvas'));
  const ctxRef = useRef(null);
  const accRef = useRef(0);
  const codingStateRef = useRef({
    initialized: false,
    lastSpawnT: 0,
    lines: [],
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
  };

  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getCodingOpts = (width) => ({
    // layout
    marginLeft: 22,
    marginRight: 22,
    lineSpacing: 28,
    lineH: 14,
    radius: 6,
    gap: 10,
    minW: 18,
    maxW: Math.min(92, Math.max(48, width * 0.22)),
    indents: [0, 18, 36, 54],

    // colors
    textPalette: ['#E5E7EB', '#CBD5E1', '#94A3B8'],
    keywordPalette: ['#3A86FF', '#2EC4B6', '#FFD166', '#EF476F'],
    keywordChance: 0.35,
    stopChance: 0.18,

    // animation
    vy: -20,
    spawnEvery: 0.8,

    // optional gutter block on the left (looks like a sidebar)
    gutterW: 26,
    gutterGap: 16,
    gutterColor: '#3A86FF',
  });

  // Crea una línea: varios rectángulos (palabras) con ancho y color distintos
  const createCodeLine = (y, width, opts) => {
    const segments = [];
    const maxX = width - opts.marginRight;

    // gutter (barra izquierda)
    segments.push({ x: opts.marginLeft, w: opts.gutterW, h: opts.lineH, r: opts.radius, color: opts.gutterColor });

    // palabras
    let x = opts.marginLeft + opts.gutterW + opts.gutterGap + pick(opts.indents);
    while (x + opts.minW <= maxX) {
      const remaining = maxX - x;
      const w = Math.max(opts.minW, Math.min(opts.maxW, remaining, rand(opts.minW, opts.maxW)));

      const isKeyword = Math.random() < opts.keywordChance;
      const color = isKeyword ? pick(opts.keywordPalette) : pick(opts.textPalette);
      segments.push({ x, w, h: opts.lineH, r: opts.radius, color });
      x += w + opts.gap;
      if (Math.random() < opts.stopChance) break;
    }

    return { y, vy: opts.vy, segments };
  };

  const initCodingScreen = (width, height, state) => {
    const opts = getCodingOpts(width);
    const linesCount = Math.max(6, Math.floor((height - 30) / opts.lineSpacing));
    state.lines = [];
    for (let i = 0; i < linesCount; i++) {
      state.lines.push(createCodeLine(i * opts.lineSpacing, width, opts));
    }
    state.lastSpawnT = 0;
    state.initialized = true;
  };

  const updateCodingScreen = (width, height, t, dt, state) => {
    const opts = getCodingOpts(width);
    if (!state.initialized) initCodingScreen(width, height, state);

    // move up
    for (const line of state.lines) line.y += line.vy * dt;

    // remove off-screen lines
    state.lines = state.lines.filter((line) => line.y + opts.lineH > 0);

    // spawn new lines at bottom
    if (t - state.lastSpawnT >= opts.spawnEvery) {
      state.lastSpawnT = t;
      const lastY = state.lines.length ? state.lines[state.lines.length - 1].y : 0;
      const spawnY = Math.max(lastY + opts.lineSpacing, height + opts.lineH);
      state.lines.push(createCodeLine(spawnY, width, opts));
    }
  };

  const renderCodingScreen = (ctx, state) => {
    for (const line of state.lines) {
      for (const seg of line.segments) {
        createRoundedRect(ctx, seg.x, line.y, seg.w, seg.h, seg.r, seg.color);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 512;//512;
    canvas.height = 256;//256;
    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    // Pintado inicial (fondo)
    ctx.fillStyle = '#0B132B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    initCodingScreen(canvas.width, canvas.height, codingStateRef.current);
    renderCodingScreen(ctx, codingStateRef.current);

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



    // Texto animado
    updateCodingScreen(w, h, t, dt, codingStateRef.current);
    renderCodingScreen(ctx, codingStateRef.current);

        // Marco
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 16;
    ctx.strokeRect(0, 0, w , h );
    ctx.strokeStyle = '#ffffffff';
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, w - 16, h - 16);

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