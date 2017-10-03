import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'

import { addEvent } from '../reducers/index'
import Event from './Event'

class Events extends Component {

  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
        event.preventDefault()
        this.props.addEvent(this.state)
        this.setState({
            name: '',
        })
    }

  render() {
    const { events } = this.props

    return (
      <div>
          <h1>Past Events</h1>
          <div className="events">
              { events.map(evt => <Event key={evt.get('id')} event={evt} />) }
          </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
            <input type="submit" value="Add a past event" />
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        events: state.get('events'),
        participants: state.get('participants')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addEvent: (evt) => dispatch(addEvent(Map({ ...evt, matching_results: List([]) })))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)