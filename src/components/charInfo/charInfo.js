import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/skeleton';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import abyss from '../../resources/img/abyss.jpg';

import './charInfo.scss';

class CharInfo extends Component {

	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.charId !== prevProps.charId) {
			this.updateChar();
		}
	}

	onCharLoaded = (char) => {
		this.setState({char, loading: false});
	}

	onCharLoading = () => {
		this.setState({loading: true});
	}

	onError = () => {
		this.setState({error: true, loading: false});
	}

	updateChar = () => {		
		const charId = this.props.charId;
		if(!charId) {
			return;
		}
		this.onCharLoading();
		this.marvelService
			.getCharacter(charId)
				.then(this.onCharLoaded)
				.catch(this.onError);
	}


	render() {
		const {char, loading, error} = this.state;
		const skeleton = char || loading || error ? null : <Skeleton />
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char}/> : null;
		return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
	}
	
}

const View = ({char}) => {
	const {name, description, thumbnail, homepage, wiki, comics} = char;

	return (
		<>
			<div className="char__wrapper">
				<img src={thumbnail} alt={name} className="char__info-img" />
				<div className="char__info-buttons">
					<h2 className="char__info-title">{name}</h2>
					<a href={homepage} className="button button__main"><div className="inner">HOMEPAGE</div></a>
					<a href={wiki} className="button button__secondary"><div className="inner">WIKI</div></a>
				</div>
			</div>
			<p className="char__info-text">{description}</p>
			<div className="char__comics__title">Comics:</div>
			<ul className="char__comics">
				{comics.length ? comics.slice(0, 10).map((item, i) => {
					return (<li key={i} className="char__comics-item">{item}</li>);
				}) : 'There is no comics with this charachter'}
			</ul>
		</>
	);

}

export default CharInfo;