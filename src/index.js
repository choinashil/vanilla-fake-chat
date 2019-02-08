import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { Provider } from 'react-redux';
// import rootReducer from './reducers';
import reducer from './reducers';
import './index.scss';
import App from './components/App';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
