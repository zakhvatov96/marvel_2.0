import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBanner from '../appBanner/appBanner';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import xmen from '../../resources/img/x-men.png';

import './singleComicPage.scss';

const SingleCharPage = () => {
  const { charId } = useParams();

  const [char, setChar] = useState();

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

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

const View = ({ char }) => {
  const { name, description, thumbnail } = char;

  return (
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

export default SingleCharPage;
