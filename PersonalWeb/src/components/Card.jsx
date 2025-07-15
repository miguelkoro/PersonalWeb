import '../styles/index.scss';
const Card = (props) => {
    return (
        <div className="card">
            <h2 className="card-title">{props.title}</h2>
            <p className="text-gray-700">{props.description}</p>
        </div>
    );
}
export default Card;