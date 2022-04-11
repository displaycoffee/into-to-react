import { Component } from 'react';
import withRouter from './withRouter';
import Carousel from './Carousel';

class Details extends Component {
	state = { loading: true };

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

	render() {
		const { animal, breed, city, state, description, name, images } =
			this.state;

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

					<button>Adopt {name}</button>

					<p>{description}</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Details);
