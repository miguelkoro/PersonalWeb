import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function ThreeBackground() {
  const mountRef = useRef(null);
  const rendererRef = useRef();
  const animationIdRef = useRef();

  useEffect(() => {
    const mount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0); // Fondo completamente transparente
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.width = '100vw';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.zIndex = '-1';
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();
    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Example geometry: animated floating points
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0x8e24aa, shininess: 80, specular: 0xffffff });
    const sphere = new THREE.Mesh(geometry, material);
    //scene.add(sphere);

    // Spotlight that follows the mouse
    const spotLight = new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 0, 5);
    spotLight.target.position.set(0, 0, 0);
    //scene.add(spotLight);
    //scene.add(spotLight.target);

    // Optional: a little ambient light for soft fill
    const ambient = new THREE.AmbientLight(0x220044, 0.5);
    //scene.add(ambient);

    // Mouse tracking
    function onPointerMove(e) {
      // Normalized device coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      // Project to a plane at z=0
      const vector = new THREE.Vector3(x, y, 0.5).unproject(camera);
      spotLight.position.set(vector.x, vector.y, 3);
      spotLight.target.position.set(vector.x, vector.y, 0);
    }
    window.addEventListener('pointermove', onPointerMove);

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.004;
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

export default ThreeBackground;
