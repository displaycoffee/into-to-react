/* React */
import { useState, useContext } from 'react';

/* Local styles */
import './styles/carousel.scss';

/* Local components */
import { Context } from '../../entry/context/Context';

export const Carousel = (props) => {
	const { images, alt } = props;
	const context = useContext(Context);
	let [activeImage, setActiveImage] = useState(images && images[0] ? images[0] : context.variables.images.default);

	// Handle click to update image carousel
	const handleClick = (e, index) => {
		e.preventDefault();
		activeImage = images[index];
		setActiveImage(activeImage);
	};

	return (
		<div className="carousel flex-wrap flex-align-items-center">
			<div className="carousel-image">
				<div className="image-wrapper image-wrapper-fit">
					<img src={activeImage} alt={alt ? alt : 'hero'} title={alt ? alt : 'hero'} loading="lazy" />
				</div>
			</div>

			<div className="carousel-thumbnails flex-wrap flex-align-items-center flex-justify-content-center">
				{images.map((image, index) => (
					<div className={`carousel-thumbnail${activeImage === image ? ' active' : ''}`} key={image}>
						<a className="pointer" onClick={(e) => handleClick(e, index)}>
							<div className="image-wrapper image-wrapper-fit">
								<img src={image} alt={alt ? alt : 'thumbnail'} title={alt ? alt : 'thumbnail'} loading="lazy" />
							</div>
						</a>
					</div>
				))}
			</div>
		</div>
	);
};
