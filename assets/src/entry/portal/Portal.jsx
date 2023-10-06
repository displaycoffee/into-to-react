/* React */
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/* Local styles */
import './styles/portal.scss';

export const Portal = ({ children }) => {
	// Create element reference to wrap around portal content
	const elementRef = useRef(null);
	if (!elementRef.current) {
		elementRef.current = document.createElement('div');
		elementRef.current.setAttribute('class', 'portal-fixed flex-nowrap flex-align-items-center flex-justify-content-center');
	}

	// Add element reference to portal then clean up
	useEffect(() => {
		const portalRoot = document.getElementById('portal');
		portalRoot.appendChild(elementRef.current);
		return () => portalRoot.removeChild(elementRef.current);
	}, []);

	// Create portal with children
	return createPortal(children, elementRef.current);
};
