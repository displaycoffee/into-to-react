/* React */
import { useContext } from 'react';

/* Local styles */
import './styles/adopted-pet.scss';

/* Local components */
import { Context } from '../../entry/context/Context';

export const AdoptedPet = (props) => {
	const context = useContext(Context);
	const [adoptedPet, setAdoptedPet] = context.adoptedPet;

	return adoptedPet ? (
		<div className="pet image-container">
			<img src={adoptedPet.images[0]} alt={adoptedPet.name} title={adoptedPet.name} />
		</div>
	) : null;
};
