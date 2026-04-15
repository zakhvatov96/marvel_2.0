import { useState } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import CharForm from '../charForm/charForm';
import ErrorBoundary from '../errorBoundary/errorBoundary';

import vision from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name='description' content='Marvel information portal' />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className='char__content-column'>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <CharForm />
        </div>
      </div>
      <img src={vision} alt='' className='bg-decoration' />
    </>
  );
};

export default MainPage;
