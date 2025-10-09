import '../styles/index.scss';
const Card = (props) => {
    return (
        <div className="card">
            <div className="card-title-row">
                <div className="card-title-svg">
                    {props.svg}
                </div>
                <div className="card-title-text">
                    <h2 className="card-title">{props.title}</h2>
                </div>
            </div>
            <div className="card-description">
                <p>{props.description}</p>
            </div>
        </div>
    );
}
export default Card;