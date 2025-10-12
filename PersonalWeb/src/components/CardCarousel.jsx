import React, { useRef, useState } from "react";

const CardCarousel = (props) => {

    const cardRef = useRef(null);
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const animId = useRef();
    const [hovered, setHovered] = useState(false);

    const animate = () => {
        // Interpolación suave
        current.current.x += (target.current.x - current.current.x) * 0.18;
        current.current.y += (target.current.y - current.current.y) * 0.18;
        const card = cardRef.current;
        card.style.transform = `perspective(20rem) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg) scale(1.04)`;
        animId.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        // Rango de inclinación
    target.current.x = ((x - centerX) / centerX) * 18; // -18deg a 18deg
    target.current.y = -((y - centerY) / centerY) * 18; // -18deg a 18deg
        if (!animId.current) animate();
    };

    const handleMouseLeave = () => {
        target.current.x = 0;
        target.current.y = 0;
        cancelAnimationFrame(animId.current);
        animId.current = null;
        // Suaviza el regreso al centro
        const card = cardRef.current;
        card.style.transition = "transform 0.5s cubic-bezier(.4,2,.6,1)";
        card.style.transform = "perspective(50rem) rotateX(0deg) rotateY(0deg) scale(1)";
        setTimeout(() => {
            if (card) card.style.transition = "transform 0.22s cubic-bezier(.4,2,.6,1)";
        }, 500);
        current.current.x = 0;
        current.current.y = 0;
        setHovered(false);
    };

    // Devuelve estilos de fade visual según el prop fadeAmount (0 a 1)
    function getFadeStyle() {
        const fade = typeof props.fadeAmount === 'number' ? props.fadeAmount : 1;
        const blur = 6 * (1 - fade); // hasta 6px de blur cuando fade=0
        return {
            opacity: fade,
            filter: `blur(${blur}px)`
        };
    }

    return (
        <>
        <div
            className="card-carousel tilt-corners"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setHovered(true)}
            style={{
                transition: "transform 0.22s cubic-bezier(.4,2,.6,1), opacity 0.4s, filter 0.4s",
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                ...getFadeStyle()
            }}
        >
            <img 
                src={props.imageSrc} 
                alt="Carousel Item" 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain', 
                    display: 'block' 
                }} 
            />
            {hovered &&<div
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: '0.7em 0.5em',
                    background: 'rgba(20,20,40,0.78)',
                    color: '#fff',
                    fontSize: '1.08em',
                    fontWeight: 500,
                    textAlign: 'center',
                    pointerEvents: 'none',
                    zIndex: 2,
                }}
            >
                {props.title}
            </div>}
        </div>
    </>);
};

export default CardCarousel;