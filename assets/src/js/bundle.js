/* react imports */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* local component imports */
import { Index } from './components/pages/Index';

/* create root into app entry point */
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<StrictMode><Index /></StrictMode>);