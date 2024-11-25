/* React */
import { BrowserRouter as Router } from 'react-router-dom';

/* Local scripts */
import { theme } from '../../_config/scripts/theme';
import { utils } from '../../_config/scripts/utils';
import { variables } from '../../_config/scripts/variables';

/* Local components */
import { Container } from '../../layout/container/Container';

/* Index component */
const Index = () => {
	return (
		<Router basename={variables.paths.basename}>
			<Container theme={theme} utils={utils} variables={variables} />
		</Router>
	);
};

/* Create main target entry point */
utils.renderTarget('#index', <Index />);
