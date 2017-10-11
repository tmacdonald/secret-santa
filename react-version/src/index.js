import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { fromJS } from 'immutable'
import rootReducer from './reducers'


const storedState = fromJS(JSON.parse(window.localStorage.getItem('secret-santa')))

const initialState = storedState || fromJS({ groups: [], participants: {}, events: [], results: {}})

const store = createStore(rootReducer, initialState)

store.subscribe(() => {
  window.localStorage.setItem('secret-santa', JSON.stringify(store.getState().toJS()))
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
