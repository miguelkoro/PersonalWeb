
const CardProject = (props) => {
	const handleOpen = () => {
		if (typeof props.onOpen === 'function') props.onOpen();
	};

	const onKeyDown = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleOpen();
		}
	};

	return (
		<div className="card-projects" tabIndex={0} role="button" onClick={handleOpen} onKeyDown={onKeyDown}>
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
						{props.tags.slice(0, 3).map((tag, index) => (
							<span
								key={`${tag}-${index}`}
								className="card-projects__tag"
								style={{ backgroundColor: props.tagsColor ? props.tagsColor[index] : '#1f64f7bb' }}
							>
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

