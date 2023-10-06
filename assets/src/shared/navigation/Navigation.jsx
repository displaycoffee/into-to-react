/* React */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { navigation } from './scripts/navigation';

/* Local components */
import { Search } from '../../content/search/Search';
import { Details } from '../../content/details/Details';

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
	const { requestParams } = props;

	return navigation && navigation.length != 0 ? (
		<Routes>
			{navigation.map((navigation) => (
				<React.Fragment key={navigation.id}>
					{{
						'pet details': <Route path={navigation.url} element={<Details />} />,
					}[navigation.label.toLowerCase()] || <Route path={navigation.url} element={<Search requestParams={requestParams} />} />}
				</React.Fragment>
			))}
		</Routes>
	) : null;
};
