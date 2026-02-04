import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

class CharList extends Component {

	state = {
		char: [],
		loading: true,
		error: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
	}

	onCharLoaded = (char) => {
		this.setState({char, loading: false});
	}

	onError = () => {
		this.setState({error: true, loading: false});
	}

	updateChar = () => {
		this.marvelService
			.getAllCharacters()
				.then(this.onCharLoaded)
				.catch(this.onError);
	}

	renderItems = (arr) => {
		const elements = arr.map(({name, thumbnail, id}) => {
			return (<li key={id} className="char__grid-item">
						<img src={thumbnail} alt="abyss" className="char__grid-item-img" />
						<div className="char__grid-item-name">{name}</div>
					</li>)
		})

		return (
			<ul className="char__grid">
					{elements}
				</ul>
		)
	}

	render() {
		const {char, loading, error} = this.state;
		const items = this.renderItems(char);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;
		
		return (
			<div className="char__list">
					{errorMessage}
					{spinner}
					{content}
				<button className="button button__long button__main"><div className="inner">LOAD MORE</div></button>
			</div>
		);
	}
};

export default CharList;