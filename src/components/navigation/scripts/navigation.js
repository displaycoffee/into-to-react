export const navigation = [
	{
		id: 1,
		label: 'Pet details',
		alt: 'Pet details',
		url: '/details/:id',
		showInNav: false,
		isRoute: true,
	},
	{
		id: 0,
		label: 'Pet results',
		alt: 'Pet results',
		url: '/',
		showInNav: true,
		isRoute: true,
	},
].sort((a, b) => {
	// Sort navigation by id
	return a.id - b.id;
});

/* Function to filter out navigation links */
export const createNavigationList = (navigation, isRoute) => {
	// Determine initial navigaton check
	let hasNavigation = navigation && navigation.length !== 0 ? true : false;

	// Filter out navigation links
	navigation = navigation.filter((nav) => {
		const hasNavLink = (isRoute && nav.isRoute) || (!isRoute && nav.showInNav) ? true : false;
		return hasNavLink;
	});

	// Check navigation again
	hasNavigation = navigation && navigation.length !== 0 ? true : false;

	// Return final navigation
	return hasNavigation ? navigation : [];
};
