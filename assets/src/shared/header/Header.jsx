/* React */
import { Link } from 'react-router-dom';

/* Local styles */
import './styles/header.scss';

export const Header = () => {
	return (
		<header>
			<h1>
				<Link to="/">
					<img
						src="//static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png"
						alt="Adopt Me!"
						title="Adopt Me!"
						loading="lazy"
					/>
				</Link>
			</h1>
		</header>
	);
};
