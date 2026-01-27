import AppBanner from '../appBanner/appBanner';
import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';

function App() {
  return (
      <div className="app">
        <AppHeader />
        <main>
        <RandomChar />
        </main>
      </div>
  );
}

export default App;
