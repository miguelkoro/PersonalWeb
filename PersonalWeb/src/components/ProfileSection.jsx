import CardStudies from "./CardStudies";
import Card from "./Card";

    const ProfileSection = (props) => {
        const { t } = props;

        const cardSVG = [
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px">
                        <defs>
                            <linearGradient id="edu-gradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#b62bf7ff" />
                            <stop offset="100%" stopColor="#1f63f7ff" />
                            </linearGradient>
                        </defs>
                        <path d="M40-120v-80h880v80H40Zm120-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z" fill="url(#edu-gradient)"/>
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px">
                        <defs>
                            <linearGradient id="edu-gradient2" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#b62bf7ff" />
                                <stop offset="100%" stopColor="#1f63f7ff" />
                            </linearGradient>
                        </defs>
                        <path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z" fill="url(#edu-gradient2)"/>
                    </svg>,
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px">
                        <defs>
                            <linearGradient id="edu-gradient3" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#b62bf7ff" />
                                <stop offset="100%" stopColor="#1f63f7ff" />
                            </linearGradient>
                        </defs>
                        <path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" fill="url(#edu-gradient3)"/>
                    </svg>

        ]

        return (
            <div style={{ position: 'relative', display: 'flex', paddingBottom: "2.5rem",  flexDirection: 'column', gap: '2.5rem', minHeight: 420 }}>
                {/* Título */}
                <div style={{position: 'relative', width: 'fit-content', textAlign: 'left', marginLeft: "2rem"}}>
                    <h1 className="about-me-title" style={{textAlign: 'left', marginBottom: "1rem"}}>{t('i.aboutme')}</h1>
                    {/*<div style={{height: 4, width: '160%', background: 'linear-gradient(90deg, #ffffffff 0%, #ffffffff 100%)',  marginTop: 0}} />*/}
                </div>
                {/* Imagen grande de fondo */}
                <img className="about-me-background-image"
                    src="/about_me.png"
                    alt="about me"
                />
                {/* Dos columnas */}
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'stretch', minHeight: 220, position: 'relative', zIndex: 1 }}>
                    {/* Columna texto con línea */}
                    <div style={{ flex: '0 0 50%', display: 'flex', alignItems: 'center' }}>
                        <div style={{ borderLeft: '3px solid #fff', height: '100%', marginRight: "3rem" }} />
                        <p style={{ margin: 0, fontSize: '1.3rem', lineHeight: 1.8, textAlign: "left" }}>{t('i.presentation')}</p>
                    </div>
                    {/* Columna vacía para mantener el layout */}
                    <div style={{ flex: '0 0 50%' }} />
                </div>
                {/* Cards de ejemplo */}
                <div className="card-management-wrapper">
                    <Card title={t('i.cardFavoriteTechs')} description={t('i.cardFavoriteTechsDescription')} svg={cardSVG[0]} />
                    <Card title={t('i.cardInterests')} description={t('i.cardInterestsDescription')} svg={cardSVG[1]} />
                    <Card title={t('i.cardObjectives')} description={t('i.cardObjectivesDescription')} svg={cardSVG[2]} />
                </div>
            </div>
        );
    }
export default ProfileSection;