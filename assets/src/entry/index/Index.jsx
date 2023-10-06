/* React */
import { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Local styles */
import './styles/index.scss';

/* Local components */
import { Context } from '../context/Context';
import { Header } from '../../shared/header/Header';
import { AdoptedPet } from '../../sidebar/adopted-pet/AdoptedPet';
import { SearchParams } from '../../sidebar/search-params/SearchParams';
import { NavigationRoutes } from '../../shared/navigation/Navigation';
import { ErrorBoundary } from '../../shared/error-boundary/ErrorBoundary';

/* Query client for pet api */
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

export const Index = (props) => {
	// Set state for adopted pet so we can use it later
	const adoptedPet = useState(null);

	return (
		<QueryClientProvider client={queryClient}>
			<Context.Provider value={{ ...props, adoptedPet: adoptedPet }}>
				<IndexWrapper />
			</Context.Provider>
		</QueryClientProvider>
	);
};

export const IndexWrapper = () => {
	const context = useContext(Context);

	// Set state for query params and animals
	const [requestParams, setRequestParams] = useState({
		location: '',
		animal: '',
		breed: '',
	});
	const [animal, setAnimal] = useState('');

	// Get list of breeds for search selections
	const [breeds] = context.utils.use.breeds(animal);

	return (
		<div className="wrapper">
			<Router basename={context.variables.paths.base}>
				<IndexBody />

				<ErrorBoundary message={<IndexError />}>
					<Header />

					<main className="main">
						<div className="main-layout flex-wrap">
							<aside className="main-sidebar">
								<AdoptedPet />

								<SearchParams setRequestParams={setRequestParams} animal={animal} setAnimal={setAnimal} breeds={breeds} />
							</aside>

							<section className="main-content">
								<NavigationRoutes requestParams={requestParams} />
							</section>
						</div>
					</main>
				</ErrorBoundary>
			</Router>
		</div>
	);
};

/* Set indexCache mostly to get previous page */
let indexCache = {
	previous: '',
};

const IndexBody = () => {
	const location = useLocation();
	const bodySelector = document.querySelector('body');
	const bodyPrefix = 'page-';

	useEffect(() => {
		// Remove any previous body class
		bodySelector.classList.remove(`${bodyPrefix}${indexCache.previous || 'index'}`);

		// Replace any body prefix, remove first slash, and replace any other slash with hyphen
		indexCache.previous = location.pathname.replace(bodyPrefix, '').replace('/', '').replace(/\//g, '-');

		// Add new body class
		bodySelector.classList.add(`${bodyPrefix}${indexCache.previous || 'index'}`);
	}, [location]);

	return null;
};

const IndexError = () => {
	return (
		<p>
			Something went wrong. <Link to={'/'}>Go back.</Link>
		</p>
	);
};
