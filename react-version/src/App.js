import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'

import Participants from './components/Participants'
import Relationships from './components/Relationships'
import PastResults from './components/PastResults'
import Results from './components/Results'

const initialState = JSON.parse(window.localStorage.getItem('secret-santa')) || []
const store = createStore(rootReducer, initialState)

store.subscribe(() => {
  window.localStorage.setItem('secret-santa', JSON.stringify(store.getState()))
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Participants}/>
            <Route path="/relationships" component={Relationships}/>
            <Route path="/pastresults" component={PastResults}/>
            <Route path="/results" component={Results}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
