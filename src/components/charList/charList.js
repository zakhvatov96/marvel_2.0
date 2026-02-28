import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

const CharList = (props) => {

	const [char, setChar] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);


	const marvelService = new MarvelService();

	useEffect(() => {
		window.addEventListener('scroll', onScrollLoad);
		updateChar();
		return () => {
			window.removeEventListener('scroll', onScrollLoad);
		}
	}, []);

	const newItemsBtn = useRef();
	


	const onScrollLoad = () => {
		if(newItemLoading) return;
		if(charEnded) {
			window.removeEventListener('scroll', onScrollLoad);
		}
		if(document.documentElement.scrollTop + document.documentElement.clientHeight+1 > document.documentElement.scrollHeight) {
			newItemsBtn.current.click();
		}

	}
	
	const onItemsLoading = () => {
		setNewItemLoading(true);
	}

	const onCharLoaded = (newChar) => {
		let ended = false;
		if (newChar.length < 9) {
			ended = true;
		}

		setChar(char => [...char, ...newChar]);
		setLoading(loading => false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset+9);
		setCharEnded(charEnded => ended);		
	}

	const onError = () => {
		setError(true);
		setLoading(loading => false);
	}

	function updateChar (offset) {
		onItemsLoading();
		marvelService
			.getAllCharacters(offset)
				.then(onCharLoaded)
				.catch(onError);
	}

	const itemRefs = useRef([]);


	const onFocusElement = (id) => {
		itemRefs.current.forEach((item) => {
			item.classList.remove('char__content-item-selected');
		});
		itemRefs.current[id].classList.add('char__content-item-selected');
		itemRefs.current[id].focus();
	}

	

	function renderItems(arr) {
		const elements = arr.map(({name, thumbnail, id}) => {
			return (<li key={id} 
						className="char__grid-item"
						ref={el => itemRefs.current[id-1] = el}
						tabIndex={0}
						onClick={() => {
							props.onCharSelected(id);
							onFocusElement(id-1)}}
						onKeyDown={(e) => {
							if(e.key === ' ' || e.key === 'Enter') {
								e.preventDefault();
								props.onCharSelected(id);
								onFocusElement(id-1);							
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

	const items = renderItems(char);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? items : null;
	
	return (
		<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
			<button className="button button__long button__main"
					onClick={() => updateChar(offset)}
					ref={newItemsBtn}
					disabled={newItemLoading}
					style={{'display': charEnded ? 'none' : 'block'}}><div className="inner">LOAD MORE</div></button>
		</div>
	);

};

export default CharList;