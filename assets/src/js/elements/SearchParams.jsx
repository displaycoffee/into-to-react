/* React */
import { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

/* Local scripts */
import { fetchSearch } from '../scripts/fetchSearch';
import { useBreedList } from '../scripts/useBreedList';

/* Local components */
import { AdoptedPetContext } from './AdoptedPetContext';
import { Results } from './Results';

const animals = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

export const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		location: '',
		animal: '',
		breed: '',
	});
	const [animal, setAnimal] = useState('');
	const [breeds] = useBreedList(animal);
	const [adoptedPet] = useContext(AdoptedPetContext);
	const results = useQuery(['search', requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					const obj = {
						animal: formData.get('animal') ?? '',
						breed: formData.get('breed') ?? '',
						location: formData.get('location') ?? '',
					};
					setRequestParams(obj);
				}}
			>
				{adoptedPet ? (
					<div className="pet image-container">
						<img src={adoptedPet.images[0]} alt={adoptedPet.name} />
					</div>
				) : null}

				<label htmlFor="location">
					Location:
					<input id="location" name="location" type="text" />
				</label>

				<label htmlFor="animal">
					Animal:
					<select
						id="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
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
					<select id="breed" disabled={breeds.length === 0} name="breed">
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
