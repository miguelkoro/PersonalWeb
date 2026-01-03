
const CardProject = (props) => {
	return (
		<div className="card-projects" tabIndex={0}>
			<div className="card-projects__content">
				<h3 className="card-projects__title">{props.title}</h3>
				<div className="card-projects__divider" />

				<div className="card-projects__main">
					<div className="card-projects__imageCol">
						{props.imageSrc ? (
							<img className="card-projects__img" src={props.imageSrc} alt={props.imageAlt || ''} />
						) : (
							<div className="card-projects__imgPlaceholder" />
						)}
					</div>
					<p className="card-projects__desc">{props.description}</p>
				</div>

				{Array.isArray(props.tags) && props.tags.length > 0 ? (
					<div className="card-projects__tags">
						{props.tags.map((tag) => (
							<span key={tag} className="card-projects__tag" style={{backgroundColor: props.tagColor || '#1f64f7bb'}}>
								{tag}
							</span>
						))}
					</div>
				) : null}
			</div>

			<div className="card-projects__more" aria-hidden="true">
				haz click para saber mas
			</div>
		</div>
	);
};



export default CardProject;

