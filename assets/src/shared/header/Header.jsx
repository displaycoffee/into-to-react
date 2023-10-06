/* React */
import { Link } from 'react-router-dom';

/* Local styles */
import './styles/header.scss';

export const Header = (props) => {
	return (
		<header>
			<h1>
				<Link to="/">Adopt Me!</Link>
			</h1>
		</header>
	);
};
