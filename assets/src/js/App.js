import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchParams from './SearchParams';
import Details from './Details';

const App = () => {
	return (
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
	);
};

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);
