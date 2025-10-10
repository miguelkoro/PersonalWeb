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
            card: <CardExperience name={t('i.companyName1')} role={t('i.companyRole1')} skills={t('i.companySkills1')} date={t('i.companyDate1')} side={'left'} svg={"m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"} t={t}/>},
        {id: 99, side: 'right', 
            card: <CardExperience name={t('i.companyName2')} role={t('i.companyRole2')} skills={t('i.companySkills2')} date={t('i.companyDate2')} side={'right'} svg={"M160-120q-33 0-56.5-23.5T80-200v-560q0-33 23.5-56.5T160-840h560q33 0 56.5 23.5T800-760v80h80v80h-80v80h80v80h-80v80h80v80h-80v80q0 33-23.5 56.5T720-120H160Zm0-80h560v-560H160v560Zm80-80h200v-160H240v160Zm240-280h160v-120H480v120Zm-240 80h200v-200H240v200Zm240 200h160v-240H480v240ZM160-760v560-560Z"} t={t}/>},
        {id: 98, side: 'left', 
            card: <CardExperience name={t('i.companyName3')} role={t('i.companyRole3')} skills={t('i.companySkills3')} date={t('i.companyDate3')} side={'left'} svg={"M80-120v-720h400v160h400v560H80Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h320v-400H480v80h80v80h-80v80h80v80h-80v80Zm160-240v-80h80v80h-80Zm0 160v-80h80v80h-80Z"} t={t}/>},
        {id: 97, side: 'right', 
            card: <CardExperience name={t('i.companyName4')} role={t('i.companyRole4')} skills={t('i.companySkills4')} date={t('i.companyDate4')} side={'right'} svg={"M300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720Zm0 400q-25 0-42.5 17.5T240-260q0 25 17.5 42.5T300-200q25 0 42.5-17.5T360-260q0-25-17.5-42.5T300-320ZM160-840h640q17 0 28.5 11.5T840-800v280q0 17-11.5 28.5T800-480H160q-17 0-28.5-11.5T120-520v-280q0-17 11.5-28.5T160-840Zm40 80v200h560v-200H200Zm-40 320h640q17 0 28.5 11.5T840-400v280q0 17-11.5 28.5T800-80H160q-17 0-28.5-11.5T120-120v-280q0-17 11.5-28.5T160-440Zm40 80v200h560v-200H200Zm0-400v200-200Zm0 400v200-200Z"} t={t}/>},
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