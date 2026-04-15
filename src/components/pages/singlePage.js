import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppBanner from '../appBanner/appBanner';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import xmen from '../../resources/img/x-men.png';

import './singleComicPage.scss';

const SinglePage = (props) => {
  const { itemId } = useParams();

  const [item, setItem] = useState();

  const { loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateItem();
  }, [itemId]);

  const onItemLoaded = (item) => {
    setItem(item);
  };

  const updateItem = () => {
    clearError();
    props.getItem(itemId).then(onItemLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !item) ? <View item={item} /> : null;

  return (
    <>
      <AppBanner />
      <div className='single'>
        {errorMessage}
        {spinner}
        {content}
      </div>
    </>
  );
};

const View = ({ item }) => {
  const {
    name,
    description,
    thumbnail,
    pages = null,
    lang = null,
    price = null,
  } = item;

  return pages ? (
    <>
      <div className='single__grid'>
        <img src={thumbnail} alt={name} className='single__img' />
        <div className='single__info'>
          <h2 className='single__title'>{name}</h2>
          <p className='single__descr'>{description}</p>
          <div className='single__pages'>{pages} pages</div>
          <div className='single__lang'>Language: {lang}</div>
          <div className='single__price'>{price}$</div>
        </div>
        <Link to={'/comics'} className='single__back'>
          Back to all
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className='single__grid'>
        <img src={thumbnail} alt={name} className='single__img' />
        <div className='single__info'>
          <h2 className='single__title'>{name}</h2>
          <p className='single__descr'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
