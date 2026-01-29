import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateChar();
	}

	state = {
		char: {}
	}

	marvelService = new MarvelService();

	onCharLoaded = (char) => {
		this.setState({char})
	}

	updateChar = () => {
		const id = Math.floor(Math.random() * ((20-1) + 1));
		this.marvelService.
			getCharacter(id).
				then(this.onCharLoaded);
	}



	render() {
		const {char: {name, description, thumbnail, homepage, wiki}} = this.state;
		return (
			<div className="random">
				<div className="random__char">
					<img src={thumbnail} alt="character" className="random__char-img" />
					<div className="random__char-info">
						<h2 className="random__char-title">{name}</h2>
						<p className="random__char-text">{description}</p>
						<div className="random__char-buttons">
							<a href={homepage} className="button button__main"><div className="inner">HOMEPAGE</div></a>
							<a href={wiki} className="button button__secondary"><div className="inner">WIKI</div></a>
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
}

export default RandomChar;