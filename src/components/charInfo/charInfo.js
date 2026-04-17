import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const charId = props.charId;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  return <div className='char__info'>{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  return (
    <>
      <div className='char__wrapper'>
        <img src={thumbnail} alt={name} className='char__info-img' />
        <div className='char__info-buttons'>
          <h2 className='char__info-title'>{name}</h2>
          <a href={homepage} className='button button__main'>
            <div className='inner'>HOMEPAGE</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>WIKI</div>
          </a>
        </div>
      </div>
      <p className='char__info-text'>{description}</p>
      <div className='char__comics__title'>Comics:</div>
      <ul className='char__comics'>
        {comics.length
          ? comics.slice(0, 10).map((item, i) => {
              return (
                <li key={i} className='char__comics-item'>
                  {item}
                </li>
              );
            })
          : 'There is no comics with this charachter'}
      </ul>
    </>
  );
};

export default CharInfo;
