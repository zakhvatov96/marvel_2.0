import { Component } from 'react';
import AppHeader from '../appHeader/appHeader';
import RandomChar from '../randomChar/randomChar';
import CharList from '../charList/charList';
import CharInfo from '../charInfo/charInfo';
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
          <RandomChar />
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <CharInfo charId={this.state.selectedChar} />
          </div>
          </main>
          <img src={vision} alt="" className="bg-decoration" />
        </div>
  );
    }
}

export default App;
