/* Local styles */
import './styles/sidebar.scss';

export const Sidebar = (props) => {
	const show = props.show;

	return show ? (
		<aside className="sidebar">
			<div className="styled-bg">
				<p>this is sidebar content.</p>
			</div>
		</aside>
	) : null;
};
