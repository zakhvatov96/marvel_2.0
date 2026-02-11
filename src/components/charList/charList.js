import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

class CharList extends Component {

	state = {
		char: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 0,
		charEnded: false
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
		window.addEventListener('scroll', this.onScrollLoad);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollLoad);
	}

	onScrollLoad = () => {
		if(document.documentElement.scrollTop + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
			this.updateChar(this.state.offset)
		}
	}
	
	onItemsLoading = () => {
		this.setState({newItemLoading: true});
	}

	onCharLoaded = (newChar) => {
		let ended = false;
		if (newChar.length < 9) {
			ended = true;
		}
		this.setState(({char, offset}) => (
			{char: [...char, ...newChar], 
			 loading: false, 
			 newItemLoading: false,
			 offset: offset+9,
			 charEnded: ended
			}));
	}

	onError = () => {
		this.setState({error: true, loading: false});
	}

	updateChar = (offset) => {
		this.onItemsLoading();
		this.marvelService
			.getAllCharacters(offset)
				.then(this.onCharLoaded)
				.catch(this.onError);
	}

	renderItems = (arr) => {
		const elements = arr.map(({name, thumbnail, id}) => {
			return (<li key={id} 
						className="char__grid-item"
						onClick={() => {this.props.onCharSelected(id)}}>
						<img src={thumbnail} alt={name} className="char__grid-item-img" />
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
		const {char, loading, error, newItemLoading, offset, charEnded} = this.state;
		const items = this.renderItems(char);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;
		
		return (
			<div className="char__list">
					{errorMessage}
					{spinner}
					{content}
				<button className="button button__long button__main"
						onClick={() => this.updateChar(offset)}
						disabled={newItemLoading}
						style={{'display': charEnded ? 'none' : 'block'}}><div className="inner">LOAD MORE</div></button>
			</div>
		);
	}
};

export default CharList;