import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function CanvasFloppy(props) {
  const meshRef = useRef();
  const canvasRef = useRef(document.createElement('canvas'));
  const [texture, setTexture] = useState(null);


  const drawTitle = (ctx, lines) => {
    const centerX = ctx.canvas.width / 2;
    //const paddingX = Math.round(ctx.canvas.width * 0.09);
    const paddingY = Math.round(ctx.canvas.height * 0.1);
    //const lineCount = lines.length;
    //const fontSize = Math.max(14, Math.floor((ctx.canvas.height / (lineCount + 1)) * 0.5));
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#17161bff';
    ctx.font = `3rem Roboto, Arial, sans-serif`;

    /*for (let i = 0; i < lineCount; i++) {
      const y = ((i + 1) * ctx.canvas.height) / (lineCount + 1);
      ctx.fillText(lines[i], centerX, y);
    }*/
   ctx.fillText(lines, centerX, paddingY);
  };
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const test = line ? line + ' ' + word : word;
      const { width } = ctx.measureText(test);
      if (width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }
  function drawDescription(ctx, text) {
    // padding desde el borde izquierdo/derecho en px
    const paddingX = Math.round(ctx.canvas.width * 0.09); // ejemplo 9%
    const paddingTop = Math.round(ctx.canvas.height * 0.35); // altura de inicio
    // setea la fuente ANTES de medir y envolver
    const fontSizePx = Math.round(ctx.canvas.height * 0.12); // ajusta a tu gusto
    ctx.font = `${fontSizePx}px Arial, sans-serif`;
    ctx.fillStyle = 'rgba(23,22,27,1)';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    const maxW = ctx.canvas.width - paddingX * 2;
    const lines = wrapText(ctx, String(text || ''), maxW);

    const lineHeight = Math.round(fontSizePx * 1.15);
    for (let i = 0; i < lines.length; i++) {
      const y = paddingTop + i * lineHeight;
      ctx.fillText(lines[i], paddingX, y);
    }
  }
  const drawTags = (ctx, tags = [], colors = []) => {
    const paddingX = Math.round(ctx.canvas.width * 0.09);
    const paddingTop = Math.round(ctx.canvas.height * 0.86);
    const fontSizePx = Math.round(ctx.canvas.height * 0.095);
    const innerPadding = Math.round(ctx.canvas.width * 0.02); // padding inside tag box
    const gap = Math.round(ctx.canvas.width * 0.02); // gap between tags

    ctx.font = `italic ${fontSizePx}px Arial, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';

    const maxW = ctx.canvas.width - paddingX * 2;

    // layout tags horizontally, wrapping to next line when needed
    let x = paddingX;
    let y = paddingTop;
    const lineHeight = Math.round(fontSizePx * 1.6);

    for (let i = 0; i < tags.length; i++) {
      const tag = String(tags[i] || '');
      const color = (colors && colors[i]) ? colors[i] : 'rgba(200,200,200,0.9)';
      const textWidth = Math.ceil(ctx.measureText(tag).width);
      const boxW = textWidth + innerPadding * 2;

      // wrap to next line
      if (x + boxW > paddingX + maxW) {
        x = paddingX;
        y += lineHeight;
      }

  // draw rounded rectangle (filled, no stroke)
  ctx.fillStyle = color;
  const boxX = x;
  const boxY = y - Math.round(fontSizePx * 0.6);
  const boxH = Math.round(fontSizePx * 1.2);
  const radius = Math.min(Math.round(boxH * 0.35), Math.round(boxW * 0.25));
  ctx.beginPath();
  // top-left
  ctx.moveTo(boxX + radius, boxY);
  // top edge
  ctx.lineTo(boxX + boxW - radius, boxY);
  // top-right corner
  ctx.quadraticCurveTo(boxX + boxW, boxY, boxX + boxW, boxY + radius);
  // right edge
  ctx.lineTo(boxX + boxW, boxY + boxH - radius);
  // bottom-right corner
  ctx.quadraticCurveTo(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);
  // bottom edge
  ctx.lineTo(boxX + radius, boxY + boxH);
  // bottom-left corner
  ctx.quadraticCurveTo(boxX, boxY + boxH, boxX, boxY + boxH - radius);
  // left edge
  ctx.lineTo(boxX, boxY + radius);
  // top-left corner
  ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
  ctx.closePath();
  ctx.fill();

  // draw text inside box (white for contrast)
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillText(tag, x + innerPadding, y);

      x += boxW + gap;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Transparent background (do not fill)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //const lines = Array.isArray(props.texts) && props.texts.length ? props.texts : ['IN', 'CONSTRUCTION'];
    drawTitle(ctx, props.title);
    drawDescription(ctx, props.description);
    drawTags(ctx, props.tags, props.colors);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    setTexture(tex);
  }, []); // run once; passing inline arrays as `texts` can recreate on each render and cause loops

  useFrame(() => {
    if (texture) texture.needsUpdate = true;
  });

  if (!texture) return null;
  return (
    <mesh ref={meshRef} position={props.position}>
      <planeGeometry args={[props.width, props.height]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}
export default CanvasFloppy;