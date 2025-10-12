
import React, { useRef } from "react";

const Carousel = () => {

    const cardRef = useRef(null);
    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const animId = useRef();

    const animate = () => {
        // Interpolación suave
        current.current.x += (target.current.x - current.current.x) * 0.18;
        current.current.y += (target.current.y - current.current.y) * 0.18;
        const card = cardRef.current;
        card.style.transform = `perspective(600px) rotateX(${current.current.y}deg) rotateY(${current.current.x}deg) scale(1.04)`;
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
        card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
        setTimeout(() => {
            if (card) card.style.transition = "transform 0.22s cubic-bezier(.4,2,.6,1)";
        }, 500);
        current.current.x = 0;
        current.current.y = 0;
    };

    return (
        <div
            className="card-carousel tilt-corners"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.22s cubic-bezier(.4,2,.6,1)", width: '15%', height: '15%' }}
        >
            <img src="/JS-Logo.png" alt="Carousel Item" style={{ width: '100%' }} />
        </div>
    );
};

export default Carousel;