/* Local styles */
import './styles/loader.scss';

export const Loader = () => {
	return (
		<div className="loading-pane">
			<div className="loader">
				<div className="icon-wrapper">
					<svg className="icon icon-spinner">
						<use xlinkHref="#icon-spinner"></use>
					</svg>
				</div>
			</div>
		</div>
	);
};
