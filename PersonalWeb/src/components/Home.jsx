
import { Link } from 'react-router-dom';
import ThreeDAsset from './ThreeDAsset.jsx';

const Home = () => {
    return (
        <div style={{ position: 'relative', width: '100%',  overflow: 'hidden' }}>
            {/* Columna izquierda: texto y botones */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: 'min(540px, 54vw)',                
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '4rem 3vw',
                background: 'none',
                boxShadow: 'none',
                pointerEvents: 'auto',
            }}>
                <h1 style={{ fontSize: '3rem', margin: 0, textAlign: 'center', width: '100%' }}>Miguel Coronel</h1>
                <h2 style={{ fontSize: '1.5rem', textAlign: 'center', fontWeight: 400, margin: '1rem 0 2rem 0', width: '100%' }}>Ingeniero de software</h2>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem', width: '100%' }}>
                    <Link to="/projects" style={{ padding: '0.8rem 2.5rem', background: '#4f8cff', color: 'white', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #0002', width: 'fit-content', textAlign: 'center' }}>Ver proyectos</Link>
                    <Link to="/contact" style={{ padding: '0.8rem 2.5rem', background: 'transparent', color: '#4f8cff', border: '2px solid #4f8cff', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #0002', width: 'fit-content', textAlign: 'center' }}>Contactar</Link>
                </div>
            </div>
            {/* Fondo 3D interactivo */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'auto',
                overflow: 'visible',
            }}>
                <ThreeDAsset />
            </div>
        </div>
    );
};

export default Home;
