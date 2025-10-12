

import React, { useRef, useEffect, useState } from "react";
import CardCarousel from "./CardCarousel";




const Carousel = (props) => {
    const [paused, setPaused] = useState(false);
    const trackRef = useRef(null);
    const wrapperRef = useRef(null);
    const offsetRef = useRef(0);
    const [trackWidth, setTrackWidth] = useState(0);

    // Usa el array de cards pasado por props
    const cards = props.cards || [];

    // Doble track para bucle perfecto (cada track es una fila horizontal)
    // Añade un gap fantasma al final del primer track
    const gapValue = '1rem'; // Menos separación entre cards
    const trackGap = '0rem'; // Menos separación entre tracks
    const displayTracks = [
        <div
            className="carousel-glass-track-inner"
            key="track1"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: gapValue }}
        >
            {cards}
            {/* gap fantasma más pequeño al final */}
            <div style={{ minWidth: trackGap, pointerEvents: 'none', opacity: 0 }} />
        </div>,
        <div
            className="carousel-glass-track-inner"
            key="track2"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: gapValue }}
        >
            {cards}
        </div>
    ];

    // Medir el ancho de una secuencia de cards (track) incluyendo el gap fantasma
    useEffect(() => {
        if (!trackRef.current) return;
        const firstTrack = trackRef.current.children[0];
        if (firstTrack) {
            // Medir el ancho desde el inicio de la primera card hasta el final del gap fantasma
            const cardsEls = Array.from(firstTrack.children).filter(el => el.tagName !== 'STYLE');
            if (cardsEls.length > 1) {
                const firstRect = cardsEls[0].getBoundingClientRect();
                const lastRect = cardsEls[cardsEls.length - 2].getBoundingClientRect(); // última card real
                const gapRect = cardsEls[cardsEls.length - 1].getBoundingClientRect(); // gap fantasma
                // El ancho es desde el inicio de la primera card hasta el final del gap fantasma
                const width = (gapRect.right - firstRect.left);
                setTrackWidth(width);
            } else if (cardsEls.length === 1) {
                setTrackWidth(cardsEls[0].getBoundingClientRect().width);
            }
        }
    }, [cards.length, gapValue, trackGap]);

    useEffect(() => {
        if (!trackRef.current || !trackWidth) return;
        let animId;
        let last = performance.now();
        const speed = 0.16; // px per ms
        function animate(now) {
            if (!paused) {
                offsetRef.current -= (now - last) * speed;
                // Cuando termina la primera copia, salta al inicio de la segunda
                if (offsetRef.current <= -trackWidth) {
                    offsetRef.current += trackWidth;
                }
                trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
            }
            last = now;
            animId = requestAnimationFrame(animate);
        }
        animId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animId);
    }, [paused, trackWidth]);

    // Padding de los extremos en el wrapper (más pequeño para que las cards se oculten más cerca del centro)
    const sidePadding = '1rem';

    return (
        <div
            className="carousel-glass-wrapper"
            ref={wrapperRef}
            style={{
                overflow: 'hidden',
                paddingLeft: sidePadding,
                paddingRight: sidePadding,
                paddingTop: '3rem',
                paddingBottom: '2.5rem',
                maxWidth: '60rem',
                margin: '0 auto',
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div
                className="carousel-glass-track"
                ref={trackRef}
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', willChange: 'transform', gap: 0 }}
            >
                {displayTracks}
            </div>
            <div className="carousel-glass-fade left"></div>
            <div className="carousel-glass-fade right"></div>
        </div>
    );
};

export default Carousel;