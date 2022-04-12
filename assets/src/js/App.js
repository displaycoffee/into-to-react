import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchParams from './SearchParams';
import Details from './Details';
import ThemeContext from './ThemeContext';

const App = () => {
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
