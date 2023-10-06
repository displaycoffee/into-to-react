/* Local components */
import { Search } from '../../../content/search/Search';
import { Details } from '../../../content/details/Details';

export const navigation = [
	{
		id: 1,
		label: 'Pet details',
		alt: 'Pet details',
		url: '/details/:id',
		showInNav: true,
		render: (props) => {
			return props ? <Details {...props} /> : <Details />;
		},
	},
	{
		id: 0,
		label: 'Pet results',
		alt: 'Pet results',
		url: '/',
		showInNav: true,
		render: (props) => {
			return props ? <Search {...props} /> : <Search />;
		},
	},
].sort((a, b) => {
	// Sort navigation by id
	return a.id - b.id;
});
