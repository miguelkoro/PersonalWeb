
import React, { useState } from "react";

const CardStudies = (props) => {
    const degreeType = props.degreeType || "Grado de Ingeniería";
    const degreeName = props.degreeName || "Ingeniería de Software";
    const center = props.center || "Centro de Ejemplo";
    const logo = props.logo || "/mk_logo.png";
    const description = props.description || "Descripción breve del curso o grado. Aquí puedes poner información relevante sobre el contenido, duración, competencias, etc.";

    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`card-studies-flip-container${flipped ? " flipped" : ""}`}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
        >
            <div className="card-studies-flipper">
                {/* Front Side */}
                <div className="card-studies card-studies-front">
                    <div className="card-studies-header">
                        <span className="card-studies-degree-type">{degreeType}</span>
                        <div className="card-studies-divider" />
                    </div>
                    <div className="card-studies-title-large">{degreeName}</div>
                    <div className="card-studies-bottom-row">
                        <div className="card-studies-center">{center}</div>
                        <div className="card-studies-logo">
                            <img src={logo} alt="center logo" />
                        </div>
                    </div>
                </div>
                {/* Back Side */}
                <div className="card-studies card-studies-back">
                    <div className="card-studies-description">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardStudies;