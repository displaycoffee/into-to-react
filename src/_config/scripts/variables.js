/* This config contains variables to use through application */
const directory = '/into-to-react';
export const variables = {
	paths: {
		basename: window.location.pathname.includes(directory) ? directory : '',
		api: 'http://pets-v2.dev-apis.com',
	},
	images: {
		default: 'http://pets-images.dev-apis.com/pets/none.jpg',
	},
	animals: [
		{
			label: 'Bird',
			value: 'bird',
		},
		{
			label: 'Cat',
			value: 'cat',
		},
		{
			label: 'Dog',
			value: 'dog',
		},
		{
			label: 'Rabbit',
			value: 'rabbit',
		},
		{
			label: 'Reptile',
			value: 'reptile',
		},
	],
};
