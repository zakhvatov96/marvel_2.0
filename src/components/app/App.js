import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppHeader from '../appHeader/appHeader';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));
const SingleCharPage = lazy(() => import('../pages/singleCharPage'));
const SinglePage = lazy(() => import('../pages/singlePage'));

const App = () => {
  const { getCharacter, getComic } = useMarvelService();
  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route
                path='/:itemId'
                element={<SinglePage getItem={getCharacter} />}
              />
              <Route path='/comics' element={<ComicsPage />} />
              <Route
                path='/comics/:itemId'
                element={<SinglePage getItem={getComic} />}
              />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
