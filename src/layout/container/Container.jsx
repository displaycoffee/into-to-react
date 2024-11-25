/* React */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* Local styles */
import './styles/container.scss';

/* Local scripts */
import { useBodyClass, useRespond } from '../../_config/scripts/hooks';

/* Local components */
import { Context } from '../../context/Context';
import { Navigation } from '../../components/navigation/Navigation';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Slideout, SlideoutOverlay } from '../../components/slideout/Slideout';
import { Header } from '../../layout/header/Header';
import { Content } from '../../layout/content/Content';
import { Sidebar } from '../../layout/sidebar/Sidebar';
import { Footer } from '../../layout/footer/Footer';
import { Portal } from '../../targets/portal/Portal';

export const Container = (props) => {
	const { theme, utils } = props;
	const location = useLocation();
	const isDesktop = useRespond(theme.bps.bp02);
	let [sidebar, setSidebar] = useState(true);

	// Set body class using custom hook
	useBodyClass('search');

	// Determine if layout should have sidebar or not
	const excludeSidebar = [];
	useEffect(() => {
		sidebar = excludeSidebar.includes(location.pathname) ? false : true;
		setSidebar(sidebar);
	}, [location.pathname]);

	return (
		<Context.Provider value={props}>
			<div className="container">
				<ErrorBoundary message={<ContainerError />}>
					<SlideoutOverlay isDesktop={isDesktop} />

					<Header />

					{isDesktop ? (
						<Navigation />
					) : (
						<Slideout id={'menu'} isDesktop={isDesktop} label={'Menu'} content={<Navigation />} closeOnClick={true} />
					)}

					<main className="main">
						<div className="main-layout flex-wrap">
							<Sidebar show={sidebar && isDesktop} />

							<Content />
						</div>
					</main>

					<Footer />

					<button className="pointer unstyled a" onClick={(e) => utils.scrollTo(e, '#index')} type="button">
						Scroll to top
					</button>

					<Portal element={'#portal'} classes={'portal-fixed flex-nowrap flex-align-items-center flex-justify-content-center'}>
						<p>
							This is an example of a portal from index.html. It could also be added inside other components to access details of that
							component.
						</p>
					</Portal>
				</ErrorBoundary>
			</div>
		</Context.Provider>
	);
};

const ContainerError = () => {
	return (
		<p>
			Something went wrong. <Link to={'/'}>Go back.</Link>
		</p>
	);
};
