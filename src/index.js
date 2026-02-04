import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './components/app/App';
import MarvelService from './services/MarvelService';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

