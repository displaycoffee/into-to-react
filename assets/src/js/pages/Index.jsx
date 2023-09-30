/* React */
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Local components */
import { AdoptedPetContext } from '../elements/AdoptedPetContext';
import { SearchParams } from '../elements/SearchParams';
import Details from './Details';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

export const Index = () => {
	const adoptedPet = useState(null);

	return (
		<Router>
			<QueryClientProvider client={queryClient}>
				<AdoptedPetContext.Provider value={adoptedPet}>
					<header>
						<Link to="/">Adopt Me!</Link>
					</header>

					<Routes>
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</AdoptedPetContext.Provider>
			</QueryClientProvider>
		</Router>
	);
};
