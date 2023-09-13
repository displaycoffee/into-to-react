/* Local components */
import { Pet } from '../elements/Pet';

export const Index = () => {
	return (
		<div>
			<h1>Adopt Me!</h1>
			<Pet name={'Luna'} animal={'Dog'} breed={'Havenese'} />
			<Pet name={'Pepper'} animal={'Bird'} breed={'Cockatiel'} />
			<Pet name={'Doink'} animal={'Cat'} breed={'Mixed'} />
		</div>
	);
};
