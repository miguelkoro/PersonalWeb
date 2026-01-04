import { useEffect } from 'react';

const ProyectWindow = ({ project, onClose }) => {
	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === 'Escape') onClose?.();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [onClose]);

	if (!project) return null;

	return (
		<div className="project-window" role="dialog" aria-modal="true" aria-label={project.title || 'Proyecto'}>
			<div className="project-window__topbar" aria-hidden="true">
				<div className="project-window__controls">
					<button
						type="button"
						className="project-window__control project-window__control--red"
						onClick={onClose}
						aria-label="Cerrar"
					/>
					<button type="button" className="project-window__control project-window__control--yellow" aria-label="Minimizar" />
					<button type="button" className="project-window__control project-window__control--green" aria-label="Maximizar" />
				</div>
			</div>

			<div className="project-window__inner">
				<h3 className="project-window__title">{project.title}</h3>

				<div className="project-window__body">
					<div className="project-window__columns">
						<div className="project-window__col project-window__col--media">
							{project.imageSrc ? (
								<img className="project-window__img" src={project.imageSrc} alt={project.imageAlt || ''} />
							) : (
								<div className="project-window__imgPlaceholder" />
							)}
						</div>

						<div className="project-window__col project-window__col--desc">
							<p className="project-window__desc">{project.longDescription || project.description}</p>

							{Array.isArray(project.tags) && project.tags.length > 0 ? (
								<div className="project-window__tags">
									{project.tags.map((tag, index) => (
										<span key={tag} className="project-window__tag" style={{backgroundColor: project.tagsColor ? project.tagsColor[index] : '#1f64f7bb'}}>
											{tag}
										</span>
									))}
								</div>
							) : null}
						</div>
					</div>

					<div className="project-window__actions">
						{project.demoUrl ? (
							<a
								className="home_button_projects home_button_projects--icon"
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>
									<svg
										className="link_icon"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 -960 960 960"
										fill="currentColor"
										aria-hidden="true"
										focusable="false"
									>
										<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
									</svg>
								</span>
							</a>
						) : null}

						{project.githubUrl ? (
							<a
								aria-label="GitHub"
								title="GitHub"
								className="home_button_github"
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								<span>
									<i className="fab fa-github" aria-hidden="true"></i>
								</span>
							</a>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProyectWindow;

