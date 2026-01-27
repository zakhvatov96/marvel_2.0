import xmen from '../../resources/img/x-men.png';

import './singleComic.scss';

const SingleComic = () => {
	return (
		<div className="single">
			<div className="single__grid">
				<img src={xmen} alt="xmen" className="single__img" />
				<div className="single__info">
					<h2 className="single__title">X-Men: Days of Future Past</h2>
					<p className="single__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
					<div className="single__pages">144 pages</div>
					<div className="single__lang">Language: en-us</div>
					<div className="single__price">9.99$</div>
				</div>
				<a href="#" className="single__back">Back to all</a>
			</div>
		</div>
	);
}

export default SingleComic;