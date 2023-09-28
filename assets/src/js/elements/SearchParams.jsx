/* React */
import { useState, useEffect } from 'react';

/* Local scripts */
import { useBreedList } from '../scripts/useBreedList';

/* Local components */
import { Results } from './Results';

const animals = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

export const SearchParams = () => {
	const [location, setLocation] = useState('');
	const [animal, setAnimal] = useState('');
	const [pets, setPets] = useState([]);
	const [breed, setBreed] = useState('');
	const [breeds] = useBreedList(animal);

	useEffect(() => {
		requestPets();
	}, []);

	async function requestPets() {
		const response = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
		const json = await response.json();
		setPets(json.pets);
	}

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor="location">
					Location:
					<input id="location" value={location} type="text" onChange={(e) => setLocation(e.target.value)} />
				</label>

				<label htmlFor="animal">
					Animal:
					<select
						id="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
							setBreed('');
						}}
					>
						<option>Select animal</option>
						{animals.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
				</label>

				<label htmlFor="breed">
					Breed:
					<select id="breed" disabled={breeds.length === 0} value={breed} onChange={(e) => setBreed(e.target.value)}>
						<option>Select breed</option>
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>

				<button>Submit</button>
			</form>

			<Results pets={pets} />
		</div>
	);
};
