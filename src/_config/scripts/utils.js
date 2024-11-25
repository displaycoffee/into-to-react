/* React */
import { createRoot } from 'react-dom/client';
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';

// /* Local scripts */
// import { variables } from './variables';

export const utils = {
	handleize: (value) => {
		// Format value for html classes
		return value
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s/g, '-')
			.trim();
	},
	isSticky: (element, stickyClass) => {
		if (element) {
			// Create options and callback for observer
			const stickyOptions = { threshold: [1] };
			const stickyCallback = (e) => {
				e.target.classList.toggle(stickyClass, e.intersectionRatio < 1);
			};

			// Observe to toggle sticky class
			const stickyObserver = new IntersectionObserver(([e]) => stickyCallback(e), stickyOptions);
			stickyObserver.observe(element);
		}
	},
	renderTarget: (element, component) => {
		// Render target for app
		const targetElement = document.querySelector(element);
		const targetHasChildren = targetElement && targetElement?.children && targetElement.children.length !== 0 ? true : false;
		if (!targetHasChildren) {
			const targetTarget = createRoot(targetElement);
			targetTarget.render(component);
		}
	},
	scrollTo: (e, selector, offset) => {
		// Scroll to element on page
		e.preventDefault();
		const anchor = {
			selector: selector ? selector : false,
			offset: offset ? offset : 0,
			position: () => {
				const anchorElement = document.querySelector(anchor.selector) ? document.querySelector(anchor.selector) : false;
				return anchorElement ? anchorElement.getBoundingClientRect().top + window.scrollY - anchor.offset : 0 - anchor.offset;
			},
		};
		window.scroll({ top: anchor.position(), left: 0, behavior: 'smooth' });
	},
	setAttributes: (element, atttributes) => {
		// Set multiple attributes on an element
		for (const attribute in atttributes) {
			element.setAttribute(attribute, atttributes[attribute]);
		}
	},
	// fetch: {
	// 	breeds: async ({ queryKey }) => {
	// 		// If there are no animals, return empty array
	// 		const animal = queryKey[1];
	// 		if (!animal) {
	// 			return [];
	// 		}

	// 		// Get response
	// 		const apiResponse = await fetch(`${variables.paths.api}/breeds?animal=${animal}`);
	// 		if (!apiResponse.ok) {
	// 			throw new Error(`breeds/${animal} fetch not ok`);
	// 		}

	// 		// Return json
	// 		return apiResponse.json();
	// 	},
	// 	pet: async ({ queryKey }) => {
	// 		const id = queryKey[1];

	// 		// Get response
	// 		const apiResponse = await fetch(`${variables.paths.api}/pets?id=${id}`);
	// 		if (!apiResponse.ok) {
	// 			throw new Error(`details/${id} fetch not ok`);
	// 		}

	// 		// Return json
	// 		return apiResponse.json();
	// 	},
	// 	search: async ({ queryKey }) => {
	// 		const { animal, location, breed } = queryKey[1];

	// 		// Get response
	// 		const apiResponse = await fetch(`${variables.paths.api}/pets?animal=${animal}&location=${location}&breed=${breed}`);
	// 		if (!apiResponse.ok) {
	// 			throw new Error(`pet search not ok ${animal}, ${location}, ${breed}`);
	// 		}

	// 		// Return json
	// 		return apiResponse.json();
	// 	},
	// },
	// use: {
	// 	breeds: (animal) => {
	// 		// Get results from breed list
	// 		const results = useQuery(['breeds', animal], utils.fetch.breeds);
	// 		return [results?.data?.breeds ?? [], results.status];
	// 	},
	// },
};
