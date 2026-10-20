import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/style.scss';
import './styles/_tokens.scss';
import './styles/_mixins.scss';
import './styles/priority.scss';
import './styles/inline-edit.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
