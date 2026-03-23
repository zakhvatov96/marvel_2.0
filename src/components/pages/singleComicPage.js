import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import xmen from '../../resources/img/x-men.png';

import './singleComicPage.scss';

const SingleComicPage = () => {

	const {comicId} = useParams();

	const [comic, setComic] = useState();

	const {loading, error, getComic, clearError} = useMarvelService();

	useEffect(() => {
		updateComic();
	}, [comicId]);

	
	const onComicLoaded = (comic) => {
		setComic(comic);
	}

	const updateComic = () => {		
		clearError();
		getComic(comicId)
			.then(onComicLoaded);

	}

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic}/> : null;


	return (
			<div className="single">
				{errorMessage}
				{spinner}
				{content}
			</div>
	);
}

const View = ({comic}) => {
	const {name, description, thumbnail, pages, lang, price} = comic;

	return (
		<>
			<div className="single__grid">
				<img src={thumbnail} alt={name} className="single__img" />
				<div className="single__info">
					<h2 className="single__title">{name}</h2>
					<p className="single__descr">{description}</p>
					<div className="single__pages">{pages} pages</div>
					<div className="single__lang">Language: {lang}</div>
					<div className="single__price">{price}$</div>
				</div>
				<Link to={'/comics'} className="single__back">Back to all</Link>
			</div>
		</>
	);

}

export default SingleComicPage;