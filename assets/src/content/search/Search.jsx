/* React */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

/* Local styles */
import './styles/search.scss';

/* Local components */
import { Context } from '../../entry/context/Context';

export const Search = (props) => {
	const { requestParams } = props;
	const context = useContext(Context);

	// Use query to get and show results
	const results = useQuery(['search', requestParams], context.utils.fetch.search);
	const pets = results?.data?.pets ?? [];

	// Set default hero image
	let hero = context.variables.images.default;

	return (
		<div className="search">
			{pets && pets.length !== 0 ? (
				pets.map((pet) => {
					// Update hero if pet has main image
					if (pet.images && pet.images.length !== 0) {
						hero = pet.images[0];
					}

					return (
						<Link to={`/details/${pet.id}`} className="pet styled-bg" key={pet.id}>
							<div className="pet-details flex-nowrap flex-align-items-center">
								<div className="pet-image column">
									<img src={hero} alt={pet.name} title={pet.name} />
								</div>

								<div className="pet-info column">
									<h5>{pet.name}</h5>
									<p>
										{pet.animal} - {pet.breed} - {`${pet.city}, ${pet.state}`}
									</p>
								</div>
							</div>
						</Link>
					);
				})
			) : (
				<p>No pets found. :(</p>
			)}
		</div>
	);
};
