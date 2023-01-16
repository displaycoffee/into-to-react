/* react imports */
import { Component } from 'react';

/* local script imports */
import withRouter from '../../scripts/withRouter';

/* local component imports */
import { ThemeContext } from '../elements/ThemeContext';
import { Carousel } from '../elements/Carousel';
import { ErrorBoundary } from '../elements/ErrorBoundary';
import { Modal } from '../elements/Modal';

export class Details extends Component {
	state = { loading: true, showModal: false };

	async componentDidMount() {
		const response = await fetch(
			`http://pets-v2.dev-apis.com/pets?id=${this.props.router.params.id}`
		);
		const json = await response.json();

		this.setState(
			Object.assign(
				{
					loading: false,
				},
				json.pets[0]
			)
		);
	}

	toggleModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};
	adopt = () => {
		window.location = 'http://bit.ly/pet-adopt';
	};

	render() {
		const {
			animal,
			breed,
			city,
			state,
			description,
			name,
			images,
			showModal,
		} = this.state;

		if (this.state.loading) {
			return <h2>Loading...</h2>;
		}

		return (
			<div className="details">
				<Carousel images={images} />

				<div>
					<h1>{name}</h1>

					<h2>
						{animal} - {breed} - {city}, {state}
					</h2>

					<ThemeContext.Consumer>
						{([theme]) => (
							<button
								onClick={this.toggleModal}
								style={{ backgroundColor: theme }}
							>
								Adopt {name}
							</button>
						)}
					</ThemeContext.Consumer>

					<p>{description}</p>

					{showModal ? (
						<Modal>
							<div>
								<h1>Would you like to adopt {name}?</h1>

								<div className="buttons">
									<button type="button" onClick={this.adopt}>
										Yes
									</button>
									<button
										type="button"
										onClick={this.toggleModal}
									>
										No
									</button>
								</div>
							</div>
						</Modal>
					) : null}
				</div>
			</div>
		);
	}
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
	return (
		<ErrorBoundary>
			<DetailsWithRouter />
		</ErrorBoundary>
	);
}
