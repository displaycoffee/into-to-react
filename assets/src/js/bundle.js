/* React */
import { createRoot } from 'react-dom/client';

/* Local components */
import { Index } from './pages/Index';

/* Create root into app entry point */
const rootElement = document.getElementById('root');
const rootTarget = createRoot(rootElement);
rootTarget.render(<Index />);
