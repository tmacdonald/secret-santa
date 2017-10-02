import React, { Component } from 'react'
import { connect } from 'react-redux'

class Event extends Component {
  render() {
    const { event } = this.props
    return (
      <div className="event">
        <h1>{event.name}</h1>
      </div>
    )
  }
}

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
    const { events, participants } = this.props

    return (
      <div>
          <h1>Past Events</h1>
          <div className="events">
              { events.map(evt => <Event event={evt} />) }
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
        events: state.events || [],
        participants: state.participants || []
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addEvent: () => dispatch({ type: 'ADD_EVENT', evt: { matching_results: [] } }),
        addMatchToEvent: (evt, match) => dispatch({ type: 'ADD_MATCH_TO_EVENT', evt, match })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)