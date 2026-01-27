import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {
	return (
		<div className="random">
			<div className="random__char">
				<img src={thor} alt="thor" className="random__char-img" />
				<div className="random__char-info">
					<h2 className="random__char-title">THOR</h2>
					<p className="random__char-text">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
					<div className="random__char-buttons">
						<a href="#" className="button button__main"><div className="inner">HOMEPAGE</div></a>
						<a href="#" className="button button__secondary"><div className="inner">WIKI</div></a>
					</div>
				</div>
			</div>
			<div className="random__choose">
				<p className="random__choose-text">
					Random character for today!
					Do you want to get to know him better?
					<br />
					<br />
					Or choose another one
				</p>
				<button className="button button__main"><div className="inner">TRY IT</div></button>
				<img src={mjolnir} alt="mjolnir" className="random__choose-img" />
			</div>
		</div>
	);
}

export default RandomChar;