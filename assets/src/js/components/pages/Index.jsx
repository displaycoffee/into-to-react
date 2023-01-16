/* react imports */
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

/* local component imports */
import { SearchParams } from '../elements/SearchParams';
import { Details } from './Details';
import { ThemeContext } from '../elements/ThemeContext';

export const Index = () => {
	const theme = useState('darkblue');

	return (
		<ThemeContext.Provider value={theme}>
			<div>
				<Router>
					<header>
						<Link to="/">
							<h1>Adopt Me!</h1>
						</Link>
					</header>

					<Routes>
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</Router>
			</div>
		</ThemeContext.Provider>
	);
};
