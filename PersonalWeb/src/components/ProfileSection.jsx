    const ProfileSection = (props) => {
        const { t } = props;
        return (
            <div style={{ position: 'relative', display: 'flex',  flexDirection: 'column', gap: '2.5rem', minHeight: 420 }}>
                {/* Título */}
                <div style={{position: 'relative', width: 'fit-content', textAlign: 'left', marginLeft: "2rem"}}>
                    <h1 className="about-me-title" style={{textAlign: 'left', marginBottom: "1rem"}}>{t('i.aboutme')}</h1>
                    {/*<div style={{height: 4, width: '160%', background: 'linear-gradient(90deg, #ffffffff 0%, #ffffffff 100%)',  marginTop: 0}} />*/}
                </div>
                {/* Imagen grande de fondo */}
                <img className="about-me-background-image"
                    src="/about_me.png"
                    alt="about me"
                    style={{
                        
                    }}
                />
                {/* Dos columnas */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch', minHeight: 220, position: 'relative', zIndex: 1 }}>
                    {/* Columna texto con línea */}
                    <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ borderLeft: '3px solid #fff', height: '100%', marginRight: "3rem" }} />
                        <p style={{ margin: 0, fontSize: '1.3rem', lineHeight: 1.8 }}>{t('i.presentation')}</p>
                    </div>
                    {/* Columna vacía para mantener el layout */}
                    <div style={{ flex: '0 0 50%' }} />
                </div>
                {/* Cards de ejemplo */}
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: 32, position: 'relative', zIndex: 1 }}>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '1.2rem 2rem', minWidth: 160 }}>
                        <h3 style={{ margin: 0, marginBottom: 8 }}>Ejemplo Card 1</h3>
                        <p style={{ margin: 0, fontSize: '0.98rem' }}>Contenido de ejemplo para la card 1.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '1.2rem 2rem', minWidth: 160 }}>
                        <h3 style={{ margin: 0, marginBottom: 8 }}>Ejemplo Card 2</h3>
                        <p style={{ margin: 0, fontSize: '0.98rem' }}>Contenido de ejemplo para la card 2.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '1.2rem 2rem', minWidth: 160 }}>
                        <h3 style={{ margin: 0, marginBottom: 8 }}>Ejemplo Card 2</h3>
                        <p style={{ margin: 0, fontSize: '0.98rem' }}>Contenido de ejemplo para la card 2.</p>
                    </div>
                </div>
            </div>
        );
    }
export default ProfileSection;