import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from "./redux/reducers";

const mainStore = createStore(
  rootReducer,
  applyMiddleware(thunk)
  );

ReactDOM.render(
  <Provider store={mainStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
