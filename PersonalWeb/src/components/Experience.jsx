import CardExperience from "./CardExperience";
const Experience = (props) => {
    const { t } = props;

    // Ejemplo de datos de experiencia (puedes reemplazar por props o traducciones)
    /*const timelineEvents = [
        { id: 1, content: t('i.timelineEvent1'), side: 'left' },
        { id: 2, content: t('i.timelineEvent2'), side: 'right' },
        { id: 3, content: t('i.timelineEvent3'), side: 'left' },
        { id: 4, content: t('i.timelineEvent3'), side: 'right' },
    ];*/

    const timelineEvents = [
        {id: 100, side: 'left', 
            card: <CardExperience title={t('i.cardUniversityDegreeTitle')} description={t('i.cardUniversityDegreeDescription')} side={'left'}/>},
        {id: 99, side: 'right', 
            card: <CardExperience title={t('i.cardUniversityDegreeTitle')} description={t('i.cardUniversityDegreeDescription')} side={'right'}/>},
        {id: 98, side: 'left', 
            card: <CardExperience title={t('i.cardUniversityDegreeTitle')} description={t('i.cardUniversityDegreeDescription')} side={'left'}/>},
    ]

    return (
        <div id="experience" style={{ padding: '4rem 0', textAlign: 'left'}}>
            <h2 className="about-me-title">{t('i.experience')}</h2>
            <p className="about-me-subtitle">
                {t('i.experienceText')}
            </p>
            {/* Añadimos padding extra arriba y abajo para las barras */}
            <div className="timeline-experience-wrapper timeline-experience-centered" style={{paddingTop: '5rem', paddingBottom: '5rem', position: 'relative'}}>
                {/* Barras verticales a los extremos, extendidas */}
                <div className="timeline-bar-vertical left" style={{top: 0, bottom: 0, height: '100%', position: 'absolute'}} />
                <div className="timeline-bar-vertical right" style={{top: 0, bottom: 0, height: '100%', position: 'absolute'}} />
                <div className="timeline-center-column timeline-center-narrow">
                    {timelineEvents.map((event, idx) => (
                        <div key={event.id} className={`timeline-row timeline-row-${event.side} timeline-row-tight`}>
                            {event.card}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;