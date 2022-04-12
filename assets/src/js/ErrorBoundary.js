// mostly took this from the react docs
import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

class ErrorBoundary extends Component {
	state = { hasError: false, redirect: false };

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// I log this to Sentry, Azure Monitor, New Relic, TrackJS, etc.
		console.error('ErrorBoundary caught an error', error, info);
		setTimeout(() => {
			this.setState({ redirect: true });
		}, 5000);
	}

	render() {
		if (this.state.redirect) {
			return <Navigate to="/" replace={true} />;
		} else if (this.state.hasError) {
			return (
				<h2>
					This listing has an error. <Link to="/">Click here</Link> to
					go back to the home page.
				</h2>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
