import React, { useState, useEffect, useRef } from "react";

const SkillSection = (props) => {
    const { title, description, svg } = props;
    const [hovered, setHovered] = useState(null);
    const columns = 8;
    const rows = 8;
    const total = columns * rows;

    // Random highlight state solo mientras hay hover
    const [randomTiles, setRandomTiles] = useState([]);
    const randomTones = ["random-tone-1", "random-tone-2", "random-tone-3", "random-tone-4"];
    useEffect(() => {
        if (hovered !== null) {
            // Elige 4-8 índices random únicos (que no sea el hovered ni los del linterna)
            const count = Math.floor(Math.random() * 5) + 4;
            const indices = [];
            while (indices.length < count) {
                const idx = Math.floor(Math.random() * total);
                if (
                    !indices.includes(idx) &&
                    idx !== hovered &&
                    getLightLevel(idx) === null
                ) {
                    indices.push(idx);
                }
            }
            setRandomTiles(indices.map((idx, i) => ({ idx, tone: randomTones[i % randomTones.length] })));
        } else {
            setRandomTiles([]);
        }
        // eslint-disable-next-line
    }, [hovered, total]);

    // Calcula la distancia de Manhattan de cada tile al tile hovered
    const getLightLevel = (idx) => {
        if (hovered === null) return null;
        const row = Math.floor(idx / columns);
        const col = idx % columns;
        const hRow = Math.floor(hovered / columns);
        const hCol = hovered % columns;
        const dist = Math.abs(row - hRow) + Math.abs(col - hCol);
        // 0 = centro, 1 = ortogonales, 2 = siguiente anillo, etc.
        return dist <= 3 ? dist : null;
    };

    return (
        <div className="card-skill" >
            <div className="card-skill-header" style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                minHeight: '5rem',
                justifyContent: 'flex-start',
                gap: '1rem',
            }}>
                <div className="card-skill-icon" style={{height: '5rem', width: '5rem', display: 'flex', alignItems: 'center', flexShrink: 0}}>
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="5rem" viewBox="0 -960 960 960" width="5rem">
                            <defs>
                                <linearGradient id="edu-gradient3" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#b62bf7ff" />
                                    <stop offset="100%" stopColor="#1f63f7ff" />
                                </linearGradient>
                            </defs>
                            <path d={svg} fill="url(#edu-gradient3)"/>
                        </svg> 
                    </span>
                </div>
                <div className="card-skill-title" style={{display: 'flex', alignItems: 'center'}}>
                    <h4 style={{margin: 0, padding: 0}}>{title}</h4>
                </div>
            </div>
            <div className="card-skill-desc" style={{marginTop: '0.5rem'}}>
                <p style={{margin: 0}}>
                {description}
                </p>
            </div>
            <div className="background-card-skill">
                {Array.from({ length: total }).map((_, i) => {
                    const level = getLightLevel(i);
                    const random = randomTiles.find(t => t.idx === i);
                    return (
                        <div
                            className={
                                "tile" +
                                (level === 0 ? " light-0" : "") +
                                (level === 1 ? " light-1" : "") +
                                (level === 2 ? " light-2" : "") +
                                (level === 3 ? " light-3" : "") +
                                (random ? ` ${random.tone}` : "")
                            }
                            key={i}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        ></div>
                    );
                })}
                
            </div>
        </div>
    );
}
export default SkillSection;