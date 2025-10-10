import { useState } from "react";

const CardExperience = (props) => {

    const [isHovered, setIsHovered] = useState(false);
    const { t } = props;

    return (
        <>
        {props.side=== "left" && (
            <div className="timeline-bar-circle-wrapper left">
                    <div className={isHovered ? "timeline-circle-hover" : "timeline-circle"} />
            </div>
        )}
        <div className={`timeline-card-terminal ${props.side === 'left' ? "left" : "right"} timeline-card-tight`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            
        >
            {/* Sección superior */}
            <div style={{display: 'flex', alignItems: 'center', width: '100%', marginBottom: '0.7rem'}}>
                {/* SVG izquierda */}
                <div style={{flex: '0 0 48px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 -960 960 960" width="38px">
                        <defs>
                            <linearGradient id="edu-gradient3" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#b62bf7ff" />
                                <stop offset="100%" stopColor="#1f63f7ff" />
                            </linearGradient>
                        </defs>
                        <path d={props.svg} fill="url(#edu-gradient3)"/>
                    </svg>
                </div>
                
                {/* Texto centro */}
                <div style={{flex: '1 1 auto',  textAlign: 'left', paddingLeft: '1rem', fontWeight: 600, fontSize: '1.08rem', color: '#fff'}}>
                    <span style={{color: "#dad8d881"}}>{props.date}</span>
                </div>
                {/* SVG engranaje derecha */}
                <div className={`${isHovered ? "rotating-circle" : ""}`} style={{flex: '0 0 32px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="38px" viewBox="0 -960 960 960" width="38px" fill="#6161618e"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
                </div>
            </div>
            {/* Línea divisoria */}
            <div style={{width: '80%', height: '0.1rem', background: 'linear-gradient(90deg, #bdbdbd6e 0%, #616161 100%)', margin: '0 auto 0.5rem auto'}} />
            {/* Sección inferior */}
            <div className="terminal-text" style={{width: '100%'}}>
                {/*<h3 className="timeline-card-title">*/}
                    <p style={{marginBottom:"-0.7rem"}}><span className="terminal-text-7">&lt;{t('i.company')}&gt;</span> </p>
                    <p style={{marginLeft:"1rem", marginBottom:"-0.7rem"}}><span className="terminal-text-2">&lt;{t('i.name')}&gt; </span>
                    <span className="terminal-text-6">{props.name}</span>
                    <span className="terminal-text-2"> &lt;{t('i.name')}&gt;</span></p>

                    <p style={{marginLeft:"1rem", marginBottom:"-0.7rem"}}><span className="terminal-text-4">&lt;{t('i.role')}&gt; </span>
                    <span className="terminal-text-3">{props.role}</span>
                    <span className="terminal-text-4"> &lt;/{t('i.role')}&gt;</span></p>

                    <p style={{marginLeft:"1rem", marginBottom:"-0.7rem"}}><span className="terminal-text-1">&lt;{t('i.companySkills')}&gt; </span>
                    <span className="terminal-text-5">{props.skills}</span>
                    <span className="terminal-text-1"> &lt;/{t('i.companySkills')}&gt;</span></p>

                    <p><span className="terminal-text-7">&lt;/{t('i.company')}&gt;</span></p>
                {/*</h3>*/}
            </div>
        </div>
        {props.side=== "right" && (
            <div className="timeline-bar-circle-wrapper right">
                    <div className={ isHovered ? "timeline-circle-hover" : "timeline-circle" } />
            </div>
        )}
        </>
    );
}
export default CardExperience;