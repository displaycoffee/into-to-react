/* React */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

/* Local scripts */
import { variables } from './variables';

export const utils = {
	handleize: (value) => {
		// Format value for html classes
		return value
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s/g, '-')
			.trim();
	},
	respond: (bp) => {
		const rule = window.matchMedia(`(min-width: ${bp}px)`);
		let [match, setMatch] = useState(rule.matches);

		// Update match state on media change
		rule.onchange = (e) => {
			if (e.matches) {
				match = true;
			} else {
				match = false;
			}
			setMatch(match);
		};

		return match;
	},
	fetch: {
		breeds: async ({ queryKey }) => {
			// If there are no animals, return empty array
			const animal = queryKey[1];
			if (!animal) {
				return [];
			}

			// Get response
			const apiResponse = await fetch(`${variables.paths.api}/breeds?animal=${animal}`);
			if (!apiResponse.ok) {
				throw new Error(`breeds/${animal} fetch not ok`);
			}

			// Return json
			return apiResponse.json();
		},
		pet: async ({ queryKey }) => {
			const id = queryKey[1];

			// Get response
			const apiResponse = await fetch(`${variables.paths.api}/pets?id=${id}`);
			if (!apiResponse.ok) {
				throw new Error(`details/${id} fetch not ok`);
			}

			// Return json
			return apiResponse.json();
		},
		search: async ({ queryKey }) => {
			const { animal, location, breed } = queryKey[1];

			// Get response
			const apiResponse = await fetch(`${variables.paths.api}/pets?animal=${animal}&location=${location}&breed=${breed}`);
			if (!apiResponse.ok) {
				throw new Error(`pet search not ok ${animal}, ${location}, ${breed}`);
			}

			// Return json
			return apiResponse.json();
		},
	},
	use: {
		breeds: (animal) => {
			// Get results from breed list
			const results = useQuery(['breeds', animal], utils.fetch.breeds);
			return [results?.data?.breeds ?? [], results.status];
		},
	},
};
