/* React */
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

/* Local styles */
import './styles/details.scss';

/* Local components */
import { Context } from '../../entry/context/Context';
import { Portal } from '../../entry/portal/Portal';
import { Carousel } from '../../shared/carousel/Carousel';

export const Details = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const context = useContext(Context);
	const [adoptedPet, setAdoptedPet] = context.adoptedPet;

	// Use pet parameter id to get details of pet
	const { id } = useParams();
	const results = useQuery(['details', id], context.utils.fetch.pet);

	// Add loading pane until loading
	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<div className="loader">🍥</div>
			</div>
		);
	}

	const pet = results.data.pets[0];

	return (
		<div className="details styled-bg">
			<div className="details-images">
				<Carousel images={pet.images} />
			</div>

			<div className="details-info">
				<h3>{pet.name}</h3>

				<p>
					{pet.animal} - {pet.breed} - {pet.city}, {pet.state}
				</p>

				<p>{pet.description}</p>

				<button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>

				{showModal ? (
					<Portal>
						<div>
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
								<button onClick={() => setShowModal(false)}>No</button>
							</div>
						</div>
					</Portal>
				) : null}
			</div>
		</div>
	);
};
