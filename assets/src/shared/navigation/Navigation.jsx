/* React */
import { Routes, Route, Link } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { navigation } from './scripts/navigation';

export const Navigation = () => {
	return navigation && navigation.length != 0 ? (
		<nav className="navigation">
			<ul className="navigation-list unstyled">
				{navigation.map(
					(navigation) =>
						navigation.showInNav && (
							<li className="navigation-list-item" key={navigation.id}>
								<Link to={navigation.url} alt={navigation.alt || navigation.label} title={navigation.alt || navigation.label}>
									{navigation.label}
								</Link>
							</li>
						),
				)}
			</ul>
		</nav>
	) : null;
};

export const NavigationRoutes = (props) => {
	const { navigationProps } = props;
	const renderProps = Object.keys(navigationProps).length ? navigationProps : false;

	return navigation && navigation.length != 0 ? (
		<Routes>
			{navigation.map((navigation) => (
				<Route path={navigation.url} element={navigation.render(renderProps)} key={navigation.id} />
			))}
		</Routes>
	) : null;
};
