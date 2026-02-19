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
		charEnded: false,
	}

	marvelService = new MarvelService();
	
	componentDidMount() {
		window.addEventListener('scroll', this.onScrollLoad);
		this.updateChar();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScrollLoad);
	}

	

	onScrollLoad = () => {
		if(this.state.newItemLoading) return;
		if(this.state.charEnded) {
			window.removeEventListener('scroll', this.onScrollLoad);
		}
		if(document.documentElement.scrollTop + document.documentElement.clientHeight+1 > document.documentElement.scrollHeight) {
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
		console.log(this.state.offset)
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

	itemRefs = [];

	setItemRefs = (elem) => {
		this.itemRefs.push(elem);
	}

	onFocusElement = (id) => {
		this.itemRefs.forEach((item) => {
			item.classList.remove('char__content-item-selected');
		});
		this.itemRefs[id].classList.add('char__content-item-selected');
		this.itemRefs[id].focus();
	}

	

	renderItems = (arr) => {
		const elements = arr.map(({name, thumbnail, id}) => {
			return (<li key={id} 
						className="char__grid-item"
						ref={this.setItemRefs}
						tabIndex={0}
						onClick={() => {
							this.props.onCharSelected(id);
							this.onFocusElement(id-1)}}
						onKeyDown={(e) => {
							if(e.key === ' ' || e.key === 'Enter') {
								e.preventDefault();
								this.props.onCharSelected(id);
								this.onFocusElement(id-1);							
							}
						}}>
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