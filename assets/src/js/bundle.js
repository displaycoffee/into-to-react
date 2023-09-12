/* react imports */
import { createRoot } from 'react-dom/client';

/* local component imports */
import { Index } from './pages/Index';

/* create root into app entry point */
const baseApp = document.getElementById('base-app');
const baseRoot = createRoot(baseApp);
baseRoot.render(<Index />);
