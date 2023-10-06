/* React */
import { createRoot } from 'react-dom/client';

/* Local scripts */
import { theme } from './_config/scripts/theme';
import { utils } from './_config/scripts/utils';
import { variables } from './_config/scripts/variables';

/* Local components */
import { Index } from './entry/index/Index';

/* Create root into app entry point */
const rootElement = document.getElementById('root');
const rootTarget = createRoot(rootElement);
rootTarget.render(<Index theme={theme} utils={utils} variables={variables} />);
