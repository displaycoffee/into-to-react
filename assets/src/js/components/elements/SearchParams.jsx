/* react imports */
import { useState, useEffect, useContext } from 'react';

/* local script imports */
import useBreedList from '../../scripts/useBreedList';

/* local component imports */
import { ThemeContext } from './ThemeContext';
import { Results } from './Results';

export const SearchParams = () => {
	// option arrays
	const animals = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
	const themes = ['darkblue', 'peru', 'chartreuse', 'pink', 'mediumorchid'];

	// state variables
	let [location, setLocation] = useState('');
	let [animal, setAnimal] = useState('');
	let [breed, setBreed] = useState('');
	let [pets, setPets] = useState([]);
	let [breeds] = useBreedList(animal);
	let [theme, setTheme] = useContext(ThemeContext);

	// breed value needs to be reset because sometimes it keeps breeds from other animals
	const resetBreed = () => {
		breed = '';
	};

	useEffect(() => {
		requestPets();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function requestPets() {
		// check if select options has default text
		const animalParam = animal && animal != 'Please Select' ? animal : '';
		const breedParam = breed && breed != 'Please Select' ? breed : '';

		// get response
		const response = await fetch(
			`http://pets-v2.dev-apis.com/pets?animal=${animalParam}&location=${location}&breed=${breedParam}`
		);
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
					<input
						id="location"
						value={location}
						placeholder="Location"
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>

				<label htmlFor="animal">
					Animal:
					<select
						id="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
							resetBreed();
						}}
						onBlur={(e) => {
							setAnimal(e.target.value);
							resetBreed();
						}}
					>
						<option>Please Select</option>
						{animals.map((animal) => (
							<option value={animal} key={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>

				<label htmlFor="breed">
					Breed:
					<select
						id="breed"
						value={breed}
						onChange={(e) => setBreed(e.target.value)}
						onBlur={(e) => setBreed(e.target.value)}
					>
						<option>Please Select</option>
						{breeds.map((breed) => (
							<option value={breed} key={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>

				<label htmlFor="theme">
					Theme:
					<select
						id="theme"
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option>Please Select</option>
						{themes.map((theme) => (
							<option value={theme} key={theme}>
								{theme}
							</option>
						))}
					</select>
				</label>

				<button style={{ backgroundColor: theme }} type="submit">
					Submit
				</button>
			</form>

			<Results pets={pets} />
		</div>
	);
};