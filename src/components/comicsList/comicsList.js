import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';


import './comicsList.scss';

const ComicsList = (props) => {

	const [comic, setComic] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [comicEnded, setComicEnded] = useState(false);

	const {loading, error, getAllComics} = useMarvelService();

	useEffect(() => {
		window.addEventListener('scroll', onScrollLoad);
		updateComics(offset, true);
		return () => {
			window.removeEventListener('scroll', onScrollLoad);
		}
	}, []);

	const newItemsBtn = useRef();

	const onScrollLoad = () => {
		if(newItemLoading) return;
		if(comicEnded) {
			window.removeEventListener('scroll', onScrollLoad);
		}
		if(document.documentElement.scrollTop + document.documentElement.clientHeight+1 > document.documentElement.scrollHeight) {
			newItemsBtn.current.click();
		}

	}

	const onComicsLoaded = (newComic) => {
		let ended = false;
		if (newComic.length < 8) {
			ended = true;
		}

		setComic(comic => [...comic, ...newComic]);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset+8);
		setComicEnded(comicEnded => ended);		
	}

	function updateComics (offset, initial) {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
				.then(onComicsLoaded);
	}

	function renderItems(arr) {
		const elements = arr.map(({name, thumbnail, price, id}) => {
			return (<li key={id} 
						className="comics__grid-item">
						<img src={thumbnail} alt={name} className="comics__grid-item-img" />
						<div className="comics__grid-item-name">{name}</div>
						<div className="comics__grid-item-price">{`${price}$`}</div>
					</li>)
		})

		return (
			<ul className="comics__grid">
					{elements}
				</ul>
		)
	}

	const items = renderItems(comic);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;


	return (
		<div className="comics__list">
				{errorMessage}
				{spinner}
				{items}
			<button className="button button__long button__main"
					onClick={() => updateComics(offset)}
					ref={newItemsBtn}
					disabled={newItemLoading}
					style={{'display': comicEnded ? 'none' : 'block'}}>
				<div className="inner">LOAD MORE</div>
			</button>
		</div>
	);
}

export default ComicsList;