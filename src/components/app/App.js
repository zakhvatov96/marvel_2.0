import { Component } from 'react';
import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
import ErrorBoundary from '../errorBoundary/errorBoundary';
import vision from '../../resources/img/vision.png';

class App extends Component {
    state = {
      selectedChar: null
    }

    onCharSelected = (id) => {
      this.setState({
        selectedChar: id
      })
    }
    render() {
      return (
        <div className="app">
          <AppHeader />
          <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          </main>
          <img src={vision} alt="" className="bg-decoration" />
        </div>
  );
    }
}

export default App;
