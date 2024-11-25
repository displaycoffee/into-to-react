/* Local styles */
import './styles/content.scss';

/* Local components */
import { NavigationRoutes } from '../../components/navigation/Navigation';

export const Content = () => {
	return (
		<section className="content">
			<div className="styled-bg">
				<NavigationRoutes testProp={'testProp'} />
			</div>
		</section>
	);
};
