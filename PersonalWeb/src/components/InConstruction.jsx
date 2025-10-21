import React from 'react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';

const InConstruction = () => {
    const { t } = useContext(DataContext);
    return (
        <div
            aria-modal="true"
            role="dialog"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(10,10,12,0.55)',
                backdropFilter: 'blur(6px) saturate(120%)',
                WebkitBackdropFilter: 'blur(6px) saturate(120%)',
                zIndex: 100,
                pointerEvents: 'auto',
            }}
        >
            <div
                style={{
                    textAlign: 'center',
                    color: '#fff',
                    maxWidth: 920,
                    margin: '0 1rem',
                    padding: '2rem',
                    borderRadius: 12,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    background: 'rgba(20,18,30,0.45)',
                    pointerEvents: 'auto',
                }}
            >
                <h1 style={{ margin: 0, fontSize: 'clamp(1.6rem, 4.5vw, 3rem)' }}>{t("i.underConstruction")}</h1>
                <p style={{ color: '#dcd6ff', marginTop: '0.6rem', marginBottom: '1.2rem' }}>
                    {t("i.underConstructionText")}
                </p>
                <img
                    src="/in_construction.jpg"
                    alt="Page under construction"
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 8,
                        display: 'block',
                        margin: '0.4rem auto 0',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
                    }}
                />
            </div>
            {/* Prevent clicks from reaching underlying content */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default InConstruction;