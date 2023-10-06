/* React */
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* Local styles */
import './styles/search-params.scss';

/* Local components */
import { Context } from '../../entry/context/Context';

export const SearchParams = (props) => {
	const context = useContext(Context);
	const navigate = useNavigate();
	const { setRequestParams, animal, setAnimal, breeds } = props;

	return (
		<div className="search-params">
			<form
				className="styled-bg"
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					const obj = {
						animal: formData.get('animal') ?? '',
						breed: formData.get('breed') ?? '',
						location: formData.get('location') ?? '',
					};
					setRequestParams(obj);
					navigate('/');
				}}
			>
				<label className="flex-label flex-nowrap flex-align-items-center" htmlFor="location">
					<span>Location:</span>
					<input id="location" name="location" type="text" />
				</label>

				<label className="flex-label flex-nowrap flex-align-items-center" htmlFor="animal">
					<span>Animal:</span>
					<select
						id="animal"
						name="animal"
						value={animal}
						onChange={(e) => {
							setAnimal(e.target.value);
						}}
					>
						<option value="">Select animal</option>
						{context.variables.animals.map((animal) => (
							<option value={animal.value} key={animal.value}>
								{animal.label}
							</option>
						))}
					</select>
				</label>

				<label className="flex-label flex-nowrap flex-align-items-center" htmlFor="breed">
					<span>Breed:</span>
					<select id="breed" disabled={breeds.length === 0} name="breed">
						<option value="">Select breed</option>
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
				</label>

				<button>Submit</button>
			</form>
		</div>
	);
};
