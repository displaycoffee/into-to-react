/* React */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Set pageCache to get previous page */
let pageCache = {
	previous: '',
};

export function useBodyClass(defaultPrefix) {
	const location = useLocation();
	const bodySelector = document.querySelector('body');
	const bodyPrefix = 'page-';
	const bodyDefault = defaultPrefix;

	useEffect(() => {
		// Remove any previous body class
		bodySelector.classList.remove(`${bodyPrefix}${pageCache.previous || bodyDefault}`);

		// Update previous location path
		// Replace any body prefix, remove first slash, and replace any other slash with hyphen
		pageCache.previous = location.pathname.replace(bodyPrefix, '').replace('/', '').replace(/\//g, '-');

		// Add new body class
		bodySelector.classList.add(`${bodyPrefix}${pageCache.previous || bodyDefault}`);
	}, [location]);

	return null;
}

export function useRespond(bp) {
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
}
