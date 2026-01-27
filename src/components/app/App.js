import AppBanner from '../appBanner/appBanner';
import AppHeader from '../appHeader/appHeader';
import ComicsList from '../comicsList/comicsList';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import vision from '../../resources/img/vision.png';

function App() {
  return (
      <div className="app">
        <AppHeader />
        <AppBanner />
        <ComicsList />
        {/* <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        </main>
        <img src={vision} alt="" className="bg-decoration" /> */}
      </div>
  );
}

export default App;
