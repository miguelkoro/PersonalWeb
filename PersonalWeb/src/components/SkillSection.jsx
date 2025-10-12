import React, { useState, useEffect, useRef } from "react";
import Carousel from './Carousel.jsx';

const SkillSection = (props) => {
    const { t } = props;
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
            <div className="card-skill-header">
                <div className="card-skill-icon">
                    <span className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="5rem" viewBox="0 -960 960 960" width="5rem">
                            <defs>
                                <linearGradient id="edu-gradient3" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#b62bf7ff" />
                                    <stop offset="100%" stopColor="#1f63f7ff" />
                                </linearGradient>
                            </defs>
                            <path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" fill="url(#edu-gradient3)"/>
                        </svg> 
                    </span>
                </div>
                <div className="card-skill-title">
                    <h4>Categories</h4>
                </div>
            </div>
            <div className="card-skill-desc">
                <p>
                Standard chunk of Lorem Ipsum used since the 1500s is showed below
                for those interested.
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