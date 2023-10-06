/* React */
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

/* Local styles */
import './styles/details.scss';

/* Local components */
import { Context } from '../../entry/context/Context';
import { Portal } from '../../entry/portal/Portal';
import { Loader } from '../../shared/loader/Loader';
import { Carousel } from '../../shared/carousel/Carousel';

export const Details = () => {
	const [showPortal, setShowPortal] = useState(false);
	const navigate = useNavigate();
	const context = useContext(Context);
	const [adoptedPet, setAdoptedPet] = context.adoptedPet;

	// Use pet parameter id to get details of pet
	const { id } = useParams();
	const results = useQuery(['details', id], context.utils.fetch.pet);

	// Add loading pane until loading
	if (results.isLoading) {
		return <Loader />;
	}

	// Grab pet data
	const pet = results.data.pets[0];

	return (
		<div className="details styled-bg">
			<div className="details-images">
				<Carousel images={pet.images} alt={pet.name} />
			</div>

			<div className="details-info">
				<h3>{pet.name}</h3>

				<p>
					{pet.animal} - {pet.breed} - {pet.city}, {pet.state}
				</p>

				<p>{pet.description}</p>

				<button onClick={() => setShowPortal(true)}>Adopt {pet.name}</button>

				{showPortal ? (
					<Portal>
						<div className="portal-adopt">
							<h3>Would you like to adopt {pet.name}?</h3>

							<div className="buttons">
								<button
									onClick={() => {
										setAdoptedPet(pet);
										navigate('/');
									}}
								>
									Yes
								</button>
								<button onClick={() => setShowPortal(false)}>No</button>
							</div>
						</div>
					</Portal>
				) : null}
			</div>
		</div>
	);
};
