import { useState } from 'react';
import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import ComicsList from '../comicsList/comicsList';
import vision from '../../resources/img/vision.png';

const App = () => {

    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
      setChar(id);
    }

    return (
      <div className="app">
        <AppHeader />
        <main>
        {/* <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div> */}

        <ErrorBoundary>
          <ComicsList />
        </ErrorBoundary>
        </main>
        <img src={vision} alt="" className="bg-decoration" />
      </div>
);

}

export default App;
