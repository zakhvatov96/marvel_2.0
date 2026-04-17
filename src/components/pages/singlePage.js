import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/appBanner';
import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

import xmen from '../../resources/img/x-men.png';

import './singleComicPage.scss';

const SinglePage = (props) => {
  const { itemId } = useParams();

  const [item, setItem] = useState();

  const { loading, error, clearError, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    updateItem();
  }, [itemId]);

  const onItemLoaded = (item) => {
    setItem(item);
  };

  const updateItem = () => {
    clearError();
    props
      .getItem(itemId)
      .then(onItemLoaded)
      .then(() => setProcess('confirmed'));
  };

  return (
    <>
      <AppBanner />
      <div className='single'>{setContent(process, View, item)}</div>
    </>
  );
};

const View = ({ data }) => {
  const {
    name,
    description,
    thumbnail,
    pages = null,
    lang = null,
    price = null,
  } = data;

  return pages ? (
    <>
      <Helmet>
        <meta name='description' content={`${name} comics book`} />
        <title>{name}</title>
      </Helmet>
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
      <Helmet>
        <meta name='description' content={`${name} character`} />
        <title>{name}</title>
      </Helmet>
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
