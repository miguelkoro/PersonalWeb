// Ejemplo de asset 3D usando react-three-fiber
// Puedes reemplazar el contenido por un modelo real si lo tienes
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeDAsset = () => (
  <Canvas style={{ height: '300px', width: '100%' }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 2]} />
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={'#4f8cff'} />
    </mesh>
    <OrbitControls enableZoom={false} />
  </Canvas>
);

export default ThreeDAsset;
