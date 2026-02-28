import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {

	const [char, setChar] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);



	const marvelService = new MarvelService();

	useEffect(() => {
		updateChar();
	}, []);


	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	}

	const onCharLoading = () => {
		setLoading(true);

	}

	const onError = () => {
		setError(true);
		setLoading(false);
	}

	const updateChar = () => {		
		const id = Math.floor(Math.random() * ((20-1) + 1));
		onCharLoading();
		marvelService
			.getCharacter(id)
				.then(onCharLoaded)
				.catch(onError);
	}




	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <View char={char}/> : null;
	return (
		<div className="random">
				{errorMessage}
				{spinner}
				{content}
			<div className="random__choose">
				<p className="random__choose-text">
					Random character for today!
					Do you want to get to know him better?
					<br />
					<br />
					Or choose another one
				</p>
				<button onClick={updateChar} className="button button__main"><div className="inner">TRY IT</div></button>
				<img src={mjolnir} alt="mjolnir" className="random__choose-img" />
			</div>
		</div>
	);


}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki} = char;
	return (				
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
	);
}

export default RandomChar;