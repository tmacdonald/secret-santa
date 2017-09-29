import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Participants from './components/Participants'
import Relationships from './components/Relationships'
import PastResults from './components/PastResults'
import Results from './components/Results'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      participants: []
    }
  }

  componentDidMount() {
    const participants = JSON.parse(window.localStorage.getItem('participants')) || []
    this.setState({
        participants
    })
  }

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
