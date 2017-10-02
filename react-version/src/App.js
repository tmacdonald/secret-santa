import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Participants from './components/Participants'
import Relationships from './components/Relationships'
import PastResults from './components/PastResults'
import Results from './components/Results'

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Participants}/>
            <Route path="/relationships" component={Relationships}/>
            <Route path="/pastresults" component={PastResults}/>
            <Route path="/results" component={Results}/>
          </div>
        </Router>
    );
  }
}

export default App;
