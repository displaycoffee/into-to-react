/* React */
import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

/* Local scripts */
import { fetchPet } from '../scripts/fetchPet';
import { Carousel } from '../elements/Carousel';
import { ErrorBoundary } from '../elements/ErrorBoundary';
import { Modal } from '../elements/Modal';
import { AdoptedPetContext } from '../elements/AdoptedPetContext';

export const Details = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);
	const { id } = useParams();
	const results = useQuery(['details', id], fetchPet);

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
						<Modal>
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
						</Modal>
					) : null}
				</h2>
			</div>
		</div>
	);
};

export default function DetailsErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	);
}
