/* react imports */
import { createRoot } from 'react-dom/client';

/* local component imports */
import { Index } from './pages/Index';

/* create root into app entry point */
const rootElement = document.getElementById('root');
const rootTarget = createRoot(rootElement);
rootTarget.render(<Index />);
