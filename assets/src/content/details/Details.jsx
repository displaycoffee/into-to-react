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
	const { id } = useParams();
	const results = useQuery(['details', id], context.utils.fetch.pet);

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<div className="loader">🍥</div>
			</div>
		);
	}

	const pet = results.data.pets[0];

	return (
		<div className="details">
			<Carousel images={pet.images} />

			<div>
				<h1>{pet.name}</h1>

				<h2>
					{pet.animal} - {pet.breed} - {pet.city}, {pet.state}
					<button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
					<p>{pet.description}</p>
					{showModal ? (
						<Portal>
							<div>
								<h1>Would you like to adopt {pet.name}?</h1>

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
				</h2>
			</div>
		</div>
	);
};
