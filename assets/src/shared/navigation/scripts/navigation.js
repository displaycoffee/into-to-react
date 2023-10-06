export const navigation = [
	{
		id: 1,
		label: 'Pet details',
		alt: 'Pet details',
		url: '/details/:id',
		showInNav: true,
	},
	{
		id: 0,
		label: 'Pet results',
		alt: 'Pet results',
		url: '/',
		showInNav: true,
	},
].sort((a, b) => {
	// Sort navigation by id
	return a.id - b.id;
});
