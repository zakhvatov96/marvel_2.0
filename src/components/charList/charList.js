import { useState, useEffect, useRef, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
      break;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
      break;
    case 'confirmed':
      return <Component />;
      break;
    case 'error':
      return <ErrorMessage />;
      break;
    default:
      throw new Error('Unexpected process state');
  }
};

const CharList = (props) => {
  const [char, setChar] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    window.addEventListener('scroll', onScrollLoad);
    updateChar(offset, true);
    return () => {
      window.removeEventListener('scroll', onScrollLoad);
    };
  }, []);

  const newItemsBtn = useRef();

  const onScrollLoad = () => {
    if (newItemLoading) return;
    if (charEnded) {
      window.removeEventListener('scroll', onScrollLoad);
    }
    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight +
        1 >
      document.documentElement.scrollHeight
    ) {
      newItemsBtn.current.click();
    }
  };

  const onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true;
    }

    setChar((char) => [...char, ...newChar]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  function updateChar(offset, initial) {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  }

  const focusOnItem = (ref) => {
    ref.current.classList.add('char__content-item-selected');
    ref.current.focus();
  };

  const blurOnItem = (ref) => {
    ref.current.classList.remove('char__content-item-selected');
  };

  function renderItems(arr) {
    const elements = arr.map(({ name, thumbnail, id }, i) => {
      const itemRef = createRef(null);
      return (
        <CSSTransition
          key={i}
          in={true}
          nodeRef={itemRef}
          timeout={500}
          classNames='char__grid-item'
        >
          <li
            className='char__grid-item'
            key={i}
            ref={itemRef}
            tabIndex={0}
            onClick={() => {
              props.onCharSelected(id);
              focusOnItem(itemRef);
            }}
            onBlur={() => blurOnItem(itemRef)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                props.onCharSelected(id);
                focusOnItem(itemRef);
              }
            }}
          >
            <img src={thumbnail} alt={name} className='char__grid-item-img' />
            <div className='char__grid-item-name'>{name}</div>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className='char__grid'>
        <TransitionGroup component={null}>{elements}</TransitionGroup>
      </ul>
    );
  }

  return (
    <div className='char__list'>
      {setContent(process, () => renderItems(char), newItemLoading)}
      <button
        className='button button__long button__main'
        onClick={() => updateChar(offset)}
        ref={newItemsBtn}
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
      >
        <div className='inner'>LOAD MORE</div>
      </button>
    </div>
  );
};

export default CharList;
