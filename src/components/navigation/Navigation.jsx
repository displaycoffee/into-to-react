/* React */
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { navigation, createNavigationList } from './scripts/navigation';

/* Local components */
import { Details } from '../../pages/details/Details';
import { Search } from '../../pages/search/Search';

export const Navigation = () => {
	const navigationList = createNavigationList(navigation, false);

	return navigationList && navigationList.length != 0 ? (
		<nav className="navigation">
			<ul className="navigation-list unstyled">
				{navigationList.map((nav) => (
					<li className="navigation-list-item" key={nav.id}>
						<Link to={nav.url} alt={nav.alt || nav.label} title={nav.alt || nav.label}>
							{nav.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	) : null;
};

export const NavigationRoutes = (props) => {
	const { testProp } = props;
	const navigationList = createNavigationList(navigation, true);

	return navigationList && navigationList.length != 0 ? (
		<Routes>
			{navigationList.map((nav) => (
				<React.Fragment key={nav.id}>
					{{
						'pet details': <Route path={navigation.url} element={<Details />} />,
					}[nav.label.toLowerCase()] || <Route path={nav.url} element={<Search testProp={testProp} />} />}
				</React.Fragment>
			))}
		</Routes>
	) : null;
};
