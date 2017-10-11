import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMatchToEvent } from '../reducers/events'
import MatchForm from './MatchForm'
import MatchTable from './MatchTable'

import { values } from '../lib/utils'

class Event extends Component {

    addMatch = (match) => {
        this.props.addMatchToEvent(this.props.event, {
            gifter: match.participant1,
            giftee: match.participant2
        })
    }

    render() {
        const { event, participants } = this.props
        const participantList = values(participants)

        return (
            <div className="event">
                <h1>{event.name}</h1>

                <MatchTable participants={participants} matches={event['matching_results']} />

                <MatchForm participants={participantList} onAddMatch={this.addMatch} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        participants: state.get('participants').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMatchToEvent: (event, match) => dispatch(addMatchToEvent(event, match))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)