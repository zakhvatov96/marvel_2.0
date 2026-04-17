import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (20 - 1 + 1));
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  return (
    <div className='random'>
      {setContent(process, View, char)}
      <div className='random__choose'>
        <p className='random__choose-text'>
          Random character for today! Do you want to get to know him better?
          <br />
          <br />
          Or choose another one
        </p>
        <button onClick={updateChar} className='button button__main'>
          <div className='inner'>TRY IT</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='random__choose-img' />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;
  return (
    <div className='random__char'>
      <img src={thumbnail} alt='character' className='random__char-img' />
      <div className='random__char-info'>
        <h2 className='random__char-title'>{name}</h2>
        <p className='random__char-text'>{description}</p>
        <div className='random__char-buttons'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>HOMEPAGE</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>WIKI</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
