import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Families from './components/Families'


class Participants extends Component {
  render() {
    return (
      <h1>Participants</h1>
    )
  }
}

class Relationships extends Component {
  render() {
    return (
      <h1>Relationships</h1>
    )
  }
}

class Results extends Component {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <wrapped />
      </div>
    )
  }
}

const Bar = ({children}) => (
  <h1>{children}</h1>
)

class Foo extends Component {
  render() {
    const Wrapper = this.props.wrapper
    return (
      <Wrapper><p>This works!</p></Wrapper>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Families}/>
          <Route path="/relationships" component={Relationships}/>
          <Route path="/results" component={Results}/>
        </div>
      </Router>
    );
  }
}

export default App;
