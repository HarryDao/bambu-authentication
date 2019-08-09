import React from 'react';
import ReactDOM from 'react-dom';
import './styles/sass/index.scss';
import { Root } from './components/Root';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

function renderToDOM () {
  ReactDOM.render(
    <Root>
      <App/>
    </Root>
  , document.getElementById('root') || document.createElement('div'));
}

renderToDOM();

export { renderToDOM };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
