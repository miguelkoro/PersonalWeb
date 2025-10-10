
import React, { useState } from "react";

const CardStudies = (props) => {   
    const [flipped, setFlipped] = useState(false);
    const background = props.background || false;

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
                        <span className="card-studies-degree-type">{props.degreeType}</span>
                        <div className="card-studies-divider" />
                    </div>
                    <div className="card-studies-title-large">{props.degreeName}</div>
                    <div className="card-studies-bottom-row">
                        <div className="card-studies-logo">
                            <img src={props.logo} alt="center logo" style={ background ? { backgroundColor: "#ffffff75", borderRadius: "0.9rem",   } : {} } />
                        </div>
                        <div className="card-studies-center">{props.center}</div>

                    </div>
                </div>
                {/* Back Side */}
                <div className="card-studies card-studies-back">
                    <div className="card-studies-description">
                        {props.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardStudies;